import React from 'react';
import CustomizableItem from './CustomizableItem';

interface CustomizableListProps {
    items: {
        name: string;
        description: string;
        color: string;
        points: number;
    }[];
    onBuy: (item: { name: string; description: string; color: string; points: number }) => void;
}

const CustomizableList: React.FC<CustomizableListProps> = ({ items, onBuy }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, index) => (
                <CustomizableItem key={index} item={item} onBuy={onBuy} />
            ))}
        </div>
    );
};

export default CustomizableList;