#!/bin/bash

# 获取当前路径
SHELL_FOLDER=$(cd "$(dirname "$0")";pwd)

# 获取项目路径
BASE_PATH=${SHELL_FOLDER%scripts\/sh}

# 组件模版路径
COMPONENTS_TPL_PATH=${SHELL_FOLDER}/componentTpl

# 组件路径
COMPONENTS_PATH=${BASE_PATH}components/

# 获取参数的名称
COMPONENTS_NAME=$1

# 修改组件名称
if [ ! -n "$1" ];then
    echo "请输入组件名称！"
else
    # 拷贝到组件目录
    cp -a ${COMPONENTS_TPL_PATH} ${COMPONENTS_PATH}
    # 修改名称
    mv ${COMPONENTS_PATH}componentTpl ${COMPONENTS_PATH}$1
    echo "创建 $1组件 成功"
fi
