/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var CompanyInfoPage = function() {

  this.navBar = element(by.css('div.navbar'));
  this.homeLink = element(by.cssContainingText('a', 'Home'));
  this.loginLink = element(by.cssContainingText('a', 'Login'));
  this.registerLink = element(by.cssContainingText('a', 'Sign up'));
  this.companyLink = element(by.cssContainingText('a', 'Company'));
  this.productsLink = element(by.cssContainingText('a', 'Products'));

};

module.exports = new CompanyInfoPage();

