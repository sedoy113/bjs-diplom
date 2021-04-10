"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = function (data) {
	ApiConnector.login(data, response => {
		console.log(response);
		if (response.success) {
			location.reload();
		} else {
			console.error(response.data);
		}
	}
	);
}

userForm.registerFormCallback = function (data) {
	ApiConnector.register(data, response => {
		console.log(response);
		if (response.success) {
			location.reload();
		} else {
			console.error(response.data);
		}
	}
	);
}
