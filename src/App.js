import React, { Component } from 'react';
import logo from './logo.svg';
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
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw Error("Network request failed")
          }

          return response;
        })
        .then(d => d.json())
        .then(d => {
          console.log(d);
          this.setState({
            apiData: d
          })
        }, () => {
          this.setState({
            requestFailed: true
          })
        })
    }


    render() {
      const size = 25; // Amount of images pulled from the API

      // Failed Response
      if (this.state.requestFailed) return <p>Failed</p>
      // Success Response
      if (!this.state.apiData) return <p>Loading...</p>
      return (
        <div className="flex-container">
          {this.state.apiData.slice(0, size).map((image, index) =>
            <div className="flex-item">
              <img className="thumbnail" src={image.thumbnailUrl} />
              
            </div>
          )}
        </div>
      )
    }
}


export default App;
