export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._token = options.headers.authorization;
    this._headers = options.headers;
    this._contentType = options.headers['Content-Type'];
  }

  _getCheck(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  getEmotionsState() {
    return fetch(this._baseUrl + '/emotions', {
      credentials: 'include',
    }).then(res => this._getCheck(res));
  }

  getUsersData() {
    return fetch(this._baseUrl + '/users/all', {
      credentials: 'include',
    }).then(res => this._getCheck(res));
  }

  addNewEmotionState({ irritabillity, mania, anxiety, panic, despondency, depression, date, text }) {
    return fetch(this._baseUrl + '/emotions', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        irritabillity, mania, anxiety, panic, despondency, depression, date, text
      })
    }).then(res => this._getCheck(res));
  }

  updateEmotionState({ irritabillity, mania, anxiety, panic, despondency, depression, text, emotionId }) {
    return fetch(this._baseUrl + `/emotions/${emotionId}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        authorization: this._token,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        irritabillity,
        mania,
        anxiety,
        panic,
        despondency,
        depression,
        text
      })
    }).then(res => this._getCheck(res));
  }

  getProfileContent() {
    return fetch(this._baseUrl + '/users/me', {
      credentials: 'include',
    }).then(res => this._getCheck(res));
  }

  getAdminInfo() {
    return fetch(this._baseUrl + '/admins/me', {
      credentials: 'include',
    }).then(res => this._getCheck(res));
  }

  submitProfileData({ name, gender, phone, anotherPhone, dateOfBirth }) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        authorization: this._token,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: name,
        gender: gender,
        phone: phone,
        anotherPhone: anotherPhone,
        dateOfBirth: dateOfBirth
      })
    }).then(res => this._getCheck(res));
  }

  register(password, login) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        login
      }),
      credentials: 'include',
    }).then(res => this._getCheck(res));
  }

  authorization(password, login) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        login,
      }),
      credentials: 'include',
    }).then(res => this._getCheck(res));
  }

  authorizationAdmin(password, login) {
    return fetch(`${this._baseUrl}/signin/admins`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        login,
      }),
      credentials: 'include',
    }).then(res => this._getCheck(res));
  }

  checkToken() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(res => this._getCheck(res));
  }

  checkTokenAdmin() {
    return fetch(`${this._baseUrl}/admins/me`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(res => this._getCheck(res));
  }

  clearCookie() {
    return fetch(`${this._baseUrl}/signout`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(res => this._getCheck(res));
  }

}

export const api = new Api({
  baseUrl: 'https://api.mental-prosvet.ru',
  // baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});
