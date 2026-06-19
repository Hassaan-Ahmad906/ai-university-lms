import { useAuth } from '../../contexts/AuthContext'
import { User, Mail, Phone, Building2, GraduationCap, Calendar, Edit3, Camera } from 'lucide-react'
import './ProfilePage.css'

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <div className="profile-page">
      <div className="profile-cover">
        <div className="profile-cover-gradient" />
      </div>
      
      <div className="profile-main">
        <div className="profile-header">
          <div className="profile-avatar-section">
            <div className="profile-avatar-large">
              <span>{user?.firstName?.[0]}{user?.lastName?.[0]}</span>
              <button className="profile-avatar-edit">
                <Camera size={14} />
              </button>
            </div>
            <div className="profile-header-info">
              <h1>{user?.firstName} {user?.lastName}</h1>
              <p className="profile-role-text">{user?.role?.replace(/^\w/, c => c.toUpperCase())}</p>
              <p className="profile-dept">{user?.department || 'University of the Punjab'}</p>
            </div>
          </div>
          <button className="profile-edit-btn">
            <Edit3 size={16} />
            <span>Edit Profile</span>
          </button>
        </div>

        <div className="profile-grid">
          <div className="profile-card">
            <h3>Personal Information</h3>
            <div className="profile-info-list">
              <div className="profile-info-item">
                <User size={16} />
                <div>
                  <span className="profile-info-label">Full Name</span>
                  <span className="profile-info-value">{user?.firstName} {user?.lastName}</span>
                </div>
              </div>
              <div className="profile-info-item">
                <Mail size={16} />
                <div>
                  <span className="profile-info-label">Email</span>
                  <span className="profile-info-value">{user?.email}</span>
                </div>
              </div>
              <div className="profile-info-item">
                <Phone size={16} />
                <div>
                  <span className="profile-info-label">Phone</span>
                  <span className="profile-info-value">+92 300 1234567</span>
                </div>
              </div>
              <div className="profile-info-item">
                <Building2 size={16} />
                <div>
                  <span className="profile-info-label">Department</span>
                  <span className="profile-info-value">{user?.department || 'Computer Science'}</span>
                </div>
              </div>
              <div className="profile-info-item">
                <GraduationCap size={16} />
                <div>
                  <span className="profile-info-label">Role</span>
                  <span className="profile-info-value">{user?.role?.replace(/^\w/, c => c.toUpperCase())}</span>
                </div>
              </div>
              <div className="profile-info-item">
                <Calendar size={16} />
                <div>
                  <span className="profile-info-label">Joined</span>
                  <span className="profile-info-value">September 2025</span>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-card">
            <h3>Account Settings</h3>
            <div className="profile-settings-list">
              <div className="profile-setting">
                <div>
                  <span className="profile-setting-title">Two-Factor Authentication</span>
                  <span className="profile-setting-desc">Add an extra layer of security</span>
                </div>
                <label className="profile-toggle">
                  <input type="checkbox" />
                  <span className="profile-toggle-slider" />
                </label>
              </div>
              <div className="profile-setting">
                <div>
                  <span className="profile-setting-title">Email Notifications</span>
                  <span className="profile-setting-desc">Receive updates via email</span>
                </div>
                <label className="profile-toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="profile-toggle-slider" />
                </label>
              </div>
              <div className="profile-setting">
                <div>
                  <span className="profile-setting-title">SMS Alerts</span>
                  <span className="profile-setting-desc">Get important alerts via SMS</span>
                </div>
                <label className="profile-toggle">
                  <input type="checkbox" />
                  <span className="profile-toggle-slider" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
