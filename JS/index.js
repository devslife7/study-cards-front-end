// hide login div until called
const loginDiv = document.getElementById('login-container');
const loginForm = loginDiv.querySelector("form#login-form");
loginDiv.style.display = "none";

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
  console.log(username);
}

