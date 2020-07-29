class User
{
  constructor(UserJson)
  {
    this.id = UserJson.id;
    this.username = UserJson.username;
    this.created_at = UserJson.created_at;
    this.courses = UserJson.courses.map(course => {return new Course(course)})
  }
  renderCourses(ul)
  {
    this.courses.forEach(course => course.renderCourse(ul))
  }
}