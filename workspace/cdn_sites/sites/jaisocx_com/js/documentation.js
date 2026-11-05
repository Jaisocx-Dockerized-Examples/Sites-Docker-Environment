'use strict';

let highlight = null;
let currentLink = null;
const CODEBLOCKS_LINES = 99;
const CODEBLOCKS_LINES_WIDTH = 24;

function navLinksHighlightInit(){
    /*
    Collecting List of navLink Elements A, signing them in navLinksObject by their prefixes as propertyNames,
    e.g. 'finances' = {link: Atag, offset: 6890px}
    also assigning each content block with same prefix constant offsetTop.
     */
    const SCROLL_MATCH_MARGIN = 120;
    const links = document.querySelectorAll('.tab-content A');
    const navLinksObject = {};
    const onloadScrollTop = window.scrollY;
    for (let link of links) {
        const id = link.id;
        const prefix = id.replaceAll("-nav", "");
        const parentId = prefix.substring(0, prefix.indexOf('-'));
        console.log(parentId);
        const blockId = prefix + '-anchor';
        const offset = document.getElementById(blockId).getBoundingClientRect().top + onloadScrollTop;
        navLinksObject[prefix] = {
            link,
            offset,
            parentElem: link.closest('.tab'),
        };
    }
    /*
    assigning as last content block the bottom of the document with its offsetTop
     */
    navLinksObject['bottom'] = {
        offset: document.body.scrollHeight + window.innerHeight,
    };

    /*
    onScroll event handler
     */
    currentLink = links[0];

    // defined highlight navlink A tag, if scrollTop more than an object (all doc blocks) property offsetTop
    highlight = () => {
        const scrolled = window.scrollY + SCROLL_MATCH_MARGIN;
        let prevPrefix = 'current';
        /*
        looping through all content blocks, till finding first with offsetTop greater than actual scrollTop. then exit loop;
        but since the window is on the previous block, we choose it by prevPrefix const.
         */
        for (let prefix in navLinksObject) {
            if ( scrolled <= navLinksObject[prefix].offset ) {
                currentLink.classList.remove('active');
                currentLink = navLinksObject[prevPrefix].link;
                navLinksObject[prevPrefix].parentElem.querySelector('input[type="radio"]').checked = true;
                currentLink.classList.add('active');
                break;
            }
            prevPrefix = prefix;
        }
    };

    // highlight on scroll
    window.addEventListener('scroll', highlight);

    // highlight on document load
    highlight();
}

function codeBlocksLineNumbers() {
    const codeBlocks = document.querySelectorAll('.code-snippet');
    for (let block of codeBlocks) {
        const height = block.getBoundingClientRect().height - 2 + 'px';
        block.style.maxHeight = height;
        const linesCol = document.createElement('pre');
        linesCol.className = 'line-numbers';
        let linesNumbers = '';
        for (let i = 1; i < CODEBLOCKS_LINES; i++) {
            linesNumbers += i + "\r\n"
        }
        linesCol.innerHTML = linesNumbers;
        block.prepend(linesCol);
    }
}

function burgerKingInit() {
    let menuBtn = document.querySelector('.menu-btn');
    let navBtns = document.querySelectorAll('.nav-btn')
    let aside = document.querySelector('.aside');
    menuBtn.addEventListener('click', function(){
        aside.classList.toggle('aside-active');
        menuBtn.classList.toggle('menu-btn-active');
    })
    for (const navBtn of navBtns) {
        navBtn.addEventListener('click', function(){
            aside.classList.remove('aside-active');
            menuBtn.classList.remove('menu-btn-active');
        });
    }
}

function mobileSwitchCodeblocksHints() {
    const codeBlocks = document.querySelectorAll('.code-snippet');
    let rect = null;
    let codeChildElem = null;
    let codeChildElemWidth = 0;
    let codeChildElemScrollWidth = 0;
    for (let elem of codeBlocks) {
        rect = elem.getBoundingClientRect();
        codeChildElem = elem.querySelector('.code');
        codeChildElemScrollWidth = codeChildElem.scrollWidth;
        codeChildElemWidth = rect.width - CODEBLOCKS_LINES_WIDTH;
        if (codeChildElemScrollWidth > codeChildElemWidth) {
            elem.classList.add('overflown');
        } else {
            elem.classList.remove('overflown');
        }
    }
}

function mobileCodeblocksHintsInit() {
    window.addEventListener("resize", mobileSwitchCodeblocksHints);
}

document.addEventListener('DOMContentLoaded', () => {
    codeBlocksLineNumbers();
    navLinksHighlightInit();
    burgerKingInit();
    mobileSwitchCodeblocksHints();
    mobileCodeblocksHintsInit();
});



function scrollWithoutHighlight(href) {
    window.removeEventListener('scroll', highlight);
    window.location.href = href;
    if (currentLink) {
        currentLink.classList.remove('active');
    }
    currentLink = document.querySelector(href.replaceAll('-anchor', '-nav'));
    currentLink.classList.add('active');
    setTimeout(() => {window.addEventListener('scroll', highlight);}, 2000);
}
