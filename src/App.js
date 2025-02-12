import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

export function App() {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [region, setRegion] = useState('Mecca');
  const [changeLocation, setChangeLocation] = useState(false);

  //Local Time
  function getDayName(date = new Date(), locale = 'en-US') {
    return date.toLocaleDateString(locale, { weekday: 'long' });
  }

  async function handleGetWeather() {
    setIsLoading(true);
    const options = {
      method: 'GET',
      url: `http://api.weatherapi.com/v1/current.json?q=${region}&aqi=no`,
      headers: {
        key: 'b4d344549f2140059e4125539230405',
        'Access-Control-Allow-Origin': '*',
      },
    };
    try {
      const response = await axios.request(options);
      console.log(response.data);
      const result = response.data;
      setWeather(result);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  function setCountry() {
    const options = {
      method: 'POST',
      url: `http://api.weatherapi.com/v1/current.json?q=${region}&aqi=no`,
      headers: {
        key: 'b4d344549f2140059e4125539230405',
        'Access-Control-Allow-Origin': '*',
      },
    };
    const response = axios
      .request(options)
      .then((response) => setWeather(response.data));
    console.log(response.data);
  }

  const handleChangeLocation = () => {
    setCountry();
    setChangeLocation(false);
  };
  useEffect(() => {
    handleGetWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading && <h3 style={{ textAlign: 'center' }}>Loading...</h3>}
      <div className='container'>
        {/* <h2 className='weather-template'>Mini Weather App</h2> */}
        {weather && (
          <>
            <div className='weather-blue-template'>
              <div className='location'>
                {' '}
                <ul>
                  <li>
                    <h3>{getDayName()}</h3>
                  </li>
                  <li>{weather.location.localtime}</li>

                  <li>
                    {weather.location.name}/{weather.location.country}
                  </li>
                </ul>
              </div>
              <div className='condition'>
                <ul>
                  <li>
                    <img
                      className='icon'
                      src={weather.current.condition.icon}
                      alt='icon'
                    />
                  </li>
                  <li>
                    {' '}
                    <h1>
                      {weather.current.temp_c} <sup>0</sup>C{' '}
                    </h1>
                  </li>
                  <li style={{ fontWeight: 'bolder' }}>
                    {' '}
                    {weather.current.condition.text}
                  </li>
                </ul>
              </div>
            </div>
            <div className='weather-black-template'>
              <ul>
                <li className='list-condition'>
                  <strong>HUMIDITY</strong> {weather.current.humidity}
                </li>
                <li className='list-condition'>
                  <strong>WIND_DIR</strong>
                  {weather.current.wind_dir}
                </li>
                <li className='list-condition'>
                  <strong>WIND</strong>
                  {weather.current.wind_kph}km/h
                </li>
                <li className='list-condition'>
                  <strong>CLOUD</strong>
                  {weather.current.cloud}
                </li>
              </ul>
              {changeLocation ? (
                <div className='form-div'>
                  <input
                    className='text-input'
                    type='text'
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  />
                  <button className='go-button' onClick={handleChangeLocation}>
                    go
                  </button>
                </div>
              ) : (
                ''
              )}
              <button
                className='change-location-btn'
                onClick={() => setChangeLocation(true)}
              >
                Change Location
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
