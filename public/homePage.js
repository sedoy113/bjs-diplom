"use strict";

const logoutButton = new LogoutButton();

logoutButton.action = function () {
	ApiConnector.logout(response => {
		if (response.success) {
			location.reload();
		} else {
			console.error(response.data);
			ProfileWidget.showProfile(response.data);
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

setInterval(getRatesBoard, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function (data) {
	ApiConnector.addMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, 'Баланс успешно пополнен');
		} else {
			moneyManager.setMessage(response.success, 'При пополнении баланса возникла ошибка');
		}
	}
	);
}

moneyManager.conversionMoneyCallback = function (data) {
	ApiConnector.convertMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, 'Конвертация валюты прошла успешно');
		} else {
			moneyManager.setMessage(response.success, 'При конвертации валюты возникла ошибка');
		}
	}
	);
}

moneyManager.sendMoneyCallback = function (data) {
	ApiConnector.transferMoney(data, response => {
		console.log(response);
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, 'Перевод прошел успешно');
		} else {
			moneyManager.setMessage(response.success, 'При переводе возникла ошибка');
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
			favoritesWidget.setMessage(response.success, 'Пользователь добавлен в Избранное');
		} else {
			favoritesWidget.setMessage(response.success, 'При добавлении пользователя в Избранное возникла ошибка');
		}
	}
	);
}

favoritesWidget.removeUserCallback = function (data) {
	ApiConnector.removeUserFromFavorites(data, response => {
		if (response.success) {
			getFavoritesList();
			favoritesWidget.setMessage(response.success, 'Пользователь удален из Избранного');
		} else {
			favoritesWidget.setMessage(response.success, 'При удалении пользователя из Избранного возникла ошибка');
		}
	}
	);
}

