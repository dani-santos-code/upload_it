import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function PublicGallery() {
  const { token } = useContext(UserContext);
  const [images, setImages] = useState([]);
  const [fetchError, setFetchError] = useState(false);
  let history = useHistory();

  useEffect(() => {
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

    fetch(`http://127.0.0.1:3000/api/v1/public/images`, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        const imageUrls = [];
        if (res) {
          res.imagesDetails.forEach((img) => {
            imageUrls.push({
              binary: toBase64(img.binary.data),
              id: img.id,
              owner: img.owner,
            });
          });
        }
        setImages(imageUrls);
      })
      .catch((e) => {
        setFetchError(true);
      });
  }, []);

  const handleRedirect = () => {
    history.push("/dashboard");
  };

  return (
    <>
      <PhotoBar>
        <HeaderTitle>Public Gallery</HeaderTitle>
        <HeaderButton onClick={handleRedirect}>
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 2L20 20"
              stroke="#4D4965"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 20L20 2"
              stroke="#4D4965"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </HeaderButton>
      </PhotoBar>
      {images.length ? (
        <>
          <ImageGalleryWrapper>
            {images.map((img, i) => (
              <LinkWrapper key={`${img}-${i}`}>
                <Thumbnail src={img.binary} alt="uploaded" />
                <span>Added by {img.owner}</span>
              </LinkWrapper>
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
    </>
  );
}

const ImageGalleryWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  max-width: 100%;
  justify-items: center;
  padding-left: 109px;
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

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PhotoBar = styled.div`
  background: #ffffff;
  height: 40px;
  width: 100%;
  grid-column: 1 / 3;
  grid-row: 1/2;
  box-shadow: 10px 0px 40px rgba(32, 86, 86, 0.19);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 30px;
  justify-content: space-between;
`;

const HeaderButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
`;
const HeaderTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
`;
const NoImagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  grid-column: 1/3;
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
