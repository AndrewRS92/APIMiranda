import { Comment } from '../interfaces/comment';
import commentsData from '../data/CommentsData.json';

export default class CommentService {
  static fetchAll(): Comment[] {
    return commentsData;
  }

  static fetchOne(id: number): Comment | undefined {
    return commentsData.find(comment => comment.id === id);
  }

  static create(comment: Comment): Comment {
    const newComment = { ...comment, id: commentsData.length + 1 };
    commentsData.push(newComment);
    return newComment;
  }

  static update(id: number, updatedComment: Partial<Comment>): Comment | undefined {
    const commentIndex = commentsData.findIndex(comment => comment.id === id);
    if (commentIndex === -1) {
      return undefined;
    }
    const updated = { ...commentsData[commentIndex], ...updatedComment };
    commentsData[commentIndex] = updated;
    return updated;
  }

  static delete(id: number): boolean {
    const commentIndex = commentsData.findIndex(comment => comment.id === id);
    if (commentIndex === -1) {
      return false;
    }
    commentsData.splice(commentIndex, 1);
    return true;
  }
}
