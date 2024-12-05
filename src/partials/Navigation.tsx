import { Link } from "react-router-dom";

export const Navigation = () => {
    return (
        <nav>
            <Link to="/">Accueil</Link>
            <Link to="/equipe">Equipe</Link>
        </nav>
    )
}