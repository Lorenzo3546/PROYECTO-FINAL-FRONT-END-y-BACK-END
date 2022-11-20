import { useState } from "react";
import { SearchImagesForm } from "../components/SearchImagesForm";
import { PostList } from "../components/PostList";



export const SearchPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    return (
        <section>

            <SearchImagesForm addSearch={setSearchResults} />
            <PostList posts={searchResults} />
        </section>
    );
};

