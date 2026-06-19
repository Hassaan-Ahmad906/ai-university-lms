import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import './NotFoundPage.css'

export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-bg">
        <div className="not-found-orb not-found-orb-1" />
        <div className="not-found-orb not-found-orb-2" />
      </div>
      <div className="not-found-content">
        <h1 className="not-found-code">404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <div className="not-found-actions">
          <Link to="/dashboard" className="not-found-home-btn">
            <Home size={18} />
            <span>Go to Dashboard</span>
          </Link>
          <Link to="/login" className="not-found-back-btn">
            <ArrowLeft size={18} />
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
