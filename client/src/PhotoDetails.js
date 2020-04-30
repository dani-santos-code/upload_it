import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function PhotoDetails() {
  let { photoId } = useParams();
  const { token } = useContext(UserContext);
  const [image, setImage] = useState({});

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

    fetch(`http://127.0.0.1:3000/api/v1/images/${photoId}`, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        const imageObj = {
          id: res._id,
          owner: res.owner,
          binary: toBase64(res.binary.data),
        };
        setImage(imageObj);
      });
  }, []);

  return (
    <>
      <PhotoBar>
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
      </PhotoBar>
      {console.log(image)}
      <ImageWrapper>{image && <Photo src={`${image.binary}`} />}</ImageWrapper>
    </>
  );
}

const PhotoBar = styled.div`
  background: #ffffff;
  height: 40px;
  width: 100%;
  grid-column: 1 / 3;
  box-shadow: 10px 0px 40px rgba(32, 86, 86, 0.19);
  transform: matrix(1, 0, 0, -1, 0, 0);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 30px;
`;

const ImageWrapper = styled.div`
  height: 600px;
  width: 600px;
  margin-top: 60px;
  align-self: center;
  grid-column: 2/4;
  justify-self: left;
`;

const Photo = styled.img`
  box-shadow: 0px 0px 40px rgba(32, 86, 86, 0.19);
  border-radius: 8px;
`;
