const Data = {
    safeSys: [
        {
            name: "安防系统",
            sidebar: [
                {
                    name: "楼宇类型",
                    type: "radio",
                    values: ["商城", "小区", "办公楼"]
                }
            ],
            cover: "img/cover.jpg"
        },
        {
            name: "入侵报警系统",
            sidebar: [
                {
                    name: "类型",
                    type: "radio",
                    values: ["大楼", "小区"]
                },
                {
                    name: "面积",
                    type: "text",
                    context: "<> m2"
                },
                {
                    name: "楼层",
                    type: "text",
                    context: "<> 层"
                }
            ],
            cover: "img/cover-2.jpg"
        },
        {
            name: "出入口控制系统",
            sidebar: [
                {
                    name: "类型",
                    type: "radio",
                    values: ["大楼", "小区"]
                },
                {
                    name: "面积",
                    type: "text",
                    context: "<> m2"
                },
                {
                    name: "楼层",
                    type: "text",
                    context: "<> 层"
                }
            ],
            cover: "img/cover-3.jpg"
        },
        {
            name: "停车库（场）管理系统",
            sidebar: [
                {
                    name: "类型",
                    type: "radio",
                    values: ["大楼", "小区"]
                },
                {
                    name: "面积",
                    type: "text",
                    context: "<> m2"
                },
                {
                    name: "楼层",
                    type: "text",
                    context: "<> 层"
                }
            ],
            cover: "img/cover-4.jpg"
        },
        {
            name: "视频监控系统",
            sidebar: [
                {
                    name: "类型",
                    type: "radio",
                    values: ["大楼", "小区"]
                },
                {
                    name: "面积",
                    type: "text",
                    context: "<> m2"
                },
                {
                    name: "楼层",
                    type: "text",
                    context: "<> 层"
                }
            ],
            cover: "img/cover.jpg",
        },
        {
            name: "安防系统",
            sidebar: [
                {
                    name: "类型",
                    type: "radio",
                    values: ["大楼", "小区"]
                },
                {
                    name: "面积",
                    type: "text",
                    context: "<> m2"
                },
                {
                    name: "楼层",
                    type: "text",
                    context: "<> 层"
                }
            ],
            cover: "img/cover.jpg"
        }
    ],
    watcher: [
        {
            name: "监控",
            cover: "img/cover.jpg",
            sidebar: [
                {
                    name: "面积",
                    type: "text",
                    context: "<> m2"
                },
                {
                    name: "楼层",
                    type: "text",
                    context: "<> 层"
                }
            ]
        },
        {
            name: "寻根",
            cover: "img/cover-2.jpg",
            sidebar: [
                {
                    name: "类型",
                    type: "radio",
                    values: ["大楼", "小区"]
                },
                {
                    name: "面积",
                    type: "text",
                    context: "<> m2"
                },
                {
                    name: "楼层",
                    type: "text",
                    context: "<> 层"
                }
            ]
        },
        {
            name: "监控",
            cover: "img/cover-3.jpg",
            sidebar: [
                {
                    name: "类型",
                    type: "radio",
                    values: ["大楼", "小区"]
                },
                {
                    name: "面积",
                    type: "text",
                    context: "<> m2"
                },
                {
                    name: "楼层",
                    type: "text",
                    context: "<> 层"
                }
            ]
        },
        {
            name: "监控",
            cover: "img/cover-4.jpg",
            sidebar: [
                {
                    name: "类型",
                    type: "radio",
                    values: ["大楼", "小区"]
                },
                {
                    name: "面积",
                    type: "text",
                    context: "<> m2"
                },
                {
                    name: "楼层",
                    type: "text",
                    context: "<> 层"
                }
            ]
        },
        {
            name: "监控",
            cover: "img/cover.jpg",
            sidebar: [
                {
                    name: "类型",
                    type: "radio",
                    values: ["大楼", "小区"]
                },
                {
                    name: "面积",
                    type: "text",
                    context: "<> m2"
                },
                {
                    name: "楼层",
                    type: "text",
                    context: "<> 层"
                }
            ]
        }
    ],
    circuit: [
        {
            name: "前端",
            cover: "img/cover.jpg",
            sidebar: [
                {
                    name: "类型",
                    type: "radio",
                    values: ["大楼", "小区"]
                },
                {
                    name: "面积",
                    type: "text",
                    context: "<> m2"
                },
                {
                    name: "楼层",
                    type: "text",
                    context: "<> 层"
                }
            ]
        },
        {
            name: "传输",
            cover: "img/cover-2.jpg",
            sidebar: [
                {
                    name: "类型",
                    type: "radio",
                    values: ["线缆", "光端机"]
                }
            ]
        },
        {
            name: "后端",
            cover: "img/cover-3.jpg",
            sidebar: [
                {
                    name: "类型",
                    type: "radio",
                    values: ["显示器", "屏幕墙", "硬盘", "存储"]
                }
            ]
        }
    ],
    machinery: [
        {
            name: "摄像机",
            cover: "img/cover-4.jpg",
            sidebar: [
                {
                    name: "使用环境",
                    type: "radio",
                    values: ["室内", "室外"]
                },
                {
                    name: "传感器类型",
                    type: "radio",
                    values: ["CMOS", "CCD"]
                },
                {
                    name: "楼层",
                    type: "text",
                    context: "<> 层"
                }
            ],
            products: [
                {
                    name: "监控摄像头红外夜视监控器",
                    price: 9999,
                    cover: "img/camera.jpg",
                    description: "1080P 480TVL CMOS 1/4枪式摄像机 数字摄像机 一体机 一般亮度 DC 驱动 C接口 DC12V 高速"
                },{
                    name: "监控摄像头红外夜视监控器",
                    price: 9999,
                    cover: "img/camera.jpg",
                    description: "1080P 480TVL CMOS 1/4枪式摄像机 数字摄像机 一体机 一般亮度 DC 驱动 C接口 DC12V 高速"
                },{
                    name: "监控摄像头红外夜视监控器",
                    price: 9999,
                    cover: "img/camera.jpg",
                    description: "1080P 480TVL CMOS 1/4枪式摄像机 数字摄像机 一体机 一般亮度 DC 驱动 C接口 DC12V 高速"
                },{
                    name: "监控摄像头红外夜视监控器",
                    price: 9999,
                    cover: "img/camera.jpg",
                    description: "1080P 480TVL CMOS 1/4枪式摄像机 数字摄像机 一体机 一般亮度 DC 驱动 C接口 DC12V 高速"
                }
            ]
        },
        {
            name: "摄像机镜头",
            cover: "img/cover-3.jpg",
            sidebar: [
                {
                    name: "焦距",
                    type: "text",
                    context: "<> mm"
                },
                {
                    name: "光圈",
                    type: "radio",
                    values: ["手动", "自动"]
                }
            ],
            products: [
                {
                    name: "镜头监控摄像头红外夜视监控器",
                    price: 9999,
                    cover: "img/camera.jpg",
                    description: "1080P 480TVL CMOS 1/4枪式摄像机 数字摄像机 一体机 一般亮度 DC 驱动 C接口 DC12V 高速"
                },{
                    name: "镜头监控摄像头红外夜视监控器",
                    price: 9999,
                    cover: "img/camera.jpg",
                    description: "1080P 480TVL CMOS 1/4枪式摄像机 数字摄像机 一体机 一般亮度 DC 驱动 C接口 DC12V 高速"
                },{
                    name: "镜头监控摄像头红外夜视监控器",
                    price: 9999,
                    cover: "img/camera.jpg",
                    description: "1080P 480TVL CMOS 1/4枪式摄像机 数字摄像机 一体机 一般亮度 DC 驱动 C接口 DC12V 高速"
                },{
                    name: "镜头监控摄像头红外夜视监控器",
                    price: 9999,
                    cover: "img/camera.jpg",
                    description: "1080P 480TVL CMOS 1/4枪式摄像机 数字摄像机 一体机 一般亮度 DC 驱动 C接口 DC12V 高速"
                }
            ]
        },
        {
            name: "云台",
            cover: "img/cover-2.jpg",
            sidebar: [
                {
                    name: "类型",
                    type: "radio",
                    values: ["大楼", "小区"]
                },
                {
                    name: "面积",
                    type: "text",
                    context: "<> m2"
                },
                {
                    name: "楼层",
                    type: "text",
                    context: "<> 层"
                }
            ],
            products: [
                {
                    name: "云台监控摄像头红外夜视监控器",
                    price: 9999,
                    cover: "img/camera.jpg",
                    description: "1080P 480TVL CMOS 1/4枪式摄像机 数字摄像机 一体机 一般亮度 DC 驱动 C接口 DC12V 高速"
                },{
                    name: "云台监控摄像头红外夜视监控器",
                    price: 9999,
                    cover: "img/camera.jpg",
                    description: "1080P 480TVL CMOS 1/4枪式摄像机 数字摄像机 一体机 一般亮度 DC 驱动 C接口 DC12V 高速"
                },{
                    name: "云台监控摄像头红外夜视监控器",
                    price: 9999,
                    cover: "img/camera.jpg",
                    description: "1080P 480TVL CMOS 1/4枪式摄像机 数字摄像机 一体机 一般亮度 DC 驱动 C接口 DC12V 高速"
                },{
                    name: "云台监控摄像头红外夜视监控器",
                    price: 9999,
                    cover: "img/camera.jpg",
                    description: "1080P 480TVL CMOS 1/4枪式摄像机 数字摄像机 一体机 一般亮度 DC 驱动 C接口 DC12V 高速"
                }
            ]
        }
    ]
}

export {Data}