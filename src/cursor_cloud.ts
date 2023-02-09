export class CursorCloud {
    private readonly gl: WebGL2RenderingContext
    private readonly matrixLoc: WebGLUniformLocation

    private driftSpeeds: number[] = []

    private readonly maxSpeed = 0.1
    private tx: number = window.innerWidth / 2
    private ty: number = window.innerHeight / 2

    private points: number[] = []
    private pointsOffseted: number[] = []
    private oldPointsStore: number[][] = []

    private readonly startAlpha = 0
    private readonly endAlpha = 0.4

    private readonly framesStored = 10
    private _uMatrix: number[] = []

    private readonly POINTS = 100
    private readonly radius = 20
    constructor() {
        this.createVertices()
        const canvas = document.getElementById('cloud') as HTMLCanvasElement
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        this.gl = canvas.getContext('webgl2') as WebGL2RenderingContext
        const vertexShader = this.createShader(this.gl, this.gl.VERTEX_SHADER, vs)
        const fragmentShader = this.createShader(this.gl, this.gl.FRAGMENT_SHADER, fs)
        const program = this.createProgram(this.gl, vertexShader, fragmentShader)
        this.gl.useProgram(program)

        this.matrixLoc = this.gl.getUniformLocation(program, 'uMatrix') as WebGLUniformLocation
        this.initBuffers()
        this.initControls()
        this.updateMatrix()
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        this.gl.enable(this.gl.BLEND);
        this.gl.lineWidth(20)
        this.gl.drawArrays(this.gl.LINES, 0, this.points.length)
    }

    private initControls() {
        window.addEventListener('mousemove', (e) => {
            this.tx = (e.clientX);
            this.ty = (e.clientY);
        })
    }

    private updateMatrix() {
        this._uMatrix = m3.projection(this.gl.canvas.width, this.gl.canvas.height)
        this.gl.uniformMatrix3fv(this.matrixLoc, false, this._uMatrix)
    }

    udpate() {
        this.updateForDrift()
        this.gl.drawArrays(this.gl.LINES, 0, this.points.length)
    }

    private updateForDrift() {
        for (var i = 0; i < this.POINTS * 2; i += 2) {
            this.points[i] += this.driftSpeeds[i]
            this.points[i + 1] += this.driftSpeeds[i + 1]
            if (Math.sqrt(this.points[i] ** 2 + this.points[i + 1] ** 2) > this.radius) {
                this.driftSpeeds[i] *= -1
                this.driftSpeeds[i + 1] *= -1
            }
        }
        while (this.oldPointsStore.length > this.framesStored) {
            this.oldPointsStore.shift()
        }
        for (let i = 0; i < this.points.length; i += 2) {
            this.pointsOffseted[i] = this.points[i] + this.tx
            this.pointsOffseted[i + 1] = this.points[i + 1] + this.ty
        }
        this.oldPointsStore.push(this.pointsOffseted.concat())
        this.updateGeometry()
    }

    private updateGeometry() {
        const arr = []
        for (let i = 0; i < this.POINTS * 2; i += 2) {
            arr.push(this.pointsOffseted[i], this.pointsOffseted[i + 1], this.endAlpha, this.oldPointsStore[0][i], this.oldPointsStore[0][i + 1], this.startAlpha)
        }
        const arrFloat = new Float32Array(arr)
        this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, arrFloat)
    }

    private lerp(start: number, end: number, t: number) {
        (1 - t) * start + (t) * end
    }

    private createVertices() {
        let i = 0
        while (i < this.POINTS * 2) {
            const x = Math.random() * this.radius * 2 - this.radius;
            const y = Math.random() * this.radius * 2 - this.radius;
            if (Math.sqrt(x ** 2 + y ** 2) < this.radius) {  // only use points inside the unit sphere
                const newSpeed = this.randomVelocity()
                this.driftSpeeds[i] = newSpeed[0]
                this.driftSpeeds[i + 1] = newSpeed[1]
                this.points[i] = x
                this.points[i + 1] = y
                i += 2;
            }
        }
    }

    private randomVelocity(): number[] {
        let dx = Math.random() * 2 * this.maxSpeed - this.maxSpeed;
        let dy = Math.random() * 2 * this.maxSpeed - this.maxSpeed;
        return [dx, dy];
    }


    private initBuffers() {
        const arr = []
        for (let i = 0; i < this.POINTS * 2; i += 2) {
            arr.push(this.points[i], this.points[i + 1], 1, 100, 100, 1)
        }
        const positionBuffer = this.gl.createBuffer()
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer)
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(arr), this.gl.STATIC_DRAW)
        this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 12, 0)
        this.gl.enableVertexAttribArray(0)
    }

    private createShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader {
        var shader = gl.createShader(type) as WebGLShader
        gl.shaderSource(shader, source)
        gl.compileShader(shader)
        var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
        if (success) {
            return shader
        }
        console.log(gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        throw new Error("Could not create shader")
    }
    private createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
        var program = gl.createProgram() as WebGLProgram
        gl.attachShader(program, vertexShader)
        gl.attachShader(program, fragmentShader)
        gl.linkProgram(program)
        var success = gl.getProgramParameter(program, gl.LINK_STATUS)
        if (success) {
            return program
        }
        console.log(gl.getProgramInfoLog(program))
        gl.deleteProgram(program)
        throw new Error("Could not create program")
    }
}

const vs = `#version 300 es

    layout(location=0) in vec3 aPosition;
    uniform mat3 uMatrix;

    out float aAlpha;
    void main() {
        aAlpha = aPosition.z;
        gl_Position = vec4((uMatrix * vec3(aPosition.xy, 1)).xy,0, 1);
    }`
const fs = `#version 300 es
    
    precision highp float;
    
    out vec4 outColor;

    in float aAlpha;
    void main() {
        outColor = vec4(1,1,1,aAlpha);
    }`

var m3 = {
    projection: function (width: number, height: number) {
        // Note: This matrix flips the Y axis so that 0 is at the top.
        return [
            2 / width, 0, 0,
            0, -2 / height, 0,
            -1, 1, 1,
        ]
    },
    translation: function translation(tx: number, ty: number) {
        return [
            1, 0, 0,
            0, 1, 0,
            tx, ty, 1,
        ]
    },
    scaling: function scaling(s: number) {
        return [
            s, 0, 0,
            0, s, 0,
            0, 0, 1,
        ]
    },
    translate: function (m: number[], tx: number, ty: number) {
        return m3.multiply(m, m3.translation(tx, ty))
    },

    scale: function (m: number[], s: number) {
        return m3.multiply(m, m3.scaling(s))
    },
    multiply: function multiply(a: number[], b: number[]) {
        var a00 = a[0 * 3 + 0]
        var a01 = a[0 * 3 + 1]
        var a02 = a[0 * 3 + 2]
        var a10 = a[1 * 3 + 0]
        var a11 = a[1 * 3 + 1]
        var a12 = a[1 * 3 + 2]
        var a20 = a[2 * 3 + 0]
        var a21 = a[2 * 3 + 1]
        var a22 = a[2 * 3 + 2]
        var b00 = b[0 * 3 + 0]
        var b01 = b[0 * 3 + 1]
        var b02 = b[0 * 3 + 2]
        var b10 = b[1 * 3 + 0]
        var b11 = b[1 * 3 + 1]
        var b12 = b[1 * 3 + 2]
        var b20 = b[2 * 3 + 0]
        var b21 = b[2 * 3 + 1]
        var b22 = b[2 * 3 + 2]
        return [
            b00 * a00 + b01 * a10 + b02 * a20,
            b00 * a01 + b01 * a11 + b02 * a21,
            b00 * a02 + b01 * a12 + b02 * a22,
            b10 * a00 + b11 * a10 + b12 * a20,
            b10 * a01 + b11 * a11 + b12 * a21,
            b10 * a02 + b11 * a12 + b12 * a22,
            b20 * a00 + b21 * a10 + b22 * a20,
            b20 * a01 + b21 * a11 + b22 * a21,
            b20 * a02 + b21 * a12 + b22 * a22,
        ]
    },
}