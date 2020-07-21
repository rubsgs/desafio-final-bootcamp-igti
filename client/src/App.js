import React, {useEffect, useState} from 'react';
import TransactionApi from './services/TransactionApiService';
import Transaction from './components/Transaction/Transaction';
import PeriodSelector from './components/PeriodSelector';
import Loader from './components/Loader';
import Filter from './components/Filter';
import TransactionModal from './components/TransactionModal';
import Summary from './components/Summary/Summary';


export default function App() {
  let [transactions, setTransactions] = useState([]);
  let [currentTransaction, setCurrentTransaction] = useState(null);
  let [shownTransactions, setShownTransactions] = useState([]);
  let [requestRefresh, setRequestRefresh] = useState(false);
  let [periods, setPeriods] = useState([]);
  let [currentPeriod, setCurrentPeriod] = useState(-1);
  let [loading, setLoading] = useState(true);
  let [modalOpen, setModalOpen] = useState(false);
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
      if(currentPeriod < 0){
        setCurrentPeriod(currentIndex);
      } else {
        setCurrentPeriod(currentIndex);
      }

      const initTransactions = await TransactionApi.getByYearMonth(initPeriods[currentIndex].yearMonth);
      setTransactions(initTransactions);
      setShownTransactions(initTransactions);
      setLoading(false);
      setRequestRefresh(false);
    })();
  }, [requestRefresh]);

  const handlePeriodChange = async (newPeriod) => {
    setLoading(true);
    let newIndex = periods.findIndex((p) => p.yearMonth === newPeriod.yearMonth);
    const newTransactions = await TransactionApi.getByYearMonth(newPeriod.yearMonth);

    setCurrentPeriod(newIndex);
    setTransactions(newTransactions);
    setShownTransactions(newTransactions);
    setLoading(false);
  }

  const changeFilter = (text) => {
    if(text.trim() === ""){
      setShownTransactions(transactions);
    } else {
      const filtered = transactions.filter((transaction) => {
        return transaction.description.toLowerCase().indexOf(text) > -1;
      });

      setShownTransactions(filtered);
    }
  }

  const openModal = (e) =>{
    setModalOpen(true);
  }

  const closeModal = () => {
    setCurrentTransaction(null);
    setModalOpen(false);
  }

  const saveTransaction = async (transaction) => {
    
      try {
        if(transaction.id !== null && transaction.id !== "" && transaction.id !== undefined){
          await TransactionApi.update(transaction);
          window.alert("Transação atualizada");
        } else {
          await TransactionApi.create(transaction);
          window.alert("Transação cadastrada!");
        }

        closeModal();
        setRequestRefresh(true);
      } catch(e){
        window.alert("Ocorreu um erro ao efetuar a operacao!");
        console.log(e);
      }
  }

  const openUpdateTransaction = (transaction) => {
    setCurrentTransaction(transaction);
    setModalOpen(true);
  }

  const deleteTransaction = async (id) => {
    setLoading(true);
    try{
      await TransactionApi.delete(id);
      console.log("Transação Removida!");
    } catch(e){
      console.log(e);
      window.alert("Ocorreu um erro ao excluir a transação");
    } finally{
      setRequestRefresh(true);
    }
  }

  return (
    <div>
      <div className="container" style={styles.relativeContainer}>
        <div style={{textAlign:"center"}}><h1>Bootcamp Full Stack - Desafio Final</h1></div>
        {loading && <Loader />}
        {!loading && periods.length > 0 && <PeriodSelector periodList={periods} currentPeriodIndex={currentPeriod} handlePeriodSelection={handlePeriodChange} />}
        <div className="summary">
          {!loading && <Summary transactionList={shownTransactions} />}
        </div>
        {!loading && 
          <div className="row" style={styles.filterRow}>
            <div className="col l2">
              <button className="btn waves-effect waves-light" onClick={openModal}>Novo Lançamento</button>
            </div>
            <div className="col l10">
              <Filter handleFilterChange={changeFilter}/>
            </div>
          </div>
        }
        <div className="transaction-list">
          {!loading && shownTransactions.map((transaction) => {
            return <Transaction key={transaction._id} transaction={transaction} handleDelete={deleteTransaction} handleUpdate={openUpdateTransaction}/>
          })}
        </div>
      </div>
      {!loading && modalOpen && <TransactionModal modalOpen={modalOpen} closeModal={closeModal} transaction={currentTransaction} handleSaveTransaction={saveTransaction}/> }
    </div>
  );
}

const styles = {
  "filterRow": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "relativeContainer": {
    "position": "relative"
  }
}