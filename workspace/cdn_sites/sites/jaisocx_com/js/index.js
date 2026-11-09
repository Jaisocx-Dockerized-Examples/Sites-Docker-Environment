const JAISOCX_DOWNLOAD_URL = '/download-current';
const URLS = {
    'get-own-jaisocx': '/get-own-jaisocx?ver3.0.4',
    'get-own-jaisocx-with-sql': '/get-own-jaisocx-with-sql?ver3.0.03',
};

function contactFormSend() {

    const formElementsIds = {
        'email': '',
        'name': '',
        'company': '',
        'message': '',
    };
    for (let formElementId in formElementsIds) {
        formElementsIds[formElementId] = document.getElementById(formElementId).value;
    }

    console.log(formElementsIds);

    fetch('/dc_php/send-form.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset="utf-8"',
        },
        body: JSON.stringify(formElementsIds)
    }).then(resp => {
        return resp.text();
        //show success popup
    }).then(text => {
        console.log(text);
        popupMessageSentOpen();
        setTimeout(() => {
            popupMessageSentClose();
        }, 3000);
    });
}

function popupOpen(selector) {
    const mainContainer = document.querySelector('.main_popup_container');
    const popup = document.querySelector(selector);
    mainContainer.classList.remove('popup_container-disable');
    popup.classList.remove('popup-disable');
    document.body.style.overflowY = 'hidden';
}
function popupClose(selector) {
    const mainContainer = document.querySelector('.main_popup_container');
    const popup = document.querySelector(selector);
    mainContainer.classList.add('popup_container-disable');
    popup.classList.add('popup-disable');
    document.body.style.overflowY = 'auto';
}
function popupMessageSentOpen() {
    popupOpen('.popup-message-sent');
}
function popupMessageSentClose() {
    popupClose('.popup-message-sent');
}
function popupDownloadOpen() {
    popupOpen('.popup-terms');
}
function popupDownloadClose() {
    popupClose('.popup-terms');
}

function tooltipGetOwnJaisocxInit() {
    const popupOpenButton = document.getElementById('download-button');
    popupOpenButton.addEventListener('click', () => {
        popupDownloadOpen();
    });

    const btnClose = document.querySelector('.popup-terms .btn-popup-close');
    btnClose.addEventListener('click', () => {
        popupDownloadClose();
    });

    const checkboxes = document.querySelectorAll('.popup-terms input[type="checkbox"]');
    for (let checkbox of checkboxes) {
        checkbox.addEventListener('change', () => {
            allowDownload(checkboxes);
        });
    }
}

function allowDownload(checkboxes) {
    let allow = true;
    for (let checkbox of checkboxes) {
        if (!checkbox.checked) {
            allow = false;
            break;
        }
    }
    const downloadBtns = document.querySelectorAll('.popup-terms .btn-popup-download');
    for (let button of downloadBtns) {
        if (allow) {
            button.classList.remove('disabled');
            button.classList.add('active');
            button.addEventListener('click', registerDownloadAction);
            button.href = URLS[button.id];
            //button.target = '_blank';
        } else {
            button.classList.remove('active');
            button.classList.add('disabled');
            button.href = 'javascript: void(0);';
            button.removeEventListener('click', registerDownloadAction);
            button.target = '_self';
        }
    }
}

function burgerKingInit() {
    let menuBtn = document.querySelector('.menu-btn');
    let navBtns = document.querySelectorAll('.nav-btn')
    let menu = document.querySelector('.menu');
    menuBtn.addEventListener('click', function(){
        menu.classList.toggle('menu-active');
        menuBtn.classList.toggle('menu-btn-active')
    });

    for (const navBtn of navBtns) {
        navBtn.addEventListener('click', function(){
            menu.classList.remove('menu-active');
            menuBtn.classList.remove('menu-btn-active')
        });
    }
}

function historyToggleIconInit() {
    const historyPaddingRight = 30;
    const historyToggleIcon = document.querySelector('#icon-news-history-toggle');
    const historyElement = document.querySelector('#history');
    const scrollbarWidth = getScrollbarWidth();
    
    historyToggleIcon.addEventListener('click', () => {
        const toggleClassName = 'expanded';
        historyElement.classList.toggle(toggleClassName);
        historyElement.scrollTop = 0;
        if (historyElement.classList.contains(toggleClassName)) {
            historyElement.style.paddingRight = (historyPaddingRight - +scrollbarWidth) + 'px';
        } else {
            historyElement.style.paddingRight = historyPaddingRight + 'px';
        }
    });

    document.addEventListener('click', (evt) => {
        const toggleClassName = 'expanded';
        if (evt.target.closest('#history') === null) {
            historyElement.classList.remove(toggleClassName);
            historyElement.style.paddingRight = historyPaddingRight + 'px';
            historyElement.scrollTop = 0;
        }
    });
}

function sendUserStatistics(type) {
    fetch('/dc_php/save-user-statistics.php/?type=' + type)
        .then(resp => {
            console.log(resp);
        });
}

function registerDownloadAction() {
    sendUserStatistics(4);
}

function getScrollbarWidth() {
    // Create a div with scrollbar
    var scrollDiv = document.createElement("div");
    scrollDiv.style.width = "100px";
    scrollDiv.style.height = "100px";
    scrollDiv.style.overflow = "scroll";
    scrollDiv.style.position = "absolute";
    scrollDiv.style.top = "-9999px";
    document.body.appendChild(scrollDiv);
    
    // Calculate scrollbar width
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

    // Remove the div
    document.body.removeChild(scrollDiv);

    return scrollbarWidth;
}

document.addEventListener('DOMContentLoaded', () => {
    sendUserStatistics(1);
    try {
        tooltipGetOwnJaisocxInit();
    } catch (e) {}
    try {
        historyToggleIconInit();
    } catch (e) {}

    //popupDownloadOpen();
});
