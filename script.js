const textarea = document.querySelector("textarea");
const convertBtn = document.querySelector("button");
const listOfVoices = document.querySelector("select");
let isSpeaking = true;

const textToSpeech = (text) => {
   let speech = new SpeechSynthesisUtterance(text);
   for(let voice of speechSynthesis.getVoices()){
      if(voice.name === listOfVoices.value){
         speech.voice = voice;
      }
   }
   speechSynthesis.speak(speech);
}

const voices = () => {
   for(let voice of speechSynthesis.getVoices()){
      let option = `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
      listOfVoices.insertAdjacentHTML('beforeend', option)
   }
}

// speechSynthesis.addEventListener('voiceschanged', voices);
voices();
speechSynthesis.onvoiceschanged = () => {
   voices();
}

convertBtn.onclick = (e) => {
   e.preventDefault();

   if(textarea.value !== ""){
      if(!speechSynthesis.speaking){
         textToSpeech(textarea.value);
      }

      if(textarea.value.length > 50){
         if(isSpeaking){
            speechSynthesis.resume();
            isSpeaking = false;
            convertBtn.innerText = 'Pause';
            textarea.setAttribute('disabled','')
            listOfVoices.setAttribute("disabled", "")
         } else{
            speechSynthesis.pause();
            isSpeaking = true;
            convertBtn.innerText = 'Resume';
            textarea.setAttribute('disabled','')
            listOfVoices.setAttribute("disabled", "")
         }

      }

      setInterval(() => {
         if(!speechSynthesis.speaking && !isSpeaking) {
            isSpeaking = true;
            convertBtn.innerText = 'Convert to Speech';
            textarea.value = ``;
            listOfVoices.removeAttribute("disabled");
            textarea.removeAttribute("disabled");
         }
      }, 100);
   }
}
