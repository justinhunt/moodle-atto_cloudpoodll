YUI.add('moodle-atto_cloudpoodll-button', function (Y, NAME) {

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
var CLOUDPOODLL = {};
var CSS = {
        VIDEO: 'atto_cloudpoodll_video',
        AUDIO: 'atto_cloudpoodll_audio',
        UPLOAD: 'atto_cloudpoodll_upload',
        SUBTITLE: 'atto_cloudpoodll_subtitle',
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
    elementid: false,
    subtitlecheckbox: false,
}

var TEMPLATES = {
        ROOT: '' +
            '<form class="mform atto_form atto_media atto_cloudpoodll_form" id="{{elementid}}_atto_cloudpoodll_form">' +
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
                    "{{#if cansubtitle}}" +
                    '<li data-medium-type="{{CSS.SUBTITLE}}" class="nav-item">' +
                        '<a class="nav-link" href="#{{elementid}}_{{CSS.SUBTITLE}}" role="tab" data-toggle="tab">' +
                            '{{get_string "subtitle" component}}' +
                        '</a>' +
                    '</li>' +
                    "{{/if}}" +
                '</ul>' +
                '<div class="root tab-content">' +
                    "{{#if isvideo}}" +
                    '<div data-medium-type="{{CSS.VIDEO}}" class="tab-pane active" id="{{elementid}}_{{CSS.VIDEO}}">' +
                        'some video content' +
        '<div id="{{elementid}}_{{CSS.CP_VIDEO}}" class="{{CSS.CP_SWAP}}" data-id="{{elementid}}_{{CSS.CP_VIDEO}}" data-parent="{{CP.parent}}"' +
    'data-media="video" data-type="{{CP.videoskin}}" data-width="450" data-height="600"' +
    'data-transcode="{{CP.transcode}}" data-transcribe="0" data-transcribelanguage="{{CP.language}}"' +
    'data-expiredays="{{CP.expiredays}}" data-region="{{CP.region}}" data-token="{{CP.token}}" data-fallback="{{CP.fallback}}"></div>' +
                    '</div>' +
                     "{{else}}" +
                    '<div data-medium-type="{{CSS.AUDIO}}" class="tab-pane active" id="{{elementid}}_{{CSS.AUDIO}}">' +
        '<div id="{{elementid}}_{{CSS.CP_AUDIO}}" class="{{CSS.CP_SWAP}}" data-id="{{elementid}}_{{CSS.CP_AUDIO}}" data-parent="{{CP.parent}}"' +
        'data-media="audio" data-type="{{CP.audioskin}}" data-width="450" data-height="350"' +
        'data-transcode="{{CP.transcode}}" data-transcribe="0" data-transcribelanguage="{{CP.language}}"' +
        'data-expiredays="{{CP.expiredays}}" data-region="{{CP.region}}" data-token="{{CP.token}}" data-fallback="{{CP.fallback}}"></div>' +
                    '</div>' +
                    "{{/if}}" +
                    '<div data-medium-type="{{CSS.UPLOAD}}" class="tab-pane" id="{{elementid}}_{{CSS.UPLOAD}}">' +
        '<div id="{{elementid}}_{{CSS.CP_UPLOAD}}" class="{{CSS.CP_SWAP}}" data-id="{{elementid}}_{{CSS.CP_UPLOAD}}" data-parent="{{CP.parent}}"' +
        'data-media="{{recorder}}" data-type="upload" data-width="450" data-height="350"' +
        'data-transcode="{{CP.transcode}}" data-transcribe="0" data-transcribelanguage="{{CP.language}}"' +
        'data-expiredays="{{CP.expiredays}}" data-region="{{CP.region}}" data-token="{{CP.token}}"></div>' +
                    '</div>' +
                    "{{#if cansubtitle}}" +
                    '<div data-medium-type="{{CSS.SUBTITLE}}" class="tab-pane" id="{{elementid}}_{{CSS.SUBTITLE}}">' +
                    '{{get_string "subtitleinstructions" component}}' +
                         '<br><br><label>' +
                        '<input type="checkbox" id="{{elementid}}_{{CSS.SUBTITLE_CHECKBOX}}" class="{{CSS.SUBTITLE_CHECKBOX}}"/>' +
                        '&nbsp;{{get_string "subtitlecheckbox" component}}' +
                        '<br><label>' +
                        '<input type="checkbox" id="{{elementid}}_{{CSS.MEDIAINSERT_CHECKBOX}}" class="{{CSS.MEDIAINSERT_CHECKBOX}}"' +
                        "{{#if mediataginsert}}" +
                        ' checked="true" ' +
                        "{{/if}}" +
                        '/>&nbsp;{{get_string "mediainsertcheckbox" component}}' +
                    '</label>' +
                    '</div>' +
                     "{{/if}}" +
                '</div>' +
            '</form>',
        HTML_MEDIA: {
            VIDEO: '' +
                '&nbsp;<video ' +
            '&nbsp;<audio ' +
            'controls="true" ' +
            '>' +
            '<source src="{{url}}">' +
            "{{#if issubtitling}}" +
            '<track src="{{subtitleurl}}" kind="caption" srclang="{{language}}" label="{{language}}" default="true">' +
            "{{/if}}" +
                '</video>&nbsp;',
            AUDIO: '' +
                '&nbsp;<audio ' +
                    'controls="true" ' +
                '>' +
                    '<source src="{{url}}">' +
            "{{#if issubtitling}}" +
            '<track src="{{subtitleurl}}" kind="caption" srclang="{{language}}" label="{{language}}" default="true">' +
            "{{/if}}" +
                '</audio>&nbsp;',
            LINK: '' +
                '&nbsp;<a href="{{url}}" ' +
            "{{#if issubtitling}}" +
            ' data-subtitles="{{subtitleurl}}" data-language="{{language}}" ' +
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

        //set up the cloudpoodll div
        CLOUDPOODLL.parent = M.cfg.wwwroot;
        CLOUDPOODLL.token = config.cp_token;
        CLOUDPOODLL.region = config.cp_region;
        CLOUDPOODLL.expiredays = config.cp_expiredays;
        CLOUDPOODLL.cansubtitle = config.cp_cansubtitle;
        CLOUDPOODLL.language = config.cp_language;
        CLOUDPOODLL.transcode = config.cp_transcode;
        CLOUDPOODLL.audioskin = config.cp_audioskin;
        CLOUDPOODLL.videoskin = config.cp_videoskin;
        CLOUDPOODLL.fallback = config.fallback;


        //}
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
            CSS: CSS,
            CP: CLOUDPOODLL
        }, extra);
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
        }
        STATE.currentrecorder = recorder;

        //get title
        switch(recorder){
            case RECORDERS.VIDEO:
                var title = M.util.get_string('createvideo', COMPONENTNAME);
                var width = '500px';
                //var height = 450;
                break;
            case RECORDERS.AUDIO:
            default:
                var title = M.util.get_string('createaudio', COMPONENTNAME);
                var width = '500px';
                //var height = 300;
                break;
        }

        var d_conf = {};
        d_conf.headerContent =title;
        d_conf.focusAfterHide = recorder;
        d_conf.width = width;
        //d_conf.height=height;

        var dialogue = this.getDialogue(d_conf);

        // Set the dialogue content, and then show the dialogue.
        dialogue.set('bodyContent', this._getDialogueContent()).show();

        //store some common elements we will refer to later
        STATE.elementid = this.get('host').get('elementid');
        STATE.subtitlecheckbox = Y.one('#' + STATE.elementid + '_' + CSS.SUBTITLE_CHECKBOX);
        STATE.mediainsertcheckbox = Y.one('#' + STATE.elementid + '_' + CSS.MEDIAINSERT_CHECKBOX);
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
                    STATE.subtitling = true;
                } else {
                    topnode.all('.' + CSS.CP_SWAP).setAttribute('data-transcribe', '0');
                    topnode.all('.' + CSS.CP_SWAP).setAttribute('data-subtitle', '0');
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
        context.language=CLOUDPOODLL.language;
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
        this.editor.focus();
        this.get('host').insertContentAtFocusPoint(content);
        this.markUpdated();

    }
}, { ATTRS: {
    disabled: {
        value: false
    }
}
});

}, '@VERSION@');
