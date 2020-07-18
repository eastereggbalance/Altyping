/*
////////////////////////////아이디어//////////////////////////
** 다음 버튼 말고도 검색한 내용의 역사 개요 등 큰 카테고리를 url로 생성해서 누르면 해당 내용 가져오기.
*/
var minutes = 0, seconds = 0, ms = 0;
var running;
var charactersPM, wordsPM, fallingRateSlow, seconds_minutes; // PM => per minute
var timer = document.getElementById('stopwatch');
var wpm = document.getElementById('wpm');

function startTimer()
{
    if(!running) // 이 조건을 달아 주지 않으면 시간이 계속 빨라짐
    {
        running = setInterval(run, 10);
    }
}

function run()
{
    timer.textContent = getTime();
    ms++;

    if(ms == 100)
    {
        ms = 0;
        seconds++;
        seconds_minutes = seconds / 60;
        seconds_minutes = seconds_minutes.toFixed(3);
        seconds_minutes *= 1;
        wordsPM = wordsCnt / seconds_minutes;
        wordsPM = wordsPM.toFixed(0);
        wordsPM *= 1;
        console.log(wordsPM);

        // if(typingCnt === 0)
        // {
        //     wordsPM = fallingRateSlow;
        // }
        // else
        // {
        //     charactersPM = typingCnt * 60;
        //     wordsPM = charactersPM / 5;
        // }
        // fallingRateSlow = wordsPM;
        // typingCnt = 0;
    }
    if(seconds == 60)
    {
        seconds = 0;
        minutes++;
    }
}

function pause()
{
    stopTimer();
}

function stop()
{
    stopTimer();
    minutes = 0;
    seconds = 0;
    ms = 0;
    timer.textContent = getTime();
}

function stopTimer()
{
    clearInterval(running);
    running = false;
}

function getTime()
{
    return (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds) + ":" + (ms < 10 ? "0" + ms : ms)
}

tpField.addEventListener('keypress', startTimer);