import styles from './Input.module.css'
import React from 'react'

const Input = (props) => {
    return (
        <div className={styles.input_holder}>
            <label className={styles.label}>{props.label}</label>
            <input {...props}  className={styles.input} />
        </div>
    )
}

export default Input