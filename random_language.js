document.addEventListener("DOMContentLoaded", () => {
    const texts = [
        { text: "Welcome to", language: "en" },         // English
        { text: "Bienvenido a", language: "es" },       // Spanish
        { text: "স্বাগতম", language: "bn" },            // Bengali
        { text: "स्वागत है", language: "hi" },           // Hindi
        { text: "환영합니다", language: "ko" },           // Korean
        { text: "Bienvenue à", language: "fr" },        // French
        { text: "Willkommen zu", language: "de" },      // German
        { text: "Benvenuto a", language: "it" },        // Italian
        { text: "ようこそ", language: "ja" },             // Japanese
        { text: "환영합니다", language: "ko" },           // Korean
        { text: "欢迎来到", language: "zh" },             // Chinese (Simplified)
        { text: "Bem-vindo", language: "pt" },           // Portuguese
        { text: "Добро пожаловать", language: "ru" },    // Russian
        { text: "स्वागत है", language: "hi" },           // Hindi
        { text: "Welkom", language: "nl" },              // Dutch
        { text: "Tervetuloa", language: "fi" },         // Finnish
        { text: "Välkommen", language: "sv" },          // Swedish
        { text: "Benvingut", language: "ca" },          // Catalan
        { text: "Velkommen", language: "da" },         // Danish
        { text: "স্বাগতম", language: "bn" },            // Bengali
        { text: "Dobrodošli", language: "hr" },         // Croatian
        { text: "Добро пожаловать", language: "ru" }    // Russian (Repeated)
    ];

    let currentIndex = 0;
    const randomTextElement = document.getElementById("random-text");

    // Character sets for different languages
    const charSets = {
        en: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        es: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        fr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        en: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        es: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        fr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        de: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        it: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        ja: 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん',
        ko: '가나다라마바사아자차카타파하',
        zh: '欢迎来到',
        pt: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        ru: 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯabcdefghijklmnopqrstuvwxyz ',
        hi: 'अआइईउऊऋएऐओऔकखगघचछजझटठडढणतथदधनपफबभमयरलवशषसहज्ञक्षश्र ',
        bn: 'অআইঈউঊএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহড়ঢ়য়ৎঋ ',
        nl: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        fi: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        sv: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        ca: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        da: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
    };

    function getRandomChar(originalChar, lang) {
        const charSet = charSets[lang] || charSets['en'];
        if (/[a-zA-Z0-9\s]/.test(originalChar)) {
            let randomChar;
            do {
                randomChar = charSet.charAt(Math.floor(Math.random() * charSet.length));
            } while (randomChar === originalChar);
            return randomChar;
        }
        return originalChar;
    }

    function blendCharacters(originalText, targetText, lang, callback) {
        const duration = 1300; // Duration of blending (1.5 seconds)
        const totalSteps = 28; // Number of blending steps
        const interval = duration / totalSteps; // Interval between steps
        let steps = 0;
        let currentText = randomTextElement.textContent || originalText;

        function blendStep() {
            if (steps < totalSteps) {
                let blendedText = currentText.split('').map((char, index) => {
                    if (index < targetText.length) {
                        return getRandomChar(targetText[index], lang);
                    }
                    return char;
                }).join('');
                randomTextElement.textContent = blendedText;
                steps++;
                setTimeout(blendStep, interval);
            } else {
                randomTextElement.textContent = targetText;
                setTimeout(callback, 1500); // Wait 2 seconds before moving to the next text
            }
        }

        blendStep();
    }

    function changeText() {
        const { text, language } = texts[currentIndex];
        currentIndex = (currentIndex + 1) % texts.length;

        blendCharacters(text, text, language, () => {
            setTimeout(changeText, 1500); // Keep the correct word displayed for 2 seconds before changing to the next
        });
    }

    changeText(); // Initial call to start the process
});
