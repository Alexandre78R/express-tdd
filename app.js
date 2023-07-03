// app.js
const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./connection');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const get = (req, res) => {
    res.status(200).json({ 'message': 'Hello World!'})
}
const addOnePost = (body) => {
    const { url, title } = body;
    return connection.execute("insert into bookmark (url, title) values (?, ?)", [
        url,
        title,
      ])
      .then(([result]) => result);
};

const post = async (req, res) => {
    const { url, title } = req.body;
    console.log('url', url);
    console.log("title", title)
    if (!url || !title) {
      return res.status(422).json({ error: 'required field(s) missing' });
    }

    try {
        const result = await addOnePost(req.body);
        res.status(201).json({ id: result.insertId, ...req.body });
      } catch (error) {
       console.error(error)
       return res.status(500).json({ error: err.message, sql: err.sql })
      }
}

  
app.get('/', get);
app.post('/bookmarks', post);
module.exports = app;
