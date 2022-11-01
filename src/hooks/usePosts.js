import { useEffect, useState } from "react";
import { getAllPostsService } from "../services";

const usePosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    useEffect(() => {
        const loadPosts = async () => {
            try {
                setLoading(true);

                const data = await getAllPostsService();

                setPosts(data);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, []);

    const addPost = (post) => {
        setPosts([post, ...posts]);
    };
    //para que añada posts sin tener que recargar la pagina

    const removePost = (id) => {
        setPosts(posts.filter((post) => post.id !== id));
    };
    //actualiza el estado, deja solo los posts que no tengan la id que quiero borrar

    return { posts, loading, error, addPost, removePost };
};

export default usePosts; 
