import React from 'react';
import styles from './Button.module.css';
import { Link } from 'react-router-dom';

const Button = (props) => {
  return (
    <Link to='/sign-in'>
      <button className={`${styles.btn} ${props.hide}`}>{props.text}</button>
    </Link>
  );
}

export default Button;