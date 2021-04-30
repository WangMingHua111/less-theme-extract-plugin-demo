; (function (window) {
    var prefixes = 'webkit moz ms o'.split(' '); //各浏览器前缀
    var requestAnimationFrame = window.requestAnimationFrame
    //通过遍历各浏览器前缀，来得到requestAnimationFrame在当前浏览器的实现形式
    for (var i = 0; i < prefixes.length; i++) {
        if (requestAnimationFrame) {
            break;
        }
        prefix = prefixes[i];
        requestAnimationFrame = requestAnimationFrame || window[prefix + 'RequestAnimationFrame'];
    }
    function SetLink(link, disabled) {
        link.disabled = disabled
        return new Promise((resolve) => {
            if (requestAnimationFrame) requestAnimationFrame(() => resolve())
            else resolve()
        })
    }
    function ThemeSwitcher() {
        // debugger// eslint-disable-line no-debugger
        this.development = typeof process !== 'undefined' && process.env.NODE_ENV === 'development'
        if (this.development) this.initDevelopmentThemes()
        else this.initProductionThemes()
    }
    ThemeSwitcher.prototype = {
        async setTheme(theme) {
            let themes = this.themes
            let enableLinks = []
            let disableLinks = []
            Object.keys(themes).filter(key => key === theme).forEach(key => themes[key].forEach(link => enableLinks.push(link)))
            Object.keys(themes).filter(key => key !== theme).forEach(key => themes[key].forEach(link => !link.disabled && disableLinks.push(link)))

            for (const i in enableLinks) {
                await SetLink(enableLinks[i], false)
            }
            for (const i in disableLinks) {
                await SetLink(disableLinks[i], true)
            }
            this._theme = theme
            return Promise.resolve()
        },
        getTheme() {
            return this._theme
        },
        getThemes() {
            return Object.keys(this.themes)
        },
        // 测试发现运行环境无法切换主题，暂时不处理该代码
        initDevelopmentThemes() {
            let themes = {}
            document.querySelectorAll('link').forEach(tag => {
                let rel = tag.getAttribute('rel') || ''
                let href = tag.getAttribute('href') || ''
                if (rel && href && (/stylesheet/i.test(rel) || /prefetch/i.test(rel)) && /theme\.\w+\./i.test(href)) {
                    let theme = href.match(/theme\.(\w+)\./i)[1]
                    if (!themes[theme]) themes[theme] = [tag]
                    else themes[theme].push(tag)
                    if (!tag.disabled) this._theme = theme
                }
            })
            // Object.keys(themes).slice(1).forEach(key => themes[key].forEach(tag => tag.disabled = true))
            this.themes = themes
        },
        initProductionThemes() {
            let themes = {}
            // 主题检索
            document.querySelectorAll('link[theme]').forEach(tag => {
                let theme = tag.getAttribute('theme')
                if (!themes[theme]) themes[theme] = [tag]
                else themes[theme].push(tag)
                if (!tag.disabled) this._theme = theme
            })
            Object.keys(themes).forEach(theme => {
                console.log(`Theme：${theme}`)
            })
            this.themes = themes
        }
    }
    window.themeSwitcher = new ThemeSwitcher()
})(window);