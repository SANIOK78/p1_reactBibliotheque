import React, {Component} from 'react';
import Bouton from "../../../components/Bouton/Bouton";

class FormulaireAjout extends Component {
    //1.- création d'un state avec trois infos qu'on va lier avec les
    // input du formulaire
    state = {
        titreSaisi : "",     //initialisé a vide au depart
        auteurSaisi : "",
        nbPagesSaisi : ""
    };

    // Fonction permettant communiquer les informations au composant 'listeLivres.js'
    handleValidationForm = (event) => {
        event.preventDefault();   //1. on va empecher la soumition du formulaire
     //utilisation de la fonction envoyé dans les 'props'
        this.props.validation(this.state.titreSaisi, this.state.auteurSaisi, this.state.nbPagesSaisi);

        // on va reinitialiser le formulaire une fois qu'on a rajouté le livre
        this.setStatetate = {
            titreSaisi : "",    
            auteurSaisi : "",
            nbPagesSaisi : ""
        };
    }

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

                         //2.1 -> Pour avoir un composant contrôlé il faut faire un sort que la valeur
                         //résente dans l'input fasse réferance a la valeur qu'on est en train de saisir 
                            value = {this.state.titreSaisi}
                         //2.2 -> dès lors qu'on aura un changement a l'interieur de l'input, 
                         //ça mettra a jour les valeurs dans les 'state'
                            onChange={(event) => this.setState({titreSaisi: event.target.value})}
                        />                       
                    </div>

                    <div className="form-group">
                        <label htmlFor="auteur">Auteur</label>
                        <input type="text" className="form-control" id="auteur" 
                            value = {this.state.auteurSaisi}
                            onChange={(event) => this.setState({auteurSaisi: event.target.value})}
                        />                       
                    </div>

                    <div className="form-group">
                        <label htmlFor="nbPages">Nb de pages</label>
                        <input type="number" className="form-control" id="nbPages"
                            value = {this.state.nbPagesSaisi}
                            onChange={(event) => this.setState({nbPagesSaisi: event.target.value})}
                        />                       
                    </div>

                  {/* on va envoyer la réferance a notre composant de 'Bouton' */}
                    <Bouton typeBtn="btn btn-primary" clic = {this.handleValidationForm} >
                        Valider
                    </Bouton>
                </form>
            </>
          
        );
    }
}

export default FormulaireAjout;