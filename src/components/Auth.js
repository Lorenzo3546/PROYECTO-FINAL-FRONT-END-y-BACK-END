import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Auth = () => {
    const { user, logout } = useContext(AuthContext);
    //ojo, no esperamos por el token, sino por user! porque tarda mas en llegar
    //user trae los datos de GET MY USER INFO con un Auth
    return user ? (
        <p>
            Logged in as <Link to={`/user/info/${user.id}`}>{user.nick}</Link>{" "}
            <button onClick={() => logout()}>LogOut</button>
        </p>
    ) : (
        <ul>
            <li><Link to="/register">Register</Link>
            </li>
            <li><Link to="/login">Login</Link>
            </li>
        </ul>
    );
};
