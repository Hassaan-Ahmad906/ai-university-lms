import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Sun,
  Moon,
  Bell,
  ChevronDown,
  Menu,
  LogOut,
  User,
  Settings,
} from 'lucide-react';
import './Topbar.css';

const Topbar = ({
  theme = 'dark',
  onThemeToggle,
  user = {},
  notificationCount = 0,
  breadcrumbs = [],
  onSearch,
  onLogout,
  onMenuClick,
  className = '',
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    onSearch?.(e.target.value);
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <header className={`pu-topbar ${className}`}>
      {/* Mobile Hamburger */}
      <button
        className="pu-topbar__hamburger"
        onClick={onMenuClick}
        aria-label="Toggle menu"
      >
        <Menu />
      </button>

      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <nav className="pu-topbar__breadcrumb" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="pu-topbar__breadcrumb-sep">/</span>}
              {index === breadcrumbs.length - 1 ? (
                <span className="pu-topbar__breadcrumb-item pu-topbar__breadcrumb-item--active">
                  {crumb.label}
                </span>
              ) : (
                <a href={crumb.path} className="pu-topbar__breadcrumb-item">
                  {crumb.label}
                </a>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* Search Bar */}
      <div className="pu-topbar__search">
        <span className="pu-topbar__search-icon" aria-hidden="true">
          <Search />
        </span>
        <input
          type="text"
          className="pu-topbar__search-input"
          placeholder="Search courses, students, resources..."
          value={searchValue}
          onChange={handleSearchChange}
          aria-label="Search"
        />
      </div>

      {/* Actions */}
      <div className="pu-topbar__actions">
        {/* Theme Toggle */}
        <button
          className="pu-topbar__icon-btn"
          onClick={onThemeToggle}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun /> : <Moon />}
        </button>

        {/* Notifications */}
        <button className="pu-topbar__icon-btn" aria-label="Notifications">
          <Bell />
          {notificationCount > 0 && (
            <span className="pu-topbar__badge" aria-label={`${notificationCount} unread notifications`}>
              {notificationCount > 99 ? '99+' : notificationCount}
            </span>
          )}
        </button>

        {/* User Dropdown */}
        <div className="pu-topbar__user" ref={dropdownRef}>
          <button
            className="pu-topbar__user-trigger"
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
          >
            <div className="pu-topbar__user-avatar">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                getInitials(user.name)
              )}
            </div>
            <div className="pu-topbar__user-info">
              <div className="pu-topbar__user-name">{user.name || 'User'}</div>
              {user.role && (
                <div className="pu-topbar__user-role">{user.role}</div>
              )}
            </div>
            <span
              className={`pu-topbar__user-chevron ${
                dropdownOpen ? 'pu-topbar__user-chevron--open' : ''
              }`}
            >
              <ChevronDown />
            </span>
          </button>

          {dropdownOpen && (
            <div className="pu-topbar__dropdown" role="menu">
              <button className="pu-topbar__dropdown-item" role="menuitem">
                <User />
                My Profile
              </button>
              <button className="pu-topbar__dropdown-item" role="menuitem">
                <Settings />
                Settings
              </button>
              <div className="pu-topbar__dropdown-divider" />
              <button
                className="pu-topbar__dropdown-item pu-topbar__dropdown-item--danger"
                onClick={() => {
                  setDropdownOpen(false);
                  onLogout?.();
                }}
                role="menuitem"
              >
                <LogOut />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
