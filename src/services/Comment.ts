import CommentModel from '../models/CommentsData';
import { Comment as CommentType } from '../interfaces/comment';

class CommentService {
  static async createComment(commentData: CommentType): Promise<CommentType> {
    try {
      const newComment = new CommentModel(commentData);
      const savedComment = await newComment.save();
      return savedComment.toObject() as CommentType;
    } catch (error) {
      console.error('Error adding new comment:', error);
      throw new Error('Error adding new comment');
    }
  }

  static async getComments(): Promise<CommentType[]> {
    try {
      const comments = await CommentModel.find().exec();
      return comments.map(comment => comment.toObject()) as CommentType[];
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw new Error('Error fetching comments');
    }
  }

  static async getCommentById(id: string): Promise<CommentType> {
    try {
      const comment = await CommentModel.findById(id).exec();
      if (!comment) {
        throw new Error(`Comment with id ${id} not found`);
      }
      return comment.toObject() as CommentType;
    } catch (error) {
      console.error(`Error fetching comment #${id}:`, error);
      throw new Error(`Error fetching comment #${id}`);
    }
  }

  static async updateComment(id: string, commentData: Partial<CommentType>): Promise<CommentType> {
    try {
      const updatedComment = await CommentModel.findByIdAndUpdate(id, commentData, { new: true }).exec();
      if (!updatedComment) {
        throw new Error(`Error updating comment #${id}`);
      }
      return updatedComment.toObject() as CommentType;
    } catch (error) {
      console.error(`Error updating comment #${id}:`, error);
      throw new Error(`Error updating comment #${id}`);
    }
  }

  static async deleteComment(id: string): Promise<CommentType> {
    try {
      const deletedComment = await CommentModel.findByIdAndDelete(id).exec();
      if (!deletedComment) {
        throw new Error(`Error deleting comment #${id}`);
      }
      return deletedComment.toObject() as CommentType;
    } catch (error) {
      console.error(`Error deleting comment #${id}:`, error);
      throw new Error(`Error deleting comment #${id}`);
    }
  }
}

export default CommentService;
