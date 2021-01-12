
export default class UserInfo {
  constructor(data) {
    this.userData = data;
  }

  getUserInfo () {
    return this.userData;
  }

  setUserInfo (name, status) {
    this.userData.name.textContent = name.value;
    this.userData.status.textContent = status.value;
  }
}