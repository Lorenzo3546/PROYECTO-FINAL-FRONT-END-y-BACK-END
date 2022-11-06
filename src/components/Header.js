import { Link } from "react-router-dom";
import { Auth } from "./Auth";

export const Header = () => {

    return (
        <header>
            <h1><Link to="/">InstaPhotos</Link>
            </h1>
            <h2>All your memories in one place</h2>
            <button className="searchButton"><Link to= "/search">Search</Link></button>
            <nav>
                <Auth />
            </nav>
        </header>
    );
};
