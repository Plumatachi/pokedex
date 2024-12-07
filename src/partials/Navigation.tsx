import { Link } from "react-router-dom";
import "../static/Navigation.css";

export const Navigation = () => {
    return (
        <nav className="navbar">
            <img src="../assets/pokeball-icon.png" alt="pokeball-icon" />
            <Link to="/" className="nav-link">Accueil</Link>
            <Link to="/equipe" className="nav-link">Equipe</Link>
        </nav>
    )
}