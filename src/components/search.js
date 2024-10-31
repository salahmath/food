// Searched.js
import React from 'react';
import { Input } from 'antd';
const { Search } = Input;

const Searched = ({ onSearch }) => {
  return (
   
    <section>
    <div className="box">
      <form
        name="search"
        onSubmit={(e) => {
          e.preventDefault(); // Empêche le rechargement de la page
          const searchTerm = e.target.txt.value; // Récupère la valeur du champ de recherche
          onSearch(searchTerm); // Appelle la fonction de recherche
        }}
      >
        <input
          type="text"
          className="input"
          name="txt"
          placeholder="Search par lettre" // Optionnel : ajout d'un placeholder
        />
      </form>
      <i className="fas fa-search"></i>
    </div>
  </section>
  

  );
};

export default Searched;



 {/* <Search
      placeholder="Search meals"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
       // Pass search term on search
    /> */}