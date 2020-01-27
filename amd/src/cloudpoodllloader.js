define(['jquery', 'core/log',
        'https://cdn.jsdelivr.net/gh/justinhunt/cloudpoodll@latest/amd/build/cloudpoodll.min.js'],
    function ($, log, CloudPoodll) {
        return {
            init: function (recorderclass, thecallback) {
                CloudPoodll.autoCreateRecorders(recorderclass);
                CloudPoodll.theCallback = thecallback;
                CloudPoodll.initEvents();
                $("iframe").on("load", function () {
                    $(".assignsubmission_cloudpoodll_recording_cont").css('background-image', 'none');
                });

                // Load the history template for the history tab; this will call the history mustache template.
                $('.atto_cloudpoodll_form li[data-content="history"]').on("click", function () {
                    Y.namespace('M.atto_cloudpoodll').Button.prototype.loadHistory();
                });
            }
        };
    });