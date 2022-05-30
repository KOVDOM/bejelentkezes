var state=[];

document.getElementById('login').onsubmit = function (event) {
  event.preventDefault();
  var email = event.target.elements.email.value;
  var password = event.target.elements.password.value;
  var body = JSON.stringify({
    email: email,
    password: password,
  });

  fetch('https://reqres.in/api/login', {
    method: 'POST',
    body: body,
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then(function (response) {
      console.log(response)
      if (!response.ok) {
        return Promise.reject('login error')
      }
      return response.json();
    })
    .then(function (response) {
      return fetch('https://reqres.in/api/unknown');
      console.log(response);
    })
    .then(function (response) {
      if (!response.ok) {
        return Promise.reject('Bejelentkezés sikertelen')
      }
      return response.json();
    })
    .then(function (unknownPage) {
      console.log(unknownPage);
    state = unknownPage.data;
    renderUsers();
    //document.getElementById('login').style.display="none";
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
    })
  console.log(email);
  console.log(password);
  console.log(body);
};

function renderUsers(){
  var unknownHTML ='';
  for (var unknown of state){
    unknownHTML =`<input type="number" name="idemail" class="form-control" /><br><button id="idemail">Katt</button>`
  }
  document.getElementById('user-list-container').innerHTML=`<ul class="list-group">`+unknownHTML+`</ul>`;
}
//<li class="list-group-item">${unknown.name}</li>
document.getElementById('idemail').onclick=function(event){
  //event.preventDefault();
  var password = event.target.elements.password.value;
  var body = JSON.stringify({
    name: name
  })
};

fetch('https://reqres.in/api/unknown', {
    method: 'POST',
    body: body,
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then(function (response) {
      console.log(response)
      if (!response.ok) {
        return Promise.reject('login error')
      }
      return response.json();
    })