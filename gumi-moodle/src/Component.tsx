import React, {Component} from 'react';
import './App.css';
import 'w3-css/w3.css';


class Com extends Component{

    shouldComponentUpdate(): boolean{
        return true;
    }

    

    render(){
        return (
            <h1>hej</h1>
        );
    }
}

export default Com;