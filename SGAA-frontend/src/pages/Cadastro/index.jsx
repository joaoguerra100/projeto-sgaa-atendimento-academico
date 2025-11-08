import { useState } from 'react'
import styles from './Cadastro.module.css'
import api from '../../services/api'
import { Link, useNavigate } from 'react-router-dom'

const Cadastro = () => {
    // 1. Criar os estados para os campos
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    // 2. Criar a função de submit
    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')

        if (!nome || !email || !password) {
            setError('Por favor, preencha todos os campos.');
            return
        }

        try {
            // 3. Chamar a API de registro
            await api.post('/Auth/registrar', {
                nome: nome,
                email: email,
                senha: password // O backend espera "senha", como no DTO
            })

            // 4. Sucesso: Redirecionar para o Login
            console.log('Cadastro bem-sucedido!');
            navigate('/') // Envia o usuário para a página de login

        } catch (err) {
            // 5. Tratar erros (ex: email já cadastrado)
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message)
            } else {
                setError('Ocorreu um erro ao tentar cadastrar.')
            }
            console.error('Erro no cadastro:', err)
        }
    };

    return (
        <div className={styles.cadastroContainer}>
            <div className={styles.cadastroBox}>
                <img src="logo-ceub.png" alt="Logo CEUB" className={styles.logo} />
                <h2>SGAA</h2>
                <p>Crie sua conta para começar</p>
                
                <form onSubmit={handleSubmit} className={styles.form}>

                    <div className={styles.inputGroup}>
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text" // Corrigido de "nome" para "text"
                            id='nome'
                            placeholder='Seu nome'
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </div>

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
                            required
                        />
                    </div>

                    {error && <p className={styles.error}>{error}</p>}

                    <button type='submit' className={styles.submitButton}>Cadastrar</button>
                </form>

                <p className={styles.registerLink}>
                    Já tem uma conta? <Link to="/">Faça login</Link>
                </p>

            </div>
        </div>
    )
}

export default Cadastro