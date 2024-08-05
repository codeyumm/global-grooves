import dynamic from 'next/dynamic';

// Dynamically import the GlobeMap component with SSR disabled
const GlobeMap = dynamic(() => import('../components/globemap'), {
  ssr: false, // Disable server-side rendering for this component
});

export default function MapPage() {
  return (
    <div>
      <GlobeMap />
    </div>
  );
}
