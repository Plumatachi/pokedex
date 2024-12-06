import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../static/Pokedex.css";

const Pokedex = () => {
    const [allPokemon, setAllPokemon] = useState([]);
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    const [types, setTypes] = useState([]);
    const [search, setSearch] = useState("");
    const [type, setType] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const itemsPerPage = 20;

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await fetch("https://pokeapi.co/api/v2/type");
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des types");
                }
                const data = await response.json();
                const filteredTypes = data.results.filter(
                    (t) => t.name !== "unknown" && t.name !== "shadow" && t.name !== "stellar"
                );
                setTypes(filteredTypes);
            } catch (err) {
                console.error("Erreur lors de la récupération des types :", err);
            }
        };

        fetchTypes();
    }, []);

    useEffect(() => {
        const fetchAllPokemon = async () => {
            try {
                const limit = 100;
                const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1");
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération de la liste des Pokémon.");
                }

                const data = await response.json();
                const totalPokemon = data.count;
                const totalPages = Math.ceil(totalPokemon / limit);
                const allPokemonData = [];

                for (let page = 0; page < totalPages; page++) {
                    const offset = page * limit;
                    const pageResponse = await fetch(
                        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
                    );
                    if (!pageResponse.ok) {
                        throw new Error(`Erreur lors de la récupération de la page ${page + 1}`);
                    }
                    const pageData = await pageResponse.json();
                    allPokemonData.push(...pageData.results);
                }

                const allDetailedPokemon = await Promise.all(
                    allPokemonData.map(async (p) => {
                        try {
                            const speciesResponse = await fetch(
                                `https://pokeapi.co/api/v2/pokemon-species/${p.name}`
                            );
                            const formResponse = await fetch(
                                `https://pokeapi.co/api/v2/pokemon-form/${p.name}`
                            );

                            if (!speciesResponse.ok || !formResponse.ok) {
                                throw new Error(`Erreur pour récupérer les détails de ${p.name}`);
                            }

                            const speciesData = await speciesResponse.json();
                            const formData = await formResponse.json();

                            const frenchNameEntry = speciesData.names.find(
                                (entry) => entry.language.name === "fr"
                            );

                            return {
                                id: p.name,
                                name: frenchNameEntry ? frenchNameEntry.name : p.name,
                                image: formData.sprites.front_default,
                                types: formData.types.map((t) => t.type.name),
                            };
                        } catch (err) {
                            console.error(`Erreur avec le Pokémon ${p.name}:`, err);
                            return null;
                        }
                    })
                );

                const validPokemon = allDetailedPokemon.filter((p) => p !== null);
                setAllPokemon(validPokemon);
                setFilteredPokemon(validPokemon);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchAllPokemon();
    }, []);

    useEffect(() => {
        let filtered = allPokemon;

        if (search) {
            filtered = filtered.filter((p) =>
                p.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (type) {
            filtered = filtered.filter((p) => p.types.includes(type));
        }

        setFilteredPokemon(filtered);
        setPage(1);
    }, [search, type, allPokemon]);

    const startIndex = (page - 1) * itemsPerPage;
    const currentPagePokemon = filteredPokemon.slice(startIndex, startIndex + itemsPerPage);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>Erreur survenue : {error}</div>;
    }

    return (
        <div>
            <h1>Pokedex</h1>
            <input
                type="text"
                placeholder="Recherche un pokémon..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Tous les types</option>
                {types.map((t) => (
                    <option key={t.name} value={t.name}>
                        {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
                    </option>
                ))}
            </select>
            <div className="pokemon-grid">
                {currentPagePokemon.map((p) => (
                    <Link to={`/pokemon/${p.id}`} key={p.id} className="pokemon-card">
                        <img src={p.image} alt={p.name} />
                        <p>{p.name}</p>
                    </Link>
                ))}
            </div>
            <div className="pagination">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>Page précédente</button>
                <button onClick={() => setPage(page + 1)} disabled={currentPagePokemon.length < itemsPerPage}>Page suivante</button>
                <p>Page actuelle : {page}</p>
            </div>
        </div>
    );
};

export default Pokedex;