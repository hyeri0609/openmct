/*****************************************************************************
 * Open MCT Web, Copyright (c) 2014-2015, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT Web is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT Web includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/
/*global define*/

define(['legacyRegistry'], function (legacyRegistry) {
    "use strict";
    legacyRegistry.register("platform/features/clock", {
        "name": "Clocks/Timers",
        "descriptions": "Domain objects for displaying current & relative times.",
        "configuration": {
            "paths": {
                "moment-duration-format": "moment-duration-format"
            },
            "shim": {
                "moment-duration-format": {
                    "deps": [ "moment" ]
                }
            }
        },
        "extensions": {
            "constants": [
                {
                    "key": "CLOCK_INDICATOR_FORMAT",
                    "value": "YYYY/MM/DD HH:mm:ss"
                }
            ],
            "indicators": [
                {
                    "implementation": "indicators/ClockIndicator.js",
                    "depends": [ "tickerService", "CLOCK_INDICATOR_FORMAT" ],
                    "priority": "preferred"
                }
            ],
            "services": [
                {
                    "key": "tickerService",
                    "implementation": "services/TickerService.js",
                    "depends": [ "$timeout", "now" ]
                }
            ],
            "controllers": [
                {
                    "key": "ClockController",
                    "implementation": "controllers/ClockController.js",
                    "depends": [ "$scope", "tickerService" ]
                },
                {
                    "key": "TimerController",
                    "implementation": "controllers/TimerController.js",
                    "depends": [ "$scope", "$window", "now" ]
                },
                {
                    "key": "RefreshingController",
                    "implementation": "controllers/RefreshingController.js",
                    "depends": [ "$scope", "tickerService" ]
                }
            ],
            "views": [
                {
                    "key": "clock",
                    "type": "clock",
                    "templateUrl": "templates/clock.html"
                },
                {
                    "key": "timer",
                    "type": "timer",
                    "templateUrl": "templates/timer.html"
                }
            ],
            "actions": [
                {
                    "key": "timer.start",
                    "implementation": "actions/StartTimerAction.js",
                    "depends": ["now"],
                    "category": "contextual",
                    "name": "Start",
                    "glyph": "\u00EF",
                    "priority": "preferred"
                },
                {
                    "key": "timer.restart",
                    "implementation": "actions/RestartTimerAction.js",
                    "depends": ["now"],
                    "category": "contextual",
                    "name": "Restart at 0",
                    "glyph": "r",
                    "priority": "preferred"
                }
            ],
            "types": [
                {
                    "key": "clock",
                    "name": "Clock",
                    "glyph": "C",
                    "features": [ "creation" ],
                    "properties": [
                        {
                            "key": "clockFormat",
                            "name": "Display Format",
                            "control": "composite",
                            "items": [
                                {
                                    "control": "select",
                                    "options": [
                                        {
                                            "value": "YYYY/MM/DD hh:mm:ss",
                                            "name": "YYYY/MM/DD hh:mm:ss"
                                        },
                                        {
                                            "value": "YYYY/DDD hh:mm:ss",
                                            "name": "YYYY/DDD hh:mm:ss"
                                        },
                                        {
                                            "value": "hh:mm:ss",
                                            "name": "hh:mm:ss"
                                        }
                                    ]
                                },
                                {
                                    "control": "select",
                                    "options": [
                                        {
                                            "value": "clock12",
                                            "name": "12hr"
                                        },
                                        {
                                            "value": "clock24",
                                            "name": "24hr"
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    "model": {
                        "clockFormat": [ "YYYY/MM/DD hh:mm:ss", "clock12" ]
                    }
                },
                {
                    "key": "timer",
                    "name": "Timer",
                    "glyph": "\u00F5",
                    "features": [ "creation" ],
                    "properties": [
                        {
                            "key": "timestamp",
                            "control": "datetime",
                            "name": "Target"
                        },
                        {
                            "key": "timerFormat",
                            "control": "select",
                            "options": [
                                {
                                    "value": "long",
                                    "name": "DDD hh:mm:ss"
                                },
                                {
                                    "value": "short",
                                    "name": "hh:mm:ss"
                                }
                            ]
                        }
                    ],
                    "model": {
                        "timerFormat": "DDD hh:mm:ss"
                    }
                }
            ],
            "licenses": [
                {
                    "name": "moment-duration-format",
                    "version": "1.3.0",
                    "author": "John Madhavan-Reese",
                    "description": "Duration parsing/formatting",
                    "website": "https://github.com/jsmreese/moment-duration-format",
                    "copyright": "Copyright 2014 John Madhavan-Reese",
                    "license": "license-mit",
                    "link": "https://github.com/jsmreese/moment-duration-format/blob/master/LICENSE"
                }
            ]
        }
    });
});