class Course
{
  constructor(courseJson)
  {
    this.id = courseJson.id;
    this.name = courseJson.name;
    this.private = courseJson.private;
    this.cards = courseJson.cards.map(card => {return new Card(card)})
  }
  //makes an li with this course data and put it on the ul
  renderCourse(ul)
  {
    const li = document.createElement('li');
    li.innerText = this.name;
    li.dataset.id = this.id;

    //one listener for every li
    ul.append(li);
    li.addEventListener('click', () => courseLiHandler(this));
  }
}