import express from 'express';
import bodyparser from 'body-parser';
// import { sessionMiddleware } from './middleware/session-middleware';
import { getUserByUsernameAndPassword } from './services/user-services';
import { usersRouter } from './routers/users-router';
import { reimbursementsRouter } from './routers/reimbursements-router';
// import { loggingMiddleware } from './middleware/logging-middleware';
import jwt from 'jsonwebtoken';
import { corsFilter } from './middleware/cors-middleware';

const app = express();

app.use(bodyparser.json());

app.use(corsFilter)
// app.use(sessionMiddleware);

// take login requests
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // if they don't put in a username or password deny their request
    if (!username || !password) {
        res.status(400).send('Invalid Credintials');
    } else {
        // check if the username and password are valid and return a user if they are
        try {
            const user = await getUserByUsernameAndPassword(username, password);
            const token = jwt.sign({userId: user.userId, roles: user.roles}, process.env['PROJECT_0_SECRET']);
            res.header('token', token).json(user);
        } catch (e) {
            res.status(e.status).send(e.message);
        }
    }
});

// app.use(loggingMiddleware);

// redirect to users-router
app.use('/users', usersRouter);

// redirect to requests-router
app.use('/reimbursements', reimbursementsRouter);

// take requests on the port 9001
app.listen(9001, () => {
    console.log('app has started');
});