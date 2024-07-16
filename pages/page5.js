
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
    summary = document.getElementById('summary').value;
    education = document.getElementById('education').value;
    degree = document.getElementById('degree').value;
    fieldOfStudy = document.getElementById('field').value;
    gradDate = document.getElementById('graduation').value;
    companyName = document.getElementById('company').value;
    companyCity = document.getElementById('city').value;
    role = document.getElementById('role').value;
    cStartDate = document.getElementById('start').value
    cEndDate = document.getElementById('end').value;
    responsibilities = document.getElementById('responsibilities').value;
    skills = document.getElementById('skills').value;
   
    localStorage.setItem("nameVar",nameVar);
    localStorage.setItem("email",email);
    localStorage.setItem("phone",phone);
    localStorage.setItem('summary',summary);
    localStorage.setItem("education",education);
    localStorage.setItem("degreee",degree);
    localStorage.setItem("field",fieldOfStudy);
    localStorage.setItem("graduation",gradDate);
    localStorage.setItem("company",companyName);
    localStorage.setItem("city",companyCity);
    localStorage.setItem("role",role);
    localStorage.setItem("cStartDate1",cStartDate);
    localStorage.setItem("cEndDate",cEndDate);
    localStorage.setItem("responsibilities",responsibilities);
    localStorage.setItem("skills", skills);

    console.log(nameVar, email);
    window.location.href = "../templates/temp4.html";
}


window.onload = () => {
    if(document.getElementById("resume-template-container")){
        console.log("In template page");
        nameVar=localStorage.getItem("nameVar");
        email=localStorage.getItem("email");
        phone=localStorage.getItem("phone");
        summary=localStorage.getItem('summary');
        education=localStorage.getItem("education");
        degree=localStorage.getItem("degreee");
        fieldOfStudy=localStorage.getItem("field");
        gradDate=localStorage.getItem("graduation");
        companyName=localStorage.getItem("company");
       companyCity =localStorage.getItem("city");
        role=localStorage.getItem("role");
        cStartDate=localStorage.getItem("cStartDate1");
        cEndDate=localStorage.getItem("cEndDate");
        responsibilities=localStorage.getItem("responsibilities");
        skills=localStorage.getItem("skills");

        var skillsArr =skills.split(",");
        console.log(skillsArr);
        console.log(nameVar, email, phone, experience, education, skills);

        document.getElementById("name").innerText = nameVar;
        document.getElementById("contact-info").innerText = email + '\n' + phone;
        document.getElementById("summary").innerText = summary;
        document.getElementById("companyName").innerText = companyName;
        document.getElementById("companyCity").innerText = '|' + companyCity;
        document.getElementById('dateLine').innerText = cStartDate + ' - ' + cEndDate + ' | ' + role;
        document.getElementById('roleDisc').innerText = responsibilities;
        document.getElementById('schoolName').innerText = education;
        document.getElementById('degree').innerHTML = ' | ' + degree;
        document.getElementById('fieldOfStudy').innerHTML = fieldOfStudy + "\n" + gradDate;
        console.log(skillsArr.length);
        var skillItem;
        for (var i = 0; i < skillsArr.length; i++) {
            skillItem = skillsArr[i];
            var li = document.createElement('li')
            li.innerHTML = skillItem;  
            document.getElementById('skills').appendChild(li);
        }
    }
}
