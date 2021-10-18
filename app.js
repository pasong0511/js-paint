const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //canvas는 js로 엘리먼트를 통해서 픽셀을 조절하기 위해서 사용
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const clearBtn = document.getElementById("jsClear");
const BrushBtn = document.getElementById("jsBrush");
const colorPicker = document.getElementById("inputPicker");
const nowColor = document.getElementById("jsNowColor");

const lineBtn = document.getElementById("jsLine");
const circleBtn = document.getElementById("jsCircle");
const rectangleBtn = document.getElementById("jsRectangle");


const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE_X = 900;
const CANVAS_SIZE_Y = 700;

const DRAW_MODE = {
    BRUSH: "BRUSH",
    BOX: "BOX",
    CIRCLE : "CIRCLE",
    LINE : "LINE",
};

canvas.width = CANVAS_SIZE_X; //캔버스는 사이즈가 필요하다(CSS와 js 둘다 줘야함)
canvas.height = CANVAS_SIZE_Y;

ctx.fillStyle = "white"; //초기 백그라운드 색상
ctx.fillRect(0, 0, CANVAS_SIZE_X, CANVAS_SIZE_Y);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

let startX = 0;
let startY = 0;

/* 그리기 모드를 설정합니다. */
let drawMode = DRAW_MODE.BRUSH;

/* 브러쉬 그리기 */
function handleMouseDown(event) {
    startX = event.offsetX;
    startY = event.offsetY;

    painting = true;
}

function handleMouseUp(event) {
    painting = false;

    const nowCircle = {
        X: Math.round((startX + event.offsetX) / 2),
        Y: Math.round((startY + event.offsetY) / 2),
        R: Math.round(Math.abs(event.offsetY - startY) / 2)
    };

    if (drawMode === DRAW_MODE.BOX) {
        ctx.strokeRect(
        Math.min(startX, event.offsetX),
        Math.min(startY, event.offsetY),
        Math.abs(startX - event.offsetX),
        Math.abs(startY - event.offsetY)
        );
    } else if (drawMode === DRAW_MODE.CIRCLE){
        console.log("사이클 부분 실행");
        ctx.beginPath();
        ctx.arc(nowCircle.X, nowCircle.Y, nowCircle.R, 0, Math.PI * 2, true);
        ctx.stroke();
    } else if (drawMode === DRAW_MODE.LINE) {
        console.log("라인 부분 실행");
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.closePath();
        ctx.stroke();
    }
}

function onMouseMove(event) {
    if (drawMode === DRAW_MODE.BRUSH) {
        const x = event.offsetX;
        const y = event.offsetY;

        if (painting) {
        //그리기
        ctx.lineTo(x, y); //선 끝 좌표
        ctx.stroke(); //선 그리기
        } else {
        //경로 생성
        ctx.beginPath(); //경로 생성
        ctx.moveTo(x, y); //선 시작 좌표
        }
    }
}

function handelColorClick(event) {
    const color = event.target.style.backgroundColor;

    modifyColor(color);
}

function handleColorPickerClick(event) {
    const color = colorPicker.value;   

    modifyColor(color);
}

function modifyColor(color){
    ctx.strokeStyle = color; //색 변경해주기
    ctx.fillStyle = color;

    nowColor.style.background = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handelModeClick(event) {
    if (filling === true) {
        filling = false;
        mode.innerHTML = "Fill";
    } else {
        filling = true;
        mode.innerHTML = "Brush";
    }
}

function handleCanvasClick(event) {
    if (filling) {
        //filling가 true일때만 채우기
        ctx.fillRect(0, 0, CANVAS_SIZE_X, CANVAS_SIZE_Y); //0,0에서부터 캔버스 사이즈만큼 재우기
    }
}

function handleContextMenu(event) {
  event.preventDefault(); //마우스 우클릭 방지
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

function handleRectangleBtnClick() {
    drawMode = DRAW_MODE.BOX;
}

function handleCircleBtnClick() {
    console.log("사이클");
    drawMode = DRAW_MODE.CIRCLE;
    console.log(drawMode);
}

function handleBrushClick() {
    drawMode = DRAW_MODE.BRUSH;
}

function handleLineClick() {
    drawMode = DRAW_MODE.LINE;
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove); //mousemove 마우스를 올렸을때
    canvas.addEventListener("mousedown", handleMouseDown); //monusedown 마우스 한번 클릭 후 떼지 않을 때
    canvas.addEventListener("mouseup", handleMouseUp); //mouseup 마우스클 한번 클릭하고 땔때
    canvas.addEventListener("mouseleave", handleMouseUp);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu);
}

if (mode) {
    mode.addEventListener("click", handelModeClick);
}

Array.from(colors).forEach((i) =>
    i.addEventListener("click", handelColorClick)
);

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}

if (clearBtn) {
    clearBtn.addEventListener("click", handleClearClick);
}

if(BrushBtn){
    BrushBtn.addEventListener("click", handleBrushClick);
}

if(rectangleBtn) {
    rectangleBtn.addEventListener("click", handleRectangleBtnClick);
}

if(circleBtn) {
    circleBtn.addEventListener("click", handleCircleBtnClick);
}

if(colorPicker) {
    colorPicker.addEventListener("change", handleColorPickerClick);
}

if(lineBtn) {
    lineBtn.addEventListener("click", handleLineClick);
}