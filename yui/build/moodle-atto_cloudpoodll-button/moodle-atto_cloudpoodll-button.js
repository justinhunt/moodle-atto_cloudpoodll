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
var CLOUDPOODLL = {};
var CSS = {
        VIDEO: 'atto_cloudpoodll_video',
        AUDIO: 'atto_cloudpoodll_audio',
        UPLOAD: 'atto_cloudpoodll_upload',
        CP_VIDEO: 'atto_cloudpoodll_video_cont',
        CP_AUDIO: 'atto_cloudpoodll_audio_cont',
        CP_UPLOAD: 'atto_cloudpoodll_upload_cont',
        CP_SWAP: 'atto_cloudpoodll_swapmeout'

};

var TEMPLATES = {
        ROOT: '' +
            '<form class="mform atto_form atto_media" id="{{elementid}}_atto_media_form">' +
                '<ul class="root nav nav-tabs" role="tablist">' +
                    "{{#if isvideo}}" +
                    '<li data-medium-type="{{CSS.VIDEO}}" class="nav-item">' +
                        '<a class="nav-link" href="#{{elementid}}_{{CSS.VIDEO}}" role="tab" data-toggle="tab">' +
                            '{{get_string "video" component}}' +
                        '</a>' +
                    '</li>' +
                     "{{else}}" +
                    '<li data-medium-type="{{CSS.AUDIO}}" class="nav-item">' +
                        '<a class="nav-link" href="#{{elementid}}_{{CSS.AUDIO}}" role="tab" data-toggle="tab">' +
                            '{{get_string "audio" component}}' +
                        '</a>' +
                    '</li>' +
                     "{{/if}}" +
                    '<li data-medium-type="{{CSS.UPLOAD}}" class="nav-item">' +
                        '<a class="nav-link active" href="#{{elementid}}_{{CSS.UPLOAD}}" role="tab" data-toggle="tab">' +
                            '{{get_string "upload" component}}' +
                        '</a>' +
                    '</li>' +
                '</ul>' +
                '<div class="root tab-content">' +
                    "{{#if isvideo}}" +
                    '<div data-medium-type="{{CSS.VIDEO}}" class="tab-pane" id="{{elementid}}_{{CSS.VIDEO}}">' +
                        'some video content' +
        '<div id="{{elementid}}_{{CSS.CP_VIDEO}}" class="{{CSS.CP_SWAP}}" data-id="{{elementid}}_{{CSS.CP_VIDEO}}" data-parent="{{CP.parent}}"' +
    'data-media="video" data-type="{{CP.videoskin}}" data-width="450" data-height="350"' +
    'data-transcode="{{CP.transcode}}" data-transcribe="0" data-transcribelanguage="{{CP.language}}"' +
    'data-expiredays="{{CP.expiredays}}" data-region="{{CP.region}}" data-token="{{CP.token}}" data-fallback="{{CP.fallback}}"></div>' +
                    '</div>' +
                     "{{else}}" +
                    '<div data-medium-type="{{CSS.AUDIO}}" class="tab-pane" id="{{elementid}}_{{CSS.AUDIO}}">' +
                         'some audio content' +
                    '</div>' +
                    "{{/if}}" +
                    '<div data-medium-type="{{CSS.UPLOAD}}" class="tab-pane active" id="{{elementid}}_{{CSS.UPLOAD}}">' +
                         'some upload content' +
        '<div id="{{elementid}}_{{CSS.CP_VIDEO}}" class="{{CSS.CP_SWAP}}" data-id="{{elementid}}_{{CSS.CP_UPLOAD}}" data-parent="{{CP.parent}}"' +
        'data-media="video" data-type="upload" data-width="450" data-height="350"' +
        'data-transcode="{{CP.transcode}}" data-transcribe="0" data-transcribelanguage="{{CP.language}}"' +
        'data-expiredays="{{CP.expiredays}}" data-region="{{CP.region}}" data-token="{{CP.token}}"></div>' +
                    '</div>' +
                '</div>' +
            '</form>',
      TAB_PANES: {
            UPLOAD: '' +
                '<label>' +
                    'Enter name' +
                    '<input class="fullwidth {{CSS.NAME_INPUT}}" type="text" id="{{elementid}}_link_nameentry"' +
                        'size="32" required="true"/>' +
                '</label>',
            VIDEO: '' +
                '<fieldset class="collapsible collapsed" id="{{elementid}}_video-display-options">' +
                    '<input name="mform_isexpanded_{{elementid}}_video-display-options" type="hidden">' +
                    '<legend class="ftoggler">{{get_string "displayoptions" component}}</legend>' +
                    '<div class="fcontainer">' +
                        '{{> form_components.display_options}}' +
                    '</div>' +
                '</fieldset>',
            AUDIO: '' +
                '<fieldset class="collapsible collapsed" id="{{elementid}}_audio-advanced-settings">' +
                    '<input name="mform_isexpanded_{{elementid}}_audio-advanced-settings" type="hidden">' +
                    '<legend class="ftoggler">{{get_string "advancedsettings" component}}</legend>' +
                    '<div class="fcontainer">' +
                        '{{> form_components.advanced_settings}}' +
                    '</div>' +
                '</fieldset>' +
                '<fieldset class="collapsible collapsed" id="{{elementid}}_audio-tracks">' +
                    '<input name="mform_isexpanded_{{elementid}}_audio-tracks" type="hidden">' +
                    '<legend class="ftoggler">{{get_string "tracks" component}} {{{helpStrings.tracks}}}</legend>' +
                    '<div class="fcontainer">' +
                        '{{renderPartial "form_components.track_tabs" context=this id=CSS.AUDIO}}' +
                    '</div>' +
                '</fieldset>'
        },
        HTML_MEDIA: {
            VIDEO: '' +
                '&nbsp;<video ' +
                    '{{#width}}width="{{../width}}" {{/width}}' +
                    '{{#height}}height="{{../height}}" {{/height}}' +
                    '{{#poster}}poster="{{../poster}}" {{/poster}}' +
                    '{{#showControls}}controls="true" {{/showControls}}' +
                    '{{#loop}}loop="true" {{/loop}}' +
                    '{{#muted}}muted="true" {{/muted}}' +
                    '{{#autoplay}}autoplay="true" {{/autoplay}}' +
                '>' +
                    '{{#sources}}<source src="{{source}}">{{/sources}}' +
                    '{{#tracks}}' +
                        '<track src="{{track}}" kind="{{kind}}" srclang="{{srclang}}" label="{{label}}"' +
                            ' {{#defaultTrack}}default="true"{{/defaultTrack}}>' +
                    '{{/tracks}}' +
                    '{{#description}}{{../description}}{{/description}}' +
                '</video>&nbsp',
            AUDIO: '' +
                '&nbsp;<audio ' +
                    '{{#showControls}}controls="true" {{/showControls}}' +
                    '{{#loop}}loop="true" {{/loop}}' +
                    '{{#muted}}muted="true" {{/muted}}' +
                    '{{#autoplay}}autoplay="true" {{/autoplay}}' +
                '>' +
                    '{{#sources}}<source src="{{source}}">{{/sources}}' +
                    '{{#tracks}}' +
                        '<track src="{{track}}" kind="{{kind}}" srclang="{{srclang}}" label="{{label}}"' +
                            ' {{#defaultTrack}}default="true"{{/defaultTrack}}>' +
                    '{{/tracks}}' +
                    '{{#description}}{{../description}}{{/description}}' +
                '</audio>&nbsp',
            LINK: '' +
                '<a href="{{url}}" ' +
                    '{{#width}}data-width="{{../width}}" {{/width}}' +
                    '{{#height}}data-height="{{../height}}"{{/height}}' +
                '>{{#name}}{{../name}}{{/name}}{{^name}}{{../url}}{{/name}}</a>'
         }
};

Y.namespace('M.atto_cloudpoodll').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {
    initializer: function(config) {
       // if (this.get('host').canShowFilepicker('media')) {
        /*
            this.addButton({
                icon: 'e/insert_edit_video',
                iconComponent: 'atto_cloudpoodll',
                callback: this._displayDialogue,
                tags: 'video, audio',
                tagMatchRequiresAll: false
            });
*/
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
            isvideo: this._currentrecorder == RECORDERS.VIDEO,
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
        this._currentrecorder = recorder;

        //get title
        switch(recorder){
            case 'video':
                var title = M.util.get_string('createvideo', COMPONENTNAME);
                break;
            case 'audio':
            default:
                var title = M.util.get_string('createaudio', COMPONENTNAME);
                break;
        }

        var dialogue = this.getDialogue({
            headerContent: title,
            focusAfterHide: recorder,
            width: 660,
          //  focusOnShowSelector: SELECTORS.URL_INPUT
        });

        // Set the dialogue content, and then show the dialogue.
        //dialogue.set('bodyContent', this._getDialogueContent(this.get('host').getSelection())).show();
        dialogue.set('bodyContent', this._getDialogueContent()).show();

        var that = this;
        require(['atto_cloudpoodll/cloudpoodllloader'], function(loader) {
            var recorder_callback = function(evt){
                switch(evt.type){
                    case 'recording':
                        if(evt.action==='started'){
                            //we started recording
                        }
                        break;
                    case 'awaitingprocessing':
                        if(that.uploadstate!='posted') {
                            that._doInsert(evt.mediaurl, evt.mediafilename);
                            that.uploadstate = 'posted';
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

/*
             var mediahtml='';
            template = Y.Handlebars.compile(IMAGETEMPLATE);
            mediahtml = template({
                url: filesrc,
                alt: thefilename
            });
 */

        mediahtml = '<a href="'+mediaurl+'">'+mediafilename+'</a>';
        this.editor.focus();
        this.get('host').insertContentAtFocusPoint(mediahtml);
        this.markUpdated();

    }
}, { ATTRS: {
    disabled: {
        value: false
    },

    keys: {
        value: null
    },

    names: {
        value: null
    },

    variables: {
        value: null
    },

    defaults: {
        value: null
    }
    ,
    instructions: {
        value: null
    },
    customicon: {
        value: null
    },
    ends: {
        value: null
    }
}
});

}, '@VERSION@');
