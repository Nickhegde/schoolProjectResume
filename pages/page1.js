
var nameVar = "";
var email = "";
var phone = "";
var experience = "";
var education = "";
var skills = "";
var objective = "";

var educationCount = 1;
var experienceCount = 1;
var projectsCount = 1;

var onResumeSubmit = (event) => {
    event.preventDefault();
    console.log("on submit");
    nameVar = document.getElementById('name').value;
    email = document.getElementById('email').value;
    phone = document.getElementById('phone').value;
    objective = document.getElementById('objective').value;
    summary = document.getElementById('summary').value;
    experience = JSON.stringify(readTextareaValues("experience"));
    education = JSON.stringify(readTextareaValues("education"));
    projects = JSON.stringify(readTextareaValues("projects"));
    skills = document.getElementById('skills').value;
   
    localStorage.setItem("nameVar",nameVar);
    localStorage.setItem("email",email);
    localStorage.setItem("phone",phone);
    localStorage.setItem("objective",objective);
    localStorage.setItem("summary",summary);
    localStorage.setItem("experience",experience);
    localStorage.setItem("education",education);
    localStorage.setItem("skills", skills);
    localStorage.setItem("projects",projects);

    window.location.href = "../templates/temp1.html";
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
    if(document.getElementById("resume-template-container")){
        nameVar = localStorage.getItem("nameVar");
        email = localStorage.getItem("email");
        phone = localStorage.getItem("phone");
        objective = localStorage.getItem("objective");

        document.getElementById("name").innerText = nameVar;
        document.getElementById("email").innerText = email;
        document.getElementById("contact").innerText = phone;
        document.getElementById("objective").innerText = objective;
        document.getElementById("summary").innerText = summary;

        skills = localStorage.getItem("skills");
        var skillsArr =skills.split(",");

        setEducation();
        setExperience();
        setProjects();
        setListItems(skillsArr,"skills");
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
            const htmlString = `<p contenteditable="true">
            ${educationItem.degree}
            </p>`

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
        const htmlString = `<article class="flex-group">
        <div contenteditable="true">
          <h4>${experienceItem.company}</h4>
          <hr>
         <small>
          ${experienceItem.jobTime}
         </small>
        </div>
        <div class="full">
          <a>${experienceItem.jobTitle}</a>
          <p contenteditable="true">
            ${experienceItem.details}     
          </p>
        </div>
      </article>`

        experienceContainer.insertAdjacentHTML('beforeend', htmlString);
    }
    return;
}

var setProjects = () => {
    var projects = localStorage.getItem("projects");
    var projectsArr =JSON.parse(projects);
    var projectsItem;
    let projectsContainer = document.getElementById("projects");
    for (var i = 0; i < projectsArr.length; i++) {
        projectsItem = projectsArr[i];
        const htmlString = `<article class="flex-group">
        <div contenteditable="true">
          <h4><a href="">${projectsItem.projectTitle}</a></h4>
          <p>${projectsItem.projectRole}r</p>
        </div>
        <div class="full">
          <p contenteditable="true">
            ${projectsItem.projectDetails}     
          </p>
           <hr>
        </div>
      </article>`

      projectsContainer.insertAdjacentHTML('beforeend', htmlString);
    }
    return;
}


var onAddMoreEducation = () => {
    educationCount = educationCount + 1;
    let educationContainer = document.getElementById("education");

    const htmlString = `<div id="education-container-${educationCount}">
    <textarea id="degree-name-${educationCount}" name="degree"  required placeholder="Details"></textarea>
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

var onAddMoreProject = () => {
    projectssCount = projectssCount + 1;
    let projectsContainer = document.getElementById("projects");

    const htmlString = `<div id="projects-container-${projectssCount}">
    <textarea id="project-title-${projectssCount}" name="projectTitle"  required placeholder="Project Title"></textarea>
    <textarea id="projectRole-${projectssCount}" name="projectRole"  required placeholder="Role"></textarea>
    <textarea id="projectDetails-${projectssCount}" required name="projectDetails" placeholder="Details">Lorem ipsum dolor sit amet consectetur adipisicing elit.</textarea>
    <button class="remove-project" id="remove-project-${projectssCount}" onclick="onRemoveProject('projects-container-${projectssCount}')">Remove</button>
    </div>`;

projectsContainer.insertAdjacentHTML('beforeend', htmlString);
}

var onRemoveProject = (id) => {
    if(experienceCount === 1) return;
    onRemoveChild("projects",id);
    projectssCount=projectssCount-1;
}

var onRemoveChild = (parentId,childId) => {
    let parent = document.getElementById(parentId);
    let child = document.getElementById(childId);
    parent.removeChild(child);
    return;
}