const BASE_URL = 'http://localhost:3000/'
const USER_URL = BASE_URL + 'users/'
const CARD_URL = BASE_URL + 'cards/'
const COURSE_CARDS_URL = BASE_URL + '/course_cards/'
const baseURL = 'http://localhost:3000/'
const userURL = baseURL + 'users/'
const courseURL = baseURL + 'courses/'

const pageDivs = document.getElementsByClassName('page')

let currentUser //User object made from User class
let currentCourse
let currentPageDiv

// runner method for this file
const main = () => {
  showPage('login')
  addLogInListener()
  // addCourseButtonListeners()
  courseListButtonsListener()
  //testNewCard();
  // addCoursesListeners()
}

const addLogInListener = () => {
  const loginForm = document.getElementById('login-form')
  loginForm.addEventListener('submit', e => loginHandler(e))
}

const courseListButtonsListener = () => {
  const courseListContainer = document.querySelector('div.user-courses-list')

  courseListContainer.addEventListener('click', e => {
    // show form
    if (e.target.matches('div.add-course')) {
      showAddCourseForm()
    }
    if (e.target.matches('input.create-class-button')) {
      createNewCourse(e)
    }
  })
}

const showAddCourseForm = () => {
  // make form
  const AddCourseForm = document.createElement('form')
  AddCourseForm.classList += 'add-course-form'
  // make all labels and input boxes
  const courseNamelabel = document.createElement('label')
  courseNamelabel.textContent = 'Add Course'
  AddCourseForm.appendChild(courseNamelabel)

  AddCourseForm.innerHTML = `
    <input type="text" name="courseName" placeholder="Course Name" />
    <div>
      <input type="checkbox" name="private" />
      <label>Private</label>
    </div>
    <input class="create-class-button" type="submit" value="Create New Course"/>
  `

  // append form
  const courseListContainer = document.querySelector('div.user-courses-list')
  courseListContainer.appendChild(AddCourseForm)

  // hide the plus button
  const addCourseButton = document.querySelector('div.add-course')
  addCourseButton.classList.add('hidden')
}

const createNewCourse = e => {
  e.preventDefault()

  const courseName = e.target.parentElement.courseName.value
  const coursePrivate = e.target.parentElement.private.checked
  const courseUserID = currentUser.id

  // create a new course, a fetch request
  const postRequest = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json'
    },
    body: JSON.stringify({
      name: courseName,
      private: coursePrivate,
      user_id: courseUserID
    })
  }

  fetch(courseURL, postRequest)
    .then(resp => resp.json())
    .then(course => {
      const newCourse = new Course(course)
      newCourse.renderCourse()
    })

  // append new course to the list on the fly
  // hide form again
  // show the plus button again and done
}
 
// showPage(string):boolean
// displays ONLY the divs with the <pageName> class
// AND sets that page as currentPageDiv
const showPage = pageName => {
  for (let div of pageDivs) {
    //hide page unless class list includes <pageName>
    if (div.classList.contains(pageName)) {
      // div.style.display = 'flex'
      div.classList.remove('hidden')
      currentPageDiv = div
    } else div.classList.add('hidden')
  }
}

// when login button clicked
// submit event
const loginHandler = e => {
  e.preventDefault()
  const username = e.target.querySelector('input#login-inp').value
  fetchUserThenRender(username)
}

// show dashboard page div
// class="dashboard page"
const renderDashboard = () => {
  showPage('dashboard')

  // const courseList = currentPageDiv.querySelector('ul#course-list')
  // courseList.innerHTML = ''

  currentUser.renderAllCourses()
}

//user creates new cards for a course
const renderNewCard = () => {
  showPage('new-card')
  //clear inner html of cardList
  currentPageDiv.innerHTML = `<div id="new-card-form">      
  </div><br>`

  const cardList = currentPageDiv.querySelector('div#new-card-form')
  cardList.innerHTML = ''
  for (let i = 1; i < 7; i++) {
    renderCardRow(cardList, i)
  }
  //button that will save all cards
  const submitButton = document.createElement('button')
  submitButton.innerText = 'Create Cards'
  submitButton.className = 'create-cards button is-primary'
  currentPageDiv.append(submitButton)

  submitButton.addEventListener('click', e => newCardHandler(cardList))
}

//when 'create cards' is clicked on new card page
const newCardHandler = (cardsDiv) =>
{
  let cards = [];
  const rows = cardsDiv.children;
  for(let row of rows)
  {
    //get values from new card inputs
    //order reversed because of the way the divs are set up
    const termCell = row.children[0];
    const answCell = row.children[1];
    let termVal = termCell.children[1].value;
    let answVal = answCell.children[0].value;
    
    if(termVal && answVal)
    {
      let card = new Card();
      if (!isLatex(termCell))
        termVal = `\\text{${termVal}}`;
      if (!isLatex(answCell))
        answVal = `\\text{${answVal}}`;
      card.card_front = termVal;
      card.card_back = answVal;

      //add cards to array sent to fetch
      cards.push(card);
    }
  }   
  postCards(cards);
}

const configObj = (data,method) =>
{
  return {
    method: method,
    headers:
    {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  };
}

//post all cards
const postCards = (cards) =>
{
  const data = {data: {cards: cards, course_id: currentCourse.id}};
  fetch(CARD_URL,configObj(data,"POST"))
  .then(r => r.json())
  .then(cardJson => {
    currentCourse.addCards(cardJson);
    currentUser.courses = currentUser.courses.map(course => 
      {
        return (currentCourse.id === course.id) ? currentCourse : course
      });
    //
    renderDashboard();
  });
}
//takes one div (left cell or right cell), which contain radio
//  buttons and text content
const isLatex = cell => {
  return !cell.querySelector('input').checked
}

//append one row div on new cards form div
const renderCardRow = (cardList, rowNum) => {
  //create one row
  const cardRow = document.createElement('div')
  cardRow.className = 'card-row'
  cardList.append(cardRow)

  //make a left and right div to hold text and radio
  const cardLeft = document.createElement('div')
  const cardRight = document.createElement('div')
  cardLeft.className = 'new card left cell'
  cardRight.className = 'new card right cell'
  cardRow.append(cardLeft, cardRight)

  //make the text boxes
  const term = document.createElement('textarea')
  const answ = document.createElement('textarea')
  term.className = 'new card left input element'
  answ.className = 'new card right input element'

  //order for a row is radio,term-text,answer-text,radio
  addRadioButtons(cardLeft, rowNum, 1)
  cardLeft.append(term)

  cardRight.append(answ)
  addRadioButtons(cardRight, rowNum, 2)
}

const addRadioButtons = (cardCell, row, column) => {
  const radioDiv = document.createElement('div')
  radioDiv.className = 'control new card element'
  radioDiv.innerHTML = `
    <label class="radio">
      <input class="radio-latex" type="radio" name="latex-${row}${column}" checked>
      Text
    </label><br>
    <label class="radio">
      <input class="radio-latex" type="radio" name="latex-${row}${column}">
      LaTeX
    </label>
  `
  cardCell.append(radioDiv)
}

const fetchUserThenRender = inp => {
  // url to fetch by username if NaN, or search by id if number
  const url = userURL + (isNaN(inp) ? `find/${inp}` : inp)
  fetch(url)
    .then(r => r.json())
    .then(user => {
      currentUser = new User(user)
      renderDashboard()
    })
}

main()
