import { jwtDecode } from "jwt-decode"
import { Navigate } from "react-router-dom"

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem('authToken')

    if (!token) {
        return <Navigate to="/" replace /> //se nao tem o token, vai pro login
    }

    try {
        const decodedToken = jwtDecode(token)
        // Lemos a "Role" que colocamos no token no back end
        const userRole = decodedToken.role;

        if (userRole === "Secretaria") {
            return children // E admin deixa entrar
        }else{
            return <Navigate to="/dashboard" replace /> // É Aluno, vai pro painel de Aluno
        }
    } catch (error) {
        console.error("Erro ao decodificar o token:", error)
        return <Navigate to="/" replace />; // Token inválido, vai pro Login
    }
}

export default AdminRoute