import React from 'react'
import {useState , useEffect,useRef} from "react"
import './Chatcss.css'
import image from './images.png';

const Chat = ({username , socket}) =>  {
        const [text, setText] = useState("");
        const [messages, setMessages] = useState([]);
        console.log(username);
        // const dispatch = useDispatch();
        
        // const dispatchProcess = (encrypt, msg, cipher) => {
        //   dispatch(process(encrypt, msg, cipher));
        // };
      
        useEffect(() => {
          socket.on("message", (data) => {
            //decypt the message
            // const ans = to_Decrypt(data.text, data.username);
            // dispatchProcess(false, ans, data.text);
            // console.log(ans);
            let temp = messages;
            temp.push({
              userId: data.userId,
              username: data.username,
              text: data.text,
            });
            setMessages([...temp]);
          });
        }, [socket,messages]);
      
        const sendData = () => {
          if (text !== "") {
            //encrypt the message here
            // const ans = to_Encrypt(text);
            socket.emit("chat", text);
            setText("");
          }
        };
        const messagesEndRef = useRef(null);
      
        const scrollToBottom = () => {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        };
      
        useEffect(scrollToBottom, [messages]);
      
        // console.log(messages, "mess");

    
    return (
        <div>
            <div className="chat" style={{  
          backgroundImage: `url(${image})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}>
                <div className="user-name">
                <h2 style={{ fontSize: "1.5rem", color: "blue", fontFamily:"cursive"}}>
                    i-Chat 
                </h2>
                </div> 


                <div className="chat-message"  >
                    {messages.map((i) => {
                        // console.log({user})
                        // console.log(user)
                        // console.log(i.userId)
                        // console.log(socket.id)
                        if (i.userId === socket.id) {
                            return (
                                
                                <div className="message">
                                <p>{i.text}</p>
                                {/* <span>{i.username}</span> */}
                                </div>
                            );
                        } 
          
                        else {
                            return (
                                <div className="messRight">
                                    <p>{i.text} </p>
                                    {/* <span>{i.username}</span> */}
                                </div>
                            );
                        }
                    })
                    }  


                    <div ref={messagesEndRef} />

                </div> 

                <div className="send">
                    <input
                        placeholder="enter your message"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                sendData();
                            }
                        }}
                    />
                <button onClick={sendData}>Send</button>
                </div>


            </div>
         </div>
    )
}

export default Chat




