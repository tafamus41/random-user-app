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
  const [addUser, setAddUser] = useState([]);

  const handleAddUser = () => {
    setAddUser([
      ...addUser,
      {
        name: people[0].name.first,
        email: people[0].email,
        phone: people[0].phone,
        age: people[0].dob.age,
      },
    ]);
  };

  const handleUserValue = (value) => setUserValue(value);

  const getBilgiler = async () => {
    const res = await axios.get(url);
    setPeople(res.data.results);
    setUserValue(
      `${res.data.results[0].name.title} ${res.data.results[0].name.first} ${res.data.results[0].name.last}`
    );
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
        {people.map(
          ({
            cell,
            email,
            location,
            name,
            phone,
            picture,
            gender,
            dob,
            login,
          }) => (
            <div key={cell} className="container">
              <img src={picture.large} alt="random user" className="user-img" />
              <p className="user-title">My is</p>
              <p className="user-value">{userValue}</p>
              <div className="values-list">
                <button
                  onMouseOver={() =>
                    handleUserValue(`${name.title} ${name.first} ${name.last}`)
                  }
                  className="icon"
                  data-label="name"
                >
                  <img
                    src={gender === "female" ? womanSvg : manSvg}
                    alt="user"
                    id="iconImg"
                  />
                </button>
                <button
                  className="icon"
                  data-label="email"
                  onMouseOver={() => handleUserValue(email)}
                >
                  <img src={mailSvg} alt="mail" id="iconImg" />
                </button>
                <button
                  onMouseOver={() => handleUserValue(dob.age)}
                  className="icon"
                  data-label="age"
                >
                  <img
                    src={gender === "female" ? womanAgeSvg : manAgeSvg}
                    alt="age"
                    id="iconImg"
                  />
                </button>
                <button
                  onMouseOver={() =>
                    handleUserValue(
                      `${location.street.number} ${location.street.name}`
                    )
                  }
                  className="icon"
                  data-label="street"
                >
                  <img src={mapSvg} alt="map" id="iconImg" />
                </button>
                <button
                  onMouseOver={() => handleUserValue(phone)}
                  className="icon"
                  data-label="phone"
                >
                  <img src={phoneSvg} alt="phone" id="iconImg" />
                </button>
                <button
                  onMouseOver={() => handleUserValue(login.password)}
                  className="icon"
                  data-label="password"
                >
                  <img src={padlockSvg} alt="lock" id="iconImg" />
                </button>
              </div>
              <div className="btn-group">
                <button className="btn" type="button" onClick={getBilgiler}>
                  new user
                </button>
                <button className="btn" type="button" onClick={handleAddUser}>
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
                  {addUser.map((item, i) => (
                    <tr key={i} className="body-tr">
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.age}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}

export default App;
