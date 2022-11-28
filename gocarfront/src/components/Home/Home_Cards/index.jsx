import React, { useContext, useEffect } from "react";

import { Context } from "../../../Context/Context";

import { Link } from "react-router-dom";

import { eachDayOfInterval, isEqual } from "date-fns";
import { CardGroup } from "react-bootstrap";

function HomeCards({ search }) {
  const { products, productImages, productBookings } = useContext(Context);
  const ids = [43, 37, 31, 13, 25, 19, 7, 1];

  const images = productImages?.filter((url) => ids.includes(url.id));

  let product = products.map((cars) => {
    const names = cars.name.split(" ");
    const fotos = images.find((fotos) => fotos.title.includes(names[0]));
    return { ...cars, urlImage: fotos?.urlImage };
  });

  let dataescolhida = [];
  let produtoreservado = [];
  let carroEscolhido = [{}];

  useEffect(() => {
    if (search.checkin != "" && search.checkout != "") {
      dataescolhida = eachDayOfInterval({
        start: new Date(search.checkin),
        end: new Date(search.checkout)
      })
      console.log("dataescolhida :", dataescolhida)
    }

    for (let z = 0; z < dataescolhida.length; z++) {
      for (let i = 0; i < l.length; i++) {
        for (let j = 0; j < l[i]?.f?.length; j++) {
          if (isEqual(l[i].f[j], dataescolhida[z])) {
            produtoreservado.push(l[i].idProduct);
          }
        }
      }
    }

    console.log(produtoreservado)

    const car = products.map((car) => {

      for(let w = 0 ; w< produtoreservado.length ; w++){
          
        if(car.id != produtoreservado[w]){
           console.log("Esse carro pode :", w , car)
          }
    
      }
    })






    // for(let y = 0; y < produtoreservado.length; y++) {
    //   if(produtoreservado == product.id[y]) {
    //     carroEscolhido == product;
    //   }

    // }

    // console.log(carroEscolhido);
    //window.scrollTo(0, 900);

  }, [search]);

  console.log(products)

  const l = productBookings?.map((reservas) => {
    const f = eachDayOfInterval({
      start: new Date(reservas.initalDay),
      end: new Date(reservas.finalDay)
    })

    return { f, idProduct: reservas?.product?.id };
  });

  console.log(l);


  
// Ao final, descomentar a l
  
  return (
    <>
      <div id="galeria_carro" className="galeria_carro">
      {(search.checkin == "" && search.checkout == "") ? 
        (product?.map((car) => (
          <div key={images.id} className="card_main">
            <div className="card_image">
              {" "}
              <img src={car?.urlImage} alt="" />{" "}
            </div>
            <div className="card_description">
              <div className="card_title">
                {" "}
                <h3>{car?.name}</h3>{" "}
              </div>

              <div className="car_description">
                <h6>{car.category.qualification}</h6>
                <p>{car.description}</p>

                <div className="car_button">
                  <Link to={"/product/" + car.id} className="link_button">
                    <button className="button_car">Ver mais</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))) : (product?.map((car) => (
          <div key={images.id} className="card_main">
            <div className="card_image">
              {" "}
              <img src={car?.urlImage} alt="" />{" "}
            </div>
            <div className="card_description">
              <div className="card_title">
                {" "}
                <h3>{car?.name}</h3>{" "}
              </div>

              <div className="car_description">
                <h6>{car.category.qualification}</h6>
                <p>{car.description}</p>

                <div className="car_button">
                  <Link to={"/product/" + car.id} className="link_button">
                    <button className="button_car">Ver mais</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )))
        }
      </div>
    </>
  );
}

export default HomeCards;