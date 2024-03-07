import './App.css';
import { useEffect, useState, useRef } from 'react';


function App() {
  const toPrev = useRef(false);
  const history = useRef([]);
  const [text, setText] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    if (toPrev.current) {
      toPrev.current = false;
      history.current = history.current.filter((el, idx) => idx !== history.current.length - 1 );
    } else {
      history.current = [...history.current, [...list]];
    }
  }, [list]);

  const goToPrevState = () => {
    const h = history.current;
    toPrev.current = true;
    if (h.length >= 2) {
      setList(h[h.length - 2].map(el => ({...el})));
    } else {
      setList([]);
    }
  }

  const delItem = (e, id) => {
    setList(l => l.filter(el => el.id !== id));
  }
  
  const ItemHandler = (e, id) => {
    setList(list => list.map(el => el.id === id ? ({...el, selected: !el.selected}) : el));
  }

  const liMapper = (el, i) => 
    (<li
      key={i}
      className={el.selected ? "selected" : ""}
      onClick={e => ItemHandler(e, el.id)}
      onDoubleClick={(e) => delItem(e, el.id)} >
      {el.text}
    </li>)
  
  const delItems = () => {
    if (list.reduce((result, current) => current.selected || result, false)) {
      setList(l => l.filter(el => !el.selected));
    }
  }

  const addItem = () => {
    const txt = text.trim();
    if (txt) {
      setList(l => [...list, { id: "" + Date.now(), text: txt, selected: false }]);
      setText("");
    }
  }

  const textHandler = (e) => {
    setText(e.target.value)
  }

  const keyHandler = (e) => {
    if (e.key === "Enter") {
      addItem();
    }
  }

  return (
    <div className="App">
      <div className="card">
        <h1>This is a technical proof</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipiscing, elit mus primis nec inceptos. Lacinia habitasse arcu molestie maecenas cursus quam nunc, hendrerit posuere augue fames dictumst placerat porttitor, dis mi pharetra vestibulum venenatis phasellus.</p>
        <ul>
          {list.map(liMapper)}
        </ul>
        <input type="text" onChange={textHandler} onKeyUp={keyHandler} value={text} placeholder="Add text..." />
        <div className='toolbar'>
          <div className='left'>
            <button disabled={!history.current.length} onClick={goToPrevState}>&larr;</button>
            <button onClick={delItems}>Delete</button>
          </div>
          <div className='right'>
            <button onClick={addItem} className='primary'>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
