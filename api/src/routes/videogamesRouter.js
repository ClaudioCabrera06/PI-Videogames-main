const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogamesRouter = Router();
const {getVideogameDetail, getAllVideogames, get100Videogames} = require("../controllers/controllers"); 
const {Genre, Videogame} = require('../db'); 

videogamesRouter.get('/', async (req, res)=> {
	const { name } = req.query
	try {
		if(name){
			const videogames = await getAllVideogames(name)
			res.status(200).json(videogames)
		} else {
			const index = await get100Videogames()
			res.status(200).json(index)
		}
	} catch (error) {
		return res.status(404).json(`No videogames found with the name ${name}`)
	}
})

videogamesRouter.get('/:id', async (req, res) => {
	const { id } = req.params
	try {
		const videogameDetail = await getVideogameDetail(id)
		return res.status(200).json(videogameDetail)
	} catch (error) {
		return res.status(404).json(`No existe un videojuego con el id: ${id}`)
	}
})

videogamesRouter.post('/', async (req, res) => {
	const {name, description, release_date, rating, platforms, genres} = req.body
	try {
		if(!name || !description || !platforms) return res.status(400)
		const exists = await Videogame.findOne({
			where: { name }
		});
		if(exists) return res.status(404).json('A game with that name already exists')
		const newVideogame = await Videogame.create({name, description, platforms, rating, release_date});

		const genreDb = await Genre.findAll({
			where: { name: genres }
		});

		newVideogame.addGenre(genreDb);

		return res.status(200).json(newVideogame);
	} catch (error) {
		return res.status(404).json(error.message);
	}
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = videogamesRouter;
