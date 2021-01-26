
export default class UserInfo {
  constructor(name, status, ava) {
    this._name = name;
    this._status = status;
    this._userData = {name: this._name, status: this._status};
    this._ava = ava;
  }

  getUserInfo () {
    return this._userData;
  }

  setUserInfo (name, status, avatarLink) {
    this._name.textContent = name;
    this._status.textContent = status;
    this._ava.src = avatarLink
  }
}