import { useContext } from "react";
//import { EditProfile } from "../components/EditProfile";
import { ErrorMessage } from "../components/ErrorMessage";
import { NewPost } from "../components/NewPost";
import { PostList } from "../components/PostList";
import { AuthContext } from "../context/AuthContext";
import usePosts from "../hooks/usePosts";

export const HomePage = () => {

    const { posts, loading, error, addPost, removePost } = usePosts();
    const { user } = useContext(AuthContext);
    //const { addModify } = EditProfile;

    if (loading) return <p>Loading posts...</p>;
    if (error) return <ErrorMessage message={error} />;

    //console.log(posts);
    //console.log(user);
    //console.log(addModify);

    return (
        <section>

            {user ? <NewPost addPost={addPost} /> : null}

            <h1>Latest Posts</h1>

            {user ? <p>aqui dar like y contador de likes</p> : null}
            {user ? <p>aqui new comment</p> : null}


            <PostList posts={posts} removePost={removePost} />

        </section>
    );
};

//meter el componente en vez de p NewComment o dentro de la lista
//