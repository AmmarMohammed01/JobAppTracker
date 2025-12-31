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
  (event) => {
    event.preventDefault();

    console.log(`Company Name: ${companyName.value}`);
    console.log(`Date Applied: ${dateApplied.value}`);
    console.log(`Platform: ${platform.value}`);
    console.log(`Job Position: ${jobPosition.value}`);
    console.log(`Link: ${link.value}`);
    console.log(`Username: ${username.value}`);
    console.log(`Password: ${password.value}`);
  }
);