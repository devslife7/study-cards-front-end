class Course
{
  constructor(user_id,courseJson)
  {
    this.user_id = user_id;
    this.id = courseJson.id;
    this.name = courseJson.name;
    this.private = courseJson.private;
    this.cards = courseJson.cards.map(card => {return new Card(this.id,card)})
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