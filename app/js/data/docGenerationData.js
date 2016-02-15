import Mock from 'mockjs'
import _ from 'lodash'

const Data = Mock.mock({
    'title': {
        editType: 'title',
        'name': 'XXX楼宇设计方案项目评估书'
    },
    'background': {
        editType: 'text',
        'name': '项目背景',
        'content': '楼宇自控系统(BAS)是近年开发并逐步推行的一项高科技楼宇管理系统,包括先进的硬件系统设备及优化的软件管理思维,建筑设备自动化系统 ( 简称 BAS) 是现代计算机技术 , 现代通信技术和现代控制技术的结合 , 是智能建筑的主要系统 , 也是智能建筑的重要标志 . 建筑物自动化系统 (BAS) 的含义是将建 筑物 ( 或建筑群 ) 内的电力、照明、空调、给排水、防灾、保安、广播、通讯等设备以集中监视与管理为目的 , 构成的一个综合系统。一般的是集散型系统 , 即分散 控制与集中监视、管理的计算机局域网。目的是使建筑物成为具有最佳工作与生活环境、设备高效运行、整体节能效果最佳、安全的场所。'
    },
    'standard': {
        editType: 'text',
        'name': '相关规范',
        'content': '楼宇自控系统(BAS)是近年开发并逐步推行的一项高科技楼宇管理系统,包括先进的硬件系统设备及优化的软件管理思维,建筑设备自动化系统 ( 简称 BAS) 是现代计算机技术 , 现代通信技术和现代控制技术的结合 , 是智能建筑的主要系统 , 也是智能建筑的重要标志 . 建筑物自动化系统 (BAS) 的含义是将建 筑物 ( 或建筑群 ) 内的电力、照明、空调、给排水、防灾、保安、广播、通讯等设备以集中监视与管理为目的 , 构成的一个综合系统。一般的是集散型系统 , 即分散 控制与集中监视、管理的计算机局域网。目的是使建筑物成为具有最佳工作与生活环境、设备高效运行、整体节能效果最佳、安全的场所。'
    },
    'system': {
        editType: 'text',
        'name': '系统方案',
        'content': '安防系统:<br/>网络系统:<br/>监控系统:'
    },
    'overall': {
        editType: 'advance',
        'name': '总体规模',
        'questions': [
            {
                'type': 'fillIn',
                'text': '建筑面积:<>平方米',
                'value': 15000
            },
            {
                'type': 'radio',
                'text': '是否新造？',
                'options': [
                    '是',
                    '否'
                ],
                'value': 1
            }
        ]
    }
})

export {Data}