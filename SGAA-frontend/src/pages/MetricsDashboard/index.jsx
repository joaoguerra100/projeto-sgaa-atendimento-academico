import styles from './MetricsDashboard.module.css'
import api from '../../services/api'
import { useEffect, useState } from 'react'

const MetricsDashboard = () => {
    const [metricas, setMetricas] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchMetricas = async () => {
            try {
                const response = await api.get('/Solicitacoes/metricas')
                setMetricas(response.data)
            } catch (error) {
                console.error("erro ao buscar metricas:", error)
                setError('Falha ao carregar as métricas. Você tem permissão para ver esta página?');
            }
        }
        fetchMetricas()
    }, [])

    if (error) {
        return <div className={styles.metricsContainer}><p className={styles.error}>{error}</p></div>;
    }

    if (!metricas) {
        return <div className={styles.metricsContainer}><p>Carregando métricas...</p></div>;
    }

    return (
        <div className={styles.metricsContainer}>
            <h1>Métricas de Atendimento</h1>
            <p>Visão geral do desenpenho da Secretaria Academica</p>

            <div className={styles.cardGrid}>

                {/* Card 1 - Total */}
                <div className={styles.card}>
                    <h2>{metricas.totalSolicitacoes}</h2>
                    <p>Total de Solicitações</p>
                </div>

                {/* Card 2 - Pendentes */}
                <div className={`${styles.card} ${styles.pendente}`}>
                    <h2>{metricas.pendentes}</h2>
                    <p>Pendentes</p>
                </div>

                {/* Card 3 - Em Análise */}
                <div className={`${styles.card} ${styles.emAnalise}`}>
                    <h2>{metricas.emAnalise}</h2>
                    <p>Em Análise</p>
                </div>

                {/* Card 4 - Concluídas */}
                <div className={`${styles.card} ${styles.concluido}`}>
                    <h2>{metricas.concluidas}</h2>
                    <p>Concluídas</p>
                </div>

                {/* Card 4 - Avaliacao */}
                <div className={`${styles.card} ${styles.avaliacao}`}>
                    <h2>{metricas.avaliacaoMedia ? metricas.avaliacaoMedia.toFixed(1) : 'N/A'}</h2>
                    <p>Avaliação Média</p>
                </div>

            </div>
        </div>
    )
}

export default MetricsDashboard