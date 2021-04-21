/**
 * 某些共用的方法
 */

//  複製插件
import ClipboardJS from 'clipboard'


function copy (selector) {
    let clipboard = new ClipboardJS(selector)
    // 成功監聽
    clipboard.on('success', function(e) {
        Toast({
            message: '复制成功',
            duration: 800
        })
        e.clearSelection()
        // clipboard.destroy()
    })
    // 複製失敗監聽
    clipboard.on('error', function(e) {
        console.error('Action:', e.action)
        console.error('Trigger:', e.trigger)
    })
    // 返回銷毀實例的方法
    return clipboard
}


export {
    copy
}