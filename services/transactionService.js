const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');


class TransactionService{
    static async getTransactions(filtros = {}){
        return await TransactionModel.find(filtros);
    }

    static async getPeriods(){
        try{
            return await TransactionModel.aggregate([{$group: {_id: "$yearMonth"}}, {$project: {_id:0, "yearMonth": "$_id"}}, {$sort: {yearMonth: 1}}]);
        } catch(e){
            console.log(e);
        }
    }

    static async create(description, value, category, date, type){
        const [year, month, day] = date.split("-");
        const yearMonth = `${year}-${month}`;
        const newTransaction = new TransactionModel({description, value, category, year, month, day, yearMonth, yearMonthDay: date, type});
        await newTransaction.save();
        return newTransaction;
    }
}

module.exports = TransactionService;