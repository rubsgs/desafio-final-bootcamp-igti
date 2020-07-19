import React, {useEffect, useState} from 'react';
import TransactionApi from './services/TransactionApiService';
import Transaction from './components/Transaction';
import PeriodSelector from './components/PeriodSelector';
import Loader from './components/Loader';

export default function App() {
  let [transactions, setTransactions] = useState([]);
  let [periods, setPeriods] = useState([]);
  let [currentPeriod, setCurrentPeriod] = useState(0);
  let [modalOpen, setModalOpen] = useState(true);
  useEffect(() => {
    (async () => {
      
      const initPeriods = await TransactionApi.getPeriods();
      const dataAtual = new Date();
      let ano = dataAtual.getFullYear();
      let mes = dataAtual.getMonth() + 1;

      if(mes < 10){
        mes = "0" + mes;
      }
      const strData = `${ano}-${mes}`
      setPeriods(initPeriods);

      let currentIndex = initPeriods.findIndex((period)=> period.yearMonth === strData);
      if(currentIndex < 0){
        currentIndex = initPeriods.length - 1;
      }
      setCurrentPeriod(currentIndex);
      console.log(initPeriods);
      console.log(currentIndex);
      console.log(strData);
      const initTransactions = await TransactionApi.getByYearMonth(initPeriods[currentIndex].yearMonth);
      setTransactions(initTransactions);
      setModalOpen(false);
    })();
  }, []);

  const handleTransactionClick = (e) => {
    console.log("click")
    console.log(e)
    console.log(this);
  }

  const handlePeriodChange = async (newPeriod) => {
    setModalOpen(true);
    let newIndex = periods.findIndex((p) => p.yearMonth === newPeriod.yearMonth);
    const newTransactions = await TransactionApi.getByYearMonth(newPeriod.yearMonth);

    setCurrentPeriod(newIndex);
    setTransactions(newTransactions);
    setModalOpen(false);
  }

  return (
    <div className="container">
      <h1>Desafio Final do Bootcamp Full Stack</h1>
      {modalOpen && <Loader />}
      {!modalOpen && periods.length > 0 && <PeriodSelector periodList={periods} currentPeriodIndex={currentPeriod} handlePeriodSelection={handlePeriodChange} />}
      {!modalOpen && transactions.map((transaction) => {
        return <Transaction key={transaction._id} transaction={transaction} handleClick={handleTransactionClick} />
      })}
    </div>
  );
}
