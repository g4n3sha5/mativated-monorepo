import { Hero } from './subcomponents/Hero';
import { Features } from './subcomponents/Features';
import { Buddha } from './subcomponents/Buddha';
import { useRef } from 'react';

export const Home = () => {
  const featuresRef = useRef<null | HTMLDivElement>(null);
  
  return (
    <>
      <Hero featuresRef={featuresRef} />
      <Features featuresRef={featuresRef} />
      <Buddha />
    </>
  );
};
