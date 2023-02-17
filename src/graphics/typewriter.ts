

export class TypeWriter {
    private index: number = 0
    started = false
    finished = false
    private blinkRate = 400
    private cursorsIsVisible = true
    private blinkInterval: NodeJS.Timer | undefined
    constructor(private element: HTMLElement, private text: string, private speed: number, private delay: number, private newLineDelay: number, private cursorsRemainVisible: boolean, private callback: () => any) { }

    start() {
        this.blinkInterval = setInterval(this.cursorBlink.bind(this), this.blinkRate)
        this.started = true
        setTimeout(this.typeWrite.bind(this), this.delay)
    }

    private cursorBlink() {
        if (this.cursorsIsVisible) {
            this.cursorsIsVisible = false
            this.element.innerHTML = this.element.innerHTML.slice(0, -1)
            this.element.innerHTML += ' '
            if (this.finished && !this.cursorsRemainVisible) clearInterval(this.blinkInterval)
        }
        else {
            this.cursorsIsVisible = true
            this.element.innerHTML = this.element.innerHTML.slice(0, -1)
            this.element.innerHTML += '|'
        }
    }


    private typeWrite() {
        if (this.index <= this.text.length) {
            if (this.text.charAt(this.index - 1) == '\\') {
                this.insertString('<br/>')
                setTimeout(this.typeWrite.bind(this), Math.random() * this.speed / 10 + this.speed + this.newLineDelay)
            }
            else {
                this.insertString(this.text.charAt(this.index - 1))
                setTimeout(this.typeWrite.bind(this), Math.random() * this.speed / 10 + this.speed)
            }
            this.index += 1
        }
        else if (this.index > this.text.length) {
            this.finished = true
            this.callback()
        }
    }

    private insertString(str: string) {
        let last = ''
        if (this.cursorsIsVisible) {
            last = '|'
        }
        else {
            last = ' '
        }
        const before = this.element.innerHTML.slice(0, -1)
        this.element.innerHTML = before + str + last
    }
}


