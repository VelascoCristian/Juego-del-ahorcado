const words= ["pez", "largo", "queja", "descriptivo", "anguila", "flameante", "profetizar", "espantapajaros", "audiencia", "meta", "crudo", "mezcla", "convocar", "carpincho", "puerta", "envidiar", "banquete", "cacerola", "reunirse", "arrestar", "domar", "asamblea", "bar", "corcho", "bisagra", "maravilloso", "agua", "flotar", "verguenza", "humedo", "investigar", "aconsejar", "manzana", "empleo", "misterio", "exuberante", "cosecha", "felicitar", "diagonal", "solucion"];
let pressedLetters = [];
let hiddenWord = "";
let correct = 0;
let incorrect = 0;
let isAddWord = false;
const selectWord = () => {
    return Math.floor(Math.random() * words.length);
}

const dashes = (letter) => {
    const $p = document.createElement("p"),
    $pText = document.createTextNode("_ "),
    $pChildrenText = document.querySelector("#dashesContainer");
    if (correct === 0 ) {
        for (let i = 0; i < hiddenWord.length; i++) {
            $p.appendChild($pText);
            $p.classList.add("dashesLetter");
            document.getElementById("dashesContainer").
            appendChild($p.cloneNode(true));
        }
    } else {
        for (let i = 0; i < hiddenWord.length; i++) {
            if(letter === hiddenWord[i]) {
                $pChildrenText.children[i].innerText = letter;
            }
        }
    }
}

const addLetter = (letter) => {
    document.getElementById("wordContainer").innerHTML += letter;
}

const correctLetter = letter => {
    for (let i = 0; i < hiddenWord.length; i++) {
        if(hiddenWord[i] === letter) {
            correct++;
            dashes(letter);
            console.log("Acertaste esto "+letter);
            if (correct === hiddenWord.length) {
                document.querySelector(".finish").style.setProperty("display","block");
                document.querySelector(".finishText").innerHTML = "Ganaste";
                document.querySelector(".correctWord").innerHTML = "";
            } 
        }
    }
}

const wrongLetter = letter => {
    incorrect++
    switch (incorrect) {
        case 1:
            document.querySelector(".background").style.setProperty("background","url(assets/error1.png) no-repeat");
            document.querySelector(".background").style.setProperty("background-size","100% 100%");
            document.querySelector(".lives").innerHTML = 6;
            break;
        case 2:
            document.querySelector(".background").style.setProperty("background","url(assets/error2.png) no-repeat");
            document.querySelector(".background").style.setProperty("background-size","100% 100%");
            document.querySelector(".lives").innerHTML = 5;
            break;
        case 3:
            document.querySelector(".background").style.setProperty("background","url(assets/error3.png) no-repeat");
            document.querySelector(".background").style.setProperty("background-size","100% 100%");
            document.querySelector(".lives").innerHTML = 4;
            break;
        case 4:
            document.querySelector(".background").style.setProperty("background","url(assets/error4.png) no-repeat");
            document.querySelector(".background").style.setProperty("background-size","100% 100%");
            document.querySelector(".lives").innerHTML = 3;
            break;
        case 5:
            document.querySelector(".background").style.setProperty("background","url(assets/error5.png) no-repeat");
            document.querySelector(".background").style.setProperty("background-size","100% 100%");
            document.querySelector(".lives").innerHTML = 2;
            break;
        case 6:
            document.querySelector(".background").style.setProperty("background","url(assets/error6.png) no-repeat");
            document.querySelector(".background").style.setProperty("background-size","100% 100%");
            document.querySelector(".lives").innerHTML = 1;
            break;
        case 7:
            document.querySelector(".background").style.setProperty("background","url(assets/error7.png) no-repeat");
            document.querySelector(".background").style.setProperty("background-size","100% 100%");
            document.querySelector(".finish").style.setProperty("display","block");
            document.querySelector(".lives").innerHTML = 0;
            document.querySelector(".finishText").innerHTML = "Perdiste";
            document.querySelector(".correctWord").innerHTML = "La palabra era: " + hiddenWord;
            break;
    }
}

const letterInput = letter => {
    if(hiddenWord.includes(letter)) {
        correctLetter(letter);
    } else {      
        wrongLetter();
    }
    addLetter(letter);
};

const letterEvent = event => {
    console.log(event)
    let newLetter = event.key.toLowerCase();
    if(newLetter.match(/^[A-Z]$/i) && !pressedLetters.includes(newLetter)) {
        pressedLetters.push(newLetter);
        letterInput(newLetter);
    }
    console.log("Letraspresionadas: "+ pressedLetters);

}

const play = () => {
    incorrect = 0;
    correct = 0;
    pressedLetters = [];
    document.querySelector(".lives").innerHTML = 7;
    document.querySelector(".background").style.setProperty("background","url(assets/backgroundCity2.png) no-repeat");
    document.querySelector(".background").style.setProperty("background-size","100% 100%");
    document.querySelector(".livesCounter").style.setProperty("display","block");
    document.getElementById("wordContainer").innerHTML = "";
    document.querySelector(".play").style.display = "none";
    document.querySelector(".newWord").style.display = "none";
    document.querySelector(".woodLetter").style.setProperty("display","block");
    document.querySelector("#dashesContainer").style.setProperty("display","block");
    document.querySelector("#wordContainer").style.setProperty("display","block");
    document.querySelector(".btnGoBack").style.display = "block";
    document.querySelector(".keyboardContainer").style.display = "block";
    if (!isAddWord) hiddenWord = words[selectWord()];
    dashes(hiddenWord);
    console.log(hiddenWord);
    document.addEventListener("keydown", letterEvent);
}

const addWord = () => {
    hiddenWord = document.querySelector(".input").value;
    isAddWord = true;
    document.querySelector(".inputContainer").style.display = "none";
    play();
}

const newWord = () => {
    document.querySelector(".play").style.display = "none";
    document.querySelector(".newWord").style.display = "none";
    document.querySelector(".inputContainer").style.display = "block";
    document.querySelector(".inputContainer").innerHTML = `<h3 class="advise">Ingrese una palabra <input type="text" class="input" autofocus placeholder="Ingrese aquí la palabra"> <button class="btnContinueNewWord" onclick="addWord()">Continuar</button></h3>`;
}

const reset = () => {
    document.querySelector(".btnGoBack").style.display = "none";
    document.querySelector(".finish").style.setProperty("display","none");
    document.querySelector("#dashesContainer").style.setProperty("display","none");
    document.querySelector("#wordContainer").style.setProperty("display","none");
    document.querySelector(".woodLetter").style.setProperty("display","none");
    document.removeEventListener("keydown", letterEvent);
    document.querySelector(".play").style.display = "block";
    document.querySelector(".newWord").style.display = "block";
    document.querySelector(".livesCounter").style.setProperty("display","none");
    document.querySelector(".keyboardContainer").style.display = "none";
    for (let i = 0; i < hiddenWord.length; i++) {
        let dashesToRemove = document.querySelector(".dashesLetter");
        let fatherOfDashes = dashesToRemove.parentNode;
        fatherOfDashes.removeChild(dashesToRemove);
    }
    document.querySelector(".background").style.setProperty("background","url(assets/backgroundCity1.png) no-repeat");
    document.querySelector(".background").style.setProperty("background-size","100% 100%");
    isAddWord = false;
}