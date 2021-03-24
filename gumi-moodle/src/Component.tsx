import React, {Component} from 'react';
import './App.css';


class Com extends Component{

    shouldComponentUpdate(): boolean{
        return true;
    }

    

    render(){
        return (
          <div>Hello</div>
        );
    }
}

export default Com;