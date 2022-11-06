import { useState } from "react";

import { getLikesService } from "../services";


export const LikesList = async ({ addLikes }) => {
    const [error, setError] = useState("");


    try {
        const results = await getLikesService({});

        addLikes(results);

    } catch (error) {
        setError(error.message);
    };

    return (
        <p>listado de likes</p>
        /* posts.length ? (
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Post post={post} removePost={removePost} />
                    </li>
                ))}

            </ul>
        ) : (
            <p>There are not posts yet...</p>
        ) */
    );
};