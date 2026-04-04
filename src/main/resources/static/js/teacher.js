// ===============================
// CREATE EXAM
// ===============================

function createExam(){
	console.log("Create Exam clicked");

const title = document.getElementById("examTitle").value;
const subject = document.getElementById("examSubject").value;
const examDate = document.getElementById("examDate").value;
const duration = document.getElementById("duration").value;
//changed
fetch("/exam/create",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
title:title,
subject:subject,
examDate:examDate,
duration:duration
})

})

.then(response => response.json())

.then(data => {

document.getElementById("examMessage").innerText =
"Exam created successfully! Exam ID: " + data.id;

localStorage.setItem("createdExamId", data.id);

})

.catch(error =>{

document.getElementById("examMessage").innerText =
"Error creating exam";

console.error(error);

});

}

function addQuestion(){

const examId = parseInt(document.getElementById("examId").value);
const questionText = document.getElementById("questionText").value;
const optionA = document.getElementById("optionA").value;
const optionB = document.getElementById("optionB").value;
const optionC = document.getElementById("optionC").value;
const optionD = document.getElementById("optionD").value;
const correctAnswer = document.getElementById("correctAnswer").value;

// VALIDATION
if(
!examId ||
questionText === "" ||
optionA === "" ||
optionB === "" ||
optionC === "" ||
optionD === "" ||
correctAnswer === ""
){
window.location.href = "question-failed.html";
return;
}
//changed
fetch("/question/add",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
questionText: questionText,
optionA: optionA,
optionB: optionB,
optionC: optionC,
optionD: optionD,
correctAnswer: correctAnswer,
exam:{
id:parseInt (examId)
}
})

})

.then(response => {

if(response.ok){
window.location.href = "question-success.html";
}else{
window.location.href = "question-failed.html";
}

})

.catch(error => {
console.error("Error:", error);
window.location.href = "question-failed.html";
});

}
function goToAddQuestions(){
	window.location.href="add-questions.html";
}


function generateQuestions(){

let count=document.getElementById("questionCount").value;

let container=document.getElementById("questionsContainer");

container.innerHTML="";

for(let i=1;i<=count;i++){

container.innerHTML+=`

<div class="question-box">

<h4>Question ${i}</h4>

<textarea id="q${i}" placeholder="Enter Question"></textarea>

<input type="text" id="a${i}" placeholder="Option A">
<input type="text" id="b${i}" placeholder="Option B">
<input type="text" id="c${i}" placeholder="Option C">
<input type="text" id="d${i}" placeholder="Option D">

<input type="text" id="ans${i}" placeholder="Correct Answer">

</div>

`;

}

} 


function submitQuestions(){

let examId=document.getElementById("examId").value;
let count=document.getElementById("questionCount").value;

if(examId=="" || count==""){
window.location.href="question-failed.html";
return;
}

let questions=[];

for(let i=1;i<=count;i++){

let q=document.getElementById("q"+i).value.trim();
let a=document.getElementById("a"+i).value.trim();
let b=document.getElementById("b"+i).value.trim();
let c=document.getElementById("c"+i).value.trim();
let d=document.getElementById("d"+i).value.trim();
let ans=document.getElementById("ans"+i).value.trim();

if(q=="" || a=="" || b=="" || c=="" || d=="" || ans==""){
window.location.href="question-failed.html";
return;
}

questions.push({
questionText:q,
optionA:a,
optionB:b,
optionC:c,
optionD:d,
correctAnswer:ans
});

}
//changed

fetch("/question/create-multiple",{

method:"POST",
headers:{"Content-Type":"application/json"},

body:JSON.stringify({
examId:examId,
questions:questions
})

})

.then(res=>{

if(res.ok){
window.location.href="question-success.html";
}else{
window.location.href="question-failed.html";
}

})

.catch(()=>{
window.location.href="question-failed.html";
});

}


function goToMarks(){
    window.location.href = "teacher-results.html";
}


function loadMarks() {

    const examId = document.getElementById("examId").value;
//changed
    fetch(`/results/${examId}`)
    .then(res => res.json())
    .then(data => {

        let output = "<table border='1'>";

        output += "<tr><th>Name</th><th>Roll</th><th>Exam</th><th>Score</th></tr>";

        data.forEach(r => {
            output += `<tr>
                        <td>${r.name}</td>
                        <td>${r.rollNumber}</td>
                        <td>${r.examId}</td>
                        <td>${r.score}</td>
                       </tr>`;
        });

        output += "</table>";

        document.getElementById("marksList").innerHTML = output;
    });
}
function logout(){
	localStorage.removeItem("username");
	localStorage.removeItem("currentExamId");
	window.location.href="login.html";
}



function goToCreate(){
    window.location.href = "teacher-dashboard.html";
}
// Edit
function goToEdit(){
    window.location.href = "edit-questions.html";
}
// ===============================
// LOAD QUESTIONS FOR EDIT
// ===============================

function loadQuestions(){

    let examId = document.getElementById("examId").value;
//changed
    fetch("/question/exam/" + examId)
    .then(res => res.json())
    .then(data => {

        let container = document.getElementById("questionList");
        container.innerHTML = "";

        data.forEach(q => {

            container.innerHTML += `
            <div style="border:1px solid #ccc;margin:10px;padding:10px">

                <h4>Question ID: ${q.id}</h4>

                <textarea id="q_${q.id}" style="width:100%;height:60px;">
${q.questionText}</textarea>

                <br><br>

                <input type="text" id="a_${q.id}" value="${q.optionA}" placeholder="Option A"><br><br>
                <input type="text" id="b_${q.id}" value="${q.optionB}" placeholder="Option B"><br><br>
                <input type="text" id="c_${q.id}" value="${q.optionC}" placeholder="Option C"><br><br>
                <input type="text" id="d_${q.id}" value="${q.optionD}" placeholder="Option D"><br><br>

                <input type="text" id="ans_${q.id}" value="${q.correctAnswer}" placeholder="Correct Answer"><br><br>

                <button onclick="updateQuestion(${q.id})">Update</button>

                <button onclick="deleteQuestion(${q.id})"
                    style="background:red;color:white;margin-left:10px;">
                    Delete
                </button>

            </div>
            `;
        });

    })
    .catch(error => {
        console.error("Error loading questions:", error);
    });
}

function deleteQuestion(id){

    if(!confirm("Are you sure to delete this question?")) return;
//changed
    fetch("/question/delete/" + id, {
        method: "DELETE"
    })
    .then(res => {
        if(res.ok){
            alert("Question deleted");
            loadQuestions(); // refresh list
        } else {
            alert("Delete failed");
        }
    })
    .catch(err => console.error(err));
}
// ===============================
// UPDATE QUESTION
// ===============================
function updateQuestion(id){

    let examId = document.getElementById("examId").value; // 👈 ADD THIS

    let updatedData = {
        questionText: document.getElementById("q_" + id).value,
        optionA: document.getElementById("a_" + id).value,
        optionB: document.getElementById("b_" + id).value,
        optionC: document.getElementById("c_" + id).value,
        optionD: document.getElementById("d_" + id).value,
        correctAnswer: document.getElementById("ans_" + id).value,
        exam: {                      // 👈 VERY IMPORTANT
            id: parseInt(examId)
        }
    };
//changed removed/after upadte    //"+id;
   fetch("/question/update" + id,  {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
    })
    .then(res => {
        if(res.ok){
            window.location.href="update-success.html"+id;
        } else {
			window.location.href="update-failed.html"+id;
        }
    })
    .catch(error => {
        console.error("Error updating question:", error);
    });
}
//view
function goToView(){
    window.location.href = "view.questions.html";
}
//load full exams
function loadFullExam(){

    let examId = document.getElementById("examId").value;

    // Exam details
	//changed and removed/after exam
    fetch("/exam" + examId)
    .then(res => res.json())
    .then(exam => {

        document.getElementById("examDetails").innerHTML = `
            <h3>${exam.title}</h3>
            <p>Subject: ${exam.subject}</p>
            <p>Date: ${exam.examDate}</p>
            <p>Duration: ${exam.duration}</p>
            <hr>
        `;
    });

    // Questions cahnged/question/exam/
    fetch("/question/exam/" + examId)
    .then(res => res.json())
    .then(data => {

        let container = document.getElementById("questionList");
        container.innerHTML = "";

        data.forEach((q, i) => {

            container.innerHTML += `
            <div>
                <h4>Q${i+1}: ${q.questionText}</h4>
                <p>A) ${q.optionA}</p>
                <p>B) ${q.optionB}</p>
                <p>C) ${q.optionC}</p>
                <p>D) ${q.optionD}</p>
                <p><b>Answer:</b> ${q.correctAnswer}</p>
            </div>
            `;
        });
    });
}


function allowRetake(){

    let examId = document.getElementById("examId").value.trim();
    let rollNo = document.getElementById("rollNo").value.trim();

    console.log("Exam ID:", examId);
    console.log("Roll No:", rollNo);

    if(!examId || !rollNo){
        alert("Enter both Exam ID and Roll No");
        return;
    }
	//http://localhost:8081/results/retake/${rollNo}/${examId} changed

    fetch(`/results/retake/${rollNo}/${examId}`, {
        method: "DELETE"
    })
    .then(res => res.text())
    .then(data => {

        console.log("Server response:", data);

        if(data === "success"){
            alert("✅ Retake allowed successfully");
        } else {
            alert("❌ Result not found");
        }

    })
    .catch(err => {
        console.error(err);
        alert("Server error");
    });
}
function goToRetake(){
    window.location.href = "allow-retake.html";
}
function deleteExam(){

    let examId = document.getElementById("examId").value;

    if(!examId){
        alert("Enter Exam ID");
        return;
    }

    if(!confirm("Delete entire exam? All questions will be removed!")) return;
	// changedfetch("http://localhost:8081/exam/delete/" + examId, {
    fetch("/exam/delete/" + examId, {
        method: "DELETE"
    })
	.then(res=>{
	    console.log("Status:", res.status);  // 👈 ADD THIS

	    if(res.ok){
	        alert("Exam Deleted Successfully");
	    }else{
	        alert(" Delete Failed");
	    }
	})
    .catch(err => console.error(err));
}
function goToDeleteExam(){
    window.location.href = "delete-exam.html";
}
function loadTeacherExamsSummary() {
	//fetch("http://localhost:8081/exam/all") cahnged
    fetch("/exam/all") // make sure this endpoint returns all exams
        .then(res => res.json())
        .then(data => {
            console.log("Exams data from backend:", data);

            let tbody = document.querySelector("#teacherExamTable tbody");
            tbody.innerHTML = "";

            if (!data || data.length === 0) {
                tbody.innerHTML = `<tr><td colspan="3" style="text-align:center">No exams found</td></tr>`;
                return;
            }

            data.forEach(exam => {
                console.log("Single exam object:", exam);

                // ❗ Use exact property names your backend returns
                let examID = exam.id || exam.examID || "N/A";
                let title = exam.title || exam.name || "Untitled";
                

                let row = `
                    <tr>
                        <td>${examID}</td>
                        <td>${title}</td>
                        
                    </tr>
                `;
                tbody.innerHTML += row;
            });
        })
        .catch(err => console.error("Error loading exams:", err));
}


// Call this when page loads
window.onload = function() {

    // run only if table exists
    if(document.querySelector("#teacherExamTable")){
        loadTeacherExamsSummary();
    }

};