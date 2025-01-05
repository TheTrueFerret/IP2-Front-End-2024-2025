import React from 'react';

interface CustomizableItemProps {
    item: {
        name: string;
        description: string;
        color: string;
        points: number;
    };
    onBuy: (item: { name: string; description: string; color: string; points: number }) => void;
}

const CustomizableItem: React.FC<CustomizableItemProps> = ({ item, onBuy }) => {
    return (
        <div className="border p-4 rounded-lg shadow-md" style={{ backgroundColor: item.color }}>
            <h2 className="text-xl font-bold">{item.name}</h2>
            <p>{item.description}</p>
            <p className="font-semibold">Points: {item.points}</p>
            <button
                onClick={() => onBuy(item)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            >
                Buy
            </button>
        </div>
    );
};

export default CustomizableItem;