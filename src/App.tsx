import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navigation } from './partials/Navigation'
import './App.css'
import Pokedex from './components/Pokedex'
import PokemonDetails from './components/PokemonDetails'

function App() {

  return (
    <>
      <BrowserRouter>
        <header>
          <Navigation />
        </header>

        <Routes>
          <Route path="/" element={ <Pokedex /> } />
          <Route path="/pokemon/:id" element={ <PokemonDetails /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
