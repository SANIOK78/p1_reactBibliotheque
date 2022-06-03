import React from "react";
import clPerso from "./TitreH1.module.css";

// Création composant 'titre'
const titreH1 = (props) => {

    const titreCss = `${clPerso.policeTitre} border border-dark p-2 m-2 bg-primary rounded text-white text-center`;
    return <h1 className={titreCss}>{props.children}</h1>   
};

export default titreH1;

