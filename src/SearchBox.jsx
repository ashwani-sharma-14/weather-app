import "./SearchBox.css";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
export default function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);
  const URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "2650c6ef692d3ed9d089a29883960aac";

  let getWeatherInfo = async () => {
    try {
      let response = await fetch(
        `${URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      let jsonResponse = await response.json();
      console.log(jsonResponse);

      let result = {
        city: city,
        temp: jsonResponse.main.temp,
        tempMax: jsonResponse.main.temp_max,
        tempMin: jsonResponse.main.temp_min,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
      };
      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  };

  let handelChange = (event) => {
    setCity(event.target.value);
  };

  let handelSubmit = async (event) => {
    try{
      event.preventDefault();
    console.log(city);
    setCity("");
    let newInfo = await getWeatherInfo();
    updateInfo(newInfo);
  }catch(err){
    setError(true)
  }
  }

    
  return (
    <div className="SearchBox">
      <form action="" onSubmit={handelSubmit}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handelChange}
        />
        <br />
        <br />
        <Button variant="contained" type="submit">
          Search
        </Button>
        {error && <p>No Such place exits</p>}
      </form>
    </div>
  );
}
