import usePosts from "../hooks/usePosts";
import { ErrorMessage } from "./ErrorMessage";
import { PostList } from "./PostList";

export const UserPosts = ({ id }) => {
    const { posts, loading, error, removePost } = usePosts(id);

    if (loading) return <p>Loading posts...</p>;
    if (error) return <ErrorMessage message={error} />;

    //console.log(removePost);
    return <PostList posts={posts} removePost={removePost} />;
};
