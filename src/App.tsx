
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Pages
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ExamManagement from "./pages/ExamManagement";
import QuestionBank from "./pages/QuestionBank";
import TakeExam from "./pages/TakeExam";
import ExamResults from "./pages/ExamResults";
import NotFound from "./pages/NotFound";

// Create protected route component
const ProtectedRoute = ({ children, allowedRoles }: { children: JSX.Element, allowedRoles: string[] }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    } else if (user.role === "teacher") {
      return <Navigate to="/teacher" replace />;
    } else if (user.role === "student") {
      return <Navigate to="/student" replace />;
    }
  }
  
  return children;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/teacher" 
              element={
                <ProtectedRoute allowedRoles={["teacher"]}>
                  <TeacherDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student" 
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/exams" 
              element={
                <ProtectedRoute allowedRoles={["admin", "teacher"]}>
                  <ExamManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/questions" 
              element={
                <ProtectedRoute allowedRoles={["admin", "teacher"]}>
                  <QuestionBank />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/exam/:id" 
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <TakeExam />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/results/:id?" 
              element={
                <ProtectedRoute allowedRoles={["admin", "teacher", "student"]}>
                  <ExamResults />
                </ProtectedRoute>
              } 
            />
            
            {/* Redirect root to login or dashboard based on auth status */}
            <Route 
              path="/" 
              element={<Navigate to="/login" replace />} 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
