import React from 'react';

export interface SidebarProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  active?: boolean;
  href?: string;
}
