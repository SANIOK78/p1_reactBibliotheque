import React, { Component } from 'react';
import TitreH1 from './components/Titres/TitreH1';
import Bouton from './components/Bouton/Bouton';
import Livres from './containers/Livres/listeLivres';

class App extends Component {
  // boolean qui au debut ne sara 
  //pas sur ouverture de formulaire
  state = {
    ajoutLivre: false
  }
  
  // fonction permettant l'ajout d'un livre, au click
  handleClicAjoutLivre = () => {
    this.setState((oldState, props) => {
      return {ajoutLivre: !oldState.ajoutLivre}
    });
  };

  render() {
    return (
      <div className='container'>
        <TitreH1>Page listant les livres !!!</TitreH1>
        {/* Au moment d'envoyer le composant 'Livre" on va rajouter la propriéte 'ajoutLivre'
        qui va récupérer la valeur présante dans les state(line:8) */}
        {/* Une fois que le livre a été rajouté on va indiquer au composant "Livres" 
        de fermer le formulaire */}
        <Livres ajoutLivre={this.state.ajoutLivre} fermerAjoutLivre = {()=>
          this.setState({ajoutLivre: false})}
        />

        <Bouton typeBtn="btn-success" large="w-100" 
          clic={this.handleClicAjoutLivre} >
          {/* si le boolean est a false, on 'ajout' sinon 'fermer l'ajout' */}
          {!this.state.ajoutLivre ? "Ajouter un livre" : "Fermer  l'Ajout  d'un livre"}
        </Bouton>
       
      </div>
    );
  } 
}

export default App;

