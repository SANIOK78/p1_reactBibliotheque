import React, {Component} from 'react';
import Bouton from '../../components/Bouton/Bouton';

class Livres extends Component {
    state = {
        listeLivres: [
            {id:1, titre:"Bouquin N1", auteur: "Auteur N1", nbPages: "200"},
            {id:2, titre:"Bouquin N2", auteur: "Auteur N2", nbPages: "10"},
            {id:3, titre:"Bouquin N3", auteur: "Auteur N3", nbPages: "110"},
            {id:4, titre:"Bouquin N4", auteur: "Auteur N4", nbPages: "80"},
        ]
    }
    render() {
        return (
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
                        this.state.listeLivres.map(livre => {
                            return (
                                <tr key={livre.id}>
                                    <td>{livre.titre}</td>
                                    <td>{livre.auteur}</td>
                                    <td>{livre.nbPages}</td>
                                    <td>
                                        <Bouton typeBtn="btn-warning" clic={() => console.log("Modifier !!!")}>Modifier</Bouton>      
                                    </td>
                                    <td>
                                        <Bouton typeBtn="btn-danger" clic={() => console.log("Supprimer !!!")}>Supprimer</Bouton>
                                    </td>
                                </tr>
                            )
                        })
                    }  
                </tbody>
            </table>
         
        );
    }
}

export default Livres;
