import { useParams } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import { PostList2 } from "../components/PostList";
import usePost from "../hooks/usePost";

export const PostPage = () => {

    const { id } = useParams();

    //console.log(params);  nos devuele el id de la ruta 

    const { post, loading, error } = usePost(id);

    console.log(post);

    if (loading) return <p>Loading post...</p>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <section>
            <h1>Post by {post[0].nick}</h1>
            <PostList2 post={post} />
        </section>
    );
};
