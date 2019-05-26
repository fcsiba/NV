import React, { Component } from 'react';
import {SketchField, Tools} from 'react-sketch';
import {Button} from 'reactstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import '../App.css';

class SemanticMap extends Component{
    constructor(props){
        super(props);
        this.facade_semantics={
            window:"#0075FF",
            window_sill: "#68F898",
            shutter: "#EEED28",
            balcony: "#B8FF38",
            door: "#A50000",
            window_head:"#1DFFDD",
            trim:"#FF9204",
            entrance:"#00C9FF",
            column: "#F60001",
            background: "#0006D9"
        };
        this.state={
            tool:Tools.Rectangle,
            fill:this.facade_semantics["window"],
            url:'',
            backgroundColor:this.facade_semantics["background"],
            drawings:[],
            //canvasImage:''
        };
        this.styles = {
            column_btn:{
                backgroundColor:this.facade_semantics["column"],
                border: '0px',
                margin: '5px',
                width: '120px',
                height:'42px',
            },
            entrance_btn:{
                backgroundColor:this.facade_semantics["entrance"],
                border: '0px',
                margin: '5px',
                width: '120px',
                height:'42px',
            },
            trim_btn:{
                backgroundColor:this.facade_semantics["trim"],
                border: '0px',
                margin: '5px',
                width: '120px',
                height:'42px',
            },
            window_head_btn:{
                backgroundColor:this.facade_semantics["window_head"],
                border: '0px',
                margin: '5px',
                width: '120px',
                height:'42px',
            },
            window_btn:{
                backgroundColor:this.facade_semantics["window"],
                border: '0px',
                margin: '5px',
                width: '120px',
                height:'42px',
            },
            shutter_btn:{
                backgroundColor:this.facade_semantics["shutter"],
                border: '0px',
                margin: '5px',
                width: '120px',
                height:'42px',
            },
            window_sill_btn:{
                backgroundColor:this.facade_semantics["window_sill"],
                border: '0px',
                margin: '5px',
                width: '120px',
                height:'42px',
            },
            balcony_btn:{
                backgroundColor:this.facade_semantics["balcony"],
                border: '0px',
                margin: '5px',
                width: '120px',
                height:'42px'
            },
            door_btn:{
                backgroundColor:this.facade_semantics["door"],
                border: '0px',
                margin: '5px',
                width: '120px',
                height:'42px',
            },
            background_btn:{
                backgroundColor:this.facade_semantics["background"],
                border: '0px',
                margin: '5px',
                width: '120px',
                height:'42px',
            },
            convert_btn:{
                verticalAlign: "middle",
                alignItems: 'center',
                display:'flex'
            },
            sketch:{
                cursor: 'crosshair',
            }
        }
        
    }
    
    changeTool(Shape,Fill){
        this.setState({tool:Shape,fill:this.facade_semantics[Fill]});
        
    }
    _convertInputImage=()=>{
        //this.setState({canvasImage:this._sketch.toDataURL("png")});
        this.props.convertInputFacade(this._sketch.toDataURL("jpg")
                                                .replace("data:image/png;base64,","")  );
    }
    
    _clear = () => {
        this._sketch.clear();
        this._sketch._backgroundColor(this.state.backgroundColor);
    };

    _upload=() =>{
        var file    = document.getElementById('facade_input').files[0];
        var reader  = new FileReader();
        var sk=this;
        reader.addEventListener("load", function () {
          sk._sketch.setBackgroundFromDataUrl(reader.result);
        }, false);
      
        if (file) {
          reader.readAsDataURL(file);
        }
      }
    //<button  type="button" className="btn btn-danger my-class" onClick={()=>{this.getImage()}}>Download Image</button>

    render(){
        return(
        <div className='container' >
                    <div className='row'>
                        <div className='col-md-3' >
                            <Button style={this.styles.window_btn} onClick={()=>{this.changeTool(Tools.Rectangle,'window')}}>Window</Button>                                        <Button   style={this.styles.window_sill_btn} onClick={()=>{this.changeTool(Tools.Rectangle,"window_sill")}}>Window Sill</Button>
                            <Button  style={this.styles.shutter_btn} onClick={()=>{this.changeTool(Tools.Rectangle,'shutter')}}>Shutter</Button>
                            <Button  style={this.styles.balcony_btn} onClick={()=>{this.changeTool(Tools.Rectangle,"balcony")}}>Balcony</Button>
                            <Button  style={this.styles.door_btn} onClick={()=>{this.changeTool(Tools.Rectangle,'door')}}>Door</Button>
                        </div>
                        <div className='col-md-3'>    
                            <Button  style={this.styles.background_btn} onClick={()=>{this.changeTool(Tools.Rectangle,"background")}}>Background</Button>
                            <Button  style={this.styles.column_btn} onClick={()=>{this.changeTool(Tools.Rectangle,"column")}}>Column</Button>
                            <Button  style={this.styles.trim_btn} onClick={()=>{this.changeTool(Tools.Rectangle,"trim")}}>Trim</Button>
                            <Button  style={this.styles.window_head_btn} onClick={()=>{this.changeTool(Tools.Rectangle,"window_head")}}>WindowHead</Button>
                            <Button  style={this.styles.entrance_btn} onClick={()=>{this.changeTool(Tools.Rectangle,"entrance")}}>Entrance</Button>
                            
                        </div>
                       
                        
                        <div className='col-md-5' id="sketch">
                            
                            <SketchField  width ='256px'
                                        height='256px' 
                                        tool={this.state.tool}
                                        lineWidth={0}
                                        backgroundColor={this.state.backgroundColor}
                                        fillColor={this.state.fill}
                                        ref={c=>{this._sketch=c}}
                                        />
                        
                            <IconButton
                                onClick={this._clear}>
                                <DeleteIcon/>
                            </IconButton>
                            
                            <input id="facade_input" type="file" onChange={this._upload}>
                            </input>
                        </div>
                        <div className="col-md-1" style={this.styles.convert_btn}>
                            <div>
                                <Button  onClick={this._convertInputImage}>Convert</Button>
                            </div>
                        </div>
                        </div>
        
                    
                </div> 
        );
    }
}

export default SemanticMap;