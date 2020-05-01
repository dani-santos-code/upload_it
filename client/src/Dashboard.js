import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { logOut } from "react-icons-kit/feather/logOut";
import { Icon } from "react-icons-kit";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import "./Dashboard.css";
import { UserContext } from "./UserContext";

export default function Dashboard() {
  const { user, token, handleLogOut } = useContext(UserContext);
  const [showIcon, setShowIcon] = useState(true);
  const [images, setImages] = useState([]);

  const fetchImages = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    const toBase64 = (arrBuffer) => {
      const base64 = btoa(String.fromCharCode(...new Uint8Array(arrBuffer)));
      return `data:image/jpeg;base64,${base64}`;
    };

    fetch("http://127.0.0.1:3000/api/v1/images", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        const imageUrls = [];
        if (res) {
          res.imagesDetails.forEach((img) => {
            imageUrls.push({
              binary: toBase64(img.binary.data),
              id: img.id,
            });
          });
        }
        setImages(imageUrls);
      });
  };
  useEffect(() => {
    fetchImages();
  }, []);

  const handleChangeStatus = ({ meta }, status) => {
    if (status === "done" || status === "preparing" || status === "removing") {
      setShowIcon(false);
    } else {
      setShowIcon(true);
    }
  };
  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" };
  };
  const uploadImage = (files, allFiles) => {
    const filesToSubmit = files.map((f) => f.file);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    const formData = new FormData();
    filesToSubmit.forEach((i) => {
      formData.append("upload", i);
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formData,
    };
    fetch("http://127.0.0.1:3000/api/v1/images/me/upload", requestOptions)
      .then((response) => response)
      .then((response) => {
        if (response.status === 200) {
          setTimeout(() => {
            fetchImages();
          }, 500);
        }
      });
    allFiles.forEach((f) => f.remove());
  };

  return (
    <>
      <Wrapper>
        <Logo src="/logo.jpg" alt="logo" />
        <Dropzone
          getUploadParams={getUploadParams}
          onChangeStatus={handleChangeStatus}
          onSubmit={uploadImage}
          maxFiles={6}
          maxSizeBytes={100000}
          inputContent={"Add Up To 6 Files At a Time"}
          inputWithFilesContent={"Add More Files"}
          submitButtonContent={"Upload"}
          submitButtonDisabled={false}
          accept="image/*"
          styles={{
            dropzone: showIcon
              ? {
                  backgroundImage: `url("/upload.png")`,
                  backgroundSize: "40px",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "40px",
                }
              : { backgroundImage: "none" },
          }}
        />
      </Wrapper>
      <MainBody>
        <UserBar>
          {user ? (
            <>
              <UserGreeting>Hello, {user.name} !</UserGreeting>
              <UserAvatar>{user.name[0]}</UserAvatar>
              <StyledLink to="/allImages">Public Gallery</StyledLink>
            </>
          ) : (
            <UserAvatar>?</UserAvatar>
          )}
        </UserBar>
        <IconWrapper>
          <LogoutContainer onClick={handleLogOut}>
            <Icon icon={logOut} /> <span>Logout</span>
          </LogoutContainer>
        </IconWrapper>
        {images.length ? (
          <>
            <ImageCountWrapper>
              <ImagesMessage>Your images</ImagesMessage>
              <ImagesInfo>You have uploaded {images.length} images </ImagesInfo>
            </ImageCountWrapper>
            <ImageGalleryWrapper>
              {images.map((img, i) => (
                <Link to={`/photos/${img.id}`} key={`${img}-${i}`}>
                  <Thumbnail src={img.binary} alt="uploaded" />
                </Link>
              ))}
            </ImageGalleryWrapper>
          </>
        ) : (
          <>
            <NoImagesWrapper>
              <ImagesMessage>No images yet</ImagesMessage>
              <ImagesInfo>Your uploaded images will be shown here.</ImagesInfo>
              <GalleryBg src="cactus.png"></GalleryBg>
            </NoImagesWrapper>
          </>
        )}
      </MainBody>
    </>
  );
}

const Logo = styled.img`
  width: 170px;
  height: 120px;
  align-self: center;
  margin-bottom: 40px;
`;
const Wrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
`;

const MainBody = styled.div`
  background: rgba(210, 233, 233, 0.42);
`;
const UserBar = styled.div`
  width: 100%;
  height: 40px;
  background-color: #00708c;
  position: relative;
  padding: 3px;
`;
const UserAvatar = styled.div`
  width: 30px;
  height: 30px;
  top: 5px;
  right: 60px;
  font-weight: bold;
  font-size: 13px;
  line-height: 30px;
  text-align: center;
  color: #ffffff;
  position: absolute;
  background-color: rgba(4, 255, 255, 0.42);
  border-radius: 50px;
`;
const UserGreeting = styled.span`
  padding: 20px;
  margin: 0;
  color: white;
  font-size: 15px;
  line-height: 33px;
  font-weight: bold;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0px;
`;

const LogoutContainer = styled.button`
  background-color: white;
  box-shadow: 0px 1px 4px rgba(11, 108, 115, 0.19);
  border-radius: 4px;
  width: 100px;
  height: 29px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
`;
const GalleryBg = styled.img`
  width: 200px;
`;

const ImagesMessage = styled.p`
  font-size: 16px;
  margin: 0px;
  font-weight: bold;
`;

const ImagesInfo = styled.p`
  padding: 0px;
  font-size: 14px;
`;

const NoImagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const ImageGalleryWrapper = styled.div`
  width: 100%;
  padding: 20px;
`;

const ImageCountWrapper = styled.div`
  margin: 20px;
`;

const Thumbnail = styled.div`
  width: 200px;
  display: inline-block;
  margin: 20px;
  background: url(${(props) => props.src});
  background-size: cover;
  height: 200px;
  box-shadow: 10px 0px 40px rgba(32, 86, 86, 0.19);
  border-radius: 8px;
`;

const StyledLink = styled(Link)`
  color: white;
  margin-left: 40px;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: #04cdff;
  }
`;
