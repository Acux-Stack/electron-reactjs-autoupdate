import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App-header">
      <header className="header-bar">
        <h2>React and Electron App</h2>
      </header>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
    </div>
  );
}

export default App;
