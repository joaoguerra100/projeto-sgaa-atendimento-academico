import { useState } from 'react'
import styles from './Login.module.css'
import api from '../../services/api'
import { Link, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')

        if (!email || !password) {
            setError('Por favor, preencha todos os campos.')
            return
        }

        try {
            const response = await api.post('/Auth/login', {
                email: email,
                senha: password
            })

            const { token } = response.data
            localStorage.setItem('authToken', token)

            const decodedToken = jwtDecode(token)
            const userRole = decodedToken.role;

            if(userRole === "Secretaria"){
                navigate('/admin/dashboard')
            }else{
                navigate('/dashboard')
            }
        } catch (err) {
            setError('Email ou senha inválidos.')
            console.error('Erro no login:', err)
        }
    }

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginBox}>
                <img src="logo-ceub.png" alt="Logo CEUB" className={styles.logo} />
                <h2>SGAA</h2>
                <p>Sistema de Gestão de Atendimento Acadêmico</p>
                <form onSubmit={handleSubmit} className={styles.form}>

                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id='email'
                            placeholder='seu.email@aluno.ceub.br'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id='password'
                            placeholder='Sua senha'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                    </div>

                    {error && <p className={styles.error}>{error}</p>}
                    <button type='submit' className={styles.submitButton}>Entrar</button>
                </form>
                <p className={styles.registerLink}>
                    Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
                </p>
            </div>
        </div>
    )
}

export default Login