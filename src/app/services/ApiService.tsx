import axios from 'axios';

const API_URL = 'https://api.le-systeme-solaire.net/rest.php';

const generateFilters = (planetIds: string[]): string[] => {
    return planetIds.map(id => `id,eq,${id}`);
};

export const getListOfPlanet = async (planetIds: string[]) => {
    try {
        const filters = generateFilters(planetIds);
        const filterString = filters.join("&filter%5B%5D=");
        const response = await axios.get(`${API_URL}/bodies?filter%5B%5D=${filterString}&satisfy=any`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to handle it in the component
    }
};
