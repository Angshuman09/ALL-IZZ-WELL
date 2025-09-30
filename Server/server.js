import express from 'express';
import dotenv from 'dotenv';
import { db } from './lib/DB.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/admins/auth.route.js'
dotenv.config();
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 4000;

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/dashboards', dashboardRoutes);

app.listen(PORT, ()=>{
    db()
    console.log(`app is listening in the port: ${PORT}`);
})
