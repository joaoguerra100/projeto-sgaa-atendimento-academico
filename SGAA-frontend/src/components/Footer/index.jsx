import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import styles from './Footer.module.css'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className={styles.footer}>
            <div className={styles.socialLinks}>
                <a href="https://www.facebook.com/ceub/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <FaFacebook />
                </a>
                <a href="https://www.instagram.com/ceub_oficial/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <FaInstagram />
                </a>
                <a href="https://twitter.com/ceub_oficial" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <FaTwitter />
                </a>
                <a href="https://www.linkedin.com/school/ceub/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <FaLinkedin />
                </a>
            </div>
            <p className={styles.copyright}>
                © {currentYear} Centro Acadêmico Alfa. Todos os direitos reservados.
            </p>
        </footer>
    )
}

export default Footer