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
}