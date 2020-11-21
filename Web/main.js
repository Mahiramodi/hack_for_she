var i=1;
var address = [];
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
.then(async data =>  {
    await data.data.police.forEach(async police => {
      
      
   await fetch(`https://us1.locationiq.com/v1/reverse.php?key=pk.d22f1d115a3cfee16e28fa3ff2d8e5e6&lat=${police.latitude}&lon=${police.longitude}&format=json`)
    .then(res => res.json())
    .then(data => address.push(data.display_name))
    console.log(address);
      document.getElementById("tableContent").innerHTML += `<tr><th scope='row'>${i}</th><td>${police.user.profile.name}</td>
      <td>${police.user.profile.mobile}</td><td>${address[i-1]}</td><td>${police.latitude}</td><td>${police.longitude}</td><td>${"2:00 PM"}</td></tr>`
      i++;
    })
})


