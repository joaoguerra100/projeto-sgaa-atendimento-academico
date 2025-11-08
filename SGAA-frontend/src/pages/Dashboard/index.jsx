import styles from './Dashboard.module.css'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import Rating from '../../components/Rating'
import { FaStar } from 'react-icons/fa'

const Dashboard = () => {
    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')

    const [solicitacoes, setSolicitacoes] = useState([])
    const [error, setError] = useState('')

    const fetchSolicitacoes = async () => {
        try {
            const response = await api.get('/solicitacoes/minhas')
            setSolicitacoes(response.data)
        } catch (error) {
            console.error("Erro ao buscar solicitacoes", error)
            setError('Falha ao carregar suas solicitações.')
        }
    }

    useEffect(() => {
        fetchSolicitacoes()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')
        if (!titulo || !descricao) {
            setError('Título e Descrição são obrigatórios.')
            return
        }

        try {
            await api.post('/Solicitacoes', { titulo, descricao })

            setTitulo('')
            setDescricao('')
            fetchSolicitacoes()
        } catch (error) {
            console.error("Erro ao criar solicitação:", error);
            setError('Falha ao criar sua solicitação. Tente novamente.');
        }
    }

    const handleAvaliar = async (solicitacaoId, nota) => {
        try {
            await api.put(`/solicitacoes/${solicitacaoId}/avaliar`, { nota })
            // Atualiza a lista para esconder o component de avaliação
            fetchSolicitacoes()
        } catch (error) {
            console.error("Erro ao avaliar:", error)
            alert("Não foi possível registrar sua avaliação.")
        }
    }

    return <div className={styles.dasboadContainer}>

        <div className={styles.content}>
            {/* Criar nova solicitacao */}
            <div className={styles.formBox}>
                <h2>Nova Solicitação</h2>
                <form onSubmit={handleSubmit}>

                    <div className={styles.inputGroup}>
                        <label htmlFor="titulo">Titulo</label>
                        <input
                            type="text"
                            id='titulo'
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="descricao">Descrição</label>
                        <textarea
                            id='descricao'
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <button type='submit' className={styles.submitButton}>Enviar Solicitação</button>

                </form>

            </div>

            {/* Minhas Solicitações */}
            <div className={styles.listBox}>
                <h2>Minhas Solicitações</h2>
                {solicitacoes.length === 0 ? (
                    <p>Você ainda não tem nenhuma solicitação.</p>
                ) : (
                    <ul className={styles.solicitacaoList}>
                        {solicitacoes.map((sol) => (
                            <li key={sol.id} className={styles.solicitacaoItem}>
                                <div className={styles.itemHeader}>

                                    <div>
                                        <strong>{sol.titulo}</strong>
                                        <p>{sol.descricao.substring(0, 100)}...</p>
                                    </div>

                                    <span className={`${styles.status} ${styles[sol.status.toLowerCase().replace(' ', '')]}`}> {/* Status */}
                                        {sol.status}
                                    </span>

                                </div>

                                {sol.status === 'Concluído' && sol.avaliacao == null && (
                                    <Rating solicitacaoId={sol.id} onAvaliar={handleAvaliar} />
                                )}
                                {sol.status === 'Concluído' && sol.avaliacao !== null && (
                                    <div className={styles.avaliacaoFeita}>
                                        Sua avaliação: {sol.avaliacao} <FaStar color="#ffc107" />
                                    </div>
                                )}
                                
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </div>
    </div>
}

export default Dashboard