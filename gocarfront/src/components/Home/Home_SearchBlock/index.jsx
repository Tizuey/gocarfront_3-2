import React, { useContext, useState, useEffect } from "react";

import { Context } from "../../../Context/Context";

import Calendar from "../../Calendar";

import { format } from "date-fns";

import { Container } from "react-bootstrap";

import { CalendarPlus, ArrowCircleUp } from "phosphor-react";

function HomeSearchBlock({ search, setSearch }) {
  const { calendar } = useContext(Context);

  const [expand, setExpand] = useState(false);
  function showCalendar() {
    setExpand(!expand);
  }

  let initialDay = calendar.map((initialDay) => { return format(initialDay.startDate, "MM/dd/yyyy") });
  let finalDay = calendar.map((finalDay) => { return format(finalDay.endDate, "MM/dd/yyyy") });

  initialDay = initialDay[0];
  finalDay = finalDay[0];

  return (
    <div className="second_header">
      <h2>Faça sua reserva</h2>

      <div className="options">
        <div className="input_flex">
          <label htmlFor="city_name">Cidade</label>
          <input
            type="text"
            list="cities"
            className="city_name"
            placeholder="Cidade"
            onChange={(e) => setSearch({
              ...search,
              city: e.target.value,
            })
            }
          />
          <datalist id="cities">
            <option value="Sorocaba" id="1">Sorocaba</option>
            <option value="Campinas" id="2">Campinas</option>
            <option value="São Paulo" id="3">São Paulo</option>
            <option value="Recife" id="4">Recife</option>
            <option value="Salvador" id="5">Salvador</option>
          </datalist>
        </div>

        <div className="input_flex">
          <div className="selecione">Selecione</div>
          <button className="date" onClick={showCalendar}>
            {" "}
            Check-in / Check-out <CalendarPlus size={30} color="#F55E00" />{" "}
          </button>
        </div>

        <div className="input_flex">
          <br />
          <button
            className="btn_header"
            onClick={() => setSearch({
              ...search,
              checkin: initialDay,
              checkout: finalDay,
              })
            }
          >
            <a href="#galeria_carro">Buscar</a>
            
          </button>
        </div>
      </div>

      <Container fluid className={`box ${expand ? "showcalendar" : "hiden"}`}>
        <div className="seta" onClick={showCalendar}>
          <ArrowCircleUp size={45} />
        </div>
        <Calendar />
      </Container>
    </div>
  );
}

export default HomeSearchBlock;