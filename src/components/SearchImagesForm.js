import { useState } from "react";

import { getSearchService } from "../services";


export const SearchImagesForm = ({ addSearch }) => {
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            setSending(true);
            const query = e.target.elements.search.value;

            const response = await getSearchService(query);

            const results = await response;

            addSearch(results);
            //  e.target.reset();

            //console.log(results);

            //setSearchResults(results)   

        } catch (error) {
            setError(error.message);
        } finally {
            setSending(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="search">Search Images</label>
                <input id="search" name="search" type="search"></input>

                <button type="submit">Search</button>
                {sending ? <p>Sending Post</p> : null}
                {error ? <p>{error}</p> : null}
            </form>

        </div>
    );
};