import React, { useEffect, useState } from 'react';
import RecipeReviewCard from './card';
import { useParams } from 'react-router-dom';

function Cat() {
  const [data, setData] = useState([]); // Données de repas
  const [error, setError] = useState(null); // Gestion des erreurs
  const { categoryName } = useParams(); // Capture le dernier segment de l'URL

  const fetchData = () => {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.meals) {
          setData(data.meals); // Mettez à jour les données de repas
          setError(null); // Aucune erreur
        } else {
          setData([]); // Vide les données de repas
          setError("Aucun repas trouvé pour cette catégorie."); // Affiche un message d'erreur
        }
      })
      .catch(error => {
        console.error(error);
        setError("Une erreur est survenue lors de la récupération des données.");
      });
  };

  useEffect(() => {
    fetchData();
  }, [categoryName]);
  return (
    <div className='container'>
      {error ? (
        <p>{error}</p> // Affiche l'erreur si aucune donnée trouvée ou en cas de problème
      ) : (
        <>
  <div className='full-width class1'>
    <h1 className='category'>{categoryName}</h1>
  </div>

    {data.map((meal, key) => (
      <RecipeReviewCard key={key} data={meal} />
    ))}

</>
      )}
    </div>
  );
}

export default Cat;
