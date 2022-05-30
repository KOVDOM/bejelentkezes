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
    unknownHTML =`<input type="number" name="idemail" class="form-control" /><br><button type="submit" id="idemail">Katt</button>`
  }
  document.getElementById('user-list-container').innerHTML=`<ul class="list-group">`+unknownHTML+`</ul>`;
}
//<li class="list-group-item">${unknown.name}</li>
document.getElementById('idemail').onclick=function(event){
  event.preventDefault();
  var name = event.target.elements.name.value;
  var body = JSON.stringify({
    name: name
  })
};

fetch('https://reqres.in/api/unknown/2', {
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
    .then(function (unknownPage) {
      console.log(unknownPage);
    state = unknownPage.data;
    renderUsers2();
    //document.getElementById('login').style.display="none";
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
    })
  console.log(email);
  console.log(password);
  console.log(body);
;

    function renderUsers2(){
      var unknownHTML2 ='';
      for (var unknown of state){
        unknownHTML2 =`<li class="list-group-item">${unknown.name}</li>`
      }
      document.getElementById('user-list-container2').innerHTML2=`<ul class="list-group">`+unknownHTML2+`</ul>`;
    };