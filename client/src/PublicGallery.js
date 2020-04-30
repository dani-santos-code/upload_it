import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function PublicGallery() {
  const { token } = React.useContext(UserContext);
  const [showIcon, setShowIcon] = useState(true);
  const [images, setImages] = useState([]);
  const [fetchError, setFetchError] = useState(false);

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
        console.log(res);
        const imageUrls = [];
        if (res) {
          res.imagesDetails.forEach((img) => {
            //console.log(img);
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

  return (
    <>
      <ImageGalleryWrapper>
        {images.map((img, i) => (
          <>
            <Link to={`/photos/${img.id}`} key={`${img}-${i}`}>
              <Thumbnail src={img.binary} alt="uploaded" />
            </Link>
            <span>Added by {img.owner}</span>
          </>
        ))}
      </ImageGalleryWrapper>
    </>
  );
}

const ImageGalleryWrapper = styled.div`
  width: 100%;
  padding: 20px;
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
