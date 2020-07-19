import React, {useEffect, useState} from 'react';
import TransactionApi from './services/TransactionApiService';
import Transaction from './components/Transaction';

export default function App() {
  let [transactions, setTransaction] = useState([]);
  useEffect(() => {
    (async () => {
      const initTransactions = await TransactionApi.getByYearMonth("2020-01");

      setTransaction(initTransactions);
    })();
  }, []);

  const handleTransactionClick = (e) => {
    console.log("click")
    console.log(e)
    console.log(this);
  }

  return (
    <div className="container">
      <h1>Desafio Final do Bootcamp Full Stack</h1>
      {transactions.map((transaction) => {
        return <Transaction transaction={transaction} handleClick={handleTransactionClick} />
      })}
    </div>
  );
}
