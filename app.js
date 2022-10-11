//jshint esversion:6

// Set Up Server Starts 
// --------------------
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
// Set Up Server Ends 


// Mongoose Set Up Starts 
// --------------------
mongoose.connect("mongodb://localhost:27017/wikiDB", {
    useNewUrlParser: true
});

const articelSchema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article", articelSchema);

// Mongoose Set Up Ends 


// REST API Components Starts
// --------------------

app.route("/articles")
    .get(function (req, res) {
        // -- GET METHOD 
        Article.find(function (err, result) {
            if (!err) {
                res.send(result);
            } else {
                res.send(err);
            }
        });
    })
    .post(function (req, res) {
        // -- POST METHOD 
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save(function (err) {
            if (!err) {
                res.send("Succefully Added ! ");
            } else {
                res.send(err);
            }
        });
    })
    .delete(function (req, res) {
        // -- DELETE METHOD 
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save(function (err) {
            if (!err) {
                res.send("Succefully Added ! ");
            } else {
                res.send(err);
            }
        });
    });

app.route("/articles/:articleTitle")
    .get(function (req, res) {
        Article.findOne({ title: req.params.articleTitle }, function (err, result) {
            if (!err) {
                res.send(result);
            } else {
                res.send(err);
            }
        });
    })
    .put(function (req, res) {
        Article.replaceOne(
            { title: req.params.articleTitle },
            {
                title: req.body.title,
                content: req.body.content
            },
            function (err, result) {
                if (!err) {
                    res.send("Successfully Updated Article ");
                } else {
                    res.send("Not Updated" + err.message);
                }
            });
    })
    .patch(function (req, res) {
        Article.update(
            { title: req.params.articleTitle },
            {
                $set: {
                    content: req.body.content
                }
            },
            function (err, result) {
                if (!err) {
                    res.send("Successfully PATCHED Article ");
                } else {
                    res.send("Not PATCHED" + err.message);
                }
            });
    })
    .delete(function (req, res) {
        Article.deleteOne(
            { title: req.params.articleTitle },
            function (err) {
                if (!err) {
                    res.send("Successfully DELETED Article ");
                } else {
                    res.send("Not DELETED" + err.message);
                }
            });
    });

// REST API Components Ends 


app.listen(3000, function () {
    console.log("Server started on port 3000");
});