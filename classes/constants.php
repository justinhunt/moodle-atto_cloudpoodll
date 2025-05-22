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

class constants {

    const M_COMPONENT = 'atto_cloudpoodll';
    const M_DEFAULT_CLOUDPOODLL = 'cloud.poodll.com';
    const M_TABLE = 'atto_cpoodll';
    const M_SUBPLUGIN = 'cloudpoodll';
    const M_URL='lib/editor/atto/plugins/cloudpoodll';

    const APPID = 'atto_cloudpoodll';

    const REC_AUDIO = 'audio';
    const REC_VIDEO = 'video';

    const SKIN_PLAIN = 'standard';
    const SKIN_BMR = 'bmr';
    const SKIN_123 = 'onetwothree';
    const SKIN_FRESH = 'fresh';
    const SKIN_ONCE = 'once';
    const SKIN_SCREEN = 'screen';

    const SCREENREC_DEFAULT = 'default';
    const SCREENREC_LOOM = 'loom';

    const LANG_ENUS = 'en-US';
    const LANG_ENGB = 'en-GB';
    const LANG_ENAU = 'en-AU';
    const LANG_ENIN = 'en-IN';
    const LANG_ESUS = 'es-US';
    const LANG_ESES = 'es-ES';
    const LANG_FRCA = 'fr-CA';
    const LANG_FRFR = 'fr-FR';
    const LANG_DEDE = 'de-DE';
    const LANG_ITIT = 'it-IT';
    const LANG_PTBR = 'pt-BR';
    const LANG_DADK = 'da-DK';
    const LANG_KOKR = 'ko-KR';
    const LANG_HIIN = 'hi-IN';
    const LANG_ARAE ='ar-AE';
    const LANG_ARSA ='ar-SA';
    const LANG_ZHCN ='zh-CN';
    const LANG_NLNL ='nl-NL';
    const LANG_ENIE ='en-IE';
    const LANG_ENWL ='en-WL';
    const LANG_ENAB ='en-AB';
    const LANG_FAIR ='fa-IR';
    const LANG_DECH ='de-CH';
    const LANG_HEIL ='he-IL';
    const LANG_IDID ='id-ID';
    const LANG_JAJP ='ja-JP';
    const LANG_MSMY ='ms-MY';
    const LANG_PTPT ='pt-PT';
    const LANG_RURU ='ru-RU';
    const LANG_TAIN ='ta-IN';
    const LANG_TEIN ='te-IN';
    const LANG_TRTR ='tr-TR';
    const LANG_NONO ='no-NO';
    const LANG_NBNO ='nb-NO';
    const LANG_NNNO ='nn-NO';
    const LANG_PLPL ='pl-PL';
    const LANG_RORO ='ro-RO';
    const LANG_SVSE ='sv-SE';
    const LANG_UKUA ='uk-UA';
    const LANG_EUES ='eu-ES';
    const LANG_FIFI ='fi-FI';
    const LANG_HUHU ='hu-HU';
    const LANG_MINZ ='mi-NZ';
    const LANG_BGBG = 'bg-BG';
    const LANG_CSCZ = 'cs-CZ';
    const LANG_ELGR = 'el-GR';
    const LANG_HRHR = 'hr-HR';
    const LANG_LTLT = 'lt-LT';
    const LANG_LVLV = 'lv-LV';
    const LANG_SKSK = 'sk-SK';
    const LANG_SLSI = 'sl-SI';
    const LANG_ISIS = 'is-IS';
    const LANG_MKMK = 'mk-MK';
    const LANG_SRRS = 'sr-RS';
    const LANG_VIVN = 'vi-VN';

    const INSERT_LINK = 'link';
    const INSERT_TAGS = 'tags';

    const FALLBACK_UPLOAD = 'upload';
    const FALLBACK_IOSUPLOAD = 'iosupload';
    const FALLBACK_WARNING = 'warning';

    const CLASS_REC_CONTAINER = 'atto_cloudpoodll_rec_cont';
    const CLASS_REC_OUTER = 'atto_cloudpoodll_rec_outer';
    const ID_REC = 'atto_cloudpoodll_therecorder';
    const ID_UPDATE_CONTROL = 'atto_cloudpoodll_updatecontrol';
    const NAME_UPDATE_CONTROL = 'filename';

    const REGION_USEAST1 = 'useast1';
    const REGION_TOKYO = 'tokyo';
    const REGION_DUBLIN = 'dublin';
    const REGION_SYDNEY = 'sydney';
    const REGION_OTTAWA = 'ottawa';
    const REGION_SAOPAULO = 'saopaulo';
    const REGION_FRANKFURT = 'frankfurt';
    const REGION_LONDON = 'london';
    const REGION_SINGAPORE = 'singapore';
    const REGION_MUMBAI = 'mumbai';
    const REGION_CAPETOWN = 'capetown';
    const REGION_BAHRAIN = 'bahrain';
    const REGION_NINGXIA = 'ningxia';

    const FILETITLE_DISPLAYLENGTH = 30;

}