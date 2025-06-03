// Quiz data and functionality
document.addEventListener("DOMContentLoaded", function() {
    // DOM Elements
    const startScreen = document.getElementById("start-screen");
    const quizScreen = document.getElementById("quiz-screen");
    const resultsScreen = document.getElementById("results-screen");
    const startButton = document.getElementById("start-button");
    const nextButton = document.getElementById("next-button");
    const restartButton = document.getElementById("restart-button");
    const questionTypeElement = document.getElementById("question-type");
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const feedbackElement = document.getElementById("feedback");
    const progressBar = document.getElementById("progress-bar");
    const questionCounter = document.getElementById("question-counter");
    const scoreDisplay = document.getElementById("score-display");
    const finalScore = document.getElementById("final-score");
    const correctAnswers = document.getElementById("correct-answers");
    const wrongAnswers = document.getElementById("wrong-answers");
    const achievementElement = document.getElementById("achievement");
    const confettiContainer = document.getElementById("confetti-container");

    // Quiz state
    let currentQuestionIndex = 0;
    let score = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let selectedOption = null;

    // Type labels for display
    const typeLabels = {
        "german_to_turkish": "Almanca - Türkçe Çeviri",
        "turkish_to_german": "Türkçe - Almanca Çeviri",
        "german_answer": "Almanca Soru - Cevap",
        "spelling": "Doğru Yazılış"
    };

    // Quiz questions data - embedded directly
    const questions = [
        {
            "type": "german_to_turkish",
            "question": "Was machst du gern?",
            "correctAnswer": "Ne yapmaktan hoşlanırsın?",
            "options": [
                "Ne yapmaktan hoşlanırsın?",
                "Spor yapmayı sever misin?",
                "Kaç yaşındasın?",
                "Öğretmeninin adı ne?"
            ]
        },
        {
            "type": "german_to_turkish",
            "question": "Magst du Sport?",
            "correctAnswer": "Spor yapmayı sever misin?",
            "options": [
                "Spor yapmayı sever misin?",
                "Ne yapmaktan hoşlanırsın?",
                "Bu nasıl yazılır?",
                "En sevdiğin ders nedir?"
            ]
        },
        {
            "type": "german_to_turkish",
            "question": "Liest du gern Comics?",
            "correctAnswer": "Çizgi roman okumayı sever misin?",
            "options": [
                "Çizgi roman okumayı sever misin?",
                "Film izlemeyi sever misin?",
                "Müzik dinlemeyi sever misin?",
                "Bisiklet sürmeyi sever misin?"
            ]
        },
        {
            "type": "german_to_turkish",
            "question": "Triffst du gern Freunde?",
            "correctAnswer": "Arkadaşlarla buluşmayı sever misin?",
            "options": [
                "Arkadaşlarla buluşmayı sever misin?",
                "Sinemaya gitmeyi sever misin?",
                "Piyano çalmayı sever misin?",
                "Çizgi roman okumayı sever misin?"
            ]
        },
        {
            "type": "german_to_turkish",
            "question": "Fährst du gern Rad?",
            "correctAnswer": "Bisiklet sürmeyi sever misin?",
            "options": [
                "Bisiklet sürmeyi sever misin?",
                "Arkadaşlarla buluşmayı sever misin?",
                "Film izlemeyi sever misin?",
                "Müzik dinlemeyi sever misin?"
            ]
        },
        {
            "type": "german_to_turkish",
            "question": "Gehst du gern ins Kino?",
            "correctAnswer": "Sinemaya gitmeyi sever misin?",
            "options": [
                "Sinemaya gitmeyi sever misin?",
                "Bisiklet sürmeyi sever misin?",
                "Piyano çalmayı sever misin?",
                "Çizgi roman okumayı sever misin?"
            ]
        },
        {
            "type": "german_to_turkish",
            "question": "Siehst du gern Filme?",
            "correctAnswer": "Film izlemeyi sever misin?",
            "options": [
                "Film izlemeyi sever misin?",
                "Müzik dinlemeyi sever misin?",
                "Arkadaşlarla buluşmayı sever misin?",
                "Bisiklet sürmeyi sever misin?"
            ]
        },
        {
            "type": "german_to_turkish",
            "question": "Hörst du gern Musik?",
            "correctAnswer": "Müzik dinlemeyi sever misin?",
            "options": [
                "Müzik dinlemeyi sever misin?",
                "Film izlemeyi sever misin?",
                "Sinemaya gitmeyi sever misin?",
                "Çizgi roman okumayı sever misin?"
            ]
        },
        {
            "type": "german_to_turkish",
            "question": "Spielst du gern Gitarre?",
            "correctAnswer": "Gitar çalmayı sever misin?",
            "options": [
                "Gitar çalmayı sever misin?",
                "Piyano çalmayı sever misin?",
                "Basketbol oynamayı sever misin?",
                "Hokey oynamayı sever misin?"
            ]
        },
        {
            "type": "german_to_turkish",
            "question": "Spielst du gern Klavier?",
            "correctAnswer": "Piyano çalmayı sever misin?",
            "options": [
                "Piyano çalmayı sever misin?",
                "Gitar çalmayı sever misin?",
                "Basketbol oynamayı sever misin?",
                "Hokey oynamayı sever misin?"
            ]
        },
        {
            "type": "german_to_turkish",
            "question": "Spielst du gern Basketball?",
            "correctAnswer": "Basketbol oynamayı sever misin?",
            "options": [
                "Basketbol oynamayı sever misin?",
                "Hokey oynamayı sever misin?",
                "Gitar çalmayı sever misin?",
                "Piyano çalmayı sever misin?"
            ]
        },
        {
            "type": "german_to_turkish",
            "question": "Spielst du gern Hockey?",
            "correctAnswer": "Hokey oynamayı sever misin?",
            "options": [
                "Hokey oynamayı sever misin?",
                "Basketbol oynamayı sever misin?",
                "Gitar çalmayı sever misin?",
                "Piyano çalmayı sever misin?"
            ]
        },
        {
            "type": "german_to_turkish",
            "question": "Spielst du gern Computerspiele?",
            "correctAnswer": "Bilgisayar oyunları oynamayı sever misin?",
            "options": [
                "Bilgisayar oyunları oynamayı sever misin?",
                "Ödev yapmayı sever misin?",
                "Karate yapmayı sever misin?",
                "Büyükanne ve büyükbabayı ziyaret etmeyi sever misin?"
            ]
        },
        {
            "type": "german_to_turkish",
            "question": "Machst du gern Hausaufgaben?",
            "correctAnswer": "Ödev yapmayı sever misin?",
            "options": [
                "Ödev yapmayı sever misin?",
                "Bilgisayar oyunları oynamayı sever misin?",
                "Karate yapmayı sever misin?",
                "Büyükanne ve büyükbabayı ziyaret etmeyi sever misin?"
            ]
        },
        {
            "type": "german_to_turkish",
            "question": "Machst du gern Karate?",
            "correctAnswer": "Karate yapmayı sever misin?",
            "options": [
                "Karate yapmayı sever misin?",
                "Ödev yapmayı sever misin?",
                "Bilgisayar oyunları oynamayı sever misin?",
                "Büyükanne ve büyükbabayı ziyaret etmeyi sever misin?"
            ]
        },
        {
            "type": "german_to_turkish",
            "question": "Besuchst du gern Oma und Opa?",
            "correctAnswer": "Büyükanne ve büyükbabayı ziyaret etmeyi sever misin?",
            "options": [
                "Büyükanne ve büyükbabayı ziyaret etmeyi sever misin?",
                "Karate yapmayı sever misin?",
                "Ödev yapmayı sever misin?",
                "Bilgisayar oyunları oynamayı sever misin?"
            ]
        },
        {
            "type": "german_to_turkish",
            "question": "Magst du Erdbeereis?",
            "correctAnswer": "Çilekli dondurmayı sever misin?",
            "options": [
                "Çilekli dondurmayı sever misin?",
                "Çikolatalı dondurmayı sever misin?",
                "Vanilyalı dondurmayı sever misin?",
                "Limonlu dondurmayı sever misin?"
            ]
        },
        {
            "type": "german_to_turkish",
            "question": "Magst du Schokoladeneis?",
            "correctAnswer": "Çikolatalı dondurmayı sever misin?",
            "options": [
                "Çikolatalı dondurmayı sever misin?",
                "Çilekli dondurmayı sever misin?",
                "Vanilyalı dondurmayı sever misin?",
                "Limonlu dondurmayı sever misin?"
            ]
        },
        {
            "type": "german_to_turkish",
            "question": "Magst du Vanilleeis?",
            "correctAnswer": "Vanilyalı dondurmayı sever misin?",
            "options": [
                "Vanilyalı dondurmayı sever misin?",
                "Çikolatalı dondurmayı sever misin?",
                "Çilekli dondurmayı sever misin?",
                "Limonlu dondurmayı sever misin?"
            ]
        },
        {
            "type": "german_to_turkish",
            "question": "Magst du Zitroneneis?",
            "correctAnswer": "Limonlu dondurmayı sever misin?",
            "options": [
                "Limonlu dondurmayı sever misin?",
                "Vanilyalı dondurmayı sever misin?",
                "Çikolatalı dondurmayı sever misin?",
                "Çilekli dondurmayı sever misin?"
            ]
        },
        {
            "type": "german_to_turkish",
            "question": "Magst du Gummibärchen?",
            "correctAnswer": "Jelibon ayıcıkları sever misin?",
            "options": [
                "Jelibon ayıcıkları sever misin?",
                "Şekerlemeleri sever misin?",
                "Patlamış mısırı sever misin?",
                "Bisküvileri/kurabiyeleri sever misin?"
            ]
        },
        {
            "type": "german_to_turkish",
            "question": "Was isst du zum Frühstück?",
            "correctAnswer": "Kahvaltıda ne yersin?",
            "options": [
                "Kahvaltıda ne yersin?",
                "Kahvaltıda ne içersin?",
                "Öğle yemeğinde ne yersin?",
                "Akşam yemeğinde ne yersin?"
            ]
        },
        {
            "type": "german_to_turkish",
            "question": "Was trinkst du zum Frühstück?",
            "correctAnswer": "Kahvaltıda ne içersin?",
            "options": [
                "Kahvaltıda ne içersin?",
                "Kahvaltıda ne yersin?",
                "Öğle yemeğinde ne içersin?",
                "Akşam yemeğinde ne içersin?"
            ]
        },
        {
            "type": "german_to_turkish",
            "question": "Was machst du am Wochenende?",
            "correctAnswer": "Hafta sonu ne yaparsın?",
            "options": [
                "Hafta sonu ne yaparsın?",
                "Pazartesi ne yaparsın?",
                "Salı ne yaparsın?",
                "Çarşamba ne yaparsın?"
            ]
        },
        {
            "type": "turkish_to_german",
            "question": "Ne yapmaktan hoşlanırsın?",
            "correctAnswer": "Was machst du gern?",
            "options": [
                "Was machst du gern?",
                "Magst du Sport?",
                "Wie alt bist du?",
                "Was ist dein Lieblingsfach?"
            ]
        },
        {
            "type": "turkish_to_german",
            "question": "Spor yapmayı sever misin?",
            "correctAnswer": "Magst du Sport?",
            "options": [
                "Magst du Sport?",
                "Was machst du gern?",
                "Wie schreibt man das?",
                "Wie heißt dein Lehrer?"
            ]
        },
        {
            "type": "turkish_to_german",
            "question": "Çizgi roman okumayı sever misin?",
            "correctAnswer": "Liest du gern Comics?",
            "options": [
                "Liest du gern Comics?",
                "Siehst du gern Filme?",
                "Hörst du gern Musik?",
                "Fährst du gern Rad?"
            ]
        },
        {
            "type": "turkish_to_german",
            "question": "Arkadaşlarla buluşmayı sever misin?",
            "correctAnswer": "Triffst du gern Freunde?",
            "options": [
                "Triffst du gern Freunde?",
                "Gehst du gern ins Kino?",
                "Spielst du gern Klavier?",
                "Liest du gern Comics?"
            ]
        },
        {
            "type": "turkish_to_german",
            "question": "Bisiklet sürmeyi sever misin?",
            "correctAnswer": "Fährst du gern Rad?",
            "options": [
                "Fährst du gern Rad?",
                "Triffst du gern Freunde?",
                "Siehst du gern Filme?",
                "Hörst du gern Musik?"
            ]
        },
        {
            "type": "turkish_to_german",
            "question": "Sinemaya gitmeyi sever misin?",
            "correctAnswer": "Gehst du gern ins Kino?",
            "options": [
                "Gehst du gern ins Kino?",
                "Fährst du gern Rad?",
                "Spielst du gern Klavier?",
                "Liest du gern Comics?"
            ]
        },
        {
            "type": "turkish_to_german",
            "question": "Film izlemeyi sever misin?",
            "correctAnswer": "Siehst du gern Filme?",
            "options": [
                "Siehst du gern Filme?",
                "Hörst du gern Musik?",
                "Triffst du gern Freunde?",
                "Fährst du gern Rad?"
            ]
        },
        {
            "type": "turkish_to_german",
            "question": "Müzik dinlemeyi sever misin?",
            "correctAnswer": "Hörst du gern Musik?",
            "options": [
                "Hörst du gern Musik?",
                "Siehst du gern Filme?",
                "Gehst du gern ins Kino?",
                "Liest du gern Comics?"
            ]
        },
        {
            "type": "turkish_to_german",
            "question": "Gitar çalmayı sever misin?",
            "correctAnswer": "Spielst du gern Gitarre?",
            "options": [
                "Spielst du gern Gitarre?",
                "Spielst du gern Klavier?",
                "Spielst du gern Basketball?",
                "Spielst du gern Hockey?"
            ]
        },
        {
            "type": "turkish_to_german",
            "question": "Piyano çalmayı sever misin?",
            "correctAnswer": "Spielst du gern Klavier?",
            "options": [
                "Spielst du gern Klavier?",
                "Spielst du gern Gitarre?",
                "Spielst du gern Basketball?",
                "Spielst du gern Hockey?"
            ]
        },
        {
            "type": "turkish_to_german",
            "question": "Basketbol oynamayı sever misin?",
            "correctAnswer": "Spielst du gern Basketball?",
            "options": [
                "Spielst du gern Basketball?",
                "Spielst du gern Hockey?",
                "Spielst du gern Gitarre?",
                "Spielst du gern Klavier?"
            ]
        },
        {
            "type": "turkish_to_german",
            "question": "Hokey oynamayı sever misin?",
            "correctAnswer": "Spielst du gern Hockey?",
            "options": [
                "Spielst du gern Hockey?",
                "Spielst du gern Basketball?",
                "Spielst du gern Gitarre?",
                "Spielst du gern Klavier?"
            ]
        },
        {
            "type": "turkish_to_german",
            "question": "Bilgisayar oyunları oynamayı sever misin?",
            "correctAnswer": "Spielst du gern Computerspiele?",
            "options": [
                "Spielst du gern Computerspiele?",
                "Machst du gern Hausaufgaben?",
                "Machst du gern Karate?",
                "Besuchst du gern Oma und Opa?"
            ]
        },
        {
            "type": "turkish_to_german",
            "question": "Ödev yapmayı sever misin?",
            "correctAnswer": "Machst du gern Hausaufgaben?",
            "options": [
                "Machst du gern Hausaufgaben?",
                "Spielst du gern Computerspiele?",
                "Machst du gern Karate?",
                "Besuchst du gern Oma und Opa?"
            ]
        },
        {
            "type": "turkish_to_german",
            "question": "Karate yapmayı sever misin?",
            "correctAnswer": "Machst du gern Karate?",
            "options": [
                "Machst du gern Karate?",
                "Machst du gern Hausaufgaben?",
                "Spielst du gern Computerspiele?",
                "Besuchst du gern Oma und Opa?"
            ]
        },
        {
            "type": "turkish_to_german",
            "question": "Büyükanne ve büyükbabayı ziyaret etmeyi sever misin?",
            "correctAnswer": "Besuchst du gern Oma und Opa?",
            "options": [
                "Besuchst du gern Oma und Opa?",
                "Machst du gern Karate?",
                "Machst du gern Hausaufgaben?",
                "Spielst du gern Computerspiele?"
            ]
        },
        {
            "type": "turkish_to_german",
            "question": "Çilekli dondurmayı sever misin?",
            "correctAnswer": "Magst du Erdbeereis?",
            "options": [
                "Magst du Erdbeereis?",
                "Magst du Schokoladeneis?",
                "Magst du Vanilleeis?",
                "Magst du Zitroneneis?"
            ]
        },
        {
            "type": "turkish_to_german",
            "question": "Çikolatalı dondurmayı sever misin?",
            "correctAnswer": "Magst du Schokoladeneis?",
            "options": [
                "Magst du Schokoladeneis?",
                "Magst du Erdbeereis?",
                "Magst du Vanilleeis?",
                "Magst du Zitroneneis?"
            ]
        },
        {
            "type": "turkish_to_german",
            "question": "Vanilyalı dondurmayı sever misin?",
            "correctAnswer": "Magst du Vanilleeis?",
            "options": [
                "Magst du Vanilleeis?",
                "Magst du Schokoladeneis?",
                "Magst du Erdbeereis?",
                "Magst du Zitroneneis?"
            ]
        },
        {
            "type": "turkish_to_german",
            "question": "Limonlu dondurmayı sever misin?",
            "correctAnswer": "Magst du Zitroneneis?",
            "options": [
                "Magst du Zitroneneis?",
                "Magst du Vanilleeis?",
                "Magst du Schokoladeneis?",
                "Magst du Erdbeereis?"
            ]
        },
        {
            "type": "turkish_to_german",
            "question": "Jelibon ayıcıkları sever misin?",
            "correctAnswer": "Magst du Gummibärchen?",
            "options": [
                "Magst du Gummibärchen?",
                "Magst du Bonbons?",
                "Magst du Popcorn?",
                "Magst du Kekse?"
            ]
        },
        {
            "type": "turkish_to_german",
            "question": "Kahvaltıda ne yersin?",
            "correctAnswer": "Was isst du zum Frühstück?",
            "options": [
                "Was isst du zum Frühstück?",
                "Was trinkst du zum Frühstück?",
                "Was isst du zu Mittag?",
                "Was isst du zu Abend?"
            ]
        },
        {
            "type": "turkish_to_german",
            "question": "Kahvaltıda ne içersin?",
            "correctAnswer": "Was trinkst du zum Frühstück?",
            "options": [
                "Was trinkst du zum Frühstück?",
                "Was isst du zum Frühstück?",
                "Was trinkst du zu Mittag?",
                "Was trinkst du zu Abend?"
            ]
        },
        {
            "type": "turkish_to_german",
            "question": "Hafta sonu ne yaparsın?",
            "correctAnswer": "Was machst du am Wochenende?",
            "options": [
                "Was machst du am Wochenende?",
                "Was machst du am Montag?",
                "Was machst du am Dienstag?",
                "Was machst du am Mittwoch?"
            ]
        },
        {
            "type": "german_answer",
            "question": "Was machst du gern?",
            "correctAnswer": "Ich spiele gern Fußball.",
            "options": [
                "Ich spiele gern Fußball.",
                "Ich bin 12 Jahre alt.",
                "Mein Lehrer heißt Herr Schmidt.",
                "Ja, ich mag Sport."
            ]
        },
        {
            "type": "german_answer",
            "question": "Liest du gern Comics?",
            "correctAnswer": "Ja, ich lese gern Comics.",
            "options": [
                "Ja, ich lese gern Comics.",
                "Nein, ich lese nicht gern Comics.",
                "Ja, ich sehe gern Filme.",
                "Nein, ich höre nicht gern Musik."
            ]
        },
        {
            "type": "german_answer",
            "question": "Triffst du gern Freunde?",
            "correctAnswer": "Ja, ich treffe gern Freunde.",
            "options": [
                "Ja, ich treffe gern Freunde.",
                "Nein, ich treffe nicht gern Freunde.",
                "Ja, ich fahre gern Rad.",
                "Nein, ich gehe nicht gern ins Kino."
            ]
        },
        {
            "type": "german_answer",
            "question": "Fährst du gern Rad?",
            "correctAnswer": "Nein, ich fahre nicht gern Rad.",
            "options": [
                "Nein, ich fahre nicht gern Rad.",
                "Ja, ich fahre gern Rad.",
                "Nein, ich gehe nicht gern ins Kino.",
                "Ja, ich sehe gern Filme."
            ]
        },
        {
            "type": "german_answer",
            "question": "Gehst du gern ins Kino?",
            "correctAnswer": "Nein, ich gehe nicht gern ins Kino.",
            "options": [
                "Nein, ich gehe nicht gern ins Kino.",
                "Ja, ich gehe gern ins Kino.",
                "Nein, ich fahre nicht gern Rad.",
                "Ja, ich sehe gern Filme."
            ]
        },
        {
            "type": "german_answer",
            "question": "Siehst du gern Filme?",
            "correctAnswer": "Ja, ich sehe gern Filme.",
            "options": [
                "Ja, ich sehe gern Filme.",
                "Nein, ich sehe nicht gern Filme.",
                "Ja, ich höre gern Musik.",
                "Nein, ich lese nicht gern Comics."
            ]
        },
        {
            "type": "german_answer",
            "question": "Hörst du gern Musik?",
            "correctAnswer": "Ja, ich höre gern Musik.",
            "options": [
                "Ja, ich höre gern Musik.",
                "Nein, ich höre nicht gern Musik.",
                "Ja, ich sehe gern Filme.",
                "Nein, ich lese nicht gern Comics."
            ]
        },
        {
            "type": "german_answer",
            "question": "Spielst du gern Gitarre?",
            "correctAnswer": "Nein, ich spiele nicht gern Gitarre.",
            "options": [
                "Nein, ich spiele nicht gern Gitarre.",
                "Ja, ich spiele gern Gitarre.",
                "Nein, ich spiele nicht gern Klavier.",
                "Ja, ich treffe gern Freunde."
            ]
        },
        {
            "type": "german_answer",
            "question": "Spielst du gern Klavier?",
            "correctAnswer": "Ja, ich spiele gern Klavier.",
            "options": [
                "Ja, ich spiele gern Klavier.",
                "Nein, ich spiele nicht gern Klavier.",
                "Ja, ich spiele gern Gitarre.",
                "Nein, ich treffe nicht gern Freunde."
            ]
        },
        {
            "type": "german_answer",
            "question": "Magst du Sport?",
            "correctAnswer": "Ja, ich mag Sport.",
            "options": [
                "Ja, ich mag Sport.",
                "Nein, ich mag keinen Sport.",
                "Ja, ich spiele gern Fußball.",
                "Nein, ich lese nicht gern Comics."
            ]
        },
        {
            "type": "german_answer",
            "question": "Wie alt bist du?",
            "correctAnswer": "Ich bin 12 Jahre alt.",
            "options": [
                "Ich bin 12 Jahre alt.",
                "Mein Lehrer heißt Herr Schmidt.",
                "Ja, ich mag Sport.",
                "Mein Lieblingsfach ist Mathematik."
            ]
        },
        {
            "type": "german_answer",
            "question": "Was ist dein Lieblingsfach?",
            "correctAnswer": "Mein Lieblingsfach ist Mathematik.",
            "options": [
                "Mein Lieblingsfach ist Mathematik.",
                "Ich bin 12 Jahre alt.",
                "Mein Lehrer heißt Herr Schmidt.",
                "Ich spiele gern Fußball."
            ]
        },
        {
            "type": "german_answer",
            "question": "Was isst du zum Frühstück?",
            "correctAnswer": "Ich esse Brot mit Käse.",
            "options": [
                "Ich esse Brot mit Käse.",
                "Ich trinke Tee oder Milch.",
                "Ich esse Müsli.",
                "Ich esse Brötchen mit Marmelade."
            ]
        },
        {
            "type": "german_answer",
            "question": "Was trinkst du zum Frühstück?",
            "correctAnswer": "Ich trinke Tee oder Milch.",
            "options": [
                "Ich trinke Tee oder Milch.",
                "Ich esse Brot mit Käse.",
                "Ich trinke Kakao.",
                "Ich trinke Saft."
            ]
        },
        {
            "type": "german_answer",
            "question": "Magst du Erdbeereis?",
            "correctAnswer": "Ich liebe Erdbeereis.",
            "options": [
                "Ich liebe Erdbeereis.",
                "Nein, ich mag kein Erdbeereis.",
                "Mein Lieblingseis ist Schokoladeneis.",
                "Ja, lecker!"
            ]
        },
        {
            "type": "german_answer",
            "question": "Magst du Gummibärchen?",
            "correctAnswer": "Ja, lecker!",
            "options": [
                "Ja, lecker!",
                "Nein, igitt!",
                "Ich liebe Gummibärchen.",
                "Meine Lieblingssüßigkeit ist Schokolade."
            ]
        },
        {
            "type": "german_answer",
            "question": "Was machst du am Montag?",
            "correctAnswer": "Am Montag mache ich Karate.",
            "options": [
                "Am Montag mache ich Karate.",
                "Am Montag gehe ich ins Kino.",
                "Am Montag spiele ich Klavier.",
                "Am Montag fahre ich Rad."
            ]
        },
        {
            "type": "german_answer",
            "question": "Was machst du am Dienstag?",
            "correctAnswer": "Am Dienstag gehe ich ins Kino.",
            "options": [
                "Am Dienstag gehe ich ins Kino.",
                "Am Dienstag fahre ich Rad.",
                "Am Dienstag mache ich Hausaufgaben.",
                "Am Dienstag spiele ich Klavier."
            ]
        },
        {
            "type": "german_answer",
            "question": "Was machst du am Mittwoch?",
            "correctAnswer": "Am Mittwoch mache ich Hausaufgaben.",
            "options": [
                "Am Mittwoch mache ich Hausaufgaben.",
                "Am Mittwoch spiele ich Klavier.",
                "Am Mittwoch besuche ich Oma und Opa.",
                "Am Mittwoch lese ich Comics."
            ]
        },
        {
            "type": "german_answer",
            "question": "Was machst du am Donnerstag?",
            "correctAnswer": "Am Donnerstag spiele ich Klavier.",
            "options": [
                "Am Donnerstag spiele ich Klavier.",
                "Am Donnerstag spiele ich Hockey.",
                "Am Donnerstag mache ich Hausaufgaben.",
                "Am Donnerstag lese ich Comics."
            ]
        },
        {
            "type": "german_answer",
            "question": "Was machst du am Freitag?",
            "correctAnswer": "Am Freitag fahre ich Rad.",
            "options": [
                "Am Freitag fahre ich Rad.",
                "Am Freitag lese ich Comics.",
                "Am Freitag mache ich Hausaufgaben.",
                "Am Freitag spiele ich Klavier."
            ]
        },
        {
            "type": "german_answer",
            "question": "Was machst du am Wochenende?",
            "correctAnswer": "Am Samstag und Sonntag besuche ich Oma und Opa.",
            "options": [
                "Am Samstag und Sonntag besuche ich Oma und Opa.",
                "Am Wochenende spiele ich Computerspiele.",
                "Am Wochenende fahre ich Rad.",
                "Am Wochenende gehe ich ins Kino."
            ]
        },
        {
            "type": "german_answer",
            "question": "Spielen wir am Samstag Computerspiele?",
            "correctAnswer": "Nein, ich habe keine Lust.",
            "options": [
                "Nein, ich habe keine Lust.",
                "Ja, das geht.",
                "Nein, ich habe keine Zeit.",
                "Schade."
            ]
        },
        {
            "type": "german_answer",
            "question": "Machen wir zusammen Hausaufgaben?",
            "correctAnswer": "Ja, das geht.",
            "options": [
                "Ja, das geht.",
                "Nein, ich habe keine Lust.",
                "Nein, ich habe keine Zeit.",
                "Wann?"
            ]
        },
        {
            "type": "german_answer",
            "question": "Fahren wir am Samstag Rad?",
            "correctAnswer": "Nein, ich habe keine Zeit.",
            "options": [
                "Nein, ich habe keine Zeit.",
                "Ja, das geht.",
                "Nein, ich habe keine Lust.",
                "Schade."
            ]
        },
        {
            "type": "spelling",
            "question": "Wie schreibt man \'öğretmen\' auf Deutsch?",
            "correctAnswer": "Lehrer",
            "options": [
                "Lehrer",
                "Lerer",
                "Lehrar",
                "Lehrär"
            ]
        },
        {
            "type": "spelling",
            "question": "Wie schreibt man \'spor\' auf Deutsch?",
            "correctAnswer": "Sport",
            "options": [
                "Sport",
                "Schport",
                "Spört",
                "Sportt"
            ]
        },
        {
            "type": "spelling",
            "question": "Wie schreibt man \'okul\' auf Deutsch?",
            "correctAnswer": "Schule",
            "options": [
                "Schule",
                "Shule",
                "Schüle",
                "Scule"
            ]
        },
        {
            "type": "spelling",
            "question": "Wie schreibt man \'yaş\' auf Deutsch?",
            "correctAnswer": "Alter",
            "options": [
                "Alter",
                "Älter",
                "Altär",
                "Altter"
            ]
        },
        {
            "type": "spelling",
            "question": "Wie schreibt man \'bisiklet\' auf Deutsch?",
            "correctAnswer": "Rad",
            "options": [
                "Rad",
                "Rat",
                "Raad",
                "Radt"
            ]
        },
        {
            "type": "spelling",
            "question": "Wie schreibt man \'sinema\' auf Deutsch?",
            "correctAnswer": "Kino",
            "options": [
                "Kino",
                "Kinno",
                "Kieno",
                "Cino"
            ]
        },
        {
            "type": "spelling",
            "question": "Wie schreibt man \'müzik\' auf Deutsch?",
            "correctAnswer": "Musik",
            "options": [
                "Musik",
                "Muzik",
                "Müsik",
                "Musiek"
            ]
        },
        {
            "type": "spelling",
            "question": "Wie schreibt man \'arkadaş\' auf Deutsch?",
            "correctAnswer": "Freund",
            "options": [
                "Freund",
                "Froynd",
                "Fraund",
                "Freind"
            ]
        },
        {
            "type": "spelling",
            "question": "Wie schreibt man \'çizgi roman\' auf Deutsch?",
            "correctAnswer": "Comic",
            "options": [
                "Comic",
                "Komik",
                "Comik",
                "Kommic"
            ]
        },
        {
            "type": "spelling",
            "question": "Wie schreibt man \'piyano\' auf Deutsch?",
            "correctAnswer": "Klavier",
            "options": [
                "Klavier",
                "Klawier",
                "Clavier",
                "Klavir"
            ]
        },
        {
            "type": "spelling",
            "question": "Wie schreibt man \'gitar\' auf Deutsch?",
            "correctAnswer": "Gitarre",
            "options": [
                "Gitarre",
                "Gitare",
                "Gittare",
                "Gitarr"
            ]
        },
        {
            "type": "spelling",
            "question": "Wie schreibt man \'basketbol\' auf Deutsch?",
            "correctAnswer": "Basketball",
            "options": [
                "Basketball",
                "Basketbal",
                "Basketboll",
                "Baskettball"
            ]
        },
        {
            "type": "spelling",
            "question": "Wie schreibt man \'hobi\' auf Deutsch?",
            "correctAnswer": "Hobby",
            "options": [
                "Hobby",
                "Hobi",
                "Hobbi",
                "Hobbie"
            ]
        },
        {
            "type": "spelling",
            "question": "Wie schreibt man \'ödev\' auf Deutsch?",
            "correctAnswer": "Hausaufgabe",
            "options": [
                "Hausaufgabe",
                "Hausaufgaben",
                "Hausaufgaabe",
                "Hausaufgaben"
            ]
        },
        {
            "type": "spelling",
            "question": "Wie schreibt man \'dondurma\' auf Deutsch?",
            "correctAnswer": "Eis",
            "options": [
                "Eis",
                "Ais",
                "Eiss",
                "Ice"
            ]
        },
        {
            "type": "spelling",
            "question": "Wie schreibt man \'çilek\' auf Deutsch?",
            "correctAnswer": "Erdbeere",
            "options": [
                "Erdbeere",
                "Erdbere",
                "Ertbeere",
                "Erdbeerre"
            ]
        },
        {
            "type": "spelling",
            "question": "Wie schreibt man \'çikolata\' auf Deutsch?",
            "correctAnswer": "Schokolade",
            "options": [
                "Schokolade",
                "Shokolade",
                "Schokolaade",
                "Schokolaade"
            ]
        },
        {
            "type": "spelling",
            "question": "Wie schreibt man \'vanilya\' auf Deutsch?",
            "correctAnswer": "Vanille",
            "options": [
                "Vanille",
                "Wanille",
                "Vanile",
                "Vannille"
            ]
        },
        {
            "type": "spelling",
            "question": "Wie schreibt man \'limon\' auf Deutsch?",
            "correctAnswer": "Zitrone",
            "options": [
                "Zitrone",
                "Citrone",
                "Zittrone",
                "Zitronne"
            ]
        },
        {
            "type": "spelling",
            "question": "Wie schreibt man \'ekmek\' auf Deutsch?",
            "correctAnswer": "Brot",
            "options": [
                "Brot",
                "Broot",
                "Broht",
                "Brott"
            ]
        },
        {
            "type": "spelling",
            "question": "Wie schreibt man \'peynir\' auf Deutsch?",
            "correctAnswer": "Käse",
            "options": [
                "Käse",
                "Kese",
                "Kässe",
                "Kase"
            ]
        },
        {
            "type": "spelling",
            "question": "Wie schreibt man \'reçel\' auf Deutsch?",
            "correctAnswer": "Marmelade",
            "options": [
                "Marmelade",
                "Marmalade",
                "Marmellade",
                "Marmelaade"
            ]
        },
        {
            "type": "spelling",
            "question": "Wie schreibt man \'tereyağı\' auf Deutsch?",
            "correctAnswer": "Butter",
            "options": [
                "Butter",
                "Buter",
                "Buttar",
                "Buttter"
            ]
        },
        {
            "type": "spelling",
            "question": "Wie schreibt man \'bal\' auf Deutsch?",
            "correctAnswer": "Honig",
            "options": [
                "Honig",
                "Honnig",
                "Honich",
                "Honnik"
            ]
        },
        {
            "type": "spelling",
            "question": "Wie schreibt man \'su\' auf Deutsch?",
            "correctAnswer": "Wasser",
            "options": [
                "Wasser",
                "Vasser",
                "Waser",
                "Wassser"
            ]
        },
        {
            "type": "spelling",
            "question": "Wie schreibt man \'çay\' auf Deutsch?",
            "correctAnswer": "Tee",
            "options": [
                "Tee",
                "Te",
                "Thee",
                "Tea"
            ]
        },
        {
            "type": "spelling",
            "question": "Wie schreibt man \'süt\' auf Deutsch?",
            "correctAnswer": "Milch",
            "options": [
                "Milch",
                "Milsh",
                "Milsch",
                "Millch"
            ]
        },
        {
            "type": "spelling",
            "question": "Wie schreibt man \'meyve suyu\' auf Deutsch?",
            "correctAnswer": "Saft",
            "options": [
                "Saft",
                "Safft",
                "Zaft",
                "Saphtt"
            ]
        }
    ];

    // Shuffle questions at start
    shuffleArray(questions);

    // Event Listeners
    startButton.addEventListener("click", startQuiz);
    nextButton.addEventListener("click", nextQuestion);
    restartButton.addEventListener("click", restartQuiz);

    // Start the quiz
    function startQuiz() {
        startScreen.classList.remove("active");
        quizScreen.classList.add("active");
        currentQuestionIndex = 0;
        score = 0;
        correctCount = 0;
        wrongCount = 0;
        updateScore();
        loadQuestion();
    }

    // Load current question
    function loadQuestion() {
        // Reset state
        selectedOption = null;
        nextButton.disabled = true;
        feedbackElement.textContent = "";
        feedbackElement.className = "feedback";
        feedbackElement.classList.remove("show");

        const currentQuestion = questions[currentQuestionIndex];

        // Update question counter and progress bar
        questionCounter.textContent = `Soru: ${currentQuestionIndex + 1}/${questions.length}`;
        const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressBar.style.width = `${progressPercentage}%`;

        // Set question type label
        questionTypeElement.textContent = typeLabels[currentQuestion.type];

        // Set question text
        questionElement.textContent = currentQuestion.question;

        // Clear previous options
        optionsElement.innerHTML = "";

        // Create shuffled options array
        const shuffledOptions = [...currentQuestion.options];
        shuffleArray(shuffledOptions);

        // Add options to the DOM
        shuffledOptions.forEach((option, index) => {
            const optionElement = document.createElement("div");
            optionElement.className = "option";
            optionElement.textContent = option;
            optionElement.dataset.value = option;
            optionElement.addEventListener("click", () => selectOption(optionElement));
            optionsElement.appendChild(optionElement);
        });
    }

    // Handle option selection
    function selectOption(optionElement) {
        // If already answered, don"t allow changing
        if (feedbackElement.classList.contains("show")) return;

        // Remove previous selection
        const options = document.querySelectorAll(".option");
        options.forEach(option => option.classList.remove("selected"));

        // Mark as selected
        optionElement.classList.add("selected");
        selectedOption = optionElement;

        // Check answer immediately
        checkAnswer();

        // Enable next button after a short delay to show feedback
        setTimeout(() => {
            nextButton.disabled = false;
        }, 500); // Adjust delay as needed
    }

    // Check if selected answer is correct
    function checkAnswer() {
        const currentQuestion = questions[currentQuestionIndex];
        const selectedValue = selectedOption.dataset.value;
        const isCorrect = selectedValue === currentQuestion.correctAnswer;

        // Update UI based on correctness
        if (isCorrect) {
            selectedOption.classList.add("correct");
            feedbackElement.textContent = "Harika! Doğru cevap!";
            feedbackElement.className = "feedback correct show";
            score += 10;
            correctCount++;
        } else {
            selectedOption.classList.add("incorrect");
            feedbackElement.textContent = `Dikkat! Doğru cevap: ${currentQuestion.correctAnswer}`;
            feedbackElement.className = "feedback incorrect show";
            wrongCount++;

            // Highlight correct answer
            const options = document.querySelectorAll(".option");
            options.forEach(option => {
                if (option.dataset.value === currentQuestion.correctAnswer) {
                    option.classList.add("correct");
                }
            });
        }

        updateScore();
    }

    // Move to next question
    function nextQuestion() {
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }

    // Show final results
    function showResults() {
        quizScreen.classList.remove("active");
        resultsScreen.classList.add("active");

        finalScore.textContent = score;
        correctAnswers.textContent = correctCount;
        wrongAnswers.textContent = wrongCount;

        // Update achievement text based on score
        const percentage = (correctCount / questions.length) * 100;
        const achievementText = achievementElement.querySelector(".achievement-text");
        const achievementIcon = achievementElement.querySelector(".achievement-icon i");
        if (percentage >= 90) {
            achievementText.textContent = "Mükemmel! Almanca ustasısın!";
            achievementIcon.className = "fas fa-crown";
            triggerConfetti();
        } else if (percentage >= 70) {
            achievementText.textContent = "Çok iyi! Harika ilerliyorsun!";
            achievementIcon.className = "fas fa-medal";
            triggerConfetti(0.7);
        } else if (percentage >= 50) {
            achievementText.textContent = "İyi iş! Öğrenmeye devam!";
            achievementIcon.className = "fas fa-star";
        } else {
            achievementText.textContent = "Tekrar dene! Başarabilirsin!";
            achievementIcon.className = "fas fa-thumbs-up";
        }
    }

    // Restart the quiz
    function restartQuiz() {
        resultsScreen.classList.remove("active");
        startScreen.classList.add("active");

        // Reshuffle questions for a new game
        shuffleArray(questions);
    }

    // Update score display
    function updateScore() {
        scoreDisplay.textContent = `Puan: ${score}`;
    }

    // Utility function to shuffle array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Confetti effect
    function triggerConfetti(intensity = 1) {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration) * intensity;
            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }

    // Load confetti script dynamically if needed (or include it in HTML)
    if (typeof confetti === "undefined") {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
        document.body.appendChild(script);
    }

    // Add SVG files if they are not already present
    function ensureSVGExists(filename, svgContent) {
        // Check if file exists (simple check, might need refinement)
        fetch(filename)
            .then(response => {
                if (!response.ok) {
                    // File doesn't exist or can't be accessed, create it
                    const blob = new Blob([svgContent], { type: "image/svg+xml" });
                    const url = URL.createObjectURL(blob);
                    // This part is tricky in a local file context. 
                    // For simplicity, we assume SVGs are manually placed or already exist.
                    // In a real web server environment, you could write the file.
                    console.log(`SVG ${filename} assumed to exist or needs manual placement.`);
                }
            })
            .catch(err => {
                 console.log(`SVG ${filename} assumed to exist or needs manual placement.`);
            });
    }

    const germanFlagSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3"><rect width="5" height="3" fill="#000"/><rect width="5" height="2" y="1" fill="#D00"/><rect width="5" height="1" y="2" fill="#FFCE00"/></svg>`;
    const mascotSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="#FFCE00"/><circle cx="35" cy="40" r="5" fill="#2c3e50"/><circle cx="65" cy="40" r="5" fill="#2c3e50"/><path d="M30 60 Q 50 75 70 60" stroke="#2c3e50" stroke-width="4" fill="none"/><path d="M40 20 Q 50 10 60 20" stroke="#2c3e50" stroke-width="3" fill="none"/></svg>`; // Simple smiley mascot
    const patternSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><defs><pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="3" fill="rgba(74, 109, 167, 0.1)"/></pattern></defs><rect width="100%" height="100%" fill="url(#pattern-circles)"/></svg>`;

    // Ensure SVGs are available (or log message)
    ensureSVGExists("german_flag.svg", germanFlagSVG);
    ensureSVGExists("mascot.svg", mascotSVG);
    ensureSVGExists("pattern.svg", patternSVG);

});
