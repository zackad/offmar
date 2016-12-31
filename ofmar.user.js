// ==UserScript==
// @name           Manga Reader Offline
// @namespace      zackad's script
// @author         zackad
// @version        0.5.0
// @description    read manga offline from your folder collection
// @include        file:///*/*
// @exclude        file:///*.png
// @exclude        file:///*.jpg
// @exclude        file:///*.jpeg
// @exclude        file:///*.JPG
// @exclude        file:///*.JPEG
// @exclude        file:///*.PNG
// @exclude        file:///*.gif
// @exclude        file:///*.GIF
// @exclude        file:///*.htm
// @exclude        file:///*.html
// @exclude        file:///*.asp
// @exclude        file:///*.aspx
// @copyright      2015 - 2016 zackad
// ==/UserScript==

var gvar = function(){};
gvar.DEBUG = true;
gvar.style = ''
    +'<style type="text/css">'
    +'@media screen {'
    +'.location-container {background-color:#ddd; padding:5px 10px; font-size:14px; border-radius:10px;}'
    +'.location-container a {color:blue; font-weight:bold; text-decoration:none;}'
    +'.location-container a.current {color:red;}'
    +'img {max-width:95%;}'
    +'img.full {max-width:1000%; max-height:10000%;}'
    +'img.fit-width {max-width:100%; max-height:10000%;}'
    +'img.fit-height {max-height: 100vh!important;}'
    +'body {max-width:100%!important;}'
    +'#container {padding:0px; margin:0px;}'
    +'#list {padding-left:20px;}'
    +'.black {background-color: black;}'
    +'.grey {background-color: grey;}'
    +'.white {background-color: white;}'
    +'}'
    +'</style>'
    ;
gvar.container = ''
    +'<div id="container">'
    +'<center></center>'
    +'</div>'
    ;
gvar.loc_wrp = ''
    +'<div class="location-container">'
    +'</div>'
    ;
gvar.imgLink = ''
    +'a[href$=".jpg"],'
    +'a[href$=".jpeg"],'
    +'a[href$=".png"],'
    +'a[href$=".PNG"],'
    +'a[href$=".JPG"],'
    +'a[href$=".JPEG"],'
    +'a[href$=".gif"]';

if (typeof(localStorage.bg) === 'undefined') {
    localStorage.setItem('bg', 'black');
}

document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("keydown", function(e) {
        keyAction(e);
    }, true);
    init();
    getLoc();
}, true);

// DONE
function back() {
    if (navigator.userAgent.indexOf('Windows') === -1) {
        history.back();
    }
}

// DONE
function changeBackground() {
    var body = selector('body')[0];
    var background = body.className;
    switch (background) {
        case 'black': 
            body.className = 'grey';
            localStorage.setItem('bg', 'grey');
            break;
        case 'grey': 
            body.className = 'white';
            localStorage.setItem('bg', 'white');
            break;
        case 'white': 
            body.className = 'black';
            localStorage.setItem('bg', 'black');
            break;
    }
}

// DONE
function defaultSize() {
    var img = selector('img');
    img.forEach(function(elem, i) {
        elem.className = '';
    });
}

// DONE
function fitWidth() {
    var img = selector('img');
    img.forEach(function(elem, i) {
        elem.className = 'fit-width';
    });
}

// DONE
function fullSize() {
    var img = selector('img');
    img.forEach(function(elem, i) {
        elem.className = 'full';
    });
}

// DONE
function getLoc() {
    var loc = function(){};
    loc.current = decodeURI(window.location.pathname);
    log(loc.current);
    loc.current = loc.current.split('/');
    loc.i = loc.current.length;
    loc.temp = '';
    for (var i=1; i < loc.current.length-1; i++) {
        loc.temp += loc.current[i] + '/';
        log('getLoc : ' + i + loc.temp);
        if (i === loc.i-2) {
            a = htmlToElement('<a href="file:///' + loc.temp + '" class="current">' + unescape(loc.current[i]) +' / </a>');
            log('getLoc : ' + i);
            if (selector('head title').length > 1) {
                selector('head title')[0].innerHTML = unescape(loc.current[i]);
            } else {
                var title = '<title>' + unescape(loc.current[i]) + '</title>';
                selector('head')[0].appendChild(htmlToElement(title));
            }
        } else {
            a = htmlToElement('<a href="file:///' + loc.temp + '">' + unescape(loc.current[i]) +' / </a>');
            log('getLoc : ' + i);
        }
        log('getLoc : ' + i + a);
        selector('.location-container')[0].appendChild(a);
        selector('.location-container')[1].appendChild(a.cloneNode(true));
    }
}

// DONE
function init() {
    var style = htmlToElement(gvar.style);
    var container = htmlToElement(gvar.container);
    var locWrapper = htmlToElement(gvar.loc_wrp);
    var head = selector('head')[0];
    var body = selector('body')[0];
    head.appendChild(style);
    body.insertBefore(container, body.firstChild);
    body.insertBefore(locWrapper, body.firstChild);
    body.appendChild(locWrapper.cloneNode(true));
    removeElement('h1, a.up');
    sort();
}

// DONE
function htmlToElement(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstChild;
}

// DONE
function keyAction(event){
    console.log("do");
    var keyCode = event.keyCode;
    var CSA = [event.ctrlKey, event.shiftKey, event.altKey];
    log(keyCode);
    log(String(CSA) + '; '+keyCode);

    switch (keyCode) {
        case 13: // Enter
            readThis();
            break;
        case 220: // \
            reload();
            break;
        case 221: // ]
            fitWidth();
            break;
        case 219: // [
            fullSize();
            break;
        case 59: // ; firefox
        case 186: // ; chrome
            changeBackground();
            break;
        case 75: window.scrollBy(0,250); break; // k
        case 73: window.scrollBy(0,-250); break;// i
        case 74: window.scrollBy(-100,0); break;// j
        case 76: window.scrollBy(100,0); break; // l
        case 190: // .
            defaultSize();
            break;
        case 8: // backspace
            back();
            break;
    }
}

/*
 * Natural Sort algorithm for Javascript - Version 0.8 - Released under MIT license
 * Author: Jim Palmer (based on chunking idea from Dave Koelle)
 */
function naturalSort (a, b) {
    var re = /(^([+\-]?(?:\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[\da-fA-F]+$|\d+)/g,
        sre = /^\s+|\s+$/g,   // trim pre-post whitespace
        snre = /\s+/g,        // normalize all whitespace to single ' ' character
        dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
        hre = /^0x[0-9a-f]+$/i,
        ore = /^0/,
        i = function(s) {
            return (naturalSort.insensitive && ('' + s).toLowerCase() || '' + s).replace(sre, '');
        },
        // convert all to strings strip whitespace
        x = i(a) || '',
        y = i(b) || '',
        // chunk/tokenize
        xN = x.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
        yN = y.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
        // numeric, hex or date detection
        xD = parseInt(x.match(hre), 16) || (xN.length !== 1 && Date.parse(x)),
        yD = parseInt(y.match(hre), 16) || xD && y.match(dre) && Date.parse(y) || null,
        normChunk = function(s, l) {
            // normalize spaces; find floats not starting with '0', string or 0 if not defined (Clint Priest)
            return (!s.match(ore) || l == 1) && parseFloat(s) || s.replace(snre, ' ').replace(sre, '') || 0;
        },
        oFxNcL, oFyNcL;
    // first try and sort Hex codes or Dates
    if (yD) {
        if ( xD < yD ) { return -1; }
        else if ( xD > yD ) { return 1; }
    }
    // natural sorting through split numeric strings and default strings
    for(var cLoc=0, xNl = xN.length, yNl = yN.length, numS=Math.max(xNl, yNl); cLoc < numS; cLoc++) {
        oFxNcL = normChunk(xN[cLoc], xNl);
        oFyNcL = normChunk(yN[cLoc], yNl);
        // handle numeric vs string comparison - number < string - (Kyle Adams)
        if (isNaN(oFxNcL) !== isNaN(oFyNcL)) { return (isNaN(oFxNcL)) ? 1 : -1; }
        // rely on string comparison if different types - i.e. '02' < 2 != '02' < '2'
        else if (typeof oFxNcL !== typeof oFyNcL) {
            oFxNcL += '';
            oFyNcL += '';
        }
        if (oFxNcL < oFyNcL) { return -1; }
        if (oFxNcL > oFyNcL) { return 1; }
    }
    return 0;
}

// DONE
function log(x) {
    if (gvar.DEBUG) {
        console.log(x);
    }
}

// DONE
function readThis() {
    var img = selector(gvar.imgLink);
    if (img.length === 0) {
        return;
    }
    var body = selector('body')[0];
    if (img.length > 0) {
        removeElement('head > *');
        removeElement('body > *');
        selector('head')[0].appendChild(htmlToElement(gvar.style));
        body.appendChild(htmlToElement(gvar.container));
        body.appendChild(htmlToElement(gvar.loc_wrp));
        body.insertBefore(htmlToElement(gvar.loc_wrp), body.firstChild);
        if (body.classList) {
            body.classList.add(localStorage.bg);
        } else {
            body.className += ' ' + localStorage.bg;
        }
    }
    img.forEach(function(elem, i) {
        var temp = elem.href;
        log('readThis : ' + temp);
        var image = '<div class="img-container"><span>' + i + '</span><img src="' + temp + '" title="Page ' + (i+1) + ' - ' + temp + '"><br></div>';
        log ('readThis : ' + image);
        selector('#container center')[0].appendChild(htmlToElement(image));
    });
    getLoc();
    resize();
}

// DONE
function reload() {
    window.location.reload();
}

// DONE
function removeElement(cssSelector) {
    var elements = selector(cssSelector);
    for (var i = elements.length - 1; i >= 0; i--) {
        elements[i].parentNode.removeChild(elements[i]);
    }
}

// DONE
function resize() {
    var img = selector('img');
    img.forEach(function(elem, i) {
        elem.addEventListener("click", function(event) {
            log(event);
            var size = elem.className;
            log(elem);
            switch (size) {
                case 'fit-width':
                    elem.className = 'full';
                    break;
                case 'full':
                    elem.className = '';
                    break;
                default:
                    elem.className = 'fit-width';
                    break;
            }
        })
    })
    document.addEventListener()
    var background = body.className;
    switch (background) {
        case 'black': 
            body.className = 'grey';
            localStorage.setItem('bg', 'grey');
            break;
        case 'grey': 
            body.className = 'white';
            localStorage.setItem('bg', 'white');
            break;
        case 'white': 
            body.className = 'black';
            localStorage.setItem('bg', 'black');
            break;
    }
}

// DONE
function selector(element) {
    return document.querySelectorAll(element);
}

// DONE
function sort() {
    naturalSort.insensitive = true;
    var container = selector('#container');
    var folder = selector('.dir');
    var file = selector('.file');
    var fileList = new Array();
    var folderList = new Array();
    var i = 0;
    var list = htmlToElement('<div id="list"></div>');
    container[0].insertBefore(list, container.firstChild);

    file.forEach(function(elem, i) {
        fileList[i] = elem.href;
        i++;
    });
    i = 0;
    folder.forEach(function(elem, i) {
        folderList[i] = elem.href;
        i++;
    });
    removeElement('table');

    folderList.sort(naturalSort);
    folderList.forEach(function(entry) {
        entry = decodeURI(entry);
        entry = entry.substr(0, entry.length - 1);
        entry = entry.substr(entry.lastIndexOf('/') + 1,entry.length);
        var insert = htmlToElement('<p><a class="icon dir" href="'
            +entry 
            +'/">'
            +unescape(entry)
            +'</a></p>')
            ;
        selector('#list')[0].appendChild(insert);
    });
    fileList.sort(naturalSort);
    fileList.forEach(function(entry) {
        entry = decodeURI(entry);
        var ext = entry.substr(entry.lastIndexOf('.'),entry.length);
        entry = entry.substr(entry.lastIndexOf('/')+1,entry.length);
        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            var insert = htmlToElement('<p><a class="file icon" href="'
                +entry 
                +'">' 
                +'<img src="moz-icon://'
                +ext
                +'?size=16"'
                +'></img>'
                +unescape(entry)
                +'</a></p>')
                ;
        } else {
            var insert = htmlToElement('<p><a class="file icon" href="'
                +entry 
                +'">' 
                +unescape(entry)
                +'</a></p>')
                ;
        }
        selector('#list')[0].append(insert);
        log(entry);
    });
}