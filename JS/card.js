class Card
{
  constructor(course_id,cardJson)
  {
    if(cardJson)
    {
      this.id = cardJson.id;
    this.card_front = cardJson.card_front;
    this.card_back = cardJson.card_back;
    }
    this.course_id = course_id;
  }
}