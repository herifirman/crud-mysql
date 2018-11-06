var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({
    extended:true
}));

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "mydemo"
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection sukses');
    else
        console.log('DB conection gagal \n Error :' + JSON.stringify(err, undefined, 2)); 
});
const PORT = process.env.PORT || 3000
app.listen(PORT,()=>console.log('Express server is running at port on:'+PORT));


app.get("/", (req, res) =>{
console.log("response")
res.send("Hallo")
});

//get all employee
app.get('/product', (req,res) =>{
    mysqlConnection.query('SELECT * FROM product' , (err, rows, fields)=>{
        res.end(JSON.stringify(rows));
    })
});

//get all product id
app.get('/product/:id', (req,res) =>{
    mysqlConnection.query('SELECT * FROM product WHERE id = ?',[req.params.id],(err, rows, fields)=>{
        res.end(JSON.stringify(rows));
    })
});

//DELETE an product
app.delete('/product/:id', (req,res) =>{
    mysqlConnection.query('DELETE FROM product WHERE id = ?',[req.params.id],(err, rows, fields)=>{
        if (!err)
        res.send('deleted sukses');
        else
        console.log(err);
    })
});

//Insert an product
app.post('/product', (req,res) =>{
    mysqlConnection.query('insert into product (name, price, quantity, status) values (?,?,?,?)',[req.body.name, req.body.price, req.body.quantity, req.body.status],(err, rows, fields)=>{
        if (!err)
        res.send('insert sukses');
        else
        console.log(err);
    })
});
//update an product
app.put('/product', (req,res) =>{
    mysqlConnection.query('update product set name = ?, price = ?, quantity = ?, status = ? where id = ?' , [req.body.name, req.body.price, req.body.quantity, req.body.status, req.body.id],(err, rows, fields)=>{
        if (!err)
        res.send('update sukses');
        else
        console.log(err);
    })
});