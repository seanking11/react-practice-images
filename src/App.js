import React, { Component } from 'react';
import Image from './Image.js';
import ImageModal from './ImageModal.js';
import './App.css';

// Holds all the descriptions in local storage. If it doesn't exist, create it.
const descriptions = (localStorage.getItem('descriptions') == null || localStorage.getItem('descriptions') == "") ? [] : JSON.parse(localStorage.getItem('descriptions'));

descriptions.push({
  id: 1,
  description: "Hello"
});

const url = 'https://jsonplaceholder.typicode.com/photos';

class App extends Component {
    constructor(props){
      super(props)
      this.state = {
        requestFailed: false,
        showModal: false,
        activeDescription: '',
        dataSlice: {}
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


    // Old plan - On click of an image, grab the ID of the current image, loop through the descriptions array (seperate)
    // to see if id's match. If it does, update the state with that description.
    // Cons - annoying to handle with current knowledge
    // Pros - small storage size

    // New plan - On click of image, grab the desc property (most likely undefined)
    // on close, add a desc prop to that object in the apiData array. Store that in local storage.
    // Cons - takes up more local storage
    // Pros - easier to handle


    // In local storage, have an object with keys being the id's and the values being the description
    open = (d) => {
      this.setState({
        showModal: true,
        activeImg: d.src,
        activeTitle: d.title,
        activeDescription: d.description == undefined ? '' : d.description,
        activeID: d.id
      });
      console.log(this.state);
    }

    // Set in local storage
    close = (d) => {
      console.log(d);
      this.setState({
        showModal: false
      });
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
              <Image thumbnailUrl={image.thumbnailUrl} key={image.id} id={image.id} onClick={() => this.open({src: image.url, title: image.title, desc: image.description, id: image.id})} />
            )}
          </div>
          <ImageModal show={this.state.showModal} close={this.close} onSave={this.onSave} activeDescription={this.state.activeDescription} activeImg={this.state.activeImg} activeTitle={this.state.activeTitle}></ImageModal>
        </div>
      )
    }
}

export default App;
