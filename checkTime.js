/*
////////////////////////////아이디어//////////////////////////
** 다음 버튼 말고도 검색한 내용의 역사 개요 등 큰 카테고리를 url로 생성해서 누르면 해당 내용 가져오기.
*/
var minutes = 0, seconds = 0, ms = 0;
var running;
// var timer = document.getElementById('stopwatch');
var wpm = document.getElementById('wpm');
var accuracy = document.getElementById('Accuracy');
var charactersPM, wordsPM; // PM => per minute
var accuracyRate, seconds_Minutes;

function startTimer()
{
    if(!running) // 이 조건을 달아 주지 않으면 시간이 계속 빨라짐
    {
        running = setInterval(run, 10);
    }
}

function run()
{
    // timer.textContent = getTime();
    ms++;

    if(ms == 100)
    {
        ms = 0;
        seconds++;

        // WPM
        seconds_Minutes = seconds / 60;
        seconds_Minutes = seconds_Minutes.toFixed(4);
        seconds_Minutes *= 1;

        charactersPM = typingCnt / seconds_Minutes
        charactersPM = charactersPM.toFixed(0);
        charactersPM *= 1;

        wordsPM = charactersPM / 5;
        wordsPM = wordsPM.toFixed(0);
        wordsPM *= 1;
        
        wpm.textContent = `Speed : ${wordsPM}`;
        
        // Accuracy
        accuracyRate = (nowCharacter - typingErrorCnt) / nowCharacter * 100;
        accuracyRate = accuracyRate.toFixed(0);
        accuracyRate *= 1;
        accuracy.textContent = `Accuracy : ${accuracyRate} %`;
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
    // timer.textContent = getTime();
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