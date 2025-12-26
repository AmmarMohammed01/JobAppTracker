document.querySelector('.js-submit').addEventListener('click',
	async (event) => {
		event.preventDefault();
		let username = document.querySelector('.js-username').value;
		let password = document.querySelector('.js-password').value;

		const successful_signin = await signinAccount(username, password);
		console.log(`Signin Successful: ${successful_signin}`);

	})

async function signinAccount(uname, passw) {
	try {
		const response = await fetch('http://127.0.0.1:8000/api/account/signin', {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				username: uname,
				password: passw
			})
		});

		if (!response.ok) {
			console.error('HTTP error:', response.status);
		}

		const data = await response.json();
		return data.signin_success;
	}
	catch {

	}
}
