var moment = require('moment');

var date = moment().valueOf();
// date.add(1,'years').subtract(1,'months');
// console.log(date.format('MMM Do YYYY'));

// console.log(date.format('h:mm a')); 
console.log('Moment: ', date);
console.log('Date: ', new Date().getTime());