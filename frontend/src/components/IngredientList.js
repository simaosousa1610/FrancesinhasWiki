import React from 'react';

const IngredientList = ({ ingredients, onDelete, onRecover }) => (
  <ul>
    {ingredients.map(ingredient => (
      <li key={ingredient._id}>
        {ingredient.name}
        <button onClick={() => onDelete(ingredient._id)}>Delete</button>
      </li>
    ))}
  </ul>
);

export default IngredientList;
