/**
 * @api {get} /users List Users
 * @apiName ListUsers
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiDescription Return all users (without passwords).
 *
 * @apiSuccess {Object[]} users User list.
 * @apiSuccess {Number} users.user_id User id.
 * @apiSuccess {String} users.name Name.
 * @apiSuccess {String} users.username Username.
 * @apiSuccess {String} users.email Email.
 * @apiSuccess {String} users.role Role.
 */

/**
 * @api {get} /users/:id Get User
 * @apiName GetUser
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id User id.
 *
 * @apiSuccess {Number} user.user_id User id.
 * @apiSuccess {String} user.name Name.
 * @apiSuccess {String} user.username Username.
 * @apiSuccess {String} user.email Email.
 * @apiSuccess {String} user.role Role.
 *
 * @apiError (404) NotFound User not found.
 */

/**
 * @api {post} /users Create User
 * @apiName CreateUser
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiDescription Create a new user. Password is hashed with bcrypt.
 *
 * @apiBody {String} name Name (2-50 chars).
 * @apiBody {String} username Username (3-20 chars, alphanumeric).
 * @apiBody {String} email Valid email.
 * @apiBody {String} password Password (min 8 chars).
 *
 * @apiSuccess (201) {String} message Success message.
 * @apiSuccess (201) {Number} id New user id.
 *
 * @apiError (400) ValidationError Validation failed.
 */

/**
 * @api {put} /users/:id Update User
 * @apiName UpdateUser
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiDescription Update user profile. Allowed for owner user or admin.
 *
 * @apiHeader {String} Authorization Bearer token.
 * @apiParam {Number} id User id.
 *
 * @apiBody {String} [name] Name (2-50 chars).
 * @apiBody {String} [username] Username (3-20 chars, alphanumeric).
 * @apiBody {String} [email] Valid email.
 * @apiBody {String} [password] Password (min 8 chars).
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiError (400) ValidationError Validation failed.
 * @apiError (403) Forbidden Not authorized.
 * @apiError (404) NotFound User not found.
 */

/**
 * @api {delete} /users/:id Delete User
 * @apiName DeleteUser
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiDescription Delete user. Allowed for owner user or admin.
 *
 * @apiHeader {String} Authorization Bearer token.
 * @apiParam {Number} id User id.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiError (400) ValidationError Validation failed.
 * @apiError (403) Forbidden Not authorized.
 */
