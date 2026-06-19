import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/common/Sidebar/Sidebar'
import Topbar from '../components/common/Topbar/Topbar'
import { useAuth } from '../contexts/AuthContext'
import {
  LayoutDashboard, BookOpen, Users, GraduationCap, ClipboardList,
  Calendar, FileText, CreditCard, Bell, MessageSquare, BarChart3,
  Settings, Shield, Building2, Award, UserCheck, Briefcase,
  BookMarked, PenTool, ScrollText, Landmark, Brain, HelpCircle
} from 'lucide-react'
import './DashboardLayout.css'

const MENU_BY_ROLE = {
  admin: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'User Management', path: '/users', children: [
      { label: 'All Users', path: '/users' },
      { label: 'Roles & Permissions', path: '/users/roles' },
      { label: 'Bulk Import', path: '/users/import' },
    ]},
    { icon: Building2, label: 'Departments', path: '/departments' },
    { icon: BookOpen, label: 'Courses', path: '/courses' },
    { icon: Calendar, label: 'Academic Calendar', path: '/calendar' },
    { icon: CreditCard, label: 'Fee Structure', path: '/fees' },
    { icon: BarChart3, label: 'Reports & Analytics', path: '/reports' },
    { icon: Brain, label: 'AI Services', path: '/ai-config' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ],
  vc: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: BarChart3, label: 'University Analytics', path: '/analytics' },
    { icon: UserCheck, label: 'Approvals', path: '/approvals' },
    { icon: Building2, label: 'Faculties', path: '/faculties' },
    { icon: Award, label: 'Programs', path: '/programs' },
    { icon: ScrollText, label: 'Announcements', path: '/announcements' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: Brain, label: 'AI Insights', path: '/ai-insights' },
  ],
  dean: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Building2, label: 'Departments', path: '/departments' },
    { icon: Users, label: 'Faculty Members', path: '/faculty' },
    { icon: BookOpen, label: 'Courses', path: '/courses' },
    { icon: Award, label: 'Programs', path: '/programs' },
    { icon: BarChart3, label: 'Performance', path: '/performance' },
    { icon: ClipboardList, label: 'Curriculum Review', path: '/curriculum' },
    { icon: Brain, label: 'AI Analytics', path: '/ai-analytics' },
  ],
  hod: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Faculty', path: '/faculty' },
    { icon: BookOpen, label: 'Courses', path: '/courses' },
    { icon: GraduationCap, label: 'Students', path: '/students' },
    { icon: Calendar, label: 'Timetable', path: '/timetable' },
    { icon: ClipboardList, label: 'Workload', path: '/workload' },
    { icon: BarChart3, label: 'Reports', path: '/reports' },
    { icon: Brain, label: 'AI Scheduler', path: '/ai-scheduler' },
  ],
  teacher: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: BookOpen, label: 'My Courses', path: '/courses' },
    { icon: PenTool, label: 'Assignments', path: '/assignments' },
    { icon: ClipboardList, label: 'Quizzes', path: '/quizzes' },
    { icon: BookMarked, label: 'Gradebook', path: '/gradebook' },
    { icon: UserCheck, label: 'Attendance', path: '/attendance' },
    { icon: GraduationCap, label: 'Students', path: '/students' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: Calendar, label: 'Schedule', path: '/schedule' },
    { icon: Brain, label: 'AI Assistant', path: '/ai-assistant' },
  ],
  student: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: BookOpen, label: 'My Courses', path: '/courses' },
    { icon: PenTool, label: 'Assignments', path: '/assignments' },
    { icon: ClipboardList, label: 'Quizzes & Exams', path: '/exams' },
    { icon: BookMarked, label: 'Grades', path: '/grades' },
    { icon: Calendar, label: 'Timetable', path: '/timetable' },
    { icon: CreditCard, label: 'Fee & Payments', path: '/fees' },
    { icon: FileText, label: 'Transcripts', path: '/transcripts' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: Brain, label: 'AI Study Buddy', path: '/ai-assistant' },
    { icon: HelpCircle, label: 'Help & Support', path: '/support' },
  ],
  registrar: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: GraduationCap, label: 'Admissions', path: '/admissions' },
    { icon: Users, label: 'Student Records', path: '/students' },
    { icon: FileText, label: 'Transcripts', path: '/transcripts' },
    { icon: ScrollText, label: 'Certificates', path: '/certificates' },
    { icon: Landmark, label: 'Degree Audit', path: '/degree-audit' },
    { icon: BarChart3, label: 'Reports', path: '/reports' },
  ],
  treasurer: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: CreditCard, label: 'Fee Management', path: '/fees' },
    { icon: Briefcase, label: 'Scholarships', path: '/scholarships' },
    { icon: BarChart3, label: 'Financial Reports', path: '/finance-reports' },
    { icon: ScrollText, label: 'Budget', path: '/budget' },
  ],
  clerk: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: FileText, label: 'Document Queue', path: '/documents' },
    { icon: ScrollText, label: 'Transcripts', path: '/transcripts' },
    { icon: Users, label: 'Student Inquiry', path: '/inquiries' },
    { icon: Calendar, label: 'Appointments', path: '/appointments' },
  ],
}

export default function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user } = useAuth()

  const menuItems = MENU_BY_ROLE[user?.role] || MENU_BY_ROLE.student

  return (
    <div className={`dashboard-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar
        menuItems={menuItems}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
        user={user}
      />
      
      <div className="dashboard-main">
        <Topbar
          onMenuClick={() => setMobileMenuOpen(true)}
          user={user}
        />
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div 
          className="mobile-overlay" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}
