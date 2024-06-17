const { test, expect } = require('@playwright/test');
const ProfilePage = require('../../pages/ProfilePage');
const { PROFILE_PAGE_URL } = require('../../config/config');
const { USERNAME_INPUT, SUBMIT_BUTTON, PROFILE_LINK, ERROR_MESSAGE_SELECTOR, SUCCESS_MESSAGE_SELECTOR } = require('../../helpers/constants_profile');

test.describe('Profile Page Tests', () => {
  let page;
  let profilePage;
  

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    profilePage = new ProfilePage(page);
    
  });

  test.beforeEach(async () => {
    await profilePage.navigate(PROFILE_PAGE_URL);
  });

  test.afterAll(async () => {
    await page.close();
  });


  test('Error message should be displayed for empty username', async () => {
    
    let frame = await page.frame({ name: 'result' }); 
    let profileLink = await frame.$(PROFILE_LINK); 

    await profileLink.click(); 
    
    let submitButton = await frame.locator(SUBMIT_BUTTON);

    // Increased timeout to 15 seconds
    await submitButton.waitFor({ state: 'visible', timeout: 15000 }); 

    // Verify the submit button is visible
    await expect(submitButton).toBeVisible({ timeout: 10000 }); 

    await test.step('Submit the form with an empty username', async () => {
            await submitButton.click();
        });

    await test.step('Verify error message is displayed', async () => {
            await profilePage.assertErrorMessage('Username is required'); 
        });
  });

 


  test('Valid case- submit user successfully', async () => {
    
    let frame = await page.frame({ name: 'result' }); 
    let user1="sonal";
    let submitButton = await frame.locator(SUBMIT_BUTTON);

    await test.step('Submit Button Visible', async () => {
      let profileLink = await frame.$(PROFILE_LINK); 
      
      await profileLink.click(); 
      
      
  
      // Increased timeout to 15 seconds
      await submitButton.waitFor({ state: 'visible', timeout: 15000 }); 
  
      // Verify the submit button is visible
      await expect(submitButton).toBeEnabled({ timeout: 10000 }); 
    });

    await test.step('Enter userName', async () => {
      let userName_txtBox= await frame.locator(USERNAME_INPUT);
      await userName_txtBox.fill(user1);
      
      await expect(userName_txtBox).toHaveValue(user1);
    });

    await test.step('Submit the form with an empty username', async () => {
            await submitButton.click();
        });

    await test.step('Verify success message is displayed', async () => {
        
      let successMessage = `User updated!Username: ${user1}`;
        
        // Wait for the success message to be visible and verify it
        let userProfile = await frame.locator('[data-testid="user-profile"]');
        await expect(userProfile).toHaveText(successMessage, { timeout: 5000 });
        });
  });

});
