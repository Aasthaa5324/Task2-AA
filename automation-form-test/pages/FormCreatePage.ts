"use strict";
import { expect } from '@playwright/test';
import { Page } from '@playwright/test';

export class FormCreatePage {
  constructor(public page: Page) {}

  async openCreateForm() {
    await this.page.getByRole('button', { name: /create/i }).click();
    await this.page.getByRole('button', { name: /form.../i }).click();
  }

  async fillMandatoryDetails(formName: string) {
    await this.page.getByPlaceholder('Enter form name').fill(formName);
    await this.page.getByRole('button', { name: /create/i }).click();
  }

  async addTextboxAndFileUpload() {
    // Adjust selectors as per your app
    await this.page.dragAndDrop('text=Textbox', '#canvas-drop-target');
    await this.page.dragAndDrop('text=Select File', '#canvas-drop-target');
  }

  async verifyRightPanelForElement(elementName: string) {
    await this.page.getByText(elementName, { exact: true }).click();
    await expect(this.page.getByText('Properties')).toBeVisible();
  }

  async interactWithTextbox(text: string) {
    await this.page.getByPlaceholder('Enter text').fill(text);
  }

  async uploadFile(filePath: string) {
    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.setInputFiles(filePath);
  }

  async saveForm() {
    await this.page.getByRole('button', { name: /save/i }).click();
  }

  async assertFileUploaded(fileName: string) {
    await expect(this.page.getByText(fileName)).toBeVisible();
  }
}