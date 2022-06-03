import React, { Component } from 'react';
import TitreH1 from './components/Titres/TitreH1';
import Bouton from './components/Bouton/Bouton';
import Livres from './containers/Livres/listeLivres';

class App extends Component {
  render() {
    return (
      <div className='container'>

        <TitreH1>Page listant les livres !!!</TitreH1>
        <Livres />
        <Bouton typeBtn="btn-success" large="w-100" 
          clic={() => console.log("Ajoutez !!!")} >Ajouter
        </Bouton>
       
      </div>
    );
  } 
}

export default App;

