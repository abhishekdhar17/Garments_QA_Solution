
(function () {
    'use strict';

    const devtools = {
        isOpen: false,
        orientation: undefined
    };

    const threshold = 160;

    const emitEvent = (isOpen, orientation) => {
        window.dispatchEvent(new CustomEvent('devtoolschange', {
            detail: {
                isOpen,
                orientation
            }
        }));
    };

    const main = ({ emitEvents = true } = {}) => {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        const orientation = widthThreshold ? 'vertical' : 'horizontal';

        if (
            !(heightThreshold && widthThreshold) &&
            ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)
        ) {
            if ((!devtools.isOpen || devtools.orientation !== orientation) && emitEvents) {
                emitEvent(true, orientation);
            }

            devtools.isOpen = true;
            devtools.orientation = orientation;
        } else {
            if (devtools.isOpen && emitEvents) {
                emitEvent(false, undefined);
            }

            devtools.isOpen = false;
            devtools.orientation = undefined;
        }
    };

    main({ emitEvents: false });
    setInterval(main, 500);

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = devtools;
    } else {
        window.devtools = devtools;
    }
})();



function warning_izitoast_and_reload_page() {
    iziToast.warning({
        timeout: 0,
        close: false,
        overlay: true,
        displayMode: 'once',
        id: 'question',
        zindex: 999,
        title: 'Warning!',
        message: "Please Close Devtools & We Reload This Page.",
        position: 'center',
        buttons: [
            ['<button><b>Ok</b></button>', function (instance, toast) {

                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

            }, true]
        ],
        onClosing: function (instance, toast, closedBy) {

            location.reload();

        }
    });
}

if (window.devtools.isOpen) {
    warning_izitoast_and_reload_page();

}
// Get notified when it's opened/closed or orientation changes
window.addEventListener('devtoolschange', event => {
    if (event.detail.isOpen) {
        warning_izitoast_and_reload_page();

    }
    else {
        warning_izitoast_and_reload_page();


    }
});