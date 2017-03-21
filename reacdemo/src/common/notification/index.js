import React from 'react'
import reactDOM from 'react-dom'
import Contents from './contents.jsx'
// console.log(contents)
const div = document.createElement('div');
document.body.appendChild(div);

const contents=reactDOM.render(
    <Contents></Contents>,
    div
)

function create(type) {
    return (content, opts = {}) => {
        if (type) {
            opts.type = type
        }
        opts.id=new Date().getTime();
        opts.content = content;
        opts.duration = opts.duration !== undefined ? opts.duration : (opts.type === 'error' || opts.type === 'danger') ? 0 : 5;
    
        contents.addMessage(opts)
    }
}

export default {
    // show: create(),
    success: create('success'),
    info: create('info'),
    warning: create('warning'),
    error: create('error'),
    danger: create('danger')
}
