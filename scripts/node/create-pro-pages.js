const { resolve } = require('path')
const { readdirSync, statSync } = require('fs')
const { rm, mkdir } = require('shelljs')

const { copy } = require('../../examples/utils/files')

// 例子路径
const EXAMPLES_PATH = resolve(__dirname, '../../examples')

// 页面开发的时候的路径
const PAGE_DEV_PATH = `${EXAMPLES_PATH}/pages-dev`

// 页面打包的时候的路径
const PAGE_PRO_PATH = `${EXAMPLES_PATH}/pages-pro`

// 组件路径
const COMPONENTS_PATH = resolve(__dirname, '../../components')
console.log(COMPONENTS_PATH)

// 1.先删除pages-pro目录，并创建pages-pro文件
rm(PAGE_PRO_PATH)
mkdir(PAGE_PRO_PATH)

// 2.先从pages-dev拷贝到pages-pro
copy(PAGE_DEV_PATH, PAGE_PRO_PATH)

// 2.遍历所有的组件，来插入对应的页面组件
// try {
//     const filesAndDir = readdirSync(COMPONENTS_PATH)    
//     filesAndDir.map(item => {
//         const componentPath = `${COMPONENTS_PATH}/${item}`
//         if (statSync(componentPath).isDirectory()) {

//             const demosFilesAndDir = readdirSync(`${componentPath}/demos`)
            
//         }
//     })
//     console.log(files)
// } catch (error) {
//     console.error(error);
// }


