import React, { ReactNode, useState } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ic-cyan disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-ic-cyan text-ic-darkBg hover:bg-ic-cyanLight hover:shadow-lg hover:shadow-ic-cyan/30 border border-transparent",
    secondary: "bg-transparent text-ic-textWhite border-2 border-ic-cyan hover:bg-ic-cyan/10 hover:shadow-lg hover:shadow-ic-cyan/20",
    outline: "bg-transparent text-ic-textWhite border-2 border-ic-textMuted hover:border-ic-cyan hover:text-ic-cyan transition-colors",
    danger: "bg-ic-danger text-white hover:bg-red-700 border border-transparent",
    ghost: "bg-transparent text-ic-cyan hover:bg-ic-cyan/10"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-3 text-lg"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="mb-4 w-full">
      {label && <label className="block text-sm font-semibold text-ic-textWhite mb-1">{label}</label>}
      <input
        className={`w-full px-4 py-2 border rounded focus:ring-2 focus:ring-ic-cyan focus:border-ic-cyan outline-none transition-all bg-ic-darkBg3 text-ic-textWhite placeholder-ic-textMuted ${error ? 'border-ic-danger' : 'border-ic-darkBg4'} ${className}`}
        {...props}
      />
      {error && <p className="text-ic-danger text-xs mt-1">{error}</p>}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: string[];
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({ label, options, placeholder, className = '', ...props }) => {
  return (
    <div className="mb-4 w-full">
      {label && <label className="block text-sm font-semibold text-ic-textWhite mb-1">{label}</label>}
      <select
        className={`w-full px-4 py-2 border border-ic-darkBg4 rounded focus:ring-2 focus:ring-ic-cyan focus:border-ic-cyan outline-none bg-ic-darkBg3 text-ic-textWhite ${className}`}
        {...props}
      >
        {placeholder && <option value="" disabled selected>{placeholder}</option>}
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="mb-4 w-full">
      {label && <label className="block text-sm font-semibold text-ic-textWhite mb-1">{label}</label>}
      <textarea
        className={`w-full px-4 py-2 border rounded focus:ring-2 focus:ring-ic-cyan focus:border-ic-cyan outline-none transition-all bg-ic-darkBg3 text-ic-textWhite placeholder-ic-textMuted resize-vertical ${error ? 'border-ic-danger' : 'border-ic-darkBg4'} ${className}`}
        {...props}
      />
      {error && <p className="text-ic-danger text-xs mt-1">{error}</p>}
    </div>
  );
};

export const Card: React.FC<{ children: ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => (
  <div
    className={`bg-ic-darkBg2 rounded-lg shadow-lg p-6 border border-ic-darkBg4 text-ic-textWhite ${onClick ? 'cursor-pointer hover:shadow-xl hover:shadow-ic-cyan/20 hover:border-ic-cyan/40 transition-all duration-300' : 'hover:shadow-lg hover:shadow-ic-cyan/10'} ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

export const Badge: React.FC<{ type: 'success' | 'warning' | 'info' | 'danger'; children: ReactNode }> = ({ type, children }) => {
  const styles = {
    success: "bg-ic-success/20 text-ic-success border border-ic-success/30",
    warning: "bg-ic-warning/20 text-ic-warning border border-ic-warning/30",
    info: "bg-ic-cyan/20 text-ic-cyanLight border border-ic-cyan/30",
    danger: "bg-ic-danger/20 text-ic-danger border border-ic-danger/30",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[type]}`}>
      {children}
    </span>
  );
};

export const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: ReactNode }> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
      <div className="bg-ic-darkBg2 rounded-lg shadow-2xl shadow-ic-cyan/10 w-full max-w-md max-h-[90vh] overflow-y-auto border border-ic-darkBg4">
        <div className="flex justify-between items-center p-4 border-b border-ic-darkBg4">
          <h3 className="text-lg font-bold text-ic-textWhite">{title}</h3>
          <button onClick={onClose} className="text-ic-textMuted hover:text-ic-cyan text-2xl transition-colors">&times;</button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export const Accordion: React.FC<{ items: { title: string; content: string }[] }> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="border border-ic-darkBg4 rounded-lg overflow-hidden bg-ic-darkBg2/50">
          <button
            className="w-full px-6 py-4 text-left flex justify-between items-center bg-ic-darkBg2 hover:bg-ic-darkBg3 hover:border-l-2 hover:border-ic-cyan focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ic-cyan transition-all"
            onClick={() => toggle(index)}
            aria-expanded={activeIndex === index}
          >
            <span className="font-semibold text-ic-textWhite">{item.title}</span>
            <span className="text-ic-cyan text-xl transform transition-transform duration-200" style={{ transform: activeIndex === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              &#x2304;
            </span>
          </button>
          {activeIndex === index && (
            <div className="px-6 py-4 bg-ic-darkBg3/50 text-ic-textMuted text-sm leading-relaxed border-t border-ic-darkBg4">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};