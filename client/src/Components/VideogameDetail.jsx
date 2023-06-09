import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameDetail, cleanDetail } from "../redux/actions/actions";
import { useParams } from "react-router-dom";
import './style/Details.css'
import Loader from "./Loader";

export default function VideogameDetail(props){

	const {id} = useParams()
	const dispatch = useDispatch()

	const videogameDetail = useSelector(state => state.videogameDetail)

	
	useEffect(() => {

		dispatch(getVideogameDetail(id))//investigar bien match.params!

		return () => {
			dispatch(cleanDetail(1))   //funcion que limpia el detalle una vez que salimos de la pag, vuelve a poner al estado como un obj vacio
		}

	}, [dispatch, id])

	

	if(!videogameDetail || Object.keys(videogameDetail).length ===0 ) return <Loader />


	return(
		<div className='container'>
				
			<div className="cont-cont">
				<div className="img-container">
					<img className='img' src={videogameDetail.image ? videogameDetail.image : videogameDetail.image = 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png'} alt='img'/>
				</div>
			</div>
			<div className="detail-container">
				<h1 className="game-title">Name: {videogameDetail.name}</h1>
				<p className="details" key='description'>Description: {videogameDetail.description}</p>
				<div className="little-container">
					<p className="details" key='rating'>Rating: {videogameDetail.rating}</p>
					<p className="details" key='releaseDate'>Release Date: {videogameDetail.release_date}</p>
					<p className="details" key='platformsDetail'>Platforms: {videogameDetail.platforms}</p>
					<p className="details" key='genresDetail'>Genres: {videogameDetail.genre || (videogameDetail.Genres && videogameDetail.Genres.map(g => g.name + ', '))}</p>	
				</div>
			</div>
		</div>
	)
}