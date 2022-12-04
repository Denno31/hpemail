const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000;
const nodemailer = require("nodemailer")
const bodyParser = require('body-parser')

app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.get("/",(req,res)=>{
    res.send('hello world')
})
app.post("/send-email",(req,res)=>{
  console.log(req.body)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "smsalerts2022app@gmail.com",
      pass: "ffrunxhllteqlevp",
    },
  });
  
  let mailOptions = {
    from: 'SMS Alerts 2020',
    to: ["forestviewminimart@gmail.com"],
    subject: `${req.body.subject}`,
    html: `<body>${req.body.message}</body>`,
  };
  
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err)
      res.send("An error occurred")
    } else {
      
      res.send({message:req.body.message})
    }
  });  
})

app.post("/test",(req,res)=>{
  console.log(req.body)
  res.send("test")
})
  app.listen(PORT,()=>{
    console.log(`app is running on port: ${PORT}`)
  })