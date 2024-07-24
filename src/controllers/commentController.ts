import express from 'express';
import CommentService from '../services/Comment';

const router = express.Router();

router.get('/', (_req, res) => {
  const comments = CommentService.fetchAll();
  res.json(comments);
});

router.get('/:id', (req, res, next) => {
  const comment = CommentService.fetchOne(Number(req.params.id));
  if (!comment) {
    next (res.status(404).json({ message: 'Comment not found' })) ;
  }
  res.json(comment);
});

// router.post('/', (req, res) => {
//   const newComment = CommentService.create(req.body);
//   res.status(201).json(newComment);
// });

// router.put('/:id', (req, res) => {
//   const updatedComment = CommentService.update(Number(req.params.id), req.body);
//   if (!updatedComment) {
//     return res.status(404).json({ message: 'Comment not found' });
//   }
//   res.json(updatedComment);
// });

// router.delete('/:id', (req, res) => {
//   const success = CommentService.delete(Number(req.params.id));
//   if (!success) {
//     return res.status(404).json({ message: 'Comment not found' });
//   }
//   res.status(204).send();
// });

export default router;
