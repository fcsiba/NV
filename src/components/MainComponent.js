import React, { Component } from 'react';
import axios from 'axios';
import SemanticMap from './SemanticMapComponent';
import Output from './OutputComponent'
import Mapify from './MapComponent'
import {Navbar} from 'reactstrap'
import logo from './logo.png'
import '../App.css';
class Main extends Component {
    constructor(props){
        super(props);
        this.state={
            inputFacade:'',
            outputFacade:'',
            inputMap:'',
            outputMap:'',
            component:''
        };
        //this._setinputFacade=this._setinputFacade.bind(this);
    }

    _convertInputFacade= (in_image)=> {
        this.setState({inputFacade:in_image})
        axios.post('http://localhost:5000/generate',{
            image: in_image
        },{
            headers:{'Content-type':'application/x-www-form-urlencoded'}
        })
        .then((res)=>{
            console.log(res)
            this.setState({outputFacade:"data:image/jpeg;base64,"+res.data.generation})
            console.log(res.generation)

        });
       
    }
    _convertInputMap= (in_image)=> {
        this.setState({inputMap:in_image})
        axios.post('http://localhost:5000/mapify',{
            image: in_image
        },{
            headers:{'Content-type':'application/x-www-form-urlencoded'}
        })
        .then((res)=>{
            console.log(res)
            this.setState({outputMap:"data:image/jpeg;base64,"+res.data.generation})
            console.log(res.generation)

        });
       
    }

    render() {
        return (
            <div className="container text_align">
                
                
                <h2>Facade Semantic Maps to Realistic Image</h2>
                <div className="row">
                    <div className='col-md-8'>
                    <SemanticMap convertInputFacade={this._convertInputFacade} />
                    </div>
                    <div className='col-md-4'>
                    <Output output_image={this.state.outputFacade}/>
                    </div>
                </div>
                <h2>Maps to Realistic Image</h2>

                <div className="row">
                    <div className='col-md-7'>
                    <Mapify convertInputMap={this._convertInputMap} />
                    </div>
                    <div className='col-md-5'>
                    <Output output_image={this.state.outputMap}/>
                    </div>
                </div>
            </div>
            
        
        );
    }
}

export default Main;