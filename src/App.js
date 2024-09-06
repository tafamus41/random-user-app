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
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [people, setPeople] = useState([]);
  const [userValue, setUserValue] = useState("")
  // console.log(people[0].name.title);
  const handleUserValue=(e)=>setUserValue(e.target.value)
 
  // console.log(people.name);
  const getBilgiler = async () => {
    const res = await axios.get(url);
    // console.log(res.data.results);
    setPeople(res.data.results);
  };
  //

  useEffect(() => {
    getBilgiler();
  }, []);

  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        {people.map(({cell,email,location,name,phone,registered,picture,login,gender}) => (
          <div key={cell} className="container">
            <img src={picture.large} alt="random user" className="user-img" />
            <p className="user-title">My name is</p>
            <p className="user-value">{userValue}</p>
            <div className="values-list">
              <button  className="icon" data-label="name" >
                <img src={gender==="female" ? womanSvg:manSvg} alt="user" id="iconImg" />
              </button>
              <button onMouseOver={(e)=>handleUserValue(e)} className="icon" data-label="email" value={email}>
                <img src={mailSvg} alt="mail" id="iconImg" />
              </button>
              <button className="icon" data-label="age">
                <img src={gender==="female" ? womanAgeSvg:manAgeSvg} alt="age" id="iconImg" />
              </button>
              <button className="icon" data-label="street">
                <img src={mapSvg} alt="map" id="iconImg" />
              </button>
              <button className="icon" data-label="phone">
                <img src={phoneSvg} alt="phone" id="iconImg" />
              </button>
              <button className="icon" data-label="password">
                <img src={padlockSvg} alt="lock" id="iconImg" />
              </button>
            </div>
            <div className="btn-group">
              <button className="btn" type="button">
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
                <tr className="body-tr"></tr>
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
