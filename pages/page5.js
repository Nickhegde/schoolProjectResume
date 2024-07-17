
var nameVar = "";
var email = "";
var phone = "";
var experience = "";
var education = "";
var skills = "";
var languages = "";
var hobbies = "";

var educationCount = 0;
var experienceCount = 0;
var publicationsCount = 0;

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
    window.location.href = "../templates/temp2.html";
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
    if(document.getElementById("resume-form")){
        let hasExperince = false;
        let hasEdu = false;
        let hasPublications = false;
        console.log('=========page load setup for resume-form')
        for (let i = 1; i <= localStorage.length; i++) {
            if (localStorage.getItem(`experience-${i}`)) {
                experienceCount = i - 1;
                onAddMoreExperience();
                hasExperince = true;
            }
            if(localStorage.getItem(`education-${i}`)){
                educationCount = i - 1;
                onAddMoreEducation();
                hasEdu = true;
            }
            if(localStorage.getItem(`publication-${i}`)){
                publicationsCount = i - 1;
                onAddMorePublication();
                hasPublications = true;
            }
        }
        if(!hasExperince){
            onAddMoreExperience()
        }

        if(!hasEdu){onAddMoreEducation();}
        if(!hasPublications){onAddMorePublication();}
    }
    if(document.getElementById("resume-template-container")){
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

        // setEducation();
        // setExperience();
        // setPublication();
        for (let i = 1; i <= localStorage.length; i++) {
            if (localStorage.getItem(`experience-${i}`)) {
                experienceCount = i - 1;
                setExperience(localStorage.getItem(`experience-${i}`));
            }
            if(localStorage.getItem(`education-${i}`)){
                educationCount = i - 1;
                setEducation(localStorage.getItem(`education-${i}`));
            }
            if(localStorage.getItem(`publication-${i}`)){
                publicationsCount = i - 1;
                setPublication(localStorage.getItem(`publication-${i}`));
            }
        }

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

var setEducation = (education) => {
    var educationItem =JSON.parse(education);
        let educationContainer = document.getElementById("education");
            const htmlString = `<div class="item" contenteditable="true">
            <div class="meta-info">
                <div class="upper-row">
                    <h3 class="job-title">${educationItem.degreeName}</h3>
                    <div class="time">${educationItem.gradYear}</div>
                </div>
                <div class="company">${educationItem.universityName}</div>
            </div>
            <div class="details">
                <p>${educationItem.about}</p>  
            </div>
          </div>`

          educationContainer.insertAdjacentHTML('beforeend', htmlString);
        
        return;
}

var setExperience = (experience) => {
console.log('=====exp=======',experience)
    var experienceItem =JSON.parse(experience);
    let experienceContainer = document.getElementById("experience");
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
    return;
}

var setPublication = (publications) => {
    var publicationItem =JSON.parse(publications);
    let publicationsContainer = document.getElementById("publications");
        const htmlString = `<p class="reference" contenteditable="true">${publicationItem.publicationName}</p>`

        publicationsContainer.insertAdjacentHTML('beforeend', htmlString);
    
    return;
}

var onAddMoreEducation = () => {
    educationCount = educationCount + 1;
    let educationContainer = document.getElementById("education");
    const newEdu = document.createElement('comp-edu');
    newEdu.setAttribute('id', educationCount);
    educationContainer.appendChild(newEdu);


   
}

var onRemoveEducation = (id) => {
    if(educationCount===1) return;
    onRemoveChild("education",id);
    educationCount=educationCount-1;
}

var onAddMoreExperience = () => {
    experienceCount = experienceCount + 1;
    let experienceContainer = document.getElementById("experience");
    const newExp = document.createElement('comp-exp');
    newExp.setAttribute('id', experienceCount);
    experienceContainer.appendChild(newExp);
}

var onRemoveJob = (id) => {
    console.log(experienceCount);
    if(experienceCount === 1) return;
    onRemoveChild("experience",id);
    experienceCount=experienceCount-1;
}

var onAddMorePublication = () => {
    publicationsCount = publicationsCount + 1;
    const newPublication = document.createElement('comp-publication');
    newPublication.setAttribute('id', publicationsCount);
    document.getElementById('publications').appendChild(newPublication);

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

class Education extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
                <style>
                        label {
                    display: block;
                    margin-top: 1em;
                }

                input, textarea {
                    width: 100%;
                    padding: 0.5em;
                    margin-top: 0.5em;
                }

                button {
                    display: block;
                    width: 100%;
                    padding: 1em;
                    background-color: #333;
                    color: #fff;
                    border: none;
                    margin-top: 1em;
                    cursor: pointer;
                }
                .add-more-education, .remove-education, 
                .add-more-experience, .remove-job, 
                .add-more-publication, .remove-publication {
                    width: 25%;
                }

                button:hover {
                    background-color: #555;
                }

        </style>
                <div class="education-container">
                    <textarea class="degree-name" name="degree" required placeholder="Name of the degree"></textarea>
                    <textarea class="university-name" name="university" required placeholder="University Name"></textarea>
                    <textarea class="year" name="year" required placeholder="Year"></textarea>
                    <textarea class="about" name="about" required placeholder="About the Degree">Lorem ipsum dolor sit amet consectetur adipisicing elit.</textarea>
                    <button class="remove-education">Remove</button>
                </div>`;
        this.shadowRoot.querySelector('.remove-education').addEventListener('click', () => {
            this.remove();
            this.removeFromLocalStorage();
        });
    }
    connectedCallback() {
        const educationCount = this.getAttribute('id');
        this.shadowRoot.querySelector('.education-container').setAttribute('id', `education-container-${educationCount}`);

        this.shadowRoot.querySelector('.degree-name').setAttribute('id', `degree-name-${educationCount}`);
        this.shadowRoot.querySelector('.university-name').setAttribute('id', `university-name-${educationCount}`);
        this.shadowRoot.querySelector('.year').setAttribute('id', `year-${educationCount}`);
        this.shadowRoot.querySelector('.about').setAttribute('id', `about-${educationCount}`);
        
        this.shadowRoot.querySelectorAll('textarea').forEach(textarea => {
            textarea.addEventListener('input', () => {
                this.saveToLocalStorage(educationCount);
            });
        });
        // Load data from local storage if available
        this.loadFromLocalStorage(educationCount);
    }
    saveToLocalStorage(id) {
        const data = {
            degreeName: this.shadowRoot.querySelector('.degree-name').value,
            universityName: this.shadowRoot.querySelector('.university-name').value,
            gradYear: this.shadowRoot.querySelector('.year').value,
            about:this.shadowRoot.querySelector('.about').value,
        };
        localStorage.setItem(`education-${id}`, JSON.stringify(data));
    }
    loadFromLocalStorage(id) {
        const savedData = JSON.parse(localStorage.getItem(`education-${id}`));
        if (savedData) {
            this.shadowRoot.querySelector('.degree-name') = savedData.degreeName;
            this.shadowRoot.querySelector('.university-name')=savedData.universityName;
            this.shadowRoot.querySelector('.year')= savedData.gradYear;
            this.shadowRoot.querySelector('.about')=savedData.about;
        }
    }
    removeFromLocalStorage() {
        const educationCount = this.getAttribute('id');
        localStorage.removeItem(`experience-${educationCount}`);
    }

}
customElements.define('comp-edu', Education);

class Experience extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
                <style>
                        label {
                    display: block;
                    margin-top: 1em;
                }

                input, textarea {
                    width: 100%;
                    padding: 0.5em;
                    margin-top: 0.5em;
                }

                button {
                    display: block;
                    width: 100%;
                    padding: 1em;
                    background-color: #333;
                    color: #fff;
                    border: none;
                    margin-top: 1em;
                    cursor: pointer;
                }
                .add-more-education, .remove-education, 
                .add-more-experience, .remove-job, 
                .add-more-publication, .remove-publication {
                    width: 25%;
                }

                button:hover {
                    background-color: #555;
                }

        </style>
        
                <div class="experience-container">
                    <textarea class="job-title" name="jobTitle" required placeholder="Job Title"></textarea>
                    <textarea class="job-time" name="jobTime" required placeholder="Time"></textarea>
                    <textarea class="company" name="company" required placeholder="Company"></textarea>
                    <textarea class="details" name="details" required placeholder="Details">Lorem ipsum dolor sit amet consectetur adipisicing elit.</textarea>
                    <button class="remove-job">Remove</button>
                </div>`;
        this.shadowRoot.querySelector('.remove-job').addEventListener('click', () => {
            this.remove();
            this.removeFromLocalStorage();
        });
    }
    connectedCallback() {
        const educationCount = this.getAttribute('id');
        this.shadowRoot.querySelector('.job-title').setAttribute('id', `job-title-${experienceCount}`);
        this.shadowRoot.querySelector('.job-time').setAttribute('id', `job-time-${experienceCount}`);
        this.shadowRoot.querySelector('.company').setAttribute('id', `company-${experienceCount}`);
        this.shadowRoot.querySelector('.details').setAttribute('id', `details-${experienceCount}`);
        this.shadowRoot.querySelector('.remove-job').setAttribute('id', `remove-job-${experienceCount}`);
        // this.shadowRoot.querySelector('.remove-job').setAttribute('onclick', `onRemoveJob('experience-container-${experienceCount}')`);

        this.shadowRoot.querySelectorAll('textarea').forEach(textarea => {
            textarea.addEventListener('input', () => {
                this.saveToLocalStorage(experienceCount);
            });
        });

        // Load data from local storage if available
        this.loadFromLocalStorage(experienceCount);
    }
    saveToLocalStorage(id) {
        const data = {
            jobTitle: this.shadowRoot.querySelector('.job-title').value,
            jobTime: this.shadowRoot.querySelector('.job-time').value,
            company: this.shadowRoot.querySelector('.company').value,
            details: this.shadowRoot.querySelector('.details').value
        };
        localStorage.setItem(`experience-${id}`, JSON.stringify(data));
    }

    loadFromLocalStorage(id) {
        const savedData = JSON.parse(localStorage.getItem(`experience-${id}`));
        if (savedData) {
            this.shadowRoot.querySelector('.job-title').value = savedData.jobTitle;
            this.shadowRoot.querySelector('.job-time').value = savedData.jobTime;
            this.shadowRoot.querySelector('.company').value = savedData.company;
            this.shadowRoot.querySelector('.details').value = savedData.details;
        }
    }

    removeFromLocalStorage() {
        const experienceCount = this.getAttribute('id');
        localStorage.removeItem(`experience-${experienceCount}`);
    }
}
customElements.define('comp-exp', Experience);


class Publication extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = ` <style>
        label {
    display: block;
    margin-top: 1em;
}

input, textarea {
    width: 100%;
    padding: 0.5em;
    margin-top: 0.5em;
}

button {
    display: block;
    width: 100%;
    padding: 1em;
    background-color: #333;
    color: #fff;
    border: none;
    margin-top: 1em;
    cursor: pointer;
}
.add-more-education, .remove-education, 
.add-more-experience, .remove-job, 
.add-more-publication, .remove-publication {
    width: 25%;
}

button:hover {
    background-color: #555;
}

        </style>
        <div class="publication-container">
                    <textarea class="publication-name" name="publication" required placeholder="Name of the publication">Author, A. My publication is superrad.</textarea>
                    <button class="remove-publication">Remove</button>
                </div>`;
        this.shadowRoot.querySelector('.remove-publication').addEventListener('click', () => {
            this.remove();
            this.removeFromLocalStorage();

        });
    }
    connectedCallback() {
        const publicationsCount = this.getAttribute('id');
        this.shadowRoot.querySelector('.publication-name').setAttribute('id', `publication-name-${publicationsCount}`);
        this.shadowRoot.querySelector('.remove-publication').setAttribute('id', `remove-publication-${publicationsCount}`);

        this.shadowRoot.querySelectorAll('textarea').forEach(textarea => {
            textarea.addEventListener('input', () => {
                this.saveToLocalStorage(publicationsCount);
            });
        });

        // Load data from local storage if available
        this.loadFromLocalStorage(publicationsCount);
    }
    saveToLocalStorage(id) {
        const data = {
            publicationName: this.shadowRoot.querySelector('.publication-name').value,
           
        };
        localStorage.setItem(`publication-${id}`, JSON.stringify(data));
    }
    loadFromLocalStorage(id) {
        const savedData = JSON.parse(localStorage.getItem(`publication-${id}`));
        if (savedData) {
            this.shadowRoot.querySelector('.publication-name').value = savedData.publicationName;
        }
    }
    removeFromLocalStorage() {
        const publicationsCount = this.getAttribute('id');
        localStorage.removeItem(`publication-${publicationsCount}`);
    }
}
customElements.define('comp-publication', Publication);