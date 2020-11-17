/**
 * @description it converts the success response into json object
 * @param {object} res response
 * @param {number} code status code
 * @param {string} token
 * @param {string} message
 * @param {string} data
 * @returns {object} returns json object of successfully http verb action
 */

const successResponse = (res, code, token, message, data = null) => res.status(code).json({
  token,
  message,
  data,
});

export default {
  successResponse
};
