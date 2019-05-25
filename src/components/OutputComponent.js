import React, { Component } from 'react';
import '../App.css';

class Output extends Component {
    constructor(props){
        super(props);
        this.state={
            
        };
    }

    
    render() {
        return (
            <div>
                <img alt="generated image" id="output" src={this.props.output_image}></img>
            </div>
            
        
        );
    }
}

export default Output;