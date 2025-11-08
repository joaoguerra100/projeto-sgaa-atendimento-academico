import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from '../../SGAA-frontend/src/pages/Login'
import Cadastro from '../../SGAA-frontend/src/pages/Cadastro'
import Dashboard from '../../SGAA-frontend/src/pages/Dashboard'
import ProtectedRoute from '../../SGAA-frontend/src/components/ProtectedRoute'
import Layout from './components/Layout'
import AdminDashboard from './pages/AdminDashboard'
import AdminRoute from './components/AdminRoute'
import MetricsDashboard from './pages/MetricsDashboard'

function App() {

  return (
    <>
      <Routes>
        {/* Rotas publicas */}
        <Route path='/' element={<Login />} />
        <Route path='/cadastro' element={<Cadastro />} />

        {/* Rota Privada de Aluno */}
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
        />

        {/* Rota Privada de Admin */}
        <Route
          path='/admin/dashboard'
          element={
            <ProtectedRoute>
              <AdminRoute>
                <Layout>
                  <AdminDashboard />
                </Layout>
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path='/admin/metricas'
          element={
            <ProtectedRoute>
              <AdminRoute>
                <Layout>
                  <MetricsDashboard />
                </Layout>
              </AdminRoute>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
