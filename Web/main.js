var i=1,j=0,k=0;
var address = [];
var lat=0,lng=0;
const proxyurl = "https://cors-anywhere.herokuapp.com/";
 fetch(proxyurl + 'https://raise-backend.herokuapp.com/graphql',  {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        query: `
        
        query{
          police{
            latitude
            longitude
            time
            user {
              profile {
                name
                mobile
              }
              
            }
          }
        }
        
        `
    })
}).then(res => res.json())
.then( data =>  {
  console.log(data.data.police)
  
     data.data.police.forEach(async police => {
      lat=police.latitude
      lng=police.longitude
      console.log(lat)
      var mob = police.user.profile.mobile;
      var pro = police.user.profile.name;
      var time = police.time;
      console.log(k)
      k++;
      
      var data1 = "";
      await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=efe8f8cf9ec6408f8064758d8fb335d9`)
      .then(res => res.json())
      .then(data =>{
        // console.log(data.results[0].formatted)
        // address.push(data.results[0].formatted)
        data1=data.results[0].formatted;
      })
      console.log(data1,lat)
      document.getElementById("tableContent").innerHTML += `<tr><th scope='row'>${i}</th><td>${pro}</td>
      <td>${mob}</td><td>${data1}</td><td>${police.latitude}</td><td>${police.longitude}</td><td>${time}</td></tr>`
      
      i++;
      j++;
    })
    console.log(address);
})


