/*Based on the inspection of the table's structure,
 the tbody contains rows with only 2 cells,
 while the table header indicates there should be 6 columns
 ("Metropolitan area", "Core city", "Population", "Area(km2)", "Country", "Census year").
 This inconsistency prevents the direct extraction of data using the column indices derived from the header and
 thus this task is impossible for me.
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const dbPath = path.join(__dirname, 'db.json');
const complaintPath = path.join(__dirname, 'complaints.json');

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Received username:', username);
    console.log('Received password:', password);

    let users = [];
    if (fs.existsSync(dbPath)) {
        const fileData = fs.readFileSync(dbPath, 'utf8');
        users = JSON.parse(fileData);
    }

    users.push({ username, password });
    fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));
    res.json({ message: 'Login data received' });
});

app.post('/complaint', (req,res) =>{
    const {complaintName, complaintReason, description} = req.body;
    console.log('Received complaint name:', complaintName);
    console.log('Received complaint reason:', complaintReason);
    console.log('Received description:',);
    res.json({ message: 'Complaint data received' });

    let complaints = [];
    if(fs.existsSync(complaintPath)){
        const fileData = fs.readFileSync(complaintPath, 'utf8').trim();
        if(fileData){
            complaints = JSON.parse(fileData);
        }
    }
    complaints.push({complaintName, complaintReason, description});
    fs.writeFileSync(complaintPath, JSON.stringify(complaints, null, 2));
})
app.get('/complaint', (req,res) =>{
    let complaints = [];
    if(fs.existsSync(complaintPath)){
        const fileData = fs.readFileSync(complaintPath, 'utf8').trim();
        if(fileData){
            complaints = JSON.parse(fileData);
        }
    }
    res.json(complaints);
})
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
