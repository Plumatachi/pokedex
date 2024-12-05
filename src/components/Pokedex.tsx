import { useEffect, useState } from "react";

const Pokedex = () => {
    const [pokemon, setPokemon] = useState([]);
    const [search, setSearch] = useState("");
    const [type, setType] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}&${type ? `type=${type}` : ""}&${search ? `search=${search}` : ""}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch pokemon");
                }

                const data = await response.json();
                setPokemon(data.results);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [page, search, type]);

    if (loading) {
        return <div>Loading pokemon...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Pokedex</h1>
            <input type="text" placeholder="Search by name" value={search} onChange={(e) => setSearch(e.target.value)} />
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">All Types</option>
                <option value="normal">Normal</option>
                <option value="fire">Fire</option>
                <option value="water">Water</option>
                <option value="electric">Electric</option>
                <option value="grass">Grass</option>
                <option value="ice">Ice</option>
                <option value="fighting">Fighting</option>
                <option value="poison">Poison</option>
                <option value="ground">Ground</option>
                <option value="flying">Flying</option>
                <option value="psychic">Psychic</option>
                <option value="bug">Bug</option>
                <option value="rock">Rock</option>
                <option value="ghost">Ghost</option>
                <option value="dragon">Dragon</option>
                <option value="dark">Dark</option>
                <option value="steel">Steel</option>
                <option value="fairy">Fairy</option>
            </select>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
            <button onClick={() => setPage(page + 1)}>Next</button>
            <ul>
                {pokemon.map((p) => (
                    <li key={p.name}>
                        <a href={`/pokemon/${p.name}`}>{p.name}</a>
                    </li>
                ))}
            </ul>
            <p>Page: {page}</p>
        </div>
    );
};

export default Pokedex;