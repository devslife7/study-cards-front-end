class Card
{
  constructor(cardJson)
  {
    this.id = cardJson.id;
    this.card_front = cardJson.card_front;
    this.card_back = cardJson.card_back;
  }
}