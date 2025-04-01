
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { toast } from "sonner";

// Define user types
export type UserRole = "admin" | "teacher" | "student";

export interface User {
  id: string;
  name: string;
  username: string;
  role: UserRole;
  // For teachers: NIP or NUPTK
  // For students: NISN
  identificationNumber?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Mock user data
const mockUsers = [
  // Admin
  {
    id: "admin-1",
    name: "Admin User",
    username: "admin",
    role: "admin" as UserRole,
    password: "admin123"
  },
  // Teachers
  {
    id: "teacher-1",
    name: "Ibu Siti",
    username: "Ibu Siti",
    role: "teacher" as UserRole,
    identificationNumber: "198501152010012005", // NIP for PNS
    password: "198501152010012005"
  },
  {
    id: "teacher-2",
    name: "Bapak Ahmad",
    username: "Bapak Ahmad",
    role: "teacher" as UserRole,
    identificationNumber: "1234567890123456", // NUPTK for non-ASN
    password: "1234567890123456"
  },
  {
    id: "teacher-3",
    name: "Ibu Rini",
    username: "Ibu Rini",
    role: "teacher" as UserRole,
    identificationNumber: "198706142011012003", // NIP for PNS
    password: "198706142011012003"
  },
  // Students
  {
    id: "student-1",
    name: "Muhammad Andi",
    username: "Muhammad Andi",
    role: "student" as UserRole,
    identificationNumber: "0098765432", // NISN
    password: "0098765432", // NISN as password
    class: "6A"
  },
  {
    id: "student-2",
    name: "Siti Aminah",
    username: "Siti Aminah",
    role: "student" as UserRole,
    identificationNumber: "0087654321", // NISN
    password: "0087654321", // NISN as password
    class: "5A"
  },
  {
    id: "student-3",
    name: "Budi Santoso",
    username: "Budi Santoso",
    role: "student" as UserRole,
    identificationNumber: "0076543210", // NISN
    password: "0076543210", // NISN as password
    class: "4A"
  }
];

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Initializing state outside of component rendering
  const storedUser = typeof window !== 'undefined' ? localStorage.getItem("user") : null;
  const initialUser = storedUser ? JSON.parse(storedUser) : null;
  
  const [user, setUser] = useState<User | null>(initialUser);
  const [loading, setLoading] = useState<boolean>(false);

  // Login function using username instead of email
  const login = async (username: string, password: string, role: UserRole) => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Find user in mock data
      const matchedUser = mockUsers.find(
        (u) => u.username === username && u.password === password && u.role === role
      );
      
      if (matchedUser) {
        // Create user data to store (omitting password)
        const userData: User = {
          id: matchedUser.id,
          name: matchedUser.name,
          username: matchedUser.username,
          role: matchedUser.role,
          identificationNumber: matchedUser.identificationNumber
        };
        
        // Save user to state and localStorage
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        toast.success(`Login successful as ${role}`);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed: " + (error instanceof Error ? error.message : "Unknown error"));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.info("You have been logged out");
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
