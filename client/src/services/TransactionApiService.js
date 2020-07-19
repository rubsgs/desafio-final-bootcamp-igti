import axios from 'axios';

const API_URL="http://localhost:3001/api";

export default class TransactionApi{
        static async getByYearMonth(yearMonth){
        const transactionList = await axios.get(`${API_URL}/transaction/yearMonth/${yearMonth}`);
        return transactionList.data;
    }
}