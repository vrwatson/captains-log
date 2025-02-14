const logs = require("express").Router()

const logsArray = require('../models/log')

logs.get("/", (req,res) => {
    res.json(logsArray)
})

logs.post("/", (req, res) => {
    logsArray.push(req.body);
    res.json(logsArray[logsArray.length - 1])
    // res.json(logsArray)
})

// http://localhost:3333/logs? query=something
//                   /logs? lastCrisis=gte20

logs.get("/", (req, res) => {
    console.log(req.query);
    console.log(req.params);
    const { lastCrisis } = req.query;
    const { gte20 } = req.params;
    console.log(lastCrisis);
    console.log(gte20);
    logsArray.map((log) => {
        if(log.daysSinceLastCrisis > gte20) {
            res.json(log)
        }
    })
});

logs.put("/:arrayIdx", (req, res) => {
    const { arrayIdx } = req.params
    const { body } = req
    logsArray[arrayIdx] = body;
    res.json(logsArray[arrayIdx])
})

logs.delete("/:arrayIdx", (req, res) => {
    const { arrayIdx } = req.params
    const { deletedIdx } = logsArray.splice(arrayIdx, 1)
    res.json(deletedIdx[0])
})


module.exports = logs