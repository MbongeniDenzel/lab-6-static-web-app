/**
 * @file for hot-reload
 * @author MbongeniDenzel <mbongenimahlangu2001@gmail.com>
 */

/* eslint-disable */
import 'eventsource-polyfill';
import hotClient from 'webpack-hot-middleware/client?noInfo=true&reload=true';

hotClient.subscribe(event => {
    if (event.action === 'reload') {
        window.location.reload();
    }
});
