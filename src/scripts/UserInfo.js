export default
class UserInfo {
  constructor(userDataFromPage) {
    this._name = userDataFromPage.userName;
    this._job = userDataFromPage.userJob;
  }

  getUserInfo() {
    return {      
      name: this._name.textContent,
      description: this._job.textContent
    }
  }

  setUserInfo = (userData) => {
    this._name.textContent = userData.name;
    this._job.textContent = userData.link;
  }
}