import React from 'react'
import dateformat from 'dateformat';

import styles from './WeatherDetail.module.css';

const WeatherDetail = (props) => {
    const today = new Date();
    return(
        <div className={styles.WeatherDetailsWrapper}>
            <div className={styles.WeatherDetailsTitle}>
                <h1>{props.city}</h1>
                <span className={styles.DateWrapper}>{dateformat(today, "dddd, mmmm dS")}</span>
            </div>
            <div className={styles.WeatherInfoWrapper}>
                <div className={styles.WeatherIconWrapper}>
                        <img 
                            src={require(`../Asset/Images/${props.desc}.svg`)}
                            alt={props.desc}
                        />
                </div>
                <div className={styles.WeatherDataWrapper}>
                    <div className={styles.TemperatureWrapper}> 
                        <span className={styles.TemperatureSymbol}>{Math.round(props.temp)}º</span>
                        <span className={styles.Description}>{props.desc}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherDetail;