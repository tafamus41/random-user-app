import React, { useEffect, useState } from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";
import axios from "axios";

const url = "https://randomuser.me/api/";

function App() {
  const [people, setPeople] = useState([]);
  const [userValue, setUserValue] = useState("");

  const handleUserValue = (value) => setUserValue(value);

  const getBilgiler = async () => {
    const res = await axios.get(url);
    setPeople(res.data.results);
    setUserValue(`${res.data.results[0].name.first} ${res.data.results[0].name.last}`); 
  };

  useEffect(() => {
    getBilgiler();
  }, []);

  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        {people.map(({ cell, email, location, name, phone, registered, picture, login, gender, dob }) => (
          <div key={cell} className="container">
            <img src={picture.large} alt="random user" className="user-img" />
            <p className="user-title">My ... is</p>
            <p className="user-value">{userValue}</p>
            <div className="values-list">
              <button
                className="icon"
                onMouseOver={() => handleUserValue(`${name.first} ${name.last}`)}
                data-label="name"
              >
                <img src={gender === "female" ? womanSvg : manSvg} alt="user" />
              </button>
              <button
                className="icon"
                onMouseOver={() => handleUserValue(email)}
                data-label="email"
              >
                <img src={mailSvg} alt="mail" />
              </button>
              <button
                className="icon"
                onMouseOver={() => handleUserValue(dob.age)}
                data-label="age"
              >
                <img src={gender === "female" ? womanAgeSvg : manAgeSvg} alt="age" />
              </button>
              <button
                className="icon"
                onMouseOver={() => handleUserValue(`${location.street.number} ${location.street.name}`)}
                data-label="street"
              >
                <img src={mapSvg} alt="map" />
              </button>
              <button
                className="icon"
                onMouseOver={() => handleUserValue(phone)}
                data-label="phone"
              >
                <img src={phoneSvg} alt="phone" />
              </button>
              <button
                className="icon"
                onMouseOver={() => handleUserValue(login.password)}
                data-label="password"
              >
                <img src={padlockSvg} alt="lock" />
              </button>
            </div>
            <div className="btn-group">
              <button className="btn" type="button" onClick={getBilgiler}>
                new user
              </button>
              <button className="btn" type="button">
                add user
              </button>
            </div>

            <table className="table">
              <thead>
                <tr className="head-tr">
                  <th className="th">Firstname</th>
                  <th className="th">Email</th>
                  <th className="th">Phone</th>
                  <th className="th">Age</th>
                </tr>
              </thead>
              <tbody>
                <tr className="body-tr">
                  <td>{name.first}</td>
                  <td>{email}</td>
                  <td>{phone}</td>
                  <td>{dob.age}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}

export default App;
