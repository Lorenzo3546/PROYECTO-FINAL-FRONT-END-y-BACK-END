import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { putModifyUserService } from "../services";

export const EditProfile = () => {

    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);
    const { token } = useContext(AuthContext);
    const [password, setPassword] = useState("");
    const [nick, setNick] = useState("");

    const handleForm = async (e) => {
        e.preventDefault();
        setError("");

        try {
            setSending(true);

            //const data = new FormData(e.target);
            await putModifyUserService({ password, nick, token });

            Navigate("/login");

        } catch (error) {
            setError(error.message);
        } finally {
            setSending(false);
        }
    };
    return (

        <section>
            <h1>Modify your user info</h1>
            <form onSubmit={handleForm}>

                <fieldset>
                    <label htmlFor="pass">Your new password</label>
                    <input type="password" id="pass" name="pass" nChange={(e) => setPassword(e.target.value)} />
                </fieldset>

                <fieldset>
                    <label htmlFor="text">Your new nick</label>
                    <input type="text" id="text" name="text" nChange={(e) => setNick(e.target.value)} />
                </fieldset>

                <button>Send</button>
                {sending ? <p>Info modified successfully</p> : null}
                {error ? <p>{error}</p> : null}
            </form>
        </section>
    );
};
