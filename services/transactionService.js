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

    static async findOne(id){
        return await TransactionModel.findOne({_id: id});
    }

    static async create(description, value, category, date, type){
        const [year, month, day] = date.split("-");
        const yearMonth = `${year}-${month}`;
        const newTransaction = new TransactionModel({description, value, category, year, month, day, yearMonth, yearMonthDay: date, type});
        await newTransaction.save();
        return newTransaction;
    }

    static async update(trsctn){
        console.log(trsctn);
        const currentTransaction = await TransactionService.findOne({_id:trsctn.id});
        if(currentTransaction === null){
            return currentTransaction;
        }
        
        delete trsctn.id;

        if(trsctn.yearMonthDay != currentTransaction.yearMonthDay && TransactionService.validaData(trsctn.yearMonthDay)){
            const arrData = trsctn.yearMonthDay.split("-");
            trsctn.day = arrData[2];
            trsctn.month = arrData[1];
            trsctn.year = arrData[0];
            trsctn.yearMonth = `${arrData[0]}-${arrData[1]}`;
        }

        return await TransactionModel.findOneAndUpdate({_id: currentTransaction._id}, trsctn, {new: true});
    }

    static async validaData(strData){
        const regex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
        const comparacao = regex.exec(strData)

        return comparacao !== null && comparacao.length > 0;
    }
}

module.exports = TransactionService;