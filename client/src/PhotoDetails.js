import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import { UserContext } from "./UserContext";
import { lock } from "react-icons-kit/feather/lock";
import { unlock } from "react-icons-kit/feather/unlock";
import { Icon } from "react-icons-kit";

export default function PhotoDetails() {
  let { photoId } = useParams();
  const { user, token } = useContext(UserContext);
  let history = useHistory();
  const [image, setImage] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [isPrivate, setPrivacy] = useState(true);

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
        if (res) {
          const imageObj = {
            id: res._id,
            owner: res.owner,
            binary: toBase64(res.binary.data),
          };
          setImage(imageObj);
        }
      })
      .catch((e) => {
        setFetchError(true);
      });
  }, []);

  const changePrivacy = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
    };
    fetch(
      `http://127.0.0.1:3000/api/v1/public/images/${photoId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        //console.log(response);
        if (response.message === "Successful update.") {
          setPrivacy(!isPrivate);
        }
      });
  };

  const handleDeletePhoto = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
    };
    fetch(`http://127.0.0.1:3000/api/v1/images/${photoId}`, requestOptions)
      .then((response) => response)
      .then((res) => {
        if (res.status === 200) {
          setDeleteSuccess(true);
          history.push("/dashboard");
        }
      });
  };

  const handleRedirect = () => {
    history.push("/dashboard");
  };

  return (
    <>
      <PhotoBar>
        <HeaderButton onClick={handleRedirect}>
          {user.name}'s gallery
        </HeaderButton>
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
      <ImageWrapper>
        {image && fetchError === false ? (
          <Photo src={`${image.binary}`} />
        ) : (
          <h2>No image Found</h2>
        )}
      </ImageWrapper>
      <InfoWrapper>
        <PrivateImageInfo>
          <IconWrapper>
            <PrivacyContainer onClick={() => changePrivacy()}>
              {isPrivate ? (
                <>
                  <Icon icon={lock} />
                  <span>
                    Private Image by Default. Click to make it public.
                  </span>
                </>
              ) : (
                <>
                  <Icon icon={unlock} />
                  <span>Public image. Beauty is spread around the world.</span>
                </>
              )}
            </PrivacyContainer>
          </IconWrapper>
        </PrivateImageInfo>
        <DeleteInfo>
          {confirmDelete ? (
            <DeleteButton onClick={() => handleDeletePhoto()}>
              Yes, Delete
            </DeleteButton>
          ) : (
            <DeleteButton
              onClick={() => {
                setConfirmDelete(!confirmDelete);
              }}
            >
              Delete This Image?
            </DeleteButton>
          )}
        </DeleteInfo>
      </InfoWrapper>
    </>
  );
}

const PhotoBar = styled.div`
  background: #ffffff;
  height: 40px;
  width: 100%;
  grid-column: 1 / 3;
  box-shadow: 10px 0px 40px rgba(32, 86, 86, 0.19);
  display: flex;
  align-items: center;
  padding: 30px;
  justify-content: space-between;
`;

const ImageWrapper = styled.div`
  height: 600px;
  width: 600px;
  margin-top: 20px;
  align-self: center;
  grid-column: 2/4;
  justify-self: left;
`;

const Photo = styled.img`
  box-shadow: 0px 0px 40px rgba(32, 86, 86, 0.19);
  border-radius: 8px;
`;

const InfoWrapper = styled.div`
  grid-row: 2/3;
  grid-column: 2 / 5;
  display: flex;
  justify-content: space-between;
  width: 640px;
`;

const PrivateImageInfo = styled.div`
  margin-top: 20px;
`;

const DeleteInfo = styled.div`
  margin-top: 20px;
  grid-column: 1 / 3;
  display: flex;
  button {
    color: red;
    font-size: 12px;
    border: none;
    cursor: pointer;
    background-color: transparent;
  }
`;

const IconWrapper = styled.div``;

const PrivacyContainer = styled.button`
  border: none;
  color: #3e376a;
  cursor: pointer;
  background-color: transparent;
`;

const HeaderButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
`;

const DeleteButton = styled.button`
  align-self: baseline;
`;
