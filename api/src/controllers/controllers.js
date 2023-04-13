// const { API_KEY } = process.env; importar la key obtenida para poder utilizarla. 
require('dotenv').config();
const { API_KEY } = process.env; 

const axios = require ("axios"); 
const {Genre, Videogame} = require ("../db"); 
const { Op } = require('sequelize')


// Buscar todos los generos de la API y guardarlos en DB. 
async function getAllGenres() {
    let genres = []  
    const allGenres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    .then(res => res.data)
    allGenres.results.forEach(e => {
        genres.push({
            name: e.name,
        })
    });
    genres.forEach(e => {
        Genre.findOrCreate({
            where: {
                name: e.name
            }
        })
    }); 
    return genres; 
}; 

// Busca los videojuegos en la API (primeros 15 que coincida con el nombre que recibe por parametro)
// Filtra lo que devuelve axios y devuelve solo la informacion necesaria para la ruta principal
async function getVideoGames(name) {
    let result = [] 
    if(name){
        const videoGamesName = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
        .then(res => res.data)
        videoGamesName.results.forEach(e => {
            if(result.length < 15){
                result.push({
                    id: e.id,
                    name: e.name,
                    image: e.background_image,
                    genre: e.genres.map(e => e.name),
                    rating: e.rating
                })
            }
        }); 
        if(!result.length) throw new Error(`No matches were found with the name: ${name}`)
        return result
    }
    return get100Videogames(); 
}; 

//Busca los 100 videojuegos de la API en un paginado de 5. 
async function get100Videogames(){
    const urls = [`https://api.rawg.io/api/games?key=${API_KEY}&page=1`, `https://api.rawg.io/api/games?key=${API_KEY}&page=2`, `https://api.rawg.io/api/games?key=${API_KEY}&page=3`, `https://api.rawg.io/api/games?key=${API_KEY}&page=4`, `https://api.rawg.io/api/games?key=${API_KEY}&page=5`]
    const reqq = await Promise.all(urls.map(e => axios.get(e).then(res => res.data)))
    const result = []
     reqq.forEach(e => e.results.forEach(r => result.push({
        id: r.id,
        name: r.name,
        image: r.background_image,
        genre: r.genres.map(g => g.name),
        rating: r.rating 
    })))
    console.log(result)
    return result;
}; 

//Busca los videojuegos de la db por nombre y tambien busca todos los videojuegos de la db.
async function getVideogamesFromDb(name) {
    const whereClause = name ? { name: { [Op.like]: `%${name}%` } } : {};
    const videogames = await Videogame.findAll({
      where: whereClause,
      include: [{ model: Genre }],
    });
    return videogames;
  }; 

// Trae todos los videojuegos de la db como de la api y tambien lo hace por nombre. 
async function getAllVideogames(name){
    if(name){
        const byNameApi = await getVideoGames(name);
        const byNameDb = await getVideogamesFromDb(name);
        return byNameApi.concat(byNameDb).slice(0,15);
    }
    const db = await getVideogamesFromDb(); 
    const api = await getVideoGames(); 
    return db.concat(api);
}; 

//Busca info un videojuego en especifico 
async function getVideogameDetail (id) {
	if(id.includes("-")){
		const videogame = await Videogame.findByPk(id, {
			include: [
				{
					model: Genre,
					attributes: ["name"],
					through: {
						attributes: []
					}
				}
			]
		})
		return videogame;
	};
    
	const videogame = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
		.then(response => response.data)
	const videogameDetail = {
		id: id,
		name: videogame.name,
		description: videogame.description, 
		image: videogame.background_image,
		genre: videogame.genres.map(g => g.name),
		release_date: videogame.released,
		rating: videogame.rating,
		platforms: videogame.parent_platforms.map(p => p.platform.name)
	};
	return videogameDetail;
}; 


// Exportamos las funciones creadas. 
module.exports = {
    getAllGenres,
    getVideoGames,
    getVideogameDetail,
    get100Videogames, 
    getVideogamesFromDb, 
    getAllVideogames, 
};

