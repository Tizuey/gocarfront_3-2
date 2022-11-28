import React, { useContext } from "react";

import { Context } from "../../../Context/Context";

import "../Product_Modal/style.css";

import { useParams } from "react-router-dom";

import { Modal } from "react-bootstrap";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

function ProductModal(props) {
  const { products } = useContext(Context);
  const { id } = useParams();

  const selectedProduct = products?.find((product) => product?.id == id);

  const productImage = props.products.map((prodImages) => {
    return prodImages.urlImage;
  });

  const urlImage = productImage.map((imagesLib) => {
    return {
      original: imagesLib,
      thumbnail: imagesLib,
    };
  });

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="bg-white-transparent"
        data-focus="true"
      >
        <Modal.Header
          id="harmonyModal-header"
          closeButton
          className="boxModal bg-white "
        >
          <Modal.Title
            id="contained-modal-title-vcenter "
            className=" text-dark"
          >
            {selectedProduct?.name}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="boxModal bg-white bg-gradient-white text-light">
          <ImageGallery autoPlay="true" items={urlImage} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProductModal;