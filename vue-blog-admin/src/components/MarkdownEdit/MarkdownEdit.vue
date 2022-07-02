<template>
    <div class="markdown-edit-container">
        <div id="vditor" style="height: 100%"></div>
    </div>
</template>

<script>
import vditor from 'vditor'
import "vditor/dist/index.css"


export default {
    name: "MarkdownEdit",
    props: {
        blogContent: {
            type: String,
            default: () => ''
        }
    },
    components: {},
    data() {
        return {
            // 实例化的 vditor 对象
            // https://b3log.org/vditor/
            // https://ld246.com/article/1549638745630
            contentEditor: '',

            txt: '', // 编辑框的内容
            imgQuality: 0.7, // 图片压缩比例
        }
    },
    methods: {
        inputHandle() {
            let htmlTxt = this.contentEditor.getHTML()
            this.$emit('blogContentInputHandle', htmlTxt)
        },
        formatRes(files, responseText) {
            let receiveData = JSON.parse(responseText)
            let succMap = {};
            if (receiveData.code === 1) {
                let {data} = receiveData
                data.map(item => {
                    succMap[item.name] = item.url
                })
            }
            return JSON.stringify({
                msg: "插入成功",
                code: '0',
                data: {
                    errFiles: [],
                    succMap: succMap
                },
            })
        },

        dataURItoBlob(dataURI, type) {
            let binary = atob(dataURI.split(',')[1]);
            let array = [];
            for (let i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            return new Blob([new Uint8Array(array)], {type: type});
        },

        readBlobAsDataURL(blob) {
            return new Promise((resolve, reject) => {
                let a = new FileReader()
                a.onload = function (e) {
                    resolve(e.target.result)
                }
                a.readAsDataURL(blob);
            })
        },

        compressImg(file) {
            return new Promise(resolve => {
                const reader = new FileReader()
                const image = new Image()
                image.onload = (imageEvent) => {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    const width = image.width * this.imgQuality
                    const height = image.height * this.imgQuality
                    canvas.width = width;
                    canvas.height = height;
                    context.clearRect(0, 0, width, height);
                    context.drawImage(image, 0, 0, width, height);
                    const dataUrl = canvas.toDataURL(file[0].type);
                    const blobData = this.dataURItoBlob(dataUrl, file[0].type);
                    resolve(blobData)
                }
                reader.onload = (async e => {

                    let tempImgUrl = e.target.result

                    // 绘制 水印
                    let tempBlob = this.dataURItoBlob(tempImgUrl, file[0].type)
                    let img = await this.blobToImg(tempBlob)
                    let canvas = this.imgToCanvas(img)
                    let blob = await this.watermark(canvas, '最最最喜欢真真的小陈', 'bnbiye.com')
                    tempImgUrl = await this.readBlobAsDataURL(blob)

                    image.src = tempImgUrl;
                });
                reader.readAsDataURL(file[0]);
            })
        },

        blobToImg(blob) {
            return new Promise((resolve, reject) => {
                let reader = new FileReader()
                reader.addEventListener('load', () => {
                    let img = new Image()
                    img.src = reader.result
                    img.addEventListener('load', () => resolve(img))
                })
                reader.readAsDataURL(blob)
            })
        },

        imgToCanvas(img) {
            let canvas = document.createElement('canvas')
            canvas.width = img.width
            canvas.height = img.height
            let ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0)
            return canvas
        },

        watermark(canvas, text, text2) {
            return new Promise((resolve, reject) => {
                let ctx = canvas.getContext('2d')
                // 设置字号和字体
                ctx.font = "14px 宋体"
                // 设置
                ctx.fillStyle = "#FFC82C"
                // 设置右对齐
                ctx.textAlign = 'right'
                // 在指定位置绘制文字
                ctx.fillText(text, canvas.width - 20, canvas.height - 10)
                ctx.fillText(text2, canvas.width - 45, canvas.height - 30)
                canvas.toBlob(blob => resolve(blob))
            })
        },


        async beforeUpload(file) {
            if (/gif/.test(file[0].type)) {
                return file
            } else {
                let compressBlob = await this.compressImg(file)

                // vditor图片返回的结果必须是个file对象的数组，所以转换一下
                let result = new window.File([compressBlob], file[0].name)
                return [result]
            }
        },

    },
    computed: {
        headers() {
            return {
                Authorization: this.$store.state.user.token
            }
        },
        action() {
            let baseURL
            if(process.env.NODE_ENV === 'development'){ // 开发环境
                baseURL = myConfig.apiUrlDevelopment
            } else { // 生产环境
                if(this.isDemoVersion){
                    baseURL = myConfig.apiUrlDemo
                } else {
                    baseURL = myConfig.apiUrlProduction
                }
            }
            return `${baseURL}/file/uploadFile`
        },
    },
    watch: {},
    mounted() {
        this.contentEditor = new vditor("vditor", {
            toolbarConfig: {
                pin: true
            },
            preview: {
                delay: 10,
                hljs: {
                    enable: true,
                    style: 'dracula',
                    lineNumber: true,
                },
                actions: [
                    "desktop",
                    "mobile",
                    "mp-wechat",
                    "zhihu",
                ],
            },
            mode: 'sv',
            cache: {
                enable: false
            },
            // 是否支持拖拽
            resize: {
                enable: true
            },
            // 编辑器异步渲染完成后的回调方法
            after: () => {
                const txt = this.contentEditor.html2md(this.blogContent)
                this.contentEditor.setValue(txt)
            },
            input: this.inputHandle,
            upload: {
                url: this.action,
                max: 5 * 1024 * 1024,
                error: (msg) => {
                    console.log(msg, 'success')
                },
                headers: this.headers,
                accept: '.jpg,.png,.gif,.jpeg,.ico,.mp4',
                fieldName: 'file',
                extraData: {
                    fromWhereToUpload: 'vditor'
                },
                // 上传图片回显问题 https://ld246.com/article/1596703358584
                format: this.formatRes,

                // 图片上传前的钩子，进行压缩，绘制水印
                // https://segmentfault.com/a/1190000021570950
                // https://blog.csdn.net/cuixiping/article/details/45932793
                // https://blog.csdn.net/qq_34149935/article/details/88353679
                // https://litongzero.blog.csdn.net/article/details/103228060
                // https://blog.csdn.net/liona_koukou/article/details/84860899
                file: this.beforeUpload,

                // 不允许多图上传
                multiple: false,
            },
        })
        // this.inputHandle()
    }
}
</script>

<style scoped lang="scss">
@import "MarkdownEdit";
</style>
