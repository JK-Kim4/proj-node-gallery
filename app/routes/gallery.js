const { json } = require('express');
const express = require('express');
const fs = require('fs');
const path = require('path');
const http = require('http');
const route = express.Router();
const app = express();
//const db = require('../config/db');
const { func } = require('joi');
const cors = require('cors');
const request = require('request');

app.use('/public', express.static(path.join(__dirname, 'static')));
app.use(cors());
express.json();
const data = fs.readFileSync('./static/data.json', 'utf-8');
const jsonData = JSON.parse(data);



//index page : {domain}/
route.get("/", (req,res)=>{
    console.log("enter the index");
    res.render('index');
});

//select all
route.get('/photos', (req,res)=>{
    console.log("select all");
    //request("http://192.168.219.101:18080/photos", function(err, response, body){
    request("http://localhost:13000/photos", (err, response, body)=>{
        if(!err && response.statusCode == 200){
            var data = JSON.parse(body);
            res.json(data);
        }
    });
});

//select by id
route.get('/photo/:id', (req,res)=>{
    var id = req.params.id;
    console.log("query paramter id : " + id);

    //request("http://192.168.219.101:18000/photo/"+id, (err, response, body)=>{
    request("http://localhost:13000/photo/"+id, (err, response, body)=>{
        var data = JSON.parse(body);
        if(!err && response.statusCode == 200 && data.result == 'success'){
            console.log(data.data[0]);
            res.json(data.data[0]);
        }
    });
});

// route.get('/sql', (req,res1)=>{
//     db.query('SELECT * FROM comments c', (err, res2)=>{
//         console.log(res2.rows);
//         if(err)
//             console.log(err);
//         else
//             res1.render('index', {
//                 resData : jsonData.photos,
//                 sqlData : res2.rows
//             });
//     });
// });


module.exports = route;