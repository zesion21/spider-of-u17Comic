const fs = require('fs');
const superagent = require('superagent');

async function download(comicName, chapterName, urlArr = []) {
    await create(`./comics`);
    await create(`./comics/${comicName}`);
    await create(`./comics/${comicName}/${chapterName}`);
    if (urlArr.length > 0) {
        for (let item of urlArr) {
            if (item) {
                const fileName = item.split("/").reverse()[0];
                await downloadImg(item, `./comics/${comicName}/${chapterName}/${fileName}`);
            } else {
                console.log(item);
            }

        }
    } else {
        fs.writeFile(`./comics/${comicName}/${chapterName}/readme.txt`, '此章节为付费章节', (error, data) => {
            console.log(chapterName + "下载失败，可能原因：此章节为付费章节");
        });
    }

}

function create(path) {
    return new Promise(resolve => {
        fs.stat(`${path}`, (error, stat) => {
            if (error) {
                fs.mkdir(`${path}`, (error, succ) => {
                    if (error) {
                        console.log(`创建目录${path}失败！`);
                        return
                    } else {
                        console.log(`创建目录${path}成功！`);
                        resolve();
                    }
                });
            } else {
                resolve();
            }
        })
    })
}

function downloadImg(src, path) {
    return new Promise(resolve => {
        fs.stat(path, (error, data) => {
            if (error) {
                const ws = fs.createWriteStream(path);
                superagent.get(src).buffer(true).pipe(ws);
                ws.on('finish', () => {
                    console.log(`图片${path}下载成功`);
                    resolve();
                })
            } else {
                resolve();
                console.log(`图片${path}已存在`);
            }

        })

    })
}

module.exports = {
    download
}