export class ScrollTracker {
    get currentScroll() {
        return document.documentElement.scrollTop || document.body.scrollTop
    }
    private targetScroll = 0
    private startScroll = 0
    private duration = 500
    private startTime = 0

    stop() {
        this.startScroll = this.currentScroll
        this.targetScroll = this.currentScroll
    }

    private absoluteScrollBy(y: number) {
        window.scrollBy(0, y)
    }

    private absoluteScrollTo(y: number) {
        window.scrollBy(0, y - this.currentScroll)
    }

    scroll() {
        const frac = (Date.now() - this.startTime) / (this.duration)
        if (frac >= 1) {
            this.absoluteScrollTo(this.targetScroll)
            return
        }
        this.absoluteScrollTo(this.easeInOutCubic(frac) * (this.targetScroll - this.startScroll) + this.startScroll)
        requestAnimationFrame(this.scroll.bind(this))
    }

    scrollBy(y: number) {
        this.targetScroll = this.currentScroll + y
        this.startTime = Date.now()
        this.startScroll = this.currentScroll
        this.scroll()
    }

    private easeInOutCubic(x: number): number {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }
}