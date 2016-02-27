import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import classNames from 'classnames';

export default class Header extends React.Component {
    static propTypes = {

    };

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <header>
                <h1 className="logo" title="Bijou">Bijou</h1>
            </header>
        );
    }
}
