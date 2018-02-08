import userService from 'app/services/user';

const auth = {
  user: null,

  set(request) {
    const hasUser = request.user && Object.keys(request.user).length > 0;

    if (!hasUser) {
      return;
    }

    const userData = request.user.dataValues || request.user;

    // [TODO]: refactor and make cleanup this code
    userData.store = (request.session && request.session.store) ? request.session.store : {};
    userService.user = userData;

    this.user = { ...userData, ...userService };

    delete this.user.models;
    delete this.user.user;
  },

  isAuth() {
    return Boolean(this.user);
  },

  destroy() {
    this.user = null;
  },
};

export default auth;
