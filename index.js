const express=require("express")
const app=express()
require("dotenv").config()
const nodemailer=require("nodemailer")
app.use(express.urlencoded({extended:true}))
app.use(express.static("./public"))

app.get("/",(req,res)=>{
    res.send("welcome to coding competition")
})

app.get("/home",(req,res)=>{
    res.sendFile(__dirname+"/form.html")
})

const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
})

app.post("/mailer",(req,res)=>{
    const {email}=req.body
    const mailOptions={
        from:"nujoom.sm@gmail.com",
        to:email,
        subject:"testing mail",
        text:"This is my email project"
    }
    
    transporter.sendMail(mailOptions,(err,data)=>{
    if(err){
        console.log(err);
        res.send("something went wrong")
    }
    else{
        res.send("mail sent successfully")
    }
    })
    
})



app.listen(process.env.PORT||8080)