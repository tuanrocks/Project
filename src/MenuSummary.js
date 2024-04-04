import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'; 

const MenuSummary = ({ menuItems, onFoodRemoved }) => {
    return (
        <div>
            <h2 style={{color:"olive",fontSize:"150%"}}>Menu Summary (Editable)</h2>
            <p style={{color:"grey",fontSize:"105%"}}>Food items you have added to the menu so far...</p>
            <ul style={{color:"grey",fontSize:"105%"}}>
                {menuItems.map((item, index) => (//map function is used to iterate over the menuItems array and render each item as a list item
                    <li key={index}>
                        <strong>{item.food}</strong> - {item.quantity} {item.unit} --
                        <Button variant="outline-primary" onClick={() => onFoodRemoved(index)}>Remove</Button>
                    </li>
                ))}
            </ul>
            <div>
                <Button variant="outline-success" onClick={() => window.print()}>Print this page</Button>
            </div>
            <footer style={{ marginTop: '20px', textAlign: 'center', color: '#666', fontSize:"90%" }}>
                <p>&copy; 2024 CPAN144 Yan & Tina</p>
            </footer>
        </div>
    );
};

export default MenuSummary;
