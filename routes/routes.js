const ts = require("../services/transactionService");
const express = require('express');
const transactionRouter = express.Router();

transactionRouter.get("/all", (req, res) => {
    ts.getTransactions({}).then(transactions => {
        console.log(transactions);
        res.send(transactions);
    });
});

transactionRouter.get("/id/:id", (req, res) => {
    var {id} = req.params
    ts.findOne(id).then(transaction => {
        if(transaction === null){
            res.status(404).end();
        } else {
            res.send(transaction);
        }
    }).catch(e => {
        console.log(e);
        res.status(400).end();
    })
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
    });
});

transactionRouter.post("/", (req, res) => {
    const {description, value, category, date, type} = req.body;
    ts.create(description, value, category, date, type).then(newTransaction => {
        res.send(newTransaction);
    }).catch(e => {
        console.log(e);
        res.status(500);
        res.end();
    });
});

transactionRouter.put("/", (req, res) => {
    ts.update(req.body).then(newTransaction => {
        if(newTransaction === null){
            res.status(404).end();
        } else {
            res.send(newTransaction);
        }
    });
});

module.exports = transactionRouter;
