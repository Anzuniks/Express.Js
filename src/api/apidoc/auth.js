/**
 * @api {post} /auth/login Login
 * @apiName Login
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiDescription Authenticate user with username and password and return JWT token.
 *
 * @apiBody {String} username Username.
 * @apiBody {String} password Password.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} user Logged-in user payload.
 * @apiSuccess {Number} user.user_id User id.
 * @apiSuccess {String} user.name Name.
 * @apiSuccess {String} user.username Username.
 * @apiSuccess {String} user.email Email.
 * @apiSuccess {String} user.role Role.
 * @apiSuccess {String} token JWT token.
 *
 * @apiError (401) Unauthorized Invalid username or password.
 */

/**
 * @api {get} /auth/me Get My Profile
 * @apiName GetMe
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiDescription Validate token and return decoded user payload.
 *
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiSuccess {String} message Token status message.
 * @apiSuccess {Object} user Decoded JWT payload.
 *
 * @apiError (401) Unauthorized Missing token.
 * @apiError (403) Forbidden Invalid or expired token.
 */
