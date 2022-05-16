let projects = [];

function getDateDifference(startDate, endDate) {
    if (startDate > endDate) {
        console.error('Start date must be before end date');
        return null;
    }
    let startYear = startDate.getFullYear();
    let startMonth = startDate.getMonth();
    let startDay = startDate.getDate();

    let endYear = endDate.getFullYear();
    let endMonth = endDate.getMonth();
    let endDay = endDate.getDate();

    let february = (endYear % 4 == 0 && endYear % 100 != 0) || endYear % 400 == 0 ? 29 : 28;
    let daysOfMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let startDateNotPassedInEndYear = (endMonth < startMonth) || endMonth == startMonth && endDay < startDay;
    let years = endYear - startYear - (startDateNotPassedInEndYear ? 1 : 0);

    let months = (12 + endMonth - startMonth - (endDay < startDay ? 1 : 0)) % 12;

    let days = startDay <= endDay ? endDay - startDay : daysOfMonth[(12 + endMonth - 1) % 12] - startDay + endDay;

    return {
        years: years,
        months: months,
        days: days
    };
}


function addProjects() {
    let title = document.getElementById('input-project-name').value;
    let startDate = new Date(document.getElementById('input-start-date').value);
    let endDate = new Date(document.getElementById('input-end-date').value);
    let lengthDate = getDateDifference(startDate, endDate);
    let description = document.getElementById('input-description').value;
    let image = document.getElementById('upload-image').files[0];

    console.log(lengthDate);
    console.log(document.getElementById('input-end-date').value)
    let logoTechlist = [];
    // Check if checkbox technology is checked, then add to array list
    if (document.getElementById('node-js').checked){
        logoTechlist.push('node-js');
    }
    if (document.getElementById('react-js').checked){
        logoTechlist.push('react-js');
    }
    if (document.getElementById('next-js').checked){
        logoTechlist.push('next-js');
    }
    if (document.getElementById('typeScript-js').checked){
        logoTechlist.push('typeScript-js');
    }

    image = URL.createObjectURL(image);

    let project = {
        title: title,
        lengthDate: lengthDate.months,
        description: description,
        logoTechlist: logoTechlist,
        image: image,
    };

    projects.push(project);

    renderProjects();
}

function checkTechLogoifExists(list){
    let logoTech = '';

    // Check if checkbox technology is checked, then return their logo
    if (list.includes('node-js')){
        logoTech += '<i class="fa-brands fa-node-js"></i>';
    }
    if (list.includes('react-js')){
        logoTech += '<i class="fa-brands fa-react"></i>';
    }
    if (list.includes('next-js')){
        logoTech += '<img src="assets/image/Nextjs-logo.svg" alt="">';
    }
    if (list.includes('typeScript-js')){
        logoTech += '<img src="assets/image/Typescript_logo_2020.svg" alt="">';
    }
    return logoTech;
}

function renderProjects() {
    let projectsContainer = document.getElementById('contents-projects');

    projectsContainer.innerHTML = '';

    projects.forEach((data) => {
        projectsContainer.innerHTML += `<div class="grid-item" >

                <img src="${data.image}" alt="">
                <div class="title">
                    <h2><a href="project-detail.html" style="text-decoration: none; color: black">${data.title}</a></h2>
                    <p>durasi : ${data.lengthDate} bulan</p>
                </div>
                <p> ${data.description} </p>
                <div class="tech-icon">
                    ${checkTechLogoifExists(data.logoTechlist)}
                </div>
                <div class="button">
                    <button type="button" onclick="">edit</button>
                    <button type="button" onclick="">delete</button>
                </div>
            </div>`;
    });

}
