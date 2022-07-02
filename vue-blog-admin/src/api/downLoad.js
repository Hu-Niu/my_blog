import axios from '../lib/request'

export const downloadFile = ({url, data, fileName, fileSuffix, blobType}) => {
  return axios({
    url,
    data,
    method: 'post',
    responseType: 'blob'
  }).then(res => {
    const blob = new Blob([res.data], {type: blobType});
    const finalFileName = `${fileName}.${fileSuffix}`
    if ("download" in document.createElement("a")) {
      const elink = document.createElement("a")
      elink.download = finalFileName
      elink.style.display = "none"
      elink.href = URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href)
      document.body.removeChild(elink)
    } else {
      navigator.msSaveBlob(blob, finalFileName)
    }
  })
};

