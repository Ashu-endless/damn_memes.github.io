const canvas = new fabric.Canvas('mycanvas', {
    perPixelTargetFind: true,
    height: 250,
    width: 250,
    selection: false,
    stopContextMenu: false,



});

// console.log(canvas.vptCoords)
check = document.querySelector('#check')
check.onchange = () => {
    console.log(check.toBackground())

    se
}

window.onresize = () => {
    console.log(window.innerWidth)
}
const getActiveObject = () => {

    var active_object = canvas.getActiveObject()
    if (active_object != undefined) {
        return true;
    } else {
        if (active_object = undefined)
            return false;
    }

}

// const canvas2 = new fabric.Canvas('mycanvas', {
//     selection: false,


// });
// const scanvas = document.getElementById('mycanvas')
// const ctx = scanvas.getContext('2d');

const bg_img_input = document.getElementById('bg_img_input');

bg_img_input.addEventListener('change', function() {
    var img_to_edit = this.files[0];

    // console.log(this.files[0].name)
    // console.log(this.files[0].type);
    // console.log(this.files[0].size);
    // console.log(this.files.length)

    fabric.Image.fromURL(URL.createObjectURL(img_to_edit), (img) => {
        img = img.scaleToWidth(canvas.width)
        img_ = img.scaleToHeight(canvas.height);
        canvas.backgroundImage = img_

        canvas.renderAll()
    });

});
const search_image = document.getElementById('search_image');
// const fetch = require('node-fetch');
// global.fetch = fetch;
const searching = () => {
    let clientId = 'm-54i_kwIskicvXmUdjrUajXwLXroSSNKTsHBmPorpU';
    let query = search_image.value
    console.log(query)
    let url = `https://api.unsplash.com/search/photos/?client_id=${clientId}&query=${query} █`

    fetch(url)
        .then(function(data) {
            return data.json();
        })
        .then(function(data) {
            console.log(data);

            data.results.forEach(photo => {
                let img = document.createElement('IMG')
                img.classList.add('objects')

                img.src = photo.urls.regular

                var searched_imaged = document.getElementById('searched_imaged');
                searched_imaged.append(img)
                console.log(img)
                    // -------------object when searched

                var objects = document.getElementsByClassName('objects');
                for (let object of objects) {
                    object.onclick = (e) => {
                        console.log(e.target.src)
                        let img_to_edit = e.target.src
                            // fabric.Image.fromURL(img_to_edit, function(img, isError) {
                            //     img.set({ originX: 'left', originY: 'top', crossOrigin: 'anonymous' });
                            //     img.scaleToWidth(parseInt(canvas.width)).scaleToHeight(parseInt(canvas.height))
                            //     canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
                            // });
                        canvas.setBackgroundImage(img_to_edit, canvas.renderAll.bind(canvas), {
                            originX: 'left',
                            originY: 'top',
                            crossOrigin: 'anonymous',

                        });
                        // canvas.backgroundImage.scaleToWidth(canvas.width / 2).scaleToHeight(canvas.height / 2)



                        // fabric.Image.fromURL(img_to_edit,
                        //     function(myImg) {

                        //         var img = myImg.scaleToWidth(canvas.width / 2).scaleToHeight(canvas.height / 2)


                        //         canvas.add(img);
                        //         canvas.renderAll()
                        // });
                    }
                }
            })

        })
}

search_image.addEventListener('input', searching);

const img_input = document.getElementById('img_inp');
var objects = document.getElementsByClassName('objects');
for (var object of objects) {
    object.onclick = (e) => {
        console.log(e.target.src)
        var img_to_edit = e.target.src
        fabric.Image.fromURL(URL.createObjectURL(img_to_edit), function(myImg) {

            var img = myImg.scaleToWidth(canvas.width / 2)
            var img_ = img.scaleToHeight(canvas.height / 2)
            canvas.add(img_);

            canvas.renderAll()
        })
    }
}
img_input.addEventListener('change', function() {
    console.log(this.files[0].name);
    var img_to_edit = this.files[0];
    fabric.Image.fromURL(URL.createObjectURL(img_to_edit), function(myImg) {

        var img = myImg.scaleToWidth(canvas.width / 2)
        var img_ = img.scaleToHeight(canvas.height / 2);
        canvas.add(img_);
        canvas.renderAll()



    });
})






//  modes
let panningmode = false;
let brushmode = false;
let textmode = false;
let filtermode = false;
let sheet_stmode = false;
let bg_stmode = false;
let addobjmode = false;
var none = 'none';

const text_t = () => {
    textmode = true;
    text_opt.style.display = 'flex';
}

const text_f = () => {
    textmode = false;
    text_opt.style.display = 'none';

}


const brush_t = () => {
    brush_options_div.style.display = 'flex';
    brushmode = true;
    canvas.isDrawingMode = true;

}
const brush_f = () => {
    brush_options_div.style.display = 'none';
    brushmode = false;
    canvas.isDrawingMode = false;
}

var shape_ul = document.getElementById('shape_ul');
const shape_t = () => {
    shape_ul.style.display = 'flex';
}

const shape_f = () => {
    shape_ul.style.display = 'none';
}
const knowmode = (mode) => {
    switch (mode) {
        case 'textmode':
            text_t();
            shape_f()
            filtermode = false;
            brushmode = false;
            sheet_stmode = false;
            bg_stmode = false;
            brush_options_div.style.display = 'none';
            add_objf()
            filters_opt_ul.style.display = 'none';
            sheet_settings.style.display = "none";
            brush_f()
            bg_ul.style.display = 'none';
            break;
        case 'brushmode':
            filtermode = false;
            text_f()
            shape_f()
            bg_stmode = false;
            sheet_stmode = false
            filters_opt_ul.style.display = 'none';
            sheet_settings.style.display = "none";
            bg_ul.style.display = 'none';
            add_objf()
            brush_t()
            break;
        case 'filtermode':
            filtermode = true;
            text_f()
            shape_f()
            sheet_stmode = false;
            bg_stmode = false;
            add_objf()
            brush_f()
            filters_opt_ul.style.display = 'flex';
            sheet_settings.style.display = "none";
            bg_ul.style.display = 'none';

            break;

        case "sheet_st":
            filtermode = false;
            text_f()
            shape_f()
            sheet_stmode = true;
            add_objf()
            filters_opt_ul.style.display = 'none';
            sheet_settings.style.display = 'flex';
            bg_ul.style.display = 'none';
            bg_stmode = false;
            brush_f()

            break;


        case 'bg_st':
            bg_ul.style.display = 'flex';
            filtermode = false;
            text_f()
            shape_f()
            sheet_stmode = false;
            bg_stmode = true;
            add_objf()
            brush_f()
            filters_opt_ul.style.display = 'none';
            sheet_settings.style.display = 'none';
            break;
        case 'addobjmode':
            bg_ul.style.display = 'none';
            filtermode = false;
            brush_f()
            text_f()
            sheet_stmode = false;
            bg_stmode = false;
            add_objt();
            filters_opt_ul.style.display = 'none';
            sheet_settings.style.display = 'none';
            shape_f()
            break;

        case 'shape_mode':
            bg_ul.style.display = 'none';
            filtermode = false;
            brush_f()
            text_f()
            shape_t()
            sheet_stmode = false;
            bg_stmode = false;
            add_objf();
            filters_opt_ul.style.display = 'none';
            sheet_settings.style.display = 'none';
            break;

        default:
            brush_f()
            text_f()
            filters_opt_ul.style.display = 'none';
            sheet_settings.style.display = "none";
            filtermode = false;
            sheet_stmode = false;
            bg_stmode = false;
            add_objf()
            bg_ul.style.display = 'none';
            shape_f()
            break;


    }
}

fabric.Object.prototype.transparentCorners = true;

var sheet = document.getElementById('mycanvas');


// dowmload cnvs
var dwnldcnvs = document.getElementById("mycanvas");
download_img = function(el) {
    var image = dwnldcnvs.toDataURL("image/jpg");
    el.href = image;
};



// const active_object = canvas.getActiveObject();
const active = () => {
    var object = canvas.getActiveObject()
    console.log(object)
    object.style.color = "yellow"

    // canvas.remove(canvas.getActiveObject())
}




canvas.on('mouse:move', (event) => {
    // panning
    if (panningmode && brushmode == false) {
        canvas.setCursor('grab');
        const mevent = event.e;
        const delta = new fabric.Point(mevent.movementX, mevent.movementY)
        canvas.relativePan(delta)
        canvas.renderAll()
    }
});

canvas.on('mouse:down', (event) => {
    panningmode = false;
});

canvas.on('mouse:up', (event) => {
    panningmode = false;
});

var diamondPatternBrush = new fabric.PatternBrush(canvas);
diamondPatternBrush.getPatternSrc = function() {

        var squareWidth = 10;
        var squareDistance = 5;
        // var patternCanvas = fabric.document.createElement('canvas');
        var rect = new fabric.Rect({
            width: squareWidth,
            height: squareWidth,
            angle: 45,
            fill: 'yellow',
            dirty: true


        })
        canvas.renderAll()
    }
    // -------------------------------All brush----------------------------------------
var brush_options_div = document.getElementById('brush_opt_ul')

var text_opt = document.getElementById("text_opt_ul");
var brush_li = document.getElementById('brush')

var brush_options = document.getElementById('brush_options')

brush_li.onclick = () => {
    if (brushmode) {

        knowmode(none)
    } else {
        knowmode('brushmode')
    }
}
var brush_color = document.getElementById('brush_color')
brush_options.onchange = () => {
    canvas.freeDrawingBrush = new fabric[brush_options.value + 'Brush'](canvas);
    canvas.freeDrawingBrush.color = brush_color.value
    canvas.freeDrawingBrush.shadow = new fabric.Shadow({
        blur: parseInt(10),
        offsetX: 0,
        offsetY: 0,
        affectStroke: true,
        color: 'yellow',
    });
}
if (canvas.freeDrawingBrush) {


    var brush_width = document.getElementById('brush_width')
    brush_width.onchange = () => {
        canvas.freeDrawingBrush.width = parseInt(brush_width.value);
    }
    var shadowwidth = document.getElementById('shadowwidth')
    shadowwidth.onchange = () => {
        canvas.freeDrawingBrush.shadow.blur = parseInt(shadowwidth.value);
    }
    var shadowoffset = document.getElementById('shadowoffset')
    shadowoffset.onchange = () => {
        canvas.freeDrawingBrush.shadow.offsetX = parseInt(shadowoffset.value);
        canvas.freeDrawingBrush.shadow.offsetY = parseInt(shadowoffset.value);
    }

    brush_color.onchange = () => {
        canvas.freeDrawingBrush.color = brush_color.value
    }

}


var texture_brush = document.getElementById('texture_brush')

texture_brush.onchange = () => {
    var canvasWidth = rect.getBoundingRect().width;

    patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
    rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });

    var ctx = patternCanvas.getContext('2d');
    rect.render(ctx);

    return patternCanvas;
    var texturePatternBrush = new fabric.PatternBrush(canvas);
    var img = texture_brush.files[0]
    texturePatternBrush.source = img;
    canvas.freeDrawingBrush = texturePatternBrush;

}


//text
var text_ul = document.getElementById('text');
var font_options = document.getElementById('font_options')

font_options.onchange = () => {
    console.log(font_options.value)
    var fonty = 'fantasy'

    function loadAndUse(font) {
        var myfont = new FontFaceObserver(font)
        myfont.load()
            .then(function() {
                // when font is loaded, use it.
                canvas.getActiveObject().set("fontFamily", font);
                canvas.requestRenderAll();
            }).catch(function(e) {
                console.log(e)
                alert('font loading failed ' + font);
            });
    }
    // canvas.getActiveObject().set("fontFamily", 'pacifico');
    // canvas.requestRenderAll();
    loadAndUse(fonty)
}


text.onclick = () => {
    if (textmode) {
        knowmode(none)
    } else {
        knowmode('textmode')
    }
}
var text_color_li = document.getElementById('text_color_li');
var text_bg_li = document.getElementById('text_bg_li');
var add_text = document.getElementById('addtext');
var text_color = document.getElementById('text_color');
var text_bg = document.getElementById('text_bg');

const setobject = (key, value) => {

    if (getActiveObject()) {
        var object = canvas.getActiveObject();
        object.set(key, value);
        canvas.requestRenderAll();
    } else {
        ""
    }
}
add_text.onclick = () => {
    textbox = new fabric.IText('text', {
        // strokeWidth: 0.5,
        fontWeight: 100,
        // stroke: "yellow"
    })

    canvas.add(textbox);

}
text_color.oninput = (e) => {
    e.preventDefault()
    setobject("fill", text_color.value);

}

text_bg.oninput = () => {
    setobject("textBackgroundColor", text_bg.value)

};

var strokewidth = document.getElementsByClassName('strokewidth');
for (var el of strokewidth) {
    el.oninput = (e) => {
        console.log(canvas.getActiveObject().strokeWidth)
        setobject("strokeWidth", e.target.value)
            // rect.strokeWidth = e.target.value

    }
}

var strokecolor = document.getElementsByClassName('strokecolor');
for (var el of strokecolor)
    el.onchange = (e) => {
        setobject("stroke", e.target.value)

    }
    // -----------------------------filters--------------------------------------

var filters_ = document.getElementById('filters');
var filters_opt_ul = document.getElementById('filters_opt_ul');

filters_.onclick = () => {

    if (filtermode) {
        knowmode(none)
    } else {
        knowmode('filtermode');
    }
}

var filters = ['grayscale', 'invert', 'remove-color', 'sepia', 'brownie',
    'brightness', 'contrast', 'saturation', 'noise', 'vintage',
    'pixelate', 'blur', 'sharpen', 'emboss', 'technicolor',
    'polaroid', 'blend-color', 'gamma', 'kodachrome',
    'blackwhite', 'blend-image', 'hue', 'resize',
];

function applyFilter(index, filter) {

    var obj = canvas.getActiveObject();
    // console.log(obj.filters[index].value)
    obj.filters[index] = filter;
    console.log(obj.filters[index], filter)
    obj.applyFilters();
    canvas.renderAll();
}

// alert(filters[1])
// var canvas2dBackend = new fabric.Canvas2dFilterBackend()

// fabric.filterBackend = fabric.initFilterBackend();
// fabric.filterBackend = canvas2dBackend;

var brightness = document.getElementById('brightness');
brightness.oninput = () => {
    applyFilter(5, new fabric.Image.filters.Brightness({
        brightness: parseFloat(brightness.value)
    }))
}

var hue = document.getElementById('hue');
hue.oninput = () => {
    applyFilter(21, new fabric.Image.filters.HueRotation({
        rotation: parseFloat(hue.value)
    }))
}

var noise = document.getElementById('noise');
noise.oninput = () => {
    applyFilter(8, new fabric.Image.filters.Noise({
        noise: parseFloat(noise.value)
    }))
}

var contrast = document.getElementById('contrast');
contrast.oninput = () => {
    applyFilter(6, new fabric.Image.filters.Contrast({
        contrast: parseFloat(contrast.value)
    }))
}

var saturation = document.getElementById('saturation');
saturation.oninput = () => {
    applyFilter(7, new fabric.Image.filters.Saturation({
        saturation: parseFloat(saturation.value)
    }))
}

var blur = document.getElementById('blur');
blur.oninput = () => {
    applyFilter(11, new fabric.Image.filters.Blur({
        blur: parseFloat(blur.value)
    }))
}

var pixelate = document.getElementById('pixelate');
pixelate.oninput = () => {
    applyFilter(11, new fabric.Image.filters.Pixelate({
        blocksize: parseFloat(pixelate.value)
    }))
}

var invert = document.getElementById('invert');
invert.oninput = () => {
    applyFilter(1, invert.checked && new fabric.Image.filters.Invert())
}


// const test = () => {
//     var object = canvas.getActiveObject()
//     var filter = new fabric.Image.filters.Brightness({
//         brightness: 0.5
//     });
//     object.filters.push(filter);
//     object.applyFilters();
// }





const drop_templates = document.querySelector('.meme_templates');
const mycanvas = document.querySelector('.upper-canvas ')


drop_templates.addEventListener('dragstart', (e) => {
    console.log('DragStart has been triggered');


});

drop_templates.addEventListener('dragend', (e) => {
    console.log('DragEnd has been triggered');

});



mycanvas.addEventListener('dragover', (e) => {
    e.preventDefault();
    console.log('DragOver has been triggered');
});

mycanvas.addEventListener('dragenter', (e) => {
    console.log('DragEnter has been triggered');

})

mycanvas.addEventListener('dragleave', (e) => {
    console.log('DragLeave has been triggered');

})

mycanvas.addEventListener('drop', (e) => {
    console.log('drop has been triggered');

    const make_meme = drop_templates.src;
    console.log(make_meme)

    fabric.Image.fromURL(make_meme, function(myImg) {
        //i create an extra var for to change some image properties

        var img1 = myImg.set({});

        canvas.add(img1);
    });
    canvas.renderAll()
});

const dragit = () => {
    interact('.editing_options')
        .draggable({
            // enable inertial throwing
            inertia: true,
            // keep the element within the area of it's parent
            modifiers: [
                interact.modifiers.restrictRect({
                    // restriction: 'parent',
                    endOnly: true
                })
            ],
            // enable autoScroll
            autoScroll: true,

            listeners: {
                // call this function on every dragmove event
                move: dragMoveListener,

                // call this function on every dragend event

            }
        })

    function dragMoveListener(event) {
        var target = event.target
            // keep the dragged position in the data-x/data-y attributes
        var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
        var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

        // translate the element
        target.style.webkitTransform =
            target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)'

        // update the posiion attributes
        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
    }

    // this function is used later in the resizing and gesture demos
    window.dragMoveListener = dragMoveListener
}




var copybtn = document.getElementById('copy_object');
copybtn.onclick = () => {
    canvas.getActiveObject().clone(function(cloned) {
        _clipboard = cloned;
    });
    _clipboard.clone(function(clonedObj) {
        canvas.discardActiveObject();
        clonedObj.set({
            left: clonedObj.left + 10,
            top: clonedObj.top + 10,
            evented: true,
        });
        if (clonedObj.type === 'activeSelection') {
            // active selection needs a reference to the canvas.
            clonedObj.canvas = canvas;
            clonedObj.forEachObject(function(obj) {
                canvas.add(obj);
            });
            // this should solve the unselectability
            clonedObj.setCoords();
        } else {
            canvas.add(clonedObj);
        }
        _clipboard.top += 10;
        _clipboard.left += 10;
        canvas.setActiveObject(clonedObj);
        canvas.requestRenderAll();
    });
}

var deletebtn = document.getElementById('delete_object');
deletebtn.onclick = () => {
    canvas.fxRemove(canvas.getActiveObject())
}


var clearbtn = document.getElementById('clear_sheet');
clearbtn.onclick = () => {
        canvas.clear();

    }
    //   --------------------sheet settings----------------

var cnvsct = document.querySelector('.canvas-container');


var sheet_st_btn = document.getElementById("sheet_st_btn");
var sheet_settings = document.getElementById('sheet_settings')

sheet_st_btn.onclick = () => {
    knowmode("sheet_st");

}

var oo = document.getElementById('oo');
var sn = document.getElementById('sn');
var ff = document.getElementById('ff');

oo.onclick = () => {
    sheetsize(400, 400)
}

sn.onclick = () => {
    sheetsize(600, 300)
}
ff.onclick = () => {
    sheetsize(400, 300)
}

var custom_h = document.getElementById('custom_height');
var custom_w = document.getElementById('custom_width');

custom_w.oninput = () => {
    sheetsize(custom_h.value, custom_w.value)
}
custom_h.oninput = () => {
    sheetsize(custom_h.value, custom_w.value)
}



const sheetsize = (h, w) => {
    canvas.setHeight(h)
    canvas.setWidth(w)
}

canvas.freeDrawingCursor = 'copy'
    // canvas.svgViewportTransformation = false;
    // canvas.on('selection:updated', (event) => {
    // console.log(canvas.getObjects())
    // canvas.centerObject(canvas.getActiveObject())
    // const mevent = event.e;
    // canvas.clearContext(mevent.movementX);
    // canvas.dispose()
    // canvas.fxCenterObjectH(canvas.getActiveObject())
    // });

var bg_ul = document.getElementById('background_ul')
var color_bg = document.getElementById('color_bg')
var bg_btn = document.getElementById('bg_btn');
bg_btn.onclick = () => {
    if (bg_stmode) {
        knowmode(none)
    } else {
        knowmode('bg_st')
    }
}

color_bg.onchange = () => {
    canvas.setBackgroundColor(color_bg.value, canvas.renderAll.bind(canvas));
}


var add_obj = document.getElementById('add_obj')
var add_obj_ul = document.getElementById('add_obj_ul')
add_obj.onclick = () => {
    if (addobjmode) {
        knowmode(none);

    } else {
        knowmode('addobjmode')
    }

}

const add_objt = () => {

    add_obj_ul.style.display = 'flex';
    addobjmode = true;

}
const add_objf = () => {
    add_obj_ul.style.display = 'none';
    addobjmode = false;

}

canvas.setBackgroundColor(
    'white'
    // source: 'http://fabricjs.com/assets/escheresque_ste.png',
    // repeat: 'repeat',
    // offsetX: 200,
    // offsetY: 100
    , canvas.renderAll.bind(canvas));

// canvas.setOverlayColor('rgba(255, 73, 64, 0.6)', canvas.renderAll.bind(canvas));

// canvas.toCanvasElement(1)
// canvas.easeInBack()
// fabric.util.ease.easeInQuart(canvas.getActiveObject())

// fabric.util.makeElementSelectable(text_ul)

// canvas.clearContext(


// )

// console.log(canvas.width)

// canvas.renderCanvas(ctx,)

// window.onload = (e) => {
//     console.log(window.location)

// }
// -----------------------------------------shapes---------------------------------------

var shapes = document.querySelectorAll('.shapes')
for (var shape of shapes) {
    shape.onclick = (e) => {
        var shape_name = e.target.id
        console.log(shape_name)
        switch (shape_name) {
            case 'rect':
                var rect = new fabric.Rect({
                    top: 100,
                    left: 100,
                    width: 50,
                    height: 50,
                    fill: '#f55',
                    stroke: "#880E4F",
                    strokeWidth: 0.1

                })
                canvas.add(rect);
                break;
            case 'circle':
                var circle1 = new fabric.Circle({ radius: 65, fill: '#039BE5', left: 0, });
                canvas.add(circle1);
                break;
            case 'triangle':
                var triangle = new fabric.Triangle({ top: 100, left: 50, width: 100, height: 100, fill: 'blue' })
                canvas.add(triangle);
                break;
        }

    }
}



// canvas.add(rect)

//     function animate(obj) {
//         obj.rotate(0).animate({ angle: 180 }, {
//             duration: 3000,
//             onComplete: animate(obj),



//         });
//         animate(rect)

//         canvas.renderAll();
//         fabric.util.requestAnimFrame(render)

//     }

// }

// var hoveredColor = document.getElementById('hovered-color');
// var selectedColor = document.getElementById('selected-color');


// function pick(event, destination) {
//     var x = event.layerX;
//     var y = event.layerY;
//     var pixel = ctx.getImageData(x, y, 1, 1);
//     var data = pixel.data;

//     const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
//     destination.style.background = rgba;
//     destination.textContent = rgba;

//     return rgba;
// }

// canvas.on('mouse:move', function(event) {
//     pick(event, hoveredColor);
// });
// canvas.on('mouse:down', function(event) {
//     console.log(pick(event, selectedColor))
// });
// canvas.on('mouse:move', function(e) {
//     var ans = canvas.getSelectionContext(ctx.beginPath(),
//         ctx.moveTo(75, 50),
//         ctx.lineTo(100, 75),
//         ctx.lineTo(100, 25),
//         ctx.fill())
//     console.log(ans)
// console.log(e)
// console.log(canvas.toString())


// canvas.clearContext(ctx.clearRect(45, 45, 60, 60))
// })

canvas.selectionColor = 'rgba(0,255,0,0.3)';
canvas.selectionBorderColor = 'red';
canvas.selectionLineWidth = 5;


var exp = document.getElementById('exp');
exp.onclick = () => {
    //     var Cross = fabric.util.createClass(fabric.Object, {
    //         objectCaching: false,
    //         initialize: function(options) {
    //             this.callSuper('initialize', options);
    //             this.animDirection = 'up';

    //             this.width = 100;
    //             this.height = 100;

    //             this.w1 = this.h2 = 100;
    //             this.h1 = this.w2 = 30;
    //         },

    //         animateWidthHeight: function() {
    //             var interval = 2;

    //             if (this.h2 >= 30 && this.h2 <= 100) {
    //                 var actualInterval = (this.animDirection === 'up' ? interval : -interval);
    //                 this.h2 += actualInterval;
    //                 this.w1 += actualInterval;
    //             }

    //             if (this.h2 >= 100) {
    //                 this.animDirection = 'down';
    //                 this.h2 -= interval;
    //                 this.w1 -= interval;
    //             }
    //             if (this.h2 <= 30) {
    //                 this.animDirection = 'up';
    //                 this.h2 += interval;
    //                 this.w1 += interval;
    //             }
    //         },

    //         _render: function(ctx) {
    //             ctx.fillRect(-this.w1 / 2, -this.h1 / 2, this.w1, this.h1);
    //             ctx.fillRect(-this.w2 / 2, -this.h2 / 2, this.w2, this.h2);
    //         }
    //     });

    //     canvas.add(
    //         new Cross({ top: 100, left: 100 }),
    //         new Cross({ top: 140, left: 230 }),
    //         new Cross({ top: 300, left: 210 }),
    //         new Cross({ top: 40, left: 400 }),
    //         new Cross({ top: 450, left: 400 })
    //     );

    //     setTimeout(function animate() {
    //         canvas.forEachObject(function(obj) { obj.animateWidthHeight();
    //             obj.dirty = true; });
    //         canvas.renderAll();
    //         setTimeout(animate, 10);
    //     }, 10);
    // var body = document.getElementsByTagName('body')
    document.body.style.background = "linear-gradient(to right, #000000, #434343)";

    document.body.style.color = "white"
};




var brng_frwd = document.getElementById('brng_frwd');
var brng_bkwd = document.getElementById('brng_bkwd');
var json;
brng_frwd.onclick = (e) => {
    canvas.bringForward(canvas.getActiveObject(), true)
        // console.log(canvas.toJSON())
        // json = canvas.toJSON()
    var svg = canvas.toSVG();
    // document.body.appendChild(svg)

    // var nel = document.createElement(svg);
    // // nel.innerHTML = svg

    // var nel = document.createElement(CANVAS);
    // var nel = canvas.toCanvasElement();

    // console.log(canvas.toCanvasElement())
    // console.log(canvas.getElement())
    // console.log(canvas.toString())
    // console.log(canvas.calcOffset())
    // console.log(canvas.calcViewportBoundaries(canvas.getActiveObject()))
    // console.log(canvas.toString())
    // canvas.discardActiveObject(canvas)
    // canvas.drawControls(ctx)
    // console.log(canvas.getCenter(canvas.getActiveObject()))
    // console.log(canvas.getContext(50, 70))
    // console.log(canvas.toSVG())
    // console.log(canvas.toObject())
    // setTimeout(() => {
    //     console.log(canvas.getPointer(e.movementX, false))

    // }, 3000);
    canvas.setViewportTransform([skewY(20)])

}

brng_bkwd.onclick = () => {
    canvas.sendBackwards(canvas.getActiveObject(), true);
    // canvas.loadFromJSON(json, canvas.renderAll.bind(canvas));
}




// ------------------------------canvas click-------------------------
canvas.on('mouse:down', () => {
    try {
        var active_object = canvas.getActiveObject().type;
        switch (active_object) {
            case "i-text":
                knowmode('textmode')
                console.log(canvas.getActiveObject())
                text_bg.value = canvas.getActiveObject().textBackgroundColor

                break;
            case 'image':
                var obj = canvas.getActiveObject();
                iblur.value = obj.filters[5]
                break
            case 'rect':
            case 'circle':
            case 'triangle':
                knowmode('shape_mode')
            default:
                console.log(active_object)
                break
        }



    } catch (err) {
        console.log('no active object', active_object)
    }
})