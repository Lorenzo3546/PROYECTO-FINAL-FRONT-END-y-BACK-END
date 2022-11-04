import { useEffect, useState } from "react";
import { getAllPostsService, getPostsUserService } from "../services";

const usePosts = (id) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        const loadPosts = async () => {
            try {
                setLoading(true);

                const data = id ?
                    await getPostsUserService(id)
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
    //dinamico: para que añada posts sin tener que recargar la pagina

    const removePost = (id) => {
        setPosts(posts.filter((post) => post.id !== id));
    };
    //dinamico: para que elimine en post sin tener que recargar la pag.
    //el filtro es que se queden todos los post que su id !== a la que quiero borrar


    return { posts, loading, error, addPost, removePost };
};

export default usePosts; 
