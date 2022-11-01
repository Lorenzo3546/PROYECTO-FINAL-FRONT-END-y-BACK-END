/* import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { deletePostService } from "../services"; */

import { Link } from "react-router-dom";

export const Post = ({ post }) => {
    return (
        <article>
            <p>By <Link to={`/${post.user_id}`}>{post.user_id}
            </Link> on {new Date(post.created_at).toLocaleString()}
            </p>

            {post.text ? (<p>{post.text}</p>) : null}

            {post.image ? (
                <img
                    src={`${process.env.REACT_APP_BACKEND}/uploads/${post.image}`}
                    alt={post.text}
                />
            ) : null}

        </article>
    );
};


/* export const Post = ({ post, removePost }) => {

    const navigate = useNavigate();
    const { user, token } = useContext(AuthContext);
    const [error, setError] = useState("");
    const deletePost = async (id) => {
        try {
            await deletePostService({ id, token });
            if (removePost) {
                removePost(id);
            } else {
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <article>

            <p>
                By <Link to={`/${post.user_id}`}>{post.user_id}</Link> on {new Date(post.created_at).toLocaleString()}


            </p>

            {post.text ? (<p>{post.text}</p>) : null}

            {post.image ? (
                <img
                    src={`${process.env.REACT_APP_BACKEND}/uploads/${post.image}`}
                    alt={post.text}
                />
            ) : null}

            {user && user.id === post.user_id ? (
                <section>
                    <button
                        onClick={() => {
                            if (window.confirm("Are you sure?")) deletePost(post.id);
                        }}
                    >
                        Delete post
                    </button>
                    {error ? <p>{error}</p> : null}
                </section>
            ) : null}

        </article>
    );
}; */

