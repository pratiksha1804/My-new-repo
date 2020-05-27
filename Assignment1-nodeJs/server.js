const http=require('http');
const app=require('./app');

const port=process.env.PORT ||3001;

const server=http.createServer(app);
console.log("listening port 3001")
server.listen(port);
