

import { Post } from "./Post";

export const PostList = ({ posts, removePost }) => {

    console.log(posts)
    return posts.length ? (
        <ul className="posts">
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

/*export const PostList3 = ({ results }) => {
    
    return results.length ? (
        <ul>
            {results.map((results) => (
                <li key={results.id}>
                    <Post post={results} />
                </li>
            ))}

        </ul>
    ) : (
        <p>There are not posts yet...</p>
    );
};*/
