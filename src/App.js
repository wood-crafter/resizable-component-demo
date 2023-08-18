import React from 'react'
import Container from './components/container'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import './App.css';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='app'>
        <Container />
      </div>
    </DndProvider>
  );
}

export default App;
