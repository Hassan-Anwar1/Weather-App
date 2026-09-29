async function getWeather(){

  const city = document.querySelector("#city").value;
  
  const API_key = "0110bdd0fa9b91072a9dabf260fefe1d";
  const Weather_API =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`;
  
  
  //Empty input check
  if(city === ""){
    alert("Please enter city name");
    return;
  }
  try{
  const response = await fetch(Weather_API);
  const data = await response.json();
  console.log(data);



  //response checking
  if(!response.ok){
    document.querySelector(".weather").innerHTML = `<p>City not found. Please try again!</p>`
  }
  
  document.querySelector(".weather").innerHTML = `

  <h3>${data.name}</h3>
  <p>Temperature: ${Math.round(data.main.temp)}°C</p>
  <p>Feels Like: ${Math.round(data.main.feels_like)}°C</p>
  <p>Humidity: ${data.main.humidity}%</p>
  <p>Clouds: ${data.clouds.all}%</p>
  <p>Wind Speed: ${data.wind.speed}km/h</p>


  <img src= "https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png">  

  <p>${data.weather[0].description}</p> `;
} 
catch(erro){
  console.error("Error:" , error);
  document.querySelector(".weather").innerHTML = `<p class = "error">Unable to connect. Please check your network connection!</p>`
}
}

document.querySelector("#search").addEventListener("click", getWeather);
document.querySelector("#city").addEventListener("keydown", (event)=>{
  if(event.key ==="Enter"){
    getWeather();
  }
});