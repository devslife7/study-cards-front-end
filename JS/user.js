class User
{
  constructor(UserJson)
  {
    this.id = UserJson.id;
    this.username = UserJson.username;
    this.created_at = UserJson.created_at;
    this.courses = UserJson.courses.map(course => {return new Course(course)})
  }

  //render each course name in li's into the ul
  renderCourses(ul)
  {
    this.courses.forEach(course => course.renderCourse(ul))
  }
}