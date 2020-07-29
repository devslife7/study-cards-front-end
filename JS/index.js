const USER_URL = 'http://localhost:3000/users/'

const pageDivs = document.getElementsByClassName("page");

let currentUser;
let currentPageDiv;

//runner method for this file
const main = () =>
{
  showPage("home");
  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener('submit', e => loginHandler(e));
}
// showPage(string):boolean
//displays ONLY the divs with the <pageName> class
//AND sets that page as currentPageDiv
const showPage = (pageName) =>
{
  for(let div of pageDivs)
  {                     //hide page unless class list includes <pageName>
    if(div.classList.contains(pageName))
    {
      div.style.display = "initial";
      currentPageDiv = div;
    }else 
      div.style.display = "none";
  }
}

//show login page div
const renderLogin = () => {
  showPage("login");
}

//when login button clicked
//submit event
const loginHandler = e => {
  e.preventDefault()
  const username = e.target.querySelector('input#login-inp').value
  fetchUserThenRender(username)
}

//show dashboard page div
// class="dashboard page"
const renderDashboard = () =>
{
  showPage("dashboard");

  const courseList = currentPageDiv.querySelector("ul#course-list");
  courseList.innerHTML = "";

  currentUser.courses.forEach(course => 
    {
      const li = document.createElement("li");
      li.innerText = course.name;
      li.dataset.course_id = course.id;
      courseList.append(li);
      li.addEventListener("click",() => courseLiHandler(course))
    });
}

const courseLiHandler = (courseObj) =>
{
  console.log(courseObj);
}

const fetchUserThenRender = inp => {
  //url to fetch by username if NaN, or search by id if number
  const url = USER_URL + (isNaN(inp) ? `find/${inp}` : inp)
  fetch(url)
    .then(r => r.json())
    .then(user => {
      currentUser = user
      renderDashboard()
    })
}
 
main();