const encrypt = require("./encrypt");

let supported_langs = ["EN", "RU"];
supported_langs.forEach(function(lang) {
    it(lang + " language", () => {
        expect(() => {
            encrypt(lang, "text", "ROT1");
        }).not.toThrow("Unsupported language " + lang);
    });
});

let unsupported_langs = ["LV", "DE", "SL", "CR", "SA", "MO", "LA", "JA", "BR", "FR"];
unsupported_langs.forEach(function(lang) {
    it(lang + " langauge", () => {
        expect(() => {
            encrypt(lang, "text", "ROT1");
        }).toThrow("Unsupported language " + lang);
    });
});

for (let i = 1; i <= 3; i++) {
    let cipher = "ROT" + Number(Math.floor(Math.random() * 20) + 1).toString();
    it(cipher, () => {
        expect(() => {
            encrypt("EN", "text", cipher);
        }).not.toThrow("Unsupported cipher " + cipher);
    });
}

let unsupported_ciphers = ["Atabash", "Caesar", "Pigpen", "Book", "Trifid"];
unsupported_ciphers.forEach(function(cipher) {
    it(cipher + " cipher", () => {
        expect(() => {
            encrypt("EN", "text", cipher);
        }).toThrow("Unsupported cipher " + cipher);
    });
});

supported_langs.forEach(function(lang) {
    it("ROT40 " + lang, () => {
        expect(() => {
            encrypt(lang, "text", "ROT40")
        }).toThrow("To big ROT value");
    });
});

it("ROT1 we are continuing our journey", () => {
    expect(encrypt("EN", "we are continuing our journey", "ROT1")).toMatch("xf bsf dpoujovjoh pvs kpvsofz");
});

it("ROT9 next episode", () => {
    expect(encrypt("EN", "next episode", "ROT9")).toMatch("wngc nyrbxmn");
});

it("ROT1 Карманный справочник", () => {
    expect(encrypt("RU", "Карманный справочник", "ROT1")).toMatch("Лбснбооьк трсбгпшойл");
});

it("ROT10 Словарь", () => {
    expect(encrypt("RU", "Словарь", "ROT10")).toMatch("Ыхшлйъё");
});
