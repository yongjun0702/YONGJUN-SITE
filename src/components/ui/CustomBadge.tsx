import React from 'react';

interface CustomBadgeProps {
  children: React.ReactNode;
  className?: string;
  borderColorClass?: string;
}

export function CustomBadge({ 
  children, 
  className = '', 
  borderColorClass = 'border-transparent' 
}: CustomBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium border ${borderColorClass} ${className}`.trim()}
    >
      {children}
    </span>
  );
} 