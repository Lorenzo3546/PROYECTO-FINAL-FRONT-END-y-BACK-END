import { Post } from "./Post";

export const PostList = ({ posts, removePost }) => {
    return posts.length ? (
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    <Post post={post} removePost={removePost} />
                </li>
            ))}

        </ul>
    ) : (
        <p>There are not posts yet...</p>
    );
};

export const PostList2 = ({ post }) => {
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
