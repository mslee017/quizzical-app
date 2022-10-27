import React from 'react';
import { useState } from 'react';
import blobYellow from './blob-yellow.png';
import blobBlue from './blob-blue.png';
import './App.css';

// Components
import Questions from './Questions';
import Start from './Start';

function App() {
  const [isStarted, setIsStarted] = useState(false);

  function handleStart() {
    setIsStarted(true);
  }

  return (
    <section className="container">
      <img src={blobYellow} alt="" className="blob--yellow" />
      {isStarted ? <Questions /> : <Start handleStart={handleStart} />}
      <img src={blobBlue} alt="" className="blob--blue" />
    </section>
  );
}

export default App;
