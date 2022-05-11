// HTML elements that we are going to use
const textarea = document.querySelector("#textarea");
const btnGravar = document.querySelector("#btnGravar");
const btnParar = document.querySelector("#btnParar");
const btnBaixar = document.querySelector("#btnBaixar");
const btnLimpar = document.querySelector("#btnLimpar");

// class API
class speechApi {

  constructor() {

    const SpeechToText = window.SpeechRecognition || window.webkitSpeechRecognition;

    this.speechApi = new SpeechToText();
    this.output = textarea.output;
    this.speechApi.continuous = true;
    // recognized language
    // this.speechApi.lang = "pt-PT";
    this.speechApi.lang = "en";

    this.speechApi.onresult = (e) => {
      var resultIndex = e.resultIndex;
      var transcript = e.results[resultIndex][0].transcript;

      textarea.value += transcript;
    }
  };


  start() {
    this.speechApi.start();
  }

  stop() {
    this.speechApi.stop();
  }
}

// ======== Events ========================
var speech = new speechApi;

// ======== Event to record ===============
btnGravar.addEventListener('click', () => {
  btnGravar.disabled = true;
  btnParar.disabled = false;
  speech.start();
});

// ======= Event to stop recording ========
btnParar.addEventListener('click', () => {
  btnGravar.disabled = false;
  btnParar.disabled = true;
  speech.stop();
});

// ===== Event to download ==============
btnBaixar.addEventListener('click', () => {
  var text = textarea.value;
  var fileName = "speech.txt";

  download(text, fileName)
});

function download(text, fileName) {
  var element = document.createElement('a');

  element.setAttribute('href', 'data:text/plaincharset=utf-8,' + encodeURIComponent(text));

  element.setAttribute('download', fileName);

  element.style.display = 'none';

  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

// ====== Event to reset ============
btnLimpar.addEventListener('click', () => {
  textarea.value = '';
  btnGravar.disabled = false;
  btnParar.disabled = true;
  speech.stop();
});