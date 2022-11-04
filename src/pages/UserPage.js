import { useParams } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import { UserPosts } from "../components/UserPosts";
import useUser from "../hooks/useUser";

export const UserPage = () => {
    const { id } = useParams();
    const { user2, loading, error } = useUser(id);

    //console.log(user2);

    if (loading) return <p>Loading user data...</p>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <section>
            <h1>Hello {user2.nick} </h1>
            <p>Registered on: {new Date(user2.created_at).toLocaleDateString()}</p>
            <p>User id: {user2.id}</p>

            <UserPosts id={user2.id} />
        </section>
    );
};


/* {
    user && user.id === user2.id ? (
        <section>
            <button onClick={() => {
                EditProfile()}
            >Edit Profile
            </button>
            {error ? <p>{error}</p> : null}
        </section>
    ) : null;
} */