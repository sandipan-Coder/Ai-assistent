let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1
    text_speak.pitch = 1
    text_speak.volume = 3
    text_speak.lang = "hi-IN"
    window.speechSynthesis.speak(text_speak)
}

function wishMe(){
    let day = new Date();
    let hours = day.getHours();
    if(hours >= 0 && hours < 11){
        speak("Good Morning Sir")
    }else if(hours >= 11 && hours <2){
        speak("Good noon Sir")
    }else if(hours >= 2 && hours < 5){
        speak("Good Afternoon Sir")
    }
    else{
        speak("Good Evening Sir")
    }
}

// window.addEventListener('load', () => {
//     wishMe()
// })

let speechRecognition = window.speechRecognition || window.webkitSpeechRecognition
let recognition = new speechRecognition()
recognition.onresult = (event) => {
    let currentIndex = event.resultIndex
    let transcript = event.results[currentIndex][0].transcript
    content.innerText = transcript
    takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click", () => {
    recognition.start()
    btn.style.display = "none"
    voice.style.display = "block"
})

function takeCommand(message){
    btn.style.display = "flex"
    voice.style.display = "none"
    if(message.includes("hello")||message.includes("hey")){
        speak("hello sir, what can i help you?")
    }
    else if(message.includes("i love you")){
        speak("love you babe i am always with you")
    }
    else if(message.includes("who are you")  || message.includes("hu r u")){
        speak("I am virtual assistant, created by my boss sandipan")
    }else if(message.includes("open youtube")){
        speak("opening youtube....")
        window.open("https://www.youtube.com/","_blank")
    }else if(message.includes("open google")){
        speak("opening google....")
        window.open("https://www.google.co.in/","_blank")
    }else if(message.includes("open calculator")){
        speak("wait a while i am opening calculator....")
        window.open("calculator://")
    }
    else if(message.includes("time")){
        let time = new Date().toLocaleString(undefined,{hour:"numeric", minute:"numeric"})
        speak(time)
    }
    else if(message.includes("date")){
        let date = new Date().toLocaleString(undefined,{day:"numeric", month:"short"})
        speak(date)
    }
    else{
       let finalText = "This is what i found on internet regarding" + message.replace("sona","") || message.replace("soma","")
        speak(finalText)
        window.open(`https://www.google.com/search?q=${message.replace("sona","")}`,"_blank")
    }
}