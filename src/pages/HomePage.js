import { useContext } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { NewPost } from "../components/NewPost";
import { PostList } from "../components/PostList";
import { SearchImagesForm } from "../components/SearchImagesForm";
import { AuthContext } from "../context/AuthContext";
import usePosts from "../hooks/usePosts";

export const HomePage = () => {
    

    const { addSearch, posts, loading, error, addPost, removePost } = usePosts();
    const { user } = useContext(AuthContext);

    //console.log(posts, loading, error)
    if (loading) return <p>Loading posts...</p>;
    if (error) return <ErrorMessage message={error} />;

    //console.log(posts);
    //console.log(user);

    return (
        <section>
{/* <SearchImagesForm addSearch={addSearch} /> */}
            {!user ? <p>no llega el user</p> : null}
            {user ? <NewPost addPost={addPost} /> : null}
            <h1>Latest Posts</h1>

            {/*{user ? <p>aqui dar like y contador de likes</p> : null}
            {user ? <p>aqui new comment</p> : null}*/}
            
            <PostList posts={posts} removePost={removePost} />
        </section>
    );
};


