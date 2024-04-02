import { useState } from 'react'
import './App.css'
import { WelcomeScreen as Welcome } from "./screens/WelcomeScreen";
import Game from "./screens/GameScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Contact from './routes/Contact'
import GameScreen from './screens/GameScreen';


function App() {
  const [name, setName] = useState(`Bearcat`)
  const [gameStarted, setGameStarted] = useState(false)

  return (
    <Router>
    <Navbar />
    <div>
      {/* <img src={reactLogo} className="logo react" alt="React logo" /> */}
      <h1>Rock Paper Scissors</h1>
    </div>
    {
      gameStarted
      ? <Game name={name} />
      : <Welcome name={name} onNameChange={setName} onGameStart={() => setGameStarted(true)} />
    }
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/game" element={<Game name={name} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tic-tac" element={<Tic-Tac />} />


      </Routes>
    </Router>
);
}

export default App
