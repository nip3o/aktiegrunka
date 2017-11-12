export default function ajax(url, method='GET') {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest()
        xhr.open(method, `https://cors.io/?${url}`)

        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response)
            } else {
                reject()
            }
        }
        xhr.onerror = reject
        xhr.send()
    })
}
