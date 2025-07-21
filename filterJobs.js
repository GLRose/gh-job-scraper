const fs = require('fs');
const companies = require('./companies.json');

let data = [];

for (const company of companies) {
    if(company.region === 'Worldwide'){
        console.log(company);
        data.push(company);
    }
}
fs.writeFileSync('worldwide.json', JSON.stringify(data, null, 2), 'utf8');
console.log('✅ Data saved to worldwide.json');

