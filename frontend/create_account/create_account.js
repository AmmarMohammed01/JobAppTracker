document.querySelector('.js-submit').addEventListener('click',
  async (event) => {
    event.preventDefault();
    let username = document.querySelector('.js-username').value;
    let password = document.querySelector('.js-password').value;
    let confirm_password = document.querySelector('.js-confirm-password').value;

    //console.log(`Username: ${username}, Password: ${password}, Confirm Password: ${confirm_password}`);

    //check if username exists in database
    const isUsernameAvailable = await checkUsernameExists(username);
    console.log(`Username Available: ${isUsernameAvailable}`);

    //check if password is same as confirm password
    let passwordsMatch = password == confirm_password
    if (passwordsMatch) {
      console.log('Success! Passwords match.');
    }
    else {
      console.log('Error! Passwords do not match! Please try again.');
    }

    //Store username and password to backend
    if (isUsernameAvailable && passwordsMatch) {
      const isCreated = await createAccount(username, password);
      console.log(`Account Created: ${isCreated}`);
    }
    else if (!isUsernameAvailable) {
      console.log('Account creation failed: username unavailable');
    }
    else if (!passwordsMatch) {
      console.log('Account creation failed: passwords do not match');
    }

  }

);

//returns true if username available (not taken), false otherwise
async function checkUsernameExists(uname) {
  try {
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
    //console.log(data);
    //console.log(`Data: ${data.available}`);
    return data.available;

  }
  catch (error) {
    console.log(error);
  }
}

async function createAccount(uname, passw) {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/account/create', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: uname,
        password: passw
      })

    });

    if (!response.ok) {
      console.error('HTTP error:', response.status);
    }

    const data = await response.json();
    //console.log(`Account Created Success? ${data.account_created_success}`);
    return data.account_created_success;

  } catch (error) {
    console.log(error);
  }

}
