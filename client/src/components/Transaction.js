import React from 'react'

export default function Transaction({transaction, handleUpdate, handleDelete}) {
    const {description, category, day, type, value} = transaction;
    const rowColor = type === "+" ? "income" : "outcome";

    const handleUpdateClick = () => {
        handleUpdate(transaction);
    }

    const handleDeleteClick = () => {
        console.log("delete");
        console.log(transaction);
    }

    return (
        <div className={`row ${rowColor}`}>
            <div className="col l1 day">
                {day}
            </div>
            <div className="col l6 container-info">
                <div className="category">
                    {category}
                </div>
                <div className="description">
                    {description}
                </div>
            </div>
            <div className="col l3 value">
                {value}
            </div>
            <div className="col l2 options">
                <button className="btn-flat transparent waves-effect waves-light" onClick={handleUpdateClick}>
                    <i className="material-icons">edit</i>
                </button>
                <button className="btn-flat transparent waves-effect waves-light" onClick={handleDeleteClick}>
                    <i className="material-icons">delete</i>
                </button>
            </div>
        </div>
    )
}
