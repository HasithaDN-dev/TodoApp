import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/auth.jsx";
import Navbar from "./components/Navbar";
import Login from "./pages/Login..jsx";
import Register from "./pages/Register";
import TodoList from "./pages/TodoList";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/" 
                element={
                  <PrivateRoute>
                    <TodoList />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/todos" 
                element={
                  <PrivateRoute>
                    <TodoList />
                  </PrivateRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;