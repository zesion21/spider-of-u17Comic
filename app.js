const page = require('./utilty/page');
const download = require('./utilty/download');
(async function (comicName, Indexurl) {
    const start = new Date().getTime();
    let chapterUrls = await page.getChapterURLByIndex(Indexurl);
    // chapterUrls = chapterUrls.slice(13, 14);//截取部分章节

    for (let item of chapterUrls) {
        const start0 = new Date().getTime();
        const url = item.replace('chapter', 'chapter_vip').replace('html', 'shtml');
        const obj = await page.getImgageUrlsAndTitle(url);
        await download.download(comicName, obj.title, obj.urlArr);
        console.log(`章节${obj.title}下载完毕，耗时：${(new Date().getTime() - start0) / 1000}s`);
    }

    console.log('操作完成,总耗时：' + (new Date().getTime() - start) / 1000 + "s");
})("我在日本当道士", 'http://www.u17.com/comic/181258.html');