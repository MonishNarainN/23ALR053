import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import NotificationsPage from './pages/NotificationsPage';
import PriorityInboxPage from './pages/PriorityInboxPage';
import AdminPage from './pages/AdminPage';
import StudentInboxPage from './pages/StudentInboxPage';
import Layout from './components/Layout';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/student-inbox" element={<StudentInboxPage />} />
            <Route path="/priority-inbox" element={<PriorityInboxPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/*" element={<Navigate to="/notifications" replace />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
