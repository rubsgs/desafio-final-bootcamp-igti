const ts = require("../services/transactionService");
const express = require('express');
const transactionRouter = express.Router();

transactionRouter.get("/all", (req, res) => {
    ts.getTransactions({}).then(transactions => {
        console.log(transactions);
        res.send(transactions);
    });
});

transactionRouter.get("/description/:description", (req, res) => {
    const {description} = req.params;
    ts.getTransactions({description}).then(transactions => {
        res.send(transactions);
    });
});

transactionRouter.get("/yearMonth/:yearMonth", (req, res) => {
    const {yearMonth} = req.params;
    ts.getTransactions({yearMonth}).then(transactions => {
        res.send(transactions);
    });
});

transactionRouter.get("/periods", (req, res) => {
    ts.getPeriods().then(periods => {
        res.send(periods);
    })
});



module.exports = transactionRouter;
