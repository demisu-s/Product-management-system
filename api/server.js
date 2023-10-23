const { config } = require('dotenv');
const express = require('express');
const app = express();
const dotenv=require('dotenv')
const morgan=require('morgan')
const bodyParser=require('body-parser')
const path=require('path')
const connectDB=require('./server/database/connection')

dotenv.config({path:'config.env'})
const PORT=process.env.PORT || 8080
//log request
app.use(morgan('tiny'))

//mongoDB connection 

connectDB();

//parse request to body-parser
app.use(bodyParser.urlencoded({extended:true}))
 
//set view engine
app.set("view engine","ejs")
// app.set("views",path.resolve(__dirname,""))



//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/image',express.static(path.resolve(__dirname,"assets/image")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))
//if i want to access to style.css file 
//the only thing i have to do is just write in this way
//css/style.css

//load route to server app

app.use('/',require('./server/routes/router'))


app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
