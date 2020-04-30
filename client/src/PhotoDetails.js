import React from "react";
import { useParams } from "react-router-dom";

export default function PhotoDetails() {
  let { photoId } = useParams();
  return (
    <>
      <h1>ID: {photoId}</h1>
    </>
  );
}
