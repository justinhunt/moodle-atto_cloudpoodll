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

/**
 * Initialise this plugin
 * @param string $elementid
 */
function atto_cloudpoodll_strings_for_js() {
    global $PAGE;

    $PAGE->requires->strings_for_js(
        array('createaudio','createvideo','insert','cancel','audio','video','upload',
            'audio_desc','video_desc'), constants::M_COMPONENT);
}

/**
 * Return the js params required for this module.
 * @return array of additional params to pass to javascript init function for this module.
 */
function atto_cloudpoodll_params_for_js($elementid, $options, $fpoptions) {
	global $COURSE;

	$config = get_config('atto_cloudpoodll');

	//coursecontext
	$coursecontext=context_course::instance($COURSE->id);
	$disabled=false;

    //If they don't have permission don't show it
    if(!has_capability('atto/cloudpoodll:visible', $coursecontext) ){
        $disabled=true;
     }

     //subitling ok
     $cansubtitle = $config->awsregion != constants::REGION_TOKYO &&
            $config->enablesubtitling &&
            has_capability('atto/cloudpoodll:allowsubtitling', $coursecontext);

     //cloudpoodll params
    $params['cp_expiredays'] = $config->expiredays;
    $params['cp_cansubtitle'] = $cansubtitle;
    $params['cp_token'] = utils::fetch_token($config->apiuser,$config->apisecret);
    $params['cp_region'] = $config->awsregion;
    $params['cp_language'] = $config->language;
    $params['cp_expiredays'] = $config->expiredays;
    $params['cp_transcode'] = "1";
    $params['cp_audioskin'] = $config->audioskin;
    $params['cp_videoskin'] = $config->videoskin;
    $params['cp_fallback'] = $config->fallback;



//add our disabled param
    $params['disabled'] = $disabled;

    //add icons to editor if the permissions and settings are all ok
    $recorders = array('audio','video');
    foreach($recorders as $recorder){
        $enablemedia = get_config('atto_cloudpoodll','enable' . $recorder);
        if($enablemedia && has_capability('atto/cloudpoodll:allow' . $recorder, $coursecontext)){
            $params[$recorder]=true;
        }
    }

    return $params;
}
