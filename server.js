const express = require('express');
const bodyParser = require('body-parser');
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');
const { log } = require('console');

const app = express();
const PORT = process.env.PORT || 5500;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.post('/submit', (req, res) => {
    const { name, email, phone, organization, budget, message } = req.body;
    const filePath = path.join(__dirname, 'data.xlsx');
    
    const workbook = new ExcelJS.Workbook();

    if (fs.existsSync(filePath)) {
        workbook.xlsx.readFile(filePath).then(() => {
            const worksheet = workbook.getWorksheet('Contacts') || workbook.addWorksheet('Contacts');
            worksheet.columns = [
                { header: 'Name', key: 'name', width: 20 },
                { header: 'Email', key: 'email', width: 30 },
                { header: 'Phone', key: 'phone', width: 15 },
                { header: 'Organization', key: 'organization', width: 30 },
                { header: 'Budget', key: 'budget', width: 10 },
                { header: 'Message', key: 'message', width: 50 },
            ];
            worksheet.addRow({ name, email, phone, organization, budget, message });
            return workbook.xlsx.writeFile(filePath);
        }).then(() => {
            res.send('Submitted');
        }).catch(err => {
            console.error('Error writing to file:', err);
            res.status(500).send('Error saving form data');
        });
    } else {
        const worksheet = workbook.addWorksheet('Contacts');
        worksheet.columns = [
            { header: 'Name', key: 'name', width: 20 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Phone', key: 'phone', width: 15 },
            { header: 'Organization', key: 'organization', width: 30 },
            { header: 'Budget', key: 'budget', width: 10 },
            { header: 'Message', key: 'message', width: 50 },
        ];
        worksheet.addRow({ name, email, phone, organization, budget, message });

        workbook.xlsx.writeFile(filePath).then(() => {
            res.send('Submitted');
            // console.log('saved sucessfully');
        }).catch(err => {
            console.error('Error writing to file:', err);
            res.status(500).send('Error saving form data');
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
