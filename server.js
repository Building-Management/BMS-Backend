const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const adminRouter = require('./src/routers/admin/admin'); // Import your user router
const authRouter = require('./src/routers/common/auth');
const jobRouter = require('./src/routers/common/job');
const { authorize } = require('./src/middleware/authMiddleware'); // Import your authorization middleware


const app = express()
app.use(express.json());

// Define routes
// Mount your user router with authorization middleware
app.use('/api/admin', adminRouter); // Assuming your user router handles all user-related endpoints under the /api/users route
app.use('/api/auth', authRouter);
app.use('/api/admin', jobRouter);

// app.get('/', (req, res) => {
//     res.send('hello node abdi')
// })

app.listen(3001, () => {
    console.log("port 3000 is under survelliannce")
})