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
 * CloudPoodll history tests.
 *
 * @package   atto_cloudpoodll
 * @category test
 * @copyright 2018 Justin Hunt {@link http://www.poodll.com}
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

global $CFG;

/**
 * Unit tests for cloud poodlnodl history.
 */
class atto_cloudpoodll_history_testcase extends advanced_testcase {
    /** @var user object */
    protected $user;

    /** @var db object */
    protected $db;

    /** @var atto_cloudpoodll\history object */
    protected $history;

    /** @var stdClass object */
    protected $course;

    public function test_create() {

        $item = $this->create_test_item();
        $result = $this->history->create($item);

        $this->assertIsInt($result);
    }

    private function create_test_item() {
        $item = new stdClass();
        $item->userid = $this->user->id;
        $item->courseid = $this->course->id;
        $item->filetitle = "media.mp4";
        $item->recordertype = "audio";
        $item->mediafilename = $item->filetitle;
        $item->mediaurl = "https://example.org/media.mp4";
        $item->sourceurl = "media.webm";
        $item->sourcemimetype = "webm";
        $item->subtitling = "0";
        $item->subtitleurl = "https://example.org/media.mp4.vtt";
        $item->language = "us-en";
        $item->archived = "0";
        $item->dateofentry = time();
        $item->userofentry = $this->user->id;
        $item->dateofchange = time();
        $item->userofchange = $this->user->id;
        return $item;
    }

    public function test_get() {
        $item = $this->create_test_item();
        $this->history->create($item);

        $result = $this->history->get();
        $this->assertIsArray($result);
    }

    public function test_get_item() {
        $item = $this->create_test_item();
        $createdid = $this->history->create($item);

        $result = $this->history->get_item($createdid);

        $this->assertIsArray($result);
    }

    public function test_update() {
        $item = $this->create_test_item();
        $itemid = $this->history->create($item);

        $updateditem = new stdClass();
        $updateditem->id = $itemid;
        $updateditem->filetitle = $item->filetitle . time();

        $this->history->update($updateditem, $this->user);
        $resultitem = $this->history->get_item($itemid, $this->user);


        $this->assertEquals($updateditem->filetitle, $resultitem['responses'][0]['filetitle']);

    }

    public function test_delete() {
        $item = $this->create_test_item();
        $createdid = $this->history->create($item);
        $result = $this->history->delete($createdid);
        $this->assertTrue($result);
    }

    public function test_archive() {
        $item = $this->create_test_item();
        $createdid = $this->history->create($item);
        $result = $this->history->archive($createdid);
        $this->assertTrue($result);
    }

    protected function setUp() {
        global $USER, $DB;
        parent::setUp();

        $this->resetAfterTest();
        $this->user = $this->getDataGenerator()->create_user();
        $this->course = $this->getDataGenerator()->create_course();
        $this->setUser($this->user);
        $this->db = $DB;
        $this->history = new atto_cloudpoodll\history();
    }

    protected function tearDown() {
        parent::tearDown();
        unset($this->history);
    }
}
