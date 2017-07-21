import React from 'react';

import './main-bar.css';

const MainBar = props => (
    <div className="main-bar">
        <h2>Welcome, {props.user.name}</h2>
        <form action="#" method="POST" onSubmit={props.sendShout}>
            <input type="text" onChange={props.textEntered} placeholder='Shout something...'/>
            <button onClick={props.sendBasic}>Send a Shout</button>
        </form>
    </div>
);

export default MainBar;

