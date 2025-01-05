import React from 'react';
import {Customizable} from '../../models/Customizable.ts';

interface CustomizableItemProps {
    item: Customizable;
    onBuy: (item: { name: string; description: string; color: string; points: number }) => void;
    isOwned: boolean;
}

const CustomizableItem: React.FC<CustomizableItemProps> = ({item, onBuy, isOwned}) => {
    return (
        <div className="border p-4 rounded-lg shadow-md bg-cyan-500">
            <h2 className="text-xl font-bold">{item.name}</h2>
            <p>{item.description}</p>
            <p className="font-semibold">Points: {item.points}</p>
            {!isOwned ? (
                <button
                    onClick={() => onBuy(item)}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Buy
                </button>
            ) : (
                <p className="mt-4 bg-green-500 text-white py-2 px-4 rounded w-fit">Owned</p>
            )}
        </div>
    );
};

export default CustomizableItem;