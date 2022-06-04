import React, {Component} from 'react';
import Bouton from "../../../components/Bouton/Bouton";

class ModificationLivre extends Component {
    state = {
        titreSaisi : "",    //this.props.titre,
        auteurSaisi : "",    //this.props.auteur,
        nbPagesSaisi : "",   //this.props.nbPages,
    }

    // fonction permettant de garder les valeur de 
    //depart dans le 'state'
    componentDidMount = () => {
       this.setState({
        titreSaisi : this.props.titre,
        auteurSaisi : this.props.auteur,
        nbPagesSaisi : this.props.nbPages, 
       })
    };

    // function permettant la validation de la
    // modification
    handleValidation = () => {
        this.props.validationModification(
            this.props.id,
            this.state.titreSaisi,
            this.state.auteurSaisi,
            this.state.nbPagesSaisi
        );
    };

    render() {
        return (
            <>
              {/* value = valeur qu'on va récupérer depuis les inputs  */}
                <td>
                    <input type="text" value={this.state.titreSaisi} className="form-control"
                        onChange={event => this.setState({titreSaisi:event.target.value})}                       
                    />                     
                </td>
                <td>
                    <input type="text" value={this.state.auteurSaisi} className="form-control"
                        onChange={event => this.setState({auteurSaisi:event.target.value})}
                    />                                      
                </td>
                <td>
                    <input type="number" value={this.state.nbPagesSaisi } className="form-control"
                        onChange={event => this.setState({nbPagesSaisi:event.target.value})}                           
                    />                                       
                </td>
                <td>
                    <Bouton typeBtn="btn-success" clic={this.handleValidation}>Valider</Bouton>      
                </td>                             
            </>            
        );
    }
}

export default ModificationLivre;