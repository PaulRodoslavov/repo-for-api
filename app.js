// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

const profile = require('./profile.js')

const users = process.argv.slice(2);
console.log('typeof: ' + typeof(users[0]));
users.forEach(profile.get);
