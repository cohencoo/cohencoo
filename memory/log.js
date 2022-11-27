/*==================================================
 * Menu Dialog V 2.0
 * Cohen Coombs 2022 (c) All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Cohen Coombs, 2022
 *==================================================
 * log('success', 'Success', 'This is a success message', '.logs')
 * log('error', 'Error', 'This is an error message', '.logs')
 * log('warning', 'Warning', 'This is a warning message', '.logs')
 * <div class="logs"></div>
==================================================*/
var tabs = 0
function log(status, text, desc, element = '.logs') {
    if (status == 'success') status = `var(--theme-green)`
    if (status == 'error') status = `var(--theme-red)`
    if (status == 'warning') status = `var(--theme-orange)`
    if (!desc.trim()) desc = null
    const logItem = Date.now()
    const logElement = document.createElement('div')
    logElement.className = 'log-item'
    logElement.id = logItem
    if (desc == null) logElement.innerHTML = `<div style="margin-right: 1rem; width: 0.5rem; height: 2rem; border-radius: 2rem; background: ${status};"></div><p style="margin: 0.3rem 0 0.3rem 0; font-weight: 600">${text}</p>`  
    else logElement.innerHTML = `
        <div style="margin-right: 1rem; width: 0.5rem; height: 3.5rem; border-radius: 2rem; background: ${status};"></div> 
        <div><p style="margin: 0.3rem 0 0.3rem 0; font-weight: 700">${text}</p><span style="color: var(--subtext)">${desc}</span></div>`
    document.querySelector(element).appendChild(logElement)
    document.querySelector(element).style.zIndex = "100"
    tabs++
    setTimeout(() => {
        document.getElementById(logItem).style.transform = "translateX(0%)"
        document.getElementById(logItem).style.opacity = "100%"
        document.querySelector(element).scrollTop = document.querySelector(element).scrollHeight;
        setTimeout(() => {
            document.getElementById(logItem).style.transform = "translateX(100%)"
            document.getElementById(logItem).style.opacity = "0%"
            setTimeout(() => document.getElementById(logItem).remove(), 400); 
            tabs--; if (tabs == 0) document.querySelector(element).style.zIndex = "-1"
        }, 5000)
    }, 10)
}