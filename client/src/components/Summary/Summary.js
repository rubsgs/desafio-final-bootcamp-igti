import React from 'react';
import './Summary.css';

export default function Summary({transactionList}){
    const listSize = transactionList.length;
    const incomes = transactionList.reduce((acc, {type, value}) => type === "+" ? acc + value : acc, 0);
    const debts = transactionList.reduce((acc, {type, value}) => type === "-" ? acc + value : acc, 0);
    const balance = incomes - debts;
    const balanceClass = balance <= 0 ? "red" : "teal";
    return (
        <div className="flex-row">
            <div>
                <span>Lançamentos: </span>
                <span>{listSize}</span>
            </div>
            <div>
                <span>Receitas: </span>
                <span className="teal-text lighten-3">R$ {incomes}</span>
            </div>
            <div>
                <span>Despesas: </span>
                <span className="red-text lighten-3">R$ {debts}</span>
            </div>
            <div>
                <span>Saldo: </span>
                <span className={`${balanceClass}-text lighten-3`}>R$ {balance}</span>
            </div>
        </div>
    )
}