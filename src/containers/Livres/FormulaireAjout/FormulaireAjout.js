import React, {Component} from 'react';
import Bouton from "../../../components/Bouton/Bouton";
import {withFormik} from "formik";

class FormulaireAjout extends Component {
  
    // // Fonction permettant communiquer les informations au composant 'listeLivres.js'
    // handleValidationForm = (event) => {
    //     event.preventDefault();   //1. on va empecher la soumition du formulaire
    //  //utilisation de la fonction envoyé dans les 'props'
    //     this.props.validation(this.state.titreSaisi, this.state.auteurSaisi, this.state.nbPagesSaisi);

    //     // on va reinitialiser le formulaire une fois qu'on a rajouté le livre
    //     this.setStatetate = {
    //         titreSaisi : "",    
    //         auteurSaisi : "",
    //         nbPagesSaisi : ""
    //     };
    // }

    render() {
        return (
            <>
                <h2 className='text-center text-success' style={{fontFamily: 'Sigmar One'}}>
                    Affichage du formulaire d'ajout
                </h2>
                <form>
                 {/* 2. On va lier les input avec les valeur du 'state' */}
                    <div className="form-group">
                        <label htmlFor="titre">Titre du livre</label>
                        <input type="text" className="form-control" id="titre" 
                            // ajout propriété 'name' pour faire la liaison avec FORMIK
                            name= "titre"
                          //valeur récupéré depuis Formik
                            value = {this.props.values.titre}
                          //apres changement de la valeur on fait une mise a jour dans Formik
                          //on lancera la fonction qui existe dans FORMIK
                            onChange={this.props.handleChange}
                          //propriété qui permet de savoir si ce champ a été selectionné
                            onBlur= {this.props.handleBlur}
                        />
                       {/*1. Input qui va afficher le message d'erreur en cas d'erreur  */}
                       {/* 1.1 - on va tester si la propriété 'errors' est remlit et si c'est le 
                       cas alorsje l'affiche en dessous 
                        1.2 - On va tester ausi si le champ 'Titre' a été touché au < une fois*/}
                        {
                            this.props.touched.titre && this.props.errors.titre &&    
                            <span style={{color:"red"}}>{this.props.errors.titre}</span>
                        }
                    </div>

                    <div className="form-group">
                        <label htmlFor="auteur">Auteur</label>
                        <input type="text" className="form-control" id="auteur"
                        // ajout propriété 'name' pour faire la liaison avec FORMIK
                            name = "auteur"
                            value = {this.props.values.auteur}
                            onChange={this.props.handleChange}
                            //propriété qui permet de savoir si ce champ a été selectionné
                            onBlur= {this.props.handleBlur}
                        />  
                        {/*input qui va afficher le message d'erreur en cas d'erreur 
                         On va tester aussi si le champ 'Auteur' a été touché au < une fois */}
                        {
                            this.props.touched.auteur && this.props.errors.auteur && 
                            <span style={{color:"red"}}>{this.props.errors.auteur}</span>
                        }                    
                    </div>

                    <div className="form-group">
                        <label htmlFor="nbPages">Nb de pages</label>
                        <input type="number" className="form-control" id="nbPages"
                        // ajout propriété 'name' pour faire la liaison avec FORMIK
                            name = "nbPages"
                            value = {this.props.values.nbPages}
                            onChange={this.props.handleChange}
                            //propriété qui permet de savoir si ce champ a été selectionné
                            onBlur= {this.props.handleBlur}
                        />
                        {
                            this.props.touched.nbPages && this.props.errors.nbPages && 
                            <span style={{color:"red"}}>{this.props.errors.nbPages}</span>
                        }                         
                    </div>

                  {/* on va envoyer la réferance a notre composant de 'Bouton' */}
                    <Bouton typeBtn="btn btn-primary" clic = {this.props.handleSubmit} >
                        Valider
                    </Bouton>
                </form>
            </>
          
        );
    }
}

// Mise en place du module FORMIK
export default withFormik({
    mapPropsToValues : () => ({
        titre: '',
        auteur: '',
        nbPages: '',
    }),
    validate : values => {
        //1. initialisation a vide de l'errors
        const errors = {};
        //2. ensuite on va le remplir en fasant des test 
        if(values.titre.length < 3) {
            errors.titre = "Le titre doit avoir plus de 3 caractères !";
        }
        if(values.titre.length > 15) {
            errors.titre = "Le titre doit avoir mons de 15 caractères !";
        }
        if(!values.auteur) {
            errors.auteur = "!!! Le champs auteur est obligatoire. "
        }
        return errors;
    },
    handleSubmit : (values, {props}) => {
        props.validation(values.titre, values.auteur, values.nbPages);
    } 
})(FormulaireAjout);
