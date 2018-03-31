const { resolve, relative } = require('path')

const {
    readdirSync,
    statSync,
    existsSync,
    readFileSync,
    writeFileSync,
} = require('fs')

const {
    __,
    concat,
    curry,
    filter,
    find,
    forEach,
    map,
    merge,
    omit,
    pipe,
    prop,
    propEq,
} = require('ramda')
const fm = require('front-matter')

const LIST_STATICS = require('../examples/routes')
const COMPONENTS = resolve(process.cwd(), '../components')
const NAMES = {
    'zh-CN': 'README_zh-CN.md',
    'en-US': 'README_en-US.md',
}

const isDir = path => {
    try {
        readdirSync(path)
    } catch (e) {
        return false;
    }
    return true;
};

const readFileToString = curry(readFileSync)(__, 'utf8')

function gather() {
    // Object.keys(NAMES).forEach(i18n => {
        
    // })
}

gather()
