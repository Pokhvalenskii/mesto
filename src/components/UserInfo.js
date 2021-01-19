
export default class UserInfo {
  constructor(name, status) {    
    this._name = name;
    this._status = status;
    this._userData = {name: this._name, status: this._status};
  }

  getUserInfo () {
    return this._userData;
  }

  setUserInfo (name, status) {
    this._name.textContent = name;
    this._status.textContent = status;
  }
}