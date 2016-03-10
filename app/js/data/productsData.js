import Mock from 'mockjs'
import _ from 'lodash'

const Data = Mock.mock({
    'cases': [{
        'description': '建设xx楼宇项目，包含xx系统、xx系统等',
        'price|1000-100000': 1,
        'systems|5-10': [{
            'name|1': [
                '安防系统',
                '入侵报警系统',
                '出入口控制系统',
                '停车库（场）管理系统',
                '视频监控系统'
            ],
            'descriptions': ()=> {
                return _.shuffle([
                    '1080P 480TVL',
                    'CMOS  1/4枪式摄像机',
                    '数字摄像机 一体机',
                    '一般亮度 DC驱动',
                    'C 接口 DC12V高速'
                ])

            },
            'price|1000-10000': 1
        }]
    }]
})

export {Data}