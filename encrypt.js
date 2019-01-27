function encrypt(language, text, cipher) {
    if (!["EN", "RU"].includes(language)) {
        throw new Error("Unsupported language " + language);
    }

    let cipher_regex = /^ROT[0-9]*$/;
    if (!cipher.match(cipher_regex)) {
        throw new Error("Unsupported cipher " + cipher);
    }

    const alphabets = {
        en: "abcdefghijklmnopqrstuvwxyz",
        ru: "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"
    }
    let alphabet;
    language == "EN" ? alphabet = alphabets.en : alphabet = alphabets.ru;

    let rot = "";
    for (let i = 3; i < cipher.length; i++) {
        rot += cipher[i];
    }
    rot = Number(rot);
    if (rot > alphabet.length) {
        throw new Error("To big ROT value");
    }

    let result = "";
    for (let i = 0; i < text.length; i++) {
        if (alphabet.includes(text[i])) {
            // processing small letters
            if (alphabet.indexOf(text[i]) + rot >= alphabet.length) {
                result += alphabet[alphabet.indexOf(text[i]) + rot - alphabet.length];
            } else {
                result += alphabet[alphabet.indexOf(text[i]) + rot];
            }
        } else if (alphabet.includes(text[i].toLowerCase())) {
            // processing capital letters
            if (alphabet.indexOf(text[i].toLowerCase()) + rot >= alphabet.length) {
                result += alphabet[alphabet.indexOf(text[i].toLowerCase()) + rot - alphabet.length].toUpperCase();
            } else {
                result += alphabet[alphabet.indexOf(text[i].toLowerCase()) + rot].toUpperCase();
            }
        } else {
            // processing other symbols
            result += text[i];
        }
    }
    return result;
}

module.exports = encrypt;
