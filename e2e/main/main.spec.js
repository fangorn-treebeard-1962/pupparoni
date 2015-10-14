'use strict';

describe('Main View', function() {
  var page;

  beforeEach(function() {
    browser.get('/');
    page = require('./main.po');
  });

  it('should have navbar, and Home should be active', function() {
    expect(page.navBar).toBeDefined();
    expect(page.getActiveNavbarLink().getText()).toBe("Home");
  });

  it('should include expected navigation links', function () {
    expect(page.loginLink.getText()).toBe('Login');
    expect(page.registerLink.getText()).toBe('Sign up');
    expect(page.companyLink.getText()).toBe('Company');
    expect(page.productsLink.getText()).toBe('Products');
  });

  it('should navigate to the Sign up page when the register link is clicked', function () {
    page.registerLink.click();
    expect(browser.getCurrentUrl()).toContain('/signup');
  });

  it('should navigate to the Login page when the Login link is clicked', function () {
    page.loginLink.click();
    expect(browser.getCurrentUrl()).toContain('/login');
  });

  it('should include jumbotron with correct data', function() {
    expect(page.h1El.getText()).toBe('\'Allo, Petey-the-kid!');
    expect(page.imgEl.getAttribute('src')).toMatch(/assets\/images\/yeoman.png$/);
    expect(page.imgEl.getAttribute('alt')).toBe('I\'m Yeoman');
  });

});
