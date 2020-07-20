// spin up node.js server on port 3000

// handle two routes: / and /users
    // return some greeting on /
    // return a list of dummy users

// add a form with a username input to the / page and submit a POST request to /create-user upon a button click

// add the /create-user route and parse the incoming data and log it the the console


const http = require('http')

const routes = require('./routes')

const server = http.createServer(routes)

server.listen(3000)