const Nightmare = require('nightmare')


function getImgageUrlsAndTitle(url) {
    return new Promise((resolve, reject) => {
        const nightmare = Nightmare({
            show: false,
            pollInterval: 50
        })
        nightmare
            .goto(url)
            .wait(() => {
                window.scrollTo({
                    top: window.scrollY + 1133
                })

                if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                    $('#crvip_top').find('.btn_next_page').click();
                    return true
                }
            })
            .evaluate(() => {
                const arr = [];
                $('.mg_auto').find('img.cur_pic').each((index, el) => {
                    arr.push($(el).attr('src'));
                })
                const title = $('dl.title').find('a:eq(1)').text();
                return {
                    urlArr: arr,
                    title: title
                };
            })
            .end()
            .then(res => {

                resolve(res);
            })
            .catch(error => {
                console.error('Search failed:', error)
                reject(error);
            })

    })


}

const superAgent = require('superagent');
const cheerio = require('cheerio');

function getChapterURLByIndex(indexUrl) {
    return new Promise((resolve, reject) => {
        superAgent.get(indexUrl).buffer(true).timeout(10000)
            .end((error, data) => {
                if (error) {
                    console.log(error);
                    console.log("章节列表获取失败！");
                    reject();
                }
                const $ = cheerio.load(data.text);
                const arr = [];
                $('#chapter').find('a').each((index, element) => {
                    arr.push($(element).attr('href'));
                })
                console.log("章节列表获取成功！");

                resolve(arr);
            })

    })

}




module.exports = {
    getImgageUrlsAndTitle,
    getChapterURLByIndex
};