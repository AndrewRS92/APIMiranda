import { Router, Request, Response, NextFunction } from 'express';
import CommentService from '../services/Comment';

const commentController = Router();

commentController.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
  try {
    const comments = await CommentService.getComments();
    if (comments) {
      return res.status(200).json(comments);
    } else {
      return res.status(404).json({ message: `Comments not found` });
    }
  } catch (error) {
    return res.status(500).json({ message: `Error fetching comments`, error });
  }
});

commentController.get('/:id', async (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id;
  try {
    const comment = await CommentService.getCommentById(id);
    if (comment) {
      return res.status(200).json(comment);
    } else {
      return res.status(404).json({ message: `Comment with id ${id} not found` });
    }
  } catch (error) {
    return res.status(500).json({ message: `Error fetching comment #${id}`, error });
  }
});

commentController.post('/create', async (req: Request, res: Response, _next: NextFunction) => {
  const commentData = req.body;
  try {
    const newComment = await CommentService.createComment(commentData);
    return res.status(201).json(newComment);
  } catch (error) {
    return res.status(500).json({ message: 'Error adding new comment', error });
  }
});

commentController.put('/update/:id', async (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const updatedComment = await CommentService.updateComment(id, data);
    if (updatedComment) {
      return res.status(200).json(updatedComment);
    } else {
      return res.status(404).json({ message: `Comment with id ${id} not found` });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error updating comment', error });
  }
});

commentController.delete('/delete/:id', async (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id;
  try {
    const deletedComment = await CommentService.deleteComment(id);
    if (deletedComment) {
      return res.status(200).json(deletedComment);
    } else {
      return res.status(404).json({ message: `Comment with id ${id} not found` });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting comment', error });
  }
});

export { commentController };
