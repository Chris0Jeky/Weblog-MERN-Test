import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApiTest = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/test');
                setMessage(response.data.message);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>API Test</h1>
            <p>Message from the server: {message}</p>
        </div>
    );
};

export default ApiTest;
