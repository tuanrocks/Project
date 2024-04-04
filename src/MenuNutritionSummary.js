import React from 'react';

const MenuNutritionSummary = ({ menuItems }) => {
    const nutrientKeys = {
        ENERC_KCAL: 'Calories',
        PROCNT: 'Protein',
        FAT: 'Total Fat',
        FASAT: 'Saturated Fat',
        CHOCDF: 'Carbohydrates',
        SUGAR: 'Sugar',
        NA: 'Sodium',
        CA: 'Calcium',
        FIBTG: 'Fiber'
    };

    // Calculate total nutrition for the specified nutrients
    const totalNutrition = menuItems.reduce((totals, item) => {
        Object.entries(nutrientKeys).forEach(([key, _]) => {
            if (item.nutrition[key]) {
                if (!totals[key]) {
                    totals[key] = { quantity: 0, unit: item.nutrition[key].unit };
                }
                totals[key].quantity += item.nutrition[key].quantity;
            }
        });
        return totals;
    }, {});

    return (
        <div>
            <h2>Menu Nutrition Summary (All selected food) </h2>
            <ul>
                {Object.entries(totalNutrition).map(([key, { quantity, unit }]) => (
                    <li key={key}>
                        {nutrientKeys[key]}: {quantity.toFixed(2)} {unit}
                    </li>
                ))}
            </ul><br/>
            <h3>Remarks</h3>
            <p>Adults and youth (ages 13 and older) need an average of 2,000 calories a day. </p>
            <p>Children (ages 4 to 12) need an average of 1,500 calories a day. .</p>
            <p>However, individual needs vary.</p>
            <p>Source: <a href='https://www.ontario.ca/page/calories-menus#:~:text=Adults%20and%20youth%20(ages%2013%20and%20older)%20need%20an%20average,to%202%2C400%20calories%20per%20day.'>Ontario.ca</a></p>
        </div>
    );
};

export default MenuNutritionSummary;
