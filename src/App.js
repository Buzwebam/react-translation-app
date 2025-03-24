import React from 'react';
import './App.css';
import TranslationBox from './components/TranslationBox';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Language Translation</h1>
      </header>
      <main>
        <TranslationBox />
      </main>
    </div>
  );
}

export default App; 