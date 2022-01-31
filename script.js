const busca = document.querySelector(".busca");

busca.addEventListener("submit", async (e) => {
  e.preventDefault();
  let input = document.querySelector("#searchInput").value;
  
  if (input !== "") {
      clearInfo();
     showMsg('Carregando...')

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      input
    )}&appid=36dba993511bb6c65a566db0442a4614&units=metric&lang=pt_br`;
    let req = await fetch(url)
    let json = await req.json();
    
    if(json.cod === 200){
       return showInfo({
            name: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            windAngle: json.wind.deg

        })
    }
    else{
        clearInfo();
        showMsg('Cidade não encontrada...')
    }
   
  
  }else{
      clearInfo();
  }
});
function showInfo(json){
  showMsg('')
  let resultado = document.querySelector('.resultado')
 
  document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
  document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`
  document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`
  

 document.querySelector('.temp img').src = `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
 document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90})deg`
 resultado.style.display = 'block'
  


  

}
function showMsg(msg){
    let aviso = document.querySelector(".aviso")
    aviso.innerHTML = msg
}
function clearInfo(){
    showMsg('');
    let resultado = document.querySelector('.resultado')
    resultado.style.display = 'none'
}
