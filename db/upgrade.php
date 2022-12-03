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
 * Upgrade file cloudpoodll history data.
 *
 * @package   atto_cloudpoodll
 * @copyright 2018 Justin Hunt {@link http://www.poodll.com}
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die;

function xmldb_atto_cloudpoodll_upgrade($oldversion) {
    global $DB;
    $dbman = $DB->get_manager();

    if ($oldversion < 2020020700) {
        // Define table cloudpoodll_history to be created.
        $table = new xmldb_table('cloudpoodll_history');

        // Adding fields to table cloudpoodll_history.
        $table->add_field('id', XMLDB_TYPE_INTEGER, '9', null, XMLDB_NOTNULL, XMLDB_SEQUENCE, null);
        $table->add_field('userid', XMLDB_TYPE_INTEGER, '18', null, XMLDB_NOTNULL, null, null);
        $table->add_field('courseid', XMLDB_TYPE_INTEGER, '9', null, XMLDB_NOTNULL, null, null);
        $table->add_field('filetitle', XMLDB_TYPE_CHAR, '255', null, XMLDB_NOTNULL, null, null);
        $table->add_field('recordertype', XMLDB_TYPE_CHAR, '5', null, XMLDB_NOTNULL, null, null);
        $table->add_field('mediafilename', XMLDB_TYPE_CHAR, '255', null, XMLDB_NOTNULL, null, null);
        $table->add_field('mediaurl', XMLDB_TYPE_CHAR, '255', null, XMLDB_NOTNULL, null, null);
        $table->add_field('sourceurl', XMLDB_TYPE_CHAR, '255', null, XMLDB_NOTNULL, null, null);
        $table->add_field('sourcemimetype', XMLDB_TYPE_CHAR, '20', null, XMLDB_NOTNULL, null, null);
        $table->add_field('subtitling', XMLDB_TYPE_CHAR, '1', null, XMLDB_NOTNULL, null, '0');
        $table->add_field('subtitleurl', XMLDB_TYPE_CHAR, '255', null, XMLDB_NOTNULL, null, null);
        $table->add_field('language', XMLDB_TYPE_CHAR, '25', null, null, null, null);
        $table->add_field('archived', XMLDB_TYPE_CHAR, '1', null, XMLDB_NOTNULL, null, '0');
        $table->add_field('dateofentry', XMLDB_TYPE_INTEGER, '10', null, null, null, null);
        $table->add_field('userofentry', XMLDB_TYPE_INTEGER, '18', null, XMLDB_NOTNULL, null, null);
        $table->add_field('dateofchange', XMLDB_TYPE_INTEGER, '10', null, null, null, null);
        $table->add_field('userofchange', XMLDB_TYPE_INTEGER, '18', null, null, null, null);

        // Adding keys to table cloudpoodll_history.
        $table->add_key('primary', XMLDB_KEY_PRIMARY, ['id']);
        $table->add_key('courseid', XMLDB_KEY_FOREIGN, ['courseid'], 'course', ['id']);
        $table->add_key('userid', XMLDB_KEY_FOREIGN, ['userid'], 'user', ['id']);
        $table->add_key('userofentry', XMLDB_KEY_FOREIGN, ['userofentry'], 'user', ['id']);
        $table->add_key('userofchange', XMLDB_KEY_FOREIGN, ['userofchange'], 'user', ['id']);

        // Adding indexes to table cloudpoodll_history.
        $table->add_index('mdl_cloudpoodll_history__userid_index', XMLDB_INDEX_NOTUNIQUE, ['userid','userofentry']);

        // Conditionally launch create table for cloudpoodll_history.
        if (!$dbman->table_exists($table)) {
            $dbman->create_table($table);
        }

        // Cloudpoodll savepoint reached.
        upgrade_plugin_savepoint(true, 2020020700, 'atto', 'cloudpoodll');
    }

    if ($oldversion < 2022120302) {
        // Define table cloudpoodll_history to be created.
        $table = new xmldb_table('cloudpoodll_history');
        $field =  new xmldb_field('sourcemimetype', XMLDB_TYPE_CHAR, '255', null, XMLDB_NOTNULL, null, null);

        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }else{
            $dbman->change_field_precision($table, $field);
        }

        // Cloudpoodll savepoint reached.
        upgrade_plugin_savepoint(true, 2022120302, 'atto', 'cloudpoodll');
    }


    return true;
}

