
// =========================
  // LOGIN
//========================= 

/*function login() {

    const name = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    const rollInput = document.getElementById("rollNo");
    const rollNo = rollInput ? rollInput.value.trim() : "";

    // ✅ VALIDATION FOR STUDENT
    if (role === "STUDENT" && rollNo === "") {
        alert("⚠️ Roll Number is required for students!");
        return; // ⛔ STOP LOGIN
    }

    fetch("http://localhost:8081/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "name=" + name + "&password=" + password
    })
    .then(response => response.text())
    .then(data => {

        if (data === "success") {

            localStorage.setItem("username", name);
            localStorage.setItem("role", role);

            // ✅ STORE ONLY FOR STUDENT
            if (role === "STUDENT") {
                localStorage.setItem("rollNo", rollNo);
            }

            if (role === "STUDENT") {
                window.location.href = "student-dashboard.html";
            }

            if (role === "TEACHER") {
                window.location.href = "dashboard-teacher.html";
            }

        } else {
            alert("Invalid username or password");
        }

    });
}*/
/*function login() {

    const name = document.getElementById("name").value;
    const rollNo = document.getElementById("rollNo").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:8081/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            rollNo: rollNo,
            password: password
        })
    })
    .then(response => response.json())
    .then(user => {

        if (!user || user.id == null) {
            alert("Invalid login");
            return;
        }

        localStorage.setItem("userId", user.id);
        localStorage.setItem("username", user.name);
        localStorage.setItem("rollNo", user.rollNo);
        localStorage.setItem("role", user.role);
        localStorage.setItem("passwordChanged", user.passwordChanged);

        // 🎯 Teacher
        if (user.role === "teacher") {
            window.location.href = "teacher-dashboard.html";
        }

        // 🎯 Student
        else if (user.role === "student" && !user.passwordChanged) {
            window.location.href = "change-password.html";
        }

        else if (user.role === "student") {
            window.location.href = "student-dashboard.html";
        }

    })
    .catch(error => {
        console.log("Error:", error);
        alert("Server not running");
    });

}*/
function login() {

    const name = document.getElementById("name").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;
    const rollNumber = document.getElementById("rollNumber").value.trim();
//changed
    fetch("/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            password: password,
            role: role,
            rollNumber: rollNumber
        })
    })
    .then(res => res.json())
    .then(data => {

        console.log("Login response:", data);

        if(data.status === "success") {

			// ❌ DON'T clear everything

			// Optional: remove only login-related old values
			localStorage.removeItem("username");
			localStorage.removeItem("role");

			// Keep exam data like attemptedExam
            // store new data
            localStorage.setItem("username", data.name);
            localStorage.setItem("role", data.role);
            localStorage.setItem("rollNumber", data.rollNumber);

            console.log("Stored Role:", data.role);
            console.log("Stored Name:", data.name);
            console.log("Stored Roll:", data.rollNumber);

            if(data.role === "teacher") {
                window.location.href = "dashboard-teacher.html";
            }
            else if(data.role === "student") {
                window.location.href = "student-dashboard.html";
            }

        } else {

            alert("Invalid Username or Password");
        }

    })
    .catch(error => {
        console.log(error);
        alert("Server error or backend not running");
    });
}
/*=========================
//   LOAD AVAILABLE EXAMS
========================= */
/*
function loadExams() {
    const rollNo = localStorage.getItem("rollNumber");
    fetch("http://localhost:8081/exam/all")
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("examContainer");
            container.innerHTML = "";

            data.forEach(exam => {
                let attempted = localStorage.getItem(`attemptedExam_${exam.id}_${rollNo}`);
                container.innerHTML += `
                    <div class="exam-card">
                        <h3>${exam.title}</h3>
                        <p>Subject: ${exam.subject}</p>
                        <p>Duration: ${exam.duration} minutes</p>
                        <p>Date: ${exam.examDate}</p>

                        <button 
                            ${attempted ? "disabled" : ""}
                            onclick="startExam(${exam.id})"
                            style="background:${attempted ? 'gray' : '#2c5364'}; color:white;">
                            ${attempted ? "Already Attempted" : "Start Exam"}
                        </button>
                    </div>
                `;
            });
        })
        .catch(err => console.error("Error loading exams:", err));
}*/
function loadExams() {
    const rollNo = localStorage.getItem("rollNumber");
//changed
    fetch("/exam/all")
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("examContainer");
            container.innerHTML = "";

            data.forEach(exam => {
//changed
                fetch(`/results/attempted/${rollNo}/${exam.id}`)
                .then(res => res.json())
                .then(attempted => {

                    container.innerHTML += `
                        <div class="exam-card">
                            <h3>${exam.title}</h3>
                            <p>Subject: ${exam.subject}</p>
                            <p>Duration: ${exam.duration} minutes</p>
                            <p>Date: ${exam.examDate}</p>

                            <button 
                                ${attempted ? "disabled" : ""}
                                onclick="startExam(${exam.id})"
                                style="background:${attempted ? 'gray' : '#2c5364'}; color:white;">
                                ${attempted ? "Already Attempted" : "Start Exam"}
                            </button>
                        </div>
                    `;
                });

            });
        });
}


/* =========================
   START EXAM
========================= 

function startExam(examId) {

		    let rollNo = localStorage.getItem("rollNumber"); // ✅ fixed key

		    // ❌ REMOVE THESE LINES
		    // localStorage.removeItem(`exam_${examId}_${rollNo}`);
		    // localStorage.removeItem(`attemptedExam_${examId}_${rollNo}`);

		    localStorage.setItem("currentExamId", examId);

		    window.location.href = "exam.html";
		}*/
		function startExam(examId) {

		    const rollNumber = localStorage.getItem("rollNumber");
//changed
		    fetch(`/results/attempted/${rollNumber}/${examId}`)
		    .then(res => res.json())
		    .then(attempted => {

		        if(attempted) {
		           // alert("Already attempted");
		            return;
		        }

		        localStorage.setItem("currentExamId", examId);
		        window.location.href = "exam.html";
		    });
		}
	
/* =========================
   TEACHER CREATE EXAM
========================= */
function showCreateExam() {
    document.getElementById("createExamBox").style.display = "block";
}

function createExam() {

const title = document.getElementById("examTitle").value;
const subject = document.getElementById("examSubject").value;
//changed
fetch("/exam/create",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
title:title,
subject:subject
})
})
.then(res=>res.json())
.then(data=>{

document.getElementById("examMessage").innerHTML =
"Exam created successfully! Exam ID : " + data.id;

localStorage.setItem("createdExamId", data.id);

})
.catch(err=>{
document.getElementById("examMessage").innerHTML =
"Exam creation failed";
});
}
function goToAddQuestions(){
   window.location.href = "add-questions.html";
}
function generateQuestions(){

let count = document.getElementById("questionCount").value;
let container = document.getElementById("questionsContainer");

container.innerHTML="";

for(let i=1;i<=count;i++){

container.innerHTML += `
<div style="border:1px solid #ccc;padding:10px;margin-top:10px">

<h4>Question ${i}</h4>

<textarea id="q${i}" placeholder="Enter Question"></textarea><br>

<input type="text" id="a${i}" placeholder="Option A"><br>
<input type="text" id="b${i}" placeholder="Option B"><br>
<input type="text" id="c${i}" placeholder="Option C"><br>
<input type="text" id="d${i}" placeholder="Option D"><br>

<input type="text" id="ans${i}" placeholder="Correct Answer (A/B/C/D)"><br>

</div>
`;

}

}
function submitQuestions(){

let examId = document.getElementById("examId").value;
let count = document.getElementById("questionCount").value;

if(examId=="" || count==""){
window.location.href="question-fail.html";
return;
}

for(let i=1;i<=count;i++){

let question = document.getElementById("q"+i).value.trim();
let a = document.getElementById("a"+i).value.trim();
let b = document.getElementById("b"+i).value.trim();
let c = document.getElementById("c"+i).value.trim();
let d = document.getElementById("d"+i).value.trim();
let ans = document.getElementById("ans"+i).value.trim();

if(question=="" || a=="" || b=="" || c=="" || d=="" || ans==""){
window.location.href="question-fail.html";
return;
}
//changed
fetch("/question/add",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

examId:examId,
questionText:question,
optionA:a,
optionB:b,
optionC:c,
optionD:d,
correctAnswer:ans

})

});

}

window.location.href="question-success.html";

}
/* =========================
   LOGOUT
========================= */
function logout() {
   localStorage.removeItem("username");
   localStorage.removeItem("currentExamId");
   
    window.location.href = "login.html";
}
