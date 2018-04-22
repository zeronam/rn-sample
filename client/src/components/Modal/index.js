import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';

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
          <Modal.Header>
          <button type="button" className="close" onClick={(e) => this.onClose(e)}><span aria-hidden="true">×</span><span className="sr-only">Close</span></button>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>              
            {this.props.children}
          </Modal.Body>
          {/* <Modal.Footer>
            <Button onClick={(e) => this.onClose(e)}>Close</Button>
          </Modal.Footer> */}
        </Modal>
      )
    }
}

export default PopOver;