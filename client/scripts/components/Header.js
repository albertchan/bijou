import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import classNames from 'classnames';
import i18n from 'i18next';

export default class Header extends React.Component {
    static propTypes = {

    };

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <header className="header">
                <h1 className="logo" title="Bijou">Bijou</h1>
                <nav className="navbar-right">
                    <Link to="/signup">{i18n.t('header.signup')}</Link>
                    <Link to="/login">{i18n.t('header.login')}</Link>
                </nav>
            </header>
        );
    }
}
