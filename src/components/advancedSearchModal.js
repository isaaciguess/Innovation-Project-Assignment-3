import React from "react";
import { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalForm from "./modalForm";
import "../styles/predpagemid.css"; 

function AdvancedSearchModal({ errors, handleBlur, onInputChange, formData }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" className="btn-as-text" onClick={handleShow}>
        Advanced Prediction
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Advanced Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalForm errors={errors} handleBlur={handleBlur} onInputChange={onInputChange} formData={formData} />
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