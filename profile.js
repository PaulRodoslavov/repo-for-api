const https = require('https');
const http = require('http');


//Function to print message to console
function printMessage (userName, badgeCount, points) {
   const message = `${userName} has ${badgeCount} in total badge(s) and ${points} points in JavaScript`;
   console.log(message);
}
function printError(error) {
   console.error(error.message);
}
function get (username) {
   try {
      //Connect to the PAI URL (https://teamtreehouse.com/pavlorodoslavov.json)
         const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
                                    if (response.statusCode === 200) {

                                       let body = '';
                                       //Read the data
                                       response.on('data', data => {
                                       body += data.toString()
                                       });

                                       response.on('end', () => {
                                          try {
                                             //Parse the data
                                             const profile = JSON.parse(body);
                                             //Print the data
                                             printMessage(profile.name, profile.badges.length, profile.points.JavaScript);
                                          } catch (e) {
                                             printError(e);
                                          }
                                       });
                                    } else {
                                       const message = `There is an error, mather fucker, getting profile for ${username} (${http.STATUS_CODES[response.statusCode]})`
                                       const statusCodeEror = new Error(message)
                                       printError(statusCodeEror);
                                    }
                                 });
         request.on('error', error => console.error(`You have problem with: ${error.message}`));
   } catch (error) {
      printError(error);
   }
}

module.exports.get = get;
