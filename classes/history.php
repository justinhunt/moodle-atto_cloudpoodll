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
 * Manager for cloudpoodll history data.
 *
 * @package   atto_cloudpoodll
 * @copyright 2018 Justin Hunt {@link http://www.poodll.com}
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace atto_cloudpoodll;

use coding_exception;
use context_user;
use core\output\inplace_editable;
use dml_exception;
use stdClass;

defined('MOODLE_INTERNAL') || die;
global $CFG;

/**
 * CRUD management for history.
 * @package atto_cloudpoodll
 */
class history {
    /**
     * Defines the table used for cloudpoodll history calls.
     */
    const CLOUDPOODLL_HISTORY_TABLE = 'cloudpoodll_history';

    /** @var DB object */
    protected $db;

    /** @var user object */
    protected $user;

    /**
     * history constructor.
     */
    public function __construct() {
        global $DB, $USER;

        $this->db = $DB;
        $this->user = $USER;
    }

    /**
     * @param $historyitem
     * @return bool|int
     * @throws dml_exception
     */
    public function create($historyitem) {
        return $this->db->insert_record(self::CLOUDPOODLL_HISTORY_TABLE, $historyitem, true);
    }

    /**
     * @param string $recordertype
     * @return array
     * @throws coding_exception
     * @throws dml_exception
     */
    public function get($recordertype = '') {
        global $USER, $OUTPUT;

        $searchparams = ['userid' => $this->user->id, 'archived' => "0"];

        if (!empty($recordertype)) {
            $searchparams['recordertype'] = $recordertype;
        }

        $items = [];
        $records = $this->db->get_records(
            self::CLOUDPOODLL_HISTORY_TABLE,
            $searchparams,
            'dateofentry DESC'
        );

        $items['responses'] = $records;
        $context = context_user::instance($USER->id);

        foreach ($items['responses'] as $item) {
            $tmpl = new inplace_editable(
                'atto_cloudpoodll',
                'filetitle',
                $item->id,
                has_capability('atto/cloudpoodll:visible', $context),
                shorten_text(format_string($item->filetitle), constants::FILETITLE_DISPLAYLENGTH),
                $item->filetitle,
                'Edit file display title',
                'New value for ' . format_string($item->filetitle));
            $item->editabletitle = $OUTPUT->render($tmpl);
        }

        return $items;
    }

    /**
     * @param $itemid
     * @return array
     * @throws dml_exception
     */
    public function get_item($itemid) {
        $searchparams = [
            'id' => $itemid,
            'userid' => $this->user->id,
            'archived' => "0"
        ];

        $data = (array)$this->db->get_record(
            self::CLOUDPOODLL_HISTORY_TABLE,
            $searchparams
        );

        $items = [];

        $items['responses'][0] = $data;
        return $items;
    }

    /**
     * Updates the item. Does a quick sanity check to ensure updating user created the item.
     * @param $updateditem
     * @return bool
     * @throws dml_exception
     */
    public function update($updateditem) {
        $updated = false;
        if (
            is_numeric($updateditem->id) &&
            $this->db->record_exists(
                '' . self::CLOUDPOODLL_HISTORY_TABLE . '',
                ['id' => $updateditem->id, 'userid' => $this->user->id]
            )
        ) {
            $updated = $this->db->update_record(self::CLOUDPOODLL_HISTORY_TABLE, $updateditem);
        }
        return $updated;
    }

    /**
     * @param $itemid
     * @return bool
     * @throws dml_exception
     */
    public function delete($itemid) {
        return $this->db->delete_records(
            self::CLOUDPOODLL_HISTORY_TABLE,
            ['id' => $itemid, 'userid' => $this->user->id]
        );
    }

    /**
     * @param $itemid
     * @return bool
     * @throws dml_exception
     */
    public function archive($itemid) {
        $updated = false;
        if (
        $this->db->record_exists(
            '' . self::CLOUDPOODLL_HISTORY_TABLE . '',
            ['id' => $itemid, 'userid' => $this->user->id]
        )
        ) {
            $updateditem = new stdClass();
            $updateditem->id = $itemid;
            $updateditem->archived = '1';
            $updated = $this->db->update_record(self::CLOUDPOODLL_HISTORY_TABLE, $updateditem);
        }
        return $updated;
    }
}