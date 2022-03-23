const db = require('./init.js');
const fs = require('fs');

const seeds = fs.readFileSync(__dirname + '/seeds.sql').toString();

db.query(seeds, () => console.log('Dev database seeded'));
