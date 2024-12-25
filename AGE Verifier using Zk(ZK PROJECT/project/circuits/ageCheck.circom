pragma circom 2.0.0;

template AgeCheck() {
    // Private input: actual age
    signal private input age;
    
    // Public input: minimum required age
    signal input minAge;
    
    // Output signal: 1 if age >= minAge, 0 otherwise
    signal output isOldEnough;
    
    // Compute if age is greater than or equal to minAge
    isOldEnough <== age >= minAge;
    
    // Add range check to ensure age is reasonable (0-150)
    signal ageInRange;
    ageInRange <== (age >= 0) && (age <= 150);
    
    // Constrain that age must be in valid range
    ageInRange === 1;
}