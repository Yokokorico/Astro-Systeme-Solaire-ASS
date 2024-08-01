import axios from 'axios';

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


export default getPlanetById;