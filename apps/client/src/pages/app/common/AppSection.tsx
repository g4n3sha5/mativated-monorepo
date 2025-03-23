import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export const AppSection = ({ children, className }: Props) => (
  <section className={`w-full  h-full ${className} px-4 pt-navHeight `}>{children}</section>
);
