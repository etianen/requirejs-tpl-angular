/**
 * AngularJS template loader plugin for RequireJS.
 *
 * Copyright (c) 2014, David Hall.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 * 
 *     1. Redistributions of source code must retain the above copyright notice, 
 *        this list of conditions and the following disclaimer.
 *     
 *     2. Redistributions in binary form must reproduce the above copyright 
 *        notice, this list of conditions and the following disclaimer in the
 *        documentation and/or other materials provided with the distribution.
 * 
 *     3. Neither the name of David Hall nor the names of its contributors may be
 *        used to endorse or promote products derived from this software without
 *        specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

define([
    "text"
], function(
    text
) {

    "use strict";

    var tplModule = null;
    
    var buildMap = {};

    var tpl = {

        _cacheTemplate: function(angular, name, contents) {
            if (!tplModule) {
                tplModule = angular.module("tpl", []);
            }
            tplModule.run(["$templateCache", function($templateCache) {
                $templateCache.put(name, contents);
            }]);
            return contents;
        },

        load: function(name, parentRequire, onload, config) {
            text.get(require.toUrl("../templates/" + name), function(contents) {
                // How we act next depends on whether this is the browser.
                if (config.isBuild) {
                    // This is an optimizing build
                    buildMap[name] = contents;
                    onload(contents);
                } else {
                    // Add to the template cache.
                    require(["angular"], function(angular) {
                        onload(tpl._cacheTemplate(angular, name, contents));
                    });
                }
            });
        },

        write: function (pluginName, moduleName, write) {
            if (moduleName in buildMap) {
                var contents = text.jsEscape(buildMap[moduleName]);
                write("define('" + pluginName + "!" + moduleName  + "', ['angular', '" + pluginName + "'], function (angular, tpl) { return tpl._cacheTemplate(angular, '" + moduleName + "', '" + contents + "'); });\n");
            }
        }

    };

    return tpl;

});