/*import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { sendCommentService } from "../services";

export const NewComment = (id) => {
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
