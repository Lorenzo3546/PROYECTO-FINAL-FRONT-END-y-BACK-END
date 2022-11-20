import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import { NewPost } from "../components/NewPost";
import { PostList } from "../components/PostList";
import { AuthContext } from "../context/AuthContext";
import usePosts from "../hooks/usePosts";


export const PostPage = () => {

    const { id } = useParams();
    //console.log(params);  nos devuele el id de la ruta 

    const { posts, loading, error, removePost, addPost, addComment, deleteComment, toggleLike } = usePosts(id);

    const { user } = useContext(AuthContext);
    //console.log(posts);

    if (loading) return <p>Loading post...</p>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <section>
            <h1>Posts by {posts[0].nick} </h1>
            {user ? <NewPost addPost={addPost} /> : null}

            <PostList posts={posts} removePost={removePost} addComment={addComment} deleteComment={deleteComment} toggleLike={toggleLike} />
        </section>
    );
};
