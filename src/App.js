import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import PostForm from './components/Add-post-form'
import PostTest from './components/class-form'

import Posts from './components/Post'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <PostForm />
      </header>
    </div>
  );
}

export default App;
