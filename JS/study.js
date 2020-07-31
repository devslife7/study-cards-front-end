const studyFront = document.querySelector('#card-side-front')
const studyBack = document.querySelector('#card-side-back')
let currentCards = []

const renderStudyCardsPage = () => {
  currentCards = currentCourse.cards.slice()
  currentPageDiv = document.querySelector('.study.page')
  showPage('study')
  currentPageDiv.addEventListener('click', e => handleStudyClick(e))
  if (currentCards) {
    showCard(currentCards.shift())
  }
}

const handleStudyClick = e => {
  const tgt = e.target
  if (tgt.className === 'front-image' || tgt.id === 'card-side-front') {
    studyFront.className = 'hidden'
    studyBack.className = ''
  }
  if (tgt.className === 'back-image' || tgt.id === 'card-side-back') {
    studyBack.className = 'hidden'
    studyFront.className = ''
  }
  if (tgt.id === 'next' && currentCards[0]) {
    showCard(currentCards.shift())
  }
  if (tgt.id === 'restart') {
    currentCards = currentCourse.cards.slice()
    showCard(currentCards.shift())
  }
}

const showCard = card => {
  const cardFront = card.toLatexImg('front')
  const cardBack = card.toLatexImg('back')

  studyFront.innerHTML = ''
  studyBack.innerHTML = ''

  studyFront.append(cardFront)
  studyBack.append(cardBack)
}
