const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const adminRouter = require('./src/routers/admin/admin'); // Import your user router
const authRouter = require('./src/routers/common/auth');
const jobRouter = require('./src/routers/common/job');
const paymentRouter = require('./src/routers/common/payment');
const contractRouter = require('./src/routers/common/contract');
const noticeAdminRouter = require('./src/routers/admin/noticeAdmin');
const noticeRenteeRouter = require('./src/routers/rentee/noticeRentee');
const blockRouter = require('./src/routers/admin/block');
const { authorize } = require('./src/middleware/authMiddleware'); // Import your authorization middleware

const events = require('events');
events.EventEmitter.defaultMaxListeners = 20; // or any number you find appropriate


const cors = require('cors')

// const corsOption = {
//     credential: true,
//     origin: ['http://192.168.8.72:5173']
//         // origin: ['*']

// }

const corsOption = {
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific methods
    allowedHeaders: 'Content-Type,Authorization', // Allow specific headers
    credentials: true // Allow cookies to be sent with requests
};


const app = express()
app.use(cors(corsOption));
app.use(express.json());


// Define routes
// Mount your user router with authorization middleware
app.use('/api/admin', adminRouter); // Assuming your user router handles all user-related endpoints under the /api/users route
app.use('/api/auth', authRouter);
app.use('/api/admin', jobRouter);
app.use('/api/rentee', paymentRouter);
app.use('/api/contracts', contractRouter);
app.use('/api/admin/notice', noticeAdminRouter);
app.use('/api/rentee/notice', noticeRenteeRouter);
app.use('/api/block', blockRouter);

// app.get('/', (req, res) => {
//     res.send('hello node abdi')
// })

app.get("/status", (req, res) => {
    res.json({
        status: "ok"
    })

})

const port = 3001;
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})