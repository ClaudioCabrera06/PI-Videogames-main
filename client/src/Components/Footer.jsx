import React from "react";
import "./style/Footer.css"

export default function Footer (){
    return (
        <div className="footer-container">
            <p className="yo">Made by: Claudio Fabio Cabrera</p>
            <p className="yo">Cohorte: FT-33B</p>
            <a href="https://www.linkedin.com/in/claudio-fabio-cabrera-363222258/">
            <button className="boton">Linkedin</button>
            </a>
        </div>
    )
}