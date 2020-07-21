import axios from 'axios';

const API_URL="/api/transaction";

export default class TransactionApi{
    static async getPeriods(){
        const periodList = await axios.get(`${API_URL}/periods`);
        return periodList.data;
    }
    static async getByYearMonth(yearMonth){
        const transactionList = await axios.get(`${API_URL}/yearMonth/${yearMonth}`);
        return transactionList.data;
    }

    static async update(transaction){
        const updatedTransaction = await axios.put(`${API_URL}`, transaction);
        return updatedTransaction.data;
    }

    static async create(transaction){
        console.log("axios");
        console.log(transaction);
        const newTransaction = await axios.post(`${API_URL}`, transaction);
        return newTransaction.data;
    }
}