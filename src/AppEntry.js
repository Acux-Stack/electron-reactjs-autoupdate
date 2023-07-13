import logo from './logo.svg';
import './App.css';

function AppEntry() {

  return (
      <div className="App-header">
      <section className="header-bar">
        <h2>React and Electron App</h2>
      </section>
        <h6>Testing electron and reactjs app</h6>
        <h6>Understanding the relationship between web and native app is a very important knowledge to every developer!!!</h6>
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

export default AppEntry;
