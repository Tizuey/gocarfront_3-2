import React, { useContext, useEffect } from "react";

import { Context } from "../Context/Context";

import HeaderInfoProduct from "../components/Headers/Header_InfoProduct";
import BookingForm from "../components/Booking/Booking_Form";
import Policies from "../components/Policies";

import "../styles/Booking.css";

import { useParams } from "react-router-dom";

import { Container } from "react-bootstrap";

function Booking() {
  const { products } = useContext(Context);
  const { id } = useParams();
  
  const selectedProduct = products?.find((product) => product?.id == id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeaderInfoProduct products={selectedProduct} />

      <BookingForm products={selectedProduct} />

      <Policies />
    </>
  );
}

export default Booking;