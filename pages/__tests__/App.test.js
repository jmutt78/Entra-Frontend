var envIsProd = (process.env.NODE_ENV === 'production');
const faker = envIsProd ? null : require('faker');
const puppeteer = envIsProd ? null : require('puppeteer');

const person = envIsProd ? {} : {
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.random.word(),
};
const appUrlBase = envIsProd ? 'http://' : 'http://localhost:7777';
const routes = {
    public: {
        signup: `${appUrlBase}/signup`,
        login: `${appUrlBase}/signin`,
        noMatch: `${appUrlBase}/ineedaview`,
    },
    private: {
        home: `${appUrlBase}/home`,
        account: `${appUrlBase}/account`,
    },
};

let browser;
let page;

beforeAll(async () => {
    if (!envIsProd) {
      browser = await puppeteer.launch({
          headless: false,
          // devtools: true,
          slowMo: 250,
      });
      page = await browser.newPage();
    }
})

describe('Signup', () => {
    test('users can sign up', async () => {

        await page.goto(routes.public.signup);
        await page.waitForSelector('.signup-form');

        await page.click('input[name=name]')
        await page.type('input[name=name]', person.name)
        await page.click('input[name=email]')
        await page.type('input[name=email]', person.email)
        await page.click('input[name=display]')
        await page.type('input[name=display]', person.name)
        await page.click('input[name=password]')
        await page.type('input[name=password]', person.password)
        await page.click('button[type=submit]')
        await page.waitForSelector('.nav-avatar')
    }, 9000000);
});

describe('Login', () => {
    it('users can login', async () => {
        
        await page.goto(routes.public.login);
        await page.waitForSelector('.signin-form');

        await page.click('input[name=email]')
        await page.type('input[name=email]', person.email)
        await page.click('input[name=password]')
        await page.type('input[name=password]', person.password)
        await page.click('button[type=submit]')
        await page.waitForSelector('.navLink')

    }, 1600000);
});

describe('Logout', () => {
    test('users can logout', async () => {
        await page.waitForSelector('.nav-avatar');

        await page.click('.nav-avatar')
        await page.waitForSelector('.signout-btn')
        await page.click('.signout-btn')
        await page.waitForSelector('.login-btn')
    }, 9000000);
});

afterAll(() => {
  if (!envIsProd) {
    browser.close()
  }
})
