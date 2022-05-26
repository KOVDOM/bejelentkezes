/*
    Login url: https://reqres.in/api/login
    Body:
    {
      email: "eve.holt@reqres.in",
      password: "ok"
    }

    Users url: https://reqres.in/api/users
*/

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
      return fetch('https://reqres.in/api/users');
      console.log(response);
    })
    .then(function (response) {
      if (!response.ok) {
        return Promise.reject('Bejelentkezés sikertelen')
      }
      return response.json();
    })
    .then(function (userPage) {
      console.log(userPage);
    state = userPage.data;
    renderUsers();
    document.getElementById('login').style.display="none";
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
  var usersHTML ='';
  for (var user of state){
    usersHTML +=`<li class="list-group-item">${user.first_name} ${user.last_name}</li>`
  }
  document.getElementById('user-list-container').innerHTML=`<ul class="list-group">`+usersHTML+`</ul>`;
}