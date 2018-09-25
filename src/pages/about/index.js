import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    PLUS,
    MINUS
} from '../../action';

// import './style.less';

const mapStateToProps = (state) => ({
    count: state.count
});

const mapDispathToProps = (dispatch) => ({
    plus: () => {
        dispatch({
            type: PLUS
        });
    },
    minus: () => {
        dispatch({
            type: MINUS
        });
    }
});

class About extends Component {
    render() {
        return (
            <div>
                <h2>About</h2>
                <Link to="/">首页</Link>
                <div className="home_content">
                    <div onClick={() => {this.props.minus();}}>-</div>
                    <div>{this.props.count}</div>
                    <div onClick={() => {this.props.plus();}}>+</div>
                </div>
            </div>
        );
    }
}
export default connect(
    mapStateToProps,
    mapDispathToProps
)(About);
