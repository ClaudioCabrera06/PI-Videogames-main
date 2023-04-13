const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const genreRouter = Router();
const { getAllGenres } = require("../controllers/controllers"); 

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
genreRouter.get('/', async(req, res)=> {
	try {
		const genres = await getAllGenres()
		return res.status(200).json(genres)
	} catch (error) {
		return res.status(404).json(error.message)
	}
}); 

module.exports = genreRouter;
  