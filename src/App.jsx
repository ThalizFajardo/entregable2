import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";



function App() {
  const [data, setData] = useState({});
  const [temp, setTemp] = useState(true)
  const [units, setUnits] = useState("°F")

  //obtener fecha y hora 
  let date = new Date();
  let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
  let hora = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  ////////////////////////////////////////////////////////

/////////////////////////////////////////convertir unidads de temperatura//////////////////////////////
  const Convert = () => {
    if (units === "°F") {
      setTemp((temp - 32) / 1.8)
      setUnits("°C")
    } else {
      setTemp((temp * 1.8) + 32)
      setUnits("°F")
    }
  }

  //peticion a http con use effect
  useEffect(() => {
    const success = pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=99c5b4521134966e5c2d3bf620bdd0ba`)

        .then(res => {
          setData(res.data)
          setTemp(res.data.main?.temp)

        })
    }
    navigator.geolocation.getCurrentPosition(success);
  }, [])


  console.log(data)
  ///////////////////////////////////////////////////////////////////////////////////////////  
  return (
    <div className="app">
      <div className="card">
        <h1>Weather App</h1>
        <h2>{data.name} , {data.sys?.country}</h2>
        <p style={{color:"#bfc0c0"}}>{output}</p>
        <p style={{color:"#bfc0c0"}}>{hora}</p>
        <img src={`http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`} />
        <p><b>Pressure:</b>{data.main?.pressure} hPa</p>
        <p className="humidity"><b>Humidity:</b> {data.main?.humidity} %</p>
        <p className="wind"><b>Wind speed: </b>{data.wind?.speed} m/s</p>
        <p ><b>Temp:</b>{temp} {units}</p>
        <button onClick={Convert} >degrees °F / °C</button>
      </div>
    </div>
  );
};

export default App;

