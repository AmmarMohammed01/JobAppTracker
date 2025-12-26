document.querySelector('.js-submit').addEventListener('click',
  (event) => {
    event.preventDefault();
    let username = document.querySelector('.js-username').value;
    let password = document.querySelector('.js-password').value;
    let confirm_password = document.querySelector('.js-confirm-password').value;

    //console.log(`Username: ${username}, Password: ${password}, Confirm Password: ${confirm_password}`);

    //check if username exists in database
    checkUsernameExists(username);

    //check if password is same as confirm password
    if (password !== confirm_password) {
      console.log('Error! Passwords do not match! Please try again.');
    }
    else {
      console.log('Success! Passwords match.');
    }

    //Encrypt the password

    //Store username and encrypted password to database
  }

);

async function checkUsernameExists(uname) {
  console.log("In checkUsernameExists");
  try {
    console.log("In checkUsernameExists try block");
    const response = await fetch('http://127.0.0.1:8000/api/account/username-availability', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: uname
      })
    });

    if (!response.ok) {
      console.error('HTTP error:', response.status);
    }

    const data = await response.json();
    console.log(data);

  }
  catch (error) {
    console.log(error);
  }
}
