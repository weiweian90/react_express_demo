import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
    render() {
        return (
            <div>
                <h2>Home</h2>
                <Link to="/" style={{marginRight: 12}}>首页</Link>
                <Link to="/about">about</Link>
            </div>
        );
    }
}