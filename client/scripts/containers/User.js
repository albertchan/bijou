import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(mapStateToProps, {})
export default class Cinema extends Component {
    static propTypes = {
        fetchCinemasIfNeeded: PropTypes.func.isRequired
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
