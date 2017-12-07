class Auth {
  constructor() {
    this.getLoginForm = this.getLoginForm.bind(this);
    this.redirectOnAuthenticated = this.redirectOnAuthenticated.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  getLoginForm(request, response) {
    response.render('auth/login');
  }

  // eslint-disable-next-line class-methods-use-this
  redirectOnAuthenticated(request, response) {
    response.redirect('/back-store/products');
  }
}

export default new Auth();
