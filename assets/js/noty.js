const showNoty = function(notyText) {
    new Noty({
        theme: 'relax',
        layout: 'topRight',
        text: notyText,
        type: 'success ',
        timeout: 1500
    }).show();
}