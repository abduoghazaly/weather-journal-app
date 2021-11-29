/* Global Variables */


// Create a new date instance dynamically with JS
// let d = new Date();
// let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// get project Data 
let getProjectData = async () => {
    let request = await fetch('/getData');
    try {
        let response = await request.json();
        updateUI(response);
    } catch (err) {
        console.log("Error: " + err);
    }
};

// post Data 
let postData = async (body) => {
    let request = await fetch('/postData', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(response => response.json());
    try {
        let response = await request;
        updateUI(response);
    } catch (err) {
        console.log("Error: " + err);
    }
};

// collecting input data 
let inputData = () => {
    let zipCode = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;
    document.getElementById('zip').value = '';
    document.getElementById('feelings').value = '';
    return { 'zipCode':zipCode, 'feelings':feelings };
};

// update UI 
let updateUI = (data)=>{
    document.getElementById('date').innerText = data.date;
    document.getElementById('temp').innerText = data.temp;
    document.getElementById('content').innerText = data.feelings;
}; 

// listner function
let sendData = () => {
    let body = inputData();
    postData(body);
};

// listner 
document.getElementById('generate').addEventListener('click', sendData);