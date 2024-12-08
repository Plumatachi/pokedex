import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import "../static/TeamPage.css";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const TeamPage = () => {
    const [team, setTeam] = useState([]);

    useEffect(() => {
        const savedTeam = JSON.parse(localStorage.getItem("team")) || [];
        console.log("Données récupérées depuis localStorage : ", savedTeam);
        setTeam(savedTeam);
    }, []);

    const removeFromTeam = (pokemonId) => {
        const updatedTeam = team.filter((pokemon) => pokemon.id !== pokemonId);
        setTeam(updatedTeam);

        localStorage.setItem("team", JSON.stringify(updatedTeam));
    };

    const statNames = ["hp", "attack", "defense", "special-attack", "special-defense", "speed"];
    const calculateAverageStats = () => {
        return statNames.map((statName) => {
            const totalStat = team.reduce((acc, pokemon) => {
                const statValue = pokemon.stat.find((s) => s.stat.name === statName)?.base_stat || 0;
                return acc + statValue;
            }, 0);
            return team.length > 0 ? totalStat / team.length : 0;
        });
    };

    const radarData = {
        labels: statNames.map((name) => name.replace("-", " ").toUpperCase()),
        datasets: [
            {
                label: "Moyenne des stats de l'équipe",
                data: calculateAverageStats(),
                backgroundColor: "rgba(54, 162, 235, 0.2)", // Couleur de fond semi-transparente
                borderColor: "rgba(54, 162, 235, 1)", // Couleur des contours
                borderWidth: 2,
            },
        ],
    };

    const radarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            r: {
                ticks: {
                    backdropColor: "transparent",
                    color: "rgba(0, 0, 0, 0.8)", // Couleur des chiffres
                    font: {
                        size: 12, // Taille de police des chiffres
                    },
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.1)", // Couleur des lignes de la grille
                },
                angleLines: {
                    color: "rgba(255, 255, 255, 0.1)", // Couleur des lignes radiales
                },
            },
        },
    };
    

    return (
        <div className="team-page">
            <h1>Mon Équipe</h1>

            {team.length === 0 ? (
                <p>Votre équipe est vide pour le moment. Vous pouvez les ajouter depuis leur page de consultation !</p>
            ) : (
                <>
                <div className='team-container-infos'>
                    <div className="team-list">
                        {team.map((pokemon) => (
                            <div key={pokemon.id} className="team-member">
                                <Link to={`/pokemon/${pokemon.id}`} className="pokemon-link">
                                    <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
                                    <h2>
                                        {pokemon.name} {pokemon.form === "shiny" ? "✨" : ""}
                                    </h2>
                                    <ul className="pokemon-types">
                                        {pokemon.types.map((t) => (
                                            <li key={t} className="type">
                                                <img
                                                    src={`/assets/types/${t}.png`}
                                                    alt={`${t}`}
                                                    className="type-icon"
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </Link>
                                <button className="remove-button" onClick={() => removeFromTeam(pokemon.id)}>Supprimer de l'équipe</button>
                            </div>
                        ))}
                    </div>
                    <div className="team-stats">
                        <h2>Statistiques moyennes de l'équipe</h2>
                        <div className='radar-container'>
                            <Radar data={radarData} options={radarOptions} />
                        </div>
                    </div>
                </div>
                </>
            )}
        </div>
    );
};

export default TeamPage;
