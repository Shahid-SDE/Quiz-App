const questions=[
    {
        question: "Which is the largest animal in the world?",
        answers:[

            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false}
        
        ]
    },



    {
        question: "What is the hardest natural substance on Earth?",
        answers:[

            {text: "Diamond", correct: true},
            {text: "Gold", correct: false},
            {text: "Iron", correct: false},
            {text: "Quartz", correct: false}
        
        ]
    },

    {
        question: "Which gas do plants absorb from the atmosphere?",
        answers:[

            {text: "Oxygen", correct: false},
            {text: "Carbon Dioxide", correct: true},
            {text: "Nitrogen", correct: false},
            {text: "Hydrogen", correct: false}
        
        ]
    },



    {
        question: "What is the boiling point of water?",
        answers:[

            {text: "100°C", correct: true},
            {text: "0°C", correct: false},
            {text: "50°C", correct: false},
            {text: "25°C", correct: false}
        
        ]
    }
]

const questionElement=document.getElementById('question');
const answerButtons=document.getElementById('answer-buttons');
const nextButton=document.getElementById('next-btn');

const music = new Audio("quiz.mp3");
music.loop=true;
document.addEventListener('click', () => {
  music.play()
    .then(() => console.log("Music started"))
    .catch(e => console.error("Playback failed:", e));
}, { once: true });

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}


function showQuestion(){
   
     resetState();

    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.className="text-[#222] text-[20px] font-semibold mb-[20px]";
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement('button');
        button.innerHTML=answer.text;  
        button.className="btn text-[#222] font-semibold w-full border p-[10px] my-[10px] text-left rounded-[4px] cursor-pointer hover:bg-[#222] hover:text-[#fff] transition duration-300";
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct=answer.correct;
        }

        button.addEventListener('click',selectAnswer);

    })
}

function resetState(){
    nextButton.style.display="none";

    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }

    
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const correct=selectedBtn.dataset.correct;

    if(correct){
        selectedBtn.className="btn bg-[#9aeabc] text-[#fff] font-semibold w-full border p-[10px] my-[10px] text-left rounded-[4px] cursor-no-drop";
        score++;

    }else{
        selectedBtn.className="btn bg-[#ff9393] text-[#fff] font-semibold w-full border p-[10px] my-[10px] text-left rounded-[4px] cursor-no-drop";
    }

    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct){
            button.className="btn bg-[#9aeabc] text-[#fff] font-semibold w-full border p-[10px] my-[10px] text-left rounded-[4px] cursor-no-drop";
            
        }

        button.disabled=true;
        button.style.cursor="no-drop";
        button.classList.remove('hover:bg-[#222]', 'hover:text-[#fff]');
    })
    nextButton.style.display="block";

}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{

      showScore();
    }
}

nextButton.addEventListener('click',()=>{

    if(currentQuestionIndex<questions.length){
  
        handleNextButton();

    }else{
        startQuiz();
    }
});

startQuiz();
