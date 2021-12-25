import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const tmdb = axios.create({
    baseURL: publicRuntimeConfig.tmdb_url,
    withCredentials: true,
    headers: {
        'Authorization': `Bearer ${publicRuntimeConfig.tmdb_key}`,
        'Content-Type': 'application/json'
    }
});

export default tmdb;