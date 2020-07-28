const USER_URL = "http://localhost:3000/users/"
// hide login div until called
const loginDiv = document.getElementById('login-container');
const loginForm = loginDiv.querySelector("form#login-form");
loginDiv.style.display = "none";
let currentUser;

loginForm.addEventListener("submit",e => loginHandler(e));

const renderLogin = () =>
{
  loginDiv.style.display = "initial";
}
//when login button clicked
const loginHandler = (e) =>
{
  e.preventDefault();
  const username = e.target.querySelector("input#login-inp").value;
  setUser(username);
}

const renderUserHomepage = () =>
{
  console.log(currentUser);
}

const setUser = (inp) =>
{
  //url to fetch by username if NaN, or search by id if number
  const url = USER_URL + (isNaN(inp) ? `find/${inp}` : inp);
  fetch(url)
  .then(r => r.json())
  .then(user => 
  {
    currentUser = user
    renderUserHomepage();
  })
}