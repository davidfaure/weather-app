import React from 'react';
import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import './App.css';
import Card from '../components/Cards/Cards';
import Preview from '../components/Preview/Preview';
import WeatherDetail from '../components/WeatherDetail/WeatherDetail';
import TextField from '@material-ui/core/TextField';
import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Rubik',
      'sans-serif',
    ].join(','),
  },
});

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#F0C419',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#F0C419',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#F0C419',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#F0C419',
      },
    },
  },
})(TextField);

function App() {

  const [Loading, setLoading] = useState(false);
  const [Search, setSearch] = useState('');
  const [weather, setWeather] = useState({
    temperature: null,
    description: ''
  });

  useEffect(() => {
    handleClick();
  }, [Search]);

  const handleKeyDown = (e) => {
    if(e.keyCode === 13 && e.target.value !== ''){
      handleClick();
    }
  }

  const handleClick = () => {
    setLoading(true);
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const city = Search;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    axios.get(url)
    .then(response => response.data)
    .then(data => setWeather({
      temperature: data.main.temp,
      description: data.weather[0].main
    }), setLoading(false))
    .catch(error => console.log(error));
  }

  let cardContent = <Preview />;
  if (Loading) {
    cardContent = <ClipLoader />;
  } else if (weather.temperature && weather.description !== ''){
    cardContent = <WeatherDetail desc={weather.description} temp={weather.temperature} city={Search}/>
  }

  return (
    <div className="App">
      <h1>🌤 Weather App</h1>
      <div>
      <ThemeProvider theme={theme}>
        <CssTextField 
        label="City" 
        variant="outlined" 
        helperText="Search a city to see the weather"
        margin="dense"
        style={{ width: 300 }}
        onChange={event => setSearch(event.target.value)}
        onKeyDown={handleKeyDown}
        />
      </ThemeProvider>
      </div>
      <br />
      <br />
        <Card>
          {cardContent}
        </Card>
    </div>
  );
}

export default App;
