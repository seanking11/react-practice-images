import React, { Component } from 'react';
import './App.css';
import { Button, Modal, FormControl } from 'react-bootstrap';

//{this.props.activeTitle.length > 50 ? this.props.activeTitle.substring(0, 50) + "..." : this.props.activeTitle}

class ImageModal extends Component {

    render() {
      return (
        <div>
        <Modal show={this.props.show} onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.activeTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img className="img-responsive" src={this.props.activeImg} />
          </Modal.Body>
          <Modal.Footer>
            <div className="col-xs-9">
              <FormControl placeholder="Description" inputRef={ref => {this.input = ref;}}></FormControl>
            </div>
            <div className="col-xs-3">
              <Button onClick={() => this.props.close(this.input.value)}>Save & Close</Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
      )
    }
}

// How do I give the value of the <Button> within the onclick? this.props.close(theValueTypedInAbove)


export default ImageModal;
