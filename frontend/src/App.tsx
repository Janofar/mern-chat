import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {store} from './store/store';
import Login from './pages/Login';
import ChatWindow from './pages/ChatWindow';
import ProtectedRoute from './routes/protectedRoute';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/chat-window"
            element={
              <ProtectedRoute>
                <ChatWindow />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
