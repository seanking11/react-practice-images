import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Image extends Component {
    constructor(props){
      super(props)
      this.state = {
        image: this.props.item,
        index: this.props.index
      }
    }

    componentDidMount(){

    }

    render() {
      return (
        <div className="flex-item" onClick={() => console.log(this.state.key)}>
          <img className="thumbnail" src={this.state.image.thumbnailUrl} />
        </div>
      )
    }
}

// Notes for Sean: index is undefined - fix it.


export default Image;
