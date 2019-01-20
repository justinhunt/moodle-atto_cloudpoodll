// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/*
 * @package    atto_cloudpoodll
 * @copyright  2018 Justin Hunt <justin@poodll.com,>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module moodle-atto_align-button
 */

/**
 * Atto text editor cloudpoodll plugin.
 *
 * @namespace M.atto_cloudpoodll
 * @class button
 * @extends M.editor_atto.EditorPlugin
 */
var COMPONENTNAME = 'atto_cloudpoodll';
var RECORDERS = {VIDEO: 'video', AUDIO: 'audio'};
var INSERTMETHOD = {LINK: 'link', TAGS: 'tags'};
var LANGUAGE = {ENUS: 'en-US',ENUK: 'en-UK',ENAU: 'en-AU',FRCA: 'fr-CA', ESUS: 'es-US'};
var CLOUDPOODLL = {};
var SKIN = {PLAIN: 'standard',
            BMR: 'bmr',
            ONETWOTHREE: 'onetwothree',
            FRESH: 'fresh',
            ONCE: 'once'};
var CSS = {
        VIDEO: 'atto_cloudpoodll_video',
        AUDIO: 'atto_cloudpoodll_audio',
        UPLOAD: 'atto_cloudpoodll_upload',
        SUBTITLE: 'atto_cloudpoodll_subtitle',
        OPTIONS: 'atto_cloudpoodll_options',
        LANG_SELECT: 'atto_cloudpoodll_languageselect',
        SUBTITLE_CHECKBOX: 'atto_cloudpoodll_subtitle_checkbox',
        MEDIAINSERT_CHECKBOX: 'atto_cloudpoodll_mediainsert_checkbox',
        ATTO_CLOUDPOODLL_FORM: 'atto_cloudpoodll_form',
        CP_VIDEO: 'atto_cloudpoodll_video_cont',
        CP_AUDIO: 'atto_cloudpoodll_audio_cont',
        CP_UPLOAD: 'atto_cloudpoodll_upload_cont',
        CP_SWAP: 'atto_cloudpoodll_swapmeout'

};
var STATE ={
    subtitling: false,
    started: false,
    currentrecorder: false,
    insertmethod: false,
    subitleaudiobydefault: 0,
    subitlevideobydefault: 0,
    elementid: false,
    subtitlecheckbox: false,
}

var TEMPLATES = {
        ROOT: '' +
            '<form class="mform atto_form atto_cloudpoodll_form" id="{{elementid}}_atto_cloudpoodll_form">' +
                '<ul class="root nav nav-tabs" role="tablist">' +
                    "{{#if isvideo}}" +
                    '<li data-medium-type="{{CSS.VIDEO}}" class="nav-item">' +
                        '<a class="nav-link active" href="#{{elementid}}_{{CSS.VIDEO}}" role="tab" data-toggle="tab">' +
                            '{{get_string "video" component}}' +
                        '</a>' +
                    '</li>' +
                     "{{else}}" +
                    '<li data-medium-type="{{CSS.AUDIO}}" class="nav-item">' +
                        '<a class="nav-link active" href="#{{elementid}}_{{CSS.AUDIO}}" role="tab" data-toggle="tab">' +
                            '{{get_string "audio" component}}' +
                        '</a>' +
                    '</li>' +
                     "{{/if}}" +
                    '<li data-medium-type="{{CSS.UPLOAD}}" class="nav-item">' +
                        '<a class="nav-link" href="#{{elementid}}_{{CSS.UPLOAD}}" role="tab" data-toggle="tab">' +
                            '{{get_string "upload" component}}' +
                        '</a>' +
                    '</li>' +
                    '<li data-medium-type="{{CSS.OPTIONS}}" class="nav-item">' +
                        '<a class="nav-link" href="#{{elementid}}_{{CSS.OPTIONS}}" role="tab" data-toggle="tab">' +
                            '{{get_string "options" component}}' +
                        '</a>' +
                    '</li>' +
                '</ul>' +
                '<div class="root tab-content">' +
                    "{{#if isvideo}}" +
                    '<div data-medium-type="{{CSS.VIDEO}}" class="tab-pane active" id="{{elementid}}_{{CSS.VIDEO}}">' +
                        '' +
        '<div id="{{elementid}}_{{CSS.CP_VIDEO}}" class="{{CSS.CP_SWAP}}" data-id="{{elementid}}_{{CSS.CP_VIDEO}}" data-parent="{{CP.parent}}"' +
    ' data-appid="{{CP.appid}}" data-media="video" data-type="{{CP.videoskin}}" data-localloader="/lib/editor/atto/plugins/cloudpoodll/poodllloader.html"' +
        ' data-localloading="auto" data-width="{{CP.sizes.videowidth}}" data-height="{{CP.sizes.videoheight}}"' +
    ' data-transcode="{{CP.transcode}}" data-transcribe="{{subtitlevideobydefault}}" data-language="{{CP.language}}"' +
    ' data-expiredays="{{CP.expiredays}}" data-region="{{CP.region}}" data-token="{{CP.token}}" data-fallback="{{CP.fallback}}"></div>' +
                    '</div>' +
                     "{{else}}" +
                    '<div data-medium-type="{{CSS.AUDIO}}" class="tab-pane active" id="{{elementid}}_{{CSS.AUDIO}}">' +
        '<div id="{{elementid}}_{{CSS.CP_AUDIO}}" class="{{CSS.CP_SWAP}}" data-id="{{elementid}}_{{CSS.CP_AUDIO}}" data-parent="{{CP.parent}}"' +
        ' data-appid="{{CP.appid}}" data-media="audio" data-type="{{CP.audioskin}}" data-localloader="/lib/editor/atto/plugins/cloudpoodll/poodllloader.html"' +
        ' data-localloading="auto" data-width="{{CP.sizes.audiowidth}}" data-height="{{CP.sizes.audioheight}}"' +
        ' data-transcode="{{CP.transcode}}" data-transcribe="{{subtitleaudiobydefault}}" data-language="{{CP.language}}"' +
        ' data-expiredays="{{CP.expiredays}}" data-region="{{CP.region}}" data-token="{{CP.token}}" data-fallback="{{CP.fallback}}"></div>' +
                    '</div>' +
                    "{{/if}}" +
                    '<div data-medium-type="{{CSS.UPLOAD}}" class="tab-pane" id="{{elementid}}_{{CSS.UPLOAD}}">' +
        '<br>{{get_string "uploadinstructions" component}}' +
        '<div id="{{elementid}}_{{CSS.CP_UPLOAD}}" class="{{CSS.CP_SWAP}}" data-id="{{elementid}}_{{CSS.CP_UPLOAD}}" data-parent="{{CP.parent}}"' +
        ' data-appid="{{CP.appid}}" data-media="{{recorder}}" data-type="upload" data-width="450" data-height="350"' +
        ' data-transcode="{{CP.transcode}}" ' +
        "{{#if isvideo}}" +
          'data-transcribe="{{subtitlevideobydefault}}" ' +
        "{{else}}" +
          'data-transcribe="{{subtitleaudiobydefault}}" ' +
        "{{/if}}" +
        'data-language="{{CP.language}}"' +
        'data-expiredays="{{CP.expiredays}}" data-region="{{CP.region}}" data-token="{{CP.token}}"></div>' +
                    '</div>' +
                    '<div data-medium-type="{{CSS.OPTIONS}}" class="tab-pane" id="{{elementid}}_{{CSS.OPTIONS}}">' +
                        '<br><label>' +
                        '<input type="checkbox" id="{{elementid}}_{{CSS.MEDIAINSERT_CHECKBOX}}" class="{{CSS.MEDIAINSERT_CHECKBOX}}"' +
                        "{{#if mediataginsert}}" +
                        ' checked="true" ' +
                        "{{/if}}" +
                        '/>&nbsp;{{get_string "mediainsertcheckbox" component}}' +
                    '</label>' +
                    "{{#if cansubtitle}}" +
                    '<br><label>' +
                    '<input type="checkbox" id="{{elementid}}_{{CSS.SUBTITLE_CHECKBOX}}" class="{{CSS.SUBTITLE_CHECKBOX}}"' +
                    "{{#if isvideo}}" +
                        "{{#if letssubtitlevideo}}" +
                        ' checked="true" ' +
                        "{{/if}}" +
                    "{{else}}" +
                        "{{#if letssubtitleaudio}}" +
                        ' checked="true" ' +
                        "{{/if}}" +
                    "{{/if}}" +
                    '/>' +
                    '&nbsp;{{get_string "subtitlecheckbox" component}}' +
                    '</label>' +
                    '<br><label>{{get_string "speakerlanguage" component}}&nbsp;' +
                    '<select id="{{elementid}}_{{CSS.LANG_SELECT}}" class="{{CSS.LANG_SELECT}}">' +
                        '<option value="{{LANG.ENUS}}" {{#if useENUS}}selected="selected"{{/if}}>{{get_string "en-us" component}}</option>' +
                        '<option value="{{LANG.ENUK}}" {{#if useENUK}}selected="selected"{{/if}}>{{get_string "en-uk" component}}</option>' +
                        '<option value="{{LANG.ENAU}}" {{#if useENAU}}selected="selected"{{/if}}>{{get_string "en-au" component}}</option>' +
                        '<option value="{{LANG.FRCA}}" {{#if useFRCA}}selected="selected"{{/if}}>{{get_string "fr-ca" component}}</option>' +
                        '<option value="{{LANG.ESUS}}" {{#if useESUS}}selected="selected"{{/if}}>{{get_string "es-us" component}}</option>' +
                    '</select>' +
                    '</label>' +
                    '<br>{{get_string "subtitleinstructions" component}}' +
                    "{{/if}}" +
                    '</div>' +
                '</div>' +
            '</form>',
        HTML_MEDIA: {
            VIDEO: '' +
                '&nbsp;<video ' +
            'controls="true" crossorigin="anonymous"' +
            '>' +
            '<source src="{{url}}">' +
            "{{#if issubtitling}}" +
            '<track src="{{subtitleurl}}" kind="captions" srclang="{{CP.language}}" label="{{CP.language}}" default="true">' +
            "{{/if}}" +
                '</video>&nbsp;',
            AUDIO: '' +
                '&nbsp;<audio ' +
                    'controls="true" crossorigin="anonymous"' +
                '>' +
                    '<source src="{{url}}">' +
            "{{#if issubtitling}}" +
            '<track src="{{subtitleurl}}" kind="captions" srclang="{{CP.language}}" label="{{CP.language}}" default="true">' +
            "{{/if}}" +
                '</audio>&nbsp;',
            LINK: '' +
            "{{#if issubtitling}}" +
            '&nbsp;<a href="{{url}}?data-subtitles={{subtitleurl}}&data-language={{CP.language}}"' +
            "{{else}}" +
            '&nbsp;<a href="{{url}}"' +
            "{{/if}}" +
                '>{{name}}</a>&nbsp;'
         }
};



Y.namespace('M.atto_cloudpoodll').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {
    initializer: function(config) {

        var recorders = new Array('audio','video');
        for (var therecorder = 0; therecorder < recorders.length; therecorder++) {
            // Add the poodll button first (if we are supposed to)
            if(config.hasOwnProperty(recorders[therecorder])){
                this.addButton({
                    icon: recorders[therecorder],
                    iconComponent: 'atto_cloudpoodll',
                    title: recorders[therecorder] + '_desc',
                    buttonName: recorders[therecorder],
                    callback: this._displayDialogue,
                    callbackArgs: recorders[therecorder]
                });
            }
        }

        //insert method
        STATE.insertmethod = config.insertmethod;

        //subtitle by default
        STATE.subtitleaudiobydefault = config.subtitleaudiobydefault;
        STATE.subtitlevideobydefault = config.subtitlevideobydefault;

        //set up the cloudpoodll div
        CLOUDPOODLL.parent = M.cfg.wwwroot;
        CLOUDPOODLL.appid = 'atto_cloudpoodll';
        CLOUDPOODLL.token = config.cp_token;
        CLOUDPOODLL.region = config.cp_region;
        CLOUDPOODLL.expiredays = config.cp_expiredays;
        CLOUDPOODLL.cansubtitle = config.cp_cansubtitle;
        CLOUDPOODLL.language = config.cp_language;
        CLOUDPOODLL.transcode = config.cp_transcode;
        CLOUDPOODLL.audioskin = config.cp_audioskin;
        CLOUDPOODLL.videoskin = config.cp_videoskin;
        CLOUDPOODLL.fallback = config.fallback;
        CLOUDPOODLL.sizes = this._fetchRecorderDimensions();
    },

    /**
     * Gets the root context for all templates, with extra supplied context.
     *
     * @method _getContext
     * @param  {Object} extra The extra context to add
     * @return {Object}
     * @private
     */
    _getContext:
        function(extra) {
        return Y.merge({
            elementid: this.get('host').get('elementid'),
            component: COMPONENTNAME,
            helpStrings: this.get('help'),
            isvideo: STATE.currentrecorder == RECORDERS.VIDEO,
            cansubtitle: CLOUDPOODLL.cansubtitle,
            recorder: STATE.currentrecorder,
            mediataginsert: STATE.insertmethod == INSERTMETHOD.TAGS,
            subtitleaudiobydefault: STATE.subtitleaudiobydefault,
            subtitlevideobydefault: STATE.subtitlevideobydefault,
            letssubtitleaudio: STATE.subtitleaudiobydefault ==1,
            letssubtitlevideo: STATE.subtitlevideobydefault ==1,
            useENUS: CLOUDPOODLL.language == LANGUAGE.ENUS,
            useENUK: CLOUDPOODLL.language == LANGUAGE.ENUK,
            useENAU: CLOUDPOODLL.language == LANGUAGE.ENAU,
            useFRCA: CLOUDPOODLL.language == LANGUAGE.FRCA,
            useESUS: CLOUDPOODLL.language == LANGUAGE.ESUS,
            CSS: CSS,
            CP: CLOUDPOODLL,
            LANG: LANGUAGE
        }, extra);
    },

    _fetchRecorderDimensions: function() {
        // Get return object
        var sizes = {};

        //get video sizes]
        switch (CLOUDPOODLL.videoskin) {
            case SKIN.ONETWOTHREE:
                sizes.videowidth = 441; //(because the @media CSS is for <=440)
                sizes.videoheight = 540;
                break;
            case SKIN.BMR:
                sizes.videowidth = 441; //(because the @media CSS is for <=440)
                sizes.videoheight = 500;
                break;
            default:
                sizes.videowidth = 441;
                sizes.videoheight = 450;

        }
        switch (CLOUDPOODLL.audioskin) {
            default:
                sizes.audiowidth = 450;
                sizes.audioheight = 350;
                break;
        }
        return sizes;
    },



    /**
     * Display the media editing tool.
     *
     * @method _displayDialogue
     * @private
     */
    _displayDialogue: function(e,recorder) {

        //whats this?
        if (this.get('host').getSelection() === false) {
            return;
        }else{
            this._currentSelection = this.get('host').getSelection();
        }
        STATE.currentrecorder = recorder;

        //get title and sizes
        switch(recorder){
            case RECORDERS.VIDEO:
                var title = M.util.get_string('createvideo', COMPONENTNAME);
                switch(CLOUDPOODLL.videoskin){
                    case SKIN.ONETWOTHREE:
                        var width = '500';
                        var height = "660";
                        break;
                    case SKIN.PLAIN:
                        var width = '500';
                        var height = "580";
                        break;
                    case SKIN.BMR:
                        var width = '500';
                        var height = "620";
                        break;
                    default:
                        var width = '500';
                        var height = false;

                }
                break;
            case RECORDERS.AUDIO:
            default:
                var title = M.util.get_string('createaudio', COMPONENTNAME);
                var width = '501';
                var height = false;
                break;
        }

        var d_conf = {};
        d_conf.center =true;
        d_conf.headerContent =title;
        d_conf.focusAfterHide = recorder;
        d_conf.width = width + 'px';
        if(height) {
            d_conf.height = height + 'px';
        }

        var dialogue = this.getDialogue(d_conf);

        //if this dialog had a different size and title (it was popped up before as diff media recorder type)
        if(dialogue.get('width') != width + 'px'){
            dialogue.set('headerContent',title);
            //sadly the width and height won't change .. whatever
            dialogue.set('width',width + 'px');
            dialogue.set('height',height + 'px');
        }


        // Set the dialogue content, and then show the dialogue.
        dialogue.set('bodyContent', this._getDialogueContent()).show();


        //store some common elements we will refer to later
        STATE.elementid = this.get('host').get('elementid');
        STATE.subtitlecheckbox = Y.one('#' + STATE.elementid + '_' + CSS.SUBTITLE_CHECKBOX);
        STATE.mediainsertcheckbox = Y.one('#' + STATE.elementid + '_' + CSS.MEDIAINSERT_CHECKBOX);
        STATE.languageselect = Y.one('#' + STATE.elementid + '_' + CSS.LANG_SELECT);
        var topnode = Y.one('#' + STATE.elementid + '_' + CSS.ATTO_CLOUDPOODLL_FORM);
        var that=this;

        //subtitle checkbox click event.. reload recorders
        if(STATE.subtitlecheckbox != null) {
            STATE.subtitlecheckbox.on('click', function (e) {
                var element = e.currentTarget;
                //update recorder subtitle setting
                if (element.get('checked')) {
                    topnode.all('.' + CSS.CP_SWAP).setAttribute('data-transcribe', '1');
                    topnode.all('.' + CSS.CP_SWAP).setAttribute('data-subtitle', '1');
                    topnode.all('.' + CSS.CP_SWAP).setAttribute('data-alreadyparsed', 'false');
                    STATE.subtitling = true;
                } else {
                    topnode.all('.' + CSS.CP_SWAP).setAttribute('data-transcribe', '0');
                    topnode.all('.' + CSS.CP_SWAP).setAttribute('data-subtitle', '0');
                    topnode.all('.' + CSS.CP_SWAP).setAttribute('data-alreadyparsed', 'false');
                    STATE.subtitling = false;
                }
                //reload the recorders
                topnode.all('.' + CSS.CP_SWAP).empty();
                that._loadRecorders();
            });
        }

        //insert method checkbox;
        if(STATE.mediainsertcheckbox != null) {
            STATE.mediainsertcheckbox.on('click', function (e) {
                var element = e.currentTarget;
                //update recorder subtitle setting
                if (element.get('checked')) {
                    STATE.insertmethod = INSERTMETHOD.TAGS;
                } else {
                    STATE.insertmethod = INSERTMETHOD.LINK;
                }
            });
        }

        //language selectopr
        if(STATE.languageselect != null) {
            STATE.languageselect.on('change', function (e) {
                var element = e.currentTarget;
                if(element) {
                    CLOUDPOODLL.language = element.selectedOptionValue();
                    topnode.all('.' + CSS.CP_SWAP).setAttribute('data-language', CLOUDPOODLL.language);
                    topnode.all('.' + CSS.CP_SWAP).setAttribute('data-alreadyparsed', 'false');
                    //reload the recorders
                    topnode.all('.' + CSS.CP_SWAP).empty();
                    that._loadRecorders();
                }
            });
        }

        //so finally load those recorders
        this._loadRecorders();
    },

    /**
     * Loads or reloads the recorders
     *
     * @method _loadRecorders
     * @private
     */
    _loadRecorders: function(){
        var that = this;
        that.uploaded=false;
        require(['atto_cloudpoodll/cloudpoodllloader'], function(loader) {
            var recorder_callback = function(evt){
                switch(evt.type){
                    case 'recording':
                        if(evt.action==='started'){
                            //if user toggled subtitle checkbox any time from now, the recording would be lost
                            if(STATE.subtitlecheckbox != null) {
                                STATE.subtitlecheckbox.set('disabled', true);
                            }

                        }
                        break;
                    case 'awaitingprocessing':
                        if(!that.uploaded) {
                            that._doInsert(evt.mediaurl, evt.mediafilename);
                            that.uploaded = true;
                        }
                        break;
                    case 'error':
                        alert('PROBLEM:' + evt.message);
                        break;
                }
            };
            loader.init(CSS.CP_SWAP,recorder_callback);
        });
    },

    /**
     * Returns the dialogue content for the tool.
     *
     * @method _getDialogueContent
     * @param  {WrappedRange[]} selection Current editor selection
     * @return {Y.Node}
     * @private
     */
    _getDialogueContent: function(selection) {
        var content = Y.Node.create(
            Y.Handlebars.compile(TEMPLATES.ROOT)(this._getContext())
        );
        return content;
    },


    /**
     * Inserts the link or media element onto the page
     * @method _doInsert
     * @private
     */
    _doInsert : function(mediaurl, mediafilename){
        this.getDialogue({
            focusAfterHide: null
        }).hide();

        //default context values(link) for template
        var context = {};
        context.url = mediaurl;
        context.name = mediafilename;
        context.issubtitling = STATE.subtitling;
        context.CP = CLOUDPOODLL;
        context.subtitleurl = mediaurl + '.vtt';
        var template = TEMPLATES.HTML_MEDIA.LINK;

        switch(STATE.insertmethod){

            case INSERTMETHOD.TAGS:
                if(STATE.currentrecorder == RECORDERS.VIDEO){
                    context.width = false;
                    context.height = false;
                    context.poster = false;
                    template = TEMPLATES.HTML_MEDIA.VIDEO;
                }else {
                    context.width = false;
                    context.height = false;
                    context.poster = false;
                    template = TEMPLATES.HTML_MEDIA.AUDIO;
                }
                break;

            case INSERTMETHOD.LINK:
            default:
                //do nothing special actually.
        }

        var content =
            Y.Handlebars.compile(template)(context);
        var host =this.get('host');
        host.focus();
        host.setSelection(this._currentSelection);
        host.insertContentAtFocusPoint(content);
        this.markUpdated();

    }
}, { ATTRS: {
    disabled: {
        value: false
    }
}
});