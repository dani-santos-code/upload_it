## Image Uploader

`UploadIt` is a webapp that allows users to upload pictures. They can upload images of up to 100kbs. The images are set to be private by default, but users can make them public if they want their images to be added to the Public Image gallery.

## Running the project
Go to the server directory. Run `npm install` followed by `npm run dev`. The server will be running on port `3000`

Go to the `client` directory. Run `npm install`followed by `npm run start`.
Accept to listen to FE on port `3001`.

## User Flow

### Log In

- User Login With Error

<img src='./assets/login-error.gif' />

- Successful User Login

<img src='./assets/login-success.gif' />

- On Click, navigate to Sign Up Page

<img src='./assets/go-to-signup.gif' />

###  Sign Up / Creating an Account

- Error: when passwords do not match

<img src='./assets/signup-error.gif' />

- Successful Sign Up

<img src='./assets/successful-signup.gif' />

### Logging Out

<img src='./assets/logout.gif' />


### Uploading Images to the Gallery

- Uploading 1 image:
  <img src='./assets/upload1.gif' />

- Uploading 6 images:
 <img src='./assets/upload6.gif' />


### Change Image Privacy Settings
- Making it Public
 <img src='./assets/makepublic.gif' />

- Accesing it via Public Gallery Link

<img src='./assets/accesspublic.gif' />

- Another User(Dani) Can See it Now:
<img src='./assets/otheruseraccess.gif' />

### Delete Image
<img src='./assets/delete.gif' />

### Public Gallery

- Empty State (No Users have published pics)

<img src='./assets/public-gallery-emptystate.gif' />

- With Public Images Added:
<img src='./assets/morepublic.gif' />
