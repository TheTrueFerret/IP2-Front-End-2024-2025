import React, {useState} from 'react';
import CustomizableList from '../components/Customizables/CustomizableList';

const items = [
    {name: 'Item 1', description: 'Description for item 1', color: '#FFDDC1', points: 10},
    {name: 'Item 2', description: 'Description for item 2', color: '#C1FFD7', points: 20},
    {name: 'Item 3', description: 'Description for item 3', color: '#C1D4FF', points: 30},
    // Add more items as needed
];

const ShopPage: React.FC = () => {
    const [userPoints, setUserPoints] = useState(100); // Example initial points

    const handleBuy = (item: { name: string; description: string; color: string; points: number }) => {
        console.log('Bought item:', item);
        setUserPoints(prevPoints => prevPoints - item.points);
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Shop</h1>
            <p className="text-xl mb-4">Current Points: {userPoints}</p>
            <CustomizableList items={items} onBuy={handleBuy}/>
        </div>
    );
};

export default ShopPage;