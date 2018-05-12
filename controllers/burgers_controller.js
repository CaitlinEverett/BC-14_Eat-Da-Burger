const express = require("express");
const router = express.Router();
const burger = require("../models/burger.js");

// routing
router.get("/", function (req, res) {
    burger.all(function (data) {
        var hbsObject = {
            burgers: data
        };
        res.render("index", hbsObject);
    });
});

//post new burger
router.post("/api/burgers", function (req, res) {
    burger.create([req.body.name], function (result) {
        res.json({
            id: result.insertId
        });
    });
});

//put is used to create or update
router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    burger.update(req.body, condition, function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

//delete a burger
router.delete("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    burger.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Export routes 
module.exports = router;