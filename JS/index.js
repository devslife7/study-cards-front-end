
const loginForm = document.getElementById("login-form");

const loginHandler = (e) =>
{
  e.preventDefault();
  console.log(e.target);
}

loginForm.addEventListener("submit",e => loginHandler(e));
