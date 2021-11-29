// Setup empty JS object to act as endpoint for all routes
let projectData = {};
const apiKey = '&appid=e31548070754746e47db244d4fd8fd43';
const url = 'https://api.openweathermap.org/data/2.5/weather?zip=';


// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const port = 8000;


// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Routs 
app.get('/getData', (req, res)=>{
    res.send(projectData);
});

app.post('/postData', async (req,res)=>{
    let d = new Date();
    let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
    let temp = await getWeatherData(req.body.zipCode);
    projectData = {
        'zipCode' : req.body.zipCode,
        'feelings': req.body.feelings,
        'date' : newDate,
        'temp' : temp
    };
    res.send(projectData);
});



// Setup Server
app.listen(port,()=>{
    console.log(`server on (${port})`);
});


// functions web API
let getWeatherData = async (zip )=>{
    let urlR = url + zip + apiKey;
    let request = await fetch(urlR,{
        headers: {
            'Content-Type': 'application/json'
          },
    });
    try{
        let response = await request.json();
        return response.main.temp;
    }catch(err){
        console.log('Error Fetching data from webApi!!!\n' + err );
    }
};
