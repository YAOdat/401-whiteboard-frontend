import './App.css';
import PostForm from './components/Add-post-form'
import SignIn from './components/Signin'
import SignUp from './components/Signup';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> <span id='Pomment'> Pomment </span>, Where You Post and Comment</h1>
        <SignIn/>
        
  
      </header>
    </div>
  );
}

export default App;
