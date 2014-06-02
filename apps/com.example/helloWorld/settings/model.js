/**
 * All content on this website (including text, images, source
 * code and any other original works), unless otherwise noted,
 * is licensed under a Creative Commons License.
 *
 * http://creativecommons.org/licenses/by-nc-sa/2.5/
 *
 * Copyright (C) Open-Xchange Inc., 2013
 * Mail: info@open-xchange.com
 *
 * @author David Bauer <david.bauer@open-xchange.com>
 */
define('com.example/helloWorld/settings/model',
      ['settings!com.example/helloWorld'], function (settings) {

    'use strict';

    // Very simple default model
    var helloWorldModel = Backbone.Model.extend({


        initialize: function (/*options*/) {

        },

        save: function () {
            settings.save(this.attributes);
        },

        destroy: function () {

        }

    });

    return helloWorldModel;
});