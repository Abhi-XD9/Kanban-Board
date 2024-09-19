const express=require('express')
const cors=require('cors')
const app=express()
const mysql=require('mysql2')
const Port= process.env.PORT || 9000

app.use(express.json());
app.use(cors())

require('dotenv').config();

const port = process.env.PORT;
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;

const db = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbDatabase
});

app.get('/tasks',(req,res)=>{
    const sql = "SELECT * FROM tasks";
    db.query(sql,(err,results)=>{
        if(err){
            console.log(err);
        };
        res.json(results);
    })
})

app.post('/tasks',(req,res)=>{
    const {title,description}=req.body
    const sql="INSERT INTO tasks(`title`, `description`) VALUES (?,?)"
    const VALUES = [title,description]
    db.query(sql,VALUES,(err,results)=>{
        if(err){
            console.log(err.code)
        } ;
        res.json({message:"Task Added Successfully"})
    })
})

app.put('/tasks/:id',(req,res)=>{
    const {id}=req.params
    const{title,description} =req.body
    const VALUES = [id,title,description]
    const sql = "UPDATE tasks SET `title` = ?, `description` = ? WHERE `id`=?"
        db.query(sql,VALUES,(err,results)=>{
        if(err){
            console.log(err.code)
            res.status(500).json({ message: 'Failed to Update task' });
        };
        res.json({message:"Task Updated Successfully"})
    })

})


app.delete('/tasks/:id',(req,res)=>{
    const {id}=req.params
    const VALUES = [id]
    const sql="DELETE FROM tasks WHERE `id`=?"
    db.query(sql,VALUES,(err,results)=>{
        if(err){
            console.log(err.code)
            res.status(500).json({ message: 'Failed to delete task' });
        };
        res.json({message:"Task Updated Successfully"})
    })

})


app.listen(Port,()=>{
    console.log("Server Started")
})
