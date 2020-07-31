class Card
{
  constructor(cardJson)
  {
    if(cardJson)
    {
      this.id = cardJson.id;
      this.card_front = cardJson.card_front;
      this.card_back = cardJson.card_back;
    }
  }

  toLatexImg(side)
  {
    const cardSide = document.createElement('img');
    cardSide.src = `https://latex.codecogs.com/gif.latex?\\huge&space;\\\\`;
    cardSide.src = cardSide.src + (side === "front" ? this.card_front : this.card_back);
    cardSide.className = side === "front" ? "front-image" : "back-image";
    return cardSide
  }
}