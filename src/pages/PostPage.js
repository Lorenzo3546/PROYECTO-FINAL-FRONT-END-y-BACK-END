import { useParams } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import { PostList } from "../components/PostList";
import usePosts from "../hooks/usePosts";


export const PostPage = () => {

    const { id } = useParams();
    //console.log(params);  nos devuele el id de la ruta 


    const { posts, loading, error, removePost, addComment, deleteComment, toggleLike } = usePosts(id);

    //console.log(posts);

    if (loading) return <p>Loading post...</p>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <section>
            <h1>Posts by {posts[0].nick} </h1>
            <PostList posts={posts} removePost={removePost} addComment={addComment} deleteComment={deleteComment} toggleLike={toggleLike} />
        </section>
    );
};
