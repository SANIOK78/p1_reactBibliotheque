import React from "react";

const alert = (props) => { 
    // alerte bootstrap ave un design specifique
    const mesClassesCss = `alert ${props.typeAlert}`
    
    return <div class={mesClassesCss} role="alert">
                {props.children}
            </div>   
};

export default alert;