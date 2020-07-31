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
  addStudyCardsButtonListeners()
  deleteCardsListener()
  navBarListeners()
  // testNewCard();
  // addCoursesListeners()
}

const deleteCardsListener = () => {
  const cardsContainer = document.getElementById('cards-grid')
  cardsContainer.addEventListener('click', e => {
    if (e.target.matches('p.delete-card-button')) {
      // console.log(e.target.dataset.cardId)
      deleteCard(e.target.dataset.cardId)
    }
  })
}

const deleteCard = cardId => {
  console.log(cardId)

  // make fetch request to delete card

  fetch(CARD_URL + cardId, { method: 'DELETE' })
    .then(resp => resp.json())
    .then(resp => {
      console.log('return of delete fetch', resp)

      // delete card from the DOM on fetch response
      // grab the p with id and delete its parent
      document.querySelector(`p[data-card-id="${resp.id}"`).parentElement.remove()

      // make it persist if you come back to the course
      // update currentCourse
      currentCourse.cards = currentCourse.cards.filter(card => card.id != resp.id)
      // currentCourse.renderCourse()
      // console.log('currentCourse.cards', currentCourse.cards)
      // console.log('resp.id', resp.id)

      // update card list on courses ul list
      // select corresponting li and reduce the span
      const coursesUl = document.getElementById('course-list')
      const courseLi = document.querySelector(`li[data-course-id="${currentCourse.id}"]`)
      const cardsCountSpan = courseLi.querySelector('span')
      cardsCountSpan.innerText = cardsCountSpan.innerText - 1
    })
}

const navBarListeners = () => {
  const navBar = document.querySelector('nav.navbar')
  navBar.addEventListener('click', e => {
    if (e.target.matches('#dashboard')) {
      console.log('dashboard was clicked')
      // showPage('dashboard')
      renderDashboard()
    }
    if (e.target.matches('#user-profile')) {
      console.log('user-profile was clicked')
      // showPage('login')
    }
    if (e.target.matches('#user-login')) {
      console.log('user-login was clicked')
      showPage('login')
    }
    if (e.target.matches('#logout-button-nav')) {
      currentUser = undefined
      document.querySelector('a#user-profile').innerText = ''
      showPage('login')
    }
  })
}

//add cards/delete ALL cards/ study
const addStudyCardsButtonListeners = () => {
  const buttonContainer = document.querySelector('div.user-courses-cards')
  buttonContainer.addEventListener('click', e => {
    if (e.target.matches('div.add-cards-button') || e.target.parentElement.matches('div.add-cards-button')) {
      // render add cards page
      renderNewCard()
    }
    if (e.target.matches('div.study-cards-button') || e.target.parentElement.matches('div.study-cards-button')) {
      console.log('study button clicked')
      // add the feature for study cards here
    }
    if (e.target.matches('div.delete-course-button') || e.target.parentElement.matches('div.delete-course-button')) {
      currentCourse.deleteCourse()
    }
  })
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
    // post request to backend
    if (e.target.matches('input.create-class-button')) {
      createNewCourse(e)
    }
  })
}

const showAddCourseForm = () => {
  // hide the plus button
  const addCourseButton = document.querySelector('div.add-course')
  addCourseButton.classList.add('hidden')

  // show the form
  const addCourseForm = document.querySelector('form.add-course-form')
  addCourseForm.classList.remove('hidden')
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
      currentCourse = newCourse
      currentUser.pushCourse(currentCourse)
      // append new course to the list on the fly
      newCourse.renderCourse()

      // click on new course li
      const newCourseLi = document.querySelector(`ul#course-list li[data-course-id="${course.id}"`)
      newCourseLi.click()
    })

  // reset form and hide form again
  const addCourseForm = document.querySelector('form.add-course-form')
  addCourseForm.classList.add('hidden')
  addCourseForm.reset()
  // show the plus button again and done
  const addCourseButton = document.querySelector('div.add-course')
  addCourseButton.classList.remove('hidden')
}

// showPage(string):boolean
// displays ONLY the divs with the <pageName> class
// AND sets that page as currentPageDiv
const showPage = pageName => {
  for (let div of pageDivs) {
    //hide page unless class list includes <pageName>
    if (div.classList.contains(pageName)) {
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
const newCardHandler = cardsDiv => {
  let cards = []
  const rows = cardsDiv.children
  for (let row of rows) {
    //get values from new card inputs
    //order reversed because of the way the divs are set up
    const termCell = row.children[0]
    const answCell = row.children[1]
    let termVal = termCell.children[1].value
    let answVal = answCell.children[0].value

    if (termVal && answVal) {
      let card = new Card()
      if (!isLatex(termCell)) termVal = `\\text{${termVal}}`
      if (!isLatex(answCell)) answVal = `\\text{${answVal}}`
      card.card_front = termVal
      card.card_back = answVal

      //add cards to array sent to fetch
      cards.push(card)
    }
  }
  postCards(cards)
}

const configObj = (data, method) => {
  return {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(data)
  }
}

//post all cards
const postCards = cards => {
  const data = { data: { cards: cards, course_id: currentCourse.id } }
  fetch(CARD_URL, configObj(data, 'POST'))
    .then(r => r.json())
    .then(cardJson => {
      currentCourse.addCards(cardJson)
      currentUser.courses = currentUser.courses.map(course => {
        return currentCourse.id === course.id ? currentCourse : course
      })
      //
      renderDashboard()
    })
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
      const userProfile = document.querySelector('a#user-profile')
      userProfile.innerText = `Hello, ${currentUser.username}`
      renderDashboard()
    })
}

main()
