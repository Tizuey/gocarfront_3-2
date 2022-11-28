import React, { useContext } from "react";

import { Context } from "../../../Context/Context";

import { Link } from "react-router-dom";

function HomeCards() {
  const { products, productImages } = useContext(Context);
  const ids = [43, 37, 31, 13, 25, 19, 7, 1];
  const images = productImages?.filter((url) => ids.includes(url.id));

  let product = products.map((cars) => {
    const names = cars.name.split(" ");
    const fotos = images.find((fotos) => fotos.title.includes(names[0]));
    return { ...cars, urlImage: fotos?.urlImage };
  });

  return (
    <>
      <div className="galeria_carro">
        {" "}
        {product?.map((car) => (
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
        ))}
      </div>
    </>
  );
}

export default HomeCards;