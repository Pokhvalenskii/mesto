
export default class UserInfo {
  constructor(name, status) {
    // this.userData = data;
    this.name = name;
    this.status = status;
  }

  getUserInfo () {
    return this.userData;
  }

  setUserInfo (name, status) {
    this.name.textContent = name.value;
    this.status.textContent = status.value;
  }
}