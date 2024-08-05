import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import LMP from './pages/LMP';
import Traces from './pages/Traces';
import { ThemeProvider } from './contexts/ThemeContext';
import './styles/globals.css';
import './styles/sourceCode.css';
import { useWebSocketConnection } from './hooks/useBackend';
import { Toaster, toast } from 'react-hot-toast';

const WebSocketConnectionProvider = ({children}) => {
  const { isConnected } = useWebSocketConnection();

  React.useEffect(() => {
    if (isConnected) {
      toast.success('Store connected', {
        duration: 1000,
      });
    } else {
      toast('Connecting to store...', {
        icon: '🔄',
        duration: 500,
      });
    }
  }, [isConnected]);

  return (
    <>
      {children}
      <Toaster position="top-right" />
    </>
  );
};

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <WebSocketConnectionProvider>
        <Router>
          <div className="flex min-h-screen max-h-screen bg-gray-900 text-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col max-h-screen overflow-hidden">
              <main className="flex-1 max-h-screen overflow-auto hide-scrollbar">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/lmp/:name/:id?" element={<LMP />} />
                  <Route path="/traces" element={<Traces />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
        </WebSocketConnectionProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;