function palindromeCheck(text) {
    let objectNumber = convertTextToCharObjectNumber(text);

    return hasMoreThanOneOddCharInObject(objectNumber) ? 0 : 1;
}

function isValidCharCode(code) {
    return code >= 97 && code <= 122;
}

function convertTextToCharObjectNumber(text) {
    let result = {};

    for (let i = 0; i < text.length; i++) {
        if (isValidCharCode(text.charCodeAt(i))) {
            if (result.hasOwnProperty(text.charCodeAt(i))) {
                result[text.charCodeAt(i)] = result[text.charCodeAt(i)] + 1;
            } else {
                result[text.charCodeAt(i)] = 1;
            }
        }
    }

    return result;
}

function hasMoreThanOneOddCharInObject(objectNumber) {
    let odds = 0;

    for (let i in objectNumber) {
        if (objectNumber[i] % 2 !== 0) {
            odds++;
        }
    }

    return odds > 1;
}