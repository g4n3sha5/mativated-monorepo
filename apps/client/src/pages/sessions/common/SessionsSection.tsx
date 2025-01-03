import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export const SessionsSection = ({ children, className = 'px-4 pt-navHeight ' }: Props) => (
  <section className={`w-full  h-full ${className}`}>{children}</section>
);