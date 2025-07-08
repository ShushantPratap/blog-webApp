import React from "react";
import { Container, PostForm } from "../components/Index";

const AddPost = () => {
  const tabTitle = document.querySelector("title");
  tabTitle.innerText = "Add Post";
    
  return (
    <Container>
      <PostForm />
    </Container>
  );
};

export default AddPost;
