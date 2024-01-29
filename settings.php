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
 * This file defines the admin settings for this plugin
 *
 * @package   atto_cloudpoodll
 * @copyright 2018 Justin Hunt {@link http://www.poodll.com}
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

use atto_cloudpoodll\constants;
use atto_cloudpoodll\utils;

if ($ADMIN->fulltree) {

    $settings->add(new admin_setting_configtext(constants::M_COMPONENT . '/apiuser',
            get_string('apiuser', constants::M_COMPONENT), get_string('apiuser_details', constants::M_COMPONENT),
            '', PARAM_TEXT));

    $cloudpoodll_apiuser=get_config(constants::M_COMPONENT,'apiuser');
    $cloudpoodll_apisecret=get_config(constants::M_COMPONENT,'apisecret');
    $show_below_apisecret='';
//if we have an API user and secret we fetch token
    if(!empty($cloudpoodll_apiuser) && !empty($cloudpoodll_apisecret)) {
        $tokeninfo = utils::fetch_token_for_display($cloudpoodll_apiuser,$cloudpoodll_apisecret);
        $show_below_apisecret=$tokeninfo;
//if we have no API user and secret we show a "fetch from elsewhere on site" or "take a free trial" link
    }else{
        $amddata=['apppath'=>$CFG->wwwroot . '/' .constants::M_URL];
        $cp_components=['filter_poodll','qtype_cloudpoodll','mod_readaloud','mod_wordcards','mod_solo','mod_minilesson','mod_englishcentral','mod_pchat',
            'tinymce_cloudpoodll', 'assignsubmission_cloudpoodll','assignfeedback_cloudpoodll'];
        foreach($cp_components as $cp_component){
            switch($cp_component){
                case 'filter_poodll':
                    $apiusersetting='cpapiuser';
                    $apisecretsetting='cpapisecret';
                    break;
                case 'mod_englishcentral':
                    $apiusersetting='poodllapiuser';
                    $apisecretsetting='poodllapisecret';
                    break;
                default:
                    $apiusersetting='apiuser';
                    $apisecretsetting='apisecret';
            }
            $cloudpoodll_apiuser=get_config($cp_component,$apiusersetting);
            if(!empty($cloudpoodll_apiuser)){
                $cloudpoodll_apisecret=get_config($cp_component,$apisecretsetting);
                if(!empty($cloudpoodll_apisecret)){
                    $amddata['apiuser']=$cloudpoodll_apiuser;
                    $amddata['apisecret']=$cloudpoodll_apisecret;
                    break;
                }
            }
        }
        $show_below_apisecret=$OUTPUT->render_from_template( constants::M_COMPONENT . '/managecreds',$amddata);
    }

    //get_string('apisecret_details', constants::M_COMPONENT)
    $settings->add(new admin_setting_configtext(constants::M_COMPONENT . '/apisecret',
            get_string('apisecret', constants::M_COMPONENT), $show_below_apisecret,
            '', PARAM_TEXT));

    $regions = utils::get_region_options();
    $settings->add(new admin_setting_configselect(constants::M_COMPONENT . '/awsregion',
            get_string('awsregion', constants::M_COMPONENT),
            '', constants::REGION_USEAST1, $regions));

    $expiredays = utils::get_expiredays_options();
    $settings->add(new admin_setting_configselect(constants::M_COMPONENT . '/expiredays',
            get_string('expiredays', constants::M_COMPONENT),
            '', '365', $expiredays));

    $insertoptions = utils::get_insert_options();
    $settings->add(new admin_setting_configselect(constants::M_COMPONENT . '/insertmethod',
            get_string('insertmethod', constants::M_COMPONENT),
            get_string('insertmethod_details', constants::M_COMPONENT), constants::INSERT_TAGS, $insertoptions));

    $settings->add(new admin_setting_configcheckbox(constants::M_COMPONENT . '/enablesubtitling',
            get_string('enablesubtitling', constants::M_COMPONENT), get_string('enablesubtitling_details', constants::M_COMPONENT),
            1));

    $settings->add(new admin_setting_configcheckbox(constants::M_COMPONENT . '/subtitleaudiobydefault',
            get_string('subtitleaudiobydefault', constants::M_COMPONENT),
            get_string('subtitlebydefault_details', constants::M_COMPONENT), 0));
    $settings->add(new admin_setting_configcheckbox(constants::M_COMPONENT . '/subtitlevideobydefault',
            get_string('subtitlevideobydefault', constants::M_COMPONENT),
            get_string('subtitlebydefault_details', constants::M_COMPONENT), 0));

    $settings->add(new admin_setting_configcheckbox(constants::M_COMPONENT . '/transcode',
            get_string('transcode', constants::M_COMPONENT),
            get_string('transcode_details', constants::M_COMPONENT), 1));

    $settings->add(new admin_setting_configcheckbox(constants::M_COMPONENT . '/enableaudio',
            get_string('enableaudio', constants::M_COMPONENT), '', 1));
    $settings->add(new admin_setting_configcheckbox(constants::M_COMPONENT . '/enablevideo',
            get_string('enablevideo', constants::M_COMPONENT), '', 1));
    $settings->add(new admin_setting_configcheckbox(constants::M_COMPONENT . '/enablescreen',
            get_string('enablescreen', constants::M_COMPONENT), '', 1));
    $settings->add(new admin_setting_configcheckbox(constants::M_COMPONENT . '/enablewidgets',
        get_string('enablewidgets', constants::M_COMPONENT), '', 1));

    $langoptions = utils::get_lang_options();
    $settings->add(new admin_setting_configselect(constants::M_COMPONENT . '/language',
            get_string('language', constants::M_COMPONENT),
            '', constants::LANG_ENUS, $langoptions));

    $settings->add(new admin_setting_configcheckbox(constants::M_COMPONENT . '/showhistory',
            get_string('showhistory', constants::M_COMPONENT), get_string('showhistory_details', constants::M_COMPONENT),
            1));

    $settings->add(new admin_setting_configcheckbox(constants::M_COMPONENT . '/showoptions',
        get_string('showoptions', constants::M_COMPONENT), get_string('showoptions_details', constants::M_COMPONENT),
        1));

    $settings->add(new admin_setting_configcheckbox(constants::M_COMPONENT . '/showupload',
        get_string('showupload', constants::M_COMPONENT), get_string('showupload_details', constants::M_COMPONENT),
        1));


    $skinoptions = utils::fetch_options_skins();
    unset($skinoptions[constants::SKIN_ONCE]);
    $settings->add(new admin_setting_configselect(constants::M_COMPONENT . '/audioskin',
            get_string('audioskin', constants::M_COMPONENT),
            '', constants::SKIN_FRESH, $skinoptions));

    $skinoptions = utils::fetch_options_skins();
    unset($skinoptions[constants::SKIN_FRESH]);
    unset($skinoptions[constants::SKIN_ONCE]);
    $settings->add(new admin_setting_configselect(constants::M_COMPONENT . '/videoskin',
            get_string('videoskin', constants::M_COMPONENT),
            '', constants::SKIN_123, $skinoptions));

    //Default html5 fallback
    $fallback_options = utils::fetch_options_fallback();
    $settings->add(new admin_setting_configselect(constants::M_COMPONENT . '/fallback',
            new lang_string('fallback', constants::M_COMPONENT),
            new lang_string('fallbackdetails', constants::M_COMPONENT), constants::FALLBACK_WARNING, $fallback_options));

    $screenrecoptions = utils::fetch_options_screenrec();
    $settings->add(new admin_setting_configselect(constants::M_COMPONENT . '/screenrecorder',
        get_string('screenrecorder', constants::M_COMPONENT),
        get_string('screenrecorder_details', constants::M_COMPONENT), constants::SCREENREC_DEFAULT, $screenrecoptions));

}
