import React, { useEffect } from "react";

import "./style.css";

import { useFormik } from "formik";

import { Container, Card } from "react-bootstrap";

const validate = (values) => {
  const errors = {};

  if (!values.city) {
    errors.city = "Obrigatório";
  }

  return errors;
};

const name = localStorage.getItem('name');
const lastname = localStorage.getItem('lastname');
const email = localStorage.getItem('email');

const BookingUserData = ({ form, setCity }) => {

  const formik = useFormik({
    initialValues: {
      name: `${name}`,
      last_name: `${lastname}`,
      email: `${email}`,
      city: " ",
    },
    validate,
  });

  useEffect(() => {
    setCity({
      ...form,
      city: formik.values.city,
    });
  }, [formik.values.city]);

  return (
    <>
      <Container fluid className="booking_form_container">
        <form onSubmit={formik.handleSubmit} className="booking_form">
          <Card className="booking_form_card">
            <div className="booking_form_input-name">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder=""
                disabled
                value={formik.values.name}
              />
            </div>

            <div className="booking_form_input-lastname">
              <label htmlFor="last_name">Sobrenome</label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                placeholder=""
                disabled
                value={formik.values.last_name}
              />
            </div>

            <div className="booking_form_input-email">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder=""
                disabled
                value={formik.values.email}
              />
            </div>

            <div className="booking_form_input-city">
              <label htmlFor="city">Cidade</label>
              <input
                id="city"
                name="city"
                type="text"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
              />
              {formik.touched.city && formik.errors.city ? (
                <div className="error">{formik.errors.city}</div>
              ) : null}
            </div>
          </Card>
        </form>
      </Container>
    </>
  );
};

export default BookingUserData;