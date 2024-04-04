import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'; 

const NutritionAnalyzer = ({ onFoodAdded }) => {
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');
    const [food, setFood] = useState('');
    const [nutritionData, setNutritionData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isAnalyzeDisabled, setIsAnalyzeDisabled] = useState(false);// Initially false to enable Analyze button at beginning
    const [isAddToMenuDisabled, setIsAddToMenuDisabled] = useState(false); // Initially false to enable Add to Menu button at beginning

    const units = ['ml', 'oz', 'gram', 'pound', 'kg', 'cup'];//Selected a few common units for food quantity

    const appId = 'fe2a6540';
    const appKey = '6227fea832e71c44f810680e87159c86';
    const apiUrl = `https://api.edamam.com/api/nutrition-details?app_id=${appId}&app_key=${appKey}`;

    const analyzeNutrition = async () => {
        setErrorMessage('');
        setIsAnalyzeDisabled(true); // Disable the "Analyze" button after "Analyze" is clicked to avoid 
        //user accidentally change input but did not click "Analyze" button again
        //which might casues mismatch food and nutrition data to be added to the menu summary
        try {
            const response = await axios.post(apiUrl, { ingr: [`${quantity} ${unit} ${food}`] });//Send a post request to the API
            setNutritionData(response.data); //Update the nutritionData state with the received data from API
        } catch (error) { //If the post request encounters an error
            console.error('Error fetching nutrition data:', error);
            setErrorMessage('No information for the item, please try again.');
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
            setIsAnalyzeDisabled(true); //Disable the "Analyze" button, only reset button is enabled, so no confusion that if the food has been analyzed or added to menu yet
            setIsAddToMenuDisabled(true); //Disable the "Add to Menu" button after adding to menu to avoid item is added more than once
        }
    };

    const resetFields = () => {
        setQuantity('');
        setUnit('');
        setFood('');
        setNutritionData(null);
        setErrorMessage('');
        setIsAnalyzeDisabled(false); //Enable the "Analyze" button after reset button clicked
        setIsAddToMenuDisabled(false); //Enable the "Add to Menu" button after reset button clicked
    };

    const handleInputChange = (e) => {//Handle input change event
        const { name, value } = e.target;
        if (name === 'food') {//Check if the input field is food
            setIsAnalyzeDisabled(value.trim() === '');//Check if the food input is empty, if it is, disable the "Analyze" button
        }
        switch (name) {//Update the corresponding state based on the input field name
            case 'quantity':
                setQuantity(value);
                break;
            case 'unit':
                setUnit(value);
                break;
            case 'food':
                setFood(value);
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <h2 style={{color:"olive",fontSize:"150%"}}>Nutrition Analyzer</h2>
            <p style={{color:"grey",fontSize:"105%"}}>Please provide the amount of food you want to look up.</p>
            <input style={{color:"grey",fontSize:"95%"}} type="text" name="quantity" value={quantity} onChange={handleInputChange} placeholder="Enter quantity" />
            {/*onChange event handler is added to the input fields to update the state when the input value changes*/}
            <select style={{color:"grey",fontSize:"95%"}} name="unit" value={unit} onChange={handleInputChange}>
                <option value="">Select Unit</option>
                {units.map((u, index) => (
                    <option key={index} value={u}>{u}</option>
                ))}
            </select>
            <input style={{color:"grey",fontSize:"95%"}} type="text" name="food" value={food} onChange={handleInputChange} placeholder="Enter food item" />
            {/*onChange event handler is added to the input fields to update the state when the input value changes*/}
            <Button variant="outline-success" onClick={analyzeNutrition} disabled={isAnalyzeDisabled}>Analyze</Button>
            <Button variant="outline-success" onClick={addToMenu} disabled={isAddToMenuDisabled}>Add to Menu</Button>
            <Button variant="outline-secondary" onClick={resetFields}>Reset</Button>
            {nutritionData && (
                <div>
                    <br/><h3 style={{color:"grey",fontSize:"130%"}}>Nutritional Information</h3><br/> {/*Only a few common nutrients are displayed*/}
                    <div style={{color:"grey",fontSize:"100%"}}>
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
                </div>
            )}
            {errorMessage && <p>{errorMessage}</p>}
            <p style={{color:"#0D6EFD",fontSize:"95%"}}>Source: <a href='https://www.edamam.com/'>Edamam Nutrition Analysis</a></p>
            <footer style={{ marginTop: '20px', textAlign: 'center', color: '#666', fontSize:"90%" }}>
                <p>&copy; 2024 CPAN144 Yan & Tina</p>
            </footer>
        </div>
    );
};

export default NutritionAnalyzer;
