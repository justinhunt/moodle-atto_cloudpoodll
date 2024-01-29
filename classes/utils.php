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
 *
 *
 * @package   atto_cloudpoodll
 * @copyright 2018 Justin Hunt {@link http://www.poodll.com}
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace atto_cloudpoodll;

defined('MOODLE_INTERNAL') || die;

class utils {

    //const CLOUDPOODLL = 'https://vbox.poodll.com/cphost';
    const CLOUDPOODLL = 'https://cloud.poodll.com';

    public static function fetch_options_recorders() {
        $rec_options = array(constants::REC_AUDIO => get_string("recorderaudio", constants::M_COMPONENT),
                constants::REC_VIDEO => get_string("recordervideo", constants::M_COMPONENT));
        return $rec_options;
    }

    public static function fetch_options_screenrec() {
        $options = array(constants::SCREENREC_DEFAULT => get_string("screenrecdefault", constants::M_COMPONENT),
            constants::SCREENREC_LOOM => get_string("screenrecloom", constants::M_COMPONENT));
        return $options;
    }
    public static function fetch_options_fallback() {
        $options = array(constants::FALLBACK_UPLOAD => get_string("fallbackupload", constants::M_COMPONENT),
                constants::FALLBACK_IOSUPLOAD => get_string("fallbackiosupload", constants::M_COMPONENT),
                constants::FALLBACK_WARNING => get_string("fallbackwarning", constants::M_COMPONENT));
        return $options;
    }

    public static function fetch_options_skins() {
        $rec_options = array(constants::SKIN_PLAIN => get_string("skinplain", constants::M_COMPONENT),
                constants::SKIN_BMR => get_string("skinbmr", constants::M_COMPONENT),
                constants::SKIN_123 => get_string("skin123", constants::M_COMPONENT),
                constants::SKIN_FRESH => get_string("skinfresh", constants::M_COMPONENT),
                constants::SKIN_ONCE => get_string("skinonce", constants::M_COMPONENT),
                constants::SKIN_SCREEN => get_string("skinscreen", constants::M_COMPONENT));
        return $rec_options;
    }

    public static function get_region_options() {
        return array(
                constants::REGION_USEAST1 => get_string("useast1",constants::M_COMPONENT),
                constants::REGION_TOKYO => get_string("tokyo",constants::M_COMPONENT),
                constants::REGION_SYDNEY => get_string("sydney",constants::M_COMPONENT),
                constants::REGION_DUBLIN => get_string("dublin",constants::M_COMPONENT),
                constants::REGION_OTTAWA => get_string("ottawa",constants::M_COMPONENT),
                constants::REGION_FRANKFURT => get_string("frankfurt",constants::M_COMPONENT),
                constants::REGION_LONDON => get_string("london",constants::M_COMPONENT),
                constants::REGION_SAOPAULO => get_string("saopaulo",constants::M_COMPONENT),
                constants::REGION_SINGAPORE => get_string("singapore",constants::M_COMPONENT),
                constants::REGION_MUMBAI => get_string("mumbai",constants::M_COMPONENT),
                constants::REGION_CAPETOWN => get_string("capetown",constants::M_COMPONENT),
                constants::REGION_BAHRAIN => get_string("bahrain",constants::M_COMPONENT)
        );
    }

    public static function get_expiredays_options() {
        return array(
                "1" => "1",
                "3" => "3",
                "7" => "7",
                "30" => "30",
                "90" => "90",
                "180" => "180",
                "365" => "365",
                "730" => "730",
                "9999" => get_string('forever', constants::M_COMPONENT)
        );
    }

    public static function get_lang_options() {
        return array(
                constants::LANG_ENUS => get_string('en-us', constants::M_COMPONENT),
                constants::LANG_ENAU => get_string('en-au', constants::M_COMPONENT),
                constants::LANG_ENGB => get_string('en-gb', constants::M_COMPONENT),
                constants::LANG_ENIE => get_string('en-ie', constants::M_COMPONENT),
                constants::LANG_ENWL => get_string('en-wl', constants::M_COMPONENT),
                constants::LANG_ENAB => get_string('en-ab', constants::M_COMPONENT),
                constants::LANG_ENIN => get_string('en-in', constants::M_COMPONENT),
                constants::LANG_ARAE => get_string('ar-ae', constants::M_COMPONENT),
                constants::LANG_ARSA => get_string('ar-sa', constants::M_COMPONENT),
                constants::LANG_ESES => get_string('es-es', constants::M_COMPONENT),
                constants::LANG_ESUS => get_string('es-us', constants::M_COMPONENT),
                constants::LANG_FRCA => get_string('fr-ca', constants::M_COMPONENT),
                constants::LANG_FRFR => get_string('fr-fr', constants::M_COMPONENT),
                constants::LANG_ITIT => get_string('it-it', constants::M_COMPONENT),
                constants::LANG_PTPT => get_string('pt-pt', constants::M_COMPONENT),
                constants::LANG_PTBR => get_string('pt-br', constants::M_COMPONENT),
                constants::LANG_JAJP => get_string('ja-jp', constants::M_COMPONENT),
                constants::LANG_KOKR => get_string('ko-kr', constants::M_COMPONENT),
                constants::LANG_ZHCN => get_string('zh-cn', constants::M_COMPONENT),
                constants::LANG_DEDE => get_string('de-de', constants::M_COMPONENT),
                constants::LANG_DECH => get_string('de-ch', constants::M_COMPONENT),
                constants::LANG_NLNL => get_string('nl-nl', constants::M_COMPONENT),
                constants::LANG_HIIN => get_string('hi-in', constants::M_COMPONENT),
                constants::LANG_TAIN => get_string('ta-in', constants::M_COMPONENT),
                constants::LANG_TEIN => get_string('te-in', constants::M_COMPONENT),
                constants::LANG_RURU => get_string('ru-ru', constants::M_COMPONENT),
                constants::LANG_FAIR => get_string('fa-ir', constants::M_COMPONENT),
                constants::LANG_HEIL => get_string('he-il', constants::M_COMPONENT),
                constants::LANG_IDID => get_string('id-id', constants::M_COMPONENT),
                constants::LANG_MSMY => get_string('ms-my', constants::M_COMPONENT),
                constants::LANG_TRTR => get_string('tr-tr', constants::M_COMPONENT)
        );
    }

    public static function get_insert_options() {
        return array(
                constants::INSERT_LINK => get_string('insertlinks', constants::M_COMPONENT),
                constants::INSERT_TAGS => get_string('inserttags', constants::M_COMPONENT)
        );
    }

    //are we willing and able to transcribe submissions?
    public static function can_transcribe($instance) {
        //The regions that can transcribe
        switch($instance->awsregion){

            default:
                $ret = true;
        }
        return $ret;
    }

    //we use curl to fetch transcripts from AWS and Tokens from cloudpoodll
    //this is our helper
    public static function curl_fetch($url, $postdata = false) {
        global $CFG;

        require_once($CFG->libdir . '/filelib.php');
        $curl = new \curl();

        $result = $curl->get($url, $postdata);
        return $result;
    }

    //This is called from the settings page and we do not want to make calls out to cloud.poodll.com on settings
    //page load, for performance and stability issues. So if the cache is empty and/or no token, we just show a
    //"refresh token" links
    public static function fetch_token_for_display($apiuser, $apisecret) {
        global $CFG;

        //First check that we have an API id and secret
        //refresh token
        $refresh = \html_writer::link($CFG->wwwroot . '/lib/editor/atto/plugins/cloudpoodll/refreshtoken.php',
                        get_string('refreshtoken', constants::M_COMPONENT)) . '<br>';

        $message = '';
        $apiuser = trim($apiuser);
        $apisecret = trim($apisecret);
        if (empty($apiuser)) {
            $message .= get_string('noapiuser', constants::M_COMPONENT) . '<br>';
        }
        if (empty($apisecret)) {
            $message .= get_string('noapisecret', constants::M_COMPONENT);
        }

        if (!empty($message)) {
            return $refresh . $message;
        }

        //Fetch from cache and process the results and display
        $cache = \cache::make_from_params(\cache_store::MODE_APPLICATION, constants::M_COMPONENT, 'token');
        $tokenobject = $cache->get('recentpoodlltoken');

        //if we have no token object the creds were wrong ... or something
        if (!($tokenobject)) {
            $message = get_string('notokenincache', constants::M_COMPONENT);
            //if we have an object but its no good, creds werer wrong ..or something
        } else if (!property_exists($tokenobject, 'token') || empty($tokenobject->token)) {
            $message = get_string('credentialsinvalid', constants::M_COMPONENT);
            //if we do not have subs, then we are on a very old token or something is wrong, just get out of here.
        } else if (!property_exists($tokenobject, 'subs')) {
            $message = 'No subscriptions found at all';
        }
        if (!empty($message)) {
            return $refresh . $message;
        }

        //we have enough info to display a report. Lets go.
        foreach ($tokenobject->subs as $sub) {
            $sub->expiredate = date('d/m/Y', $sub->expiredate);
            $message .= get_string('displaysubs', constants::M_COMPONENT, $sub) . '<br>';
        }
        //Is app authorised
        if (in_array(constants::M_COMPONENT, $tokenobject->apps)) {
            $message .= get_string('appauthorised', constants::M_COMPONENT) . '<br>';
        } else {
            $message .= get_string('appnotauthorised', constants::M_COMPONENT) . '<br>';
        }

        return $refresh . $message;

    }

    //We need a Poodll token to make this happen
    public static function fetch_token($apiuser, $apisecret, $force = false) {

        $cache = \cache::make_from_params(\cache_store::MODE_APPLICATION, constants::M_COMPONENT, 'token');
        $tokenobject = $cache->get('recentpoodlltoken');
        $tokenuser = $cache->get('recentpoodlluser');
        $apiuser = trim($apiuser);
        $apisecret = trim($apisecret);

        //if we got a token and its less than expiry time
        // use the cached one
        if ($tokenobject && $tokenuser && $tokenuser == $apiuser && !$force) {
            if ($tokenobject->validuntil == 0 || $tokenobject->validuntil > time()) {
                return $tokenobject->token;
            }
        }

        // Send the request & save response to $resp
        $token_url = self::CLOUDPOODLL .  "/local/cpapi/poodlltoken.php";
        $postdata = array(
                'username' => $apiuser,
                'password' => $apisecret,
                'service' => 'cloud_poodll'
        );
        $token_response = self::curl_fetch($token_url, $postdata);
        if ($token_response) {
            $resp_object = json_decode($token_response);
            if ($resp_object && property_exists($resp_object, 'token')) {
                $token = $resp_object->token;
                //store the expiry timestamp and adjust it for diffs between our server times
                if ($resp_object->validuntil) {
                    $validuntil = $resp_object->validuntil - ($resp_object->poodlltime - time());
                    //we refresh one hour out, to prevent any overlap
                    $validuntil = $validuntil - (1 * HOURSECS);
                } else {
                    $validuntil = 0;
                }

                //cache the token
                $tokenobject = new \stdClass();
                $tokenobject->token = $token;
                $tokenobject->validuntil = $validuntil;
                $tokenobject->subs = false;
                $tokenobject->apps = false;
                $tokenobject->sites = false;
                if (property_exists($resp_object, 'subs')) {
                    $tokenobject->subs = $resp_object->subs;
                }
                if (property_exists($resp_object, 'apps')) {
                    $tokenobject->apps = $resp_object->apps;
                }
                if (property_exists($resp_object, 'sites')) {
                    $tokenobject->sites = $resp_object->sites;
                }
                $cache->set('recentpoodlltoken', $tokenobject);
                $cache->set('recentpoodlluser', $apiuser);

            } else {
                $token = '';
                if ($resp_object && property_exists($resp_object, 'error')) {
                    //ERROR = $resp_object->error
                }
            }
        } else {
            $token = '';
        }
        return $token;
    }

    public static function fetch_loom_token($cloudpoodlltoken,$region) {
        global $USER;

        //The REST API we are calling
        $functionname = 'local_cpapi_fetch_loom_token';

        $params = array();
        $params['wstoken'] = $cloudpoodlltoken;
        $params['wsfunction'] = $functionname;
        $params['moodlewsrestformat'] = 'json';
        $params['region'] = $region;


        //log.debug(params);

        $serverurl = self::CLOUDPOODLL . '/webservice/rest/server.php';
        $response = self::curl_fetch($serverurl, $params);
        if (!self::is_json($response)) {
            return false;
        }
        $payloadobject = json_decode($response);

        //returnCode > 0  indicates an error
        if (!isset($payloadobject->returnCode) || $payloadobject->returnCode > 0) {
            return false;
            //if all good, then lets do the embed
        } else if ($payloadobject->returnCode === 0) {
            $loomtoken = $payloadobject->returnMessage;
            return $loomtoken;
        } else {
            return false;
        }
    }

    //see if this is truly json or some error
    public static function is_json($string) {
        if (!$string) {
            return false;
        }
        if (empty($string)) {
            return false;
        }
        json_decode($string);
        return (json_last_error() == JSON_ERROR_NONE);
    }
}