import axios from 'axios';
import { cp } from 'fs';

const API_URL = 'https://api.le-systeme-solaire.net/rest.php'; 

const getPlanetById = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/bodies/${id}`);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}

export const getListOfPlanet = async () => {
    try {
        const response = await axios.get(`${API_URL}/bodies?filter%5B%5D=equaRadius%2Cge%2C2440.53`);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}


export default getPlanetById;