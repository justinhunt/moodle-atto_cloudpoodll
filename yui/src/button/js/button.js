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
    var RECORDERS = {VIDEO: 'video', AUDIO: 'audio', SCREEN: 'screen', WIDGETS: 'widgets'};
    var INSERTMETHOD = {LINK: 'link', TAGS: 'tags'};
    var LANGUAGE = {
        ENUS: 'en-US',
        ENGB: 'en-GB',
        ENAU: 'en-AU',
        ENIN: 'en-IN',
        FRCA: 'fr-CA',
        FRFR: 'fr-FR',
        ESUS: 'es-US',
        ESES: 'es-ES',
        ITIT: 'it-IT',
        PTBR: 'pt-BR',
        DEDE: 'de-DE',
        KOKR: 'ko-KR',
        HIIN: 'hi-IN',
        ARAE: 'ar-AE',
        ARSA: 'ar-SA',
        ZHCN: 'zh-CN',
        NLNL: 'nl-NL',
        ENIE: 'en-IE',
        ENWL: 'en-WL',
        ENAB: 'en-AB',
        FAIR: 'fa-IR',
        DECH: 'de-CH',
        HEIL: 'he-IL',
        IDID: 'id-ID',
        JAJP: 'ja-JP',
        MSMY: 'ms-MY',
        PTPT: 'pt-PT',
        RURU: 'ru-RU',
        TAIN: 'ta-IN',
        TEIN: 'te-IN',
        TRTR: 'tr-TR'
    };
    var CLOUDPOODLL = {};
    var SKIN = {
        PLAIN: 'standard',
        BMR: 'bmr',
        ONETWOTHREE: 'onetwothree',
        FRESH: 'fresh',
        ONCE: 'once',
        SCREEN: 'screen'
    };
    var CSS = {
        VIDEO: 'atto_cloudpoodll_video',
        AUDIO: 'atto_cloudpoodll_audio',
        WIDGETS: 'atto_cloudpoodll_audio',
        UPLOAD: 'atto_cloudpoodll_upload',
        SUBTITLE: 'atto_cloudpoodll_subtitle',
        OPTIONS: 'atto_cloudpoodll_options',
        HISTORY: 'atto_cloudpoodll_history',
        SCREEN: 'atto_cloudpoodll_screen',
        LANG_SELECT: 'atto_cloudpoodll_languageselect',
        EXPIREDAYS_SELECT: 'atto_cloudpoodll_expiredaysselect',
        SUBTITLE_CHECKBOX: 'atto_cloudpoodll_subtitle_checkbox',
        MEDIAINSERT_CHECKBOX: 'atto_cloudpoodll_mediainsert_checkbox',
        ATTO_CLOUDPOODLL_FORM: 'atto_cloudpoodll_form',
        CP_VIDEO: 'atto_cloudpoodll_video_cont',
        CP_SCREEN: 'atto_cloudpoodll_screen_cont',
        CP_AUDIO: 'atto_cloudpoodll_audio_cont',
        CP_UPLOAD: 'atto_cloudpoodll_upload_cont',
        CP_SWAP: 'atto_cloudpoodll_swapmeout',
        TEMPLATEVARIABLE: 'atto_cloudpoodll_templatevariable'

    };
    var STATE = {
        subtitling: 0,
        transcoding: false,
        started: false,
        currentrecorder: false,
        insertmethod: false,
        subitleaudiobydefault: 0,
        subitlevideobydefault: 0,
        elementid: false,
        subtitlecheckbox: false,
        filetitledisplaylength: 30,
        showhistory: true,
        showupload: true,
        showoptions: true,
        showexpiredays: true,
        loom: false,
        jws: ''
    };

    var TEMPLATES = {
        HTML_MEDIA: {
            VIDEO: '' +
                '&nbsp;<video ' +
                'controls="true" crossorigin="anonymous"  controlsList="nodownload" preload="metadata" style="width: 100%; max-width: 800px;"' +
                '>' +
                "{{#if includesourcetrack}}" +
                '<source src="{{sourceurl}}" type="{{sourcemimetype}}">' +
                "{{/if}}" +
                '<source src="{{url}}" type="{{urlmimetype}}">' +
                "{{#if issubtitling}}" +
                '<track src="{{subtitleurl}}" kind="captions" srclang="{{CP.language}}" label="{{CP.language}}" default="true">' +
                "{{/if}}" +
                '</video>&nbsp;',
            AUDIO: '' +
                '&nbsp;<audio ' +
                'controls="true" crossorigin="anonymous" controlsList="nodownload" preload="metadata"' +
                '>' +
                "{{#if includesourcetrack}}" +
                '<source src="{{sourceurl}}" type="{{sourcemimetype}}">' +
                "{{/if}}" +
                '<source src="{{url}}" type="{{urlmimetype}}">' +
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

    var BUTTONSHEADERTEMPLATE = '' +
        '<div id="{{elementid}}_{{innerform}}" class="mdl-align">' +
        '<h4 class="' + CSS.HEADERTEXT + '">{{headertext}}</h4>' +
        '</div>';

    var BUTTONTEMPLATE = '' +
        '<div id="{{elementid}}_{{innerform}}" class="atto_widget_buttons mdl-align" style="width:30%;">' +
        '<button style="width: 100%;" class="' + CSS.NAMEBUTTON + '_{{templateindex}} btn btn-info d-block">{{name}}</button>' +
        '</div>';

var FIELDTEMPLATE = '' +
    '<div id="{{elementid}}_{{innerform}}"><span class="atto_cloudpoodll_widgetlabel">{{label}}</span>' +
    '&nbsp;<input type="text" class="' + CSS.TEMPLATEVARIABLE + '_{{variableindex}} atto_widget_field" value="{{defaultvalue}}"></input>' +
    '</div>';
var SELECTCONTAINERTEMPLATE = '' +
    '<div id="{{elementid}}_{{innerform}}"><span class="atto_cloudpoodll_widgetlabel">{{label}}</span></div>';

var SELECTTEMPLATE = '' +
    '<select class="' + CSS.TEMPLATEVARIABLE + '_{{variableindex}} atto_widget_field"></select>';

var OPTIONTEMPLATE = '' +
    '<option value="{{option}}">{{option}}</option>';

var SUBMITTEMPLATE = '' +
    '<form class="atto_form">' +
    '<div id="{{elementid}}_{{innerform}}" class="mdl-align">' +
    '<button class="' + CSS.INPUTSUBMIT + '">{{inserttext}}</button>' +
    '</div>' +
    '</form>';

var FIELDSHEADERTEMPLATE = '' +
    '<div id="{{elementid}}_{{innerform}}" class="mdl-align">' +
    '<h4 class="' + CSS.HEADERTEXT + '">{{headertext}} {{key}}</h4>' +
    '<div class="' + CSS.INSTRUCTIONSTEXT + '">{{instructions}}</div>' +
    '</div>';

var poodllRecorder = null;

    Y.namespace('M.atto_cloudpoodll').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {
        initializer: function (config) {
            //if we don't have the capability
            if (config.disabled) {
                return;
            }

            var recorders = new Array('audio', 'video','screen','widgets');
            for (var therecorder = 0; therecorder < recorders.length; therecorder++) {
                // Add the poodll button first (if we are supposed to)
                if (config.hasOwnProperty(recorders[therecorder])) {
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

            //transcoding flag
            STATE.transcoding = config.cp_transcode == '1';

            //file title display length
            STATE.filetitledisplaylength = config.filetitle_displaylength;

            //show tabs
            STATE.showhistory = config.showhistory== '1';
            STATE.showupload = config.showupload== '1';
            STATE.showoptions = config.showoptions== '1';
            STATE.showexpiredays = config.showexpiredays== '1';

            //loom
            STATE.loom = config.loom;
            STATE.jws = config.jws;


            //set up the cloudpoodll div
            CLOUDPOODLL.parent = M.cfg.wwwroot;
            CLOUDPOODLL.appid = 'atto_cloudpoodll';
            CLOUDPOODLL.token = config.cp_token;
            CLOUDPOODLL.region = config.cp_region;
            CLOUDPOODLL.owner = config.cp_owner;
            CLOUDPOODLL.expiredays = config.cp_expiredays;
            CLOUDPOODLL.cansubtitle = config.cp_cansubtitle;
            CLOUDPOODLL.language = config.cp_language;
            CLOUDPOODLL.transcode = config.cp_transcode;
            CLOUDPOODLL.audioskin = config.cp_audioskin;
            CLOUDPOODLL.videoskin = config.cp_videoskin;
            CLOUDPOODLL.fallback = config.fallback;
            CLOUDPOODLL.keys = config.keys;
            CLOUDPOODLL.names = config.names;
            CLOUDPOODLL.instructions = config.instructions;
            CLOUDPOODLL.defaults = config.defaults;
            CLOUDPOODLL.variables = config.variables;
            CLOUDPOODLL.ends = config.ends;
            CLOUDPOODLL.sizes = this._fetchRecorderDimensions();
        },


        /**
         * Atto text editor cloudpoodll plugin.
         *
         * @namespace M.atto_cloudpoodll
         * @class button
         * @extends M.editor_atto.EditorPlugin
         */
        _getContext:
            function (extra) {
                var basicItems={
                    elementid: this.get('host').get('elementid'),
                    component: COMPONENTNAME,
                    helpStrings: this.get('help'),
                    recorder: STATE.currentrecorder,
                    CSS: CSS,
                    CP: CLOUDPOODLL,
                    LANG: LANGUAGE
                };
                if(STATE.currentrecorder === RECORDERS.VIDEO){basicItems.isvideo=true;}
                if(STATE.currentrecorder === RECORDERS.SCREEN){
                    basicItems.isscreen=true;
                    if(STATE.loom){
                        basicItems.loom=true;
                        basicItems.jws=STATE.jws;
                        basicItems.loomid='loom1234';
                    }
                }
                if(STATE.currentrecorder === RECORDERS.AUDIO){basicItems.isaudio=true;}
                if(STATE.subtitleaudiobydefault == 1){basicItems.letssubtitleaudio=true;}
                if(STATE.subtitlevideobydefault == 1){basicItems.letssubtitlevideo=true;}
                if(STATE.insertmethod === INSERTMETHOD.TAGS){basicItems.mediataginsert=true;}
                basicItems.subtitleaudiobydefault=STATE.subtitleaudiobydefault;
                basicItems.subtitlevideobydefault=STATE.subtitlevideobydefault;
                if(STATE.showhistory){basicItems.showhistory=true;}
                if(STATE.showupload){basicItems.showupload=true;}
                if(STATE.showoptions){basicItems.showoptions=true;}
                if(STATE.showexpiredays){basicItems.showexpiredays=true;}
                if(CLOUDPOODLL.cansubtitle){basicItems.cansubtitle=true;}

                //languages
                if(CLOUDPOODLL.language === LANGUAGE.ENUS){basicItems.useENUS =true;}
                if(CLOUDPOODLL.language === LANGUAGE.ENGB){basicItems.useENGB =true;}
                if(CLOUDPOODLL.language === LANGUAGE.ENIN){basicItems.useENIN =true;}
                if(CLOUDPOODLL.language === LANGUAGE.FRCA){basicItems.useFRCA =true;}
                if(CLOUDPOODLL.language === LANGUAGE.FRFR){basicItems.useFRFR =true;}
                if(CLOUDPOODLL.language === LANGUAGE.ESUS){basicItems.useESUS =true;}
                if(CLOUDPOODLL.language === LANGUAGE.ESES){basicItems.useESES =true;}
                if(CLOUDPOODLL.language === LANGUAGE.ITIT){basicItems.useITIT =true;}
                if(CLOUDPOODLL.language === LANGUAGE.PTBR){basicItems.usePTBR =true;}
                if(CLOUDPOODLL.language === LANGUAGE.PTPT){basicItems.usePTPT =true;}

                if(CLOUDPOODLL.language === LANGUAGE.DEDE){basicItems.useDEDE =true;}
                if(CLOUDPOODLL.language === LANGUAGE.KOKR){basicItems.useKOKR =true;}
                if(CLOUDPOODLL.language === LANGUAGE.HIIN){basicItems.useHIIN =true;}
                if(CLOUDPOODLL.language === LANGUAGE.ARAE){basicItems.useARAE =true;}
                if(CLOUDPOODLL.language === LANGUAGE.ARSA){basicItems.useARSA =true;}
                if(CLOUDPOODLL.language === LANGUAGE.ZHCN){basicItems.useZHCN =true;}
                if(CLOUDPOODLL.language === LANGUAGE.NLNL){basicItems.useNLNL =true;}
                if(CLOUDPOODLL.language === LANGUAGE.ENIE){basicItems.useENIE =true;}
                if(CLOUDPOODLL.language === LANGUAGE.ENWL){basicItems.useENWL =true;}
                if(CLOUDPOODLL.language === LANGUAGE.ENAB){basicItems.useENAB =true;}

                if(CLOUDPOODLL.language === LANGUAGE.FAIR){basicItems.useFAIR =true;}
                if(CLOUDPOODLL.language === LANGUAGE.DECH){basicItems.useDECH =true;}
                if(CLOUDPOODLL.language === LANGUAGE.IDID){basicItems.useIDID =true;}
                if(CLOUDPOODLL.language === LANGUAGE.JAJP){basicItems.useJAJP =true;}
                if(CLOUDPOODLL.language === LANGUAGE.MSMY){basicItems.useMSMY =true;}
                if(CLOUDPOODLL.language === LANGUAGE.RURU){basicItems.useRURU =true;}
                if(CLOUDPOODLL.language === LANGUAGE.TAIN){basicItems.useTAIN =true;}
                if(CLOUDPOODLL.language === LANGUAGE.TEIN){basicItems.useTEIN =true;}
                if(CLOUDPOODLL.language === LANGUAGE.TRTR){basicItems.useTRTR =true;}

                //expire days
                basicItems['expire' + CLOUDPOODLL.expiredays] =true;

                return Y.merge(basicItems,extra);
            },

        _fetchRecorderDimensions: function () {
            // Get return object
            var sizes = {};

            //get video sizes]
            switch (CLOUDPOODLL.videoskin) {
                case SKIN.ONETWOTHREE:
                case SKIN.SCREEN:
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
         * Display the widgets dialog
         *
         * @method _displayDialogue
         * @private
         */
        _displayWidgetsDialogue: function (e, clickedicon) {
            e.preventDefault();
            var width = 800;

            var dialogue = this.getDialogue({
                headerContent: M.util.get_string('dialogtitle', COMPONENTNAME),
                width: width + 'px',
                focusAfterHide: clickedicon
            });
            //dialog doesn't detect changes in width without this
            //if you reuse the dialog, this seems necessary
            if (dialogue.width !== width + 'px') {
                dialogue.set('width', width + 'px');
            }


            //create content container
            var bodycontent = Y.Node.create('<div></div>');

            //create and append header
            var template = Y.Handlebars.compile(BUTTONSHEADERTEMPLATE),
                content = Y.Node.create(template({
                    headertext: M.util.get_string('chooseinsert', COMPONENTNAME)
                }));
            bodycontent.append(content);

            //get button nodes
            var buttons = this._getButtonsForNames(clickedicon);

            Y.Array.each(buttons, function (button) {
                bodycontent.append(button);
            }, bodycontent);

            //set to bodycontent
            dialogue.set('bodyContent', bodycontent);
            dialogue.show();

            this.markUpdated();
        },

        /**
         * Return the dialogue content for the tool, attaching any required
         * events.
         *
         * @method _getButtonsForNames
         * @return {Node} The content to place in the dialogue.
         * @private
         */
        _getButtonsForNames: function (clickedicon) {
            var allcontent = [];
            Y.Array.each(CLOUDPOODLL.names, function (thename, currentindex) {
                //loop start
                var template = Y.Handlebars.compile(BUTTONTEMPLATE),
                    content = Y.Node.create(template({
                        elementid: this.get('host').get('elementid'),
                        name: thename,
                        templateindex: currentindex
                    }));
                this._form = content;
                content.one('.' + CSS.NAMEBUTTON + '_' + currentindex).on('click', this._showTemplateForm, this, currentindex);
                allcontent.push(content);
                //loop end
            }, this);

            return allcontent;
        },

        /**
         * Return the widget dialogue content for the tool, attaching any required
         * events.
         *
         * @method _getSubmitButtons
         * @return {Node} The content to place in the dialogue.
         * @private
         */
        _getSubmitButtons: function (templateindex) {

            var template = Y.Handlebars.compile(SUBMITTEMPLATE),

                content = Y.Node.create(template({
                    elementid: this.get('host').get('elementid'),
                    inserttext: M.util.get_string('insert', COMPONENTNAME)
                }));

            content.one('.' + CSS.INPUTSUBMIT).on('click', this._doWidgetsInsert, this, templateindex);
            return content;
        },

        /**
         * Inserts the users input onto the page
         * @method _getWidgetsInsert
         * @private
         */
        _doWidgetsInsert: function (e, templateindex) {
            e.preventDefault();
            this.getDialogue({
                focusAfterHide: null
            }).hide();

            var retstring = "{POODLL:type=";
            var thekey = CLOUDPOODLL.keys[templateindex];
            var thevariables = CLOUDPOODLL.variables[templateindex];
            var thedefaults = CLOUDPOODLL.defaults[templateindex];
            var theend = CLOUDPOODLL.ends[templateindex];
            var defaultsarray = thedefaults;

            //add key to return string
            retstring += '"' + thekey + '"';

            //add variables to return string
            Y.Array.each(thevariables, function (variable, currentindex) {
                //loop start
                var thefield = Y.one('.' + CSS.TEMPLATEVARIABLE + '_' + currentindex);
                var thevalue = thefield.get('value');
                if (thevalue && thevalue != defaultsarray[variable]) {
                    retstring += ',' + variable + '="' + thevalue + '"';
                }
                //loop end
            }, this);

            //close out return string
            retstring += "}";

            //add an end tag, if we need to
            if (theend) {
                retstring += '<br/>{POODLL:type="' + thekey + '_end"}';
            }

            this.editor.focus();
            this.get('host').insertContentAtFocusPoint(retstring);
            this.markUpdated();

        },
        /**
         * Display the chosen widgets template form
         *
         * @method _showTemplateForm
         * @private
         */
        _showTemplateForm: function (e, templateindex) {
            e.preventDefault();
            var width = 800;


            var dialogue = this.getDialogue({
                headerContent: M.util.get_string('dialogtitle', COMPONENTNAME),
                width: width + 'px',
            });

            //dialog doesn't detect changes in width without this
            //if you reuse the dialog, this seems necessary
            if (dialogue.width !== width + 'px') {
                dialogue.set('width', width + 'px');
            }

            //get fields , 1 per variable
            var fields = this._getTemplateFields(templateindex);
            var instructions = CLOUDPOODLL.instructions[templateindex];
            instructions = decodeURIComponent(instructions);

            //get header node. It will be different if we have no fields
            var useheadertext = "";
            if (fields && fields.length > 0) {
                useheadertext = M.util.get_string('fieldsheader', COMPONENTNAME);
            } else {
                useheadertext = M.util.get_string('nofieldsheader', COMPONENTNAME);
            }
            var template = Y.Handlebars.compile(FIELDSHEADERTEMPLATE),
                content = Y.Node.create(template({
                    key: CLOUDPOODLL.keys[templateindex],
                    headertext: useheadertext,
                    instructions: instructions
                }));
            var header = content;

            //set container for our nodes (header, fields, buttons)
            var bodycontent = Y.Node.create('<div />');

            //add our header
            bodycontent.append(header);

            //add fields
            Y.Array.each(fields, function (field) {
                //loop start
                bodycontent.append(field);
                //loop end
            }, bodycontent);

            //add submit button
            var submitbuttons = this._getSubmitButtons(templateindex);
            bodycontent.append(submitbuttons)

            //set to bodycontent
            dialogue.set('bodyContent', bodycontent);
            dialogue.show();
            this.markUpdated();
        },

        /**
         * Return a field (yui node) for each variable in the template
         *
         * @method _getTemplateFields
         * @return {Node} The content to place in the dialogue.
         * @private
         */
        _getTemplateFields: function (templateindex) {
            var allcontent = [];
            var thekey = CLOUDPOODLL.keys[templateindex];
            var thevariables = CLOUDPOODLL.variables[templateindex];
            var thedefaults = CLOUDPOODLL.defaults[templateindex];

            //defaults array
            //var defaultsarray=this._getDefArray(thedefaults);
            var defaultsarray = thedefaults;

            Y.Array.each(thevariables, function (thevariable, currentindex) {
                //set the variable label
                var thelabel = this._makeLabel(thevariable);
                //loop start
                if ((thevariable in defaultsarray) && defaultsarray[thevariable].indexOf('|') > -1) {

                    var containertemplate = Y.Handlebars.compile(SELECTCONTAINERTEMPLATE),
                        content = Y.Node.create(containertemplate({
                            elementid: this.get('host').get('elementid'),
                            label: thelabel,
                            variable: thevariable,
                            defaultvalue: defaultsarray[thevariable],
                            variableindex: currentindex
                        }));

                    var selecttemplate = Y.Handlebars.compile(SELECTTEMPLATE),
                        selectbox = Y.Node.create(selecttemplate({
                            variable: thevariable,
                            defaultvalue: defaultsarray[thevariable],
                            variableindex: currentindex
                        }));

                    var opts = defaultsarray[thevariable].split('|');
                    var htmloptions = "";
                    var opttemplate = Y.Handlebars.compile(OPTIONTEMPLATE);
                    Y.Array.each(opts, function (opt, optindex) {
                        var optcontent = Y.Node.create(opttemplate({
                            option: opt
                        }));
                        selectbox.appendChild(optcontent);
                    });
                    content.appendChild(selectbox);

                } else {

                    var template = Y.Handlebars.compile(FIELDTEMPLATE),
                        content = Y.Node.create(template({
                            elementid: this.get('host').get('elementid'),
                            label: thelabel,
                            variable: thevariable,
                            defaultvalue: defaultsarray[thevariable],
                            variableindex: currentindex
                        }));
                }


                allcontent.push(content);
                //loop end
            }, this);


            return allcontent;
        },

        _makeLabel: function(templatevariable) {
            return templatevariable.split('_').map(function capitalize(part) {
                return part.charAt(0).toUpperCase() + part.slice(1);
            }).join(' ');
        },

        /**
         * Display the cloud poodll tool.
         *
         * @method _displayDialogue
         * @private
         */
        _displayDialogue: function (e, recorder) {
            e.preventDefault();
            this._currentrecorder = recorder;

            if (recorder == RECORDERS.WIDGETS) {
                this._displayWidgetsDialogue(e, recorder);
                return;
            }

            STATE.currentrecorder = recorder;

            //get title and sizes
            switch (recorder) {
                case RECORDERS.SCREEN:
                    var title = M.util.get_string('createscreen', COMPONENTNAME);
                    var width = '502';
                    var height = "660";
                    break;

                case RECORDERS.VIDEO:
                    var title = M.util.get_string('createvideo', COMPONENTNAME);
                    switch (CLOUDPOODLL.videoskin) {
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

            //set default subtitling flag
            if (CLOUDPOODLL.cansubtitle) {
                if (STATE.currentrecorder == RECORDERS.VIDEO ||
                    STATE.currentrecorder == RECORDERS.SCREEN) {
                    STATE.subtitling = STATE.subtitlevideobydefault;
                } else {
                    STATE.subtitling = STATE.subtitleaudiobydefault;
                }
            }else{
                STATE.subtitling = 0;
            }

            var d_conf = {};
            d_conf.center = true;
            d_conf.headerContent = title;
            d_conf.focusAfterHide = recorder;
            d_conf.width = width + 'px';
            if (height) {
                d_conf.height = height + 'px';
            }

            var dialogue = this.getDialogue(d_conf);

            //if this dialog had a different size and title (it was popped up before as diff media recorder type)
            if (dialogue.get('width') != width + 'px') {
                dialogue.set('headerContent', title);
                //sadly the width and height won't change .. whatever
                dialogue.set('width', width + 'px');
                dialogue.set('height', height + 'px');
            }

            var output = '';
            if (CLOUDPOODLL.token == '') {
                output = M.util.get_string('notoken', COMPONENTNAME);
            } else {
                //this block should be portioned into an async/await and function, but shifter wont allow it.
                var context = this._getContext();
                var that = this;
                require(['core/templates', 'core/ajax', 'core/log', 'core/notification'], function (templates, ajax, log, notification) {

                    templates.render('atto_cloudpoodll/root', context).then(function (html, js) {
                        output = html;
                        var content = Y.Node.create(output);

                        // Set the dialogue content, and then show the dialogue.
                        dialogue.set('bodyContent', content).show();


                        //store some common elements we will refer to later
                        STATE.elementid = that.get('host').get('elementid');
                        STATE.subtitlecheckbox = Y.one('#' + STATE.elementid + '_' + CSS.SUBTITLE_CHECKBOX);
                        STATE.mediainsertcheckbox = Y.one('#' + STATE.elementid + '_' + CSS.MEDIAINSERT_CHECKBOX);
                        STATE.languageselect = Y.one('#' + STATE.elementid + '_' + CSS.LANG_SELECT);
                        STATE.expiredays = Y.one('#' + STATE.elementid + '_' + CSS.EXPIREDAYS_SELECT);
                        var topnode = Y.one('#' + STATE.elementid + '_' + CSS.ATTO_CLOUDPOODLL_FORM);


                        //this is important?
                        poodllRecorder = that;

                        //subtitle checkbox click event.. reload recorders
                        if (STATE.subtitlecheckbox != null) {
                            //if we can subtitle, handle events, otherwise disable it
                            if (CLOUDPOODLL.cansubtitle) {
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
                            } else {
                                this._disableSubtitleCheckbox();
                            }
                        }

                        //insert method checkbox;
                        if (STATE.mediainsertcheckbox != null) {
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

                        //language selector
                        if (STATE.languageselect != null) {
                            STATE.languageselect.on('change', function (e) {
                                var element = e.currentTarget;
                                if (element) {
                                    CLOUDPOODLL.language = element.get('value');
                                    topnode.all('.' + CSS.CP_SWAP).setAttribute('data-language', CLOUDPOODLL.language);
                                    topnode.all('.' + CSS.CP_SWAP).setAttribute('data-alreadyparsed', 'false');
                                    //reload the recorders
                                    topnode.all('.' + CSS.CP_SWAP).empty();
                                    that._loadRecorders();
                                }
                            });
                        }

                        //expire days selector
                        if (STATE.expiredays != null) {
                            STATE.expiredays.on('change', function (e) {
                                var element = e.currentTarget;
                                if (element) {
                                    CLOUDPOODLL.expiredays = element.get('value');
                                    topnode.all('.' + CSS.CP_SWAP).setAttribute('data-expiredays', CLOUDPOODLL.expiredays);
                                    topnode.all('.' + CSS.CP_SWAP).setAttribute('data-alreadyparsed', 'false');
                                    //reload the recorders
                                    topnode.all('.' + CSS.CP_SWAP).empty();
                                    that._loadRecorders();
                                }
                            });
                        }
                        //so finally load those recorders
                        that._loadRecorders();

                        //and then run any JS loaded from the templates (currently none, so just commented out)
                        //templates.runTemplateJS(js);

                        //Adding Loom JS .. this is a bit of a hack, but it works
                        //Tried creating a loomloader AMD  module,
                        // but if we fetch the loom JS from CDN it is ES6 modules, so it would complain about no define etc
                        // loom JS cdn also has CJS modules, but AMD complained similarly
                        // Tried to declare the AMD module as an ES6 module and give it a .mjs extension
                        // that would grunt ok and the ES6 module would be transpiled to AMD. To that point it was all good
                        // but when the CDN libs were loaded they were ES6 and they complained about imports not in a module
                        // So I thought maybe just download the loom sdk, though its big, and put it in the plugin.
                        // But there are way too many dependencies for that and the licensing is not clear
                        // So just loading the Loom JS in a script tag of type module works in modern browsers,
                        // and though we don't get all the optimizations of the AMD loader at least it works
                        // Well . it doesn't work if inserted on the page with the rest of the loompanel.mustache HTML via:
                        // dialogue.set('bodyContent', content).show();  (internally this uses innerhtml=xxx DOM doesn't notice JS)
                        // so we insert it separately with appendChild. Hence the loomscript is another mustache template
                        //...all good? ja, here we go ...
                        if (context.loom) {

                            //hide dialogue // this is a bit hacky because we do have a panel and button and we load it
                            //in a dedicated icon for the toolbar we would not do this hack. it just keeps it in atto_cloudpoodll
                            that.getDialogue({
                                focusAfterHide: null
                            }).hide();

                            templates.render('atto_cloudpoodll/loomscript', context).then(function (loomcode) {
                                var scriptElement = document.createElement('script');
                                scriptElement.type = 'module';
                                scriptElement.appendChild(document.createTextNode(loomcode));
                                var loomscriptDiv = document.getElementById(context.loomid + '_script');
                                loomscriptDiv.appendChild(scriptElement);
                                var loomvideourlField = document.getElementById(context.loomid + '_videourl');
                                var loomplayersourceField = document.getElementById(context.loomid + '_playersource');

                                loomvideourlField.addEventListener('change', function () {

                                    //get the video url
                                    var thevideourl= loomvideourlField.value;

                                    //get the loom id
                                    // https://www.loom.com/share/c6e6ddd51d5c459eb21a8dcf3f3fa43b => c6e6ddd51d5c459eb21a8dcf3f3fa43b
                                    var lastSlashIndex = thevideourl.lastIndexOf('/');
                                    var loomid = thevideourl.substring(lastSlashIndex + 1);


                                    //Get the player source (raw)
                                    //this wont survive a save in the editor, at least not in Atto (and without special permissions)
                                    //so for now we don't use it
                                    //var loomplayersource = loomplayersourceField.value;

                                    //Use Poodll filter (or Generico)
                                    var loomplayersource = "{POODLL:type=loom,loomid=" + loomid + "}";

                                    //insert into editor
                                    that.editor.focus();
                                    that.get('host').insertContentAtFocusPoint(loomplayersource);
                                    that.markUpdated();

                                });
                            }).fail(function (ex) {
                                notification.exception(ex);

                            });//end of templates.render
                        } //end of if context.loom
                    });//end of templates.render
                });//end of require
            }//end of if cloud poodll token
        },//end of displaydialogue

        _disableSubtitleCheckbox: function () {
            //this function is never called, because if not transcribable, not shown
            STATE.subtitlecheckbox.setAttribute('disabled', true);
            var topnode = Y.one('#' + STATE.elementid + '_' + CSS.ATTO_CLOUDPOODLL_FORM);
            topnode.all('.' + CSS.CP_SWAP).setAttribute('data-transcribe', '0');
            topnode.all('.' + CSS.CP_SWAP).setAttribute('data-subtitle', '0');
        },

        /**
         * Loads the history tab html.
         *
         * @method loadHistory
         */
        loadHistory: function () {
            require(['core/templates','core/ajax', 'core/notification'], function (templates,ajax, notification) {
                ajax.call([{
                    methodname: 'atto_cloudpoodll_history_get_items',
                    args: {'recordertype' : STATE.currentrecorder},
                    done: function (historyitems) {
                        /**
                         * Takes a mysql unix timestamp (in seconds) and converts to a display date.
                         *
                         * @method _formatUnixDate
                         * @param dateToFormat Date to format
                         */
                        function _formatUnixDate(dateToFormat) {
                            var dateObj = new Date(dateToFormat * 1000);

                            var month = dateObj.getUTCMonth() + 1;
                            var day = dateObj.getUTCDate();
                            var year = dateObj.getUTCFullYear();

                            return month + "/" + day + "/" + year;
                        }

                        if (Array.isArray(historyitems.responses)) {
                            historyitems.responses.forEach(function(item){
                                item.displaydateofentry = _formatUnixDate(item.dateofentry);
                                item.displayfiletitle = item.filetitle.substring(0, STATE.filetitledisplaylength) + '...';
                            });
                            historyitems.responses.formatted = JSON.stringify(historyitems.responses);
                        }

                        var context = {data: historyitems.responses};

                        templates.render('atto_cloudpoodll/historypanel', context)
                            .then(function (html, js) {
                                templates.replaceNodeContents('div[data-field="history"]', html, js);
                            }).fail(function (ex) {
                            notification.exception(ex);
                        });
                    }
                }]);
            });
        },

        /**
         * Loads the history video preview tab html.
         *
         * @method loadHistoryPreview
         * @param historyItem History item ID from list.
         */
        loadHistoryPreview: function (historyItem) {
            require(['core/templates', 'core/ajax', 'core/notification'], function (templates, ajax, notification) {
                ajax.call([{
                    methodname: 'atto_cloudpoodll_history_get_item',
                    args: {'id': historyItem.dataset.historyId},
                    done: function (historyItemData) {
                        var context = {
                            data: historyItemData.responses,
                            isVideo: STATE.currentrecorder === RECORDERS.VIDEO || STATE.currentrecorder === RECORDERS.SCREEN
                        };
                        templates.render('atto_cloudpoodll/historypreview', context)
                            .then(function (html, js) {
                                templates.replaceNodeContents('div[data-field="history"]', html, js);
                            }).fail(function (ex) {
                            notification.exception(ex);
                        });
                    }
                }]);
            });
        },

        /**
         * Loads or reloads the recorders
         *
         * @method _loadRecorders
         * @private
         */
        _loadRecorders: function () {
            var that = this;

            that.uploaded = false;
            that.ap_count = 0;
            require(['atto_cloudpoodll/cloudpoodllloader'], function (loader) {
                var recorder_callback = function (evt) {
                    switch (evt.type) {
                        case 'recording':
                            if (evt.action === 'started') {
                                //if user toggled subtitle checkbox any time from now, the recording would be lost
                                if (STATE.subtitlecheckbox != null) {
                                    STATE.subtitlecheckbox.set('disabled', true);
                                }

                            }
                            break;
                        case 'awaitingprocessing':
                            //we delay  a second to allow the sourcefile to be copied to correct location
                            //the source filename will sometimes be incorrect because we do not know it when creating the dynamo db entry
                            // but an incorrect ext is just confusing. most players will ignore it and deal with contents
                            if (!that.uploaded) {
                                setTimeout(function () {
                                    var guessed_ext = loader.fetch_guessed_extension(STATE.currentrecorder );
                                    var sourcefilename = evt.sourcefilename.split('.').slice(0, -1).join('.') + '.' + guessed_ext;
                                    var sourceurl = evt.s3root + sourcefilename;
                                    that._doInsert(evt.mediaurl, evt.mediafilename, sourceurl, evt.sourcemimetype);
                                }, 4000);
                                that.uploaded = true;
                            }
                            break;
                        case 'filesubmitted':
                            //we will probably never get here because awaiting processing will fire first
                            //we do not use this event, but it arrives when the final file is ready. (much earlier in case of non-transcode)

                            break;
                        case 'error':
                            alert('PROBLEM:' + evt.message);
                            break;
                    }
                };
                loader.init(CSS.CP_SWAP, recorder_callback);
            });
        },

        /**
         * Inserts the history item info the page.
         *
         * @method insertHistoryItem
         * @param  historyItem object
         * @private
         */
        insertHistoryItem: function(historyItem) {
            poodllRecorder.getDialogue({
                focusAfterHide: null
            }).hide();

            require(['core/ajax'], function (ajax) {
                ajax.call([{
                    methodname: 'atto_cloudpoodll_history_get_item',
                    args: {'id': historyItem.dataset.historyId},
                    done: function (historyItemData) {
                        //const [first] = historyItemData.responses;
                        //var item = first;
                        var item = historyItemData.responses[0];
                        var mediaLink = poodllRecorder._createMediaLink(
                            item.mediaurl,
                            item.mediafilename,
                            item.sourceurl,
                            item.sourcemimetype
                        );

                        switch (STATE.insertmethod) {

                            case INSERTMETHOD.TAGS:
                                mediaLink.template = poodllRecorder._createMediaTemplate(mediaLink.context, item.sourcemimetype, mediaLink.template);
                                break;

                            case INSERTMETHOD.LINK:
                            default:
                            //do nothing we already made the template as a link
                        }

                        poodllRecorder._insertIntoEditor(mediaLink.template, mediaLink.context);
                    }
                }]);
            });
        },

        /**
         * Creates the media link based on the recorder type.
         *
         * @method _createMediaLink
         * @param  mediaurl media URL to the AWS object
         * @param  mediafilename File name of the AWS object
         * @param  sourceurl URL to the AWS object
         * @param  sourcemimetype MimeType of the AWS object
         * @private
         */
        _createMediaLink: function (mediaurl, mediafilename, sourceurl, sourcemimetype) {
            var context = {};
            context.url = mediaurl;
            context.name = mediafilename;
            context.issubtitling = STATE.subtitling && STATE.subtitling !== '0';
            context.includesourcetrack = STATE.transcoding && (mediaurl !== sourceurl) && (sourceurl.slice(-3) !== 'wav') && (sourceurl !== false);
            context.CP = CLOUDPOODLL;
            context.subtitleurl = mediaurl + '.vtt';
            context.sourceurl = sourceurl;
            context.sourcemimetype = sourcemimetype;

            var template = TEMPLATES.HTML_MEDIA.LINK;

            return {context: context, template: template};
        },

        /**
         * Inserts the item into the editor.
         *
         * @method _createMediaLink
         * @param  template HTML template to insert into the editor
         * @param  context Context of the item being inserted
         * @private
         */
        _insertIntoEditor: function (template, context) {
            var content =
                Y.Handlebars.compile(template)(context);
            this.editor.focus();
            this.get('host').insertContentAtFocusPoint(content);
            this.markUpdated();
        },

        /**
         * Creates the media template for audio/video.
         *
         * @method _createMediaTemplate
         * @param  context Context of the item being inserted
         * @param  sourcemimetype MimeType of the AWS object
         * @param  context Context of the item being inserted
         * @private
         */
        _createMediaTemplate: function (context, sourcemimetype, template) {
            if (STATE.currentrecorder === RECORDERS.VIDEO || STATE.currentrecorder === RECORDERS.SCREEN) {
                context.width = false;
                context.height = false;
                context.poster = false;
                if (STATE.transcoding) {
                    context.urlmimetype = 'video/mp4';
                } else {
                    context.urlmimetype = sourcemimetype;
                }
                template = TEMPLATES.HTML_MEDIA.VIDEO;
            } else {
                context.width = false;
                context.height = false;
                context.poster = false;
                if (STATE.transcoding) {
                    context.urlmimetype = 'audio/mp3';
                } else {
                    context.urlmimetype = sourcemimetype;
                }
                template = TEMPLATES.HTML_MEDIA.AUDIO;
            }
            return template;
        },

        /**
         * Inserts the link or media element onto the page
         * @method _doInsert
         * @private
         */
        _doInsert: function (mediaurl, mediafilename, sourceurl, sourcemimetype) {
            this.getDialogue({
                focusAfterHide: null
            }).hide();

            //default context values(link) for template
           // var {context, template}
            var medialink = this._createMediaLink(mediaurl, mediafilename, sourceurl, sourcemimetype);
            var context = medialink.context;
            var template = medialink.template;
            function saveToHistory() {
                require(['core/ajax'], function (ajax) {
                    ajax.call([{
                        methodname: 'atto_cloudpoodll_history_create',
                        args: {
                            recordertype: STATE.currentrecorder,
                            mediafilename: mediafilename,
                            sourceurl: sourceurl,
                            mediaurl: mediaurl,
                            sourcemimetype: sourcemimetype,
                            subtitling: STATE.subtitling ? 1 : 0,
                            subtitleurl: STATE.subtitling ? mediaurl + '.vtt' : '',
                        },
                    }]);
                });
            }

            switch (STATE.insertmethod) {

                case INSERTMETHOD.TAGS:
                    template = this._createMediaTemplate(context, sourcemimetype, template);
                    break;

                case INSERTMETHOD.LINK:
                    break;
                default:
                //do nothing special actually.
            }
            saveToHistory();
            this._insertIntoEditor(template, context);
        }
    }, {
        ATTRS: {
            disabled: {
                value: false
            }
        }
    });
