import React from 'react';
import CustomizableItem from './CustomizableItem';
import { Customizable } from '../../models/Customizable.ts';

interface CustomizableListProps {
    items: Customizable[];
    ownedItems: Customizable[];
    onBuy: (item: { name: string; description: string; color: string; points: number }) => void;
}

const CustomizableList: React.FC<CustomizableListProps> = ({ items, ownedItems, onBuy }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, index) => {
                const isOwned = ownedItems.some(ownedItem => ownedItem.name === item.name);
                return (
                    <CustomizableItem key={index} item={item} onBuy={onBuy} isOwned={isOwned} />
                );
            })}
        </div>
    );
};

export default CustomizableList;