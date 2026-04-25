const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const stEnqRouter = require("./Routes/stEnqRouter");
const AdRouter = require("./Routes/AdRouter");
const centerRouter = require("./Routes/centerRouter");
const visitorRouter = require("./Routes/visitorRouter");
const userRouter = require("./Routes/userRouter");
const assignRouter = require("./Routes/assignRouter");
const followupRouter = require("./Routes/followupRouter");
const otpRouter = require("./Routes/otpRouter");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log('Connected to MongoDB'))
.catch((e)=>(`Error ${e}`))

app.use(express.json());
app.use(cors());

//Routers
app.use('/api/enq', stEnqRouter);
app.use('/api/admin', AdRouter);
app.use('/api/center', centerRouter);
app.use('/api/visitor', visitorRouter);
app.use('/api/user', userRouter);
app.use('/api/assign', assignRouter);
app.use('/api/followup', followupRouter);
app.use('/api/otp', otpRouter);
app.use('/upload', express.static('Upload'));

app.listen(port, () => console.log(`Server running on port ${port}`));