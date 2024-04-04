import React from 'react';

const MenuSummary = ({ menuItems, onFoodRemoved }) => {
    return (
        <div>
            <h2>Menu Summary</h2>
            <ul>
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <strong>{item.food}</strong> - {item.quantity} {item.unit}
                        <button onClick={() => onFoodRemoved(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MenuSummary;
