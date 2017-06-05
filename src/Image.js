import React, { Component } from 'react';
import './App.css';

const Image = (props) => (
  <div className="flex-item" onClick={props.onClick}>
    <img className="thumbnail" src={props.thumbnailUrl} />
  </div>
)

export default Image;
