// App.js
import './App.css';
import Main from './components/main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Seul from './components/seul';
import Cat from './components/category1';
import Lottie from "lottie-react";
import loadingAnimation from "./assest/1.json";
import { useState, useEffect } from 'react'; // Importa useState e useEffect

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Cambia lo stato di caricamento dopo 2000 ms
    }, 2100); // Ritardo di 2000 ms

    return () => clearTimeout(timer); // Pulisci il timer se il componente viene smontato
  }, []);

  return (
    <Router>
      {isLoading ? (
        <div
         style={{
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "50%", // Ajustez la largeur selon vos besoins
  margin: "0 auto" // Centre horizontalement
}}

        >
          <Lottie animationData={loadingAnimation} loop={true} />
        </div>
      ) : (
        <Routes>
          <Route index element={<Main />} />
          <Route path="/seul/:id" element={<Seul />} />
          <Route path="/category/:categoryName" element={<Cat />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
