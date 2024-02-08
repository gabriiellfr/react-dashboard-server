const express = require('express');

const authRouter = require('./auth.router');
const agentsRouter = require('./agents.router');
const chatsRouter = require('./chats.router');
const booksRouter = require('./books.router');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRouter,
    },
    {
        path: '/agents',
        route: agentsRouter,
    },
    {
        path: '/chats',
        route: chatsRouter,
    },
    ,
    {
        path: '/books',
        route: booksRouter,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
