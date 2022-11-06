import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { deletePostService, sendCommentService } from "../services";
import LikeDislikeButton from "./LikeDislikeButton";


export const Post = ({ post, removePost }) => {
    
    const [error, setError] = useState("");
    const {user, token} = useContext(AuthContext);
    const navigate = useNavigate(); 
    
    const deletePost = async (id)  =>{
        try {
        await deletePostService({id, token});
        if(removePost){removePost(id);} else {
navigate("/");
        }
            
        } catch (error) {
            setError(error.message);
            
        }

    }
 //console.log(post);
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
{user && user.id === post.user_id ? (

     <button className = "deleteButton" onClick={() =>{

     if (window.confirm('Are you sure?')) deletePost(post.id);
      }}
      ></button> ): null}
     {error ? <p>{error}</p> : null}
     <LikeDislikeButton likeNumber={0} disLikeNumber={0}/>
       
        </article>
    );
};


/*export const NewComment = (id) => {
    const [sending, setSending] = useState(false);
    const { user, token } = useContext(AuthContext);
    const [error, setError] = useState("");

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
};*/