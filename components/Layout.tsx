
import React from 'react';
import { Button } from './UI';
import { User, UserRole } from '../types';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onDashboardClick: () => void;
  onHomeClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onLogout,
  onLoginClick,
  onRegisterClick,
  onDashboardClick,
  onHomeClick
}) => {
  return (
    <header className="bg-gradient-to-r from-ic-darkBg via-ic-darkBg2 to-ic-darkBg3 border-b border-ic-cyan/20 shadow-lg sticky top-0 z-40">
      <div className="bg-gradient-to-r from-ic-darkBg to-ic-darkBg2 text-white text-xs py-2 px-4 flex justify-between items-center border-b border-ic-cyan/10">
        <div className="flex gap-4 items-center">
          <span className="text-ic-textMuted">Innovation City | Internal Services Portal</span>
        </div>
        <div className="flex gap-4 items-center">
          <button className="hover:underline" aria-label="Decrease font size">A-</button>
          <button className="hover:underline" aria-label="Reset font size">A</button>
          <button className="hover:underline" aria-label="Increase font size">A+</button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity" onClick={onHomeClick}>
          {/* Innovation City Logo */}
          <img src="https://i.postimg.cc/yYCMPK4W/image.png" alt="Innovation City Logo" className="h-10 w-auto object-contain filter brightness-110" />
          <div className="flex flex-col border-l-2 border-ic-cyan pl-3">
            <h1 className="text-xl font-bold text-ic-textWhite leading-tight">IC Portal</h1>
            <span className="text-xs text-ic-textDim font-medium uppercase tracking-wider">Employee Experience Platform</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-4">
          <Button variant="ghost" onClick={onHomeClick}>Home</Button>

          <div className="h-6 w-px bg-gray-300 mx-2"></div>

          {user ? (
            <div className="flex items-center gap-3 ml-2">
              <span className="text-sm font-semibold text-gray-700 hidden lg:inline">Hello, {user.name}</span>
              <Button variant="primary" size="sm" onClick={onDashboardClick}>Dashboard</Button>
              <Button variant="outline" size="sm" onClick={onLogout}>Logout</Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-2">
              <Button variant="outline" size="sm" onClick={onLoginClick}>Login</Button>
              <Button variant="primary" size="sm" onClick={onRegisterClick}>Register</Button>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button Placeholder */}
        <div className="md:hidden flex items-center gap-2">
          {user && <span className="text-xs font-semibold text-gray-700 truncate max-w-[80px]">{user.name}</span>}
          <Button variant="ghost" aria-label="Menu" onClick={user ? onDashboardClick : onLoginClick}>
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-ic-darkBg2 to-ic-darkBg text-white py-12 mt-auto border-t border-ic-cyan/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg text-ic-textWhite mb-3">Innovation City Portal</h3>
            <p className="text-sm text-ic-textDim">Internal Employee Request Management System</p>
          </div>
          <div>
            <h4 className="font-semibold text-ic-textWhite mb-3">Quick Links</h4>
            <ul className="text-sm text-ic-textDim space-y-2">
              <li><a href="#" className="hover:text-ic-cyan transition-colors">About IC</a></li>
              <li><a href="#" className="hover:text-ic-cyan transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-ic-cyan transition-colors">Accessibility</a></li>
              <li><a href="#" className="hover:text-ic-cyan transition-colors">Contact HR</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-ic-textWhite mb-3">Contact</h4>
            <p className="text-sm text-ic-textDim">
              RAK BANK ROC Office, Ground Floor,<br />
              Al Rifaa Sheikh Mohammed Bin Zayed Road,<br />
              Ras Al Khaimah #30099
            </p>
          </div>
        </div>
        <div className="border-t border-ic-cyan/10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-ic-textDim">
          <p>&copy; {new Date().getFullYear()} Innovation City — Employee Experience Platform</p>
          <p className="mt-2 md:mt-0">All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
