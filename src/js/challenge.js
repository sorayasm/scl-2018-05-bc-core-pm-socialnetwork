function reply() {

    let questionOne = '';

    if (document.getElementById('answerOne').checked) {
        questionOne = document.getElementById('answerOne').value;
    }

    if (document.getElementById('answerTwo').checked) {
        questionOne = document.getElementById('answerTwo').value;
    }

    if (document.getElementById('answerThree').checked) {
        questionOne = document.getElementById('answerThree').value;
    }


    let questionTwo = '';

    if (document.getElementById('answerFour').checked) {
        questionTwo = document.getElementById('answerFour').value;
    }

    if (document.getElementById('answerFive').checked) {
        questionTwo = document.getElementById('answerFive').value;
    }

    if (document.getElementById('answerSix').checked) {
        questionTwo = document.getElementById('answerSix').value;
    }

    let questionThree = '';

    if (document.getElementById('answerSeven').checked) {
        questionThree = document.getElementById('answerSeven').value;
    }

    if (document.getElementById('answerEight').checked) {
        questionThree = document.getElementById('answerEight').value;
    }

    if (document.getElementById('answerNine').checked) {
        questionThree = document.getElementById('answerNine').value;
    }

    let scoreQuestionOne = null;
    if (questionOne === '-6') {
        scoreQuestionOne = 1;
    }
    else {
        scoreQuestionOne = 0;
    }

    let scoreQuestionTwo = null;
    if (questionTwo === '2') {
        scoreQuestionTwo = 1;
    }
    else {
        scoreQuestionTwo = 0;
    }

    let scoreQuestionThree = null
    if (questionThree === '-1') {
        scoreQuestionThree = 1;
    }
    else {
        scoreQuestionThree = 0;
    }
    let resultScore = scoreQuestionOne + scoreQuestionTwo + scoreQuestionThree;
if(resultScore===3){
window.location="resultQuizMat.html"
}else{
    window.location="badResult.html"
document.getElementById('badResult').innerHTML = 'Tuviste: ' + resultScore + ' preguntas correctas.';
}
}
