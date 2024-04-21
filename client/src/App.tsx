import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import Login from './components/Login';
import Register from './components/Register';
import ProjectListPage from './components/ProjectListPage';
import './App.css';
import DesignSystemPage from './components/DesignSystemPage';
import DashboardLayout from './components/DashboardLayout';

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/auth/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/auth/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />{' '}
                <Route
                    path="/projects/:projectId"
                    element={
                        <PrivateRoute>
                            <DashboardLayout>
                                <DesignSystemPage />
                            </DashboardLayout>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/projects"
                    element={
                        <PrivateRoute>
                            <DashboardLayout>
                                <ProjectListPage />
                            </DashboardLayout>
                        </PrivateRoute>
                    }
                />
                <Route path="/" element={<Navigate to="/projects" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
