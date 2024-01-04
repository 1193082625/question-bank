<template>
	<view id="content">  
    </view>  
</template>

<script>
	export default {
		data() {
			return {
				gl: null
			}
		},
		onReady() {
            const content = document.getElementById('content')  
            const canvasEle = document.createElement('canvas')  
			canvasEle.width = window.innerWidth;
			canvasEle.height = window.innerHeight;
            content.appendChild(canvasEle)  
            this.gl = canvasEle.getContext('webgl')  
			this.drawTriangle();
		},
		methods: {
			drawTriangle() {// 顶点着色器程序
			  if(!this.gl) return;
			  const vsSource = `
				attribute vec4 aVertexPosition;
				void main(void) {
				  gl_Position = aVertexPosition;
				}
			  `;

			  // 片元着色器程序
			  const fsSource = `
				precision mediump float;
				void main(void) {
				  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
				}
			  `;

			  const vertexShader = this.compileShader(vsSource, this.gl.VERTEX_SHADER);
			  const fragmentShader = this.compileShader(fsSource, this.gl.FRAGMENT_SHADER);

			  const shaderProgram = this.gl.createProgram();
			  this.gl.attachShader(shaderProgram, vertexShader);
			  this.gl.attachShader(shaderProgram, fragmentShader);
			  this.gl.linkProgram(shaderProgram);

			  if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
				console.error('Unable to initialize the shader program:', this.gl.getProgramInfoLog(shaderProgram));
				return;
			  }

			  this.gl.useProgram(shaderProgram);

			  // 定义顶点坐标
			  const vertices = new Float32Array([
				0.0, 0.2,
				-0.2, -0.2,
				0.2, -0.2,
			  ]);

			  // 创建缓冲区
			  const vertexBuffer = this.gl.createBuffer();
			  this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
			  this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

			  // 获取顶点着色器中的 attribute 变量的地址
			  const position = this.gl.getAttribLocation(shaderProgram, 'aVertexPosition');

			  // 将缓冲区分配给 attribute 变量
			  this.gl.vertexAttribPointer(position, 2, this.gl.FLOAT, false, 0, 0);
			  this.gl.enableVertexAttribArray(position);

			  // 清空画布
			  this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
			  this.gl.clear(this.gl.COLOR_BUFFER_BIT);

			  // 绘制三角形
			  this.gl.drawArrays(this.gl.TRIANGLES, 0, vertices.length / 2);
			},
			compileShader(source, type) {
			  const shader = this.gl.createShader(type);
			  this.gl.shaderSource(shader, source);
			  this.gl.compileShader(shader);

			  if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
				console.error('Shader compilation error:', this.gl.getShaderInfoLog(shader));
				this.gl.deleteShader(shader);
				return null;
			  }

			  return shader;
			},
		}
	}
</script>

<style>

</style>
