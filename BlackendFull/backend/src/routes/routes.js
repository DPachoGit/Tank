import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.post('/register', (req, res) => {
    userController.register(req, res)
});

router.get('/getUsers', (req, res) => {
    userController.getUsers(req, res);
});

router.get('/getUser', (req, res) => {
    userController.getUser(req, res)
});

export default router;