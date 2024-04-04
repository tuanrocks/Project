import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import NutritionAnalyzer from './NutritionAnalyzer';
import MenuSummary from './MenuSummary';
import MenuNutritionSummary from './MenuNutritionSummary';

const App = () => {
    const [menuItems, setMenuItems] = useState([]);

    const handleFoodAdded = (item) => {
        setMenuItems(prevItems => [...prevItems, item]);
    };

    const handleFoodRemoved = (index) => {
        setMenuItems(prevItems => prevItems.filter((_, i) => i !== index));
    };

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Nutrition Analyzer</Link></li>
                        <li><Link to="/menu-summary">Menu Summary</Link></li>
                        <li><Link to="/menu-nutrition-summary">Menu Nutrition Summary</Link></li>
                        
                    </ul>
                </nav>

                <Routes>
                    <Route path="/menu-summary" element={<MenuSummary menuItems={menuItems} onFoodRemoved={handleFoodRemoved} />} />
                    <Route path="/menu-nutrition-summary" element={<MenuNutritionSummary menuItems={menuItems} />} />
                    <Route path="/" element={<NutritionAnalyzer onFoodAdded={handleFoodAdded} />} />
                    <Route path="*" element={<div>Page not found</div>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
