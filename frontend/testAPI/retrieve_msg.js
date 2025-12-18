async function getMessage() {
	try {
		const response = await fetch('http://127.0.0.1:8000/get-message');

		// Check if the status is in the 200-299 range
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		console.log('Success:', data);
		return data;

	} catch (error) {
		console.error('There was a problem with the fetch operation:', error);
		document.querySelector('.js-api-message').innerHTML = "ERROR: Unable to connect to server!";
	}
}

// Call the function and handle the returned data
getMessage().then(message => {
	if (message) {
		//console.log(typeof message); //an object
		console.log(message.Message);
		document.querySelector('.js-api-message').innerHTML = message.Message;
	}
});
