YUI.add("moodle-atto_cloudpoodll-button",function(e,t){var n="atto_cloudpoodll",r={VIDEO:"video",AUDIO:"audio",SCREEN:"screen",WIDGETS:"widgets"},i={LINK:"link",TAGS:"tags"},s={ENUS:"en-US",ENGB:"en-GB",ENAU:"en-AU",ENIN:"en-IN",FRCA:"fr-CA",FRFR:"fr-FR",ESUS:"es-US",ESES:"es-ES",ITIT:"it-IT",PTBR:"pt-BR",DEDE:"de-DE",KOKR:"ko-KR",HIIN:"hi-IN",ARAE:"ar-AE",ARSA:"ar-SA",ZHCN:"zh-CN",NLNL:"nl-NL",ENIE:"en-IE",ENWL:"en-WL",ENAB:"en-AB",FAIR:"fa-IR",DECH:"de-CH",HEIL:"he-IL",IDID:"id-ID",JAJP:"ja-JP",MSMY:"ms-MY",PTPT:"pt-PT",RURU:"ru-RU",TAIN:"ta-IN",TEIN:"te-IN",TRTR:"tr-TR"},o={},u={PLAIN:"standard",BMR:"bmr",ONETWOTHREE:"onetwothree",FRESH:"fresh",ONCE:"once",SCREEN:"screen"},a={VIDEO:"atto_cloudpoodll_video",AUDIO:"atto_cloudpoodll_audio",WIDGETS:"atto_cloudpoodll_audio",UPLOAD:"atto_cloudpoodll_upload",SUBTITLE:"atto_cloudpoodll_subtitle",OPTIONS:"atto_cloudpoodll_options",HISTORY:"atto_cloudpoodll_history",SCREEN:"atto_cloudpoodll_screen",LANG_SELECT:"atto_cloudpoodll_languageselect",SUBTITLE_CHECKBOX:"atto_cloudpoodll_subtitle_checkbox",MEDIAINSERT_CHECKBOX:"atto_cloudpoodll_mediainsert_checkbox",ATTO_CLOUDPOODLL_FORM:"atto_cloudpoodll_form",CP_VIDEO:"atto_cloudpoodll_video_cont",CP_SCREEN:"atto_cloudpoodll_screen_cont",CP_AUDIO:"atto_cloudpoodll_audio_cont",CP_UPLOAD:"atto_cloudpoodll_upload_cont",CP_SWAP:"atto_cloudpoodll_swapmeout"},f={subtitling:0,transcoding:!1,started:!1,currentrecorder:!1,insertmethod:!1,subitleaudiobydefault:0,subitlevideobydefault:0,elementid:!1,subtitlecheckbox:!1,filetitledisplaylength:30,showhistory:!0},l={HTML_MEDIA:{VIDEO:'&nbsp;<video controls="true" crossorigin="anonymous"  controlsList="nodownload" preload="metadata">{{#if includesourcetrack}}<source src="{{sourceurl}}" type="{{sourcemimetype}}">{{/if}}<source src="{{url}}" type="{{urlmimetype}}">{{#if issubtitling}}<track src="{{subtitleurl}}" kind="captions" srclang="{{CP.language}}" label="{{CP.language}}" default="true">{{/if}}</video>&nbsp;',AUDIO:'&nbsp;<audio controls="true" crossorigin="anonymous" controlsList="nodownload" preload="metadata">{{#if includesourcetrack}}<source src="{{sourceurl}}" type="{{sourcemimetype}}">{{/if}}<source src="{{url}}" type="{{urlmimetype}}">{{#if issubtitling}}<track src="{{subtitleurl}}" kind="captions" srclang="{{CP.language}}" label="{{CP.language}}" default="true">{{/if}}</audio>&nbsp;',LINK:'{{#if issubtitling}}&nbsp;<a href="{{url}}?data-subtitles={{subtitleurl}}&data-language={{CP.language}}"{{else}}&nbsp;<a href="{{url}}"{{/if}}>{{name}}</a>&nbsp;'}},c='<div id="{{elementid}}_{{innerform}}" class="mdl-align"><h4 class="'+a.HEADERTEXT+'">{{headertext}}</h4>'+"</div>",h='<div id="{{elementid}}_{{innerform}}" class="atto_widget_buttons mdl-align" style="width:30%;"><button style="width: 100%;" class="'+a.NAMEBUTTON+'_{{templateindex}} btn btn-info d-block">{{name}}</button>'+"</div>",p='<div id="{{elementid}}_{{innerform}}" class="mdl-align">{{variable}}&nbsp;<input type="text" class="'+a.TEMPLATEVARIABLE+'_{{variableindex}} atto_widget_field" value="{{defaultvalue}}"></input>'+"</div>",d='<div id="{{elementid}}_{{innerform}}" class="mdl-align">{{variable}}</div>',v='<select class="'+a.TEMPLATEVARIABLE+'_{{variableindex}} atto_widget_field"></select>',m='<option value="{{option}}">{{option}}</option>',g='<form class="atto_form"><div id="{{elementid}}_{{innerform}}" class="mdl-align"><button class="'+a.INPUTSUBMIT+'">{{inserttext}}</button>'+"</div>"+"</form>",y='<div id="{{elementid}}_{{innerform}}" class="mdl-align"><h4 class="'+a.HEADERTEXT+'">{{headertext}} {{key}}</h4>'+'<div class="'+a.INSTRUCTIONSTEXT+'">{{instructions}}</div>'+"</div>",b=null;e.namespace("M.atto_cloudpoodll").Button=e.Base.create("button",e.M.editor_atto.EditorPlugin,[],{initializer:function(e){if(e.disabled)return;var t=new Array("audio","video","screen","widgets");for(var n=0;n<t.length;n++)e.hasOwnProperty(t[n])&&this.addButton({icon:t[n],iconComponent:"atto_cloudpoodll",title:t[n]+"_desc",buttonName:t[n],callback:this._displayDialogue,callbackArgs:t[n]});f.insertmethod=e.insertmethod,f.subtitleaudiobydefault=e.subtitleaudiobydefault,f.subtitlevideobydefault=e.subtitlevideobydefault,f.transcoding=e.cp_transcode=="1",f.filetitledisplaylength=e.filetitle_displaylength,f.showhistory=e.showhistory=="1",f.showscreen=e.showscreen=="1",o.parent=M.cfg.wwwroot,o.appid="atto_cloudpoodll",o.token=e.cp_token,o.region=e.cp_region,o.owner=e.cp_owner,o.expiredays=e.cp_expiredays,o.cansubtitle=e.cp_cansubtitle,o.language=e.cp_language,o.transcode=e.cp_transcode,o.audioskin=e.cp_audioskin,o.videoskin=e.cp_videoskin,o.fallback=e.fallback,o.keys=e.keys,o.names=e.names,o.instructions=e.instructions,o.defaults=e.defaults,o.variables=e.variables,o.ends=e.ends,o.sizes=this._fetchRecorderDimensions()},_getContext:function(t){var u={elementid:this.get("host").get("elementid"),component:n,helpStrings:this.get("help"),recorder:f.currentrecorder,CSS:a,CP:o,LANG:s};return f.currentrecorder===r.VIDEO&&(u.isvideo=!0),f.currentrecorder===r.SCREEN&&(u.isscreen=!0),f.currentrecorder===r.AUDIO&&(u.isaudio=!0),f.subtitleaudiobydefault===1&&(u.letssubtitleaudio=!0),f.subtitlevideobydefault===1&&(u.letssubtitlevideo=!0),f.insertmethod===i.TAGS&&(u.mediataginsert=!0),u.subtitleaudiobydefault=f.subtitleaudiobydefault,u.subtitlevideobydefault=f.subtitlevideobydefault,f.showhistory&&(u.showhistory=!0),o.cansubtitle&&(u.cansubtitle=!0),o.language===s.ENUS&&(u.useENUS=!0),o.language===s.ENGB&&(u.useENGB=!0),o.language===s.ENIN&&(u.useENIN=!0),o.language===s.FRCA&&(u.useFRCA=!0),o.language===s.FRFR&&(u.useFRFR=!0),o.language===s.ESUS&&(u.useESUS=!0),o.language===s.ESES&&(u.useESES=!0),o.language===s.ITIT&&(u.useITIT=!0),o.language===s.PTBR&&(u.usePTBR=!0),o.language===s.PTPT&&(u.usePTPT=!0),o.language===s.DEDE&&(u.useDEDE=!0),o.language===s.KOKR&&(u.useKOKR=!0),o.language===s.HIIN&&(u.useHIIN=!0),o.language===s.ARAE&&(u.useARAE=!0),o.language===s.ARSA&&(u.useARSA=!0),o.language===s.ZHCN&&(u.useZHCN=!0),o.language===s.NLNL&&(u
.useNLNL=!0),o.language===s.ENIE&&(u.useENIE=!0),o.language===s.ENWL&&(u.useENWL=!0),o.language===s.ENAB&&(u.useENAB=!0),o.language===s.FAIR&&(u.useFAIR=!0),o.language===s.DECH&&(u.useDECH=!0),o.language===s.IDID&&(u.useIDID=!0),o.language===s.JAJP&&(u.useJAJP=!0),o.language===s.MSMY&&(u.useMSMY=!0),o.language===s.RURU&&(u.useRURU=!0),o.language===s.TAIN&&(u.useTAIN=!0),o.language===s.TEIN&&(u.useTEIN=!0),o.language===s.TRTR&&(u.useTRTR=!0),e.merge(u,t)},_fetchRecorderDimensions:function(){var e={};switch(o.videoskin){case u.ONETWOTHREE:case u.SCREEN:e.videowidth=441,e.videoheight=540;break;case u.BMR:e.videowidth=441,e.videoheight=500;break;default:e.videowidth=441,e.videoheight=450}switch(o.audioskin){default:e.audiowidth=450,e.audioheight=350}return e},_displayWidgetsDialogue:function(t,r){t.preventDefault();var i=800,s=this.getDialogue({headerContent:M.util.get_string("dialogtitle",n),width:i+"px",focusAfterHide:r});s.width!==i+"px"&&s.set("width",i+"px");var o=e.Node.create("<div></div>"),u=e.Handlebars.compile(c),a=e.Node.create(u({headertext:M.util.get_string("chooseinsert",n)}));o.append(a);var f=this._getButtonsForNames(r);e.Array.each(f,function(e){o.append(e)},o),s.set("bodyContent",o),s.show(),this.markUpdated()},_getButtonsForNames:function(t){var n=[];return e.Array.each(o.names,function(t,r){var i=e.Handlebars.compile(h),s=e.Node.create(i({elementid:this.get("host").get("elementid"),name:t,templateindex:r}));this._form=s,s.one("."+a.NAMEBUTTON+"_"+r).on("click",this._showTemplateForm,this,r),n.push(s)},this),n},_getSubmitButtons:function(t){var r=e.Handlebars.compile(g),i=e.Node.create(r({elementid:this.get("host").get("elementid"),inserttext:M.util.get_string("insert",n)}));return i.one("."+a.INPUTSUBMIT).on("click",this._doWidgetsInsert,this,t),i},_doWidgetsInsert:function(t,n){t.preventDefault(),this.getDialogue({focusAfterHide:null}).hide();var r="{POODLL:type=",i=o.keys[n],s=o.variables[n],u=o.defaults[n],f=o.ends[n],l=u;r+='"'+i+'"',e.Array.each(s,function(t,n){var i=e.one("."+a.TEMPLATEVARIABLE+"_"+n),s=i.get("value");s&&s!=l[t]&&(r+=","+t+'="'+s+'"')},this),r+="}",f&&(r+='<br/>{POODLL:type="'+i+'_end"}'),this.editor.focus(),this.get("host").insertContentAtFocusPoint(r),this.markUpdated()},_showTemplateForm:function(t,r){t.preventDefault();var i=800,s=this.getDialogue({headerContent:M.util.get_string("dialogtitle",n),width:i+"px"});s.width!==i+"px"&&s.set("width",i+"px");var u=this._getTemplateFields(r),a=o.instructions[r];a=decodeURIComponent(a);if(u&&u.length>0)var f=M.util.get_string("fieldsheader",n);else var f=M.util.get_string("nofieldsheader",n);var l=e.Handlebars.compile(y),c=e.Node.create(l({key:o.keys[r],headertext:f,instructions:a})),h=c,p=e.Node.create("<div />");p.append(h),e.Array.each(u,function(e){p.append(e)},p);var d=this._getSubmitButtons(r);p.append(d),s.set("bodyContent",p),s.show(),this.markUpdated()},_getTemplateFields:function(t){var n=[],r=o.keys[t],i=o.variables[t],s=o.defaults[t],u=s;return e.Array.each(i,function(t,r){if(t in u&&u[t].indexOf("|")>-1){var i=e.Handlebars.compile(d),s=e.Node.create(i({elementid:this.get("host").get("elementid"),variable:t,defaultvalue:u[t],variableindex:r})),o=e.Handlebars.compile(v),a=e.Node.create(o({variable:t,defaultvalue:u[t],variableindex:r})),f=u[t].split("|"),l="",c=e.Handlebars.compile(m);e.Array.each(f,function(t,n){var r=e.Node.create(c({option:t}));a.appendChild(r)}),s.appendChild(a)}else var h=e.Handlebars.compile(p),s=e.Node.create(h({elementid:this.get("host").get("elementid"),variable:t,defaultvalue:u[t],variableindex:r}));n.push(s)},this),n},_displayDialogue:function(t,s){t.preventDefault(),this._currentrecorder=s;if(s==r.WIDGETS){this._displayWidgetsDialogue(t,s);return}f.currentrecorder=s;switch(s){case r.SCREEN:var l=M.util.get_string("createscreen",n),c="502",h="660";break;case r.VIDEO:var l=M.util.get_string("createvideo",n);switch(o.videoskin){case u.ONETWOTHREE:var c="500",h="660";break;case u.PLAIN:var c="500",h="580";break;case u.BMR:var c="500",h="620";break;default:var c="500",h=!1}break;case r.AUDIO:default:var l=M.util.get_string("createaudio",n),c="501",h=!1}o.cansubtitle?f.currentrecorder==r.VIDEO||f.currentrecorder==r.SCREEN?f.subtitling=f.subtitlevideobydefault:f.subtitling=f.subtitleaudiobydefault:f.subtitling=0;var p={};p.center=!0,p.headerContent=l,p.focusAfterHide=s,p.width=c+"px",h&&(p.height=h+"px");var d=this.getDialogue(p);d.get("width")!=c+"px"&&(d.set("headerContent",l),d.set("width",c+"px"),d.set("height",h+"px")),f.elementid=this.get("host").get("elementid"),f.subtitlecheckbox=e.one("#"+f.elementid+"_"+a.SUBTITLE_CHECKBOX),f.mediainsertcheckbox=e.one("#"+f.elementid+"_"+a.MEDIAINSERT_CHECKBOX),f.languageselect=e.one("#"+f.elementid+"_"+a.LANG_SELECT);var v=e.one("#"+f.elementid+"_"+a.ATTO_CLOUDPOODLL_FORM),m="";if(o.token=="")m=M.util.get_string("notoken",n);else{var g=this._getContext(),y=this;require(["core/templates","core/ajax","core/notification"],function(t,n,r){t.render("atto_cloudpoodll/root",g).then(function(t,n){m=t;var r=e.Node.create(m);d.set("bodyContent",r).show(),b=y,f.subtitlecheckbox!=null&&(o.cansubtitle?f.subtitlecheckbox.on("click",function(e){var t=e.currentTarget;t.get("checked")?(v.all("."+a.CP_SWAP).setAttribute("data-transcribe","1"),v.all("."+a.CP_SWAP).setAttribute("data-subtitle","1"),v.all("."+a.CP_SWAP).setAttribute("data-alreadyparsed","false"),f.subtitling=!0):(v.all("."+a.CP_SWAP).setAttribute("data-transcribe","0"),v.all("."+a.CP_SWAP).setAttribute("data-subtitle","0"),v.all("."+a.CP_SWAP).setAttribute("data-alreadyparsed","false"),f.subtitling=!1),v.all("."+a.CP_SWAP).empty(),y._loadRecorders()}):this._disableSubtitleCheckbox()),f.mediainsertcheckbox!=null&&f.mediainsertcheckbox.on("click",function(e){var t=e.currentTarget;t.get("checked")?f.insertmethod=i.TAGS:f.insertmethod=i.LINK}),f.languageselect!=null&&f.languageselect.on("change",function(e){var t=e.currentTarget;t&&(o.language=t.selectedOptionValue(),v.all("."+a.CP_SWAP).
setAttribute("data-language",o.language),v.all("."+a.CP_SWAP).setAttribute("data-alreadyparsed","false"),v.all("."+a.CP_SWAP).empty(),y._loadRecorders())}),y._loadRecorders()}).fail(function(e){r.exception(e)})})}},_disableSubtitleCheckbox:function(){f.subtitlecheckbox.setAttribute("disabled",!0);var t=e.one("#"+f.elementid+"_"+a.ATTO_CLOUDPOODLL_FORM);t.all("."+a.CP_SWAP).setAttribute("data-transcribe","0"),t.all("."+a.CP_SWAP).setAttribute("data-subtitle","0")},loadHistory:function(){require(["core/templates","core/ajax","core/notification"],function(e,t,n){t.call([{methodname:"atto_cloudpoodll_history_get_items",args:{recordertype:f.currentrecorder},done:function(t){function r(e){var t=new Date(e*1e3),n=t.getUTCMonth()+1,r=t.getUTCDate(),i=t.getUTCFullYear();return n+"/"+r+"/"+i}Array.isArray(t.responses)&&(t.responses.forEach(function(e){e.displaydateofentry=r(e.dateofentry),e.displayfiletitle=e.filetitle.substring(0,f.filetitledisplaylength)+"..."}),t.responses.formatted=JSON.stringify(t.responses));var i={data:t.responses};e.render("atto_cloudpoodll/historypanel",i).then(function(t,n){e.replaceNodeContents('div[data-field="history"]',t,n)}).fail(function(e){n.exception(e)})}}])})},loadHistoryPreview:function(e){require(["core/templates","core/ajax","core/notification"],function(t,n,i){n.call([{methodname:"atto_cloudpoodll_history_get_item",args:{id:e.dataset.historyId},done:function(e){var n={data:e.responses,isVideo:f.currentrecorder===r.VIDEO||f.currentrecorder===r.SCREEN};t.render("atto_cloudpoodll/historypreview",n).then(function(e,n){t.replaceNodeContents('div[data-field="history"]',e,n)}).fail(function(e){i.exception(e)})}}])})},_loadRecorders:function(){var e=this;e.uploaded=!1,e.ap_count=0,require(["atto_cloudpoodll/cloudpoodllloader"],function(t){var n=function(n){switch(n.type){case"recording":n.action==="started"&&f.subtitlecheckbox!=null&&f.subtitlecheckbox.set("disabled",!0);break;case"awaitingprocessing":e.uploaded||(setTimeout(function(){var r=t.fetch_guessed_extension(f.currentrecorder),i=n.sourcefilename.split(".").slice(0,-1).join(".")+"."+r,s=n.s3root+i;e._doInsert(n.mediaurl,n.mediafilename,s,n.sourcemimetype)},4e3),e.uploaded=!0);break;case"filesubmitted":break;case"error":alert("PROBLEM:"+n.message)}};t.init(a.CP_SWAP,n)})},insertHistoryItem:function(e){b.getDialogue({focusAfterHide:null}).hide(),require(["core/ajax"],function(t){t.call([{methodname:"atto_cloudpoodll_history_get_item",args:{id:e.dataset.historyId},done:function(e){var t=e.responses[0],n=b._createMediaLink(t.mediaurl,t.mediafilename,t.sourceurl,t.sourcemimetype);switch(f.insertmethod){case i.TAGS:n.template=b._createMediaTemplate(n.context,t.sourcemimetype,n.template);break;case i.LINK:default:}b._insertIntoEditor(n.template,n.context)}}])})},_createMediaLink:function(e,t,n,r){var i={};i.url=e,i.name=t,i.issubtitling=f.subtitling&&f.subtitling!=="0",i.includesourcetrack=f.transcoding&&e!==n&&n.slice(-3)!=="wav"&&n!==!1,i.CP=o,i.subtitleurl=e+".vtt",i.sourceurl=n,i.sourcemimetype=r;var s=l.HTML_MEDIA.LINK;return{context:i,template:s}},_insertIntoEditor:function(t,n){var r=e.Handlebars.compile(t)(n);this.editor.focus(),this.get("host").insertContentAtFocusPoint(r),this.markUpdated()},_createMediaTemplate:function(e,t,n){return f.currentrecorder===r.VIDEO||f.currentrecorder===r.SCREEN?(e.width=!1,e.height=!1,e.poster=!1,f.transcoding?e.urlmimetype="video/mp4":e.urlmimetype=t,n=l.HTML_MEDIA.VIDEO):(e.width=!1,e.height=!1,e.poster=!1,f.transcoding?e.urlmimetype="audio/mp3":e.urlmimetype=t,n=l.HTML_MEDIA.AUDIO),n},_doInsert:function(e,t,n,r){function a(){require(["core/ajax"],function(i){i.call([{methodname:"atto_cloudpoodll_history_create",args:{recordertype:f.currentrecorder,mediafilename:t,sourceurl:n,mediaurl:e,sourcemimetype:r,subtitling:f.subtitling?1:0,subtitleurl:f.subtitling?e+".vtt":""}}])})}this.getDialogue({focusAfterHide:null}).hide();var s=this._createMediaLink(e,t,n,r),o=s.context,u=s.template;switch(f.insertmethod){case i.TAGS:u=this._createMediaTemplate(o,r,u);break;case i.LINK:break;default:}a(),this._insertIntoEditor(u,o)}},{ATTRS:{disabled:{value:!1}}})},"@VERSION@");
