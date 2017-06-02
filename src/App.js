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
      // Failed Response
      if (this.state.requestFailed) return <p>Failed</p>
      // Success Response
      if (!this.state.apiData) return <p>Loading...</p>
      return (
        <div>
          <img className="thumbnail" src={this.state.apiData[0].thumbnailUrl} />
          <h4>{this.state.apiData[0].title}</h4>
        </div>
      )
    }
}


export default App;
