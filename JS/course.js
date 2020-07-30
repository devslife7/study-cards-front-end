class Course {
  constructor(courseJson) {
    this.id = courseJson.id
    this.name = courseJson.name
    this.private = courseJson.private
    this.cards = courseJson.cards.map(card => {
      return new Card(card)
    })
  }

  //makes an li with this course data and put it on the ul
  renderCourse(ul) {
    const li = document.createElement('li')
    li.innerText = this.name
    li.dataset.courseId = this.id
    ul.append(li)

    this.addCourseListener(li)
  }

  addCourseListener(li) {
    li.addEventListener('click', () => {
      const coursesList = document.getElementById('course-list')
      // clear previously highlited course
      for (const course of coursesList.childNodes) {
        course.classList = ''
      }
      li.classList += 'course-list-hover-color'

      const userCoursesCards = document.querySelector('div.user-courses-cards')
      userCoursesCards.innerHTML = ''

      this.cards.forEach(card => this.renderCard(card))
    })
  }

  renderCard(card) {
    const userCoursesCards = document.querySelector('div.user-courses-cards')

    const cardDiv = document.createElement('div')
    const cardText = document.createElement('p')

    cardDiv.classList += 'grid-item'
    cardText.textContent = `${card.card_front}`
    // render the cards to container
    cardDiv.appendChild(cardText)
    userCoursesCards.appendChild(cardDiv)
  }
}
