
const USER_URL = 'http://localhost:3000/users/'

const pageDivs = document.getElementsByClassName('page')

let currentUser;//User object made from User class
let currentPageDiv

//runner method for this file
const main = () => {
  //showPage('login')  
  renderNewCard();

  const loginForm = document.getElementById('login-form')
  loginForm.addEventListener('submit', e => loginHandler(e))

  const loginButton = document.getElementById('login-button-nav')
  loginButton.addEventListener('click', () => {
    showPage('login')
  })
}
// showPage(string):boolean
//displays ONLY the divs with the <pageName> class
//AND sets that page as currentPageDiv
const showPage = pageName => {
  for (let div of pageDivs) {
    //hide page unless class list includes <pageName>
    if (div.classList.contains(pageName)) {
      div.style.display = 'flex'
      currentPageDiv = div
    } else div.style.display = 'none'
  }
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
const renderDashboard = () => {
  showPage('dashboard')

  const courseList = currentPageDiv.querySelector('ul#course-list')
  courseList.innerHTML = ''

  currentUser.renderCourses(courseList);
}

//user creates new cards for a course
const renderNewCard = (course) =>
{
  showPage("new-card");
  const cardList = currentPageDiv.querySelector("div#new-card-form");
  cardList.innerHTML = "";
  for(let i = 1; i < 11; i++)
  {
    renderCardRow(cardList,i);
  }

}

const renderCardRow = (cardList,rowNum) =>
{
  //create one row
  const cardRow = document.createElement("div");
  cardRow.className = "card-row";
  cardList.append(cardRow);

  //make a left and right div to hold text and radio
  const cardLeft = document.createElement('div');
  const cardRight = document.createElement('div');
  cardLeft.className = "new card left cell";
  cardRight.className = "new card right cell"; 
  cardRow.append(cardLeft,cardRight);

  //make the text boxes
  const term = document.createElement("textarea");
  const answ = document.createElement("textarea");
  term.className = "new card left input element";
  answ.className = "new card right input element";

  //order for a row is radio,term-text,answer-text,radio
  addRadioButtons(cardLeft,rowNum,1);
  cardLeft.append(term);

  cardRight.append(answ);
  addRadioButtons(cardRight,rowNum,2);
}

const addRadioButtons = (cardCell,row,column) =>
{
  const radioDiv = document.createElement('div');
  radioDiv.className = "control new card element";
  radioDiv.innerHTML = 
  `
    <label class="radio">
      <input type="radio" name="latex-${row}-${column}" checked>
      Text
    </label><br>
    <label class="radio">
      <input type="radio" name="latex-${row}-${column}">
      LaTeX
    </label>
  `;
  cardCell.append(radioDiv);
}

//handler for listener added on li's in Course:renderCourse(ul)
const courseLiHandler = course => {
  console.log(course)
}

const fetchUserThenRender = inp => {
  //url to fetch by username if NaN, or search by id if number
  const url = USER_URL + (isNaN(inp) ? `find/${inp}` : inp)
  fetch(url)
    .then(r => r.json())
    .then(user => {
      currentUser = new User(user)
      renderDashboard()
    })
}

main()
