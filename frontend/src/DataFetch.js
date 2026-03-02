import { useState, useEffect } from 'react';
import axios from 'axios';

const useMaloprodajaData = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/maloprodaja/')
      .then((response) => {
        setData(response.data); // Set the data from the response
      })
      .catch((err) => {
        setError('Error fetching data'); // Handle error if API call fails
        console.error('Error fetching data:', err);
      });
  }, []);

  return { data, error };
};

export default useMaloprodajaData;