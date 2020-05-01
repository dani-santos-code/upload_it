## API Endpoints

#### Create a User

```
POST /api/v1/users
```

To create an account, the user should provide `name`, `email` and `password`

For example:

```javascript
{
  "name": "Example",
  "email": "example@gmail.com",
  "password": "examplePass12456"
}
```

No duplicate emails are allowed.

```javascript
{
  error: "Please enter a valid ID";
}
```

**Attributes**

```
name => string
email => string
password => string
```

#### Login User

```
GET /api/v1/users/login
```

Returns an object with user's public information, for example:

```javascript
{
    "user": {
        "_id": "5e7adbe57b930079aeaca46b",
        "name": "Example",
        "email": "example@gmail.com",
        "createdAt": "2020-03-25T04:19:49.207Z",
        "updatedAt": "2020-03-25T14:33:28.382Z",
        "__v": 10
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTdhZGJlNTdiOTMwMDc5YWVhY2E0NmIiLCJpYXQiOjE1ODUxNDY4MDgsImV4cCI6MTU4NTc1MTYwOH0.7TB73PLk5WTul5o3JLYe3JxRQU2PdqX8IrJn8UMS0jU"
}
```

With that, the token can be passed on to allow user to make certain operations suchas read their images, upload images and delete their own account as well as the images created

#### Log out one session

```
POST /api/v1/users/logout
```

Destroys the current token from a user's array, ending the session. On success, the message "Successfully logged out" is returned

#### Log out all sessions

```
POST /api/v1/users/logoutall
```

Destroys all tokens from a user's array, ending alls sessions accross different devices. On success, the message "Successfully logged out" is returned.

#### Read User's Profile

```
GET /api/v1/users/me
```

Returns an object with user's public information, without the token:

```javascript
{
    "user": {
        "_id": "5e7adbe57b930079aeaca46b",
        "name": "Example",
        "email": "example@gmail.com",
        "createdAt": "2020-03-25T04:19:49.207Z",
        "updatedAt": "2020-03-25T14:33:28.382Z",
        "__v": 10
    },
}
```

#### Delete a User from the record

```
DELETE/api/v1/users/me
```

Allows authorized users to delete their own account (it cascades to the images):

```javascript
{

    "message": "Successfully deleted User2."
}
```

#### Upload Images Associated to current user

```
POST /api/v1/images/me/upload
```

- After logging in, users can upload 1 to 6 images. The maximum file size (either 1 image or a bundle) is _2 MBs_
- Only allows pictures with the folllowing extensions: `jpg`, `jpeg` or `png`

Example of success flow:

```javascript
{
  {
    "_id": "5e7b706a5ac38e853fbbd80f",
    "path": "/uploads/1585148010843pgom2b2l20171215_095050.jpg",
    "owner": "5e7b6d067036ee850a24fae8",
    "createdAt": "2020-03-25T14:53:30.864Z",
    "updatedAt": "2020-03-25T14:53:30.864Z",
    "__v": 0
}
}
```

#### Get Images Associated to current user

```
GET /api/v1/images
```

Allows users to retrieve an array of images they created. Login is required:

```javascript
[
  {
    _id: "5e7b706a5ac38e853fbbd80f",
    path: "/uploads/1585148010843pgom2b2l20171215_095050.jpg",
    owner: "5e7b6d067036ee850a24fae8",
    createdAt: "2020-03-25T14:53:30.864Z",
    updatedAt: "2020-03-25T14:53:30.864Z",
    __v: 0
  }
];
```

#### Get Images Associated to current user by Image ID

```
GET /api/v1/images/:id
```

Given an ID of an image that belongs to the current user, they can see their stored images

```javascript
[
  {
    _id: "5e7b706a5ac38e853fbbd80f",
    path: "/uploads/1585148010843pgom2b2l20171215_095050.jpg",
    owner: "5e7b6d067036ee850a24fae8",
    createdAt: "2020-03-25T14:53:30.864Z",
    updatedAt: "2020-03-25T14:53:30.864Z",
    __v: 0
  }
];
```

#### Delete Images Associated to current user by Image ID

Given an ID of an image that belongs to the current user, they can delete a certain image

```
DELETE /api/v1/images/:id
```

Example of successful flow:
{
"message": "Successfully deleted."
}
