<?php

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
 * External web services for cloudpoodll history data.
 *
 * @package   atto_cloudpoodll
 * @copyright 2018 Justin Hunt {@link http://www.poodll.com}
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */


defined('MOODLE_INTERNAL') || die;

global $CFG;

require_once($CFG->libdir . "/externallib.php");

/**
 * Defines external services.
 * @package atto_cloudpoodll
 */
class atto_cloudpoodll_history_external extends external_api {
    /**
     * Returns description of method result value
     * @return external_description
     */
    public static function create_history_item_returns() {
        return new external_value(PARAM_BOOL, 'Boolean indicating creation status.');
    }

    /**
     * @param $recordertype
     * @param $mediafilename
     * @param $sourceurl
     * @param $mediaurl
     * @param $sourcemimetype
     * @param int $subtitling
     * @param null $subtitleurl
     * @return bool
     * @throws invalid_parameter_exception
     * @throws restricted_context_exception
     * @throws moodle_exception
     */
    public static function create_history_item(
        $recordertype,
        $mediafilename,
        $sourceurl,
        $mediaurl,
        $sourcemimetype,
        $subtitling = 0,
        $subtitleurl = null
    ) {
        global $USER, $COURSE;

        $params = self::validate_parameters(self::create_history_item_parameters(),
            array(
                'recordertype' => $recordertype,
                'mediafilename' => $mediafilename,
                'sourceurl' => $sourceurl,
                'mediaurl' => $mediaurl,
                'sourcemimetype' => $sourcemimetype,
                'subtitling' => $subtitling,
                'subtitleurl' => $subtitleurl
            ));

        $context = context_user::instance($USER->id);
        self::validate_context($context);

        if (!has_capability('atto/cloudpoodll:visible', $context)) {
            throw new moodle_exception('notavailable');
        }

        $item = new stdClass();
        $item->userid = $USER->id;
        $item->courseid = $COURSE->id;
        $item->filetitle = $params['mediafilename'];
        $item->recordertype = $params['recordertype'];
        $item->mediafilename = $params['mediafilename'];
        $item->mediaurl = $params['mediaurl'];
        $item->sourceurl = $params['sourceurl'];
        $item->sourcemimetype = $params['sourcemimetype'];
        $item->subtitling = empty($params['subtitling']) ? 0 : $params['subtitling'];
        $item->subtitleurl = $params['subtitleurl'];
        $item->archived = "0";
        $item->dateofentry = time();
        $item->userofentry = $USER->id;
        $item->dateofchange = time();
        $item->userofchange = $USER->id;

        $history = new atto_cloudpoodll\history();
        $history->create($item);

        // Trigger event for this media posting
        $params = array(
            'context' => $context,
            'courseid' => $COURSE->id,
            'userid' => $USER->id,
            'other' => array(
                'recordertype' => $recordertype,
                'mediafilename' => $mediafilename,
                'sourceurl' => $sourceurl,
                'mediaurl' => $mediaurl,
                'sourcemimetype' => $sourcemimetype,
                'subtitling' => $subtitling,
                'subtitleurl' => $subtitleurl
            )
        );
        $event = \atto_cloudpoodll\event\media_file_received::create($params);
        $event->trigger();

        return null;
    }

    /**
     * Returns description of method parameters
     * @return external_function_parameters
     */
    public static function create_history_item_parameters() {
        return new external_function_parameters(array(
            'recordertype' => new external_value(PARAM_TEXT, 'Audio or video recorder type'),
            'mediafilename' => new external_value(PARAM_TEXT, 'Media file name'),
            'sourceurl' => new external_value(PARAM_URL, 'Source URL'),
            'mediaurl' => new external_value(PARAM_URL, 'Media URL'),
            'sourcemimetype' => new external_value(PARAM_TEXT, 'Source mimetype'),
            'subtitling' => new external_value(PARAM_INT, 'Subtitling enabled', VALUE_DEFAULT,0),
            'subtitleurl' => new external_value(PARAM_URL, 'Subtitle URL', VALUE_DEFAULT,'')
        ));
    }

    public static function archive_history_item_parameters() {
        return new external_function_parameters(array(
            'id' => new external_value(PARAM_INT, 'ID to be archived')
        ));
    }

    public static function get_history_item_parameters() {
        return new external_function_parameters(array(
            'id' => new external_value(PARAM_INT, 'ID requested')
        ));
    }

    public static function archive_history_item_returns() {
        return null;
    }

    /**
     * @param $itemid Item ID to archive.
     */
    public static function archive_history_item($itemid) {
        $history = new atto_cloudpoodll\history();
        $history->archive($itemid);
    }

    /**
     * @param $itemid Item ID to get.
     */
    public static function get_history_item($itemid) {
        $history = new atto_cloudpoodll\history();
        $data = $history->get_item($itemid);

        return $data;
    }

    /**
     * Gets the history items by user.
     * @param string $recordertype
     * @return array
     * @throws coding_exception
     * @throws dml_exception
     * @throws invalid_parameter_exception
     * @throws moodle_exception
     * @throws restricted_context_exception
     */
    public static function get_history_items($recordertype = '') {
        global $USER;

        $context = context_user::instance($USER->id);
        self::validate_context($context);

        if (!has_capability('atto/cloudpoodll:visible', $context)) {
            throw new moodle_exception('notavailable');
        }
        $history = new atto_cloudpoodll\history();

        return $history->get($recordertype);
    }


    public static function get_history_items_returns() {
        return new external_function_parameters([
            'responses' => new external_multiple_structure(
                new external_single_structure([
                    'id' => new external_value(PARAM_INT, 'ID'),
                    'dateofentry' => new external_value(PARAM_TEXT, 'Date of entry'),
                    'filetitle' => new external_value(PARAM_TEXT, 'File title'),
                    'recordertype' => new external_value(PARAM_TEXT, 'Audio or video recorder type'),
                    'mediaurl' => new external_value(PARAM_URL, 'Media URL'),
                    'mediafilename' => new external_value(PARAM_TEXT, 'Media file name', VALUE_OPTIONAL),
                    'sourceurl' => new external_value(PARAM_URL, 'Source URL', VALUE_OPTIONAL),
                    'sourcemimetype' => new external_value(PARAM_TEXT, 'Source mimetype', VALUE_OPTIONAL),
                    'subtitling' => new external_value(PARAM_INT, 'Subtitling enabled', VALUE_OPTIONAL),
                    'subtitleurl' => new external_value(PARAM_URL, 'Subtitle URL', VALUE_OPTIONAL),
                    'editabletitle' => new external_value(PARAM_RAW, 'Editable Title', VALUE_OPTIONAL),
                ])
            )
        ]);

    }

    public static function get_history_item_returns() {
        return new external_function_parameters([
            'responses' => new external_multiple_structure(
                new external_single_structure([
                    'id' => new external_value(PARAM_INT, 'ID'),
                    'dateofentry' => new external_value(PARAM_TEXT, 'Date of entry'),
                    'filetitle' => new external_value(PARAM_TEXT, 'File title'),
                    'recordertype' => new external_value(PARAM_TEXT, 'Audio or video recorder type'),
                    'mediaurl' => new external_value(PARAM_URL, 'Media URL'),
                    'mediafilename' => new external_value(PARAM_TEXT, 'Media file name', VALUE_OPTIONAL),
                    'sourceurl' => new external_value(PARAM_URL, 'Source URL', VALUE_OPTIONAL),
                    'sourcemimetype' => new external_value(PARAM_TEXT, 'Source mimetype', VALUE_OPTIONAL),
                    'subtitling' => new external_value(PARAM_INT, 'Subtitling enabled', VALUE_OPTIONAL),
                    'subtitleurl' => new external_value(PARAM_URL, 'Subtitle URL', VALUE_OPTIONAL),
                    'editabletitle' => new external_value(PARAM_RAW, 'Editable Title', VALUE_OPTIONAL),
                ])
            )
        ]);

    }

    /**
     * Returns description of method parameters.
     * @return external_function_parameters
     */
    public static function get_history_items_parameters() {
        return new external_function_parameters(
            array(
                'recordertype' => new external_value(PARAM_TEXT, 'recordertype')
            )
        );
    }
}
