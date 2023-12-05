import React, { useState } from 'react';
import './Join.css';
import logo from "../../assets/chat.png"
import { useHistory, Link } from "react-router-dom";

let user;

const Join = () => {
    const history = useHistory();
    const sendUser = () => {
        user = document.getElementById('joinInput').value;
        document.getElementById('joinInput').value = "";
    }

    const [name, setName] = useState("");
    const goToChat = (e) => {
        sendUser();
        // e.preventDefault();
        history.push("/chat");
    }

    return (<div className='JoinPage'>
        <div className="JoinContainer">
            <img src={logo} alt="logo" />
            <h1>MsgEnger</h1>
            <input type="text" id="joinInput" placeholder='Eneter your Name..'
                onChange={e => setName(e.target.value)}
                onKeyDownCapture={e => (e.key === 'Enter' && name) ? goToChat() : null}
            />
            <Link onClick={(event) => !name ? event.preventDefault() : null}
                to="/chat">
                <button className='joinbtn' onClick={sendUser}>Join</button>
            </Link>
        </div>
    </div>
    )
}

export default Join
export { user }
