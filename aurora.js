const canvas = document.createElement("canvas");
const container = document.getElementById("aurora-bg");
container.appendChild(canvas);

const gl = canvas.getContext("webgl");

function resize(){
  const rect = container.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  gl.viewport(0,0,canvas.width,canvas.height);
}

window.addEventListener("resize", resize);
resize();

const vertex = `
attribute vec2 position;
void main(){
  gl_Position = vec4(position,0.0,1.0);
}
`;

const fragment = `
precision highp float;

uniform float uTime;
uniform vec2 uRes;

float random(vec2 st){
  return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453);
}

float noise(vec2 st){
  vec2 i = floor(st);
  vec2 f = fract(st);

  float a = random(i);
  float b = random(i + vec2(1.0,0.0));
  float c = random(i + vec2(0.0,1.0));
  float d = random(i + vec2(1.0,1.0));

  vec2 u = f*f*(3.0-2.0*f);

  return mix(a,b,u.x) +
         (c-a)*u.y*(1.0-u.x) +
         (d-b)*u.x*u.y;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  
  float n = noise(vec2(uv.x*5.0, uTime*0.4));
  float y = uv.y + n*0.6 - 0.5;

  float intensity = smoothstep(0.3,0.6,y);

  vec3 color1 = vec3(0.5,0.0,1.0);   
  vec3 color2 = vec3(0.2,0.0,0.6);   
  vec3 color = mix(color1,color2,uv.x);
  color *= intensity;

  gl_FragColor = vec4(color, intensity*0.8);
}
`;

function createShader(type,source){
  const shader = gl.createShader(type);
  gl.shaderSource(shader,source);
  gl.compileShader(shader);
  return shader;
}

const program = gl.createProgram();
gl.attachShader(program,createShader(gl.VERTEX_SHADER,vertex));
gl.attachShader(program,createShader(gl.FRAGMENT_SHADER,fragment));
gl.linkProgram(program);
gl.useProgram(program);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([
  -1,-1,
   1,-1,
  -1, 1,
   1, 1
]),gl.STATIC_DRAW);

const position = gl.getAttribLocation(program,"position");
gl.enableVertexAttribArray(position);
gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);

const uTime = gl.getUniformLocation(program,"uTime");
const uRes = gl.getUniformLocation(program,"uRes");

function render(t){
  gl.uniform1f(uTime,t*0.001);
  gl.uniform2f(uRes,canvas.width,canvas.height);
  gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);
