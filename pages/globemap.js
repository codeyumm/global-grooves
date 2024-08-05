import dynamic from 'next/dynamic';
import '../styles/global.css';

// Dynamically import the GlobeMap component with SSR disabled
const GlobeMap = dynamic(() => import('../components/globemap'), {
  ssr: false, // Disable server-side rendering for this component
});

export default function MapPage() {
  return (
    <div className='globe-container'>
      <GlobeMap />
    </div>
  );
}
