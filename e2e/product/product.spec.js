'use strict';

describe('Product View', function() {
  var page;

  beforeEach(function() {
    browser.get('/product');
    page = require('./product.po.js');
  });

  it('should have navbar', function() {
    expect(page.navBar).toBeDefined();
  });

  it('should have Products active in navbar', function() {
    expect(page.getActiveNavbarLink().getText()).toBe("Products");
  });

  it('should include expected navigation links', function () {
    expect(page.loginLink.getText()).toBe('Login');
    expect(page.registerLink.getText()).toBe('Sign up');
    expect(page.companyLink.getText()).toBe('Company');
    expect(page.productsLink.getText()).toBe('Products');
  });

  it('should navigate to the Home up page when the Mome link is clicked', function () {
    page.homeLink.click();
    expect(browser.getCurrentUrl()).toContain('/');
  });

  it('should navigate to the Sign up page when the register link is clicked', function () {
    page.registerLink.click();
    expect(browser.getCurrentUrl()).toContain('/signup');
  });

  it('should navigate to the Login page when the Login link is clicked', function () {
    page.loginLink.click();
    expect(browser.getCurrentUrl()).toContain('/login');
  });

});
