const companyName = document.querySelector('.js-company-name');
const dateApplied = document.querySelector('.js-date-applied'); //2025-12-31
const platform = document.querySelector('.js-platform');
const jobPosition = document.querySelector('.js-job-position');
const link = document.querySelector('.js-link');
const username = document.querySelector('.js-username');
const password = document.querySelector('.js-password');

// document.querySelector('.js-create-job-tracker-button').addEventListener('click', 
//   (event) => {
//     console.log(`Company Name: ${companyName.value}`);
//     console.log(`Date Applied: ${dateApplied.value}`);
//     console.log(`Platform: ${platform.value}`);
//     console.log(`Job Position: ${jobPosition.value}`);
//     console.log(`Link: ${link.value}`);
//     console.log(`Username: ${username.value}`);
//     console.log(`Password: ${password.value}`);
//   }
// )

const jsForm = document.querySelector('.js-form');
jsForm.addEventListener('submit', 
  async (event) => {
    event.preventDefault();

    console.log(`Company Name: ${companyName.value}`);
    console.log(`Date Applied: ${dateApplied.value}`);
    console.log(`Platform: ${platform.value}`);
    console.log(`Job Position: ${jobPosition.value}`);
    console.log(`Link: ${link.value}`);
    console.log(`Username: ${username.value}`);
    console.log(`Password: ${password.value}`);

    //create an object to pass all data through function
    const newJobTracker = {
      companyNameT: companyName.value,
      dateAppliedT: dateApplied.value,
      platformT: platform.value,
      jobPositionT: jobPosition.value,
      linkT: link.value,
      usernameT: username.value,
      passwordT: password.value 
    };

    addJobTracker(newJobTracker);
  }
);

async function addJobTracker(jobTracker) {
  console.log(jobTracker);
  console.log(jobTracker.dateAppliedT)
  try {
    const response = await fetch('http://127.0.0.1:8000/api/jobtracker/add', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        companyNameT: jobTracker.companyNameT,
        dateAppliedT: jobTracker.dateAppliedT,
        platformT: jobTracker.platformT,
        jobPositionT: jobTracker.jobPositionT,
        linkT: jobTracker.linkT,
        usernameT: jobTracker.usernameT,
        passwordT: jobTracker.passwordT
 
      })
    });
  } catch (error) {
    console.log(error);
  }
}