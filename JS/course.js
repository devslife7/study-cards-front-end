class Course {
  constructor(courseJson) {
    this.user_id = courseJson.user_id
    this.id = courseJson.id
    this.name = courseJson.name
    this.private = courseJson.private
    this.cards = courseJson.cards.map(card => {
      return new Card(card)
    })
  }

  //makes an li with this course data and put it on the ul
  renderCourse() {
    const ul = currentPageDiv.querySelector('ul#course-list')

    const li = document.createElement('li')
    li.innerHTML = `${this.name} (<span>${this.cards.length}</span>)`
    li.dataset.courseId = this.id
    ul.append(li)

    if (currentCourse && currentUser.findCourse(currentCourse.id)) courseLiHandler(this, li)
    else courseLiHandler(currentUser.courses[0], li)

    li.addEventListener('click', () => courseLiHandler(this, li))
  }

  // renderCardAsLatex(card)

  addCourseListener(li) {
    li.addEventListener('click', () => {
      currentCourse = this
      const coursesList = document.getElementById('course-list')
      // clear previously highlited course
      for (const course of coursesList.childNodes) {
        course.classList = ''
      }
      li.classList += 'course-list-hover-color'

      const userCoursesCards = document.querySelector('div.user-courses-cards')
      userCoursesCards.innerHTML = ''

      // add delete and new card buttons
      const buttonsContainer = document.createElement('div')
      buttonsContainer.classList.add('cards-buttons-container')
      buttonsContainer.innerHTML = `
        <div class="add-cards-button"><p>Add Cards</p></div>
        <div class="study-cards-button"><p>Study Current Cards</p></div>
        <div class="delete-course-button"><p>Delete Current Course</p></div>
      `

      userCoursesCards.appendChild(buttonsContainer)

      // render each card to the card container
      this.cards.forEach(card => this.renderCardAsLatex(card)) //this.renderCard(card)
    })
  }

  renderCardAsLatex(card) {
    const userCoursesCards = document.querySelector('div.user-courses-cards')

    const cardDiv = document.createElement('div')
    const cardLaTeX = document.createElement('img')
    const deleteCard = document.createElement('p')
    deleteCard.classList += 'delete-card-button'
    deleteCard.textContent = 'X'
    deleteCard.dataset.cardId = card.id

    cardDiv.classList += 'grid-item'
    cardLaTeX.src = `https://latex.codecogs.com/gif.latex?\\huge&space;\\\\${card.card_front}`
    // render the cards to container
    cardDiv.appendChild(cardLaTeX)
    cardDiv.appendChild(deleteCard)
    userCoursesCards.appendChild(cardDiv)
  }

  //takes json and adds all given cards into this course
  addCards(json) {
    json.forEach(card_data => this.cards.push(new Card(card_data)))
  }

  deleteCourse() {
    const confirmation = confirm('You are about to delete this course and its containing cards, are you sure?')

    if (confirmation) {
      // make delete request
      fetch(courseURL + currentCourse.id, { method: 'DELETE' })
        .then(resp => resp.json())
        .then(deletedCourse => {
          // console.log('deletedCourse', deletedCourse)
          const courseLi = document.querySelector(`#course-list li[data-course-id="${deletedCourse.id}"`)
          // console.log('courseLi', courseLi)
          // remove from list on dom
          courseLi.remove()

          // click on last li from courses list
          const courseList = document.getElementById('course-list')
          courseList.lastElementChild.click()
        })
    }
  }
}
const courseLiHandler = (course, li) => {
  currentCourse = currentUser.findCourse(course.id)
  // console.log(currentCourse)
  const coursesList = document.getElementById('course-list')
  // clear previously highlited course
  for (const course of coursesList.childNodes) {
    course.classList = ''
  }
  li.classList += 'course-list-hover-color'

  // add delete and new card buttons
  const userCoursesCards = document.querySelector('div.user-courses-cards')
  userCoursesCards.innerHTML = ''

  const buttonsContainer = document.createElement('div')
  buttonsContainer.classList.add('cards-buttons-container')
  buttonsContainer.innerHTML = `
    <div class="add-cards-button"><p>Add Cards</p></div>
    <div class="study-cards-button"><p>Study Current Cards</p></div>
    <div class="delete-course-button"><p>Delete Current Course</p></div>
  `
  userCoursesCards.appendChild(buttonsContainer)

  // const userCoursesCards = document.querySelector('div.user-courses-cards')
  // userCoursesCards.innerHTML = ''

  currentCourse.cards.forEach(card => currentCourse.renderCardAsLatex(card)) //this.renderCard(card)
}
