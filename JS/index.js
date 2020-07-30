const USER_URL = 'http://localhost:3000/users/'

const pageDivs = document.getElementsByClassName('page')

let currentUser // User object made from User class
let currentPageDiv

// runner method for this file
const main = () => {
  showPage('login')
  addLogInListener()
  // addCoursesListeners()
}

const addLogInListener = () => {
  const loginForm = document.getElementById('login-form')
  loginForm.addEventListener('submit', e => loginHandler(e))
}

// const addCoursesListeners = () => {
//   const userCourseList = document.getElementById('course-list')
//   userCourseList.addEventListener('click', e => {
//     console.log(e.target)
//   })
// }

// showPage(string):boolean
// displays ONLY the divs with the <pageName> class
// AND sets that page as currentPageDiv
const showPage = pageName => {
  for (let div of pageDivs) {
    //hide page unless class list includes <pageName>
    if (div.classList.contains(pageName)) {
      div.style.display = 'initial'
      currentPageDiv = div
    } else div.style.display = 'none'
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

  const courseList = currentPageDiv.querySelector('ul#course-list')
  courseList.innerHTML = ''

  currentUser.renderCourses(courseList)
}

// user creates new cards for a course
const renderNewCard = course => {
  showPage('new-card')
  const cardList = currentPageDiv.querySelector('div#card-list')
  console.log(cardList)
}

const fetchUserThenRender = inp => {
  // url to fetch by username if NaN, or search by id if number
  const url = USER_URL + (isNaN(inp) ? `find/${inp}` : inp)
  fetch(url)
    .then(r => r.json())
    .then(user => {
      currentUser = new User(user)
      renderDashboard()
    })
}

main()
