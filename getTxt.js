let getContents = document.querySelectorAll('#content-text p');
let contents_Cnt = getContents.length;
let btnStart = document.getElementById('getText');
let btnNext = document.getElementById('btnNext');
let outputTxt = document.getElementById('outputText');
let tpField = document.getElementById('tpField');
let sentences = [], btnReset;
let nowString = 0, nowCharacter = 0;
let wordsTotal = 1, typingCnt = 0, wordsCnt = 1, typingErrorCnt = 0;
let avgWpm = 0, avgAccuracy = 0, sumWpm = 0, sumAccuracy = 0;
let checkTypingError = []; // 한번 지나간 아이디는 Count 하지 않음

for (let i = 0; i < contents_Cnt; i++) {
  sentences[i] = getContents[i].textContent;
}

if(outputTxt.textContent === "") {
  tpField.disabled = true;
  btnNext.disabled = true;
}

function createReset() {
  btnReset = document.createElement('button');
  btnReset.id = "reset";
  btnReset.textContent = 'Start new typing';
  document.getElementById('typingArea').appendChild(btnReset);
}

function cntInitialization() { // 다음 컨텐츠를 가져오면 전부 초기화
  nowCharacter = 0;
  typingCnt = 0;
  typingErrorCnt = 0
  wordsTotal = 1;
  wordsCnt = 1;
  tpField.value = '';
}

function nextContent() {
  cntInitialization();
  nowString++;
  stop();
  startTyping();
}
btnNext.addEventListener('click', nextContent);

function resetTyping() {
  nowString = 0;
  buttonOnOff(false);
  btnReset.parentNode.removeChild(btnReset);
  startTyping();
}

function buttonOnOff(val) {
  tpField.disabled = val;
  btnNext.disabled = val;
  btnStart.disabled = val;
}

function addTag() {
  if(outputTxt.textContent != null) {
    outputTxt.textContent = null;
  }

  for(let i = 0; i < sentences[nowString].length; i++) {
    let node = document.createElement('span');
    node.id = i;
    let txtNode = document.createTextNode(sentences[nowString][i]);
    node.appendChild(txtNode);
    outputTxt.appendChild(node);

    if(txtNode.textContent === " ") { // how many words in this sentence?
      wordsTotal++;
    }
  }
}

function startTyping() {
  if(nowString >= contents_Cnt) {
    buttonOnOff(true);
    outputTxt.style.font = 'bold';
    outputTxt.style.fontSize = '25px';
    outputTxt.style.color = 'red';
    outputTxt.textContent = "No more contents";
    createReset();
    btnReset.addEventListener('click', resetTyping);
  }
  else {
    addTag();
    buttonOnOff(false);
    tpField.focus();
    outputTxt.style.font = 'normal';
    outputTxt.style.color = 'gray';
    outputTxt.style.fontSize = '30px';
  }
}
btnStart.addEventListener('click', startTyping);

function calculateAvg(sum) {
  let avg = 0;

  avg = sum / (nowString + 1);
  avg = avg.toFixed(0);
  avg *= 1;

  return avg;
}

function backSpaceCorrection(num) {
  if(checkTypingError[num] === true) {
    return;
  }
  else {
    typingErrorCnt--;
  }
}

function changed_Color(color, backColor, num) {
  let temp = document.getElementById(num); // id 값 확인 해서 한번 지나간 아이디면 no count wordsCnt
  //만약 color가 darkred면 typingErrorCnt++

  if(temp.textContent === " ") { // Change Color
    temp.style.backgroundColor = backColor;
    wordsCnt++;
  }
  else {
    temp.style.backgroundColor = backColor;
    temp.style.color = color;
  }

  switch(color) { // Several count variable counting
    case '#0e630e' : // correct
      checkTypingError[nowCharacter] = true;
      nowCharacter++;
      typingCnt++;
      break;
    case 'gray' : // Backspace
      break;
    default : // Wrong
      checkTypingError[nowCharacter] = false;
      nowCharacter++;
      typingCnt++;
      typingErrorCnt++;
  }
}

function check_Input() {
  let checkKey = 1;
  let keyValue = event.keyCode;
  keyValue = String.fromCharCode(keyValue);

  if(event.keyCode === 16 || event.keyCode === 13) { //Ignore enter and shift
    checkKey = 0;
  }

  switch(checkKey) {
    case 1 : // input value characters
      if(keyValue == outputTxt.textContent[nowCharacter]) { // Correct
        changed_Color('#0e630e', '#e7fbd3', nowCharacter);
      }
      else if(event.keyCode === 8) { // Backspace
        if(nowCharacter === 0) { // 아무것도 입력하지 않은 상태에서 Backspace를 눌렀을때
          nowCharacter = 0;
          alert("Nothing");
        }
        else { // Just Backspace
          changed_Color('gray', 'white', nowCharacter - 1);
          backSpaceCorrection(nowCharacter - 1);
          nowCharacter--;
        }
      }
      else { // Wrong
        changed_Color('darkred', 'pink', nowCharacter);
      }
      break;
    case 0 :
      break;
  }

  if(nowCharacter === sentences[nowString].length) { // 버그 있음
    sumWpm += wordsPM;
    avgWpm = calculateAvg(sumWpm);

    sumAccuracy += accuracyRate;
    avgAccuracy = calculateAvg(sumAccuracy);

    nextContent();
    console.log(avgWpm, avgAccuracy);
  }
  console.log(keyValue);
}
document.addEventListener('keyup', check_Input);

// let test = 0;
// document.addEventListener('keyup', function () {
//   console.log(test);
//   test++;
// })

// 꼭 HTML의 input 으로 안 받아도 addEventListener 사용 할 수 있지만 지금 당장으로서는 글자 비교가 힘듬


// real accuracy
// wpm accuracy 평균
// *check_Input keypress *