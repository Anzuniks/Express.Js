/**
 * @api {get} /cats List Cats
 * @apiName ListCats
 * @apiGroup Cats
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Object[]} cats Cat list.
 */

/**
 * @api {get} /cats/:id Get Cat
 * @apiName GetCat
 * @apiGroup Cats
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id Cat id.
 *
 * @apiSuccess {Object} cat Cat object.
 *
 * @apiError (404) NotFound Cat not found.
 */

/**
 * @api {post} /cats Create Cat
 * @apiName CreateCat
 * @apiGroup Cats
 * @apiVersion 1.0.0
 *
 * @apiDescription Create cat with file upload. Requires authentication.
 *
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiBody {String} cat_name Cat name (3-50 chars).
 * @apiBody {Number} weight Weight (> 0).
 * @apiBody {String} birthdate Date in ISO8601 format.
 * @apiBody {File} file Image or video file (max 10 MB).
 *
 * @apiSuccess (201) {String} message Success message.
 * @apiSuccess (201) {Number} id New cat id.
 *
 * @apiError (400) ValidationError Validation failed, invalid file type, missing file, or too large file.
 * @apiError (401) Unauthorized Missing token.
 * @apiError (403) Forbidden Invalid token.
 */

/**
 * @api {put} /cats/:id Update Cat
 * @apiName UpdateCat
 * @apiGroup Cats
 * @apiVersion 1.0.0
 *
 * @apiDescription Update cat. Allowed for owner user or admin.
 *
 * @apiHeader {String} Authorization Bearer token.
 * @apiParam {Number} id Cat id.
 *
 * @apiBody {String} cat_name Cat name (3-50 chars).
 * @apiBody {Number} weight Weight (> 0).
 * @apiBody {String} [birthdate] Date in ISO8601 format.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiError (400) ValidationError Validation failed.
 * @apiError (403) Forbidden Not authorized.
 */

/**
 * @api {delete} /cats/:id Delete Cat
 * @apiName DeleteCat
 * @apiGroup Cats
 * @apiVersion 1.0.0
 *
 * @apiDescription Delete cat. Allowed for owner user or admin.
 *
 * @apiHeader {String} Authorization Bearer token.
 * @apiParam {Number} id Cat id.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiError (400) ValidationError Validation failed.
 * @apiError (403) Forbidden Not authorized.
 */
