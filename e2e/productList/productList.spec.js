'use strict';

describe('Product list view', function () {
  var page;

  beforeEach(function () {
    browser.get('/productList');
    page = require('./productList.po.js');
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

  it('should navigate to the Home up page when the Home link is clicked', function () {
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

  var productList = element.all(by.repeater('product in productList'));
  var query = element(by.model('query'));

  it('should filter the product list as a user types into the search box', function () {
    expect(productList.count()).toBe(13);

    query.sendKeys('ground');
    expect(productList.count()).toBe(1);

    query.clear();
    query.sendKeys('lavender');
    expect(productList.count()).toBe(2);
  });

  it('should display the current filter value in the title bar', function () {
    query.clear();
    expect(browser.getTitle()).toMatch(/Google Phone Gallery:\s*$/);

    query.sendKeys('nexus');
    expect(browser.getTitle()).toMatch(/Google Phone Gallery: nexus$/);
  });
});
