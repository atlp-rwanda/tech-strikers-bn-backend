import models from "../database/models/";

const { Comment } = models;

/**
 * @description This service deals with the comment model
 */
export default class CommentServices {
  /**
   * @description saveComment
   * @param {object} addComment
   * @return {object} return the message
   */
  static async saveComment(addComment) {
    try {
      const comment = await Comment.create(addComment);
      return comment;
    } catch (err) {
      return err;
    }
  }

  /**
   * @description getCommentsByReqId
   * @param {object} prop
   * @return {object} return the message
   */
  static async findByProp(prop) {
    try {
      return Comment.findAll({where:prop}, { include: models.TripRequests });
    }
    catch (err) {
      return err;
    }
  }
}
