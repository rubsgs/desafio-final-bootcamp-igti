import React from 'react';

export default function Filter({handleFilterChange}){
    const handleKeyUp = (e) => {
        handleFilterChange(e.target.value);
    }

    return (
        <div className="input-field">
            <input type="text" placeholder="Filtro" onKeyUp={handleKeyUp} />
        </div>
    )
}