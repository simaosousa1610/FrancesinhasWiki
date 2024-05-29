import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FrancesinhaList = () => {
    const [francesinhas, setFrancesinhas] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/francesinhas')
            .then(response => {
                setFrancesinhas(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the francesinhas!', error);
            });
    }, []);

    return (
        <div>
            <h1>Francesinha List</h1>
            <ul>
                {francesinhas.map(francesinha => (
                    <li key={francesinha._id}>{francesinha.name} - {francesinha.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default FrancesinhaList;
