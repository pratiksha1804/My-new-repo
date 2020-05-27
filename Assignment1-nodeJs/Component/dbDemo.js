const mongoose=require('mongoose');

// mongoose.Promise=global.Promise();
const http=require('http');
const app=require('../Component/utils/db/index');

const port=process.env.PORT ||3000;

const server=http.createServer(app);

server.listen(port);