import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';

// Layout Components
import Layout from './components/Layout';

// Pages
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PlayersPage from './pages/PlayersPage';
import PlayerDetailPage from './pages/PlayerDetailPage';
import NewPlayerPage from './pages/NewPlayerPage';
import CollectionPage from './pages/CollectionPage';
import FixturesPage from './pages/FixturesPage';
import NotFoundPage from './pages/NotFoundPage';

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute';

// Router Configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "auth/login",
        element: <LoginPage />
      },
      {
        path: "auth/register",
        element: <RegisterPage />
      },
      {
        path: "fixtures",
        element: <FixturesPage />
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        )
      },
      {
        path: "players",
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <PlayersPage />
              </ProtectedRoute>
            )
          },
          {
            path: "new",
            element: (
              <ProtectedRoute>
                <NewPlayerPage />
              </ProtectedRoute>
            )
          },
          {
            path: ":playerId",
            element: (
              <ProtectedRoute>
                <PlayerDetailPage />
              </ProtectedRoute>
            )
          }
        ]
      },
      {
        path: "collection",
        element: (
          <ProtectedRoute>
            <CollectionPage />
          </ProtectedRoute>
        )
      }
    ]
  }
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            style: {
              background: '#10b981',
            },
          },
          error: {
            duration: 5000,
            style: {
              background: '#ef4444',
            },
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
