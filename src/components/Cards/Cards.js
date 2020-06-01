import React from 'react'

import styles from './Cards.module.css';

const Card = (props) => {
    return(
        <div className={styles.Card}>
            {props.children}
        </div>
    );
}

export default Card;