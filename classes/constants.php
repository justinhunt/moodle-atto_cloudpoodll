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
    const LANG_ESUS = 'es-US';
    const LANG_FRCA = 'fr-CA';
    const LANG_FRFR = 'fr-FR';
    const LANG_ITIT = 'it-IT';
    const LANG_PTBR = 'pt-BR';
    const LANG_KOKR = 'ko-KR';
    const LANG_DEDE = 'de-DE';
    const LANG_HIIN = 'hi-IN';
    const LANG_ENIN = 'en-IN';
    const LANG_ESES = 'es-ES';

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

    const FILETITLE_DISPLAYLENGTH = 30;

}