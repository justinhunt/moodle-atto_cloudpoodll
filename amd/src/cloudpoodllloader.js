define(['jquery', 'core/log',
        'https://cdn.jsdelivr.net/gh/justinhunt/cloudpoodll@latest/amd/build/cloudpoodll.min.js',
        'core/str'],
    function($, log, CloudPoodll, str) {
        return {
            init: function(recorderclass, thecallback) {
                CloudPoodll.autoCreateRecorders(recorderclass);
                CloudPoodll.theCallback = thecallback;
                CloudPoodll.initEvents();
                $("iframe").on("load", function() {
                    $(".assignsubmission_cloudpoodll_recording_cont").css('background-image', 'none');
                });

                // Load the history template for the history tab; this will call the history mustache template.
                $('.atto_cloudpoodll_form li[data-content="history"]')
                    .on("click", function() {
                        if($(this).attr("data-loaded")=="true"){return;}
                        $(this).attr("data-loaded","true");
                        var loadingStr = str.get_string('loading', 'atto_cloudpoodll');
                        var loadingHtml = "<br /><div class=\"d-flex justify-content-center\">\n" +
                            "  <div class=\"spinner-border\" role=\"status\">\n" +
                            "    <span class=\"sr-only\">" + loadingStr + "</span>\n" +
                            "  </div>\n" +
                            "</div><br />";

                        $('div[data-field="history"]').html(loadingHtml);

                        Y.namespace('M.atto_cloudpoodll').Button.prototype.loadHistory();
                    });
            },
            fetch_guessed_extension(mediatype){
                if(mediatype==='screen'){mediatype='video';}
                var mimetype = CloudPoodll.guess_mimetype(mediatype,0,false);
                if(mimetype){
                    var bits = mimetype.split('/');
                    if(bits.length===2){return bits[1];}
                }
                return false;
            }
        };
    });