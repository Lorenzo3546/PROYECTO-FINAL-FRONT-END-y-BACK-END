import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { deletePostService, dislikePostService, likePostService, sendCommentService } from "../services";


export const Post = ({ post, removePost, addComment }) => {
    const [sending, setSending] = useState(false);
    const { user, token } = useContext(AuthContext);
    const [error, setError] = useState("");

    const numero = post.likes[0];

    //console.log(numero);
    //console.log(numero.likes);

    //console.log(post);
    //console.log(post.comments);
    //console.log(post.likes);
    //console.log(post.id);
    //const id = post.id;

    const deletePost = async (id) => {
        try {
            await deletePostService({ id, token });
            removePost(id);
        } catch (error) {
            setError(error.message);
        }
    };

    const NewComment = (id) => {
        const handleForm = async (e) => {
            e.preventDefault();
            try {
                setSending(true);

                const text = e.target.elements.text.value;

                await sendCommentService(text, post.id, token);

                e.target.reset();

            } catch (error) {
                setError(error.message);
            } finally {
                setSending(false);
            }
        };
        return (
            <section>
                <form onSubmit={handleForm}>
                    <fieldset>
                        <label htmlFor="text">Add new comment:</label>
                        <input type="text" id="text" name="text" />
                    </fieldset>

                    <button>Send Comment</button>
                    {sending ? <p>Sending...</p> : null}
                    {error ? <p>{error}</p> : null}
                </form>
                <p>
                    All comments:
                    <ul>
                        {post.comments.map(
                            ({ id, nick, text }) => (
                                <li key={id}>
                                    By:@ {nick},
                                    Comment: {text}
                                </li>
                            ))}
                    </ul>
                </p>
            </section>
        );
    };


    const like = async (id) => {
        try {
            await likePostService({ id, token });
        } catch (error) {
            setError(error.message);
        }
    };

    const dislike = async (id) => {
        try {
            await dislikePostService({ id, token });
        } catch (error) {
            setError(error.message);
        }
    };



    return (
        <article>
            <p>By <Link to={`/${post.user_id}`}>{post.nick}
            </Link> on {new Date(post.created_at).toLocaleString()}
            </p>
            {post.image ? (
                <img
                    src={`${process.env.REACT_APP_BACKEND}/uploads/${post.image}`}
                    alt={post.text} />
            ) : null}

            {post.text ? (<p>{post.text}</p>) : null}

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


            {token ? <NewComment addComment={addComment}> </NewComment> : null}

            {token ? (
                <section>
                    <button onClick={() => like(post.id)}>
                        Like
                    </button>

                    <button onClick={() => dislike(post.id)}>
                        Disike
                    </button>

                    {/* <p>
                        <Link to={`/likes/${post.id}`}>xxx{post.likes[0]}Likes </Link>
                    </p> */}

                    {error ? <p>{error}</p> : null}
                </section>

            ) : null}

            {token ? (
                <section>
                    Total Likes: {numero.likes}
                </section>
            ) : null}

        </article>
    );
};
