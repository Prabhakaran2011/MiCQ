import { MCQPage } from './app.po';

describe('mcq App', () => {
  let page: MCQPage;

  beforeEach(() => {
    page = new MCQPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
