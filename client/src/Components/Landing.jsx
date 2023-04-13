import React from "react";
import { NavLink } from "react-router-dom";
import './style/Landing.css'

export default function Landing(){
	return(
		<div className="container">
			<div className='landing-container'>
				<NavLink to="/home">
					<button className="button">
					<h1 className="landingbutton">Welcome to the Videogames App!</h1>
					</button>
					</NavLink>
			</div>
		</div>
	)
}

//  <p>Bienvenido al emocionante mundo de los Pokémon, donde puedes embarcarte en una aventura llena de criaturas fascinantes y desafíos emocionantes.</p>
