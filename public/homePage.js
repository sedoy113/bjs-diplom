"use strict";

const logoutButton = new LogoutButton();

logoutButton.action = function () {
	ApiConnector.logout(response => {
		if (response.success) {
			location.reload();
		} else {
			console.error(response.data);
		}
	}
	);
}

ApiConnector.current(response => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
	}
}
);

const ratesBoard = new RatesBoard();

const getRatesBoard = function () {
	ApiConnector.getStocks(response => {
		if (response.success) {
			ratesBoard.clearTable();
			ratesBoard.fillTable(response.data);
		}
	}
	);
}

getRatesBoard();

setInterval(() => getRatesBoard(), 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function (data) {
	ApiConnector.addMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(false, 'Баланс успешно пополнен');
		} else {
			moneyManager.setMessage(true, 'При пополнении баланса возникла ошибка');
		}
	}
	);
}

moneyManager.conversionMoneyCallback = function (data) {
	ApiConnector.convertMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(false, 'Конвертация валюты прошла успешно');
		} else {
			moneyManager.setMessage(true, 'При конвертации валюты возникла ошибка');
		}
	}
	);
}

moneyManager.sendMoneyCallback = function (data) {
	ApiConnector.transferMoney(data, response => {
		console.log(response);
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(false, 'Перевод прошел успешно');
		} else {
			moneyManager.setMessage(true, 'При переводе возникла ошибка');
		}
	}
	);
}

const favoritesWidget = new FavoritesWidget();

const getFavoritesList = function () {
	ApiConnector.getFavorites(response => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
		}
	}
	);
}

getFavoritesList();

favoritesWidget.addUserCallback = function (data) {
	ApiConnector.addUserToFavorites(data, response => {
		if (response.success) {
			getFavoritesList();
			moneyManager.setMessage(false, 'Пользователь добавлен в Избранное');
		} else {
			moneyManager.setMessage(true, 'При добавлении пользователя в Избранное возникла ошибка');
		}
	}
	);
}

favoritesWidget.removeUserCallback = function (data) {
	ApiConnector.removeUserFromFavorites(data, response => {
		if (response.success) {
			getFavoritesList();
			moneyManager.setMessage(false, 'Пользователь удален из Избранного');
		} else {
			moneyManager.setMessage(true, 'При удалении пользователя из Избранного возникла ошибка');
		}
	}
	);
}

