import { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/alternates.css";

function Recommendations() {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5001/api/recommendations')
            .then(response => {
                setRecommendations(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the recommendations!', error);
            });
    }, []);

    return (
        <div>
            <h1>Recommended Alternatives</h1>
            <ul>
                {recommendations.map((item, index) => (
                    <li key={index}>
                        <p>Product Name: {item.product_name}</p>
                        <p>Nutri-Score: {item.nutri_score}</p>
                        <p>Carbon Footprint: {item.carbon_footprint} kg CO2</p>
                        <p>More Info: <a href={item.url} target="_blank" rel="noopener noreferrer">Click here</a></p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Recommendations;
