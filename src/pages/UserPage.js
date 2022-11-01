import { useParams } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import { UserPosts } from "../components/UserPosts";
import useUser from "../hooks/useUser";

export const UserPage = () => {
    const { id } = useParams();
    const { user, loading, error } = useUser(id);

    //console.log(user);

    if (loading) return <p>Loading user data...</p>;
    if (error) return <ErrorMessage message={{ error }} />;

    return (
        <section>
            <h1>User {user.nick} </h1>
            <p>User id: {user.id}</p>
            <p>Registered on: {new Date(user.created_at).toLocaleDateString()}</p>

            <UserPosts id={user.id} />
        </section>
    );
};
