import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { requestLogger, errorLogger } from "./middlewares/winston_logger/winstonLogger";
import {
    MongoClient
} from "mongodb";
import compression from 'compression';
import * as sapper from '@sapper/server';


dotenv.config();

const {
    PORT = 3002, NODE_ENV
} = process.env;
const dev = NODE_ENV === 'development';
const app = express();
let collectionUsers;

/*const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});*/

const corsOptions = {
    origin: ['http://localhost:3001', 'http://10.3.6.91:3000/', 'http://auth.gpntbsib.ru:3000', 'http://auth.gpntbsib.ru:3000/confirm-email', 'http://auth.gpntbsib.ru:3000/users/images', 'http://client.gpntbsib.ru:3002', 'http://localhost:3001/signin', 'http://localhost:3001/users/me/', 'http://localhost:3002'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};


app.use(cors(corsOptions));
//app.use(limiter);
app.use(cookieParser());
app.use(express.json({
    limit: '5mb'
}));
app.use(express.urlencoded({
    limit: '5mb',
    extended: true
}));


const {
    MONGO_URI
} = process.env;
const client = new MongoClient(MONGO_URI, {
    useUnifiedTopology: true
});

client.connect(function (err, client) {
    if (err) {
        return console.log(err);
    }
    app.locals.collection = client.db("patrons").collection("users");
    app.locals.additionalCollection = client.db("patrons").collection("users-archive");
    app.locals.usersFromIrbis = client.db("patrons").collection("users-from-irbis");
    console.dir("Подключение успешно");
});

collectionUsers = client.db("patrons").collection("users");
require('./middlewares/passport/passport')(passport, collectionUsers);
app.use(passport.initialize());

app.use(requestLogger);

app.use('/', require('./server-routes/index'));

app.use(errorLogger);


app.use(compression({
    threshold: 0
}));
app.use(express.static('static'));
app.use(sapper.middleware());

app.listen(PORT, err => {
    if (err) console.log('error', err);
});