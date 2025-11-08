import styles from './Layout.module.css'
import Header from '../Header'
import Footer from '../Footer'

const Layout = ({ children }) => {

    return (
        <div className={styles.layoutContainer}>
            <Header/>
            <main className={styles.mainContent}>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout