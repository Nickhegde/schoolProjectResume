
var nameVar = "";
var email = "";
var phone = "";
var experience = "";
var education = "";
var skills = "";

var onResumeSubmit = (event) => {
    event.preventDefault();
    console.log("on submit");
    nameVar = document.getElementById('name').value;
    email = document.getElementById('email').value;
    phone = document.getElementById('phone').value;
    experience = document.getElementById('experience').value;
    education = document.getElementById('education').value;
    skills = document.getElementById('skills').value;
   
    localStorage.setItem("nameVar",nameVar);
    localStorage.setItem("email",email);
    localStorage.setItem("phone",phone);
    localStorage.setItem("experience",experience);
    localStorage.setItem("education",education);
    localStorage.setItem("skills", skills);

    console.log(nameVar, email);
    window.location.href = "../templates/temp3.html";
}


window.onload = () => {
    if(document.getElementById("resume-template-container")){
        console.log("In template page");
        nameVar = localStorage.getItem("nameVar");
        email = localStorage.getItem("email");
        phone = localStorage.getItem("phone");
        experience = localStorage.getItem("experience");
        education = localStorage.getItem("education");
        var educationArr =education.split(",");
        console.log(educationArr);
        skills = localStorage.getItem("skills");
        var skillsArr =skills.split(",");
        console.log(skillsArr);
        console.log(nameVar, email, phone, experience, education, skills);

        document.getElementById("name").innerText = nameVar;
        document.getElementById("email").innerText = email;
        document.getElementById("contact").innerText = phone;
        document.getElementById("experience").innerText = experience;
        console.log(education.length);
        var educationtem;
        for (var i = 0; i < educationArr.length; i++) {
            educationItem = educationArr[i];
            var li = document.createElement('li');
            li.innerHTML = educationtem;  
            document.getElementById('education').appendChild(li);
        }
        console.log(skillsArr.length);
        var skillItem;
        for (var i = 0; i < skillsArr.length; i++) {
            skillItem = skillsArr[i];
            var li = document.createElement('li');
            li.innerHTML = skillItem;  
            document.getElementById('skills').appendChild(li);
        }
    }
}
