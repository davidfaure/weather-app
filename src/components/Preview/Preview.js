import React from 'react';

import styles from './Preview.module.css';

const Preview = (props) => {
    return(
        <img 
            src={require('../Asset/Images/undraw_weather_notification_4sbo.svg')}
            alt="Weather icon"
            className={styles.Preview}
        />
    );
}

export default Preview;
