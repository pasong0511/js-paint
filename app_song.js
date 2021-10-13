const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");        //canvas는 js로 엘리먼트를 통해서 픽셀을 조절하기 위해서 사용
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const clearBtn = document.getElementById("jsClear");
const BrushBtn = document.getElementById("jsBrush");

const circle = document.getElementById("jsCircle");
const triangle = document.getElementById("jsTriangle");
const rectangleBtn = document.getElementById("jsRectangle");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE_X = 900;
const CANVAS_SIZE_Y = 700;

canvas.width = CANVAS_SIZE_X;         //캔버스는 사이즈가 필요하다(CSS와 js 둘다 줘야함)
canvas.height = CANVAS_SIZE_Y;

ctx.fillStyle = "white";                //초기 백그라운드 색상
ctx.fillRect(0, 0, CANVAS_SIZE_X, CANVAS_SIZE_Y);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let drawMode = "brush";
let painting = false;
let filling = false;
let drag = false;

let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;

function startPainting(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    startX = x;
    startY = y;

    console.log("시작", startX, startY);

    painting = true;
    drag = false;
}

function stopPainting(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    endX = x;
    endY = y;

    console.log("끝", startX, startY);

    painting = false;
    drag = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if(drawMode === "brush"){
        brushPaint(x, y);
    }else if(drawMode==="box"){
        boxPaint();
    }
}

function brushPaint(x, y){
    if(painting === false) {    //경로 생성
        ctx.beginPath();        //경로 생성
        ctx.moveTo(x, y);       //선 시작 좌표
    } else {                    //그리기
        ctx.lineTo(x, y);       //선 끝 좌표
        ctx.stroke();           //선 그리기
    }
}

function boxPaint(){
    handleShapeClick(
        Math.min(startX, endX),
        Math.min(startY, endY),
        Math.abs(startX - endX),
        Math.abs(startY - endY)
        );
}

function handelColorClick(event) {
    const color = event.target.style.backgroundColor;

    ctx.strokeStyle = color;    //색 변경해주기
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handelModeClick(event) {
    if(filling === true){
        filling = false;
        mode.innerHTML = "Fill";
    }else{
        filling = true;
        mode.innerHTML = "Brush";
        
    }
}

function handleCanvasClick(event) {
    if(filling){    //filling가 true일때만 채우기
        ctx.fillRect(0, 0, CANVAS_SIZE_X, CANVAS_SIZE_Y);   //0,0에서부터 캔버스 사이즈만큼 재우기
    }
}

function handleContextMenu(event) {
    event.preventDefault();        //마우스 우클릭 방지
}

function handleSaveClick(event) {
    const image = canvas.toDataURL();
    const link = document.createElement("a");

    link.href = image;
    link.download = "PaintJS[EXPORT]";
    // console.log(link);
    link.click();
}

function handleClearClick(event) {
    ctx.clearRect(0, 0, CANVAS_SIZE_X, CANVAS_SIZE_Y);
}

function handleShapeClick(startX, startY, endX, endY) {
    ctx.strokeRect(startX, startY, endX, endY)
}

function handleBrushClick() {
    drawMode = "brush";
    console.log("모드:", drawMode);
}

function handleRectangleClick() {
    drawMode = "box";
    console.log("모드:", drawMode);
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);      //mousemove 마우스를 올렸을때
    canvas.addEventListener("mousedown", startPainting);    //monusedown 마우스 한번 클릭 후 떼지 않을 때
    canvas.addEventListener("mouseup", stopPainting);       //mouseup 마우스클 한번 클릭하고 땔때
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu);
}

if(mode){
    mode.addEventListener("click", handelModeClick);
}

Array.from(colors).forEach(i => 
    i.addEventListener("click", handelColorClick)
);

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}

if(clearBtn){
    clearBtn.addEventListener("click", handleClearClick);
}

if(BrushBtn){
    BrushBtn.addEventListener("click", handleBrushClick);
}

if(rectangleBtn){
    rectangleBtn.addEventListener("click", handleRectangleClick);   
}