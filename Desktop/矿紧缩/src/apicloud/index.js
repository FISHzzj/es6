/**
 * 用于封装 apicloud 的一些方法
 */

// 请求权限
function requestPermission (permissionList) {
    return new Promise( resolve => {
        api.requestPermission({
            list: permissionList,
            code: 1
        }, function(ret, err){
            if (err) {
                resolve(err)
            }
            let isAuthorize = true
            // 如果 有 任一個 取消授權, 則返回
            ret.list.some( item => {
                if (item.granted === false) {
                    isAuthorize = false
                    return true
                }
            })
            if (isAuthorize) {
                resolve(true)
            } else {
                resolve(false)
            }
        })
    })
}

// 掃碼
function scanner (callback) {
    // 進行掃碼
    let toScanner = function () {
        var FNScanner = api.require('FNScanner')
        FNScanner.open({
            autorotation: true
        }, async function(ret, err) {
            if (!ret) return alert(JSON.stringify(err))
            // alert(JSON.stringify(ret))
            let { eventType, content } = ret
            // 如果訪問攝像頭失敗, 則調起權限請求
            if (eventType === 'success'){
                // 掃碼成功, 傳遞獲取的內容
                callback(content)
            } else if (eventType === 'cameraError') {
                let result = await requestPermission(['camera'])
                // 如果返回的結果 不是 布爾值, 則爲報錯, 進行提示
                if ( typeof result !== 'boolean') {
                    return alert(result)
                } else if (!result) {
                    // 返回爲 fasle, 則 用戶選擇了取消授權, 進行提示
                    Dialog.alert({
                        message: '要使用掃碼功能, 需要授予應用相機權限'
                    })
                    return false
                }
                // 遞歸, 再次啓動掃描
                toScanner()
            } /*else if (eventType === 'fail' && content === '非法图片') {
                // 如果報錯的結果是 '非法圖片', 則 需要詢問用戶 給予 存儲權限
                let result = await requestPermission(['photos'])
                // 如果返回的結果 不是 布爾值, 則爲報錯, 進行提示
                if ( typeof result !== 'boolean') {
                    return alert(result)
                } else if (!result) {
                    // 返回爲 fasle, 則 用戶選擇了取消授權, 進行提示
                    Dialog.alert({
                        message: '要使用相冊圖片, 需要授予應用存儲權限'
                    })
                    return false
                }
                // 遞歸, 再次啓動掃描
                toScanner()
            } */else if (eventType === 'fail') {
                Dialog.alert({
                    message: `${ret.content}或者未授予應用存儲權限`
                })
            }
        })
    }
    // 執行掃描
    toScanner()
}

// 下載文件
function download (url) {
    return new Promise( resolve => {
        api.download({
            url,
            report: true,
            cache: true,
            allowResume: true
        }, function(ret, err) {
            if (ret.state === 1) {
                //下载成功
                resolve({
                    isOk: true,
                    path: ret.savePath
                })
            } else {
                resolve({
                    isOk: false,
                    err: err || ret
                })
            }
        })
    })
}

// 保存圖片到相冊
function saveToAlbum (path) {
    return new Promise( resolve => {
        api.saveMediaToAlbum({
            path
        }, function(ret, err) {
            if (ret && ret.status) {
                resolve({
                    isOk: true
                })
            } else {
                resolve({
                    isOk: false,
                    err
                })
            }
        })
    })
}

export {
    scanner,
    download,
    saveToAlbum,
    requestPermission
}