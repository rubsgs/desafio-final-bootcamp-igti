import React from 'react'

export default function Transaction({transaction, handleClick}) {
    const {description, category, day, type, value} = transaction;
    const rowColor = type === "+" ? "income" : "outcome"
    return (
        <div className={`row ${rowColor}`}>
            <div className="col l1 day">
                {day}
            </div>
            <div className="col l6 container-info">
                <div className="category">
                    {category}
                </div>
                <div className="descriptio">
                    {description}
                </div>
            </div>
            <div className="col l3 value">
                {value}
            </div>
            <div className="col l2 options">
                <i className="material-icons">edit</i>
                <i className="material-icons">delete</i>
            </div>
        </div>
    )
}
