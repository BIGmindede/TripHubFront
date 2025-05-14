import axios from 'axios';

interface Country {
    name: {
        common: string;
    };
    cca2: string;
}

export const countriesApi = {
    async getCountries(): Promise<string[]> {
        try {
            const response = await axios.get<Country[]>('https://restcountries.com/v3.1/all');
            return response.data
                .map(country => country.name.common)
                .sort((a, b) => a.localeCompare(b));
        } catch (error) {
            console.error('Error fetching countries:', error);
            return [];
        }
    },
    async getCountryByName(name: string): Promise<string | null> {
        try {
            const response = await axios.get<Country[]>(`https://restcountries.com/v3.1/name/${name}`);
            return response.data[0].name.common;
        } catch (error) {
            console.error('Error fetching country by name:', error);
            return null;
        }
    }
}; 