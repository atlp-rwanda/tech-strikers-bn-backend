import CommentService from "../services/comment.service";
import request from "../services/tripRequest.service";

export default class commentsController {
  static async addComment(req, res) {
    try {
      const getRequestId = await request.findById(req.params.id);
      if (!getRequestId) {
        return res.status(404).json( {message: res.__("Request not Found")} );
      } else {
        const id = req.user.id;
        const comment = {
          userId: id,
          tripRequestId: req.params.id,
          comment: req.body.comment,
        };
      const savedComment = await CommentService.saveComment(comment);
      return res.status(201).json({ message: res.__("Comment submitted") });
    }
  } catch (error) {
        return res.status(500).json(error, {message: res.__("Invalid comment")});
    }
  }

  static async getAllComments(req, res) {
    try {
      const getRequestId = await request.findById(req.params.id);
      if (!getRequestId) {
        return res.status(404).json( {message: res.__("Request not Found")} );
      } else {
      const comments = await CommentService.findByProp({ tripRequestId: req.params.id} );
      return res.status(200).json(comments);
      }
  } catch (error) {
      return res.status(500).json({ message: res.__("Server Error")});
    }
  }

  static async deleteComment (req, res) {
    try {
      const { id } = req.params;
      const commentDeleted = await CommentService.commentDelete({ id: id });
      return res.status(200).json({ message: res.__("Comment deleted")});
    } catch (error) {
      return res.status(500).json({ message: res.__("Server Error")});
    }
  }
}
