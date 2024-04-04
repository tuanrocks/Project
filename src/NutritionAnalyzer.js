import React, { useState } from 'react';
import axios from 'axios';

const NutritionAnalyzer = ({ onFoodAdded }) => {
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');
    const [food, setFood] = useState('');
    const [nutritionData, setNutritionData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(''); // State for storing error messages

    const units = ['ml', 'oz', 'gram', 'pound', 'kg', 'cup']; // Updated units list

    const appId = 'fe2a6540';
    const appKey = '6227fea832e71c44f810680e87159c86';
    const apiUrl = `https://api.edamam.com/api/nutrition-details?app_id=${appId}&app_key=${appKey}`;

    const analyzeNutrition = async () => {
        setErrorMessage(''); // Reset error message
        try {
            const response = await axios.post(apiUrl, { ingr: [`${quantity} ${unit} ${food}`] });
            setNutritionData(response.data);
        } catch (error) {
            console.error('Error fetching nutrition data:', error);
            setErrorMessage('No information for the item, please try again.'); // Set error message
        }
    };

    const addToMenu = () => {
        if (nutritionData) {
            onFoodAdded({
                food,
                quantity,
                unit,
                nutrition: nutritionData.totalNutrients
            });
        }
    };

    return (
        <div>
            <h2>Nutrition Analyzer</h2>
            <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Enter quantity" />
            <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                <option value="">Select Unit</option>
                {units.map((u, index) => (
                    <option key={index} value={u}>{u}</option>
                ))}
            </select>
            <input type="text" value={food} onChange={(e) => setFood(e.target.value)} placeholder="Enter food item" />
            <button onClick={analyzeNutrition}>Analyze</button>
            {nutritionData && (
                <div>
                    <h3>Nutritional Information</h3>
                    <p>Calories: {nutritionData.totalNutrients.ENERC_KCAL?.quantity.toFixed(2)} kcal</p>
                    <p>Protein: {nutritionData.totalNutrients.PROCNT?.quantity.toFixed(2)} g</p>
                    <p>Total Fat: {nutritionData.totalNutrients.FAT?.quantity.toFixed(2)} g</p>
                    <p>Saturated Fat: {nutritionData.totalNutrients.FASAT?.quantity.toFixed(2)} g</p>
                    <p>Carbohydrates: {nutritionData.totalNutrients.CHOCDF?.quantity.toFixed(2)} g</p>
                    <p>Sugar: {nutritionData.totalNutrients.SUGAR?.quantity.toFixed(2)} g</p>
                    <p>Sodium: {nutritionData.totalNutrients.NA?.quantity.toFixed(2)} mg</p>
                    <p>Calcium: {nutritionData.totalNutrients.CA?.quantity.toFixed(2)} mg</p>
                    <p>Fiber: {nutritionData.totalNutrients.FIBTG?.quantity.toFixed(2)} g</p>
                </div>
            )}
            <button onClick={addToMenu}>Add to Menu</button>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default NutritionAnalyzer;
