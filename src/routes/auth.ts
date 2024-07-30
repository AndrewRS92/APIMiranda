import express from 'express';
import AuthService from '../services/AuthService';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const newUser = await AuthService.register(req.body);
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const result = await AuthService.login(req.body.email, req.body.password);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
