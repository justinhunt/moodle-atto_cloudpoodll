<?php
/**
 * Created by PhpStorm.
 * User: ishineguy
 * Date: 2018/06/16
 * Time: 19:31
 */

namespace atto_cloudpoodll;


class utils
{

    public static function fetch_options_recorders(){
        $rec_options = array( constants::REC_AUDIO => get_string("recorderaudio", constants::M_COMPONENT),
            constants::REC_VIDEO  => get_string("recordervideo", constants::M_COMPONENT));
        return $rec_options;
    }

    public static function fetch_options_fallback(){
        $options = array( constants::FALLBACK_UPLOAD => get_string("fallbackupload", constants::M_COMPONENT),
            constants::FALLBACK_IOSUPLOAD  => get_string("fallbackiosupload", constants::M_COMPONENT),
            constants::FALLBACK_WARNING  => get_string("fallbackwarning", constants::M_COMPONENT));
        return $options;
    }

    public static function fetch_options_skins(){
        $rec_options = array( constants::SKIN_PLAIN => get_string("skinplain", constants::M_COMPONENT),
            constants::SKIN_BMR => get_string("skinbmr", constants::M_COMPONENT),
            constants::SKIN_123 => get_string("skin123", constants::M_COMPONENT),
            constants::SKIN_FRESH => get_string("skinfresh", constants::M_COMPONENT),
            constants::SKIN_ONCE => get_string("skinonce", constants::M_COMPONENT));
        return $rec_options;
    }

    public static function get_region_options(){
        return array(
            "useast1" => get_string("useast1",constants::M_COMPONENT),
            "tokyo" => get_string("tokyo",constants::M_COMPONENT),
            "sydney" => get_string("sydney",constants::M_COMPONENT),
            "dublin" => get_string("dublin",constants::M_COMPONENT)
        );
    }

    public static function get_expiredays_options(){
        return array(
            "1"=>"1",
            "3"=>"3",
            "7"=>"7",
            "30"=>"30",
            "90"=>"90",
            "180"=>"180",
            "365"=>"365",
            "730"=>"730",
            "9999"=>get_string('forever',constants::M_COMPONENT)
        );
    }

    public static function get_lang_options()
    {
        return array(
            constants::LANG_ENUS => get_string('en-us', constants::M_COMPONENT),
            constants::LANG_ESUS => get_string('es-us', constants::M_COMPONENT)
        );
    }

    public static function get_insert_options()
    {
        return array(
            constants::INSERT_LINK => get_string('insertlinks', constants::M_COMPONENT),
            constants::INSERT_TAGS => get_string('inserttags', constants::M_COMPONENT)
        );
    }

    //are we willing and able to transcribe submissions?
    public static function can_transcribe($instance)
    {
        //we default to true
        //but it only takes one no ....
        $ret = true;

        //The regions that can transcribe
        switch($instance->awsregion){
            case "useast1":
            case "dublin":
            case "sydney":
                break;
            default:
                $ret = false;
        }
        return $ret;
    }

    //we use curl to fetch transcripts from AWS and Tokens from cloudpoodll
    //this is our helper
    public static function curl_fetch($url){
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HEADER, false);
        $data = curl_exec($curl);
        curl_close($curl);
        return $data;
    }

    //We need a Poodll token to make this happen
    public static function fetch_token($apiuser, $apisecret)
    {

        $cache = \cache::make_from_params(\cache_store::MODE_APPLICATION, constants::M_COMPONENT, 'token');
        $tokenobject = $cache->get('recentpoodlltoken');
        $tokenuser = $cache->get('recentpoodlluser');

        //if we got a token and its less than expiry time
        // use the cached one
        if($tokenobject && $tokenuser && $tokenuser==$apiuser){
            if($tokenobject->validuntil == 0 || $tokenobject->validuntil > time()){
                return $tokenobject->token;
            }
        }

        // Send the request & save response to $resp
        $token_url ="https://cloud.poodll.com/local/cpapi/poodlltoken.php?username=$apiuser&password=$apisecret&service=cloud_poodll";
        $token_response = self::curl_fetch($token_url);
        if ($token_response) {
            $resp_object = json_decode($token_response);
            if($resp_object && property_exists($resp_object,'token')) {
                $token = $resp_object->token;
                //store the expiry timestamp and adjust it for diffs between our server times
                if($resp_object->validuntil) {
                    $validuntil = $resp_object->validuntil - ($resp_object->poodlltime - time());
                    //we refresh one hour out, to prevent any overlap
                    $validuntil = $validuntil - (1 * HOURSECS);
                }else{
                    $validuntil = 0;
                }

                //cache the token
                $tokenobject = new \stdClass();
                $tokenobject->token = $token;
                $tokenobject->validuntil = $validuntil;
                $cache->set('recentpoodlltoken', $tokenobject);
                $cache->set('recentpoodlluser', $apiuser);

            }else{
                $token = '';
                if($resp_object && property_exists($resp_object,'error')) {
                    //ERROR = $resp_object->error
                }
            }
        }else{
            $token='';
        }
        return $token;
    }
}