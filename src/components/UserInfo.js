export default
class UserInfo {
  constructor(userDataFromPage) {
    this._name = userDataFromPage.userName;
    this._job = userDataFromPage.userJob;
    this._avatar = userDataFromPage.userAvatar;
  }

  getUserInfo() {
    return {      
      name: this._name.textContent,
      description: this._job.textContent,
      avatar: this._avatar.avatar
    }
  }

  setUserInfo = (userData) => {
    this._name.textContent = userData.name;
    this._job.textContent = userData.description;
  }

  setUserAvatar = (userData) => {
    this._avatar.src = userData.link;
  }
}