import React, { useContext, useEffect } from "react";

import { Context } from "../../../Context/Context";

import "./style.css";

import { useParams } from "react-router-dom";

import { format } from "date-fns";

import { Container, Card } from "react-bootstrap";

import { MapPin } from "phosphor-react";

function BookingDetails({ product, form, setDate, submit }) {
  const { calendar, products, productImages } = useContext(Context);
  const ids = [43, 37, 31, 13, 25, 19, 7, 1];

  const { id } = useParams();

  const images = productImages?.filter((url) => ids.includes(url.id));

  let selectedProduct = products.map((cars) => {
    const names = cars.name.split(" ");
    const fotos = images.find((fotos) => fotos.title.includes(names[0]));
    return { ...cars, urlImage: fotos?.urlImage };
  });

  const index = id - 1;
  const selectedImage = selectedProduct?.map((product) => {
    if (product.id == id) {
      return product.urlImage;
    }
  });

  // Para visualização do usuário
  const startDate = calendar?.map((date) => {
    return format(date?.startDate, "dd/MM/yyyy");
  });

  const endDate = calendar?.map((date) => {
    return format(date.endDate, "dd/MM/yyyy");
  });

  const newFormatStartDate = startDate[0];
  const newFormatEndDate = endDate[0];

  // Para lançar no api
  const initalDay = calendar?.map((date) => {
    return format(date.startDate, "MM/dd/yyyy");
  });

  const finalDay = calendar?.map((date) => {
    return format(date.endDate, "MM/dd/yyyy");
  });

  const formatApiInitalDay = initalDay[0];
  const formatApiFinalDay = finalDay[0];

  useEffect(() => {
    setDate({
      ...form,
      checkin: formatApiInitalDay,
      checkout: formatApiFinalDay,
    });
  }, [newFormatStartDate, newFormatEndDate]);

  return (
    <>
      <Container fluid className="booking_details_container">
        <Card className="booking_details_card">
          <div className="booking_details_card_title">
            <h1>Detalhe da reserva</h1>
          </div>

          <div className="booking_details_card_image">

            <img
              src={selectedImage[index]}
              alt=""
            />

          </div>

          <Container fluid className="booking_details_info_container">
            <div className="booking_details_info-product">
              <h4 className="booking_details_info_title-category">
                {product?.category?.qualification}
              </h4>
              <h2 className="booking_details_info_title-product">
                {product?.name}
              </h2>
            </div>

            <div className="booking_details_info-location">
              <h5 className="booking_details_info_title-location">
                <MapPin size={24} /> {product?.city?.name},{" "}
                {product?.city?.country}
              </h5>
            </div>

            <Container fluid className="booking_details_info-check">
              <div className="booking_details_info-checkin">
                <h4>Check in</h4>
                <h4>{startDate}</h4>
              </div>

              <div className="booking_details_info-line"></div>

              <div className="booking_details_info-checkout">
                <h4>Check out</h4>
                <h4>{endDate}</h4>
              </div>

              <button
                className="booking_details_info-button"
                onClick={() => {
                  submit();
                }}
              >
                Confirmar reserva
              </button>
            </Container>
          </Container>
        </Card>
      </Container>
    </>
  );
}

export default BookingDetails;