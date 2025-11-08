import { useState } from 'react'
import styles from './Rating.module.css'
import { FaStar } from 'react-icons/fa'

const Rating = ({ solicitacaoId, onAvaliar }) => {
    const [hover, setHover] = useState(null)

    return (
        <div className={styles.ratingContainer}>
            <p>Avalie este atendimento:</p>
            <div className={styles.stars}>
                {[...Array(5)].map((star, index) => {
                    const ratingValue = index + 1
                    return (
                        <label key={index}>
                            <input 
                                type="radio"
                                name={`rating-${solicitacaoId}`}
                                value={ratingValue}
                                onClick={() => onAvaliar(solicitacaoId, ratingValue)}
                            />
                            <FaStar 
                                className={styles.star}
                                color={ratingValue <= hover ? "#ffc107" : "#e4e5e9"}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(null)}
                            />
                        </label>
                    )
                })}
            </div>
        </div>
    )
}

export default Rating