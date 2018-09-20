define(['jquery','core/log',
    'https://cdn.jsdelivr.net/gh/justinhunt/cloudpoodll@latest/amd/build/cloudpoodll.min.js'],
    function($,log,CloudPoodll){
    return {
        init: function(recorderclass,thecallback){
            CloudPoodll.autoCreateRecorders(recorderclass);
            CloudPoodll.theCallback = thecallback;
            CloudPoodll.initEvents();
            $( "iframe" ).on("load",function(){
                $(".assignsubmission_cloudpoodll_recording_cont").css('background-image','none');
            });
        }
};
});