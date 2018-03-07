import React, { Component } from 'react';
import {Button, Modal} from 'react-bootstrap';

class PopOver extends Component {

    onClose() {
      this.props.onClose();
    }
    render(){
      if(!this.props.show){
        return null;
      }
      return (
          <Modal show={this.props.show}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>              
            {this.props.children}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={(e) => this.onClose(e)}>Close</Button>
          </Modal.Footer>
        </Modal>
      )
    }
}

export default PopOver;