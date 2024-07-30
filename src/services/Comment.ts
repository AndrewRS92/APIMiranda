import Comment from '../models/CommentsData';

class CommentService {
  async createComment(commentData: any) {
    const comment = new Comment(commentData);
    return await comment.save();
  }

  async getComments() {
    return await Comment.find();
  }

  async getCommentById(id: string) {
    return await Comment.findById(id);
  }

  async updateComment(id: string, updateData: any) {
    return await Comment.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteComment(id: string) {
    return await Comment.findByIdAndDelete(id);
  }
}

export default new CommentService();
