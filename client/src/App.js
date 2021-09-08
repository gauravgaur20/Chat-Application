
import './App.css';
import {BrowserRouter as Router ,Route} from "react-router-dom";
import Home from "./Components/Home.js";
import Chat from "./Components/Chat.js"; 
import io from "socket.io-client";
import React from "react"

const socket = io.connect('/');

function Appmain(props) {
  return (
    <React.Fragment>
      <div className="right">
        <Chat
          username={props.match.params.username}
          socket={socket}
        />
      </div>
      
    </React.Fragment>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">

      </header>
      <Router>
        <Route exact path="/" >
            <Home socket={socket}/>
        </Route>

        <Route path="/chat" component={Appmain}>
        </Route>

      </Router>
    </div>
  );
}

export default App;
