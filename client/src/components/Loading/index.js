import React, { Component } from 'react';
import spinner from './Spinner.svg';

import './styles.scss';

export const Loading = () => {
    return <img src={spinner} alt="spinner" className="spinner"/>
}