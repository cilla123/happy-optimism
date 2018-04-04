const { resolve } = require('path')
const { readdirSync, statSync, readFileSync } = require('fs')
const { rm, mkdir, sed, cat } = require('shelljs')

const { copy } = require('../../examples/utils/files')

// 例子路径
const EXAMPLES_PATH = resolve(__dirname, '../../examples')

// 页面开发的时候的路径
const PAGE_DEV_PATH = `${EXAMPLES_PATH}/pages-dev`

// 页面打包的时候的路径
const PAGE_PRO_PATH = `${EXAMPLES_PATH}/pages-pro`

// 组件路径
const COMPONENTS_PATH = resolve(__dirname, '../../components')

/**
 * 运行
 */
async function run(){
    // 1.先删除pages-pro目录，并创建pages-pro文件
    await rm('-rf', PAGE_PRO_PATH)
    await mkdir(PAGE_PRO_PATH)

    // 2.先从pages-dev拷贝到pages-pro
    await copy(PAGE_DEV_PATH, PAGE_PRO_PATH)

    // 3.遍历所有的组件，来插入对应的页面组件
    try {
        const filesAndDir = readdirSync(COMPONENTS_PATH)    
        filesAndDir.map(item => {
            const componentPath = `${COMPONENTS_PATH}/${item}`
            if (statSync(componentPath).isDirectory()) {
                const demosFilesAndDir = readdirSync(`${componentPath}/demos`)
                sed('-i', 'basic.md', '666666', `${PAGE_PRO_PATH}/${item}.jsx`)
                demosFilesAndDir.map(demoFIle => {
                    // console.log(demoFIle)
                })
            }
        })
    } catch (error) {
        console.error(error);
    }
}

run()



