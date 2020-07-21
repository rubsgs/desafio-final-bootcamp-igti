import React from 'react';
import PeriodChangerButton from './PeriodChangerButton';

export default function PeriodSelector({periodList, currentPeriodIndex, handlePeriodSelection}){
    const minPeriod = 0;
    const maxPeriod = periodList.length - 1;
    const handleButtonClick = (type) => {
        let newIndex = currentPeriodIndex;
        if(type === "+"){
            newIndex += 1;
        } else {
            newIndex -= 1;
        }

        handlePeriodSelection(periodList[newIndex]);
    }

    const handleSelection = (e) => {
        const newIndex = e.target.value;
        handlePeriodSelection(periodList[newIndex]);
    }
    
    return (
        <div className="row">
            <div className="col l4 offset-l4" style={styles.row}>
                <PeriodChangerButton text="<" type="+" isDisabled={currentPeriodIndex === maxPeriod} handleChangerClick={handleButtonClick} />
                <select className="browser-default" value={currentPeriodIndex} onChange={handleSelection}>
                    {periodList.map((period, index) => {
                        return <option key={period.yearMonth} value={index}>{period.yearMonth}</option>
                    })}
                </select>
                <PeriodChangerButton text=">" type="-" isDisabled={currentPeriodIndex === minPeriod} handleChangerClick={handleButtonClick} />
            </div>
        </div>
    )
}

const styles = {
    row: {
        display: "flex",
        flexDirection: "flex-row",
        justifyContent: "space-around",
        alignItems: "center"
    }
}