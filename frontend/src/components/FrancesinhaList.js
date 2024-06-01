import React, { useState } from 'react';
import './List.css';

const FrancesinhaList = ({ francesinhas, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState({ key: 'name', ascending: true });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (key) => {
    setSortCriteria(prevSortCriteria => ({
      key,
      ascending: prevSortCriteria.key === key ? !prevSortCriteria.ascending : true,
    }));
  };

  const filteredFrancesinhas = francesinhas.filter(francesinha =>
    francesinha.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedFrancesinhas = filteredFrancesinhas.sort((a, b) => {
    if (a[sortCriteria.key] < b[sortCriteria.key]) {
      return sortCriteria.ascending ? -1 : 1;
    }
    if (a[sortCriteria.key] > b[sortCriteria.key]) {
      return sortCriteria.ascending ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="list-container">
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <div className="sort-buttons">
        <button onClick={() => handleSortChange('name')} className="sort-button">Sort by Name</button>
        <button onClick={() => handleSortChange('rating')} className="sort-button">Sort by Rating</button>
      </div>
      <div className="grid">
        {sortedFrancesinhas.map((francesinha) => (
          <div key={francesinha._id} className="card">
            <div className="name">{francesinha.name}</div>
            <div className="restaurant">Restaurant: {francesinha.restaurant}</div>
            <div className="ingredients"> Ingredients: {francesinha.ingredients.join(', ')}</div>
            <div className="picture">
              {francesinha.image_id && (
                <img src={`http://localhost:5000/francesinhas/${francesinha._id}/image`} alt={francesinha.name} />
              )}
            </div>
            <div className="price">Price: {francesinha.price} €</div>
            <div className="rating">Rating: {francesinha.rating}</div>
            <div className="button-group">
              <button onClick={() => onDelete(francesinha._id)} className="action-button">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrancesinhaList;
