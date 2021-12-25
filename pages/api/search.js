import tmdb from "../../lib/tmdb";
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export default function handler(req, res) {

    const searchTerm = req.query.searchTerm;
    if(!searchTerm && !searchTerm.length) {
        return res.json({});
    }

    return tmdb.get(`${process.env.TMDB_BASE_URL}/search/multi?language=en-US&query=${searchTerm}&page=1`, {
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${publicRuntimeConfig.tmdb_key}`,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return res.json(response.data);
    });
}
