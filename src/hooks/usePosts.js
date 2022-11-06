import { useEffect, useState } from "react";
import { getAllPostsService, getPostsUserService } from "../services";

const usePosts = (id) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    useEffect(() => {
        const loadPosts = async () => {
            try {
                setLoading(true);

                const data = id ? await getPostsUserService(id) 
                : await getAllPostsService();

                setPosts(data);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, [id]);

    const addPost = (post) => {
        setPosts([post, ...posts]);
    };
    //para que añada posts sin tener que recargar la pagina

    const removePost = (id) => {
        setPosts(posts.filter((post) => post.id !== id));
    };
    //actualiza el estado, deja solo los posts que no tengan la id que quiero borrar

    const addSearch = (results) => {
        setPosts([results]);
    };
    return { addSearch, posts, loading, error, addPost, removePost };
};

export default usePosts; 
