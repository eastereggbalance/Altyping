/*
1단계
1) 페이지의 문자를 가져와 한 문장씩 나눠서 저장함.
2) 한문장 출력 후 다음 버튼을 누르면 다음 문장 출력.
2019.09.18 clear9
2단계
1) 입력 창을 만들고 입력을 받은 뒤 오타가 있을시 해당 문자 빨간색으로 오타가 없다면 파란색으로 표시
2) 영문일 경우 WPM 으로 측정 한글일 경우 OO타로 측정.
여기까지 하면 출시 가능.
*/

// typingCharacterCnt typingWordsCnt 변수 이름 추천

var getContents = document.querySelectorAll('#content-text p'); //btnStart를 누르는 순간 바로 글자 가져오고
var contents_Cnt = getContents.length;
var btnStart = document.getElementById('getText');
var btnNext = document.getElementById('btnNext');
var outputTxt = document.getElementById('outputText');
var tpField = document.getElementById('tpField');
var sentences = [], btnReset;
var nowString = 0, nowCharacter = 0;
var wordsTotal = 1, typingCnt = 0, wordsCnt = 1, typingErrorCnt = 0, checkId = 0;
var checkTypingError = []; // 한번 지나간 아이디는 Count 하지 않음

for (var i = 0; i < contents_Cnt; i++) {
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

  for(var i = 0; i < sentences[nowString].length; i++) {
    var node = document.createElement('span');
    node.id = i;
    var txtNode = document.createTextNode(sentences[nowString][i]);
    node.appendChild(txtNode);
    outputTxt.appendChild(node);

    if(txtNode.textContent === " ") { // how many words in this sentence?
      wordsTotal++;
    }
  }
}

function changed_Color(color, backColor, num) {
  var temp = document.getElementById(num); // id 값 확인 해서 한번 지나간 아이디면 no count wordsCnt
  //만약 color가 darkred면 typingErrorCnt++

  if(temp.textContent === " ") {
    temp.style.backgroundColor = backColor;
    wordsCnt++;
  }
  else {
    temp.style.backgroundColor = backColor;
    temp.style.color = color;
  }

  switch(color) {
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

  if(checkId > num) {
    return;
  }
  else {
    checkId = num;
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

function enterKey() {
  if(event.keyCode === 13) {
    empty(); // checkWord.js
  }
}
tpField.addEventListener('keypress', enterKey);

function backSpaceCorrection(num) {
  if(checkTypingError[num] === true) {
    return;
  }
  else {
    typingErrorCnt--;
  }
}

// 아이디 체크
// if(passedId > nowCharacter)
// {
//   typingCnt--;
// }

function check_Word() {
  var checkKey = 1;
  if(event.keyCode === 16)
  {
    checkKey = 16;
  }

  switch(checkKey) {
    case 16 : // Ignore Shift
      break;
    default :
      if(tpField.value[nowCharacter] === outputTxt.textContent[nowCharacter]) { // Correct
        changed_Color('#0e630e', "#e7fbd3", nowCharacter);
      }
      else if(event.keyCode === 8) { // Pressed Backspace
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
  }
  console.log(typingErrorCnt);

  if(nowCharacter === sentences[nowString].length) { // 한 문장 타이핑이 끝나면 자동으로 다음 문장.
    nextContent();
  }
}
tpField.addEventListener('keyup', check_Word);

// switch(nowCharacter) {
//   case 0 : // 아무것도 입력하지 않은 상태에서 Backspace를 눌렀을때
//     nowCharacter = 0; // 이거 꼭 있어야 하나?
//     alert("Nothing");
//     break;
//   default : // Just Backspace
//     changed_Color('gray', "white", nowCharacter - 1);
//     backSpaceCorrection(nowCharacter - 1);
//     nowCharacter--;
// }

/*
 * tpField keyboard event를 keyup으로 하고 무조건 첫 글자 부터 시작하니까
 * i값을 만들고 한글자 입력되면 i++ 하면서 비교
*/

////////////////////////////////////////////////////////////////////

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