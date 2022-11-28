import React, { useState } from "react";

import HomeSearchBlock from "../components/Home/Home_SearchBlock";
import HomeCategories from "../components/Home/Home_Categories";
import HomeCards from "../components/Home/Home_Cards";

import "../styles/Home.css";

import { format, eachDayOfInterval } from "date-fns";

function Home() {
  const [search, setSearch] = useState({
    city: "",
    checkin: "",
    checkout: "",
  });

  return (
    <>
      <main>
        <div className="body">
          <HomeSearchBlock search={search} setSearch={setSearch}/>

          <section>
            <HomeCategories />
          </section>

          <section className="recomendacoes">
            <h2 className="recomendations_title">Recomendações</h2>
            <div className="recomendations">
              <HomeCards search={search} />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default Home;