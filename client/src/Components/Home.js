import React from 'react'
import {useState} from "react"
import './Homecss.css'
import {Link} from 'react-router-dom'

const Home = ({socket}) => {
    const [username, setUsername] = useState("");


    const sendData = () => {
        if (username !== "") {
          socket.emit("joinRoom", { username });
          //if empty error message pops up and returns to the same page
        } else {
          alert("username and roomname are must !");
          window.location.reload();
        }
      };
    
    return (
        <div className="home" style={{  
          backgroundImage: `url("https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}>
            <div className="loginscreen">
            
                <input type="text" className="input" placeholder="ENTER YOUR NAME" onChange={(e) => setUsername(e.target.value)}/>
                <Link to='/chat'>
                <button onClick={sendData} className="button" type="submit" >
                    Login 
                </button>
                </Link>
        
            </div>
            
        </div>
    )
}

export default Home




