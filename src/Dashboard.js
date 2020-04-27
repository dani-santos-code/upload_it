import React, { useContext } from "react";
import styled from "styled-components";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import "./Dashboard.css";
import { UserContext } from "./UserContext";

export default function Dashboard() {
  const { user, token } = useContext(UserContext);

  const getUploadParams = ({ meta }) => {
    //
  };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());
  };

  return (
    <>
      <Wrapper>
        <Logo src="/logo.jpg" alt="logo" />
        <Dropzone
          getUploadParams={getUploadParams}
          onChangeStatus={handleChangeStatus}
          onSubmit={handleSubmit}
          inputContent={"Add File(s)"}
          accept="image/*"
        />
      </Wrapper>
      <MainBody>
        <UserBar>
          <UserAvatar>DS</UserAvatar>
        </UserBar>
        <div>
          <p>Nothing yet</p>
        </div>
        <GalleryBg></GalleryBg>
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

const GalleryBg = styled.div`
  background: url("/cactus.png") no-repeat;
  background-size: 200px;
  background-position: center;
  min-height: 100vh;
`;
