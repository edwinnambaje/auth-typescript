import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import router from './routes/index'

const app = express();
app.use(cors({
    credentials: true
}));
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(9000, () => {
    console.log('Server is running on http://localhost:9000/')
})
const MONGO_URL = "mongodb+srv://edwins:edwins@cluster0.o8c7o1i.mongodb.net/Ts"
mongoose.Promise = Promise
mongoose.connect(MONGO_URL).then(() => console.log("Connected"));
mongoose.connection.on('error', (error: Error) => console.log(error));
app.use('/', router());