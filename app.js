const page = require('./utils/page');
const download = require('./utils/download');
(async function (comicName, Indexurl) {
    const start = new Date().getTime();
    let chapterUrls = await page.getChapterURLByIndex(Indexurl);
    // chapterUrls = chapterUrls.slice(58); //截取部分章节

    for (let item of chapterUrls) {
        const start0 = new Date().getTime();
        const url = item.replace('chapter', 'chapter_vip').replace('html', 'shtml'); //地址替换为滚轮模式 地址
        const obj = await page.getImgageUrlsAndTitle(url);
        if (obj.title && obj.urlArr.length > 0)
            await download.download(comicName, obj.title, obj.urlArr);
        else
            console.log('当前章节为付费章节，以后章节大概率同样为付费章节，请先付费\n按Ctrl+C退出程序');
        console.log(`章节${obj.title}下载完毕，耗时：${(new Date().getTime() - start0) / 1000}s`);
    }

    console.log('操作完成,总耗时：' + (new Date().getTime() - start) / 1000 + "s");
})
("笼中人", 'http://www.u17.com/comic/181616.html'); //传入参数 漫画名称 ， 漫画目录页地址  当前为测试《笼中人》参数