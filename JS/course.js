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
    li.innerText = `${this.name} (${this.cards.length})`
    li.dataset.courseId = this.id
    ul.append(li)

    this.addCourseListener(li)
  }

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
      console.log(this)
      this.cards.forEach(card => this.renderCardAsLatex(card))//this.renderCard(card)
    })
  }

  // renderCard(card) {
  //   const userCoursesCards = document.querySelector('div.user-courses-cards')

  //   const cardDiv = document.createElement('div')
  //   const cardText = document.createElement('p')

  //   cardDiv.classList += 'grid-item'
  //   cardText.textContent = `${card.card_front}`
  //   // render the cards to container
  //   cardDiv.appendChild(cardText)
  //   userCoursesCards.appendChild(cardDiv)
  // }

  renderCardAsLatex(card)
  {
    const userCoursesCards = document.querySelector('div.user-courses-cards')

    const cardDiv = document.createElement('div')
    const cardLaTeX = document.createElement('img')

    cardDiv.classList += 'grid-item'
    cardLaTeX.src = `https://latex.codecogs.com/gif.latex?\\huge&space;\\\\${card.card_front}`
    // render the cards to container
    cardDiv.appendChild(cardLaTeX)
    userCoursesCards.appendChild(cardDiv)
  }

  //takes json and adds all given cards into this course
  addCards(json)
  {
    json.forEach(card_data => this.cards.push(new Card(card_data)))
  }
  
  //make link to renderNewCard*();
  //make link to study()=>(not yet implemented)
  //no need to pass params, currentCourse already set in your li listener
}
