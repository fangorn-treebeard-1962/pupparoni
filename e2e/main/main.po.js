/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function() {
  this.heroEl = element(by.css('.hero-unit'));
  this.h1El = this.heroEl.element(by.css('h1'));
  this.imgEl = this.heroEl.element(by.css('img'));

  this.navBar = element(by.css('div.navbar'));
  this.loginLink = element(by.cssContainingText('a', 'Login'));
  this.registerLink = element(by.cssContainingText('a', 'Sign up'));
  this.companyLink = element(by.cssContainingText('a', 'Company'));
  this.productsLink = element(by.cssContainingText('a', 'Products'));

  this.getActiveNavbarLink = function() {
    return element(by.css('div.navbar div div#navbar-main li.active a'));
  }
};

module.exports = new MainPage();

