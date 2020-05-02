# Image Uploader API - Backend

Node, Express and Mongoose/MongoDB

## Validation and Sanitization

MongoDB provides a way to to build custom validators with `validate()`, which is used in this project in combination with [validator.js](https://www.npmjs.com/package/validator)

## Password Security

[Bcryptjs](https://www.npmjs.com/package/bcryptjs) is used to hash plain text to be stored in the DB

A `pre` middleware is used in the User Schema in order to hash passwords before saving them to the database

## Authentication / Session

For protected routes, JWTs are integrated with the [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) package

The User model is designed to allow for the storage of several tokens, so the user can keep the session live across different devices (e.g. phone, tablet, desktop, etc)

_An endpoint for logging out of all sessions is also provided_

## Public Profile

By using [toJSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toJSON) in our DB Object, data such as password is not exposed to endpoints that have access to our user object(`req.user`)

## File Upload

[Multer](https://www.npmjs.com/package/multer) is being used for handling multipart/form-data when uploading files. It is maintained by the developers of [Express](https://github.com/expressjs).

## File Upload Security

- Only uploads of files with mimetype `png`, `jpeg`, and `jpeg` are allowed in this api
- The uploaded file is not larger than 2MB as specified
- Zip upload is not supported
- The library `hash-generator` is used in combination with `Date.now()`as a timestamp so the file has a new name when stored on the OS.

_As per [OWASP's](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html) specs._

## Sensitive Data

- Upon request, I can provide you with a `.env`file that contains environment variables to run the project.

## Testing

- This project uses [Jest](https://jestjs.io/) for testing (A zero configuration testing framework), which makes it easy to set up.

- The assertion library used for HTTP tests is [SuperTest](https://www.npmjs.com/package/supertest)

- To run tests, run `npm test` (Once again, an `.env.test`should be provided. Please ping me for it.)

## API Endpoints

Please refer to the [Endpoints](ENDPOINTS.MD) doc to get a more detailed description of endpoints and what they return

Users:

```
POST /api/v1/users
GET /api/v1/users/login
POST /api/v1/use1rs/logout
GET /api/v1/users/me
DELETE/api/v1/users/me
```

Images:

```
POST /api/v1/images/me/upload
GET /api/v1/images
DELETE /api/v1/images/:id
GET /api/v1/public/images
PUT /api/v1/public/images/:id
```
