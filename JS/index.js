// hide login div until called
const loginDiv = document.getElementById('login-container');
const loginForm = loginDiv.querySelector("form#login-form");
loginDiv.style.display = "none";

//when login button clicked
const loginHandler = (e) =>
{
  e.preventDefault();
  console.log(e.target);
}

//login handle
loginForm.addEventListener("submit",e => loginHandler(e));
