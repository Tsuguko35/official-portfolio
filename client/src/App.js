import "./styles/style.css";
import "./styles/fontface.css";
import { Preloader, Navbar, Scrollbar, CursorFollower } from "./components";

function App() {
  return (
    <div className="App">
      {/* Cursor Follower */}
      <CursorFollower />

      {/* PAGE PRELOADER */}
      <Preloader />

      {/* Scrollbar */}
      <Scrollbar />

      {/* Navbar */}
      <Navbar />

      <main className="App-header">
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
      </main>
    </div>
  );
}

export default App;
