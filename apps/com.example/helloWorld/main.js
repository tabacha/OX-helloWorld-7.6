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

// convention: the application's central startup file is called 'main'

define('com.example/helloWorld/main',
    ['io.ox/core/notifications',
     'gettext!com.example/helloWorld',
     'io.ox/core/tk/dialogs',
     'settings!com.example/helloWorld',
     'less!com.example/helloWorld/style'
    ], function (notifications, gt, dialogs, settings) {

    'use strict';

    // this is just code. loading this does not imply to launch the application

    // application object. 'name' is mandatory!
    var app = ox.ui.createApp({ name: 'com.example/helloWorld' });

    // by using setLauncher this way, we register a callback function
    // that is called when the application is really launched
    app.setLauncher(function () {

        // application window (some applications don't have a window)
        var win = ox.ui.createWindow({
            name: 'com.example/helloWorld',
            title: 'Hello World',
            toolbar: false,
            chromeless: true
        });

        app.setWindow(win);

        // add a css class to the main node for your namespace
        win.addClass('com-example-helloWorld');

        // add something on 'main' node
        win.nodes.main
            .css({ padding: '13px', textAlign: 'center' })
            .append($('<h1>').text('Hello World!'));

        // open a simple modal dialog on click
        win.nodes.main
            .append($('<a class="btn">').text('Open Modal Dialog')
                .on('click', function () {
                    require(['io.ox/core/tk/dialogs'],
                        function (dialogs) {
                            new dialogs.ModalDialog({
                                    width: 600,
                                    easyOut: true
                                })
                                .append($('<h2 class="clear-title">').text('Hello World'))
                                .addButton('close', 'Close')
                                .show();
                        }
                    );
                })
            );

        // draw two buttons and display notifications on click
        win.nodes.main
            .append(
                $('<a class="btn">').text('Display success notfication')
                    .on('click', function () {
                        notifications.yell('success', 'Ah success!');
                    }),
                $('<a class="btn">').text('Display error notfication')
                    .on('click', function () {
                        notifications.yell('error', 'Oh failed!');
                    })
            );

        // open a halo view from your userid on click
        win.nodes.main
            .append(
                $('<a class="btn halo-link">')
                .data({ internal_userid: ox.user_id })
                .text(gt('Open Halo from Userid'))
            );

        // open a halo view from an email address on click
        win.nodes.main
            .append(
                $('<a class="btn halo-link">')
                .data({ email1: 'test@example.com' })
                .text(gt('Open Halo from Email'))
            );


        // Displays a label with a checkbox that is saved to the backend via settings
        // Demonstrates the simple use of get / set
        win.nodes.main
            .append(
                $('<label>').text(gt('Example Setting')),
                $('<input type="checkbox">')
                    .prop('checked', settings.get('exampleSetting', false))
                    .on('change', function () {
                        settings.set('exampleSetting', $(this).prop('checked')).save();
                    })
            );


        win.show();
    });

    return {
        getApp: app.getInstance
    };

});
