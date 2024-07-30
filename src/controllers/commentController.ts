import { Router, Request, Response, NextFunction } from 'express';
import Comment from '../models/CommentsData';

const router = Router();

router.post('/create', async (req: Request, res: Response, _next: NextFunction) => {
  const commentData = req.body;
  try {
    const newComment = await Comment.create(commentData);
    return res.status(201).json(newComment);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating comment', error });
  }
});

router.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
  try {
    const comments = await Comment.find();
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching comments', error });
  }
});

export default router;
