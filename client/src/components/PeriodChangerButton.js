import React from 'react'

export default function PeriodChangerButton({text, type, isDisabled, handleChangerClick}) {
    const handleClick = () => {
        handleChangerClick(type);
    }
    return (
        <button className="btn waves-light waves-effect" disabled={isDisabled} onClick={handleClick}>{text}</button>
    )
}
