const { config } = require('dotenv');
const express = require('express');
const app = express();
const dotenv=require('dotenv')
const morgan=require('morgan')
const bodyparser=require('body-parser')
const path=require('path')

dotenv.config({path:'config.env'})
const PORT=process.env.PORT || 8080
//log request
app.use(morgan('tiny'))
//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))
 
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

app.get('/', (req, res) => {
   res.render('index')
});

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
