
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { BookOpen, UserCog, Users } from "lucide-react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await login(username, password, role);
      
      // Navigate to the appropriate dashboard based on role
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "teacher") {
        navigate("/teacher");
      } else if (role === "student") {
        navigate("/student");
      }
    } catch (error) {
      console.error("Login error:", error);
      // Error is already handled in the login function
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Edu-Score</h1>
          <p className="text-lg text-gray-600">Sistem Ujian Sekolah Dasar</p>
        </div>
        
        <Card className="w-full border-2 border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Silahkan masuk untuk mengakses ujian
            </CardDescription>
          </CardHeader>
          
          <Tabs defaultValue="student" onValueChange={(value) => setRole(value as UserRole)} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4 mx-4">
              <TabsTrigger value="student" className="flex items-center gap-2">
                <Users size={18} /> Siswa
              </TabsTrigger>
              <TabsTrigger value="teacher" className="flex items-center gap-2">
                <BookOpen size={18} /> Guru
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <UserCog size={18} /> Admin
              </TabsTrigger>
            </TabsList>
            
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Nama Pengguna</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder={role === "student" ? "Nama lengkap siswa" : role === "teacher" ? "Nama lengkap guru" : "Username admin"}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder={role === "student" ? "NISN" : role === "teacher" ? "NIP/NUPTK" : "Password admin"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <TabsContent value="student">
                  <div className="mt-4 mb-2">
                    <p className="text-sm text-muted-foreground">
                      Masukkan nama lengkap dan NISN sebagai password.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="teacher">
                  <div className="mt-4 mb-2">
                    <p className="text-sm text-muted-foreground">
                      Masukkan nama lengkap dan NIP (PNS) atau NUPTK (non-ASN) sebagai password.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="admin">
                  <div className="mt-4 mb-2">
                    <p className="text-sm text-muted-foreground">
                      Gunakan username dan password default administrator.
                    </p>
                  </div>
                </TabsContent>
                
                <CardFooter className="flex justify-center pt-6 px-0">
                  <Button 
                    type="submit" 
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {isSubmitting ? "Memproses..." : "Masuk"}
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Tabs>
        </Card>
        
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Edu-Score - Sistem Ujian Sekolah Dasar</p>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;
