import { NavLink } from "react-router-dom";
import "./style/NavBar.css"

export function NavBar(){
    return (
        <div className="navbar-container">
            <ul>
				<li  className='nav-link'>
					<NavLink  to='/'>
						<p className="btn">Landing</p>
					</NavLink>
				</li>
				<li  className='nav-linki'>
					<NavLink  to='/home'>
						<p className="btn">Home</p>
					</NavLink>
				</li>
				<li  className='nav-link'>
					<NavLink  to='/create'>
						<p className="btn">Create a Videogame!</p>
					</NavLink>
				</li>
			</ul>
        </div>
    )
}