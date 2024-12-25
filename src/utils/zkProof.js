import { groth16 } from 'snarkjs';

export async function initializeCircuit() {
  try {
    // Compile the circuit if not already compiled
    await runCommand('npm run compile-circuit');
    // Run the setup
    await runCommand('npm run setup');
    return true;
  } catch (error) {
    console.error('Circuit initialization failed:', error);
    return false;
  }
}

export async function generateProof(age) {
  try {
    const input = {
      age: parseInt(age),
      minAge: 18
    };
    
    // Generate the proof
    const { proof, publicSignals } = await groth16.fullProve(
      input,
      "ageCheck_js/ageCheck.wasm",
      "circuit_final.zkey"
    );
    
    // Verify the proof
    const vKey = JSON.parse(fs.readFileSync("verification_key.json"));
    const verified = await groth16.verify(vKey, publicSignals, proof);
    
    return {
      success: true,
      proof,
      verified,
      isOldEnough: publicSignals[0] === "1"
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}