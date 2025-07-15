import { Container, PostCard, Button } from "../components/Index";
import { useGetPosts } from "../customeHooks/postGetHook";

function AllPosts() {
    const tabTitle = document.querySelector("title");
    tabTitle.innerText = "All Posts";

    const [posts, loadMore] = useGetPosts();

    return (
        <div className="all-posts">
            <Container>
                <div className="posts grid">
                    {posts?.map((post) => (
                        post.status ==="active" ?
                        <div key={post.$id} className="grid-item">
                            <PostCard {...post} />
                        </div>
                        : null
                    ))}
                </div>
                <div className="row justify-center m-3">
                    <Button onClick={loadMore}>More</Button>
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;