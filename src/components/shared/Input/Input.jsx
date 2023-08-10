import styles from './Input.module.css'
import React from 'react'

const Input = ({label}) => {
    return (
        <div className={styles.input_holder}>
            <label className={styles.label}>{label}</label>
            <input type="text" className={styles.input} />
        </div>
    )
}

export default Input