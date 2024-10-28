import React from "react";
import { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalForm from "./modalForm";
function AdvancedSearchModal({onInputChange, formData}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Advanced Search
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ModalForm  onInputChange={onInputChange} formData={formData}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Add To Prediction
            </Button>
          </Modal.Footer>
        </Modal>
      </>
  );
}

export default AdvancedSearchModal;