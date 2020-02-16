<?php
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

/**
 * Atto text editor integration version file.
 *
 * @package    atto_cloudpoodll
 * @copyright  2018 Justin Hunt <poodllsupport@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

use atto_cloudpoodll\constants;
use atto_cloudpoodll\utils;
use core\output\inplace_editable;

/**
 * Initialise this plugin
 *
 * @param string $elementid
 */
function atto_cloudpoodll_strings_for_js() {
    global $PAGE;
    $langstrings=[];
    foreach(utils::get_lang_options() as $key=>$value){
        $langstrings[]= strtolower($key);
    };
    $otherstrings = array('createaudio', 'createvideo', 'insert', 'cancel', 'audio', 'video', 'upload', 'subtitle', 'options',
            'history','subtitlecheckbox', 'mediainsertcheckbox', 'subtitleinstructions', 'audio_desc', 'video_desc',
            'speakerlanguage', 'uploadinstructions', 'cannotsubtitle','notoken');
    $strings = array_merge($langstrings ,$otherstrings);
    $PAGE->requires->strings_for_js( $strings, constants::M_COMPONENT);
}

/**
 * Return the js params required for this module.
 *
 * @return array of additional params to pass to javascript init function for this module.
 */
function atto_cloudpoodll_params_for_js($elementid, $options, $fpoptions) {
    global $COURSE, $USER;

    $config = get_config('atto_cloudpoodll');

    //coursecontext
    $context = $options['context'];
    if (!$context) {
        $context = context_course::instance($COURSE->id);
    }
    $disabled = false;

    //If they don't have permission don't show it
    if (!has_capability('atto/cloudpoodll:visible', $context)) {
        $disabled = true;
    }

    //subitling ok
    $cansubtitle = utils::can_transcribe($config) &&
            $config->enablesubtitling &&
            has_capability('atto/cloudpoodll:allowsubtitling', $context);

    //cloudpoodll params
    $params['cp_expiredays'] = $config->expiredays;
    $params['cp_cansubtitle'] = $cansubtitle;
    $params['cp_token'] = utils::fetch_token($config->apiuser, $config->apisecret);
    $params['cp_region'] = $config->awsregion;
    $params['cp_language'] = $config->language;
    $params['cp_expiredays'] = $config->expiredays;
    $params['cp_transcode'] = $config->transcode;
    $params['cp_audioskin'] = $config->audioskin;
    $params['cp_videoskin'] = $config->videoskin;
    $params['cp_fallback'] = $config->fallback;
    $params['cp_owner'] = hash('md5',$USER->username);

    //insert method
    $params['insertmethod'] = $config->insertmethod;
    $params['subtitleaudiobydefault'] = $config->subtitleaudiobydefault;
    $params['subtitlevideobydefault'] = $config->subtitlevideobydefault;

    //add our disabled param
    $params['disabled'] = $disabled;

    $params['filetitle_displaylength'] = constants::FILETITLE_DISPLAYLENGTH;

    //add icons to editor if the permissions and settings are all ok
    $recorders = array('audio', 'video');
    foreach ($recorders as $recorder) {
        $enablemedia = get_config('atto_cloudpoodll', 'enable' . $recorder);
        if ($enablemedia && has_capability('atto/cloudpoodll:allow' . $recorder, $context)) {
            $params[$recorder] = true;
        }
    }

    return $params;
}

function atto_cloudpoodll_inplace_editable($itemtype, $itemid, $newvalue) {
    if ($itemtype === 'filetitle') {
        global $DB, $USER;
        $record = $DB->get_record('cloudpoodll_history', array('id' => $itemid), '*', MUST_EXIST);
        external_api::validate_context(context_system::instance());
        require_capability('atto/cloudpoodll:visible', context_system::instance());
        $newvalue = clean_param($newvalue, PARAM_TEXT);

        $updateditem = new stdClass();
        $updateditem->id = $itemid;
        $updateditem->filetitle = $newvalue;
        $updateditem->dateofchange = time();
        $updateditem->userofchange = $USER->id;

        $history = new atto_cloudpoodll\history();
        $history->update($updateditem);

        $record->name = $newvalue;
        return new inplace_editable('atto_cloudpoodll',
            'filetitle',
            $itemid,
            true,
            shorten_text(format_string($newvalue), constants::FILETITLE_DISPLAYLENGTH),
            $newvalue,
            'Edit file DISPLAY title',
            'New value for ' . format_string($newvalue)
        );
    }
    return true;
}