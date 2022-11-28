import React, { useState, useEffect } from "react";

import BookingUserData from "../Booking_UserData";
import BookingDetails from "../Booking_Details";
import BookingCalendar from "../Booking_Calendar";
import BookingTimeBlock from "../Booking_TimeBlock";

import { useParams } from "react-router-dom";

import { Container } from "react-bootstrap";

function BookingForm({ products }) {
  const userID = localStorage.getItem("userID");

  const { id } = useParams();

  const [form, setForm] = useState({
    city: "",
    checkin: "",
    checkout: "",
    time: "",
  });

  function submit() {
    console.log("Chamada da função");
    if (
      form.city == "" ||
      form.checkin == "" ||
      form.checkout == "" ||
      form.time == ""
    ) {
      alert("Preencha todos os dados...");
    } else {
      fetch(`http://54.159.110.183:8081/bookings`, {
        method: "POST",
        headers: {
          Accept: "*/* , application/json, text/plain ",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          initialTime: form.time,
          initalDay: form.checkin,
          finalDay: form.checkout,
          product: {
            id: `${id}`
          },
          user: {
            id: `${userID}`
          }

        }),
      }).then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
          alert("Error de reserva");
        } else {
          setTimeout(() => {
            (window.location.href = "/reserve-done");
          }, 0);
        }
      });
    }
  }

  const [isMobile, setIsMobile] = useState(false);

  //Mudança de estado de acordo com o tamanho da tela
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1025px)");
    const listener = () => setIsMobile(media.matches);
    listener();
    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [isMobile]);

  return (
    <>
      {isMobile ? (
        <Container fluid className="booking_container">
          <div className="booking_form_title">
            <h1>Complete seus dados</h1>
          </div>

          <BookingUserData form={form} setCity={setForm} />
          <BookingDetails
            product={products}
            form={form}
            setDate={setForm}
            submit={submit}
          />
          <BookingCalendar />
          <BookingTimeBlock form={form} setTime={setForm} />
        </Container>
      ) : (
        <Container fluid className="booking_container">
          <div className="booking_form_title">
            <h1>Complete seus dados</h1>
          </div>

          <BookingUserData form={form} setCity={setForm} />

          <BookingCalendar />

          <BookingTimeBlock form={form} setTime={setForm} />

          <BookingDetails
            product={products}
            form={form}
            setDate={setForm}
            submit={submit}
          />
        </Container>
      )}
    </>
  );
}

export default BookingForm;