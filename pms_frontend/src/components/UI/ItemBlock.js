import React from "react";
import './itemBlock.css'

const ItemBlock = ({ title, items, renderItem }) => {
    return (
        <div className="item-block-container">
            <h2>{title}</h2>
            <div className="item-block">
                {items.map((item) => (
                    <div key={item.id} className="item">
                        {renderItem(item)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemBlock;