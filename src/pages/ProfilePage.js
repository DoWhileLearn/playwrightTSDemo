const { expect } = require('@playwright/test');
const { USERNAME_INPUT, SUBMIT_BUTTON, PROFILE_LINK, ERROR_MESSAGE_SELECTOR, SUCCESS_MESSAGE_SELECTOR } = require('../helpers/constants_profile');



class ProfilePage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator(USERNAME_INPUT);
    this.submitButton = page.locator(SUBMIT_BUTTON);
    this.profilePageLink = page.locator(PROFILE_LINK);

  }

  async navigate(url) {
    await this.page.goto(url);
  }

  async enterUsername(frame, username) {
    let userName_txtBox= await frame.locator(USERNAME_INPUT);
    await userName_txtBox.fill(username);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async assertErrorMessage(expectedMessage) {
    const errorMessage = this.page.locator(ERROR_MESSAGE_SELECTOR); 
    await expect(errorMessage).toHaveText(expectedMessage);
  }

  async assertSuccessMessage(frame, expectedMessage) {
    const successMessage = await frame.locator(SUCCESS_MESSAGE_SELECTOR); 
    
    await expect(successMessage).toHaveText(expectedMessage);
  }

  async resetForm() {
    const resetButton = this.page.locator('YOUR_RESET_BUTTON_SELECTOR'); 
    await resetButton.click();
  }

  async assertUsernameInputCleared() {
    await expect(this.usernameInput).toBeEmpty();
  }
}


module.exports = ProfilePage;
