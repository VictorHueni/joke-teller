const myButton = document.getElementById('button');
const audioElement = document.getElementById('audio');

const jokeApiUrl = 'https://dad-jokes.p.rapidapi.com/random/joke'
const jokeApiKey = "";
const textSpeechApiKey = '';

//Disable / Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

//Text to Speech API
function tellMe(joke) {
    VoiceRSS.speech({
        key: textSpeechApiKey,
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

async function GetRandomJokes() {
    let setup = '';
    let punchline = '';
    let joke = '';

    try {
        const response = await fetch(jokeApiUrl, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": jokeApiKey,
                "x-rapidapi-host": "dad-jokes.p.rapidapi.com"
            }
        });
        const data = await response.json();
        if (data.success) {
            setup = data.body[0].setup;
            punchline = data.body[0].punchline;
            joke = `${setup}... ${punchline}`;

            //Passing the joke to the text-to-speech API
            tellMe(joke);

            //Activate the button
            toggleButton();
        }
    } catch (error) {
        console.log('whoops error during getting a joke', error);
    }
}

//Event Listener
myButton.addEventListener('click', GetRandomJokes);
audio.addEventListener('ended', toggleButton);