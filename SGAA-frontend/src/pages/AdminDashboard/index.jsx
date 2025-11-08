import { useEffect, useState } from 'react'
import styles from './AdminDashboard.module.css'
import api from '../../services/api'
import Modal from 'react-modal'
import { FaTimes } from 'react-icons/fa'

Modal.setAppElement('#root')

const AdminDashboard = () => {
    const [solicitacoes, setSolicitacoes] = useState([])
    const [error, setError] = useState('')

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [selectedSolicitacao, setSelectedSolicitacao] = useState(null)

    const fetchTodasSolicitacoes = async () => {
        try {
            // Chama o novo endpoint de admin
            const response = await api.get('/Solicitacoes/todas')
            setSolicitacoes(response.data)
        } catch (error) {
            console.error("Erro ao buscar solicitacoes", error)
            setError('falha ao carregar solicitacoes')
        }
    }

    useEffect(() => {
        fetchTodasSolicitacoes()
    }, [])

    const handleAtualizarStatus = async (id, novoStatus) => {
        try {
            // Chama o novo endpoint de PUT
            await api.put(`/Solicitacoes/${id}/status`, { novoStatus })
            // Recarrega a lista para mostrar a mudança
            fetchTodasSolicitacoes()
        } catch (error) {
            console.error("Erro ao atualizar status:", error)
            alert("Falha ao atualizar status.")
        }
    }

    const openModal = (solicitacao) => {
        setSelectedSolicitacao(solicitacao)
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setSelectedSolicitacao(null)
        setModalIsOpen(false)
    }

    return (
        <div className={styles.adminContainer}>
            <h1>Painel da Secretaria</h1>
            <p>Gerenciamento de todas as solicitações dos alunos</p>

            {error && <p className={styles.error}>{error}</p>}

            <table className={styles.solicitacoesTable}>
                <thead>
                    <tr>
                        <th>Aluno</th>
                        <th>Titulo</th>
                        <th>Status Atual</th>
                        <th>Ações</th>
                        <th>Detalhes</th>
                    </tr>
                </thead>

                <tbody>
                    {solicitacoes.map((sol) => (
                        <tr key={sol.id}>
                            <td>{sol.aluno ? sol.aluno.nome : 'N/A'}</td>
                            <td>{sol.titulo}</td>
                            <td>
                                <span className={`${styles.status} ${styles[sol.status.toLowerCase().replace(' ', '')]}`}>
                                    {sol.status}
                                </span>
                            </td>
                            <td className={styles.actionButtons}>
                                <button
                                    onClick={() => handleAtualizarStatus(sol.id, "Em Análise")}
                                    className={styles.btnAnalise}>
                                    Analisar
                                </button>
                                <button
                                    onClick={() => handleAtualizarStatus(sol.id, "Concluído")}
                                    className={styles.btnConcluir}>
                                    Concluir
                                </button>
                            </td>
                            <td>
                                <button onClick={() => openModal(sol)} className={styles.btnDetalhes}>
                                    Ver Detalhes
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Componente MODAL */}
            {selectedSolicitacao && (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel='Detalhes da Solicitação'
                    className={styles.modalContent}
                    overlayClassName={styles.modalOverlay}
                >
                    <button onClick={closeModal} className={styles.modalCloseButton}>
                        <FaTimes/>
                    </button>

                    <h2>Detalhes da Solicitação</h2>

                    <div className={styles.modalSection}>
                        <strong>Aluno:</strong>
                        <p>{selectedSolicitacao.aluno.nome}</p>
                    </div>

                    <div className={styles.modalSection}>
                        <strong>Email:</strong>
                        <p>{selectedSolicitacao.aluno.email}</p>
                    </div>

                    <div className={styles.modalSection}>
                        <strong>Titulo:</strong>
                        <p>{selectedSolicitacao.titulo}</p>
                    </div>

                    <div className={styles.modalSection}>
                        <strong>Descrição completa:</strong>
                        <p>{selectedSolicitacao.descricao}</p>
                    </div>

                    <div className={styles.modalSection}>
                        <strong>Status:</strong>
                        <p>{selectedSolicitacao.status}</p>
                    </div>

                </Modal>
            )}
        </div>
    )
}

export default AdminDashboard