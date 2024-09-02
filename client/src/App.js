import logo from "./logo.svg";
import "./styles/style.css";
import { Preloader } from "./components";

function App() {
  return (
    <div className="App">
      {/* PAGE PRELOADER */}
      <Preloader />
      <header className="App-header">
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
      </header>
    </div>
  );
}

export default App;
