import { groth16 } from 'snarkjs';
import { writeFileSync } from 'fs';

async function setup() {
    // Generate proving and verification keys
    const { zkey, vKey } = await groth16.setup("ageCheck.r1cs", "pot12_final.ptau");
    
    // Save the verification key
    writeFileSync(
        "verification_key.json",
        JSON.stringify(vKey, null, 2)
    );
    
    console.log("Setup complete! Verification key generated.");
}

setup().catch(console.error);