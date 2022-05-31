var state={
  id:"",
  lista: []
};

window.onload=renderLoginComponent();

function renderLoginComponent(){
  if(state.isLoggedIn){
    document.getElementById('login').innerHTML="";
    return;
  }
  
}

document.getElementById('kuld').onclick=function(){
  console.log("dfsafssa");
  var apiurl="https://reqres.in/api/unknown/"+document.getElementById("szam").value;
  console.log(apiurl);
  fetch(apiurl).then(function (response){
  if(!response.ok){
    return Promise.reject("unknown id error");
  }
  console.log(response);
  return response.json();
  }).then(function(unknownid){
    console.log(unknownid);
    state.id=unknownid.data;
    renderUnknownId();
    
  })
}

document.getElementById('login').onsubmit = function (event) {
  event.preventDefault();
  var email = event.target.elements.email.value;
  var password = event.target.elements.password.value;
  var body = JSON.stringify({
    email: email,
    password: password,
  });loginAndFetchUsers(body);

  /*fetch('https://reqres.in/api/login', {
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
        state.id="";
        return Promise.reject('Bejelentkezés sikertelen')
      }
      return response.json();
    })
    .then(function (unknownPage) {
      console.log(unknownPage);
    state.list = unknownPage.data;
    console.log(unknownPage);
    render();
    
    //document.getElementById('login').style.display="none";
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
    })
  console.log(email);
  console.log(password);
  console.log(body);*/
};

async function loginAndFetchUsers(body){
  var loginResponse=await fetch('https://reqres.in/api/login', {
    method: 'POST',
    body: body,
    headers: {
      'Content-type': 'application/json'
    }
  })
  if(!loginResponse.ok){
    alert('Bejelentkezés sikertelen');
    state.isLoginPending=false;
    renderLoginComponent();
    return;
  }

    var token = await loginResponse.json()
    state.isLoggedIn=true;
    state.isLoginPending=false;
    renderLoginComponent(); 

    var usersResponse=await fetch('https://reqres.in/api/unknown');
    if(!usersResponse.ok){
      alert('Users error');
      state.isLoginPending=false;
      renderLoginComponent();
      return;
    }
    var usersPage=await usersResponse.json();
    state.users=usersPage.data;
    renderUsers();
  console.log(usersPage);
}

function render(){
  console.log(state);
  var tmp=`<table class='table'><tr><th scope='col'>
  ID</th><th scope='col'>
  Name</th><th scope='col'>Year</th><th scope='col'>
  Color</th> <th scope="col">
  Pantone_value</th></tr>`;

  for(var u of state.list){
    tmp+=`<tr>
    <td>${u.id}</td>
    <td>${u.name}</td>
    <td>${u.year}</td>
    <td style="background-color:${u.color}">${u.color}</td>
    <td>${u.pantone_value}</td>    
    </tr>`;
  }
  document.getElementById('user-list-container2').innerHTML=tmp+`</table>`;
}
//<li class="list-group-item">${unknown.name}</li>

function renderUnknownId(){
  console.log(state.id);
  if(state.id!=""){
    var tmp=`<table class='table'><tr><th scope='col'>
  ID</th><th scope='col'>
  Name</th><th scope='col'>Year</th><th scope='col'>
  Color</th> <th scope="col">
  Pantone_value</th></tr>`;  
  tmp+=`<tr>
    <td>${state.id.id}</td>
    <td>${state.id.name}</td>
    <td>${state.id.year}</td>
    <td style="background-color:${state.id.color}">${state.id.color}</td>
    <td>${state.id.pantone_value}</td>    
    </tr>`;
    document.getElementById('unknownid').innerHTML=tmp+`</table>`;
  }
}

function renderUsers() {
  var usersHTML = "";
  for (var user of state.users) {
    usersHTML += `<li class="list-group-item">${user.name}</li>`;
  }

  document.getElementById("user-list-container").innerHTML =
    '<ul class="list-group">' + usersHTML + "</ul>";
}