(()=>{
/*
    Syntax:
    1. Mark element by attribute 'adaptive'
    2. Learn class-markers:

        d: by default*
        s: complements
        sm: width <= 640px
        md: width <= 1024px
        lg: width <= 1280px

        * - Required class-marker

    3. Write class-markers in format - {marker}: {classes..}.
    3.1 Advise: write class-markers by priority like in table
    4. Finite class-list could be looks like
        <div adaptive class="s: font-sans, d: m-2, sm: block, md: flex, lg: flex"></div>
*/
class AdapterBuffer{
    constructor(){
        this.buffer = []
        this.init()
    }
    init(){
        let adp = document.querySelectorAll('[adaptive]')
        if (!adp) return
        for (let a of adp){
            this.push(a, this.__format(a))
        }
        this.render()
    }
    __format(a){
        return a.className.split(
            ', '
        ).map(
            b => b.split(': ')
        )
    }
    render(){
        let f = format_by_width()
        this.buffer.map(
            p=>{
                let mks = p.get('markers')
                let cn = `${mks.get('s') || ''} ${mks.get(mks.has(f) ? f : 'd') || ''}`
                let i = p.get('item')
                console.log(`Adapting:\n i: .(${i.className})\n o: .(${cn})`)
                i.className = cn
            }
        )
        function format_by_width(){
            let w = screen.availWidth
            let m = new Map()
            m.set(
                w <= 1280, 'lg'
            ).set(
                w <= 1024, 'md'
            ).set(
                w <= 640, 'sm'
            )
            return m.get(true) || 'def'
        }
    }
    push(i, p){
        let mks = new Map()
        p.map(a=>mks.set(a[0], a[1]))
        let m = new Map()
        m.set(
            'item', i
        ).set(
            'markers', mks
        )
        this.buffer.push(m)
    }
}
let adapter = new AdapterBuffer()
window.onresize = ()=>{adapter.render()}
})()