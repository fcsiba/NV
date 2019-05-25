import {SketchField, Tools} from 'react-sketch'
import React, { Component } from 'react';
import {Card, CardImg,CardImgOverlay,CardTitle,CardBody,CardText} from 'reactstrap';
import '../App.css';
import htmlToImage from 'html-to-image';
import domtoimage from 'dom-to-image';
import download from 'downloadjs'
require("downloadjs")
class SketchComponent extends Component{
    
    constructor(props){
        super(props);
        this.state={
            tool:Tools.Rectangle,
            fill:"#0000FF",
            url:''
        }
        
    }
    changeTool(Shape,Fill){
        this.setState({tool:Shape,fill:Fill});
        
    }

    getImage(){
        domtoimage.toPng(document.getElementsByTagName('canvas')[0])
            .then(function (dataUrl) {
                download(dataUrl, 'semantic_map.png');
            });
    }
    render(){
        return(
                

                <div className='container'>
                    <div className='row'>
                        <div className='col-md-3'>
                            <button  type="button" className="btn btn-primary my-class" onClick={()=>{this.changeTool(Tools.Rectangle,'#0000ff')}}>Window</button>
                            <button  type="button" className="btn btn-danger my-class" onClick={()=>{this.changeTool(Tools.Rectangle,"#ff0000")}}>Door</button>
                            <button  type="button" className="btn btn-danger my-class" onClick={()=>{this.getImage()}}>Download Image</button>
                        </div>
                       
                        
                        <div className='col-md-6'>
                            <div id='Sketch'>
                            <SketchField  width ='400px'
                                        height='400px' 
                                        tool={this.state.tool}
                                        lineWidth={0}
                                        fillColor={this.state.fill}/> 
                            </div>
                        </div>
                        </div>
                        <div>
                            <img src={this.state.url}></img>
                        </div>
                    
                    
                </div>       
        );
    }
}

export default SketchComponent;