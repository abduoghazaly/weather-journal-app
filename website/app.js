/* Global Variables */

// Create a new date instance dynamically with JS
// let d = new Date();
// let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// get project Data 
let getProjectData = async () => {
    let request = await fetch('/getData');
    try {
        let response = await request.json();
        return response;
    } catch (err) {
        console.log("Error: " + err);
        throw err;
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
    }).then(response => response.text());
    try {
        let response = await request;
        return true;
    } catch (err) {
        console.log("Error: " + err);
        throw err;
    }
};

// collecting input data 
let inputData = () => {
    let zipCode = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;
    document.getElementById('zip').value = '';
    document.getElementById('feelings').value = '';
    return { 'zipCode': zipCode, 'feelings': feelings };
};

// update UI 
let updateUI = (data) => {
    document.getElementById('date').innerText = data.date;
    if(data.temp === undefined){
        document.getElementById('temp').innerText = 'Error web API!!!';
    }else{
        document.getElementById('temp').innerText = data.temp + 'F';
    }
    document.getElementById('content').innerText = data.feelings;
};

// listner function
let sendData = () => {
    if (document.getElementById('zip').value === '') {
        document.getElementById('error').classList.remove('displayNone');
    } else {
        document.getElementById('error').classList.add('displayNone');
        let body = inputData();
        // this is a way to chain the methods <===== its so annouing in the first but then i found it's so good if you make the functions return data or error
        postData(body).then(ress => getProjectData()).then(data =>  updateUI(data)).catch(error => console.log(error));
    }
};

// listner 
document.getElementById('generate').addEventListener('click', sendData);