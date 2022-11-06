import { useState } from "react";
import { LikesList } from "../components/LikesList";

//import { PostList } from "../components/PostList";


export const LikesPage = () => {
    const [totalLikes, setTotalLikes] = useState([]);

    return (
        <section>

            <p>listado de likes</p>
            <LikesList addLikes={setTotalLikes} />
            {/*  <PostList posts={searchResults/totalLikes} /> */}
        </section>
    );
};
