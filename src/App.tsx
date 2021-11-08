import { useState } from "react";
import "./App.css";

function shuffle(array: cardModel[]) {
  var m = array.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

interface cardModel {
  src : number
}

function App() {
  const imageArray: cardModel[] = [
    { 'src': 1 },
    { 'src': 2 },
    { 'src': 3 },
    { 'src': 4 },
    { 'src': 5 },
    { 'src': 6 },
  ];

  const [cards, setCards] = useState(shuffle([...imageArray, ...imageArray]));
  const [firstChoise, setFirstChoise] = useState<cardModel | null>(null);
  const [secondChoise, setSecondChoise] = useState<cardModel | null>(null);
  const [turns, setTurns] = useState(0);

  const hangleCardClick = (card: cardModel) => {
    if(!firstChoise) {
      setFirstChoise(card);
    } else if(!secondChoise) {
      setSecondChoise(card);
    }
  };

  const resetSelection = () => {
    setFirstChoise(null);
    setSecondChoise(null);
    setTurns(turns + 1);
  };

  const handleReset = () => {
    setCards(shuffle([...imageArray, ...imageArray]));
    setFirstChoise(null);
    setSecondChoise(null);
    setTurns(0);
  };


  return <div className="App">
    <div className="card-grid">
    {cards.map((card,index) => (
      
      <div id={(index + card.src).toString()} className="card" onClick={()=>hangleCardClick(card)}>{card.src}</div>
    ))}
    </div>

    <div className="button-container">
      <button onClick={handleReset}>Reset</button>
      </div>
  </div>;
}

export default App;
