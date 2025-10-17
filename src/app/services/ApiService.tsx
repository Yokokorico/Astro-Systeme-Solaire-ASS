import axios from 'axios';
import { Astre } from '../types/bodies';

// L'API demande maintenant un token d'authentification
// Pour les CORS on utilise un proxy dans src/app/api/proxy

const generateFilters = (planetIds: string[]): string[] => {
    return planetIds.map(id => `id,eq,${id}`);
};

const generateMoonsFilters = (moonUrl: string[]): string[] => {
    const moonIds: string[] = [];
    moonUrl.forEach((url) =>{
        let id = url.split("/")[5];
        moonIds.push(`id,eq,${id}`)
    })
    return moonIds;
};

export const getMoonsIds = (planets: Astre[]): string[] => {
    const moonIds: string[] = [];
    planets.forEach(planet => {
        if (planet.moons) {
            planet.moons.forEach(moon => {
                if(!moon.rel.includes("s20")){
                    moonIds.push(moon.rel);
                 
                }
            });
        }
    });
    return moonIds;
}


export const getListOfPlanet = async (planetIds: string[]) => {
    try {
        const filters = generateFilters(planetIds);
        const filterString = filters.join("&filter%5B%5D=");
        const response = await axios.get(`/api/proxy?filter%5B%5D=${filterString}&satisfy=any`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to handle it in the component
    }
};

export const getListOfMoons = async (planets: Astre[]) => {
    try {
        const tabMoon = getMoonsIds(planets);
        const filters = generateMoonsFilters(tabMoon);
        const filterString = filters.join("&filter%5B%5D=");
        const response = await axios.get(`/api/proxy?order=equaRadius%2Cdesc&filter%5B%5D=${filterString}&satisfy=any`);
        const data = response.data;
        const enrichedResults = data.bodies.map((moon: Astre) => {
            return {
              ...moon,
            };
          })
        
        planets.forEach(planet => {
            if (planet.moons) {
                enrichedResults.forEach((moons: Astre) =>{                                   
                    if(planet.moonAstres.length <= 50){
                        if(planet.id == moons.aroundPlanet?.planet){
                            planet?.moonAstres.push(moons)
                        }
                    }
                }) 
            }
        })
        return planets;
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to handle it in the component
    }
};
