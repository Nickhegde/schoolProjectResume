
var nameVar = "";
var email = "";
var phone = "";
var experience = "";
var education = "";
var skills = "";
var languages = "";
var hobbies = "";

var educationCount = 1;
var experienceCount = 1;
var publicationsCount = 1;

var onResumeSubmit = (event) => {
    event.preventDefault();
    console.log("on submit");
    nameVar = document.getElementById('name').value;
    email = document.getElementById('email').value;
    phone = document.getElementById('phone').value;
    experience = JSON.stringify(readTextareaValues("experience"));
    education = JSON.stringify(readTextareaValues("education"));
    skills = document.getElementById('skills').value;
    languages = document.getElementById('languages').value;
    hobbies = document.getElementById('hobbies').value;
    publications = JSON.stringify(readTextareaValues("publications"));

   
    localStorage.setItem("pageFlag",'3');
    localStorage.setItem("nameVar",nameVar);
    localStorage.setItem("email",email);
    localStorage.setItem("phone",phone);
    localStorage.setItem("experience",experience);
    localStorage.setItem("education",education);
    localStorage.setItem("skills", skills);
    localStorage.setItem("languages", languages);
    localStorage.setItem("hobbies", hobbies);
    localStorage.setItem("publications", publications);

    console.log(nameVar, email);
    window.location.href = "../templates/temp3.html";
}

var readTextareaValues = (id) => {
    const mainDiv = document.getElementById(id);
    let resultArray = [];
    const childDivs = mainDiv.children;

    for (let i = 0; i < childDivs.length; i++) {
        const childDiv = childDivs[i];
        let valuesObject = {};
        const textareas = childDiv.getElementsByTagName('textarea');

        for (let j = 0; j < textareas.length; j++) {
            const textarea = textareas[j];
            valuesObject[textarea.name] = textarea.value;
        }
        resultArray.push(valuesObject);
    }
    console.log(resultArray);
    return resultArray;
}


window.onload = () => {
    if(document.getElementById("resume-template-container") && (localStorage.getItem("pageFlag") === '3')){
        console.log("In template page");
        nameVar = localStorage.getItem("nameVar");
        email = localStorage.getItem("email");
        phone = localStorage.getItem("phone");
        skills = localStorage.getItem("skills");
        var skillsArr =skills.split(",");
        languages = localStorage.getItem("languages");
        var languagesArr =languages.split(",");
        hobbies = localStorage.getItem("hobbies");
        var hobbiesArr =hobbies.split(",");

        setListItems(skillsArr,"skills");
        setListItems(languagesArr,"languages");
        setListItems(hobbiesArr,"hobbies");

        setEducation();
        setExperience();
        setPublication();

        document.getElementById("name").innerText = nameVar;
        document.getElementById("email").innerText = email;
      
        console.log(skillsArr.length);
        
    }
}

var setListItems = (Arr,id) => {
    var item;
    for (var i = 0; i < Arr.length; i++) {
        item = Arr[i];
        var li = document.createElement('li');
        li.innerHTML = item;  
        document.getElementById(id).appendChild(li);
    }
}

var setEducation = () => {
    var education = localStorage.getItem("education");
    var educationArr =JSON.parse(education);
    var educationItem;
        let educationContainer = document.getElementById("education");
        for (var i = 0; i < educationArr.length; i++) {
            educationItem = educationArr[i];
            const htmlString = `<div class="item" contenteditable="true">
            <div class="meta-info">
                <div class="upper-row">
                    <h3 class="job-title">${educationItem.degree}</h3>
                    <div class="time">${educationItem.year}</div>
                </div>
                <div class="company">${educationItem.university}</div>
            </div>
            <div class="details">
                <p>${educationItem.about}</p>  
            </div>
          </div>`

          educationContainer.insertAdjacentHTML('beforeend', htmlString);
        }
        return;
}

var setExperience = () => {
    var experience = localStorage.getItem("experience");
    var experienceArr =JSON.parse(experience);
    var experienceItem;
    let experienceContainer = document.getElementById("experience");
    for (var i = 0; i < experienceArr.length; i++) {
        experienceItem = experienceArr[i];
        const htmlString = `<div class="item" contenteditable="true">
        <div class="meta-info">
            <div class="upper-row">
                <h3 class="job-title">${experienceItem.jobTitle}</h3>
                <div class="time">${experienceItem.jobTime}</div>
            </div>
            <div class="company">${experienceItem.company}</div>
        </div>
        <div class="details">
            <p>${experienceItem.details}</p>  
        </div>
      </div>`

        experienceContainer.insertAdjacentHTML('beforeend', htmlString);
    }
    return;
}

var setPublication = () => {
    var publications = localStorage.getItem("publications");
    var publicationsArr =JSON.parse(publications);
    var publicationItem;
    let publicationsContainer = document.getElementById("publications");
    for (var i = 0; i < publicationsArr.length; i++) {
        publicationItem = publicationsArr[i];
        const htmlString = `<p class="reference" contenteditable="true">${publicationItem.publication}</p>`

        publicationsContainer.insertAdjacentHTML('beforeend', htmlString);
    }
    return;
}

var onAddMoreEducation = () => {
    educationCount = educationCount + 1;
    let educationContainer = document.getElementById("education");

    const htmlString = `<div id="education-container-${educationCount}">
    <textarea id="degree-name-${educationCount}" name="degree"  required placeholder="Name of the degree"></textarea>
    <textarea id="university-name-${educationCount}" name="university"  required placeholder="University Name"></textarea>
    <textarea id="year-${educationCount}" required name="year" placeholder="Year"></textarea>
    <textarea id="about-${educationCount}" required name="about" placeholder="About the Degree">Lorem ipsum dolor sit amet consectetur adipisicing elit.</textarea>
    <button class="remove-education" id="remove-education-${educationCount}" onclick="onRemoveEducation('education-container-${educationCount}')">Remove</button>
    </div>`;

    educationContainer.insertAdjacentHTML('beforeend', htmlString);
}

var onRemoveEducation = (id) => {
    if(educationCount===1) return;
    onRemoveChild("education",id);
    educationCount=educationCount-1;
}

var onAddMoreExperience = () => {
    experienceCount = experienceCount + 1;
    let experienceContainer = document.getElementById("experience");

    const htmlString = `<div id="experience-container-${experienceCount}">
    <textarea id="job-title-${experienceCount}" name="jobTitle"  required placeholder="Job Title"></textarea>
    <textarea id="job-time-${experienceCount}" name="jobTime"  required placeholder="Time"></textarea>
    <textarea id="company-${experienceCount}" required name="company" placeholder="Company"></textarea>
    <textarea id="details-${experienceCount}" required name="details" placeholder="Details">Lorem ipsum dolor sit amet consectetur adipisicing elit.</textarea>
    <button class="remove-job" id="remove-job-${experienceCount}" onclick="onRemoveJob('experience-container-${experienceCount}')">Remove</button>
    </div>`;

    experienceContainer.insertAdjacentHTML('beforeend', htmlString);
}

var onRemoveJob = (id) => {
    console.log(experienceCount);
    if(experienceCount === 1) return;
    onRemoveChild("experience",id);
    experienceCount=experienceCount-1;
}

var onAddMorePublication = () => {
    publicationsCount = publicationsCount + 1;
    let publicationsContainer = document.getElementById("publications");

    const htmlString = `<div id="publication-container-${publicationsCount}">
    <textarea id="publication-name-${publicationsCount}" name="publication"  required placeholder="Name of the publication"></textarea>
    <button class="remove-publication" id="remove-publication-${publicationsCount}" onclick="onRemovePublication('publication-container-${publicationsCount}')">Remove</button>
    </div>`;

    publicationsContainer.insertAdjacentHTML('beforeend', htmlString);
}

var onRemovePublication = (id) => {
    if(experienceCount === 1) return;
    onRemoveChild("publications",id);
    publicationsCount=publicationsCount-1;
}

var onRemoveChild = (parentId,childId) => {
    let parent = document.getElementById(parentId);
    let child = document.getElementById(childId);
    parent.removeChild(child);
    return;
}