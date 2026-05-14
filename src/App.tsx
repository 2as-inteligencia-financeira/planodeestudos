import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ConcursoProvider } from './contexts/ConcursoContext'
import Layout from './components/Layout'
import SelectConcursoPage from './pages/SelectConcursoPage'
import PerfilPage from './pages/PerfilPage'
import LoginPage from './pages/LoginPage'
import MentorPage from './pages/MentorPage'
import DashboardPage from './pages/DashboardPage'
import CronogramaPage from './pages/CronogramaPage'
import EditalPage from './pages/EditalPage'
import QuadrixPage from './pages/QuadrixPage'
import FasesPage from './pages/FasesPage'
import ProgressoPage from './pages/ProgressoPage'
import QuestoesPage from './pages/QuestoesPage'
import SimuladosPage from './pages/SimuladosPage'
import EstudoCasoPage from './pages/EstudoCasoPage'
import TeoriaPage from './pages/TeoriaPage'

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading, isConfigured } = useAuth()
  if (!isConfigured) return <>{children}</>
  if (loading) return <div className="min-h-screen flex items-center justify-center" style={{ background: '#f0f0ea' }}>Carregando...</div>
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

function RequireMentor({ children }: { children: React.ReactNode }) {
  const { user, loading, isConfigured } = useAuth()
  if (!isConfigured) return <Navigate to="/" replace />
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

function ConcursoLayoutWrapper() {
  const { concursoId } = useParams<{ concursoId: string }>()
  return (
    <ConcursoProvider concursoId={concursoId!}>
      <Layout />
    </ConcursoProvider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/perfil" element={<RequireAuth><PerfilPage /></RequireAuth>} />
          <Route path="/mentor" element={<RequireMentor><MentorPage /></RequireMentor>} />
          <Route path="/" element={<RequireAuth><SelectConcursoPage /></RequireAuth>} />
          <Route path="/:concursoId" element={<RequireAuth><ConcursoLayoutWrapper /></RequireAuth>}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="cronograma" element={<CronogramaPage />} />
            <Route path="edital" element={<EditalPage />} />
            <Route path="teoria" element={<TeoriaPage />} />
            <Route path="questoes" element={<QuestoesPage />} />
            <Route path="simulados" element={<SimuladosPage />} />
            <Route path="estudo-caso" element={<EstudoCasoPage />} />
            <Route path="quadrix" element={<QuadrixPage />} />
            <Route path="fases" element={<FasesPage />} />
            <Route path="progresso" element={<ProgressoPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
