import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ProductFormCreate from './ProductForm_Create';
import "./ProductCreate.css";

function ProductModalCreate() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="test12">
      <button onClick={() => setShowModal(true)} className="createProductBtn">Create Product</button>
      {showModal && (
        <Modal className="modalProduct" onClose={() => setShowModal(false)}>
          <ProductFormCreate setShowModal={setShowModal}/>
        </Modal>
      )}
    </div>
  );
}

export default ProductModalCreate;
