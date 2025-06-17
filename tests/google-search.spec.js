const {test, expect } = require('@playwright/test')

test('Google search relevant results', async ({ page }) =>{
    const searchTerm = 'Javascript';

    await page.goto ('https://www.ebay.com/');
    await page.fill('//input[@title="Search"]', searchTerm);
    await page.press('//input[@title="Search"]', 'Enter');

    const results = page.locator('//a[@class="s-item__link"]');
    const total = await results.count();

    console.log(`${total}`);

    for(let i = 0; i < total; i++){
        const text = (await results.nth(i).textContent || '').trim();

        if(!text) continue;

        if(text.toLowerCase().includes(searchTerm.toLocaleLowerCase())){
            console.log(text);
        }
    }

})