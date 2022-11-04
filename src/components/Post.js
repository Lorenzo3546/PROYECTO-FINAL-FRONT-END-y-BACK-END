import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { deletePostService, likeNumberService, likePostService } from "../services";


export const Post = ({ post, removePost }) => {

    const { user, token } = useContext(AuthContext);
    const [error, setError] = useState("");


    const like = async (id) => {
        try {
            await likePostService({ id, token });
        } catch (error) {
            setError(error.message);
        }
    };

    const likesNumber = async (id) => {
        try {
            await likeNumberService({ id, token });
        } catch (error) {
            setError(error.message);
        }
        return likesNumber();
    };
    //console.log(likesNumber);

    const deletePost = async (id) => {
        try {
            await deletePostService({ id, token });
            removePost(id);
        } catch (error) {
            setError(error.message);
        }
    };

    console.log(post);
    //console.log(user);

    return (
        <article>
            <p>By <Link to={`/${post.user_id}`}>{post.nick}
            </Link> on {new Date(post.created_at).toLocaleString()}
            </p>

            {post.image ? (
                <img
                    src={`${process.env.REACT_APP_BACKEND}/uploads/${post.image}`}
                    alt={post.text}
                />
            ) : null}

            {post.text ? (<p>{post.text}</p>) : null}
            {post.text ? (<p>{post.text} created on {new Date(post.created_at).toLocaleString()} by {post.nick}</p>) : null}

            {token ? (
                <section>
                    <button onClick={() => like(post.id)}>
                        Like
                    </button>
                    <p> xxx{likesNumber}Likes </p>

                    {error ? <p>{error}</p> : null}
                </section>
            ) : null}



            {user && user.id === post.user_id ? (
                <section>
                    <button onClick={() => {
                        if (window.confirm("Are you sure?")) deletePost(post.id);
                    }}
                    >Delete post
                    </button>
                    {error ? <p>{error}</p> : null}
                </section>
            ) : null}

        </article>
    );
};

