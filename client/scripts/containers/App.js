import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import i18n from 'i18next';
import { resetErrorMessage } from '../actions';
import Header from '../components/Header';
import Footer from '../components/Footer';

// connect with decorator
@connect(mapStateToProps, {resetErrorMessage})
export default class App extends Component {
    static propTypes = {
        // injected by React Redux
        errorMessage: PropTypes.string,
        inputValue: PropTypes.string.isRequired,
        // injected by React Router
        children: PropTypes.node
    };

    constructor(props) {
        super(props)
    }

    render() {
        const { children, inputValue } = this.props;

        return (
            <div className="wrapper">
                <Header />
                <main className="content">
                    {children}
                </main>
                <Footer />
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        errorMessage: state.errorMessage,
        inputValue: state.routing.location.pathname.substring(1)
    }
}
