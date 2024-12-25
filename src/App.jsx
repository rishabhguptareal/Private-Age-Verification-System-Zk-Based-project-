import { useState, useEffect } from 'react';
import { AgeVerificationForm } from './components/AgeVerificationForm';
import { VerificationResult } from './components/VerificationResult';
import { initializeCircuit } from './utils/zkProof';

export default function App() {
  const [verificationResult, setVerificationResult] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [initError, setInitError] = useState(null);

  useEffect(() => {
    async function init() {
      const success = await initializeCircuit();
      setIsInitialized(success);
      if (!success) {
        setInitError('Failed to initialize ZK circuit');
      }
    }
    init();
  }, []);

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          {initError ? (
            <p className="text-red-600">{initError}</p>
          ) : (
            <p>Initializing ZK circuit...</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Private Age Verification
        </h1>
        
        <AgeVerificationForm 
          onVerificationComplete={setVerificationResult} 
        />

        <VerificationResult result={verificationResult} />
      </div>
    </div>
  );
}