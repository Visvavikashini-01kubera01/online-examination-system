/// exam.js
let answers={};
let isSubmitted = false;

window.onload = function () {

    isSubmitted = false;

    disableBack();

    const examId = localStorage.getItem("currentExamId");
    const rollNo = localStorage.getItem("rollNo");

    // 🚫 prevent reopening exam after submission
    /*if (localStorage.getItem(`attemptedExam_${examId}_${rollNo}`)) {
        alert("You already attempted this exam!");
        window.location.href = "result.html";
        return;
    }*/
	//changed
	fetch(`/results/attempted/${rollNo}/${examId}`)
	.then(res => res.json())
	.then(attempted => {

	    if (attempted) {
	        alert("You already attempted this exam!");
	        window.location.href = "result.html";
	        return;
	    }

	});

    if (!examId) {
        alert("No exam selected!");
        window.location.href = "student-dashboard.html";
        return;
    }

    // Load exam details
	//changed
    fetch(`/exam/${examId}`)
        .then(res => res.json())
        .then(exam => {

            document.getElementById("examTitle").innerText = exam.title;

            const duration = Number(exam.duration) || 5;

            startTimer(duration);

            // Load questions
			//changed
            fetch(`/question/exam/${examId}`)
                .then(res => res.json())
                .then(questions => displayQuestions(questions))
                .catch(err => {
                    alert("Questions not found!");
                    window.location.href = "student-dashboard.html";
                });

        });

    // 🚫 Auto submit if tab switch
    document.addEventListener("visibilitychange", function () {

        if (document.hidden && !isSubmitted) {

            submitExam("Tab switched - exam auto submitted");

        }

    });

};


// 🚫 Disable Back Button
function disableBack() {

    history.pushState(null, null, location.href);

    window.onpopstate = function () {

        history.pushState(null, null, location.href);

        alert("Back button disabled during exam!");

    };
}


// Display Questions
/*function displayQuestions(questions) {

    const container = document.getElementById("questionContainer");

    container.innerHTML = "";

    if (!questions || questions.length === 0) {

        container.innerHTML = "<h3>No questions found!</h3>";
        return;
    }

    questions.forEach((q, i) => {

        container.innerHTML += `

            <div class="question-card">

                <p><b>Q${i + 1}:</b> ${q.questionText}</p>

                <label class="option"><input type="radio" name="q${i}" value="A"><span> ${q.optionA}</span></label><br>

                <label class="option"><input type="radio" name="q${i}" value="B"><span> ${q.optionB}<span></label><br>

                <label class="option"><input type="radio" name="q${i}" value="C"> <span>${q.optionC}</span></label><br>

                <label class="option"><input type="radio" name="q${i}" value="D"><span> ${q.optionD}</span></label><br>

                <input type="hidden" id="correct${i}" value="${q.correctAnswer}">

            </div>

        `;
    });
}
*/
/*function displayQuestions(questions) {
console.log("Questions:",questions);
    const container = document.getElementById("questionContainer");

    container.innerHTML = "";

    if (!questions || questions.length === 0) {

        container.innerHTML = "<h3>No questions found!</h3>";
        return;
    }

    questions.forEach((q, i) => {

        container.innerHTML += `

            <div class="question-card">

                <p><b>Q${i + 1}:</b> ${q.questionText}</p>

                <label class="option">
                    <input type="radio" name="q${i}" value="${q.optionA}">
                    <span>${q.optionA}</span>
                </label><br>

                <label class="option">
                    <input type="radio" name="q${i}" value="${q.optionB}">
                    <span>${q.optionB}</span>
                </label><br>

                <label class="option">
                    <input type="radio" name="q${i}" value="${q.optionC}">
                    <span>${q.optionC}</span>
                </label><br>

                <label class="option">
                    <input type="radio" name="q${i}" value="${q.optionD}">
                    <span>${q.optionD}</span>
                </label><br>

                <input type="hidden" id="correct${i}" value="${q.correctAnswer}">

            </div>

        `;
    });
}
*/
function displayQuestions(questions) {
console.log("Questions:",questions);
    const container = document.getElementById("questionContainer");

    container.innerHTML = "";

    if (!questions || questions.length === 0) {

        container.innerHTML = "<h3>No questions found!</h3>";
        return;
    }

    questions.forEach((q, i) => {
		container.innerHTML += `

		<div class="question-card">

		    <p><b>Q${i + 1}:</b> ${q.questionText}</p>

		    <label>
		        <input type="radio" name="q${i}" value="A"
		            onchange="answers[${i}]='A'">
		        ${q.optionA}
		    </label><br>

		    <label>
		        <input type="radio" name="q${i}" value="B"
		            onchange="answers[${i}]='B'">
		        ${q.optionB}
		    </label><br>

		    <label>
		        <input type="radio" name="q${i}" value="C"
		            onchange="answers[${i}]='C'">
		        ${q.optionC}
		    </label><br>

		    <label>
		        <input type="radio" name="q${i}" value="D"
		            onchange="answers[${i}]='D'">
		        ${q.optionD}
		    </label><br>

			<input 
			    type="hidden"
			    id="correct${i}"
			    value="${q.correctAnswer}"
			    data-id="${q.id}">

		</div>
		`;
		 });
		}
// Timer
function startTimer(minutes) {

    let time = minutes * 60;

    const timerDisplay = document.getElementById("timer");

    const interval = setInterval(() => {

        const m = Math.floor(time / 60);
        const s = time % 60;

        timerDisplay.innerText =
            `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

        time--;

        if (time < 0 && !isSubmitted) {

            clearInterval(interval);

            submitExam("Time's up! Exam auto submitted");

        }

    }, 1000);
}


// Score Calculation
/*function calculateScore() {

    let score = 0;

    const total = document.querySelectorAll(".question-card").length;

    for (let i = 0; i < total; i++) {

        const selected =
            document.querySelector(`input[name="q${i}"]:checked`);

        const correct =
            document.getElementById(`correct${i}`).value;

        if (selected && selected.value === correct) {
            score++;
        }
    }

    return score;
}
*/
/*function calculateScore() {

    let score = 0;

    const total = document.querySelectorAll(".question-card").length;

    for (let i = 0; i < total; i++) {

        const selected =
            document.querySelector(`input[name="q${i}"]:checked`);

        const correct =
            document.getElementById(`correct${i}`).value;

        console.log("Question", i);
        console.log("Selected:", selected ? selected.value : "None");
        console.log("Correct:", correct);

        if (selected && selected.value.trim() === correct.trim()) {
            score++;
        }
    }

    console.log("Final Score:", score);

    return score;
}
*/
function calculateScore() {

    let score = 0;

    const total = document.querySelectorAll(".question-card").length;

    for (let i = 0; i < total; i++) {

        const selected = answers[i];  // ✅ from JS object
        const correct = document.getElementById(`correct${i}`).value.trim().toUpperCase();

        if (selected && selected === correct) {
            score++;
        }
    }

    return score;
}
/*--submit exam

function submitExam(reason = "Exam submitted") {
    if (isSubmitted) return;
    isSubmitted = true;

    // ✅ support both old and new keys
    const username = localStorage.getItem("username");
    const roll = localStorage.getItem("rollNumber") || localStorage.getItem("rollNo");

    // get exam id automatically
    let examId = localStorage.getItem("currentExamId") || localStorage.getItem("currentExamID") || localStorage.getItem("createdExamId");

    if (!examId) {
        alert("Exam ID not found!");
        return;
    }

    let score = calculateScore();

    const result = {
        name: username,
        roll: roll,
        examId: examId,
        score: score
    };

    // save using both old and new keys (for backward compatibility)
    const resultKey = "exam_" + examId + "_" + roll;
    localStorage.setItem(resultKey, JSON.stringify(result));
    localStorage.setItem("lastExamResult", resultKey);
    localStorage.setItem("attemptedExam_" + examId + "_" + roll, "true");

    console.log("Saved result:", resultKey);

    window.location.href = "result.html";
}use only this*/
/*function submitExam() {

    const username = localStorage.getItem("username");
    const rollNumber = localStorage.getItem("rollNumber");
    const examId = localStorage.getItem("currentExamId");

    let score = calculateScore();

    fetch("http://localhost:8081/results/submit", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name: username,
            rollNumber: rollNumber,
            examId: examId,
            score: score
        })

    })
    .then(res => res.json())
    .then(data => {

        console.log("Result saved:", data);

        window.location.href = "result.html";

    });
}*/
/*function submitExam() {

    const username = localStorage.getItem("username");
    const rollNumber = localStorage.getItem("rollNumber");
    const examId = localStorage.getItem("currentExamId");

    let score = calculateScore();

    fetch("http://localhost:8081/results/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: username,
            rollNumber: rollNumber,
            examId: examId,
            score: score
        })
    })
    .then(res => res.json())
    .then(data => {

        console.log("Result saved:", data);

        // ✅ OPTIONAL (for faster UI, not required)
        localStorage.setItem(`attemptedExam_${examId}_${rollNumber}`, "true");

        window.location.href = "result.html";

    });
}*/
/*function submitExam() {

    const username = localStorage.getItem("username");
    const rollNumber = localStorage.getItem("rollNumber");
    const examId = localStorage.getItem("currentExamId");

    console.log("Username:", username);
    console.log("Roll:", rollNumber);
    console.log("Exam ID:", examId);

    let score = calculateScore();

    console.log("Calculated Score:", score);

    fetch("http://localhost:8081/results/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: username,
            rollNumber: rollNumber,
            examId: parseInt(examId),
            score:parseInt (score)
        })
    })
    .then(res => res.json())
    .then(data => {

        console.log("Result saved:", data);

        localStorage.setItem(`attemptedExam_${examId}_${rollNumber}`, "true");

        window.location.href = "result.html";
    });
}*/
function submitExam() {
const username=localStorage.getItem("username");
    const rollNumber = localStorage.getItem("rollNumber");
    const examId = localStorage.getItem("currentExamId");

    const answersList = [];

    const total = document.querySelectorAll(".question-card").length;

    for (let i = 0; i < total; i++) {

        const selected = answers[i];
        const questionId =
            document.getElementById(`correct${i}`).getAttribute("data-id");

        if (selected) {

            answersList.push({
                questionId: Number(questionId),
                selectedOption: selected
            });
        }
    }
//changed
    fetch("/results/submit", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
			name:username,
            rollNumber: rollNumber,
            examId: Number(examId),
            answers: answersList
        })
    })
    .then(res => res.json())
    .then(data => {

      //  alert("✅ Exam submitted successfully");

        localStorage.setItem(`attemptedExam_${examId}_${rollNumber}`, "true");

        window.location.href = "result.html";

    })
    .catch(err => {

        console.error(err);
        alert("Failed to save result");

    });
}