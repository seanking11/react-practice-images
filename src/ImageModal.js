import React, { Component } from 'react';
import './App.css';
import { Button, Modal, FormControl } from 'react-bootstrap';

const ImageModal = (props) => (
  <div>
    <Modal show={props.show} onHide={() => props.close(this.input.value)}>
      <Modal.Header closeButton>
        <Modal.Title>{props.activeTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img className="img-responsive" src={props.activeImg} />
      </Modal.Body>
      <Modal.Footer>
        <h5 className="description-header">Description</h5>
        <div className="description-form">
          <FormControl placeholder="Add a description" inputRef={ref => {this.input = ref;}} defaultValue={props.activeDescription} />
        </div>
        <div>
          <Button className="modal-close-btn" onClick={() => props.close(this.input.value)}>Close</Button>
        </div>
      </Modal.Footer>
    </Modal>
  </div>
)

export default ImageModal;
