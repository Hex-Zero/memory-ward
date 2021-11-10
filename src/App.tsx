import { useEffect, useState } from "react";
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
  src : number,
  visible : boolean,
  disabled : boolean
}

function App() {
  const imageArray: cardModel[] = [
    { 'src': 1, 'visible': false , 'disabled': false },
    { 'src': 2, 'visible': false , 'disabled': false },
    { 'src': 3, 'visible': false , 'disabled': false },
    { 'src': 4, 'visible': false , 'disabled': false },
    { 'src': 5, 'visible': false , 'disabled': false },
    { 'src': 6, 'visible': false , 'disabled': false },
  ];

  const [cards, setCards] = useState(shuffle([...imageArray, ...imageArray]));
  const [firstChoise, setFirstChoise] = useState<cardModel | null>(null);
  const [secondChoise, setSecondChoise] = useState<cardModel | null>(null);
  const [turns, setTurns] = useState(0);

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

  const hangleCardClick = (card: cardModel, index: number) => {
    if(!firstChoise) {
      setFirstChoise(card);
    } else if(!secondChoise) {
      setSecondChoise(card);
    }
    flipCard(index);
  };

  const flipCard = (index: number) => {
    setCards(cards.map((c, i) => { 
      if(i === index) {
        return {
          ...c,
          visible: true
        }
      }
      return c;
    }
    ));
  }

  useEffect(() => {
    if(secondChoise && firstChoise?.src === secondChoise?.src){
      console.log('match');
      resetSelection();
    }else if(secondChoise){
      console.log('no match');
      resetSelection();
    }
  }, [ secondChoise ]);


  return <div className="App">
        <div className="card-grid">
        {cards.map((card,index) => (
          <div id={(index + card.src + index).toString()} 
              className="card" onClick={()=>hangleCardClick(card, index)}>{card.visible? card.src : '-'} 
          </div>
        ))}
        </div>

        <div className="button-container">
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>;
}

export default App;
