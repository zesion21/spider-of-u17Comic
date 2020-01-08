const page = require('./utils/page');
(async function (comicName, Indexurl) {
    const obj = await page.getImgageUrlsAndTitle('http://www.u17.com/chapter_vip/901268.shtml');

    console.log(obj);
})("我在日本当道士", 'http://www.u17.com/comic/846284.html');