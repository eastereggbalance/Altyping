let getContents = document.querySelectorAll('#content-text p');
let contents_Cnt = getContents.length;
let btnStart = document.getElementById('getText');
let btnNext = document.getElementById('btnNext');
let outputTxt = document.getElementById('outputText');
let tpField = document.getElementById('tpField');
let sentences = [], btnReset;
let nowString = 0, nowCharacter = 0;
let wordsTotal = 1, typingCnt = 0, wordsCnt = 1, typingErrorCnt = 0, checkId = 0;
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

function nextContent() {
  nowCharacter = 0;
  typingCnt = 0;
  typingErrorCnt = 0
  checkId = 0
  wordsTotal = 1;
  wordsCnt = 1;
  nowString++;
  tpField.value = '';
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

  // if(checkId > num) {
  //   return;
  // }
  // else {
  //   checkId = num;
  // }
}

function check_Input() {
  let checkKey = 1;
  
  if(event.keyCode === 16) {
    checkKey = 16;
  }
  else if(event.keyCode === 13) {
    checkKey = 13;
  }

  switch(checkKey) {
    case 1 : // characters
      if(tpField.value[nowCharacter] === outputTxt.textContent[nowCharacter]) { // Correct
        changed_Color('#0e630e', "#e7fbd3", nowCharacter);
      }
      else if(event.keyCode === 8) { // Backspace
        if(nowCharacter === 0) { // 아무것도 입력하지 않은 상태에서 Backspace를 눌렀을때
          nowCharacter = 0;
          alert("Nothing");
        }
        else { // Just Backspace
          changed_Color('gray', "white", nowCharacter - 1);
          backSpaceCorrection(nowCharacter - 1);
          nowCharacter--;
        }
      }
      else { // Wrong
        changed_Color('darkred', 'pink', nowCharacter);
      }
      break;
    case 13 : // press enterkey
      // nextContent();
      break;
    case 16 : // Ignore shiftkey
      break;
  }

  if(nowCharacter === sentences[nowString].length) { // 한 문장 타이핑이 끝나면 자동으로 다음 문장. // 버그 있음
    nextContent();
  }
  console.log(event.keyCode);
}
tpField.addEventListener('keyup', check_Input);

////////////////////////////////////////////////////////////////////
//       keycode
// event.keyCode ESC = 27
// event.keyCode ctrl = 17
// event.keyCode alt = 18
// event.keyCode arrow up = 38
// event.keyCode arrow down = 39
// event.keyCode Tab = 9

/*
///////////큰 퀘스트///////////
 ** outputText가 화면에 나오면 그 길이에 맞추어 input width 변경 => tpField 크기를 그냥 늘림
//////////디테일 퀘스트 //////////
 ** clear 버튼과 input 합치기
 ** Get description 버튼 누르면 #typingArea 활성화
 ** 특수문자 제거
////////// 버  그  //////////
 **한글 타이핑시 시간 안감
-----------------------------------------------------
/////////// 해결한거 ///////////
 ** 글을 가져와 글자 하나 하나에 전부 span tag 추가
 ** 타이핑을 시작하면 시간 측정 시작
 ** resettyping 누르면 css 원래대로 돌리기 => 중복 제거
 ** Start new typing 버튼 계속나오는 버그 =>
 ** Start new typing 버튼 css 적용
 ** clear 또는 Next 버튼 눌렀을때 tpField 비워주기.
*/