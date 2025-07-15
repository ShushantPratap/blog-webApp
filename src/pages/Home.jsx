import { useEffect } from "react";
import { Container, PostCard } from "../components/Index";
import { Link } from "react-router-dom";
import { useGetPosts } from "../customeHooks/postGetHook";

function Home() {
  const tabTitle = document.querySelector("title");
  tabTitle.innerText = "Home";

  const [posts] = useGetPosts();

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
        <div className="grid">
          {posts.map((post, index) => (
            index > 1 ?
            <div key={post.$id} className="grid-item">
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