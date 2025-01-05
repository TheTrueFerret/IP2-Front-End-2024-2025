import { Link } from "react-router-dom";
import { MenuItem } from "../models/MenuItem";


interface MenuListProps {
  menuItems: MenuItem[];
}

// MenuList this is for the list of things you can click on the main menu
export function MenuList({ menuItems }: MenuListProps) {
  return (
    <div className="flex flex-col space-y-20 min-w-fit relative text-white bg-neutral-900/60 backdrop-blur p-20 rounded-3xl shadow-md w-2/5">
      {menuItems.map(menuItem =>
        // If there's a custom action, handle it, otherwise use the Link component
        menuItem.menuItemAction ? (
          <button
            key={menuItem.menuItemName}
            onClick={menuItem.menuItemAction}
            className="relative group flex items-center space-x-10 hover:scale-105"
          >
            <img
              src="/rummikub-icon.svg"
              alt="Rummikub"
              className="w-14 h-14 opacity-0 group-hover:opacity-100 transition-all duration-100 scale-95"
            />
            <div className='text-6xl font-bold'>
              {menuItem.menuItemName}
            </div>
          </button>
        ) : (
          <Link
            to={menuItem.menuItemLink}
            key={menuItem.menuItemName}
            className="relative group flex items-center space-x-10 hover:scale-105"
          >
            <img
              src="/rummikub-icon.svg"
              alt="Rummikub"
              className="w-14 h-14 opacity-0 group-hover:opacity-100 transition-all duration-100 scale-95"
            />
            <div className='text-6xl font-bold'>
              {menuItem.menuItemName}
            </div>
          </Link>
        )
      )}
    </div>
  )
}