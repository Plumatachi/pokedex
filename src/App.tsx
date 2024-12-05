import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navigation } from './partials/Navigation'
import './App.css'
import Pokedex from './components/Pokedex'

function App() {

  return (
    <>
      <BrowserRouter>
        <header>
          <Navigation />
        </header>

        <Routes>
          <Route path="/" element={ <h1>Home Page</h1> } />
          <Route path="/pokedex" element={  <Pokedex /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
