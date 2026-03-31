window.onload = function () {

    let role = localStorage.getItem("role");
    let name = localStorage.getItem("username");
    let rollNumber = localStorage.getItem("rollNumber");

    console.log("Role:", role);
    console.log("Name:", name);
    console.log("Roll:", rollNumber);

    // hide both first
    document.getElementById("teacherDiv").style.display = "none";
    document.getElementById("studentDiv").style.display = "none";

    if (role === "teacher") {

        document.getElementById("teacherDiv").style.display = "block";
        document.getElementById("teacherName").value = name;
    }

    if (role === "student") {

        document.getElementById("studentDiv").style.display = "block";
        document.getElementById("rollNumber").value = rollNumber;
    }
};

function changePassword() {

    let role = localStorage.getItem("role");
    let name = localStorage.getItem("username");
    let rollNumber = localStorage.getItem("rollNumber");

    let oldPassword = document.getElementById("oldPassword").value;
    let newPassword = document.getElementById("newPassword").value;

    let requestData = {
        role: role,
        oldPassword: oldPassword,
        newPassword: newPassword
    };

    if (role === "teacher") {
        requestData.name = name;
    }

    if (role === "student") {
        requestData.rollNumber = rollNumber;
    }
//changed
    fetch("/user/changePassword", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(requestData)

    })
   .then(res => res.json())
    .then(data => {

        document.getElementById("message").innerText = data.message;

    })
    .catch(err => {

        document.getElementById("message").innerText = "Error updating password";

    });
	
}