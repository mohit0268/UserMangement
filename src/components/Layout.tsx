import { type ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
    {children}
  </div>
);

export default Layout;