import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { deleteCommentService, deletePostService, dislikePostService, likePostService, sendCommentService } from "../services";


export const Post = ({ post, removePost, addComment, deleteComment, toggleLike }) => {

    const [sending, setSending] = useState(false);
    const { user, token } = useContext(AuthContext);
    const [error, setError] = useState("");

    const comments = post.comments;

    //const likes = post.likes;
    //console.log(comments);
    //console.log(likes); 
    //console.log(post);
    //console.log(post.comments);
    //console.log(post.likes);
    //console.log(post.id);


    const deletePost = async (id) => {
        try {
            await deletePostService({ id, token });
            console.log(removePost);
            removePost(id);
        } catch (error) {
            setError(error.message);
        }
    };

    const NewComment = ({ addComment }) => {
        const handleForm = async (e) => {
            e.preventDefault();
            try {
                setSending(true);

                const text = e.target.elements.text.value;

                const comment = await sendCommentService(text, post.id, token);

                //console.log(comment);

                //console.log(addComment);
                comment.user_id = user.id;
                comment.created_at = new Date();
                comment.nick = user.nick;

                addComment(comment, post.id);


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
                <section>
                    <ul>
                        {comments?.map(
                            ({ id, nick, text, user_id }) => (
                                <li key={id}>
                                    By:@ {nick},
                                    Comment: {text}
                                    {user && user.id === user_id ? (
                                        <section>
                                            <button onClick={() => {
                                                if (window.confirm("Are you sure?")) {
                                                    deleteCommentService(id, token);
                                                    deleteComment(id, post.id);
                                                }
                                            }}
                                            >Delete comment
                                            </button>
                                            {error ? <p>{error}</p> : null}
                                        </section>
                                    ) : null}
                                </li>
                            ))}

                    </ul>
                </section>
            </section>
        );
    };


    const like = async (id, liked, postId) => {
        try {

            toggleLike(postId);
            if (liked) {
                await dislikePostService({ id, token });
            } else {
                await likePostService({ id, token });
            }

        } catch (error) {
            setError(error.message);
        }
    };


    //console.log(post.likes);
    //console.log(post);
    //console.log(post.nick);
    //tarda en llegar el dato ojo

    return (
        <article>


            <p>
                By <Link to={`/${post.user_id}`}>{post.nick ?? user.nick}
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


            {token ? <NewComment addComment={addComment}>
            </NewComment> : null}

            {token ? (
                <section>
                    <button className={post.liked ? "liked like" : "like"} onClick={({ target }) => like(post.id, post.liked, post.id)}>
                        Like
                        <svg
                            aria-hidden="true"
                            /* version="1.1"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink" */
                            x="0px"
                            y="0px"
                            viewBox="0 0 512 512"
                        //style="enable-background: new 0 0 512 512"
                        //xml:space="preserve"
                        >
                            <path
                                d="M474.655,74.503C449.169,45.72,413.943,29.87,375.467,29.87c-30.225,0-58.5,12.299-81.767,35.566
	c-15.522,15.523-28.33,35.26-37.699,57.931c-9.371-22.671-22.177-42.407-37.699-57.931c-23.267-23.267-51.542-35.566-81.767-35.566
	c-38.477,0-73.702,15.851-99.188,44.634C13.612,101.305,0,137.911,0,174.936c0,44.458,13.452,88.335,39.981,130.418
	c21.009,33.324,50.227,65.585,86.845,95.889c62.046,51.348,123.114,78.995,125.683,80.146c2.203,0.988,4.779,0.988,6.981,0
	c2.57-1.151,63.637-28.798,125.683-80.146c36.618-30.304,65.836-62.565,86.845-95.889C498.548,263.271,512,219.394,512,174.936
	C512,137.911,498.388,101.305,474.655,74.503z"
                            />
                        </svg>

                    </button>


                    {error ? <p>{error}</p> : null}
                </section>

            ) : null}


            {token ? (
                <section>
                    <Link to={`/likes/${post.id}`}>
                        Likes:</Link> {post.likes}
                </section>
            ) : null}


        </article>
    );
};
