import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

function Seul() {
  const { id } = useParams();
  const url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
  const [data, setData] = useState(null);

  // Utilisation de useCallback pour éviter de recréer la fonction à chaque rendu
  const fetchData = useCallback(() => {
    fetch(url + id)
      .then(response => response.json())
      .then(data => {
        if (data.meals) {
          setData(data.meals[0]);
        } else {
          console.error("No meals found");
        }
      })
      .catch(error => console.error(error));
  }, [id, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Ajout de fetchData comme dépendance

  // Créer un tableau d'ingrédients et de mesures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = data ? data[`strIngredient${i}`] : null;
    const measure = data ? data[`strMeasure${i}`] : null;
    if (ingredient && ingredient.trim() && measure && measure.trim()) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <div>
      {data ? (
        <div>
          <h1 className='title'>{data.strMeal}</h1>
          <div className='flex'>
            <img className='i1' src={data.strMealThumb} alt={data.strMeal} />
            <div className='p'>
              <h3>Ingredients:</h3>
              <ul>
                {ingredients.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className='p place'>
              <h3 className='text'>Instructions:</h3>
              <p>{data.strInstructions}</p>

              <div className='flexi'>
                <div className='liste'>
                  {data.strCategory && <p><strong>Category:</strong> {data.strCategory}</p>}
                  {data.strArea && <p><strong>Place:</strong> {data.strArea}</p>}
                  {data.strTags && <p><strong>Tags:</strong> {data.strTags}</p>}
                </div>
                {data.strYoutube && (
                  <div>
                    <iframe
                      width="320"
                      height="240"
                      src={data.strYoutube.replace("watch?v=", "embed/")}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Seul;
