const studyFront = document.querySelector("#card-side-front");
const studyBack = document.querySelector("#card-side-back");

const renderStudyCardsPage = () =>
{
  currentPageDiv = document.querySelector(".study.page");
  showPage("study");
  currentPageDiv.addEventListener("click",e => handleStudyClick(e));
  if(currentCourse.cards)
  {
    showFirstCard(currentCourse.cards);
  }

}

const handleStudyClick = (e) => 
{
  console.log(e.target)
  if (e.target.className === "front-image")
  {
    studyFront.className = "hidden";
    studyBack.className = ""
  }
  if (e.target.className === "back-image")
  {
    studyBack.className = "hidden"
    studyFront.className = "";
  }
}

const showFirstCard = (cards) =>
{
  console.log(cards)
  const cardFront = cards[0].toLatexImg("front");
  const cardBack = cards[0].toLatexImg("back");
  
  studyFront.innerHTML = "";
  studyBack.innerHTML = "";

  studyFront.append(cardFront);
  studyBack.append(cardBack);
}