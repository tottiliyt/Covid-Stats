document.addEventListener("DOMContentLoaded", (_event) => {
  
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetchCountriesFromAPI('https://restcountries.eu/rest/v2/all');

  //fecth countries list
  function fetchCountriesFromAPI(url){
    fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => populateNameSelector('countires',data))
  }
  
  //update countries list
  function populateNameSelector(selectElmId, data) {
    const select = document.getElementById(selectElmId);
    select.innerHTML = "";
    let item = null;
    for (let i = 0; i < data.length; i++) {
      item = document.createElement("option");
      item.value = data[i]["alpha2Code"];
      if(item.value==="US"){
          item.selected="selected";
      }
      item.innerText = data[i]["name"];
      select.appendChild(item);
    }
  }

  //fetch flag picture and update
  function changeFlag(){
    const code = document.getElementById('countires').value;
    const srcWebsite = "https://www.countryflags.io/"+code+"/flat/24.png"
    const confirmedImg = document.getElementById('confirmed').getElementsByTagName('img')[0];
    const activedImg = document.getElementById('active').getElementsByTagName('img')[0];
    const recoveredImg = document.getElementById('recovered').getElementsByTagName('img')[0];
    confirmedImg.src = srcWebsite;
    activedImg.src = srcWebsite;
    recoveredImg.src = srcWebsite;
  }  

  function getStats(){
    const alpha2Code = document.getElementById('countires').value;
    let url = "https://www.trackcorona.live/api/countries/" + alpha2Code;
  
    fetch(url, requestOptions)
    .then(response => response.json())
    .then(stats => changeStats(stats))
  }

  function changeStats(stats){
    const confirmed = document.getElementById('confirmed');
    const active = document.getElementById('active');
    const recovered = document.getElementById('recovered');
    //if this country doesn't have covid data
    let isNA = stats.data.length===0;
    confirmed.childNodes[2].nodeValue  = isNA?'N/A':(stats.data[0].confirmed).toLocaleString();
    recovered.childNodes[2].nodeValue  = isNA?'N/A':(stats.data[0].recovered).toLocaleString();
    active.childNodes[2].nodeValue  = isNA?'N/A':(stats.data[0].confirmed-stats.data[0].recovered-stats.data[0].dead).toLocaleString();
  }

  setInterval(function () {
    changeFlag();
    getStats();
  }, 100);

});