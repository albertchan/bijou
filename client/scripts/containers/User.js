import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(mapStateToProps, {})
export default class User extends Component {
    static propTypes = {

    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                Test
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
