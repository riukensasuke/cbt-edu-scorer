import React, { ReactNode, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  FileText,
  Home,
  LineChart,
  LogOut,
  Menu,
  Settings,
  Users,
  X,
  GraduationCap,
  ChevronDown,
  ChevronRight,
  Database,
  Key,
  BookOpenCheck,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

// Updated class structure for grades only, not class subdivisions
const grades = [
  { id: "1", name: "Kelas 1" },
  { id: "2", name: "Kelas 2" },
  { id: "3", name: "Kelas 3" },
  { id: "4", name: "Kelas 4" },
  { id: "5", name: "Kelas 5" },
  { id: "6", name: "Kelas 6" }
];

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [classMenuOpen, setClassMenuOpen] = useState(false);
  const [learningMenuOpen, setLearningMenuOpen] = useState(false);
  const [expandedGrades, setExpandedGrades] = useState<Record<string, boolean>>({});
  
  // School info (would come from context or state management in a real app)
  const schoolInfo = {
    name: "SDN Contoh 1",
    address: "Jl. Pendidikan No. 123, Jakarta",
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleGradeExpanded = (grade: string) => {
    setExpandedGrades(prev => ({
      ...prev,
      [grade]: !prev[grade]
    }));
  };

  // Define navigation items based on user role
  const getNavItems = () => {
    const baseItems = [
      {
        label: "Dashboard",
        icon: <Home size={20} />,
        path: `/${user?.role}`,
      },
    ];

    if (user?.role === "admin") {
      return [
        ...baseItems,
        {
          label: "Pengguna",
          icon: <Users size={20} />,
          path: "/users",
        },
        {
          label: "Ujian",
          icon: <FileText size={20} />,
          path: "/exams",
        },
        {
          label: "Bank Soal",
          icon: <BookOpen size={20} />,
          path: "/questions",
        },
        {
          label: "Hasil Ujian",
          icon: <LineChart size={20} />,
          path: "/results",
        },
        {
          label: "Token Ujian",
          icon: <Key size={20} />,
          path: "/token",
        },
        {
          label: "Backup & Restore",
          icon: <Database size={20} />,
          path: "/backup",
        },
        {
          label: "Pengaturan",
          icon: <Settings size={20} />,
          path: "/settings",
        },
      ];
    } else if (user?.role === "teacher") {
      return [
        ...baseItems,
        {
          label: "Token Gratis",
          icon: <Key size={20} />,
          path: "/token",
        },
        {
          label: "Bank Soal",
          icon: <BookOpen size={20} />,
          path: "/questions",
        },
        {
          label: "Ujian",
          icon: <FileText size={20} />,
          path: "/exams",
        },
        {
          label: "Hasil Ujian",
          icon: <LineChart size={20} />,
          path: "/results",
        },
        {
          label: "Siswa",
          icon: <GraduationCap size={20} />,
          path: "/students",
        },
      ];
    } else {
      return [
        ...baseItems,
        {
          label: "Ujian Aktif",
          icon: <FileText size={20} />,
          path: "/exams/active",
        },
        {
          label: "Hasil Ujian",
          icon: <LineChart size={20} />,
          path: "/results",
        },
      ];
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-muted/30">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={20} />
        </Button>
        <div className="font-bold text-lg">Edu-Score</div>
        <div className="w-10"></div> {/* Placeholder for balance */}
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-sidebar transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
            <Link to={`/${user?.role}`} className="flex items-center space-x-2">
              <div className="bg-white rounded-lg p-2">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold text-white">Edu-Score</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:text-white/80 hover:bg-sidebar-accent"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </Button>
          </div>
          
          {/* School Name (visible when connected to Dapodik) */}
          {schoolInfo.name && (
            <div className="px-6 py-2 bg-sidebar-accent/20 border-b border-sidebar-border">
              <p className="text-white font-medium text-sm">{schoolInfo.name}</p>
              <p className="text-white/70 text-xs">{schoolInfo.address}</p>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <div className="space-y-1">
              {getNavItems().map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center px-3 py-2 text-sidebar-foreground rounded-md hover:bg-sidebar-accent group transition-colors"
                >
                  <span className="mr-3 text-sidebar-foreground/70 group-hover:text-sidebar-foreground">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              ))}
              
              {user?.role === "admin" && (
                <>
                  <Collapsible
                    open={classMenuOpen}
                    onOpenChange={setClassMenuOpen}
                    className="mt-4"
                  >
                    <CollapsibleTrigger asChild>
                      <button className="flex items-center justify-between w-full px-3 py-2 text-sidebar-foreground rounded-md hover:bg-sidebar-accent group transition-colors">
                        <div className="flex items-center">
                          <span className="mr-3 text-sidebar-foreground/70 group-hover:text-sidebar-foreground">
                            <GraduationCap size={20} />
                          </span>
                          <span>Daftar Kelas</span>
                        </div>
                        {classMenuOpen ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-9">
                      {grades.map((grade) => (
                        <div key={grade.id} className="mb-2">
                          <Link
                            to={`/admin/classes/${grade.id}`}
                            className="flex items-center justify-between px-3 py-1 text-sidebar-foreground rounded-md hover:bg-sidebar-accent group transition-colors text-sm"
                          >
                            <span>{grade.name}</span>
                          </Link>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>

                  <Collapsible
                    open={learningMenuOpen}
                    onOpenChange={setLearningMenuOpen}
                    className="mt-4"
                  >
                    <CollapsibleTrigger asChild>
                      <button className="flex items-center justify-between w-full px-3 py-2 text-sidebar-foreground rounded-md hover:bg-sidebar-accent group transition-colors">
                        <div className="flex items-center">
                          <span className="mr-3 text-sidebar-foreground/70 group-hover:text-sidebar-foreground">
                            <BookOpenCheck size={20} />
                          </span>
                          <span>Data Pembelajaran</span>
                        </div>
                        {learningMenuOpen ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-9 space-y-1">
                      <Link
                        to="/admin/learning-data"
                        className="flex items-center px-3 py-2 text-sidebar-foreground rounded-md hover:bg-sidebar-accent group transition-colors text-sm"
                      >
                        <span>Data Guru & Mapel</span>
                      </Link>
                    </CollapsibleContent>
                  </Collapsible>
                </>
              )}
            </div>
          </nav>

          {/* User Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-foreground">
                  {user?.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-sidebar-foreground">
                    {user?.name}
                  </p>
                  <p className="text-xs text-sidebar-foreground/70 capitalize">
                    {user?.role}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-sidebar-foreground hover:text-sidebar-foreground/80 hover:bg-sidebar-accent"
              >
                <LogOut size={18} />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Page Header */}
        <header className="sticky top-0 z-30 bg-white border-b p-4">
          <div className="container mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              {schoolInfo.name && (
                <p className="text-muted-foreground text-sm">{schoolInfo.name}</p>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm font-medium text-right">
                <div>{user?.name}</div>
                <div className="text-muted-foreground capitalize">{user?.role}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="container mx-auto">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t py-4">
          <div className="container mx-auto text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Edu-Score - Sistem Ujian Sekolah Dasar
            {schoolInfo.name && ` | ${schoolInfo.name}`}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
