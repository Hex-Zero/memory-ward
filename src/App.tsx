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
  const [flipped, setFlipped] = useState([]);

  return <div className="App">
    <div className="card-grid">
    {cards.map((element,index) => (
      
      <div id={index.toString()} className="card">{element.src}</div>
    ))}
    </div>
  </div>;
}

export default App;
