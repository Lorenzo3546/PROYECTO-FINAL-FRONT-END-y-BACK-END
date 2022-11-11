import { useContext } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { NewPost } from "../components/NewPost";
import { PostList } from "../components/PostList";
import { AuthContext } from "../context/AuthContext";
import usePosts from "../hooks/usePosts";

export const HomePage = () => {

    const { posts, loading, error, addPost, removePost, addComment, deleteComment, toggleLike } = usePosts();
    const { user } = useContext(AuthContext);

    if (loading) return <p>Loading posts...</p>;
    if (error) return <ErrorMessage message={error} />;

    //console.log(posts);
    //console.log(user);

    return (
        <section>

            {user ? <NewPost addPost={addPost} /> : null}

            <h1>Latest Posts</h1>

            <PostList posts={posts} removePost={removePost} addComment={addComment} deleteComment={deleteComment} toggleLike={toggleLike} />

        </section>
    );
};

