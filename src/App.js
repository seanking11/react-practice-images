import React, { Component } from 'react';
import logo from './logo.svg';
import Image from './Image.js';
import './App.css';

const url = 'https://jsonplaceholder.typicode.com/photos';

class App extends Component {
    constructor(props){
      super(props)
      this.state = {
        requestFailed: false
      }
    }



    componentDidMount(){
      const qtyOfResponses = 25; // Amount of images pulled from the API
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw Error("Network request failed")
          }

          return response;
        })
        .then(d => d.json())
        .then(d => {

          const dataSlice = d.slice(0, qtyOfResponses);
          this.setState({
            apiData: dataSlice
          })
        }, () => {
          this.setState({
            requestFailed: true
          })
        })
    }

    render() {
      // Failed Response
      if (this.state.requestFailed) return <p>Failed</p>
      // Success Response
      if (!this.state.apiData) return <p>Loading...</p>
      return (
        <div className="container">
          <div className="flex-container">
            {this.state.apiData.map((image, index) =>
              <Image item={image} key={index} index={index}/>
            )}
          </div>
        </div>
      )
    }
}


export default App;
