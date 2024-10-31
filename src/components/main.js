import React, { useEffect, useState } from 'react';
import RecipeReviewCard from './card';
import Searched from './search';
import Category from './category';
import { Alert, Spin } from 'antd';

function Main() {
  const [searchLetter, setSearchLetter] = useState(''); // Lettre de recherche
  const [data, setData] = useState([]); // Données de repas
  const [message, setMessage] = useState(''); // Message d'erreur
  const [loading, setLoading] = useState(false); // État de chargement

  const fetchData = (useGeneral = false) => {
    setLoading(true); // Démarre le chargement
    const url = useGeneral || !searchLetter
      ? "https://www.themealdb.com/api/json/v1/1/search.php?s="
      : `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchLetter}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.meals && Array.isArray(data.meals)) {
          setData(data.meals);
          setMessage(''); // Réinitialise le message si des résultats sont trouvés
        } else {
          setMessage(`Aucun repas trouvé pour la lettre "${searchLetter}".`); // Affiche le message d'erreur
          alert(`Aucun repas trouvé pour la lettre "${searchLetter}".`); // Alerte pour l'absence de résultats
          fetchData(true); // Rappelle l'API sans filtre pour afficher la liste générale
        }
      })
      .catch(error => {
        console.error(error);
        setMessage("Une erreur s'est produite lors de la récupération des données.");
      })
      .finally(() => {
        setLoading(false); // Arrête le chargement après la récupération
      });
  };

  // Appelle `fetchData` lorsque `searchLetter` change
  useEffect(() => {
    fetchData();
  }, [searchLetter]);

  return (
    <>
    
      {message && <p>{message}</p>} {/* Affiche le message d'erreur si `message` est défini */}
      <div className='container'>
        <div className='full-width'>
          <Searched onSearch={setSearchLetter} />
        </div>
        <h1 className='category'>Category</h1>
        <Category />
        <div className='full-width class1'>
          <h1 className='category'>Plats</h1>
        </div>

        {loading ? ( // Affiche l'indicateur de chargement si `loading` est vrai
          <Spin tip="Loading..." size="large" />
        ) : (
          Array.isArray(data) && data.length > 0 ? (
            data.map((meal, key) => (
              <RecipeReviewCard key={key} data={meal} />
            ))
          ) : (
            <p>Aucun repas à afficher.</p>
          )
        )}
      </div>
    </>
  );
}

export default Main;
