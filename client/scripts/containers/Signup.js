import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(mapStateToProps, {})
export default class Signup extends Component {
    static propTypes = {

    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="">

            </div>
        );
    }
}

function mapStateToProps(state) {
    const { currentLocale } = state;

    return {
        currentLocale
    };
}
