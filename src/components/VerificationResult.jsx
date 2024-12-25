export function VerificationResult({ result }) {
  if (!result) return null;

  return (
    <div className="mt-6 p-4 rounded-md bg-gray-50">
      <h2 className="text-lg font-medium mb-2">Verification Result:</h2>
      <p className={`text-${result.verified ? 'green' : 'red'}-600`}>
        {result.verified
          ? `✅ Verified! ${result.isOldEnough ? 'Age requirement met' : 'Age requirement not met'}`
          : '❌ Verification failed'}
      </p>
      {result.error && (
        <p className="text-red-600 mt-2">{result.error}</p>
      )}
    </div>
  );
}