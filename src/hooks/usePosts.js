import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAllPostsService, getPostsUserService, getUserLikesService } from "../services";

const usePosts = (id) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { token } = useContext(AuthContext);



    useEffect(() => {
        const loadPosts = async () => {
            try {
                setLoading(true);

                const data = id ?
                    await getPostsUserService(id)
                    : await getAllPostsService();

                if (token) {
                    const liked = await getUserLikesService(token);

                    for (const post of data) {
                        post.liked = liked.includes(post.id);
                    }
                }
                //es true si cumple esta condicion 


                setPosts(data);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, [id, token]);

    const addPost = (post) => {
        setPosts([post, ...posts]);
    };
    //dinamico: para que añada posts sin tener que recargar la pagina

    const removePost = (id) => {
        setPosts(posts.filter((post) => post.id !== id));
    };
    //dinamico: para que elimine en post sin tener que recargar la pag.
    //el filtro es que se queden todos los post que su id !== a la que quiero borrar

    const deleteComment = (commentId, postId) => {
        const copiPost = structuredClone(posts);
        const onePost = copiPost.find(post =>
            post.id === postId
        );
        onePost.comments = onePost.comments.filter(comment =>
            comment.id !== commentId);
        //console.log(onePost.comments);
        setPosts(copiPost);
    };


    const addComment = (comment, postId) => {

        //console.log(comment);
        //console.log(postId);
        //console.log(posts);

        comment.post_id = postId;

        const copiPost = structuredClone(posts);
        const onePost = copiPost.find(post =>
            post.id === postId
        );
        onePost.comments.push(comment);
        //console.log(copiPost);
        setPosts(copiPost);


        //console.log(posts);

    };

    const toggleLike = (postId) => {
        const copiPost = structuredClone(posts);
        const onePost = copiPost.find(post =>
            post.id === postId
        );
        console.log(onePost);
        if (onePost.liked) {
            onePost.liked = false;
            onePost.likes--;
        } else {
            onePost.liked = true;
            onePost.likes++;
        }
        setPosts(copiPost);
    };


    return { posts, loading, error, addPost, removePost, addComment, deleteComment, toggleLike };
};
export default usePosts; 
