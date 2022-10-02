import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Covid.css";

const url = `https://api.covid19api.com/summary`;

function Corona() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myStyle, setMyStyle] = useState({
    color: "white",
    backgroundColor: "black",
  });

  const toggleStyle = () => {
    if (myStyle.color === "white") {
      setMyStyle({
        color: "black",
        backgroundColor: "white",
      });
    } else {
      setMyStyle({
        color: "white",
        backgroundColor: "black",
      });
    }
  };

  useEffect(() => {
    const fetchCountriesData = async () => {
      const response = await axios.get(url);
      setCountries(response.data.Countries);
      console.log(response.data.Countries);
      setLoading(false);
    };
    fetchCountriesData();
  }, []);

  return (
    <>
      <div className="body" style={myStyle}>
        {/* ==========heading============================ */}

        <h1 className="head">
          World Wide Data OF <span className="corona-text">CORONA</span> Cases
          (COUNTRY WISE)
        </h1>

        {/* ============================inputfield====================== */}

        <div className="input-text">
          <input type="text" placeholder="Enter Country Name" />
          <button className="submit">SEARCH</button>
          <button className="btn" onClick={toggleStyle}>
            Dark Mode
          </button>
        </div>

        {loading ? (
          <h1 className="load">Data Loading....</h1>
        ) : (
          <section className="card-main">
            {countries.map((country) => {
              const {
                ID,
                Country,
                CountryCode,
                NewConfirmed,
                NewDeaths,
                NewRecovered,
                TotalConfirmed,
                TotalDeaths,
                TotalRecovered,
              } = country;

              return (
                <div className="card-body">
                  <article key={ID} className="card" style={myStyle}>
                    <h2 className="heading">
                      COUNTRY :- {Country}, {CountryCode}
                    </h2>
                    <ul>
                      <li>
                        <span>NEW-CASE :</span>
                        {NewConfirmed}
                      </li>
                      <li>
                        <span>NEW-DEATHS :</span>
                        {NewDeaths}
                      </li>
                      <li>
                        <span>NEW-RECOVERED :</span>
                        {NewRecovered}
                      </li>
                      <li>
                        <span>TOTAL CONFIRMED :</span>
                        {TotalConfirmed}
                      </li>
                      <li>
                        <span>TOTAL DEATHS :</span>
                        {TotalDeaths}
                      </li>
                      <li>
                        <span>TOTAL RECOVERED :</span>
                        {TotalRecovered}
                      </li>
                    </ul>
                  </article>
                </div>
              );
            })}
          </section>
        )}
      </div>
    </>
  );
}

export default Corona;
