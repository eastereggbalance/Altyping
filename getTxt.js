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

var getContent = document.querySelectorAll('#content-text p'); //btnStart를 누르는 순간 바로 글자 가져오고
var contentLen = getContent.length;
var getString = []; // 페이지의 글자를 가져와 배열로 저장함
var btnStart = document.getElementById('getText');
var outputTxt = document.getElementById('outputText');
var tpField = document.getElementById('tpField');
var btnClear = document.getElementById('btnClear');
var btnNext = document.getElementById('btnNext');
var typingArea = document.getElementById('typingArea');
var resetButton;
var content_Cnt = 0;

// 배열로 저장함
for (var i = 0; i < contentLen; i++)
{
  getString[i] = getContent[i].textContent;
}

function createReset()
{
  resetButton = document.createElement('button');
  resetButton.id = "reset";
  resetButton.textContent = 'Start new typing';
  typingArea.appendChild(resetButton);
}

function nextContent()
{
  content_Cnt++;
  tpField.value = '';
  startTyping();
}
btnClear.addEventListener('click', nextContent);
btnNext.addEventListener('click', nextContent);

function resetTyping()
{
  content_Cnt = 0;
  buttonOnOff(false);
  resetButton.parentNode.removeChild(resetButton);
  startTyping();
}

function buttonOnOff(val)
{
  tpField.disabled = val;
  btnClear.disabled = val;
  btnNext.disabled = val;
  btnStart.disabled = val;
}

function addTag()
{
  if(outputTxt.textContent != null)
  {
    outputTxt.textContent = null;
  }

  for(var i = 0; i < getString[content_Cnt].length; i++)
  {
    var node = document.createElement('span');
    node.id = i;
    var txtNode = document.createTextNode(getString[content_Cnt][i]);
    node.appendChild(txtNode);
    outputTxt.appendChild(node);
  }
}

function changed_Color(color, num)
{
  var temp = document.getElementById(num);
  console.log(num);
  temp.style.color = color;
}

function startTyping()
{
  if(content_Cnt >= contentLen)
  {
    buttonOnOff(true);
    outputTxt.style.font = 'bold';
    outputTxt.style.fontSize = '25px';
    outputTxt.style.color = 'red';
    outputTxt.textContent = "No more contents";
    createReset();
    resetButton.addEventListener('click', resetTyping);
  }
  else
  {
    tpField.focus();
    addTag();
    outputTxt.style.font = 'normal';
    outputTxt.style.color = 'gray';
    outputTxt.style.fontSize = '30px';
  }
}
btnStart.addEventListener('click', startTyping);

// input에 입력을 하다 enter를 누를시 발생
function enterKey()
{
  if(event.keyCode == 13)
  {
    empty(); // checkWord.js
    stop(); // checkTime.js 39
    nextContent();
  }
}
tpField.addEventListener('keyup', enterKey);

function check_Wrd()
{
  var count = tpField.value.length;
  //처음 시작하는 글자만 어떻게 해보면
  debugger;
  console.log(tpField.value);
  if(tpField.value[count] == outputTxt.textContent[count])
  {
    changed_Color('blue', count);
  }
  else if(event.keyCode === 8)
  {
    changed_Color('gray', count);
  }
  else
  {
    changed_Color('red', count);
  }
}
tpField.addEventListener('keypress', check_Wrd); // keyup으로 할 시 타이핑 속도를 못 따라감

////////////////////////////////////////////////////////////////////

/*
///////////큰 퀘스트///////////
 ** outputText가 화면에 나오면 그 길이에 맞추어 input width 변경
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