import React, {Component} from 'react';
import UnLivre from './Bouquin/unLivres';
import FormulaireAjout from './FormulaireAjout/FormulaireAjout';


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
        idLivreAModifier : 0
    }

    // onction supprimant un livre
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
        this.setState({listeLivres: newLivres});

        console.log(newLivres);
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
                lastIdLivre : oldState.lastIdLivre + 1
            }
        });

        // Appel de la nouvelle props qui va fermer le formulaire
        this.props.fermerAjoutLivre();
    };


    render() {
        return (
            <>
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

                              {/* 1. Le Livre n'est pas a modifier */}
                              {/* si c'est pas le même id  */}
                                if(livre.id !== this.state.idLivreAModifier) {
                                    return (
                                        <tr key={livre.id}>
                                            <UnLivre
                                                titre = {livre.titre}
                                                auteur = {livre.auteur}
                                                nbPages = {livre.nbPages}
                                                suppression = {() => this.handleSupprimLivre(livre.id)}                          
                                                modification = {() => this.setState({idLivreAModifier : livre.id })}
                                            />                                  
                                        </tr>
                                    );
                                } else {   {/*Si l'id correspond a l7ID a modifier */}
                                    return null
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
