import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { VideogameCard } from "./VideogameCard.jsx";
import { SearchBar } from "../Components/SearchBar";
import {Paginate} from './Paginate'
import {filterByCreation, filterByGenre, orderByName, orderByRating, getGenres, getVideogames, } from "../redux/actions/actions"
import { useHistory } from "react-router-dom";
import "./style/Home.css"
import Loader from "./Loader.jsx";



export default function Home (){

    const dispatch = useDispatch(); 

    const history = useHistory()

    const genres = useSelector((state) => state.genres); 
    const videogames = useSelector((state) => state.videogames); 
    useSelector((state) => state.allVideogames)

    const [alfabetical, setAlfabetical] = useState('')
	const [rating, setRating] = useState('')

	const [currentPage, setCurrentPage ] = useState(1);
	const videogamesPerPage = 15
	const ultimo = currentPage * videogamesPerPage
	const primero = ultimo - videogamesPerPage
	const games = videogames.slice(primero, ultimo)

	const setPagination = (page) => {
	  	return setCurrentPage(page)
	}

    useEffect(() =>{
        dispatch(getVideogames())
        dispatch(getGenres())
    },[dispatch])

	 
	// Pagina de carga. 

    //Filtrados 

    const handlerRating = (event) => {
		event.preventDefault()
		dispatch(orderByRating(event.target.value))
		setRating(`Order ${event.target.value}`)
	}

	const handlerName = (event) => {
		event.preventDefault()
		dispatch(orderByName(event.target.value))
		setAlfabetical(`Order ${event.target.value}`)
	}

	const handlerGenre = (event) => {
		event.preventDefault()
		dispatch(filterByGenre(event.target.value))
	}

	const handleCreatedAt = (event) => {
		event.preventDefault()
		dispatch(filterByCreation(event.target.value))
	}

	const handleClick = () => {
		history.go(0);
	}

    console.log(videogames)
    return (
        <div className="fondo">
           	<h1 className="titulo">Welcome to Home!</h1>
				<div className="search-bar">
					<SearchBar/>
				</div>
				<div className="f-container">
					<div className="filters-container">
						<div className='filter'>
							<label>Filter by Name: </label>
								<select key='selectFilterName' name="FilterByName" onChange={(event) => handlerName(event)}>
										<option key='ALLBYNAME'defaultValue='ALL'></option>
										<option key='A-Z' value='A-Z'>A-Z</option>
										<option key='Z-A' value='Z-A'>Z-A</option>
								</select>
						</div>
						<div className='filter'>
							<label> Rating: </label>
								<select  key='selectFilterRating' name="FilterByRating" onChange={(event) => handlerRating(event)}>
										<option key='ALLRATING' defaultValue='ALL'></option>
										<option key='0-5' value='0-5'>0-5</option>
										<option key='5-0' value='5-0'>5-0</option>
								</select>
						</div>
						<div className='filter'>
							<label>Genre: </label>
								<select key='selectFilterGenre' onChange={(event) => handlerGenre(event)}>
									<option key='ALLGENRE' defaultValue='ALL'></option>
									{ genres && genres.map((g,i) => (<option key={i} value={g.name}>{g.name}</option>))}
								</select>
						</div>
						<div className='filter'>
							<label>Created At: </label>
								<select key='selectFilterCreation' onChange={(event) => handleCreatedAt(event)}>
									<option key='ALLCREATION' defaultValue='ALL'></option>
									<option key='db' value='db'>Database</option>
									<option key='api' value='api'>API</option>
								</select>
						</div>
						<div className='filter'>
								<button className='clear-btn' onClick={() => handleClick()}>Reload Videogames</button> 
						</div>
					</div>
				</div>
				<div className="card-layout">
                {games.map((v,i) =>  <VideogameCard
						key={i}
						id={v.id}
						name={v.name}
						genre={v.genre || (v.Genres && v.Genres.map(g => g.name))}
						image= {v.image ? v.image : v.image = 'https://wallpaperaccess.com/full/236572.jpg'}
						rating= {v.rating}
					/>)}
				</div>
					<div>
						{videogames.length === 0 ? null : (<Paginate
						videogamesPerPage={videogamesPerPage}
						allVideogames={videogames.length}
						setPagination={setPagination}
						currentPage={currentPage}
						setCurrentPage= {setCurrentPage}
						/>)}
					</div>
			</div>
	)
} 
	
