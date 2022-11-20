import { Post } from "./Post";

export const PostList = ({ posts, removePost, addComment, deleteComment, toggleLike }) => {

    //console.log(posts);
    return posts.length ? (
        <ul className="posts">
            {posts.map((post) => (
                <li key={post.id}>
                    <Post post={post} removePost={removePost} addComment={addComment} deleteComment={deleteComment} toggleLike={toggleLike} />
                </li>
            ))}

        </ul>
    ) : (
        <p>There are not posts yet...</p>
    );
};











/* export const PostList2 = ({ post }) => {
    return post.length ? (
        <ul>
            {post.map((post) => (
                <li key={post.id}>
                    <Post post={post} />
                </li>
            ))}

        </ul>
    ) : (
        <p>There are not posts yet...</p>
    );
};
 */

