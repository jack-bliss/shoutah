// react
import React from 'react';
// style
import './shout-list.css';
// components
import Shout from '../shout/shout.js';

const ShoutList = props => (
    <div className='shout-list'>
        <div className='reload-button'>
            <button onClick={props.reload}>{props.loading ? 'Loading' : 'Reload'}</button>
        </div>
        {props.shouts.map((shout, key) => (
            <Shout key={key} shout={shout} />
        )).reverse()}
    </div>
)

export default ShoutList;