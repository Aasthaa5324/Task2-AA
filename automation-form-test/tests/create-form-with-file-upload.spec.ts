import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { FormCreatePage } from '../pages/FormCreatePage';

test('Build and automate a form with textbox and file upload', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login();

  const dashboard = new DashboardPage(page);
  await dashboard.navigateToAutomation();

  const formPage = new FormCreatePage(page);
  await formPage.openCreateForm();
  await formPage.fillMandatoryDetails('Playwright Test Form');
  await formPage.addTextboxAndFileUpload();
  await formPage.verifyRightPanelForElement('Textbox');
  await formPage.verifyRightPanelForElement('Select File');
  await formPage.interactWithTextbox('Hello Playwright!');
  await formPage.uploadFile('path/to/your/shared/folder/testfile.pdf');
  await formPage.saveForm();
  await formPage.assertFileUploaded('testfile.pdf');
});