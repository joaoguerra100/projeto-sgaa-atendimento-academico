import { useEffect, useRef, useState } from 'react'
import styles from './Header.module.css'
import { FaBars } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [userRole, setUserRole] = useState(null)
    const [logoLink, setLogoLink] = useState('/')

    const menuRef = useRef(null);
    const navigate = useNavigate();

    // Efeito para ler o token QUANDO o componente carregar
    useEffect(() => {
        const token = localStorage.getItem('authToken')
        if (token) {
            try {
                const decodedToken = jwtDecode(token)
                const role = decodedToken.role;

                setUserRole(role)

                // Define o link do logo baseado no perfil
                if (role === 'Secretaria') {
                    setLogoLink('/admin/dashboard')
                } else {
                    setLogoLink('/dashboard')
                }
            } catch (e) {
                console.error('Token inválido ou expirado:', e)
                handleLogout()
            }
        }
    }, [])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const handleLogout = () => {
        localStorage.removeItem('authToken')
        navigate('/')
    }

    // Efeito para fechar o menu ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [menuRef])

    return (
        <header className={styles.header}>

            <div className={styles.logoContainer}>
                <Link to={logoLink}>
                    <img src='../../../public/logo-ceub.png' alt="Logo CEUB" className={styles.logo} />
                </Link>
            </div>

            <div className={styles.menuContainer} ref={menuRef}>

                <div className={styles.menuIcon} onClick={toggleMenu}>
                    <FaBars />
                </div>

                {isMenuOpen && (
                    <nav className={styles.navMenu}>
                        <ul className={styles.navList}>

                            {userRole === 'Secretaria' && (
                                <li className={styles.navItem}>
                                    <Link to="/admin/metricas" className={styles.navLink} onClick={toggleMenu}>
                                        Métricas
                                    </Link>
                                </li>
                            )}

                            <li className={styles.navItem}>
                                <button onClick={handleLogout} className={styles.logoutButton}>
                                    Sair
                                </button>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    )
}

export default Header