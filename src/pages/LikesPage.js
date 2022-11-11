
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getLikesService } from "../services";

const likesInfo = async (id, setLikes) => {
    try {
        const result = await getLikesService(id);
        setLikes(result);
    } catch {

    }
};

export const LikesPage = () => {

    const { id } = useParams();
    const [likes, setLikes] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        likesInfo(id, setLikes);
    }, [id]);

    //console.log(likes);

    return (
        <section>
            <p> Like List: </p>

            {user && likes.length ? (
                <ul>
                    {likes.map((like) => (
                        <li key={like.user_id}>
                            On {new Date(like.created_at).toLocaleString()} {like.nick} send a like

                        </li>
                    ))}

                </ul>
            ) : (
                <p>There are not likes yet...</p>
            )

            }
        </section>);
};

// <p>{JSON.stringify(likes)}</p> Lo uso para visualizar contenido en web
