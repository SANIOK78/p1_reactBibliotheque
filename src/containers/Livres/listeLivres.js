import React, {Component} from 'react';
import UnLivre from './Bouquin/unLivres';
import FormulaireAjout from './FormulaireAjout/FormulaireAjout';
import FormulaireModification from './FormulaireModification/FormulaireModification';
import Alert from "../../components/Alert/Alert";

class Livres extends Component {
    state = {
        listeLivres: [
            {id:1, titre:"Bouquin N1", auteur: "Auteur N1", nbPages: "200"},
            {id:2, titre:"Bouquin N2", auteur: "Auteur N2", nbPages: "10"},
            {id:3, titre:"Bouquin N3", auteur: "Auteur N3", nbPages: "110"},
            {id:4, titre:"Bouquin N4", auteur: "Auteur N4", nbPages: "80"},
        ],
      //on declare/initialise une propriete avec la valeur de dernier ID du livre
        lastIdLivre : 4,  
      // On va stocker l'ID du livre sur lequelle on a cliqué 
        idLivreAModifier : 0,
      //On stock une infos permettant d'afficher l'alert
        alertMessage : null  //pas d'alert au départ
    }

    // fonction supprimant un livre
    handleSupprimLivre = (id) => {

        const indexLivreTab = this.state.listeLivres.findIndex(el => {
            return el.id === id;
        });
        // régles dimmutabilité React: on va faire une copie du tableau
        const newLivres = [...this.state.listeLivres];
        console.log(newLivres);
        // suppression du livre stocké dans 'indexLivreTab'
        newLivres.splice(indexLivreTab, 1);
        // ensuite il faut fusionner le nouveau tableau avec l'ancien
        this.setState({
            listeLivres: newLivres,
            alertMessage : {
                message : "Suppression effectué !!!",
                type: "alert-danger"
            } 
        });
    };

    // fonction permettant d'ajouter un livre    
    handleAjoutLivre = (titre, auteur, nbPages) => {

        //1.- création d'un livre avec les mêmes valeur que les 'state'
        const newLivre = {
            id : this.state.lastIdLivre + 1, //on gener un Id unique
            titre : titre,
            auteur : auteur, 
            nbPages : nbPages
        };

        //2. - on va faire une vrai copie du tableau 'listeLivres' pour pouvoir
        // y faire des actions 
        const newListeLivres = [...this.state.listeLivres];

        //3. - Et on va rajouter le nouveu livre a la liste 
        newListeLivres.push(newLivre);

        //4.- On va mettre a jour les 'state' + "lastIdLivre "
        this.setState(oldState => {    
            return {                          //oldState = anciene valeure
                listeLivres : newListeLivres, 
                lastIdLivre : oldState.lastIdLivre + 1,
                alertMessage : {
                    message: "Ajout effectué !!!",
                    type: "alert-success"
                }
            }
        });

        // Appel de la nouvelle props qui va fermer le formulaire
        this.props.fermerAjoutLivre();
    };

    // fonction permettant la modification de livre choisi
    // Cette fonction va récupérer les nouvelles valeurs a modifier
    //et va faire le traitement: mise à jour de livre concerné
    handleModificationLivre = (id, titre, auteur, nbPages) => {
      
      //1.- On va récupérer la case du livre concerne par la modification
        const caseLivre = this.state.listeLivres.findIndex(el => {
          //on compare le livre que je suis en train de parcourir(el.id)
          //avec id qu'on a récupére en paramettre de fonction
            return el.id === id;
        });

      //2. On va générer un livre a partir des information de parametre de fonction
        const newLivre = {  //ce livre va contenir :
            id :id,
            titre : titre,
            auteur: auteur,
            nbPages : nbPages
        }
      //3. Copie du tableau pour réaliser des action (resper d'imutabilite ReactJS)
        const newListe = [...this.state.listeLivres];
      //4. Un fois que jai la nouvelle liste des livres je peux faire la modification
      //a la case doné
        newListe[caseLivre] = newLivre;

      //5. Un fois que notre tableau de livres contien la modification, on peut 
      //modifier les 'state' en lui envoyant le nouveau livre
        this.setState({
            listeLivres: newListe,
            idLivreAModifier : 0,     //on met aussi a jour
            alertMessage : {
                message: "Modification effectuée !!!",
                type: "alert-warning"
            }
        })
    }

    render() {
        return (
            <>
             {/*On test si message d'alert n'est pas vide, alors on l'affiche  */}
                {this.state.alertMessage && <Alert typeAlert = {this.state.alertMessage.type}>
                    {this.state.alertMessage.message}
                </Alert>}

                <table className='table text-center'>
                    <thead>
                        <tr className='table-dark'>
                            <th>Titre</th>
                            <th>Auteur</th>
                            <th>Nb des pages</th>
                            <th colSpan='2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                          //Partie permettan de lister/afficher nos livres en utilisant le composant "UnLivre"
                            this.state.listeLivres.map(livre => {

                                if(livre.id !== this.state.idLivreAModifier) {
                                    return (
                                        <tr key={livre.id}>
                                            <UnLivre
                                                titre = {livre.titre}
                                                auteur = {livre.auteur}
                                                nbPages = {livre.nbPages}
                                                suppression = {() => this.handleSupprimLivre(livre.id)}                          
                                                modification = {() => this.setState({idLivreAModifier: livre.id })}
                                            />                                  
                                        </tr>
                                    );
                                } else {  
                                    return (
                                        <tr key={livre.id}>
                                            <FormulaireModification
                                                id = {livre.id}          //on rajout le id du livre a modifier
                                                titre = {livre.titre}
                                                auteur = {livre.auteur}
                                                nbPages = {livre.nbPages}
                                                validationModification = {this.handleModificationLivre}
                                            />
                                        </tr>
                                    );    
                                }
                            })
                        }  
                    </tbody>
                </table>

                {/* On va transmettre l'information au 'formulaireAjout */}                
                {this.props.ajoutLivre && <FormulaireAjout validation = {this.handleAjoutLivre} />}
            </>
        );
    }
}

export default Livres;
