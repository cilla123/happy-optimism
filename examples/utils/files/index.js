const fs = require('fs')
const rimraf = require('rimraf')

/**
 * 判断文件是否存在
 */
const isExists = async (dir) => {
    return await fs.existsSync(dir)
}

/**
 * 创建文件夹
 */
const mkdir = async (path) =>{
    return await fs.mkdirSync(path)
}

/**
 * 复制文件
 */
const copy = async (fileDir, dist) => {
    const paths = await fs.readdirSync(fileDir)
    if (paths) {
        paths.map(async path => {
            const _fileDir = fileDir + '/' + path
            const _dist = dist + '/' + path
            const st = await fs.statSync(_fileDir)
            if (st.isFile()) {
                const readable = fs.createReadStream(_fileDir)
                const writable = fs.createWriteStream(_dist)
                readable.pipe(writable)
            }else if (st.isDirectory()) {
                const isExist = await isExists(_dist)
                if (isExist) {
                    await copy(_fileDir, _dist)
                }else{
                    await mkdir(_dist)
                    await copy(_fileDir, _dist)
                }
            }
        })
    }
}

/**
 * 创建文件
 */
const createFile = async (path, filename, content) => {
    return await fs.writeFileSync(`${path}/${filename}`, content)
}

/**
 * 写入文件
 */
const writeFile = async (path, content) => {
    return await fs.appendFileSync(path, content)
}

/**
 * 读取文件
 */
const readFile = async (path) => {
    return await fs.readFileSync(path, 'utf8')
}

/**
 * 删除文件夹
 */
const deleteDir =  (path) => {
    return new Promise((resolve, reject) => {
        rimraf(path, (err) => {
            if (err) {
                reject(err)
            }else {
                resolve()
            }
        })
    }) 
}

module.exports = {
    isExists,
    mkdir,
    copy,
    createFile,
    writeFile,
    readFile,
    deleteDir
}