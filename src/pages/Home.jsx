import React, {useEffect, useState} from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components/Index";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {cacheStorePosts} from "../store/postSlice"

function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector(state => state.auth.status);
  const storePosts = useSelector(state => state.post.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (storePosts.length > 0) {
      setPosts(storePosts);
    }
    else {
      appwriteService.getPosts([]).then(posts => {
        if(posts){
          setPosts(posts.documents);
          posts.documents.map(post => dispatch(cacheStorePosts(post)));
        }
      });
    }
  }, []);

  if(posts.length === 0){
    return (
      <Container>
        <h2>Empty posts </h2>
        <Link to="/add-post">
        Add post
        </Link>
      </Container>
    );
  }

  return (
    <div className="home-page">
      <Container>
        <div className="row">
          {posts.map((post, index) => (
            index > 1 ?
            <div key={post.$id} className="col-4">
              <PostCard 
                {...post}
              />
            </div>
            : null
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;