import Gio from 'gi://Gio';
import Meta from 'gi://Meta';
import GLib from 'gi://GLib';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

const EvalGjsIface =
    '<node>' +
    '   <interface name="dev.ramottamado.EvalGjs">' +
    '       <method name="Eval">' +
    '           <arg type="s" direction="in" name="code" />' +
    '           <arg type="b" direction="out" name="success"/>' +
    '           <arg type="s" direction="out" name="returnValue"/>' +
    '       </method>' +
    '   </interface>' +
    '</node>';

export default class EvalGjs {
    constructor() {
        this._dbusImpl = Gio.DBusExportedObject.wrapJSObject(EvalGjsIface, this);
    }


    /**
     * Eval:
     * @param {string} code: A string containing JavaScript code
     * @returns {Array}
     *
     * This function executes arbitrary code in the main
     * loop, and returns a boolean success and
     * JSON representation of the object as a string.
     *
     * If evaluation completes without throwing an exception,
     * then the return value will be [true, JSON.stringify(result)].
     * If evaluation fails, then the return value will be
     * [false, JSON.stringify(exception)];
     *
     */
    Eval(code) {
        let returnValue;
        let success;

        try {
            returnValue = JSON.stringify(eval(code));

            // A hack; DBus doesn't have null/undefined
            if (returnValue == undefined)
                returnValue = '';

            success = true;
        }
        catch (e) {
            returnValue = `${e}`;
            success = false;
        }

        return [success, returnValue];
    }

    enable() {
        this._dbusImpl.export(Gio.DBus.session, '/dev/ramottamado/EvalGjs');
    }

    disable() {
        if (this._dbusImpl) this._dbusImpl.unexport();
    }
}
