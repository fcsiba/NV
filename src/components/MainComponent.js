import React, { Component } from 'react';
import axios from 'axios';
import SemanticMap from './SemanticMapComponent';
import Output from './OutputComponent'
import '../App.css';

class Main extends Component {
    constructor(props){
        super(props);
        this.state={
            inputImage:'',
            convertedImage:''
        };
        //this._setInputImage=this._setInputImage.bind(this);
    }

    _convertInputImage= (in_image)=> {
        this.setState({inputImage:in_image})
        axios.post('http://localhost:5000/generate',{
            image: in_image
        },{
            headers:{'Content-type':'application/x-www-form-urlencoded'}
        })
        .then((res)=>{
            console.log(res)
            this.setState({convertedImage:"data:image/jpeg;base64,"+res.data.generation})
            console.log(res.generation)

        });
       
    }
    render() {
        return (
            <div className="container text_align">
                <div className="row">
                <div className='col-md-8'>
                    <SemanticMap convertInputImage={this._convertInputImage} />
                    </div>
                    <div className='col-md-4'>
                    <Output output_image={this.state.convertedImage}/>
                    </div>
                </div>
                
            </div>
            
        
        );
    }
}

export default Main;