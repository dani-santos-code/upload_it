# Image Uploader API

An image uploader developed with Node, Express and Mongoose/MongoDB

## Running the Project

- Requirementes: [node.js / npm](https://www.npmjs.com/get-npm)
- Install [Mongo Community Edition](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
- Go to the root directory and run `npm install` to install dependencies

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

```
POST /api/v1/users
GET /api/v1/users/login
POST /api/v1/use1rs/logout
POST /api/v1/users/logoutall
GET /api/v1/users/me
DELETE/api/v1/users/me
POST /api/v1/images/me/upload
GET /api/v1/images
GET /api/v1/images/:id
DELETE /api/v1/images/:id
```

## TO DO: Future improvements

### File Storage

- Issue: at the moment, files would be stored in the same disk of the instance being run. However, if a load balancer redirects traffic, the images wouldn't be able to be retrieved.

- In order to better scale the application, the record in the DB would point to the address of an image stored on an S3 AWS bucket.

- The node server, acting as a middleware, would have its external IP or [VPC endpoint](https://docs.aws.amazon.com/AmazonS3/latest/dev/example-bucket-policies-vpc-endpoint.html) whitelisted in the [S3 Bucket Policy](https://docs.aws.amazon.com/AmazonS3/latest/dev/example-bucket-policies.html#example-bucket-policies-use-case-3)

### Big Data / File partition

- In case we want to allow big data uploads, we could make use of S3's [Multipart upload API](https://docs.aws.amazon.com/AmazonS3/latest/dev/mpuoverview.html)

- We could pick a chunk size (.eg 5MB) and partition the data

### Deploying the DB

- Making use of AWS's ecosystem, the DB could be deployed to AWS with [Mongo DB Atlas](https://www.mongodb.com/cloud/atlas/aws-mongodb?utm_medium=referral&utm_source=aws_quickstarts) service.
- It provides the following:
- Authentication, **network isolation with VPCs**, VPC peering, encryption, and role-based access controls help keep your data protected.
- Deploy new clusters in minutes or modify existing deployments with **zero downtime**. Independently and elastically scale storage and memory at any time.
- An Atlas cluster can be set to automatically scale its cluster tier, storage capacity, or both in response to cluster usage.

### EC2 Instances

- Servers will be deployed to an EC2 instance - with Auto Scaling - that will make requests to the clusters on MongoDB Atlas

### General Architecture with AWS

- VPC, Load Balancer, EC2, S3, AWS MongoDB Atlas

### Adding more Tests

- More tests should be added using a mock library.
