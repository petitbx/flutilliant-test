function smallerPrimes(number) {
    let result = [];

    if (!Number.isInteger(number)) {
        throw new Error('Parameter is not a number!');
    }

    if (number < 0) {
        return result;
    }

    for (let i = 2; i <= number; i++) {
        if (isPrime(i)) {
            result.push(i);
        }
    }

    return result;
}

function isPrime(number) {
    if (number > 1) {
        for (let i = 2; i <= Math.sqrt(number); i++) {
            if (number % i === 0) {
                return false;
            }
        }
    }

    return true;
}

// To run test, you just have to call the function smallerPrimes like :
//smallerPrimes(10);