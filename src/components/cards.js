import React from "react";

export default function Cards({ item }) {
    return (
        <div>
            <h3>{item.first_name} {item.last_name}</h3>
        </div>
    )
}