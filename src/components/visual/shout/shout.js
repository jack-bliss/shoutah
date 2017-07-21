import React from 'react';

import './shout.css';

function parseTime(ms){
    var d = new Date(ms);
    return d.getHours() + ":" + d.getMinutes();
}

const Shout = props => (
    <div className="shout">
        <div className="time">
            {parseTime(props.shout.time)}
        </div>
        <div className="author">
             {props.shout.author.name}
        </div>
        <div className="body">
            {props.shout.body}
        </div>
    </div>
)

export default Shout;