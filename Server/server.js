import express from 'express';
import templateRoutes from './routes/template.route.js'
import cors from "cors";
import "dotenv/config";
import connectDB from './configs/db.js';
import reportRoutes from './routes/report.route.js';
import authRoutes from './routes/auth.route.js';
import dns from 'dns';

//change dns
dns.setServers(["1.1.1.1","8.8.8.8"]);

const app = express ();
const PORT = process.env.PORT || 3000; 

await connectDB ()

app.use(cors());
app.use(express.json());
app.use("/api/templates", templateRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/auth", authRoutes);


app.get("/", (req, res)=>{
    res.send("server is running ");
});

app.listen(PORT , ()=>{
    console.log(`example app listening on port ${PORT}`);
})