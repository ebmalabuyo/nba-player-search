import React from "react";

export default function Cards({ item, summonModalInfo }) {
    return (
        <div onClick={() => summonModalInfo(item.id)} className="cards" key={item.id}>
            <h3>{item.first_name} {item.last_name}</h3>
            <p><b>POS:</b> {item.position ? item.position : 'N/A'}</p>
        </div>
    )
}