 import React from "react";




 export default function Loader() {

     const curiosidad = [
    "La Playstation 2 ha tenido tanto éxito y sido tan popular que Sony continuó fabricandola hasta el mes en que fue anunciada la Playstation 4",
    "En GTA V, si te acercas al centro de rehabilitación Parsons podrás ver a los paparazzis enfrente de la entrada esperando a las celebridades que caen en rehabilitación.",
    "La fábrica en Japón que produce la Playstation solo tiene 4 personas trabajando. El procedimiento de ensamblaje se realiza de manera automatizada en tan solo 30 segundos.",
     "En Hitman 2 (2018) si pesas al agente 47 sobre una balanza te dará 47.0 KG",
     "En The Last of Us 2, si corres y te tiras al suelo repetidas veces Ellie obtendrá cicatrices en sus antebrazos y muñecas",
 ]
     return (
         <div className="loadercontainer">
             <div className="contentloader">
                     <h1 className="cargando">CARGANDO</h1>
                <span className="loader"></span>
                 <div className="sabias"><h2>Sabias qué?...</h2>
                    <h3>{curiosidad[Math.floor((Math.random(0,10) * curiosidad.length))]}</h3></div>
            </div>
         </div>

     )
 }