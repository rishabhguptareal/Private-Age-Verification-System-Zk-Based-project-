import { groth16 } from 'snarkjs';

async function generateProof(age) {
    const input = {
        age: age,
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
        proof,
        verified,
        isOldEnough: publicSignals[0] === "1"
    };
}

// Example usage
const age = 25; // This will remain private
const result = await generateProof(age);
console.log("Proof verified:", result.verified);
console.log("Is old enough:", result.isOldEnough);