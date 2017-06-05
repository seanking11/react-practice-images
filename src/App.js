import React, { Component } from 'react';
import Image from './Image.js';
import ImageModal from './ImageModal.js';
import './App.css';

const url = 'https://jsonplaceholder.typicode.com/photos';

class App extends Component {
    constructor(props){
      super(props)
      this.state = {
        requestFailed: false,
        showModal: false,
        activeImg: ''
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
          console.log(dataSlice);
          this.setState({
            apiData: dataSlice
          })
        }, () => {
          this.setState({
            requestFailed: true
          })
        })
    }

    open = (d) => {
      this.setState({
        showModal: true,
        activeImg: d.src,
        activeTitle: d.title
      });

      console.log(this.state);
    }

    close = () => {
      this.setState({showModal: false});
    }

    render() {
      // Failed Response
      if (this.state.requestFailed) return <p>Failed</p>
      // Success Response
      if (!this.state.apiData) return <p>Loading...</p>
      return (
        <div className="container">
          <div className="flex-container">
            {this.state.apiData.map((image) =>
              <Image thumbnailUrl={image.thumbnailUrl} key={image.id} id={image.id} onClick={() => this.open({src: image.url, title: image.title})} />
            )}
          </div>
          <ImageModal show={this.state.showModal} close={this.close} activeImg={this.state.activeImg} activeTitle={this.state.activeTitle}></ImageModal>
        </div>
      )
    }
}

export default App;
