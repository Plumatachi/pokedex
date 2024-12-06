import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "../static/PokemonDetails.css";

const PokemonDetails = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [species, setSpecies] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedGeneration, setSelectedGeneration] = useState("generation-i");
    const [descriptions, setDescriptions] = useState([]);
    const [localizedName, setLocalizedName] = useState("");
    const [currentForm, setCurrentForm] = useState("normal");

    const generationMapping = {
        "generation-i": ["red", "blue", "yellow"],
        "generation-ii": ["gold", "silver", "crystal"],
        "generation-iii": ["ruby", "sapphire", "emerald"],
        "generation-iv": ["diamond", "pearl", "platinum", "heartgold", "soulsilver"],
        "generation-v": ["black", "black-2", "white-2"],
        "generation-vi": ["x", "y", "omega-ruby", "alpha-sapphire"],
        "generation-vii": ["sun", "moon", "ultra-sun", "ultra-moon"],
        "generation-viii": ["sword", "shield"],
    };

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

                if (!pokemonResponse.ok || !speciesResponse.ok) {
                    throw new Error("Erreur lors de la récupération des données du Pokémon");
                }

                const pokemonData = await pokemonResponse.json();
                const speciesData = await speciesResponse.json();

                setPokemon(pokemonData);
                setSpecies(speciesData);

                const frenchNameEntry = speciesData.names.find((entry) => entry.language.name === "fr");
                setLocalizedName(frenchNameEntry ? frenchNameEntry.name : pokemonData.name);

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [id]);

    const handleGenerationChange = (generation) => {
        setSelectedGeneration(generation);

        if (species) {
            // Filtrer les descriptions pour la génération et les versions associées
            const generationVersions = generationMapping[generation];

            const filteredDescriptions = generationVersions.map((version) => {
                const entry = species.flavor_text_entries.find(
                    (entry) => entry.language.name === "fr" && entry.version.name === version
                );

                return {
                    version,
                    description: entry ? entry.flavor_text : "Aucune description disponible en français.",
                };
            });

            setDescriptions(filteredDescriptions);
        }
    };

    useEffect(() => {
        // Charger les descriptions de la génération par défaut (génération-i) au premier chargement
        handleGenerationChange(selectedGeneration);
    }, [species]);

    // const renderGenderDifferences = () => {
    //     if (
    //         !pokemon.sprites.front_female &&
    //         !pokemon.sprites.back_female
    //     ) {
    //         return <p>Pas de différence visuelle entre mâles et femelles.</p>;
    //     }

    //     return (
    //         <table className="gender-differences-table">
    //             <thead>
    //                 <tr>
    //                     <th>Mâle</th>
    //                     <th>Femelle</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 <tr>
    //                     <td>
    //                         <img
    //                             src={pokemon.sprites.front_default}
    //                             alt={`Sprite mâle de ${localizedName}`}
    //                         />
    //                     </td>
    //                     <td>
    //                         {pokemon.sprites.front_female ? (
    //                             <img
    //                                 src={pokemon.sprites.front_female}
    //                                 alt={`Sprite femelle de ${localizedName}`}
    //                             />
    //                         ) : (
    //                             "Non disponible"
    //                         )}
    //                     </td>
    //                 </tr>
    //                 <tr>
    //                     <td>
    //                         <img
    //                             src={pokemon.sprites.back_default}
    //                             alt={`Sprite arrière mâle de ${localizedName}`}
    //                         />
    //                     </td>
    //                     <td>
    //                         {pokemon.sprites.back_female ? (
    //                             <img
    //                                 src={pokemon.sprites.back_female}
    //                                 alt={`Sprite arrière femelle de ${localizedName}`}
    //                             />
    //                         ) : (
    //                             "Non disponible"
    //                         )}
    //                     </td>
    //                 </tr>
    //             </tbody>
    //         </table>
    //     );
    // };

    const renderGenderDifferences = () => {
        if (
            !pokemon.sprites.front_female &&
            !pokemon.sprites.back_female
        ) {
            return <p>Pas de différence visuelle entre mâles et femelles.</p>;
        }
    
        return (
            <div>    
                <table className="gender-differences-table">
                    <thead>
                        <tr>
                            <th>Mâle</th>
                            <th>Femelle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <img
                                    src={
                                        currentForm === "normal"
                                            ? pokemon.sprites.front_default
                                            : pokemon.sprites.front_shiny
                                    }
                                    alt={`Sprite ${currentForm} mâle de ${localizedName}`}
                                />
                            </td>
                            <td>
                                {pokemon.sprites.front_female ? (
                                    <img
                                        src={
                                            currentForm === "normal"
                                                ? pokemon.sprites.front_female
                                                : pokemon.sprites.front_shiny_female
                                        }
                                        alt={`Sprite ${currentForm} femelle de ${localizedName}`}
                                    />
                                ) : (
                                    "Non disponible"
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img
                                    src={
                                        currentForm === "normal"
                                            ? pokemon.sprites.back_default
                                            : pokemon.sprites.back_shiny
                                    }
                                    alt={`Sprite ${currentForm} arrière mâle de ${localizedName}`}
                                />
                            </td>
                            <td>
                                {pokemon.sprites.back_female ? (
                                    <img
                                        src={
                                            currentForm === "normal"
                                                ? pokemon.sprites.back_female
                                                : pokemon.sprites.back_shiny_female
                                        }
                                        alt={`Sprite ${currentForm} arrière femelle de ${localizedName}`}
                                    />
                                ) : (
                                    "Non disponible"
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };    

    if (loading) {
        return <div>Chargement des données...</div>;
    }

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    if (!pokemon || !species) {
        return <div>Pokémon introuvable</div>;
    }

    return (
        <div className="pokemon-details">
            <h1>{localizedName}</h1>
            <div className="pokemon-header">
                <div className="pokemon-images">
                    <div>
                        <img src={currentForm === "normal" ? pokemon.sprites.other["official-artwork"].front_default : pokemon.sprites.other["official-artwork"].front_shiny} alt={`Image ${currentForm === "normal" ? "normale" : "shiny"} de ${pokemon.name}`} />
                    </div>
                    <div className="image-buttons">
                        <button onClick={() => setCurrentForm("normal")} className={currentForm === "normal" ? "active" : ""}>Forme Normale</button>
                        <button onClick={() => setCurrentForm("shiny")} className={currentForm === "shiny" ? "active" : ""}>Forme Chromatique</button>
                    </div>
                </div>
                <div className="pokemon-infos">
                    <p>Taille : {pokemon.height / 10} m</p>
                    <p>Poids : {pokemon.weight / 10} kg</p>
                    <h3>Types</h3>
                    <ul>
                        {pokemon.types.map((t) => (
                            <li key={t.type.name} className="pokemon-type">
                                <img
                                    src={`/assets/types/${t.type.name}.png`}
                                    alt={`${t.type.name}`}
                                    className="type-icon"
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <h3>Différences entre mâles et femelles</h3>
            {renderGenderDifferences()}

            <h3>Descriptions par génération</h3>
            <div className='generation-select'>
                <select value={selectedGeneration} onChange={(e) => handleGenerationChange(e.target.value)}>
                    {Object.keys(generationMapping).map((gen) => (
                        <option key={gen} value={gen}>
                            {`Génération ${gen.split("-")[1].toUpperCase()}`}
                        </option>
                    ))}
                </select>
            </div>

            <div className="descriptions">
                {descriptions.map((desc) => (
                    <div key={desc.version} className="description-item">
                        <strong>Pokémon {desc.version.charAt(0).toUpperCase() + desc.version.slice(1)} :</strong>{" "}
                        <p>{desc.description}</p>
                    </div>
                ))}
            </div>

            <h3>Statistiques</h3>
            <div className="stats-container">
                {pokemon.stats.map((s) => (
                    <div key={s.stat.name} className="stat-item">
                        <span className="stat-name">
                            {s.stat.name.charAt(0).toUpperCase() + s.stat.name.slice(1)}
                        </span>
                        <div className="stat-bar">
                            <div
                                className="stat-fill"
                                style={{ width: `${(s.base_stat / 255) * 100}%` }}
                            ></div>
                        </div>
                        <span className="stat-value">{s.base_stat}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PokemonDetails;
