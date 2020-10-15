(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ast"] = factory();
	else
		root["ast"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdateast"];
/******/ 	this["webpackHotUpdateast"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "d36db10f71bee8db29a9";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/index.ts")(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: Console, Cntnr, Envmnt, Op, NULL, UNDEFINED, Reference, ConsoleLogNode, NumberNode, StringNode, BooleanNode, NullNode, UndefinedNode, DeclareVarNode, DeclareVarListNode, CreateIdVarNode, AsignNode, SumNode, SubNode, MulNode, DivNode, ModNode, ExpNode, EqNode, DifNode, HigherNode, MinorNode, HigherEqNode, MinorEqNode, OrNode, AndNode, NotNode, ReAsignAddNode, ReAsignSubNode, ReAsignMulNode, ReAsignDivNode, ReAsignModNode, ReAddNode, ReSubNode, CreateArrayNode, CreateArrVarNode, ReturnObj, CreateObjVarNode, CreateObjFunNode, SentenceTernaryNode, BreakNode, ContinueNode, IfNode, WhileNode, DoWhileNode, CaseNode, SwitchNode, ForInNode, ForOfNode, ForNode, CreateObjNode, MyMap, DeclareTypeStructureNode, DeclareFunNode, DeclareFunParamNode, ReturnNode, FunctionCallNode, ErrorsControl, ExecuteAST, GraphAST, TranslateStringsCompose */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExecuteAST", function() { return ExecuteAST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphAST", function() { return GraphAST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TranslateStringsCompose", function() { return TranslateStringsCompose; });
/* harmony import */ var _utils_Reference__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/Reference */ "./src/utils/Reference.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Reference", function() { return _utils_Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"]; });

/* harmony import */ var _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/PrimitiveTypoContainer */ "./src/utils/PrimitiveTypoContainer.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NULL", function() { return _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_1__["NULL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UNDEFINED", function() { return _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_1__["UNDEFINED"]; });

/* harmony import */ var _utils_Envmnt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/Envmnt */ "./src/utils/Envmnt.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Envmnt", function() { return _utils_Envmnt__WEBPACK_IMPORTED_MODULE_2__["Envmnt"]; });

/* harmony import */ var _utils_Cntnr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/Cntnr */ "./src/utils/Cntnr.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Cntnr", function() { return _utils_Cntnr__WEBPACK_IMPORTED_MODULE_3__["Cntnr"]; });

/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/Op */ "./src/utils/Op.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Op", function() { return _utils_Op__WEBPACK_IMPORTED_MODULE_4__["Op"]; });

/* harmony import */ var _utils_Console__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/Console */ "./src/utils/Console.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Console", function() { return _utils_Console__WEBPACK_IMPORTED_MODULE_5__["Console"]; });

/* harmony import */ var _nodes_ConsoleLogNode__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./nodes/ConsoleLogNode */ "./src/nodes/ConsoleLogNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConsoleLogNode", function() { return _nodes_ConsoleLogNode__WEBPACK_IMPORTED_MODULE_6__["ConsoleLogNode"]; });

/* harmony import */ var _nodes_NumberNode__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./nodes/NumberNode */ "./src/nodes/NumberNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NumberNode", function() { return _nodes_NumberNode__WEBPACK_IMPORTED_MODULE_7__["NumberNode"]; });

/* harmony import */ var _nodes_StringNode__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./nodes/StringNode */ "./src/nodes/StringNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StringNode", function() { return _nodes_StringNode__WEBPACK_IMPORTED_MODULE_8__["StringNode"]; });

/* harmony import */ var _nodes_BooleanNode__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./nodes/BooleanNode */ "./src/nodes/BooleanNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BooleanNode", function() { return _nodes_BooleanNode__WEBPACK_IMPORTED_MODULE_9__["BooleanNode"]; });

/* harmony import */ var _nodes_NullNode__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./nodes/NullNode */ "./src/nodes/NullNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NullNode", function() { return _nodes_NullNode__WEBPACK_IMPORTED_MODULE_10__["NullNode"]; });

/* harmony import */ var _nodes_UndefinedNode__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./nodes/UndefinedNode */ "./src/nodes/UndefinedNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UndefinedNode", function() { return _nodes_UndefinedNode__WEBPACK_IMPORTED_MODULE_11__["UndefinedNode"]; });

/* harmony import */ var _nodes_DeclareVarNode__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./nodes/DeclareVarNode */ "./src/nodes/DeclareVarNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DeclareVarNode", function() { return _nodes_DeclareVarNode__WEBPACK_IMPORTED_MODULE_12__["DeclareVarNode"]; });

/* harmony import */ var _nodes_DeclareVarListNode__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./nodes/DeclareVarListNode */ "./src/nodes/DeclareVarListNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DeclareVarListNode", function() { return _nodes_DeclareVarListNode__WEBPACK_IMPORTED_MODULE_13__["DeclareVarListNode"]; });

/* harmony import */ var _nodes_CreateIdVarNode__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./nodes/CreateIdVarNode */ "./src/nodes/CreateIdVarNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CreateIdVarNode", function() { return _nodes_CreateIdVarNode__WEBPACK_IMPORTED_MODULE_14__["CreateIdVarNode"]; });

/* harmony import */ var _nodes_AsignNode__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./nodes/AsignNode */ "./src/nodes/AsignNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AsignNode", function() { return _nodes_AsignNode__WEBPACK_IMPORTED_MODULE_15__["AsignNode"]; });

/* harmony import */ var _nodes_SumNode__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./nodes/SumNode */ "./src/nodes/SumNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SumNode", function() { return _nodes_SumNode__WEBPACK_IMPORTED_MODULE_16__["SumNode"]; });

/* harmony import */ var _nodes_SubNode__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./nodes/SubNode */ "./src/nodes/SubNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SubNode", function() { return _nodes_SubNode__WEBPACK_IMPORTED_MODULE_17__["SubNode"]; });

/* harmony import */ var _nodes_MulNode__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./nodes/MulNode */ "./src/nodes/MulNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MulNode", function() { return _nodes_MulNode__WEBPACK_IMPORTED_MODULE_18__["MulNode"]; });

/* harmony import */ var _nodes_DivNode__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./nodes/DivNode */ "./src/nodes/DivNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DivNode", function() { return _nodes_DivNode__WEBPACK_IMPORTED_MODULE_19__["DivNode"]; });

/* harmony import */ var _nodes_ModNode__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./nodes/ModNode */ "./src/nodes/ModNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModNode", function() { return _nodes_ModNode__WEBPACK_IMPORTED_MODULE_20__["ModNode"]; });

/* harmony import */ var _nodes_ExpNode__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./nodes/ExpNode */ "./src/nodes/ExpNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExpNode", function() { return _nodes_ExpNode__WEBPACK_IMPORTED_MODULE_21__["ExpNode"]; });

/* harmony import */ var _nodes_EqNode__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./nodes/EqNode */ "./src/nodes/EqNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EqNode", function() { return _nodes_EqNode__WEBPACK_IMPORTED_MODULE_22__["EqNode"]; });

/* harmony import */ var _nodes_DifNode__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./nodes/DifNode */ "./src/nodes/DifNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DifNode", function() { return _nodes_DifNode__WEBPACK_IMPORTED_MODULE_23__["DifNode"]; });

/* harmony import */ var _nodes_HigherNode__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./nodes/HigherNode */ "./src/nodes/HigherNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HigherNode", function() { return _nodes_HigherNode__WEBPACK_IMPORTED_MODULE_24__["HigherNode"]; });

/* harmony import */ var _nodes_MinorNode__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./nodes/MinorNode */ "./src/nodes/MinorNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MinorNode", function() { return _nodes_MinorNode__WEBPACK_IMPORTED_MODULE_25__["MinorNode"]; });

/* harmony import */ var _nodes_HigherEqNode__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./nodes/HigherEqNode */ "./src/nodes/HigherEqNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HigherEqNode", function() { return _nodes_HigherEqNode__WEBPACK_IMPORTED_MODULE_26__["HigherEqNode"]; });

/* harmony import */ var _nodes_MinorEqNode__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./nodes/MinorEqNode */ "./src/nodes/MinorEqNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MinorEqNode", function() { return _nodes_MinorEqNode__WEBPACK_IMPORTED_MODULE_27__["MinorEqNode"]; });

/* harmony import */ var _nodes_OrNode__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./nodes/OrNode */ "./src/nodes/OrNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OrNode", function() { return _nodes_OrNode__WEBPACK_IMPORTED_MODULE_28__["OrNode"]; });

/* harmony import */ var _nodes_AndNode__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./nodes/AndNode */ "./src/nodes/AndNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AndNode", function() { return _nodes_AndNode__WEBPACK_IMPORTED_MODULE_29__["AndNode"]; });

/* harmony import */ var _nodes_NotNode__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./nodes/NotNode */ "./src/nodes/NotNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NotNode", function() { return _nodes_NotNode__WEBPACK_IMPORTED_MODULE_30__["NotNode"]; });

/* harmony import */ var _nodes_ReAsignAddNode__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./nodes/ReAsignAddNode */ "./src/nodes/ReAsignAddNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReAsignAddNode", function() { return _nodes_ReAsignAddNode__WEBPACK_IMPORTED_MODULE_31__["ReAsignAddNode"]; });

/* harmony import */ var _nodes_ReAsignSubNode__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./nodes/ReAsignSubNode */ "./src/nodes/ReAsignSubNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReAsignSubNode", function() { return _nodes_ReAsignSubNode__WEBPACK_IMPORTED_MODULE_32__["ReAsignSubNode"]; });

/* harmony import */ var _nodes_ReAsignMulNode__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./nodes/ReAsignMulNode */ "./src/nodes/ReAsignMulNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReAsignMulNode", function() { return _nodes_ReAsignMulNode__WEBPACK_IMPORTED_MODULE_33__["ReAsignMulNode"]; });

/* harmony import */ var _nodes_ReAsignDivNode__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./nodes/ReAsignDivNode */ "./src/nodes/ReAsignDivNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReAsignDivNode", function() { return _nodes_ReAsignDivNode__WEBPACK_IMPORTED_MODULE_34__["ReAsignDivNode"]; });

/* harmony import */ var _nodes_ReAsignModNode__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./nodes/ReAsignModNode */ "./src/nodes/ReAsignModNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReAsignModNode", function() { return _nodes_ReAsignModNode__WEBPACK_IMPORTED_MODULE_35__["ReAsignModNode"]; });

/* harmony import */ var _nodes_ReAddNode__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./nodes/ReAddNode */ "./src/nodes/ReAddNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReAddNode", function() { return _nodes_ReAddNode__WEBPACK_IMPORTED_MODULE_36__["ReAddNode"]; });

/* harmony import */ var _nodes_ReSubNode__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./nodes/ReSubNode */ "./src/nodes/ReSubNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReSubNode", function() { return _nodes_ReSubNode__WEBPACK_IMPORTED_MODULE_37__["ReSubNode"]; });

/* harmony import */ var _nodes_CreateArrayNode__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./nodes/CreateArrayNode */ "./src/nodes/CreateArrayNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CreateArrayNode", function() { return _nodes_CreateArrayNode__WEBPACK_IMPORTED_MODULE_38__["CreateArrayNode"]; });

/* harmony import */ var _nodes_CreateArrVarNode__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./nodes/CreateArrVarNode */ "./src/nodes/CreateArrVarNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CreateArrVarNode", function() { return _nodes_CreateArrVarNode__WEBPACK_IMPORTED_MODULE_39__["CreateArrVarNode"]; });

/* harmony import */ var _nodes_ReturnObj__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./nodes/ReturnObj */ "./src/nodes/ReturnObj.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReturnObj", function() { return _nodes_ReturnObj__WEBPACK_IMPORTED_MODULE_40__["ReturnObj"]; });

/* harmony import */ var _nodes_CreateObjVarNode__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./nodes/CreateObjVarNode */ "./src/nodes/CreateObjVarNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CreateObjVarNode", function() { return _nodes_CreateObjVarNode__WEBPACK_IMPORTED_MODULE_41__["CreateObjVarNode"]; });

/* harmony import */ var _nodes_CreateObjFunNode__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./nodes/CreateObjFunNode */ "./src/nodes/CreateObjFunNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CreateObjFunNode", function() { return _nodes_CreateObjFunNode__WEBPACK_IMPORTED_MODULE_42__["CreateObjFunNode"]; });

/* harmony import */ var _nodes_SentenceTernaryNode__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./nodes/SentenceTernaryNode */ "./src/nodes/SentenceTernaryNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SentenceTernaryNode", function() { return _nodes_SentenceTernaryNode__WEBPACK_IMPORTED_MODULE_43__["SentenceTernaryNode"]; });

/* harmony import */ var _nodes_BreakNode__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./nodes/BreakNode */ "./src/nodes/BreakNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BreakNode", function() { return _nodes_BreakNode__WEBPACK_IMPORTED_MODULE_44__["BreakNode"]; });

/* harmony import */ var _nodes_ContinueNode__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./nodes/ContinueNode */ "./src/nodes/ContinueNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ContinueNode", function() { return _nodes_ContinueNode__WEBPACK_IMPORTED_MODULE_45__["ContinueNode"]; });

/* harmony import */ var _nodes_IfNode__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./nodes/IfNode */ "./src/nodes/IfNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IfNode", function() { return _nodes_IfNode__WEBPACK_IMPORTED_MODULE_46__["IfNode"]; });

/* harmony import */ var _nodes_WhileNode__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./nodes/WhileNode */ "./src/nodes/WhileNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WhileNode", function() { return _nodes_WhileNode__WEBPACK_IMPORTED_MODULE_47__["WhileNode"]; });

/* harmony import */ var _nodes_DoWhileNode__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./nodes/DoWhileNode */ "./src/nodes/DoWhileNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DoWhileNode", function() { return _nodes_DoWhileNode__WEBPACK_IMPORTED_MODULE_48__["DoWhileNode"]; });

/* harmony import */ var _nodes_CaseNode__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./nodes/CaseNode */ "./src/nodes/CaseNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CaseNode", function() { return _nodes_CaseNode__WEBPACK_IMPORTED_MODULE_49__["CaseNode"]; });

/* harmony import */ var _nodes_SwitchNode__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./nodes/SwitchNode */ "./src/nodes/SwitchNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SwitchNode", function() { return _nodes_SwitchNode__WEBPACK_IMPORTED_MODULE_50__["SwitchNode"]; });

/* harmony import */ var _nodes_ForInNode__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./nodes/ForInNode */ "./src/nodes/ForInNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ForInNode", function() { return _nodes_ForInNode__WEBPACK_IMPORTED_MODULE_51__["ForInNode"]; });

/* harmony import */ var _nodes_ForOfNode__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./nodes/ForOfNode */ "./src/nodes/ForOfNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ForOfNode", function() { return _nodes_ForOfNode__WEBPACK_IMPORTED_MODULE_52__["ForOfNode"]; });

/* harmony import */ var _nodes_ForNode__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./nodes/ForNode */ "./src/nodes/ForNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ForNode", function() { return _nodes_ForNode__WEBPACK_IMPORTED_MODULE_53__["ForNode"]; });

/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./utils/Utils */ "./src/utils/Utils.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MyMap", function() { return _utils_Utils__WEBPACK_IMPORTED_MODULE_54__["MyMap"]; });

/* harmony import */ var _nodes_CreateObjNode__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./nodes/CreateObjNode */ "./src/nodes/CreateObjNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CreateObjNode", function() { return _nodes_CreateObjNode__WEBPACK_IMPORTED_MODULE_55__["CreateObjNode"]; });

/* harmony import */ var _nodes_DeclareTypeStructureNode__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./nodes/DeclareTypeStructureNode */ "./src/nodes/DeclareTypeStructureNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DeclareTypeStructureNode", function() { return _nodes_DeclareTypeStructureNode__WEBPACK_IMPORTED_MODULE_56__["DeclareTypeStructureNode"]; });

/* harmony import */ var _nodes_DeclareFunNode__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./nodes/DeclareFunNode */ "./src/nodes/DeclareFunNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DeclareFunNode", function() { return _nodes_DeclareFunNode__WEBPACK_IMPORTED_MODULE_57__["DeclareFunNode"]; });

/* harmony import */ var _nodes_DeclareFunParamNode__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./nodes/DeclareFunParamNode */ "./src/nodes/DeclareFunParamNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DeclareFunParamNode", function() { return _nodes_DeclareFunParamNode__WEBPACK_IMPORTED_MODULE_58__["DeclareFunParamNode"]; });

/* harmony import */ var _nodes_ReturnNode__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./nodes/ReturnNode */ "./src/nodes/ReturnNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReturnNode", function() { return _nodes_ReturnNode__WEBPACK_IMPORTED_MODULE_59__["ReturnNode"]; });

/* harmony import */ var _nodes_FunctionCallNode__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./nodes/FunctionCallNode */ "./src/nodes/FunctionCallNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FunctionCallNode", function() { return _nodes_FunctionCallNode__WEBPACK_IMPORTED_MODULE_60__["FunctionCallNode"]; });

/* harmony import */ var _utils_TSGraphControl__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./utils/TSGraphControl */ "./src/utils/TSGraphControl.ts");
/* harmony import */ var _utils_NodesControl__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./utils/NodesControl */ "./src/utils/NodesControl.ts");
/* harmony import */ var _utils_ErrorsControl__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./utils/ErrorsControl */ "./src/utils/ErrorsControl.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ErrorsControl", function() { return _utils_ErrorsControl__WEBPACK_IMPORTED_MODULE_63__["ErrorsControl"]; });


































































function ExecuteAST(sentences) {
    _utils_Console__WEBPACK_IMPORTED_MODULE_5__["Console"].log = '';
    _utils_NodesControl__WEBPACK_IMPORTED_MODULE_62__["NodesControl"].clearStructures();
    _utils_TSGraphControl__WEBPACK_IMPORTED_MODULE_61__["TSGraphControl"].clearStructures();
    _utils_Utils__WEBPACK_IMPORTED_MODULE_54__["ObjectsStructures"].objects = new Map();
    const env = new _utils_Envmnt__WEBPACK_IMPORTED_MODULE_2__["Envmnt"](null, sentences);
    env.GO_ALL();
    const graphString = _utils_TSGraphControl__WEBPACK_IMPORTED_MODULE_61__["TSGraphControl"].GetGetGraphsString();
    if (graphString !== '') {
        const win = window.open('./graph.html#' + _utils_TSGraphControl__WEBPACK_IMPORTED_MODULE_61__["TSGraphControl"].GetGetGraphsString(), '_blank');
        if (win !== null)
            win.focus();
    }
}
function GraphAST(sentences) {
    let graph = 'digraph G {\n' +
        '        bgcolor="#1E222A"\n' +
        '        node [fillcolor="#2E3440"; style=filled; fontcolor="#2BBBAD"; color="#2BBBAD"];\n' +
        '        edge [color="#2BBBAD"];';
    const env = new _utils_Envmnt__WEBPACK_IMPORTED_MODULE_2__["Envmnt"](null, sentences);
    graph += env.GetGraph().toString();
    graph += '}';
    console.log(graph);
    return graph;
}
function TranslateStringsCompose(text) {
    return text.replace(/`([^̣`]*)`/g, (text) => text.replace(/`/g, '"').replace(/\${[^}]*}/g, (text) => "\"+" + text.substring(2, text.length - 1) + "+\""));
}
if (module && module.hot)
    module.hot.accept();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/nodes/AndNode.ts":
/*!******************************!*\
  !*** ./src/nodes/AndNode.ts ***!
  \******************************/
/*! exports provided: AndNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AndNode", function() { return AndNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_LogicalOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/LogicalOperationsFunctions */ "./src/utils/LogicalOperationsFunctions.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");



class AndNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, lf, rt) {
        super(position);
        this.lf = lf;
        this.rt = rt;
    }
    GO(env) {
        return Object(_utils_LogicalOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__["And"])(this.lf.Exe(env), this.rt.Exe(env), this.position);
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('AND', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/AsignNode.ts":
/*!********************************!*\
  !*** ./src/nodes/AsignNode.ts ***!
  \********************************/
/*! exports provided: AsignNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsignNode", function() { return AsignNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_Reference__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Reference */ "./src/utils/Reference.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/Utils */ "./src/utils/Utils.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");




class AsignNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, lf, rt) {
        super(position);
        this.lf = lf;
        this.rt = rt;
    }
    GO(env) {
        const lfVal = this.lf.Exe(env);
        const rtVal = this.rt.Exe(env);
        if (!(lfVal instanceof _utils_Reference__WEBPACK_IMPORTED_MODULE_1__["Reference"])) {
            throw new _utils_Utils__WEBPACK_IMPORTED_MODULE_2__["SemanticException"](`No se puede asignar a ${lfVal.typo}, las asignaciones solo pueden ser sobre una referencia`, this.position);
        }
        lfVal.PutValueOnReference(rtVal);
        return null;
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_3__["GraphvizNode"]('ASIG', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/BooleanNode.ts":
/*!**********************************!*\
  !*** ./src/nodes/BooleanNode.ts ***!
  \**********************************/
/*! exports provided: BooleanNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BooleanNode", function() { return BooleanNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/PrimitiveTypoContainer */ "./src/utils/PrimitiveTypoContainer.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");



class BooleanNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, val) {
        super(position);
        this.val = val;
    }
    GO(env) {
        return new _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_1__["BOOLEAN"](this.val);
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('BOOLEAN', [new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"](this.val + '', [])]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/BreakNode.ts":
/*!********************************!*\
  !*** ./src/nodes/BreakNode.ts ***!
  \********************************/
/*! exports provided: BreakNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BreakNode", function() { return BreakNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _BreakObj__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BreakObj */ "./src/nodes/BreakObj.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");



class BreakNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    GO(env) {
        return new _BreakObj__WEBPACK_IMPORTED_MODULE_1__["BreakObj"]();
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('BREAK', [new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('break')]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/BreakObj.ts":
/*!*******************************!*\
  !*** ./src/nodes/BreakObj.ts ***!
  \*******************************/
/*! exports provided: BreakObj */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BreakObj", function() { return BreakObj; });
/* harmony import */ var _utils_Cntnr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Cntnr */ "./src/utils/Cntnr.ts");

class BreakObj extends _utils_Cntnr__WEBPACK_IMPORTED_MODULE_0__["Cntnr"] {
    constructor() {
        super();
    }
}


/***/ }),

/***/ "./src/nodes/CaseNode.ts":
/*!*******************************!*\
  !*** ./src/nodes/CaseNode.ts ***!
  \*******************************/
/*! exports provided: CaseNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CaseNode", function() { return CaseNode; });
class CaseNode {
    constructor(position, conditionValue, sentences) {
        this.conditionValue = conditionValue;
        this.sentences = sentences;
        this.position = position;
    }
    getConditionValue() {
        return this.conditionValue;
    }
    getSentences() {
        return this.sentences;
    }
}


/***/ }),

/***/ "./src/nodes/ConsoleLogNode.ts":
/*!*************************************!*\
  !*** ./src/nodes/ConsoleLogNode.ts ***!
  \*************************************/
/*! exports provided: ConsoleLogNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConsoleLogNode", function() { return ConsoleLogNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_Reference__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Reference */ "./src/utils/Reference.ts");
/* harmony import */ var _utils_Console__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/Console */ "./src/utils/Console.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");




class ConsoleLogNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, expression) {
        super(position);
        this.expression = expression;
    }
    GO(env) {
        let finalLog = '[LOG]: ';
        for (let expression of this.expression) {
            let val = expression.Exe(env);
            if (val instanceof _utils_Reference__WEBPACK_IMPORTED_MODULE_1__["Reference"]) {
                val = val.getValue();
            }
            finalLog += `${val} `;
        }
        _utils_Console__WEBPACK_IMPORTED_MODULE_2__["Console"].log += `${finalLog}\n`;
        console.log(`${finalLog}`);
        return null;
    }
    ;
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_3__["GraphvizNode"]('CONSOLE.LOG', this.expression.map(expression => expression.GetGraph(env)));
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/ContinueNode.ts":
/*!***********************************!*\
  !*** ./src/nodes/ContinueNode.ts ***!
  \***********************************/
/*! exports provided: ContinueNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContinueNode", function() { return ContinueNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _ContinueObj__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ContinueObj */ "./src/nodes/ContinueObj.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");



class ContinueNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    GO(env) {
        return new _ContinueObj__WEBPACK_IMPORTED_MODULE_1__["ContinueObj"]();
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('CONTINUE', [new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('continue')]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/ContinueObj.ts":
/*!**********************************!*\
  !*** ./src/nodes/ContinueObj.ts ***!
  \**********************************/
/*! exports provided: ContinueObj */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContinueObj", function() { return ContinueObj; });
/* harmony import */ var _utils_Cntnr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Cntnr */ "./src/utils/Cntnr.ts");

class ContinueObj extends _utils_Cntnr__WEBPACK_IMPORTED_MODULE_0__["Cntnr"] {
    constructor() {
        super();
    }
}


/***/ }),

/***/ "./src/nodes/CreateArrVarNode.ts":
/*!***************************************!*\
  !*** ./src/nodes/CreateArrVarNode.ts ***!
  \***************************************/
/*! exports provided: CreateArrVarNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateArrVarNode", function() { return CreateArrVarNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_Reference__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Reference */ "./src/utils/Reference.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/Utils */ "./src/utils/Utils.ts");
/* harmony import */ var _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/PrimitiveTypoContainer */ "./src/utils/PrimitiveTypoContainer.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");





class CreateArrVarNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, id, index) {
        super(position);
        this.id = id;
        this.index = index;
    }
    GO(env) {
        let idRef = this.id.Exe(env);
        // if (!(idRef instanceof Reference)) {
        //     throw new SemanticException(`Llamada a Arreglo ${idRef} no definido.`);
        // }
        let index = this.index.Exe(env);
        if (index instanceof _utils_Reference__WEBPACK_IMPORTED_MODULE_1__["Reference"]) {
            index = index.getValue();
        }
        if (index instanceof _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_3__["STRING"]) {
            const val = parseInt(index.getValue());
            if (isNaN(val)) {
                throw new _utils_Utils__WEBPACK_IMPORTED_MODULE_2__["SemanticException"]("El indice para accesar debe ser de tipo NUMBER", this.position);
            }
            index = new _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_3__["NUMBER"](val);
        }
        if (!(index instanceof _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_3__["NUMBER"])) {
            throw new _utils_Utils__WEBPACK_IMPORTED_MODULE_2__["SemanticException"]("El indice para accesar debe ser de tipo NUMBER", this.position);
        }
        let ref = idRef instanceof _utils_Reference__WEBPACK_IMPORTED_MODULE_1__["Reference"] ? idRef.getValue() : idRef;
        if (!(ref instanceof _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_3__["ARRAY"])) {
            return new _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_3__["UNDEFINED"]();
        }
        return ref.getValue(index.getValue());
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_4__["GraphvizNode"]('ARR_ELEMENT', [this.id.GetGraph(env), this.index.GetGraph(env)]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/CreateArrayNode.ts":
/*!**************************************!*\
  !*** ./src/nodes/CreateArrayNode.ts ***!
  \**************************************/
/*! exports provided: CreateArrayNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateArrayNode", function() { return CreateArrayNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_Reference__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Reference */ "./src/utils/Reference.ts");
/* harmony import */ var _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/PrimitiveTypoContainer */ "./src/utils/PrimitiveTypoContainer.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");




class CreateArrayNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, vals) {
        super(position);
        this.vals = vals;
    }
    GO(env) {
        let real = new Array();
        for (let op of this.vals) {
            let reference = new _utils_Reference__WEBPACK_IMPORTED_MODULE_1__["Reference"]();
            reference.PutValueOnReference(op.Exe(env));
            real.push(reference);
        }
        return new _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["ARRAY"](real);
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_3__["GraphvizNode"]('ARRAY', this.vals.map(val => val.GetGraph(env)));
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/CreateIdVarNode.ts":
/*!**************************************!*\
  !*** ./src/nodes/CreateIdVarNode.ts ***!
  \**************************************/
/*! exports provided: CreateIdVarNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateIdVarNode", function() { return CreateIdVarNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Utils */ "./src/utils/Utils.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");



class CreateIdVarNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, id) {
        super(position);
        this.id = id;
    }
    GO(env) {
        return Object(_utils_Utils__WEBPACK_IMPORTED_MODULE_1__["FindVar"])(env, this.id);
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('VAR', [new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"](this.id)]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/CreateObjFunNode.ts":
/*!***************************************!*\
  !*** ./src/nodes/CreateObjFunNode.ts ***!
  \***************************************/
/*! exports provided: CreateObjFunNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateObjFunNode", function() { return CreateObjFunNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_Reference__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Reference */ "./src/utils/Reference.ts");
/* harmony import */ var _utils_functions_FunctionRepresent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/functions/FunctionRepresent */ "./src/utils/functions/FunctionRepresent.ts");
/* harmony import */ var _ReturnObj__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ReturnObj */ "./src/nodes/ReturnObj.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");





class CreateObjFunNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, object, funId, args) {
        super(position);
        this.object = object;
        this.funId = funId;
        this.args = args;
    }
    GO(env) {
        let refe = this.object.Exe(env);
        if (refe instanceof _utils_Reference__WEBPACK_IMPORTED_MODULE_1__["Reference"]) {
            refe = refe.getValue();
        }
        let fun = refe.GetProperty(this.funId);
        if (!(fun instanceof _utils_functions_FunctionRepresent__WEBPACK_IMPORTED_MODULE_2__["FunctionRepresent"])) {
            return null;
        }
        const references = new Array();
        for (let arg of this.args) {
            let argValue = arg.Exe(env);
            if (argValue instanceof _utils_Reference__WEBPACK_IMPORTED_MODULE_1__["Reference"]) {
                argValue = argValue.getValue();
            }
            references.push(argValue);
        }
        let ans = fun.EXE(env, references);
        if (ans instanceof _ReturnObj__WEBPACK_IMPORTED_MODULE_3__["ReturnObj"]) {
            return ans.getValue();
        }
        return null;
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_4__["GraphvizNode"]('FUNCTION', [this.object.GetGraph(env), new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_4__["GraphvizNode"](this.funId), new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_4__["GraphvizNode"]('ARGS', this.args.map(arg => arg.GetGraph(env)))]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/CreateObjNode.ts":
/*!************************************!*\
  !*** ./src/nodes/CreateObjNode.ts ***!
  \************************************/
/*! exports provided: CreateObjNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateObjNode", function() { return CreateObjNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_Reference__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Reference */ "./src/utils/Reference.ts");
/* harmony import */ var _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/PrimitiveTypoContainer */ "./src/utils/PrimitiveTypoContainer.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");




class CreateObjNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, attrs) {
        super(position);
        this.attrs = attrs;
    }
    GO(env) {
        const real = new Map();
        this.attrs.forEach((v, k) => {
            let value = v.Exe(env);
            if (value instanceof _utils_Reference__WEBPACK_IMPORTED_MODULE_1__["Reference"]) {
                value = value.getValue();
            }
            const reference = new _utils_Reference__WEBPACK_IMPORTED_MODULE_1__["Reference"]();
            reference.PutValueOnReference(value);
            real.set(k, reference);
        });
        return new _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["OBJECT"](real);
    }
    GetGraph(env) {
        let values = [];
        this.attrs.forEach((v, k) => {
            values.push(new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_3__["GraphvizNode"](k));
            values.push(v.GetGraph(env));
        });
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_3__["GraphvizNode"]('TYPE_VALUE', values);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/CreateObjVarNode.ts":
/*!***************************************!*\
  !*** ./src/nodes/CreateObjVarNode.ts ***!
  \***************************************/
/*! exports provided: CreateObjVarNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateObjVarNode", function() { return CreateObjVarNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_Reference__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Reference */ "./src/utils/Reference.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/Utils */ "./src/utils/Utils.ts");
/* harmony import */ var _utils_functions_FunctionRepresent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/functions/FunctionRepresent */ "./src/utils/functions/FunctionRepresent.ts");
/* harmony import */ var _ReturnObj__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ReturnObj */ "./src/nodes/ReturnObj.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");






class CreateObjVarNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, id, attr) {
        super(position);
        this.id = id;
        this.attr = attr;
    }
    GO(env) {
        let id = this.id.Exe(env);
        if (!(id instanceof _utils_Reference__WEBPACK_IMPORTED_MODULE_1__["Reference"])) {
            throw new _utils_Utils__WEBPACK_IMPORTED_MODULE_2__["SemanticException"]("Llamada a Objeto no definido", this.position);
        }
        let ref = id.getValue();
        let e = ref.GetProperty(this.attr);
        if (e instanceof _utils_functions_FunctionRepresent__WEBPACK_IMPORTED_MODULE_3__["FunctionRepresent"]) {
            let ans = e.EXE(env, new Array());
            if (ans instanceof _ReturnObj__WEBPACK_IMPORTED_MODULE_4__["ReturnObj"]) {
                return ans.getValue();
            }
        }
        return ref.GetProperty(this.attr);
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_5__["GraphvizNode"]('TYPE_MEMBER', [this.id.GetGraph(env), new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_5__["GraphvizNode"](this.attr)]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/DeclareFunNode.ts":
/*!*************************************!*\
  !*** ./src/nodes/DeclareFunNode.ts ***!
  \*************************************/
/*! exports provided: DeclareFunNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeclareFunNode", function() { return DeclareFunNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_functions_UserDefined__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/functions/UserDefined */ "./src/utils/functions/UserDefined.ts");
/* harmony import */ var _utils_Reference__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/Reference */ "./src/utils/Reference.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");
/* harmony import */ var _utils_TSGraphControl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/TSGraphControl */ "./src/utils/TSGraphControl.ts");





class DeclareFunNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, name, params, sentences, type = 'ANY') {
        super(position);
        this.name = name;
        this.params = params;
        this.sentences = sentences;
        this.type = type;
    }
    GO(env) {
        const value = new _utils_functions_UserDefined__WEBPACK_IMPORTED_MODULE_1__["UserDefined"](this.sentences, this.params, this.type);
        const reference = new _utils_Reference__WEBPACK_IMPORTED_MODULE_2__["Reference"]();
        reference.PutValueOnReference(value);
        if (this.name !== null) {
            env.Declare(this.name, reference);
            return undefined;
        }
        return value;
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_3__["GraphvizNode"]('NEW_FUN', [
            new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_3__["GraphvizNode"](this.name),
            new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_3__["GraphvizNode"](this.type),
            new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_3__["GraphvizNode"]('PARAMS', this.params.map(param => param.GetGraph(env))),
            new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_3__["GraphvizNode"]('NEW_FUN_BODY', this.sentences.map(sentence => sentence.GetGraph(env)))
        ]);
    }
    GetTSGraph() {
        let value = '';
        const graphId = _utils_TSGraphControl__WEBPACK_IMPORTED_MODULE_4__["TSGraphControl"].GetGraphId();
        value += `subgraph cluster_${graphId} { \n`;
        value += 'style=filled;\n' +
            'color="#2BBBAD";\n' +
            'fillcolor="#1E222A";\n';
        value += 'node [color="#2BBBAD" fontcolor="#2BBBAD" shape="rectangle"] \n';
        this.sentences.forEach(sentence => {
            value += sentence.GetTSGraph();
        });
        this.params.forEach(param => {
            value += param.GetTSGraph();
        });
        value += `label = "${this.name}";\n`;
        value += `}\n`;
        return value;
    }
}


/***/ }),

/***/ "./src/nodes/DeclareFunParamNode.ts":
/*!******************************************!*\
  !*** ./src/nodes/DeclareFunParamNode.ts ***!
  \******************************************/
/*! exports provided: DeclareFunParamNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeclareFunParamNode", function() { return DeclareFunParamNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/PrimitiveTypoContainer */ "./src/utils/PrimitiveTypoContainer.ts");
/* harmony import */ var _utils_Reference__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/Reference */ "./src/utils/Reference.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");
/* harmony import */ var _utils_TSGraphControl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/TSGraphControl */ "./src/utils/TSGraphControl.ts");





class DeclareFunParamNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, name, type = 'ANY') {
        super(position);
        this.name = name;
        this.type = type.toUpperCase();
    }
    GetName() {
        return this.name.toUpperCase();
    }
    GO(env) {
        const value = new _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_1__["UNDEFINED"]();
        const reference = new _utils_Reference__WEBPACK_IMPORTED_MODULE_2__["Reference"](this.type);
        reference.PutValueOnReference(value);
        env.Declare(this.name, reference);
        return reference;
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_3__["GraphvizNode"]('NEW_FUN_PARAM', [new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_3__["GraphvizNode"](this.name), new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_3__["GraphvizNode"](this.type)]);
    }
    GetTSGraph() {
        return `n${_utils_TSGraphControl__WEBPACK_IMPORTED_MODULE_4__["TSGraphControl"].GetNodeId()} [label="${this.name}"]\n`;
        ;
    }
}


/***/ }),

/***/ "./src/nodes/DeclareTypeStructureNode.ts":
/*!***********************************************!*\
  !*** ./src/nodes/DeclareTypeStructureNode.ts ***!
  \***********************************************/
/*! exports provided: DeclareTypeStructureNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeclareTypeStructureNode", function() { return DeclareTypeStructureNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Utils */ "./src/utils/Utils.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");



class DeclareTypeStructureNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, name, properties) {
        super(position);
        this.name = name;
        this.properties = properties.getMap();
    }
    GO(env) {
        const structure = new _utils_Utils__WEBPACK_IMPORTED_MODULE_1__["ObjectStructure"](this.properties);
        _utils_Utils__WEBPACK_IMPORTED_MODULE_1__["ObjectsStructures"].objects.set(this.name.toUpperCase(), structure);
        return undefined;
    }
    GetGraph(env) {
        let values = [];
        this.properties.forEach((v, k) => {
            values.push(new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"](k));
            values.push(new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"](v));
        });
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('NEW_TYPE', [new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"](this.name), new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('VALUES', values)]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/DeclareVarListNode.ts":
/*!*****************************************!*\
  !*** ./src/nodes/DeclareVarListNode.ts ***!
  \*****************************************/
/*! exports provided: DeclareVarListNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeclareVarListNode", function() { return DeclareVarListNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/PrimitiveTypoContainer */ "./src/utils/PrimitiveTypoContainer.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");



class DeclareVarListNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, tipoNombre, declarationOps, value, isConst = false) {
        super(position);
        this.tipoNombre = tipoNombre;
        this.declarationOps = declarationOps;
        this.value = value || null;
        this.isConst = isConst;
    }
    GO(env) {
        for (let op of this.declarationOps) {
            try {
                if (this.value !== null) {
                    op.AddValue(this.value.Exe(env), this.isConst, this.tipoNombre);
                }
                else {
                    op.AddValue(new _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_1__["UNDEFINED"](), this.isConst, this.tipoNombre);
                }
                op.Exe(env);
            }
            catch (e) {
                console.log(e.message);
            }
        }
        return null;
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('DECLARE_VAR_LIST', [new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"](this.tipoNombre ? this.tipoNombre : 'ANY'), this.value === null ? new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('UNDEFINED') : this.value.GetGraph(env)]
            .concat(this.declarationOps.map(op => op.GetGraph(env))));
    }
    GetTSGraph() {
        let val = '';
        this.declarationOps.forEach(declare => {
            val += declare.GetTSGraph();
        });
        return val;
    }
}


/***/ }),

/***/ "./src/nodes/DeclareVarNode.ts":
/*!*************************************!*\
  !*** ./src/nodes/DeclareVarNode.ts ***!
  \*************************************/
/*! exports provided: DeclareVarNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeclareVarNode", function() { return DeclareVarNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/PrimitiveTypoContainer */ "./src/utils/PrimitiveTypoContainer.ts");
/* harmony import */ var _utils_Reference__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/Reference */ "./src/utils/Reference.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");
/* harmony import */ var _utils_TSGraphControl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/TSGraphControl */ "./src/utils/TSGraphControl.ts");





class DeclareVarNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, name, value = null) {
        super(position);
        this.value = new _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_1__["UNDEFINED"]();
        this.name = name;
        this.valueOp = value;
    }
    GO(env) {
        this.AddVarOnDeclare(env, this.name);
        return null;
    }
    AddValue(value = new _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_1__["UNDEFINED"](), isConst = false, tipoNombre = 'ANY') {
        this.value = value;
        this.isConst = isConst;
        if (tipoNombre === '') {
            tipoNombre = 'ANY';
        }
        this.tipoNombre = tipoNombre.toUpperCase();
    }
    AddVarOnDeclare(env, identifier) {
        let value = this.value;
        if (this.valueOp != null) {
            value = this.valueOp.Exe(env);
        }
        const reference = new _utils_Reference__WEBPACK_IMPORTED_MODULE_2__["Reference"](this.tipoNombre, this.isConst);
        reference.PutValueOnReference(value);
        env.Declare(identifier, reference);
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_3__["GraphvizNode"]('DECLARE_VAR', [new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_3__["GraphvizNode"](this.name), new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_3__["GraphvizNode"](this.tipoNombre ? this.tipoNombre : 'ANY'),
            this.valueOp !== null ? this.valueOp.GetGraph(env) : new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_3__["GraphvizNode"]('undefined')]);
    }
    GetTSGraph() {
        return `n${_utils_TSGraphControl__WEBPACK_IMPORTED_MODULE_4__["TSGraphControl"].GetNodeId()} [label="${this.name}"]\n`;
    }
}


/***/ }),

/***/ "./src/nodes/DifNode.ts":
/*!******************************!*\
  !*** ./src/nodes/DifNode.ts ***!
  \******************************/
/*! exports provided: DifNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DifNode", function() { return DifNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_RelationalOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/RelationalOperationsFunctions */ "./src/utils/RelationalOperationsFunctions.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");



class DifNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, lf, rt) {
        super(position);
        this.lf = lf;
        this.rt = rt;
    }
    GO(env) {
        return Object(_utils_RelationalOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__["Diferente"])(this.lf.Exe(env), this.rt.Exe(env), this.position);
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('DIF', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/DivNode.ts":
/*!******************************!*\
  !*** ./src/nodes/DivNode.ts ***!
  \******************************/
/*! exports provided: DivNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DivNode", function() { return DivNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_AlgebraicOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/AlgebraicOperationsFunctions */ "./src/utils/AlgebraicOperationsFunctions.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");



class DivNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, lf, rt) {
        super(position);
        this.lf = lf;
        this.rt = rt;
    }
    GO(env) {
        return Object(_utils_AlgebraicOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__["Division"])(this.lf.Exe(env), this.rt.Exe(env), this.position);
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('DIV', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/DoWhileNode.ts":
/*!**********************************!*\
  !*** ./src/nodes/DoWhileNode.ts ***!
  \**********************************/
/*! exports provided: DoWhileNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DoWhileNode", function() { return DoWhileNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Utils */ "./src/utils/Utils.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");
/* harmony import */ var _utils_TSGraphControl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/TSGraphControl */ "./src/utils/TSGraphControl.ts");




class DoWhileNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, condition, sentences) {
        super(position);
        this.condition = condition;
        this.sentences = sentences;
    }
    GO(env) {
        return Object(_utils_Utils__WEBPACK_IMPORTED_MODULE_1__["LogicDoWhile"])(env, this.condition, this.sentences, null);
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('DO_WHILE', [new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('WHILE_BODY', this.sentences.map(sentence => sentence.GetGraph(env))), this.condition.GetGraph(env)]);
    }
    GetTSGraph() {
        let value = '';
        const graphId = _utils_TSGraphControl__WEBPACK_IMPORTED_MODULE_3__["TSGraphControl"].GetGraphId();
        value += `subgraph cluster_${graphId} { \n`;
        value += 'style=filled;\n' +
            'color="#2BBBAD";\n' +
            'fillcolor="#1E222A";\n';
        value += 'node [color="#2BBBAD" fontcolor="#2BBBAD" shape="rectangle"] \n';
        value += this.condition.GetTSGraph();
        this.sentences.forEach(sentence => {
            value += sentence.GetTSGraph();
        });
        value += `label = "${"DO_WHILE_SENTENCE"}";\n`;
        value += `}\n`;
        return value;
    }
}


/***/ }),

/***/ "./src/nodes/EqNode.ts":
/*!*****************************!*\
  !*** ./src/nodes/EqNode.ts ***!
  \*****************************/
/*! exports provided: EqNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EqNode", function() { return EqNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_RelationalOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/RelationalOperationsFunctions */ "./src/utils/RelationalOperationsFunctions.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");



class EqNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, lf, rt) {
        super(position);
        this.lf = lf;
        this.rt = rt;
    }
    GO(env) {
        return Object(_utils_RelationalOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__["Igual"])(this.lf.Exe(env), this.rt.Exe(env), this.position);
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('EQ', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/ExpNode.ts":
/*!******************************!*\
  !*** ./src/nodes/ExpNode.ts ***!
  \******************************/
/*! exports provided: ExpNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExpNode", function() { return ExpNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_AlgebraicOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/AlgebraicOperationsFunctions */ "./src/utils/AlgebraicOperationsFunctions.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");



class ExpNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, lf, rt) {
        super(position);
        this.lf = lf;
        this.rt = rt;
    }
    GO(env) {
        return Object(_utils_AlgebraicOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__["Potencia"])(this.lf.Exe(env), this.rt.Exe(env), this.position);
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('EXP', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/ForInNode.ts":
/*!********************************!*\
  !*** ./src/nodes/ForInNode.ts ***!
  \********************************/
/*! exports provided: ForInNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForInNode", function() { return ForInNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_Envmnt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Envmnt */ "./src/utils/Envmnt.ts");
/* harmony import */ var _utils_Reference__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/Reference */ "./src/utils/Reference.ts");
/* harmony import */ var _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/PrimitiveTypoContainer */ "./src/utils/PrimitiveTypoContainer.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/Utils */ "./src/utils/Utils.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");
/* harmony import */ var _utils_TSGraphControl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/TSGraphControl */ "./src/utils/TSGraphControl.ts");







class ForInNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, controlVar, newControlVar, array, sentences) {
        super(position);
        this.controlVar = controlVar;
        this.newControlVar = newControlVar;
        this.array = array;
        this.sentences = sentences;
    }
    GO(env) {
        let array = this.array.Exe(env);
        if (array instanceof _utils_Reference__WEBPACK_IMPORTED_MODULE_2__["Reference"]) {
            array = array.getValue();
        }
        if (!(array instanceof _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_3__["ARRAY"])) {
            throw new _utils_Utils__WEBPACK_IMPORTED_MODULE_4__["SemanticException"]("Se esperaba una referencia a un arreglo en ciclo For In", this.position);
        }
        const env0 = new _utils_Envmnt__WEBPACK_IMPORTED_MODULE_1__["Envmnt"](env, this.sentences);
        if (this.newControlVar) {
            env0.AddProperty(this.controlVar, new _utils_Reference__WEBPACK_IMPORTED_MODULE_2__["Reference"]());
        }
        for (let index in array.getValueList()) {
            Object(_utils_Utils__WEBPACK_IMPORTED_MODULE_4__["FindVar"])(env0, this.controlVar).setValue(new _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_3__["STRING"](index));
            env0.GO_ALL();
        }
        return undefined;
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_5__["GraphvizNode"]('FOR_IN', [new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_5__["GraphvizNode"](this.controlVar), new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_5__["GraphvizNode"]('FOR_IN_BODY', this.sentences.map(sentence => sentence.GetGraph(env)))]);
    }
    GetTSGraph() {
        let value = '';
        const graphId = _utils_TSGraphControl__WEBPACK_IMPORTED_MODULE_6__["TSGraphControl"].GetGraphId();
        value += `subgraph cluster_${graphId} { \n`;
        value += 'style=filled;\n' +
            'color="#2BBBAD";\n' +
            'fillcolor="#1E222A";\n';
        value += 'node [color="#2BBBAD" fontcolor="#2BBBAD" shape="rectangle"] \n';
        value += `n${_utils_TSGraphControl__WEBPACK_IMPORTED_MODULE_6__["TSGraphControl"].GetNodeId()} [label="${this.controlVar}"]\n`;
        value += this.array.GetTSGraph();
        this.sentences.forEach(sentence => {
            value += sentence.GetTSGraph();
        });
        value += `label = "${"FOR_IN_SENTENCE"}";\n`;
        value += `}\n`;
        return value;
    }
}


/***/ }),

/***/ "./src/nodes/ForNode.ts":
/*!******************************!*\
  !*** ./src/nodes/ForNode.ts ***!
  \******************************/
/*! exports provided: ForNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForNode", function() { return ForNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_Envmnt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Envmnt */ "./src/utils/Envmnt.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/Utils */ "./src/utils/Utils.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");
/* harmony import */ var _utils_TSGraphControl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/TSGraphControl */ "./src/utils/TSGraphControl.ts");





class ForNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, condition0, condition1, condition2, sentences) {
        super(position);
        this.condition0 = condition0;
        this.condition1 = condition1;
        this.condition2 = condition2;
        this.sentences = sentences;
    }
    GO(env) {
        const conditionEnv = new _utils_Envmnt__WEBPACK_IMPORTED_MODULE_1__["Envmnt"](env, [this.condition0]);
        conditionEnv.GO_ALL();
        Object(_utils_Utils__WEBPACK_IMPORTED_MODULE_2__["LogicWhile"])(conditionEnv, this.condition1, this.sentences, this.condition2);
        return undefined;
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_3__["GraphvizNode"]('FOR', [
            this.condition0.GetGraph(env),
            this.condition1.GetGraph(env),
            this.condition2.GetGraph(env),
            new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_3__["GraphvizNode"]('FOR_BODY', this.sentences.map(sentence => sentence.GetGraph(env)))
        ]);
    }
    GetTSGraph() {
        let value = '';
        const graphId = _utils_TSGraphControl__WEBPACK_IMPORTED_MODULE_4__["TSGraphControl"].GetGraphId();
        value += `subgraph cluster_${graphId} { \n`;
        value += 'style=filled;\n' +
            'color="#2BBBAD";\n' +
            'fillcolor="#1E222A";\n';
        value += 'node [color="#2BBBAD" fontcolor="#2BBBAD" shape="rectangle"] \n';
        value += this.condition0.GetTSGraph();
        value += this.condition1.GetTSGraph();
        value += this.condition2.GetTSGraph();
        this.sentences.forEach(sentence => {
            value += sentence.GetTSGraph();
        });
        value += `label = "${"FOR_SENTENCE"}";\n`;
        value += `}\n`;
        return value;
    }
}


/***/ }),

/***/ "./src/nodes/ForOfNode.ts":
/*!********************************!*\
  !*** ./src/nodes/ForOfNode.ts ***!
  \********************************/
/*! exports provided: ForOfNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForOfNode", function() { return ForOfNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_Envmnt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Envmnt */ "./src/utils/Envmnt.ts");
/* harmony import */ var _utils_Reference__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/Reference */ "./src/utils/Reference.ts");
/* harmony import */ var _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/PrimitiveTypoContainer */ "./src/utils/PrimitiveTypoContainer.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/Utils */ "./src/utils/Utils.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");
/* harmony import */ var _utils_TSGraphControl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/TSGraphControl */ "./src/utils/TSGraphControl.ts");







class ForOfNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, controlVar, newControlVar, array, sentences) {
        super(position);
        this.controlVar = controlVar;
        this.newControlVar = newControlVar;
        this.array = array;
        this.sentences = sentences;
    }
    GO(env) {
        let array = this.array.Exe(env);
        if (array instanceof _utils_Reference__WEBPACK_IMPORTED_MODULE_2__["Reference"]) {
            array = array.getValue();
        }
        if (!(array instanceof _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_3__["ARRAY"])) {
            throw new _utils_Utils__WEBPACK_IMPORTED_MODULE_4__["SemanticException"]("Se esperaba una referncia a un arreglo en ciclo For Of", this.position);
        }
        const env0 = new _utils_Envmnt__WEBPACK_IMPORTED_MODULE_1__["Envmnt"](env, this.sentences);
        if (this.newControlVar) {
            env0.AddProperty(this.controlVar, new _utils_Reference__WEBPACK_IMPORTED_MODULE_2__["Reference"]());
        }
        for (let element of array.getValueList()) {
            let val = element;
            if (val instanceof _utils_Reference__WEBPACK_IMPORTED_MODULE_2__["Reference"]) {
                val = val.getValue();
            }
            Object(_utils_Utils__WEBPACK_IMPORTED_MODULE_4__["FindVar"])(env0, this.controlVar).setValue(val);
            env0.GO_ALL();
        }
        return undefined;
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_5__["GraphvizNode"]('FOR_OF', [new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_5__["GraphvizNode"](this.controlVar), new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_5__["GraphvizNode"]('FOR_OF_BODY', this.sentences.map(sentence => sentence.GetGraph(env)))]);
    }
    GetTSGraph() {
        let value = '';
        const graphId = _utils_TSGraphControl__WEBPACK_IMPORTED_MODULE_6__["TSGraphControl"].GetGraphId();
        value += `subgraph cluster_${graphId} { \n`;
        value += 'style=filled;\n' +
            'color="#2BBBAD";\n' +
            'fillcolor="#1E222A";\n';
        value += 'node [color="#2BBBAD" fontcolor="#2BBBAD" shape="rectangle"] \n';
        value += `n${_utils_TSGraphControl__WEBPACK_IMPORTED_MODULE_6__["TSGraphControl"].GetNodeId()} [label="${this.controlVar}"]\n`;
        value += this.array.GetTSGraph();
        this.sentences.forEach(sentence => {
            value += sentence.GetTSGraph();
        });
        value += `label = "${"FOR_OF_SENTENCE"}";\n`;
        value += `}\n`;
        return value;
    }
}


/***/ }),

/***/ "./src/nodes/FunctionCallNode.ts":
/*!***************************************!*\
  !*** ./src/nodes/FunctionCallNode.ts ***!
  \***************************************/
/*! exports provided: FunctionCallNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FunctionCallNode", function() { return FunctionCallNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_Reference__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Reference */ "./src/utils/Reference.ts");
/* harmony import */ var _utils_functions_FunctionRepresent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/functions/FunctionRepresent */ "./src/utils/functions/FunctionRepresent.ts");
/* harmony import */ var _ReturnObj__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ReturnObj */ "./src/nodes/ReturnObj.ts");
/* harmony import */ var _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/PrimitiveTypoContainer */ "./src/utils/PrimitiveTypoContainer.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/Utils */ "./src/utils/Utils.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");







class FunctionCallNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, name, args) {
        super(position);
        this.name = name;
        this.args = args;
    }
    GO(env) {
        let id = this.name.Exe(env);
        if (id instanceof _utils_Reference__WEBPACK_IMPORTED_MODULE_1__["Reference"]) {
            id = id.getValue();
        }
        const argsValues = new Array();
        for (let arg of this.args) {
            let ans = arg.Exe(env);
            if (ans instanceof _utils_Reference__WEBPACK_IMPORTED_MODULE_1__["Reference"]) {
                ans = ans.getValue();
            }
            argsValues.push(ans);
        }
        if (id instanceof _utils_functions_FunctionRepresent__WEBPACK_IMPORTED_MODULE_2__["FunctionRepresent"]) {
            let funct = id;
            let ans = funct.EXE(env, argsValues);
            if (ans instanceof _ReturnObj__WEBPACK_IMPORTED_MODULE_3__["ReturnObj"]) {
                let ret = ans.getValue();
                if (ret instanceof _utils_Reference__WEBPACK_IMPORTED_MODULE_1__["Reference"]) {
                    ret = ret.getValue();
                }
                if (funct.getType() !== ret.typo
                    && funct.getType() !== 'ANY'
                    && ret.typo !== 'NULL'
                    && ret.typo !== 'UNDEFINED'
                    && ret.typo !== 'OBJECT'
                    || (Object(_utils_Utils__WEBPACK_IMPORTED_MODULE_5__["IsPrimitiveTypo"])(funct.getType()) && ret.typo === 'OBJECT')) {
                    throw new _utils_Utils__WEBPACK_IMPORTED_MODULE_5__["SemanticException"](`Se esperaba retorno de tipo ${funct.getType()}, se retorno tipo ${ret.typo}`, this.position);
                }
                return ans.getValue();
            }
        }
        return new _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_4__["UNDEFINED"]();
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_6__["GraphvizNode"]('FUNCTION_CALL', [this.name.GetGraph(env), new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_6__["GraphvizNode"]('ARGS', this.args.map(arg => arg.GetGraph(env)))]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/HigherEqNode.ts":
/*!***********************************!*\
  !*** ./src/nodes/HigherEqNode.ts ***!
  \***********************************/
/*! exports provided: HigherEqNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HigherEqNode", function() { return HigherEqNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_RelationalOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/RelationalOperationsFunctions */ "./src/utils/RelationalOperationsFunctions.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");



class HigherEqNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, lf, rt) {
        super(position);
        this.lf = lf;
        this.rt = rt;
    }
    GO(env) {
        return Object(_utils_RelationalOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__["MayorEq"])(this.lf.Exe(env), this.rt.Exe(env), this.position);
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('MAY_EQ', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/HigherNode.ts":
/*!*********************************!*\
  !*** ./src/nodes/HigherNode.ts ***!
  \*********************************/
/*! exports provided: HigherNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HigherNode", function() { return HigherNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_RelationalOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/RelationalOperationsFunctions */ "./src/utils/RelationalOperationsFunctions.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");



class HigherNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, lf, rt) {
        super(position);
        this.lf = lf;
        this.rt = rt;
    }
    GO(env) {
        return Object(_utils_RelationalOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__["Mayor"])(this.lf.Exe(env), this.rt.Exe(env), this.position);
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('MAY', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/IfNode.ts":
/*!*****************************!*\
  !*** ./src/nodes/IfNode.ts ***!
  \*****************************/
/*! exports provided: IfNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IfNode", function() { return IfNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_Envmnt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Envmnt */ "./src/utils/Envmnt.ts");
/* harmony import */ var _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/PrimitiveTypoContainer */ "./src/utils/PrimitiveTypoContainer.ts");
/* harmony import */ var _utils_Reference__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/Reference */ "./src/utils/Reference.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/Utils */ "./src/utils/Utils.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");
/* harmony import */ var _utils_TSGraphControl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/TSGraphControl */ "./src/utils/TSGraphControl.ts");







class IfNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, condition, operationsTrue, operationsFalse) {
        super(position);
        this.condition = condition;
        this.operationsTrue = operationsTrue;
        this.operationsFalse = operationsFalse;
    }
    GO(env) {
        let condition = this.condition.Exe(env);
        if (condition instanceof _utils_Reference__WEBPACK_IMPORTED_MODULE_3__["Reference"]) {
            condition = condition.getValue();
        }
        if (!(condition instanceof _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"])) {
            throw new _utils_Utils__WEBPACK_IMPORTED_MODULE_4__["SemanticException"]("Condicion utilizada como parametro no soportada por sentencia If", this.position);
        }
        if (condition.getValue()) {
            const envTrue = new _utils_Envmnt__WEBPACK_IMPORTED_MODULE_1__["Envmnt"](env, this.operationsTrue);
            Object(_utils_Utils__WEBPACK_IMPORTED_MODULE_4__["PassPropsAndFuncs"])(env, envTrue);
            return envTrue.GO_ALL();
        }
        const envFalse = new _utils_Envmnt__WEBPACK_IMPORTED_MODULE_1__["Envmnt"](env, this.operationsFalse);
        Object(_utils_Utils__WEBPACK_IMPORTED_MODULE_4__["PassPropsAndFuncs"])(env, envFalse);
        return envFalse.GO_ALL();
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_5__["GraphvizNode"]('IF', [
            this.condition.GetGraph(env),
            new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_5__["GraphvizNode"]('IF_BODY_TRUE', this.operationsTrue.map(sentence => sentence.GetGraph(env))),
            new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_5__["GraphvizNode"]('IF_BODY_FALSE', this.operationsFalse.map(sentence => sentence.GetGraph(env)))
        ]);
    }
    GetTSGraph() {
        let value = '';
        const graphId = _utils_TSGraphControl__WEBPACK_IMPORTED_MODULE_6__["TSGraphControl"].GetGraphId();
        value += `subgraph cluster_${graphId} { \n`;
        value += 'style=filled;\n' +
            'color="#2BBBAD";\n' +
            'fillcolor="#1E222A";\n';
        value += 'node [color="#2BBBAD" fontcolor="#2BBBAD" shape="rectangle"] \n';
        value += this.condition.GetTSGraph();
        value += `subgraph cluster_${_utils_TSGraphControl__WEBPACK_IMPORTED_MODULE_6__["TSGraphControl"].GetGraphId()} { \n`;
        value += 'style=filled;\n' +
            'color=black;\n' +
            'fillcolor="yellow";\n';
        value += 'node [fillcolor="yellow" shape="rectangle"] \n';
        this.operationsTrue.forEach(sentence => {
            value += sentence.GetTSGraph();
        });
        value += `label = "${"IF_SENTENCE_TRUE"}";\n`;
        value += `}\n`;
        value += `subgraph cluster_${_utils_TSGraphControl__WEBPACK_IMPORTED_MODULE_6__["TSGraphControl"].GetGraphId()} { \n`;
        value += 'style=filled;\n' +
            'color=black;\n' +
            'fillcolor="yellow";\n';
        value += 'node [fillcolor="yellow" shape="rectangle"] \n';
        this.operationsFalse.forEach(sentence => {
            value += sentence.GetTSGraph();
        });
        value += `label = "${"IF_SENTENCE_FALSE"}";\n`;
        value += `}\n`;
        value += `label = "${"IF_SENTENCE"}";\n`;
        value += `}\n`;
        return value;
    }
}


/***/ }),

/***/ "./src/nodes/MinorEqNode.ts":
/*!**********************************!*\
  !*** ./src/nodes/MinorEqNode.ts ***!
  \**********************************/
/*! exports provided: MinorEqNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MinorEqNode", function() { return MinorEqNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_RelationalOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/RelationalOperationsFunctions */ "./src/utils/RelationalOperationsFunctions.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");



class MinorEqNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, lf, rt) {
        super(position);
        this.lf = lf;
        this.rt = rt;
    }
    GO(env) {
        return Object(_utils_RelationalOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__["MenorEq"])(this.lf.Exe(env), this.rt.Exe(env), this.position);
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('MIN_EQ', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/MinorNode.ts":
/*!********************************!*\
  !*** ./src/nodes/MinorNode.ts ***!
  \********************************/
/*! exports provided: MinorNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MinorNode", function() { return MinorNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_RelationalOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/RelationalOperationsFunctions */ "./src/utils/RelationalOperationsFunctions.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");



class MinorNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, lf, rt) {
        super(position);
        this.lf = lf;
        this.rt = rt;
    }
    GO(env) {
        return Object(_utils_RelationalOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__["Menor"])(this.lf.Exe(env), this.rt.Exe(env), this.position);
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('MIN', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/ModNode.ts":
/*!******************************!*\
  !*** ./src/nodes/ModNode.ts ***!
  \******************************/
/*! exports provided: ModNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModNode", function() { return ModNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_AlgebraicOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/AlgebraicOperationsFunctions */ "./src/utils/AlgebraicOperationsFunctions.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");



class ModNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, lf, rt) {
        super(position);
        this.lf = lf;
        this.rt = rt;
    }
    GO(env) {
        return Object(_utils_AlgebraicOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__["Modulo"])(this.lf.Exe(env), this.rt.Exe(env), this.position);
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('MOD', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/MulNode.ts":
/*!******************************!*\
  !*** ./src/nodes/MulNode.ts ***!
  \******************************/
/*! exports provided: MulNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MulNode", function() { return MulNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_AlgebraicOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/AlgebraicOperationsFunctions */ "./src/utils/AlgebraicOperationsFunctions.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");



class MulNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, lf, rt) {
        super(position);
        this.lf = lf;
        this.rt = rt;
    }
    GO(env) {
        return Object(_utils_AlgebraicOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__["Multiplicacion"])(this.lf.Exe(env), this.rt.Exe(env), this.position);
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('MUL', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/NotNode.ts":
/*!******************************!*\
  !*** ./src/nodes/NotNode.ts ***!
  \******************************/
/*! exports provided: NotNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotNode", function() { return NotNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_LogicalOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/LogicalOperationsFunctions */ "./src/utils/LogicalOperationsFunctions.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");



class NotNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, lf, rt) {
        super(position);
        this.lf = lf;
    }
    GO(env) {
        return Object(_utils_LogicalOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__["Not"])(this.lf.Exe(env), this.position);
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('NOT', [this.lf.GetGraph(env)]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/NullNode.ts":
/*!*******************************!*\
  !*** ./src/nodes/NullNode.ts ***!
  \*******************************/
/*! exports provided: NullNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NullNode", function() { return NullNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/PrimitiveTypoContainer */ "./src/utils/PrimitiveTypoContainer.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");



class NullNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor() {
        super();
    }
    GO(env) {
        return new _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_1__["NULL"]();
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('NULL', [new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('null')]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/NumberNode.ts":
/*!*********************************!*\
  !*** ./src/nodes/NumberNode.ts ***!
  \*********************************/
/*! exports provided: NumberNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NumberNode", function() { return NumberNode; });
/* harmony import */ var _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/PrimitiveTypoContainer */ "./src/utils/PrimitiveTypoContainer.ts");
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");



class NumberNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_1__["Op"] {
    constructor(position, val) {
        super(position);
        this.val = val;
    }
    GO(env) {
        return new _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_0__["NUMBER"](this.val);
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('NUMBER', [new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"](this.val + '')]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/OrNode.ts":
/*!*****************************!*\
  !*** ./src/nodes/OrNode.ts ***!
  \*****************************/
/*! exports provided: OrNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrNode", function() { return OrNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_LogicalOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/LogicalOperationsFunctions */ "./src/utils/LogicalOperationsFunctions.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");



class OrNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, lf, rt) {
        super(position);
        this.lf = lf;
        this.rt = rt;
    }
    GO(env) {
        return Object(_utils_LogicalOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__["Or"])(this.lf.Exe(env), this.rt.Exe(env), this.position);
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('OR', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/ReAddNode.ts":
/*!********************************!*\
  !*** ./src/nodes/ReAddNode.ts ***!
  \********************************/
/*! exports provided: ReAddNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReAddNode", function() { return ReAddNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_AlgebraicOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/AlgebraicOperationsFunctions */ "./src/utils/AlgebraicOperationsFunctions.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");



class ReAddNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, lf) {
        super(position);
        this.lf = lf;
    }
    GO(env) {
        return Object(_utils_AlgebraicOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__["Add"])(this.lf.Exe(env), this.position);
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('RE_ADD', [this.lf.GetGraph(env)]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/ReAsignAddNode.ts":
/*!*************************************!*\
  !*** ./src/nodes/ReAsignAddNode.ts ***!
  \*************************************/
/*! exports provided: ReAsignAddNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReAsignAddNode", function() { return ReAsignAddNode; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ "./src/index.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Utils */ "./src/utils/Utils.ts");
/* harmony import */ var _utils_AlgebraicOperationsFunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/AlgebraicOperationsFunctions */ "./src/utils/AlgebraicOperationsFunctions.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");




class ReAsignAddNode extends _index__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, lf, rt) {
        super(position);
        this.lf = lf;
        this.rt = rt;
    }
    GO(env) {
        const lf = this.lf.Exe(env);
        const rt = this.rt.Exe(env);
        if (!(lf instanceof _index__WEBPACK_IMPORTED_MODULE_0__["Reference"])) {
            throw new _utils_Utils__WEBPACK_IMPORTED_MODULE_1__["SemanticException"](`No se puede asiganr a ${lf}, las asignaciones solo pueden ser sobre una referencia`, this.position);
        }
        lf.PutValueOnReference(Object(_utils_AlgebraicOperationsFunctions__WEBPACK_IMPORTED_MODULE_2__["Suma"])(lf.getValue(), rt, this.position));
        return lf.getValue();
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_3__["GraphvizNode"]('RE_ASIGN_ADD', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/ReAsignDivNode.ts":
/*!*************************************!*\
  !*** ./src/nodes/ReAsignDivNode.ts ***!
  \*************************************/
/*! exports provided: ReAsignDivNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReAsignDivNode", function() { return ReAsignDivNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_Reference__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Reference */ "./src/utils/Reference.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/Utils */ "./src/utils/Utils.ts");
/* harmony import */ var _utils_AlgebraicOperationsFunctions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/AlgebraicOperationsFunctions */ "./src/utils/AlgebraicOperationsFunctions.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");





class ReAsignDivNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, lf, rt) {
        super(position);
        this.lf = lf;
        this.rt = rt;
    }
    GO(env) {
        const lf = this.lf.Exe(env);
        const rt = this.rt.Exe(env);
        if (!(lf instanceof _utils_Reference__WEBPACK_IMPORTED_MODULE_1__["Reference"])) {
            throw new _utils_Utils__WEBPACK_IMPORTED_MODULE_2__["SemanticException"](`No se puede asiganr a ${lf}, las asignaciones solo pueden ser sobre una referencia`, this.position);
        }
        lf.PutValueOnReference(Object(_utils_AlgebraicOperationsFunctions__WEBPACK_IMPORTED_MODULE_3__["Division"])(lf.getValue(), rt, this.position));
        return lf.getValue();
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_4__["GraphvizNode"]('RE_ASIGN_DIV', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/ReAsignModNode.ts":
/*!*************************************!*\
  !*** ./src/nodes/ReAsignModNode.ts ***!
  \*************************************/
/*! exports provided: ReAsignModNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReAsignModNode", function() { return ReAsignModNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_Reference__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Reference */ "./src/utils/Reference.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/Utils */ "./src/utils/Utils.ts");
/* harmony import */ var _utils_AlgebraicOperationsFunctions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/AlgebraicOperationsFunctions */ "./src/utils/AlgebraicOperationsFunctions.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");





class ReAsignModNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, lf, rt) {
        super(position);
        this.lf = lf;
        this.rt = rt;
    }
    GO(env) {
        const lf = this.lf.Exe(env);
        const rt = this.rt.Exe(env);
        if (!(lf instanceof _utils_Reference__WEBPACK_IMPORTED_MODULE_1__["Reference"])) {
            throw new _utils_Utils__WEBPACK_IMPORTED_MODULE_2__["SemanticException"](`No se puede asiganr a ${lf}, las asignaciones solo pueden ser sobre una referencia`, this.position);
        }
        lf.PutValueOnReference(Object(_utils_AlgebraicOperationsFunctions__WEBPACK_IMPORTED_MODULE_3__["Modulo"])(lf.getValue(), rt, this.position));
        return lf.getValue();
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_4__["GraphvizNode"]('RE_ASIGN_MOD', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/ReAsignMulNode.ts":
/*!*************************************!*\
  !*** ./src/nodes/ReAsignMulNode.ts ***!
  \*************************************/
/*! exports provided: ReAsignMulNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReAsignMulNode", function() { return ReAsignMulNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_Reference__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Reference */ "./src/utils/Reference.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/Utils */ "./src/utils/Utils.ts");
/* harmony import */ var _utils_AlgebraicOperationsFunctions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/AlgebraicOperationsFunctions */ "./src/utils/AlgebraicOperationsFunctions.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");





class ReAsignMulNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, lf, rt) {
        super(position);
        this.lf = lf;
        this.rt = rt;
    }
    GO(env) {
        const lf = this.lf.Exe(env);
        const rt = this.rt.Exe(env);
        if (!(lf instanceof _utils_Reference__WEBPACK_IMPORTED_MODULE_1__["Reference"])) {
            throw new _utils_Utils__WEBPACK_IMPORTED_MODULE_2__["SemanticException"](`No se puede asiganr a ${lf}, las asignaciones solo pueden ser sobre una referencia`, this.position);
        }
        lf.PutValueOnReference(Object(_utils_AlgebraicOperationsFunctions__WEBPACK_IMPORTED_MODULE_3__["Multiplicacion"])(lf.getValue(), rt, this.position));
        return lf.getValue();
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_4__["GraphvizNode"]('RE_ASIGN_MUL-', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/ReAsignSubNode.ts":
/*!*************************************!*\
  !*** ./src/nodes/ReAsignSubNode.ts ***!
  \*************************************/
/*! exports provided: ReAsignSubNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReAsignSubNode", function() { return ReAsignSubNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_Reference__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Reference */ "./src/utils/Reference.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/Utils */ "./src/utils/Utils.ts");
/* harmony import */ var _utils_AlgebraicOperationsFunctions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/AlgebraicOperationsFunctions */ "./src/utils/AlgebraicOperationsFunctions.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");





class ReAsignSubNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, lf, rt) {
        super(position);
        this.lf = lf;
        this.rt = rt;
    }
    GO(env) {
        const lf = this.lf.Exe(env);
        const rt = this.rt.Exe(env);
        if (!(lf instanceof _utils_Reference__WEBPACK_IMPORTED_MODULE_1__["Reference"])) {
            throw new _utils_Utils__WEBPACK_IMPORTED_MODULE_2__["SemanticException"](`No se puede asiganr a ${lf}, las asignaciones solo pueden ser sobre una referencia`, this.position);
        }
        lf.PutValueOnReference(Object(_utils_AlgebraicOperationsFunctions__WEBPACK_IMPORTED_MODULE_3__["Resta"])(lf.getValue(), rt, this.position));
        return lf.getValue();
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_4__["GraphvizNode"]('RE_ASIGN_SUB', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/ReSubNode.ts":
/*!********************************!*\
  !*** ./src/nodes/ReSubNode.ts ***!
  \********************************/
/*! exports provided: ReSubNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReSubNode", function() { return ReSubNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_AlgebraicOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/AlgebraicOperationsFunctions */ "./src/utils/AlgebraicOperationsFunctions.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");



class ReSubNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, lf) {
        super(position);
        this.lf = lf;
    }
    GO(env) {
        return Object(_utils_AlgebraicOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__["Sub"])(this.lf.Exe(env), this.position);
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('RE_SUB', [this.lf.GetGraph(env)]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/ReturnNode.ts":
/*!*********************************!*\
  !*** ./src/nodes/ReturnNode.ts ***!
  \*********************************/
/*! exports provided: ReturnNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReturnNode", function() { return ReturnNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _ReturnObj__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReturnObj */ "./src/nodes/ReturnObj.ts");
/* harmony import */ var _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/PrimitiveTypoContainer */ "./src/utils/PrimitiveTypoContainer.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");




class ReturnNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, value) {
        super(position);
        this.value = value;
    }
    GO(env) {
        if (this.value !== null) {
            const value = this.value.Exe(env);
            return new _ReturnObj__WEBPACK_IMPORTED_MODULE_1__["ReturnObj"](value);
        }
        return new _ReturnObj__WEBPACK_IMPORTED_MODULE_1__["ReturnObj"](new _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["UNDEFINED"]());
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_3__["GraphvizNode"]('RETURN', this.value ? [this.value.GetGraph(env)] : []);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/ReturnObj.ts":
/*!********************************!*\
  !*** ./src/nodes/ReturnObj.ts ***!
  \********************************/
/*! exports provided: ReturnObj */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReturnObj", function() { return ReturnObj; });
/* harmony import */ var _utils_Cntnr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Cntnr */ "./src/utils/Cntnr.ts");

class ReturnObj extends _utils_Cntnr__WEBPACK_IMPORTED_MODULE_0__["Cntnr"] {
    constructor(returnn) {
        super();
        this.toString = () => {
            return "mi objeto return (ReturnObj)";
        };
        this.returnn = returnn;
    }
    getValue() {
        return this.returnn;
    }
}


/***/ }),

/***/ "./src/nodes/SentenceTernaryNode.ts":
/*!******************************************!*\
  !*** ./src/nodes/SentenceTernaryNode.ts ***!
  \******************************************/
/*! exports provided: SentenceTernaryNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SentenceTernaryNode", function() { return SentenceTernaryNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_Reference__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Reference */ "./src/utils/Reference.ts");
/* harmony import */ var _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/PrimitiveTypoContainer */ "./src/utils/PrimitiveTypoContainer.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/Utils */ "./src/utils/Utils.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");





class SentenceTernaryNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, condition, trueSentence, falseSentence) {
        super(position);
        this.condicion = condition;
        this.trueSentence = trueSentence;
        this.falseSentence = falseSentence;
    }
    GO(env) {
        let ans = this.condicion.Exe(env);
        if (ans instanceof _utils_Reference__WEBPACK_IMPORTED_MODULE_1__["Reference"]) {
            ans = ans.getValue();
        }
        if (!(ans instanceof _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"])) {
            throw new _utils_Utils__WEBPACK_IMPORTED_MODULE_3__["SemanticException"]("Condicion utilizada con parametro no soportada por operador ternario", this.position);
        }
        if (ans.getValue()) {
            return this.trueSentence.Exe(env);
        }
        return this.falseSentence.Exe(env);
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_4__["GraphvizNode"]('TERNARY', [this.condicion.GetGraph(env), this.trueSentence.GetGraph(env), this.falseSentence.GetGraph(env)]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/StringNode.ts":
/*!*********************************!*\
  !*** ./src/nodes/StringNode.ts ***!
  \*********************************/
/*! exports provided: StringNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StringNode", function() { return StringNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/PrimitiveTypoContainer */ "./src/utils/PrimitiveTypoContainer.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");



class StringNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, val) {
        super(position);
        this.val = val.replace(/\\n/g, "&#13;&#10;       ").replace(/\\t/g, "&#9;");
    }
    GO(env) {
        return new _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_1__["STRING"](this.val.substring(1, this.val.length - 1));
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('STRING', [new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"](this.val.substring(1, this.val.length - 1))]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/SubNode.ts":
/*!******************************!*\
  !*** ./src/nodes/SubNode.ts ***!
  \******************************/
/*! exports provided: SubNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubNode", function() { return SubNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_AlgebraicOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/AlgebraicOperationsFunctions */ "./src/utils/AlgebraicOperationsFunctions.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");



class SubNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, lf, rt) {
        super(position);
        this.lf = lf;
        this.rt = rt;
    }
    GO(env) {
        return Object(_utils_AlgebraicOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__["Resta"])(this.lf.Exe(env), this.rt.Exe(env), this.position);
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('SUB', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/SumNode.ts":
/*!******************************!*\
  !*** ./src/nodes/SumNode.ts ***!
  \******************************/
/*! exports provided: SumNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SumNode", function() { return SumNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_AlgebraicOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/AlgebraicOperationsFunctions */ "./src/utils/AlgebraicOperationsFunctions.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");



class SumNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, lf, rt) {
        super(position);
        this.lf = lf;
        this.rt = rt;
    }
    GO(env) {
        return Object(_utils_AlgebraicOperationsFunctions__WEBPACK_IMPORTED_MODULE_1__["Suma"])(this.lf.Exe(env), this.rt.Exe(env), this.position);
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('SUM', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/SwitchNode.ts":
/*!*********************************!*\
  !*** ./src/nodes/SwitchNode.ts ***!
  \*********************************/
/*! exports provided: SwitchNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SwitchNode", function() { return SwitchNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_Envmnt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Envmnt */ "./src/utils/Envmnt.ts");
/* harmony import */ var _utils_RelationalOperationsFunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/RelationalOperationsFunctions */ "./src/utils/RelationalOperationsFunctions.ts");
/* harmony import */ var _BreakObj__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BreakObj */ "./src/nodes/BreakObj.ts");
/* harmony import */ var _ReturnObj__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ReturnObj */ "./src/nodes/ReturnObj.ts");
/* harmony import */ var _ContinueObj__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ContinueObj */ "./src/nodes/ContinueObj.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/Utils */ "./src/utils/Utils.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");








class SwitchNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, condition, cases) {
        super(position);
        this.condition = condition;
        this.cases = cases;
    }
    GO(env) {
        let condition = this.condition.Exe(env);
        let ret = undefined;
        let hasEnter = false;
        let defaultCount = 0;
        for (let Case of this.cases) {
            if (Case.getConditionValue() === null) {
                defaultCount++;
            }
        }
        if (defaultCount > 1) {
            throw new _utils_Utils__WEBPACK_IMPORTED_MODULE_6__["SemanticException"]("No pueden exisistir mas de una sentencia 'default' dentro de un ciclo switch", this.position);
        }
        for (let Case of this.cases) {
            if (ret instanceof _BreakObj__WEBPACK_IMPORTED_MODULE_3__["BreakObj"]) {
                break;
            }
            if (ret instanceof _ReturnObj__WEBPACK_IMPORTED_MODULE_4__["ReturnObj"]) {
                return ret;
            }
            if (ret instanceof _ContinueObj__WEBPACK_IMPORTED_MODULE_5__["ContinueObj"]) {
                continue;
            }
            if (Case.getConditionValue() !== null) {
                let caseValue = Case.getConditionValue().Exe(env);
                if (!Object(_utils_RelationalOperationsFunctions__WEBPACK_IMPORTED_MODULE_2__["Igual"])(condition, caseValue, this.position).getValue() && !hasEnter) {
                    continue;
                }
            }
            const env0 = new _utils_Envmnt__WEBPACK_IMPORTED_MODULE_1__["Envmnt"](env, Case.getSentences());
            ret = env0.GO_ALL();
            hasEnter = true;
            if (ret instanceof _BreakObj__WEBPACK_IMPORTED_MODULE_3__["BreakObj"]) {
                break;
            }
            if (ret instanceof _ReturnObj__WEBPACK_IMPORTED_MODULE_4__["ReturnObj"]) {
                return ret;
            }
        }
        return undefined;
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_7__["GraphvizNode"]('SWTICH', [
            this.condition.GetGraph(env),
            new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_7__["GraphvizNode"]('SWITCH_BODY', this.cases.map(casee => new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_7__["GraphvizNode"]('CASE', [
                casee.getConditionValue() ? casee.getConditionValue().GetGraph(env) : new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_7__["GraphvizNode"]('UNDEFINED'),
                new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_7__["GraphvizNode"]('SENTENCES', casee.getSentences().map(sentence => sentence.GetGraph(env)))
            ])))
        ]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/UndefinedNode.ts":
/*!************************************!*\
  !*** ./src/nodes/UndefinedNode.ts ***!
  \************************************/
/*! exports provided: UndefinedNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UndefinedNode", function() { return UndefinedNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/PrimitiveTypoContainer */ "./src/utils/PrimitiveTypoContainer.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");



class UndefinedNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor() {
        super();
    }
    GO(env) {
        return new _utils_PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_1__["UNDEFINED"]();
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('UNDEFINED', [new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('undefined')]);
    }
    GetTSGraph() {
        return "";
    }
}


/***/ }),

/***/ "./src/nodes/WhileNode.ts":
/*!********************************!*\
  !*** ./src/nodes/WhileNode.ts ***!
  \********************************/
/*! exports provided: WhileNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WhileNode", function() { return WhileNode; });
/* harmony import */ var _utils_Op__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Op */ "./src/utils/Op.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Utils */ "./src/utils/Utils.ts");
/* harmony import */ var _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/GraphvizNode */ "./src/utils/GraphvizNode.ts");
/* harmony import */ var _utils_TSGraphControl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/TSGraphControl */ "./src/utils/TSGraphControl.ts");




class WhileNode extends _utils_Op__WEBPACK_IMPORTED_MODULE_0__["Op"] {
    constructor(position, condition, sentences) {
        super(position);
        this.condition = condition;
        this.sentences = sentences;
    }
    GO(env) {
        return Object(_utils_Utils__WEBPACK_IMPORTED_MODULE_1__["LogicWhile"])(env, this.condition, this.sentences, null);
    }
    GetGraph(env) {
        return new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('WHILE', [this.condition.GetGraph(env), new _utils_GraphvizNode__WEBPACK_IMPORTED_MODULE_2__["GraphvizNode"]('WHILE_BODY', this.sentences.map(sentence => sentence.GetGraph(env)))]);
    }
    GetTSGraph() {
        let value = '';
        const graphId = _utils_TSGraphControl__WEBPACK_IMPORTED_MODULE_3__["TSGraphControl"].GetGraphId();
        value += `subgraph cluster_${graphId} { \n`;
        value += 'style=filled;\n' +
            'color="#2BBBAD";\n' +
            'fillcolor="#1E222A";\n';
        value += 'node [color="#2BBBAD" fontcolor="#2BBBAD" shape="rectangle"] \n';
        value += this.condition.GetTSGraph();
        this.sentences.forEach(sentence => {
            value += sentence.GetTSGraph();
        });
        value += `label = "${"WHILE_SENTENCE"}";\n`;
        value += `}\n`;
        return value;
    }
}


/***/ }),

/***/ "./src/utils/AlgebraicOperationsFunctions.ts":
/*!***************************************************!*\
  !*** ./src/utils/AlgebraicOperationsFunctions.ts ***!
  \***************************************************/
/*! exports provided: Suma, Resta, Multiplicacion, Division, Modulo, Potencia, Add, Sub */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Suma", function() { return Suma; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Resta", function() { return Resta; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Multiplicacion", function() { return Multiplicacion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Division", function() { return Division; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Modulo", function() { return Modulo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Potencia", function() { return Potencia; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Add", function() { return Add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sub", function() { return Sub; });
/* harmony import */ var _Reference__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Reference */ "./src/utils/Reference.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ "./src/utils/Utils.ts");
/* harmony import */ var _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PrimitiveTypoContainer */ "./src/utils/PrimitiveTypoContainer.ts");
/* harmony import */ var _ErrorsControl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ErrorsControl */ "./src/utils/ErrorsControl.ts");




function Suma(lf, rt, position = new _ErrorsControl__WEBPACK_IMPORTED_MODULE_3__["Position"]()) {
    lf instanceof _Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"] ? lf = lf.getValue() : lf;
    rt instanceof _Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"] ? rt = rt.getValue() : rt;
    try {
        return Sumar(lf, rt);
    }
    catch (e) {
        throw new _Utils__WEBPACK_IMPORTED_MODULE_1__["SemanticException"](`Operacion entre tipos ( ${lf.typo} + ${rt.typo} ) no permitida.`, position);
    }
    function Sumar(lf, rt) {
        switch (true) {
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"](lf.getValue() + rt.getValue());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"](lf.getValue() + rt.getValueNumber());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["STRING"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["STRING"](lf.getValue() + rt.getValue());
                    default:
                        throw new Error();
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"](lf.getValueNumber() + rt.getValue());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"](lf.getValueNumber() + rt.getValueNumber());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["STRING"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["STRING"](lf.getValue() + rt.getValue());
                    default:
                        throw new Error();
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["STRING"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["STRING"](lf.getValue() + rt.getValue());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["STRING"](lf.getValue() + rt.getValue());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["STRING"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["STRING"](lf.getValue() + rt.getValue());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["UNDEFINED"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["STRING"](lf.getValue() + rt);
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NULL"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["STRING"](lf.getValue() + rt);
                    default:
                        throw new Error();
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["UNDEFINED"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["STRING"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["STRING"](lf + rt.getValue());
                    default:
                        throw new Error();
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NULL"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["STRING"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["STRING"](lf + rt.getValue());
                    default:
                        throw new Error();
                }
            default:
                throw new Error();
        }
    }
}
function Resta(lf, rt, position = new _ErrorsControl__WEBPACK_IMPORTED_MODULE_3__["Position"]()) {
    lf instanceof _Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"] ? lf = lf.getValue() : lf;
    rt instanceof _Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"] ? rt = rt.getValue() : rt;
    try {
        return Restar(lf, rt);
    }
    catch (e) {
        throw new _Utils__WEBPACK_IMPORTED_MODULE_1__["SemanticException"](`Operacion entre tipos ( ${lf.typo} - ${rt.typo} ) no permitida.`, position);
    }
    function Restar(lf, rt) {
        switch (true) {
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"](lf.getValue() - rt.getValue());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"](lf.getValue() - rt.getValueNumber());
                    default:
                        throw new Error();
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"](lf.getValueNumber() - rt.getValue());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"](lf.getValueNumber() - rt.getValueNumber());
                    default:
                        throw new Error();
                }
            default:
                throw new Error();
        }
    }
}
function Multiplicacion(lf, rt, position = new _ErrorsControl__WEBPACK_IMPORTED_MODULE_3__["Position"]()) {
    lf instanceof _Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"] ? lf = lf.getValue() : lf;
    rt instanceof _Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"] ? rt = rt.getValue() : rt;
    try {
        return Multiplicar(lf, rt);
    }
    catch (e) {
        throw new _Utils__WEBPACK_IMPORTED_MODULE_1__["SemanticException"](`Operacion entre tipos ( ${lf.typo} * ${rt.typo} ) no permitida.`, position);
    }
    function Multiplicar(lf, rt) {
        switch (true) {
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"](lf.getValue() * rt.getValue());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"](lf.getValue() * rt.getValueNumber());
                    default:
                        throw new Error();
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"](lf.getValueNumber() * rt.getValue());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"](lf.getValueNumber() * rt.getValueNumber());
                    default:
                        throw new Error();
                }
            default:
                throw new Error();
        }
    }
}
function Division(lf, rt, position = new _ErrorsControl__WEBPACK_IMPORTED_MODULE_3__["Position"]()) {
    lf instanceof _Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"] ? lf = lf.getValue() : lf;
    rt instanceof _Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"] ? rt = rt.getValue() : rt;
    if (rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]) {
        if (rt.getValue() === 0) {
            throw new _Utils__WEBPACK_IMPORTED_MODULE_1__["SemanticException"]('Operación no válida, no se puede dividir entre 0', position);
        }
    }
    else if (rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]) {
        if (rt.getValueNumber() === 0) {
            throw new _Utils__WEBPACK_IMPORTED_MODULE_1__["SemanticException"]('Operación no válida, no se puede dividir entre 0', position);
        }
    }
    try {
        return Dividir(lf, rt);
    }
    catch (e) {
        throw new _Utils__WEBPACK_IMPORTED_MODULE_1__["SemanticException"](`Operacion entre tipos ( ${lf.typo} / ${rt.typo} ) no permitida.`);
    }
    function Dividir(lf, rt) {
        switch (true) {
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"](lf.getValue() / rt.getValue());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"](lf.getValue() / rt.getValueNumber());
                    default:
                        throw new Error();
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"](lf.getValueNumber() / rt.getValue());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"](lf.getValueNumber() / rt.getValueNumber());
                    default:
                        throw new Error();
                }
            default:
                throw new Error();
        }
    }
}
function Modulo(lf, rt, position = new _ErrorsControl__WEBPACK_IMPORTED_MODULE_3__["Position"]()) {
    lf instanceof _Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"] ? lf = lf.getValue() : lf;
    rt instanceof _Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"] ? rt = rt.getValue() : rt;
    try {
        return Mod(lf, rt);
    }
    catch (e) {
        throw new _Utils__WEBPACK_IMPORTED_MODULE_1__["SemanticException"](`Operacion entre tipos ( ${lf.typo} % ${rt.typo} ) no permitida.`, position);
    }
    function Mod(lf, rt) {
        switch (true) {
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"](lf.getValue() % rt.getValue());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"](lf.getValue() % rt.getValueNumber());
                    default:
                        throw new Error();
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"](lf.getValueNumber() % rt.getValue());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"](lf.getValueNumber() % rt.getValueNumber());
                    default:
                        throw new Error();
                }
            default:
                throw new Error();
        }
    }
}
function Potencia(lf, rt, position = new _ErrorsControl__WEBPACK_IMPORTED_MODULE_3__["Position"]()) {
    lf instanceof _Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"] ? lf = lf.getValue() : lf;
    rt instanceof _Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"] ? rt = rt.getValue() : rt;
    try {
        return Pot(lf, rt);
    }
    catch (e) {
        throw new _Utils__WEBPACK_IMPORTED_MODULE_1__["SemanticException"](`Operacion entre tipos ( ${lf.typo} ** ${rt.typo} ) no permitida.`, position);
    }
    function Pot(lf, rt) {
        switch (true) {
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"](Math.pow(lf.getValue(), rt.getValue()));
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"](Math.pow(lf.getValue(), rt.getValueNumber()));
                    default:
                        throw new Error();
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"](Math.pow(lf.getValueNumber(), rt.getValue()));
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"](Math.pow(lf.getValueNumber(), rt.getValueNumber()));
                    default:
                        throw new Error();
                }
            default:
                throw new Error();
        }
    }
}
function Add(lf, position = new _ErrorsControl__WEBPACK_IMPORTED_MODULE_3__["Position"]()) {
    if (!(lf instanceof _Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"])) {
        throw new _Utils__WEBPACK_IMPORTED_MODULE_1__["SemanticException"]("Operacion {ref++} permitida solamente sobre referencas", position);
    }
    const val = lf.getValue();
    if (val instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]) {
        lf.setValue(new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"](val.getValue() + 1));
        return val;
    }
    throw new _Utils__WEBPACK_IMPORTED_MODULE_1__["SemanticException"]("Operacion {ref++} No se puede realizar sobre variables distintas de tipo number", position);
}
function Sub(lf, position = new _ErrorsControl__WEBPACK_IMPORTED_MODULE_3__["Position"]()) {
    if (!(lf instanceof _Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"])) {
        throw new _Utils__WEBPACK_IMPORTED_MODULE_1__["SemanticException"]("Operacion {ref--} permitida solamente sobre referencas", position);
    }
    const val = lf.getValue();
    if (val instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]) {
        lf.setValue(new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"](val.getValue() - 1));
        return val;
    }
    throw new _Utils__WEBPACK_IMPORTED_MODULE_1__["SemanticException"]("Operacion {ref--} No se puede realizar sobre variables distintas de tipo number", position);
}


/***/ }),

/***/ "./src/utils/Cntnr.ts":
/*!****************************!*\
  !*** ./src/utils/Cntnr.ts ***!
  \****************************/
/*! exports provided: Cntnr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cntnr", function() { return Cntnr; });
/* harmony import */ var _Reference__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Reference */ "./src/utils/Reference.ts");
/* harmony import */ var _TSGraphControl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TSGraphControl */ "./src/utils/TSGraphControl.ts");


class Cntnr {
    constructor(owner) {
        this.props = new Map();
        this.owner = owner || null;
    }
    AsObjectProps() {
        let ans = "--------------------------------\n";
        this.props.forEach((v, k) => {
            ans += k + ' => ' + v + '\n';
        });
        ans += "--------------------------------\n";
        return ans;
    }
    AddProperty(id, cntnr) {
        //id = id.toUpperCase();
        this.props.set(id, cntnr);
    }
    GetProperty(id) {
        // id = id.toUpperCase();
        const val = this.props.get(id);
        if (val !== null && val !== undefined) {
            return val;
        }
        //this.props.set(id, new Reference());
        //return this.props.get(id);
        return undefined;
    }
    GetTSGraph(owner = '') {
        let value = '';
        const graphId = _TSGraphControl__WEBPACK_IMPORTED_MODULE_1__["TSGraphControl"].GetGraphId();
        value += `subgraph cluster_${graphId} { \n`;
        value += 'style=filled;\n' +
            'color=black;\n' +
            'fillcolor="#1E222";\n';
        value += 'node [fillcolor="yellow" shape="rectangle"] \n';
        this.props.forEach((v, k) => {
            value += `n${_TSGraphControl__WEBPACK_IMPORTED_MODULE_1__["TSGraphControl"].GetNodeId()} [label="${k}"]\n`;
        });
        value += `label = "${owner}";\n`;
        this.props.forEach((v, k) => {
            let vv = v;
            if (vv instanceof _Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"]) {
                vv = vv.getValue();
            }
            value += vv.GetTSGraph(k);
        });
        value += `}\n`;
        return value;
    }
    Declare(id, cntnr) {
        //id = id.toUpperCase();
        this.props.set(id, cntnr);
    }
    GetTypo() {
        return this.typo;
    }
    SetTypo(typo) {
        this.typo = typo;
    }
    GetOwner() {
        return this.owner;
    }
}


/***/ }),

/***/ "./src/utils/Console.ts":
/*!******************************!*\
  !*** ./src/utils/Console.ts ***!
  \******************************/
/*! exports provided: Console */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Console", function() { return Console; });
class Console {
}
Console.log = '';


/***/ }),

/***/ "./src/utils/Envmnt.ts":
/*!*****************************!*\
  !*** ./src/utils/Envmnt.ts ***!
  \*****************************/
/*! exports provided: Envmnt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Envmnt", function() { return Envmnt; });
/* harmony import */ var _Cntnr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cntnr */ "./src/utils/Cntnr.ts");
/* harmony import */ var _nodes_BreakObj__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../nodes/BreakObj */ "./src/nodes/BreakObj.ts");
/* harmony import */ var _nodes_ReturnObj__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../nodes/ReturnObj */ "./src/nodes/ReturnObj.ts");
/* harmony import */ var _nodes_ContinueObj__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../nodes/ContinueObj */ "./src/nodes/ContinueObj.ts");
/* harmony import */ var _nodes_DeclareFunNode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../nodes/DeclareFunNode */ "./src/nodes/DeclareFunNode.ts");
/* harmony import */ var _nodes_DeclareTypeStructureNode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../nodes/DeclareTypeStructureNode */ "./src/nodes/DeclareTypeStructureNode.ts");
/* harmony import */ var _GraphvizNode__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./GraphvizNode */ "./src/utils/GraphvizNode.ts");
/* harmony import */ var _nativeFunctions_graficar_ts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./nativeFunctions/graficar_ts */ "./src/utils/nativeFunctions/graficar_ts.ts");








class Envmnt extends _Cntnr__WEBPACK_IMPORTED_MODULE_0__["Cntnr"] {
    constructor(owner, operations) {
        super(owner);
        this.Extra = new Map();
        this.operations = operations;
        this.typo = "Ambito";
        this.Declare("graficar_ts", new _nativeFunctions_graficar_ts__WEBPACK_IMPORTED_MODULE_7__["Graficar_ts"]());
    }
    GO_ALL() {
        for (let op of this.operations) {
            if (op instanceof _nodes_DeclareFunNode__WEBPACK_IMPORTED_MODULE_4__["DeclareFunNode"] || op instanceof _nodes_DeclareTypeStructureNode__WEBPACK_IMPORTED_MODULE_5__["DeclareTypeStructureNode"]) {
                try {
                    op.Exe(this);
                }
                catch (e) {
                    console.log(e.message);
                }
            }
        }
        for (let op of this.operations) {
            if (!(op instanceof _nodes_DeclareFunNode__WEBPACK_IMPORTED_MODULE_4__["DeclareFunNode"] || op instanceof _nodes_DeclareTypeStructureNode__WEBPACK_IMPORTED_MODULE_5__["DeclareTypeStructureNode"])) {
                try {
                    let result = op.Exe(this);
                    if (result instanceof _nodes_BreakObj__WEBPACK_IMPORTED_MODULE_1__["BreakObj"] || result instanceof _nodes_ReturnObj__WEBPACK_IMPORTED_MODULE_2__["ReturnObj"] || result instanceof _nodes_ContinueObj__WEBPACK_IMPORTED_MODULE_3__["ContinueObj"]) {
                        return result;
                    }
                }
                catch (e) {
                    console.log(e.message);
                }
            }
        }
        return null;
    }
    GetGraph() {
        console.log('aver');
        return new _GraphvizNode__WEBPACK_IMPORTED_MODULE_6__["GraphvizNode"]('ROOT', this.operations.map(operation => operation.GetGraph(this)));
    }
    GetSentences() {
        return this.operations;
    }
}


/***/ }),

/***/ "./src/utils/ErrorsControl.ts":
/*!************************************!*\
  !*** ./src/utils/ErrorsControl.ts ***!
  \************************************/
/*! exports provided: ErrorsControl, Error, Position */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorsControl", function() { return ErrorsControl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Error", function() { return Error; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Position", function() { return Position; });
class ErrorsControl {
    static clearStructures() {
        ErrorsControl.errors = new Array();
    }
    static GetErrors() {
        return ErrorsControl.errors;
    }
    static AddError(row, column, expected, obtained, typo) {
        this.errors.push(new Error(row, column, expected, obtained, typo));
    }
}
ErrorsControl.errors = new Array();
class Error {
    constructor(row, column, expected, obtained, typo) {
        this.row = row;
        this.column = column;
        this.expected = expected;
        this.obtained = obtained;
        this.typo = typo;
    }
}
class Position {
    constructor() {
        this.first_column = -1;
        this.first_line = -1;
        this.last_column = -1;
        this.last_line = -1;
    }
}


/***/ }),

/***/ "./src/utils/GraphvizNode.ts":
/*!***********************************!*\
  !*** ./src/utils/GraphvizNode.ts ***!
  \***********************************/
/*! exports provided: GraphvizNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphvizNode", function() { return GraphvizNode; });
/* harmony import */ var _NodesControl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NodesControl */ "./src/utils/NodesControl.ts");

class GraphvizNode {
    constructor(label, childs = []) {
        this.GetId = () => this.id;
        this.toString = () => {
            let value = `${this.id} [label="${this.label}"];\n`;
            this.childs.forEach(child => {
                value += `${this.id} -> ${child.GetId()};\n`;
            });
            this.childs.forEach(child => {
                value += child;
            });
            return value;
        };
        this.label = label;
        this.childs = childs;
        this.id = `n${_NodesControl__WEBPACK_IMPORTED_MODULE_0__["NodesControl"].GetNodeId()}`;
    }
}


/***/ }),

/***/ "./src/utils/LogicalOperationsFunctions.ts":
/*!*************************************************!*\
  !*** ./src/utils/LogicalOperationsFunctions.ts ***!
  \*************************************************/
/*! exports provided: Or, And, Not */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Or", function() { return Or; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "And", function() { return And; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Not", function() { return Not; });
/* harmony import */ var _Reference__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Reference */ "./src/utils/Reference.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ "./src/utils/Utils.ts");
/* harmony import */ var _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PrimitiveTypoContainer */ "./src/utils/PrimitiveTypoContainer.ts");
/* harmony import */ var _ErrorsControl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ErrorsControl */ "./src/utils/ErrorsControl.ts");




function Or(lf, rt, position = new _ErrorsControl__WEBPACK_IMPORTED_MODULE_3__["Position"]()) {
    lf instanceof _Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"] ? lf = lf.getValue() : lf;
    rt instanceof _Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"] ? rt = rt.getValue() : rt;
    try {
        return or(lf, rt);
    }
    catch (e) {
        throw new _Utils__WEBPACK_IMPORTED_MODULE_1__["SemanticException"](`Operacion entre tipos ( ${lf.typo} || ${rt.typo} ) no permitida.`, position);
    }
    function or(lf, rt) {
        switch (true) {
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](lf.getValue() || rt.getValue());
                    default:
                        throw new Error();
                }
            default:
                throw new Error();
        }
    }
}
function And(lf, rt, position = new _ErrorsControl__WEBPACK_IMPORTED_MODULE_3__["Position"]()) {
    lf instanceof _Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"] ? lf = lf.getValue() : lf;
    rt instanceof _Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"] ? rt = rt.getValue() : rt;
    try {
        return and(lf, rt);
    }
    catch (e) {
        throw new _Utils__WEBPACK_IMPORTED_MODULE_1__["SemanticException"](`Operacion entre tipos ( ${lf.typo} && ${rt.typo} ) no permitida.`, position);
    }
    function and(lf, rt) {
        switch (true) {
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](lf.getValue() && rt.getValue());
                    default:
                        throw new Error();
                }
            default:
                throw new Error();
        }
    }
}
function Not(lf, position = new _ErrorsControl__WEBPACK_IMPORTED_MODULE_3__["Position"]()) {
    lf instanceof _Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"] ? lf = lf.getValue() : lf;
    try {
        return not(lf);
    }
    catch (e) {
        throw new _Utils__WEBPACK_IMPORTED_MODULE_1__["SemanticException"](`Operacion entre tipos ( ! ${lf.typo} ) no permitida.`, position);
    }
    function not(lf) {
        switch (true) {
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](!lf.getValue());
            default:
                throw new Error();
        }
    }
}


/***/ }),

/***/ "./src/utils/NodesControl.ts":
/*!***********************************!*\
  !*** ./src/utils/NodesControl.ts ***!
  \***********************************/
/*! exports provided: NodesControl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodesControl", function() { return NodesControl; });
class NodesControl {
    static clearStructures() {
        NodesControl.nodeIdCount = 0;
    }
}
NodesControl.nodeIdCount = 0;
NodesControl.GetNodeId = () => NodesControl.nodeIdCount++;


/***/ }),

/***/ "./src/utils/Op.ts":
/*!*************************!*\
  !*** ./src/utils/Op.ts ***!
  \*************************/
/*! exports provided: Op */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Op", function() { return Op; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./src/utils/Utils.ts");
/* harmony import */ var _ErrorsControl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ErrorsControl */ "./src/utils/ErrorsControl.ts");


class Op {
    constructor(position = new _ErrorsControl__WEBPACK_IMPORTED_MODULE_1__["Position"]()) {
        this.position = position;
    }
    Exe(env) {
        try {
            return this.GO(env);
        }
        catch (e) {
            throw new _Utils__WEBPACK_IMPORTED_MODULE_0__["ErrorCompo"](e.message);
        }
    }
}


/***/ }),

/***/ "./src/utils/PrimitiveTypoContainer.ts":
/*!*********************************************!*\
  !*** ./src/utils/PrimitiveTypoContainer.ts ***!
  \*********************************************/
/*! exports provided: BOOLEAN, STRING, NUMBER, UNDEFINED, NAN, NULL, ARRAY, OBJECT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BOOLEAN", function() { return BOOLEAN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STRING", function() { return STRING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NUMBER", function() { return NUMBER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UNDEFINED", function() { return UNDEFINED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NAN", function() { return NAN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NULL", function() { return NULL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ARRAY", function() { return ARRAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OBJECT", function() { return OBJECT; });
/* harmony import */ var _Cntnr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cntnr */ "./src/utils/Cntnr.ts");
/* harmony import */ var _Reference__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Reference */ "./src/utils/Reference.ts");
/* harmony import */ var _nativeFunctions_length__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nativeFunctions/length */ "./src/utils/nativeFunctions/length.ts");
/* harmony import */ var _nativeFunctions_push__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nativeFunctions/push */ "./src/utils/nativeFunctions/push.ts");
/* harmony import */ var _nativeFunctions_pop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./nativeFunctions/pop */ "./src/utils/nativeFunctions/pop.ts");





class BOOLEAN extends _Cntnr__WEBPACK_IMPORTED_MODULE_0__["Cntnr"] {
    constructor(value) {
        super();
        this.toString = () => {
            return this.value ? "true" : "false";
        };
        this.getValueNumber = () => {
            return this.value ? 1 : 0;
        };
        this.getValue = () => {
            return this.value;
        };
        this.value = value;
        this.typo = "BOOLEAN";
    }
}
class STRING extends _Cntnr__WEBPACK_IMPORTED_MODULE_0__["Cntnr"] {
    constructor(value) {
        super();
        this.toString = () => {
            return this.value;
        };
        this.getValue = () => {
            return this.value;
        };
        this.value = value || '';
        this.typo = "STRING";
    }
}
class NUMBER extends _Cntnr__WEBPACK_IMPORTED_MODULE_0__["Cntnr"] {
    constructor(value) {
        super();
        this.toString = () => {
            return this.value + '';
        };
        this.getValue = () => {
            return this.value;
        };
        this.value = value || 0;
        this.typo = "NUMBER";
    }
}
class UNDEFINED extends _Cntnr__WEBPACK_IMPORTED_MODULE_0__["Cntnr"] {
    constructor() {
        super();
        this.toString = () => {
            return "undefined";
        };
        this.typo = "UNDEFINED";
    }
}
class NAN extends _Cntnr__WEBPACK_IMPORTED_MODULE_0__["Cntnr"] {
    constructor() {
        super();
        this.toString = () => {
            return "NaN";
        };
        this.typo = "NAN";
    }
}
class NULL extends _Cntnr__WEBPACK_IMPORTED_MODULE_0__["Cntnr"] {
    constructor() {
        super();
        this.toString = () => {
            return null;
        };
        this.getValue = () => {
            return null;
        };
        this.typo = "NULL";
    }
}
class ARRAY extends _Cntnr__WEBPACK_IMPORTED_MODULE_0__["Cntnr"] {
    constructor(value, contentType = 'ANY') {
        super();
        this.toString = () => {
            const size = this.value.length;
            let log = `Array (${size}) [`;
            for (let i = 0; i < size; i++) {
                log += `${this.value[i].getValue()}`;
                if (size - 1 !== i) {
                    log += ', ';
                }
            }
            log += ']';
            return log;
        };
        this.getValue = (index) => {
            let val = this.value[index];
            if (val !== undefined) {
                return val;
            }
            let size = this.value.length;
            while (size <= index) {
                this.value.push(new _Reference__WEBPACK_IMPORTED_MODULE_1__["Reference"]());
                size++;
            }
            return this.value[index];
        };
        this.getValueList = () => {
            return this.value;
        };
        this.value = value || new Array();
        this.typo = `ARRAY`;
        this.contentType = contentType;
        try {
            this.Declare("length", new _nativeFunctions_length__WEBPACK_IMPORTED_MODULE_2__["Length"](this));
            this.Declare("push", new _nativeFunctions_push__WEBPACK_IMPORTED_MODULE_3__["Push"](this));
            this.Declare("pop", new _nativeFunctions_pop__WEBPACK_IMPORTED_MODULE_4__["Pop"](this));
        }
        catch (e) {
            throw new Error();
        }
    }
    addValue(value) {
        this.value.push(value);
    }
}
class OBJECT extends _Cntnr__WEBPACK_IMPORTED_MODULE_0__["Cntnr"] {
    constructor(attributes) {
        super();
        this.toString = () => {
            let log = '{';
            let count = 1;
            this.props.forEach((v, k) => {
                let value = v;
                if (value instanceof _Reference__WEBPACK_IMPORTED_MODULE_1__["Reference"]) {
                    value = value.getValue();
                }
                log += `"${k}" : ${value}`;
                if (count < this.props.size) {
                    log += ', ';
                }
                count++;
            });
            log += '}';
            return log;
        };
        this.attributes = attributes || new Map();
        this.attributes.forEach((v, k) => {
            let value = v;
            if (value instanceof _Reference__WEBPACK_IMPORTED_MODULE_1__["Reference"]) {
                value = value.getValue();
            }
            const reference = new _Reference__WEBPACK_IMPORTED_MODULE_1__["Reference"]();
            reference.PutValueOnReference(value);
            this.Declare(k, reference);
        });
        this.typo = "OBJECT";
    }
}


/***/ }),

/***/ "./src/utils/Reference.ts":
/*!********************************!*\
  !*** ./src/utils/Reference.ts ***!
  \********************************/
/*! exports provided: Reference */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Reference", function() { return Reference; });
/* harmony import */ var _Cntnr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cntnr */ "./src/utils/Cntnr.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ "./src/utils/Utils.ts");
/* harmony import */ var _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PrimitiveTypoContainer */ "./src/utils/PrimitiveTypoContainer.ts");



class Reference extends _Cntnr__WEBPACK_IMPORTED_MODULE_0__["Cntnr"] {
    constructor(tipoNombre = 'ANY', isConst = false) {
        super();
        this.isConst = false;
        this.tipoNombre = 'any';
        this.getReferenceValue = () => {
            return this.tipoNombre.toUpperCase();
        };
        this.toString = () => {
            return this.value.toString();
        };
        this.getValue = () => {
            return this.value;
        };
        this.setValue = (value) => {
            this.value = value;
        };
        this.Call = (args) => {
            for (let arg of args) {
                console.log(arg);
            }
            return null;
        };
        this.typo = "REFERENCE";
        this.value = Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["DefaultValue"])(tipoNombre);
        this.tipoNombre = tipoNombre;
        this.isConst = isConst;
    }
    PutValueOnReference(value) {
        if (this.isConst && !(this.value instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["UNDEFINED"])) {
            throw new _Utils__WEBPACK_IMPORTED_MODULE_1__["SemanticException"]('No se puede cambiar el valor de una constante');
        }
        let v;
        if (value instanceof Reference) {
            v = value.value;
        }
        else {
            v = value;
        }
        if (v === undefined) {
            v = new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["UNDEFINED"]();
        }
        if (this.tipoNombre !== v.typo
            && this.tipoNombre !== 'ANY'
            && v.typo !== 'NULL'
            && v.typo !== 'UNDEFINED'
            && v.typo !== 'OBJECT'
            || (Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["IsPrimitiveTypo"])(this.tipoNombre) && v.typo === 'OBJECT' && this.tipoNombre != "ANY")) {
            throw new _Utils__WEBPACK_IMPORTED_MODULE_1__["SemanticException"](`Tipo ${v.typo} no puede ser asignado a Variable de tipo ${this.tipoNombre}`);
        }
        this.value = v;
    }
}


/***/ }),

/***/ "./src/utils/RelationalOperationsFunctions.ts":
/*!****************************************************!*\
  !*** ./src/utils/RelationalOperationsFunctions.ts ***!
  \****************************************************/
/*! exports provided: Igual, Diferente, Mayor, Menor, MayorEq, MenorEq */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Igual", function() { return Igual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Diferente", function() { return Diferente; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mayor", function() { return Mayor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Menor", function() { return Menor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MayorEq", function() { return MayorEq; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenorEq", function() { return MenorEq; });
/* harmony import */ var _Reference__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Reference */ "./src/utils/Reference.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ "./src/utils/Utils.ts");
/* harmony import */ var _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PrimitiveTypoContainer */ "./src/utils/PrimitiveTypoContainer.ts");
/* harmony import */ var _ErrorsControl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ErrorsControl */ "./src/utils/ErrorsControl.ts");




function Igual(lf, rt, position = new _ErrorsControl__WEBPACK_IMPORTED_MODULE_3__["Position"]()) {
    lf instanceof _Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"] ? lf = lf.getValue() : lf;
    rt instanceof _Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"] ? rt = rt.getValue() : rt;
    try {
        return Eq(lf, rt);
    }
    catch (e) {
        throw new _Utils__WEBPACK_IMPORTED_MODULE_1__["SemanticException"](`Operacion entre tipos ( ${lf.typo} == ${rt.typo} ) no permitida.`, position);
    }
    function Eq(lf, rt) {
        switch (true) {
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](lf.getValue() === rt.getValue());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](lf.getValue() === rt.getValueNumber());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NULL"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["UNDEFINED"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                    default:
                        throw new Error();
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](lf.getValueNumber() == rt.getValue());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](lf.getValueNumber() == rt.getValueNumber());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NULL"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["UNDEFINED"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                    default:
                        throw new Error();
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["STRING"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["STRING"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](lf.getValue() === rt.getValue());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NULL"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["UNDEFINED"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                    default:
                        throw new Error();
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["UNDEFINED"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["UNDEFINED"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](true);
                    default:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NULL"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NULL"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](true);
                    default:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NAN"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](true);
                    default:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["OBJECT"]:
                return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["ARRAY"]:
                return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](true);
        }
    }
}
function Diferente(lf, rt, position = new _ErrorsControl__WEBPACK_IMPORTED_MODULE_3__["Position"]()) {
    lf instanceof _Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"] ? lf = lf.getValue() : lf;
    rt instanceof _Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"] ? rt = rt.getValue() : rt;
    try {
        return Dif(lf, rt);
    }
    catch (e) {
        throw new _Utils__WEBPACK_IMPORTED_MODULE_1__["SemanticException"](`Operacion entre tipos ( ${lf.typo} != ${rt.typo} ) no permitida.`, position);
    }
    function Dif(lf, rt) {
        switch (true) {
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](lf.getValue() !== rt.getValue());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](lf.getValue() !== rt.getValueNumber());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NULL"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](true);
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["UNDEFINED"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](true);
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](true);
                    default:
                        throw new Error();
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](lf.getValueNumber() != rt.getValue());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](lf.getValueNumber() != rt.getValueNumber());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NULL"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](true);
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["UNDEFINED"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](true);
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](true);
                    default:
                        throw new Error();
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["STRING"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["STRING"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](lf.getValue() !== rt.getValue());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NULL"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](true);
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["UNDEFINED"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](true);
                    default:
                        throw new Error();
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["UNDEFINED"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["UNDEFINED"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                    default:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](true);
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NULL"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NULL"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                    default:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](true);
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NAN"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                    default:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](true);
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["OBJECT"]:
                return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](true);
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["ARRAY"]:
                return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](true);
            default:
                throw new Error();
        }
    }
}
function Mayor(lf, rt, position = new _ErrorsControl__WEBPACK_IMPORTED_MODULE_3__["Position"]()) {
    lf instanceof _Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"] ? lf = lf.getValue() : lf;
    rt instanceof _Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"] ? rt = rt.getValue() : rt;
    try {
        return May(lf, rt);
    }
    catch (e) {
        throw new _Utils__WEBPACK_IMPORTED_MODULE_1__["SemanticException"](`Operacion entre tipos ( ${lf.typo} > ${rt.typo} ) dddno permitida.`, position);
    }
    function May(lf, rt) {
        switch (true) {
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](lf.getValue() > rt.getValue());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](lf.getValue() > rt.getValueNumber());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                    default:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](lf.getValueNumber() > rt.getValue());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](lf.getValueNumber() > rt.getValueNumber());
                    default:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["STRING"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["STRING"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](lf.getValue() > rt.getValue());
                    default:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NAN"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                    default:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                }
            default:
                return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
        }
    }
}
function Menor(lf, rt, position = new _ErrorsControl__WEBPACK_IMPORTED_MODULE_3__["Position"]()) {
    lf instanceof _Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"] ? lf = lf.getValue() : lf;
    rt instanceof _Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"] ? rt = rt.getValue() : rt;
    try {
        return Min(lf, rt);
    }
    catch (e) {
        throw new _Utils__WEBPACK_IMPORTED_MODULE_1__["SemanticException"](`Operacion entre tipos ( ${lf.typo} < ${rt.typo} ) ndadfao permitida.`, position);
    }
    function Min(lf, rt) {
        switch (true) {
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](lf.getValue() < rt.getValue());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](lf.getValue() < rt.getValueNumber());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                    default:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](lf.getValueNumber() < rt.getValue());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](lf.getValueNumber() < rt.getValueNumber());
                    default:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["STRING"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["STRING"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](lf.getValue() < rt.getValue());
                    default:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NAN"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                    default:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                }
            default:
                return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
        }
    }
}
function MayorEq(lf, rt, position = new _ErrorsControl__WEBPACK_IMPORTED_MODULE_3__["Position"]()) {
    lf instanceof _Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"] ? lf = lf.getValue() : lf;
    rt instanceof _Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"] ? rt = rt.getValue() : rt;
    try {
        return MayEq(lf, rt);
    }
    catch (e) {
        throw new _Utils__WEBPACK_IMPORTED_MODULE_1__["SemanticException"](`Operacion entre tipos ( ${lf.typo} >= ${rt.typo} ) no permitida.`, position);
    }
    function MayEq(lf, rt) {
        switch (true) {
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](lf.getValue() >= rt.getValue());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](lf.getValue() >= rt.getValueNumber());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                    default:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](lf.getValueNumber() >= rt.getValue());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](lf.getValueNumber() >= rt.getValueNumber());
                    default:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["STRING"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["STRING"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](lf.getValue() >= rt.getValue());
                    default:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NAN"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                    default:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                }
            default:
                return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
        }
    }
}
function MenorEq(lf, rt, position = new _ErrorsControl__WEBPACK_IMPORTED_MODULE_3__["Position"]()) {
    lf instanceof _Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"] ? lf = lf.getValue() : lf;
    rt instanceof _Reference__WEBPACK_IMPORTED_MODULE_0__["Reference"] ? rt = rt.getValue() : rt;
    try {
        return MinEq(lf, rt);
    }
    catch (e) {
        throw new _Utils__WEBPACK_IMPORTED_MODULE_1__["SemanticException"](`Operacion entre tipos ( ${lf.typo} >= ${rt.typo} ) no permitida.`, position);
    }
    function MinEq(lf, rt) {
        switch (true) {
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](lf.getValue() <= rt.getValue());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](lf.getValue() <= rt.getValueNumber());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                    default:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](lf.getValueNumber() <= rt.getValue());
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](lf.getValueNumber() <= rt.getValueNumber());
                    default:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["STRING"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["STRING"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](lf.getValue() <= rt.getValue());
                    default:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                }
            case lf instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NAN"]:
                switch (true) {
                    case rt instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["NUMBER"]:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                    default:
                        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
                }
            default:
                return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["BOOLEAN"](false);
        }
    }
}


/***/ }),

/***/ "./src/utils/TSGraphControl.ts":
/*!*************************************!*\
  !*** ./src/utils/TSGraphControl.ts ***!
  \*************************************/
/*! exports provided: TSGraphControl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TSGraphControl", function() { return TSGraphControl; });
class TSGraphControl {
    static clearStructures() {
        TSGraphControl.graphIdCount = 0;
        TSGraphControl.nodeIdCount = 0;
        TSGraphControl.graphStrings = new Array();
    }
}
TSGraphControl.graphIdCount = 0;
TSGraphControl.GetGraphId = () => TSGraphControl.graphIdCount++;
TSGraphControl.nodeIdCount = 0;
TSGraphControl.GetNodeId = () => TSGraphControl.nodeIdCount++;
TSGraphControl.graphStrings = new Array();
TSGraphControl.AddGraphString = (graph) => TSGraphControl.graphStrings.push(graph);
TSGraphControl.GetGetGraphsString = () => TSGraphControl.graphStrings.join('\n');


/***/ }),

/***/ "./src/utils/Utils.ts":
/*!****************************!*\
  !*** ./src/utils/Utils.ts ***!
  \****************************/
/*! exports provided: SemanticException, ErrorCompo, DefaultValue, IsPrimitiveTypo, GetObjectValue, FindVar, TSGraph, TSGraph2, PassPropsAndFuncs, LogicWhile, LogicDoWhile, MyMap, ObjectStructure, ObjectsStructures */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SemanticException", function() { return SemanticException; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorCompo", function() { return ErrorCompo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultValue", function() { return DefaultValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IsPrimitiveTypo", function() { return IsPrimitiveTypo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetObjectValue", function() { return GetObjectValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FindVar", function() { return FindVar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TSGraph", function() { return TSGraph; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TSGraph2", function() { return TSGraph2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PassPropsAndFuncs", function() { return PassPropsAndFuncs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogicWhile", function() { return LogicWhile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogicDoWhile", function() { return LogicDoWhile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyMap", function() { return MyMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObjectStructure", function() { return ObjectStructure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObjectsStructures", function() { return ObjectsStructures; });
/* harmony import */ var _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PrimitiveTypoContainer */ "./src/utils/PrimitiveTypoContainer.ts");
/* harmony import */ var _Envmnt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Envmnt */ "./src/utils/Envmnt.ts");
/* harmony import */ var _Reference__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Reference */ "./src/utils/Reference.ts");
/* harmony import */ var _nodes_BreakObj__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../nodes/BreakObj */ "./src/nodes/BreakObj.ts");
/* harmony import */ var _nodes_ReturnObj__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../nodes/ReturnObj */ "./src/nodes/ReturnObj.ts");
/* harmony import */ var _nodes_ContinueObj__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../nodes/ContinueObj */ "./src/nodes/ContinueObj.ts");
/* harmony import */ var _TSGraphControl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TSGraphControl */ "./src/utils/TSGraphControl.ts");
/* harmony import */ var _ErrorsControl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ErrorsControl */ "./src/utils/ErrorsControl.ts");








class SemanticException extends Error {
    constructor(message, position = new _ErrorsControl__WEBPACK_IMPORTED_MODULE_7__["Position"]()) {
        super(message);
        _ErrorsControl__WEBPACK_IMPORTED_MODULE_7__["ErrorsControl"].AddError(position.first_line, position.first_column, '', message, 'SEMANTIC');
    }
}
class ErrorCompo extends Error {
    constructor(message, position = new _ErrorsControl__WEBPACK_IMPORTED_MODULE_7__["Position"]()) {
        super(message);
        _ErrorsControl__WEBPACK_IMPORTED_MODULE_7__["ErrorsControl"].AddError(position.first_line, position.first_column, '', message, 'SEMANTIC');
    }
}
function DefaultValue(typo) {
    if (IsPrimitiveTypo(typo)) {
        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_0__["UNDEFINED"]();
    }
    return GetObjectValue(typo);
}
function IsPrimitiveTypo(typo) {
    typo = typo.toUpperCase();
    switch (typo) {
        case "STRING":
        case "NUMBER":
        case "BOOLEAN":
        case "ANY":
        case "ARRAY":
        case "NULL":
        case "UNDEFINED":
            return true;
        default:
            return false;
    }
}
function GetObjectValue(typo) {
    typo = typo.toUpperCase();
    let structure = ObjectsStructures.objects.get(typo);
    if (structure === null || structure === undefined) {
        throw new SemanticException(`No existe una definicion para el tipo ${typo}`);
    }
    return structure.GetDefaultValue();
}
function FindVar(cont, identifier) {
    let ownerCntnr = cont;
    while (ownerCntnr != null) {
        if (ownerCntnr.GetProperty(identifier) !== undefined) {
            return ownerCntnr.GetProperty(identifier);
        }
        ownerCntnr = ownerCntnr.GetOwner();
    }
    throw new SemanticException(`identificador ${identifier} no encontrado`);
}
function TSGraph(envmnt) {
    let ownerCntnr = envmnt;
    while (true) {
        if (ownerCntnr.GetOwner() == null) {
            break;
        }
        ownerCntnr = ownerCntnr.GetOwner();
    }
    return ownerCntnr.GetTSGraph('global');
}
function TSGraph2(sentences) {
    let value = '';
    const graphId = _TSGraphControl__WEBPACK_IMPORTED_MODULE_6__["TSGraphControl"].GetGraphId();
    value += `subgraph cluster_${graphId} { \n`;
    value += 'style=filled;\n' +
        'color="#2BBBAD";\n' +
        'fillcolor="#1E222A";\n';
    value += 'node [color="#2BBBAD" fontcolor="#2BBBAD" shape="rectangle"] \n';
    sentences.forEach(sentence => {
        value += sentence.GetTSGraph();
    });
    value += `label = "${'GLOBAL'}";\n`;
    value += `}\n`;
    return value;
}
function PassPropsAndFuncs(father, son) {
    // father.props.forEach((v, k) => {
    //     son.Declare(k, v);
    // });
}
function LogicWhile(env, condition, sentences, extra) {
    let ans = condition.Exe(env);
    if (ans instanceof _Reference__WEBPACK_IMPORTED_MODULE_2__["Reference"]) {
        ans = ans.getValue();
    }
    if (!(ans instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_0__["BOOLEAN"])) {
        throw new SemanticException("Condicion utilizada en ciclo while no soportada");
    }
    let tmp = ans;
    while (tmp.getValue()) {
        const env0 = new _Envmnt__WEBPACK_IMPORTED_MODULE_1__["Envmnt"](env, sentences);
        PassPropsAndFuncs(env, env0);
        const ret = env0.GO_ALL();
        if (ret instanceof _nodes_BreakObj__WEBPACK_IMPORTED_MODULE_3__["BreakObj"]) {
            break;
        }
        if (ret instanceof _nodes_ReturnObj__WEBPACK_IMPORTED_MODULE_4__["ReturnObj"]) {
            return ret;
        }
        if (ret instanceof _nodes_ContinueObj__WEBPACK_IMPORTED_MODULE_5__["ContinueObj"]) {
            continue;
        }
        if (extra !== null) {
            extra.Exe(env);
        }
        let ans0 = condition.Exe(env);
        if (ans0 instanceof _Reference__WEBPACK_IMPORTED_MODULE_2__["Reference"]) {
            ans0 = ans0.getValue();
        }
        tmp = ans0;
    }
    return null;
}
function LogicDoWhile(env, condition, sentences, extra) {
    let ans = condition.Exe(env);
    if (ans instanceof _Reference__WEBPACK_IMPORTED_MODULE_2__["Reference"]) {
        ans = ans.getValue();
    }
    if (!(ans instanceof _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_0__["BOOLEAN"])) {
        throw new SemanticException("Condicion utilizada en ciclo while no soportada");
    }
    let env0 = new _Envmnt__WEBPACK_IMPORTED_MODULE_1__["Envmnt"](env, sentences);
    PassPropsAndFuncs(env, env0);
    env0.GO_ALL();
    let ans0 = condition.Exe(env);
    if (ans0 instanceof _Reference__WEBPACK_IMPORTED_MODULE_2__["Reference"]) {
        ans0 = ans0.getValue();
    }
    let tmp = ans0;
    while (tmp.getValue()) {
        const env0 = new _Envmnt__WEBPACK_IMPORTED_MODULE_1__["Envmnt"](env, sentences);
        PassPropsAndFuncs(env, env0);
        const ret = env0.GO_ALL();
        if (ret instanceof _nodes_BreakObj__WEBPACK_IMPORTED_MODULE_3__["BreakObj"]) {
            break;
        }
        if (ret instanceof _nodes_ReturnObj__WEBPACK_IMPORTED_MODULE_4__["ReturnObj"]) {
            return ret;
        }
        if (ret instanceof _nodes_ContinueObj__WEBPACK_IMPORTED_MODULE_5__["ContinueObj"]) {
            continue;
        }
        if (extra !== null) {
            extra.Exe(env);
        }
        let ans0 = condition.Exe(env);
        if (ans0 instanceof _Reference__WEBPACK_IMPORTED_MODULE_2__["Reference"]) {
            ans0 = ans0.getValue();
        }
        tmp = ans0;
    }
    return null;
}
class MyMap {
    constructor() {
        this.map = new Map();
    }
    getMap() {
        return this.map;
    }
    addEntry(key, value) {
        this.map.set(key, value);
    }
}
class ObjectStructure {
    constructor(properties) {
        this.properties = properties;
    }
    GetDefaultValue() {
        const attributes = new Map();
        this.properties.forEach((v, k) => {
            attributes.set(k, new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_0__["UNDEFINED"]());
        });
        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_0__["OBJECT"](attributes);
    }
}
class ObjectsStructures {
}
ObjectsStructures.objects = new Map();


/***/ }),

/***/ "./src/utils/functions/FunctionRepresent.ts":
/*!**************************************************!*\
  !*** ./src/utils/functions/FunctionRepresent.ts ***!
  \**************************************************/
/*! exports provided: FunctionRepresent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FunctionRepresent", function() { return FunctionRepresent; });
/* harmony import */ var _Cntnr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Cntnr */ "./src/utils/Cntnr.ts");

class FunctionRepresent extends _Cntnr__WEBPACK_IMPORTED_MODULE_0__["Cntnr"] {
}


/***/ }),

/***/ "./src/utils/functions/Native.ts":
/*!***************************************!*\
  !*** ./src/utils/functions/Native.ts ***!
  \***************************************/
/*! exports provided: Native */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Native", function() { return Native; });
/* harmony import */ var _FunctionRepresent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FunctionRepresent */ "./src/utils/functions/FunctionRepresent.ts");

class Native extends _FunctionRepresent__WEBPACK_IMPORTED_MODULE_0__["FunctionRepresent"] {
}


/***/ }),

/***/ "./src/utils/functions/UserDefined.ts":
/*!********************************************!*\
  !*** ./src/utils/functions/UserDefined.ts ***!
  \********************************************/
/*! exports provided: UserDefined */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserDefined", function() { return UserDefined; });
/* harmony import */ var _FunctionRepresent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FunctionRepresent */ "./src/utils/functions/FunctionRepresent.ts");
/* harmony import */ var _Envmnt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Envmnt */ "./src/utils/Envmnt.ts");
/* harmony import */ var _Reference__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Reference */ "./src/utils/Reference.ts");
/* harmony import */ var _TSGraphControl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../TSGraphControl */ "./src/utils/TSGraphControl.ts");




class UserDefined extends _FunctionRepresent__WEBPACK_IMPORTED_MODULE_0__["FunctionRepresent"] {
    constructor(src, params, type) {
        super();
        this.src = src;
        this.params = params;
        this.type = type.toUpperCase();
    }
    getType() {
        return this.type;
    }
    getSrc() {
        return this.src;
    }
    EXE(env0, args) {
        let env = new _Envmnt__WEBPACK_IMPORTED_MODULE_1__["Envmnt"](env0, this.src);
        const references = new Array();
        for (let param of this.params) {
            references.push(param.Exe(env));
        }
        for (let i = 0; i < args.length && i < references.length; i++) {
            references[i].PutValueOnReference(args[i]);
        }
        return env.GO_ALL();
    }
    GetTSGraph(owner = '') {
        let value = '';
        const graphId = _TSGraphControl__WEBPACK_IMPORTED_MODULE_3__["TSGraphControl"].GetGraphId();
        value += `subgraph cluster_${graphId} { \n`;
        value += 'style=filled;\n' +
            'color="#2BBBAD";\n' +
            'fillcolor="#1E222A";\n';
        value += 'node [color="#2BBBAD" fontcolor="#2BBBAD" shape="rectangle"] \n';
        this.params.forEach((v) => {
            value += `n${_TSGraphControl__WEBPACK_IMPORTED_MODULE_3__["TSGraphControl"].GetNodeId()} [label="${v.GetName()}"]\n`;
        });
        value += `label = "${owner.toUpperCase()}";\n`;
        this.props.forEach((v, k) => {
            let vv = v;
            if (vv instanceof _Reference__WEBPACK_IMPORTED_MODULE_2__["Reference"]) {
                vv = vv.getValue();
            }
            console.log(vv);
            value += vv.GetTSGraph(k);
        });
        value += `}\n`;
        return value;
    }
}


/***/ }),

/***/ "./src/utils/nativeFunctions/graficar_ts.ts":
/*!**************************************************!*\
  !*** ./src/utils/nativeFunctions/graficar_ts.ts ***!
  \**************************************************/
/*! exports provided: Graficar_ts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Graficar_ts", function() { return Graficar_ts; });
/* harmony import */ var _functions_Native__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../functions/Native */ "./src/utils/functions/Native.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utils */ "./src/utils/Utils.ts");
/* harmony import */ var _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../PrimitiveTypoContainer */ "./src/utils/PrimitiveTypoContainer.ts");
/* harmony import */ var _TSGraphControl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../TSGraphControl */ "./src/utils/TSGraphControl.ts");




class Graficar_ts extends _functions_Native__WEBPACK_IMPORTED_MODULE_0__["Native"] {
    constructor() {
        super();
    }
    EXE(env0, args) {
        let ownerCntnr = env0;
        while (true) {
            if (ownerCntnr.GetOwner() == null) {
                break;
            }
            ownerCntnr = ownerCntnr.GetOwner();
        }
        let content = 'digraph G {bgcolor="#2E3440" gradientangle=0 rankdir=TB fontcolor="#2BBBAD" \n';
        content += Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["TSGraph2"])(ownerCntnr.GetSentences());
        content += '}\n\n';
        console.log(content);
        _TSGraphControl__WEBPACK_IMPORTED_MODULE_3__["TSGraphControl"].AddGraphString(content);
        return new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_2__["UNDEFINED"]();
    }
}


/***/ }),

/***/ "./src/utils/nativeFunctions/length.ts":
/*!*********************************************!*\
  !*** ./src/utils/nativeFunctions/length.ts ***!
  \*********************************************/
/*! exports provided: Length */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Length", function() { return Length; });
/* harmony import */ var _functions_Native__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../functions/Native */ "./src/utils/functions/Native.ts");
/* harmony import */ var _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../PrimitiveTypoContainer */ "./src/utils/PrimitiveTypoContainer.ts");
/* harmony import */ var _nodes_ReturnObj__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../nodes/ReturnObj */ "./src/nodes/ReturnObj.ts");



class Length extends _functions_Native__WEBPACK_IMPORTED_MODULE_0__["Native"] {
    constructor(array) {
        super();
        this.array = array;
    }
    EXE(env0, args) {
        let size = this.array.getValueList().length;
        return new _nodes_ReturnObj__WEBPACK_IMPORTED_MODULE_2__["ReturnObj"](new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_1__["NUMBER"](size));
    }
}


/***/ }),

/***/ "./src/utils/nativeFunctions/pop.ts":
/*!******************************************!*\
  !*** ./src/utils/nativeFunctions/pop.ts ***!
  \******************************************/
/*! exports provided: Pop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pop", function() { return Pop; });
/* harmony import */ var _functions_Native__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../functions/Native */ "./src/utils/functions/Native.ts");
/* harmony import */ var _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../PrimitiveTypoContainer */ "./src/utils/PrimitiveTypoContainer.ts");
/* harmony import */ var _nodes_ReturnObj__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../nodes/ReturnObj */ "./src/nodes/ReturnObj.ts");



class Pop extends _functions_Native__WEBPACK_IMPORTED_MODULE_0__["Native"] {
    constructor(array) {
        super();
        this.array = array;
    }
    EXE(env0, args) {
        let value = this.array.getValueList().pop();
        if (value === undefined) {
            return new _nodes_ReturnObj__WEBPACK_IMPORTED_MODULE_2__["ReturnObj"](new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_1__["UNDEFINED"]());
        }
        return new _nodes_ReturnObj__WEBPACK_IMPORTED_MODULE_2__["ReturnObj"](value);
    }
}


/***/ }),

/***/ "./src/utils/nativeFunctions/push.ts":
/*!*******************************************!*\
  !*** ./src/utils/nativeFunctions/push.ts ***!
  \*******************************************/
/*! exports provided: Push */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Push", function() { return Push; });
/* harmony import */ var _functions_Native__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../functions/Native */ "./src/utils/functions/Native.ts");
/* harmony import */ var _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../PrimitiveTypoContainer */ "./src/utils/PrimitiveTypoContainer.ts");
/* harmony import */ var _nodes_ReturnObj__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../nodes/ReturnObj */ "./src/nodes/ReturnObj.ts");
/* harmony import */ var _Reference__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Reference */ "./src/utils/Reference.ts");




class Push extends _functions_Native__WEBPACK_IMPORTED_MODULE_0__["Native"] {
    constructor(array) {
        super();
        this.array = array;
    }
    EXE(env0, args) {
        let size = this.array.getValueList().length;
        for (let i in args) {
            let ref = new _Reference__WEBPACK_IMPORTED_MODULE_3__["Reference"]();
            ref.setValue(args[i]);
            this.array.addValue(ref);
        }
        return new _nodes_ReturnObj__WEBPACK_IMPORTED_MODULE_2__["ReturnObj"](new _PrimitiveTypoContainer__WEBPACK_IMPORTED_MODULE_1__["NUMBER"](size));
    }
}


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hc3Qvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2FzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9hc3QvKHdlYnBhY2spL2J1aWxkaW4vaGFybW9ueS1tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vYXN0Ly4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2FzdC8uL3NyYy9ub2Rlcy9BbmROb2RlLnRzIiwid2VicGFjazovL2FzdC8uL3NyYy9ub2Rlcy9Bc2lnbk5vZGUudHMiLCJ3ZWJwYWNrOi8vYXN0Ly4vc3JjL25vZGVzL0Jvb2xlYW5Ob2RlLnRzIiwid2VicGFjazovL2FzdC8uL3NyYy9ub2Rlcy9CcmVha05vZGUudHMiLCJ3ZWJwYWNrOi8vYXN0Ly4vc3JjL25vZGVzL0JyZWFrT2JqLnRzIiwid2VicGFjazovL2FzdC8uL3NyYy9ub2Rlcy9DYXNlTm9kZS50cyIsIndlYnBhY2s6Ly9hc3QvLi9zcmMvbm9kZXMvQ29uc29sZUxvZ05vZGUudHMiLCJ3ZWJwYWNrOi8vYXN0Ly4vc3JjL25vZGVzL0NvbnRpbnVlTm9kZS50cyIsIndlYnBhY2s6Ly9hc3QvLi9zcmMvbm9kZXMvQ29udGludWVPYmoudHMiLCJ3ZWJwYWNrOi8vYXN0Ly4vc3JjL25vZGVzL0NyZWF0ZUFyclZhck5vZGUudHMiLCJ3ZWJwYWNrOi8vYXN0Ly4vc3JjL25vZGVzL0NyZWF0ZUFycmF5Tm9kZS50cyIsIndlYnBhY2s6Ly9hc3QvLi9zcmMvbm9kZXMvQ3JlYXRlSWRWYXJOb2RlLnRzIiwid2VicGFjazovL2FzdC8uL3NyYy9ub2Rlcy9DcmVhdGVPYmpGdW5Ob2RlLnRzIiwid2VicGFjazovL2FzdC8uL3NyYy9ub2Rlcy9DcmVhdGVPYmpOb2RlLnRzIiwid2VicGFjazovL2FzdC8uL3NyYy9ub2Rlcy9DcmVhdGVPYmpWYXJOb2RlLnRzIiwid2VicGFjazovL2FzdC8uL3NyYy9ub2Rlcy9EZWNsYXJlRnVuTm9kZS50cyIsIndlYnBhY2s6Ly9hc3QvLi9zcmMvbm9kZXMvRGVjbGFyZUZ1blBhcmFtTm9kZS50cyIsIndlYnBhY2s6Ly9hc3QvLi9zcmMvbm9kZXMvRGVjbGFyZVR5cGVTdHJ1Y3R1cmVOb2RlLnRzIiwid2VicGFjazovL2FzdC8uL3NyYy9ub2Rlcy9EZWNsYXJlVmFyTGlzdE5vZGUudHMiLCJ3ZWJwYWNrOi8vYXN0Ly4vc3JjL25vZGVzL0RlY2xhcmVWYXJOb2RlLnRzIiwid2VicGFjazovL2FzdC8uL3NyYy9ub2Rlcy9EaWZOb2RlLnRzIiwid2VicGFjazovL2FzdC8uL3NyYy9ub2Rlcy9EaXZOb2RlLnRzIiwid2VicGFjazovL2FzdC8uL3NyYy9ub2Rlcy9Eb1doaWxlTm9kZS50cyIsIndlYnBhY2s6Ly9hc3QvLi9zcmMvbm9kZXMvRXFOb2RlLnRzIiwid2VicGFjazovL2FzdC8uL3NyYy9ub2Rlcy9FeHBOb2RlLnRzIiwid2VicGFjazovL2FzdC8uL3NyYy9ub2Rlcy9Gb3JJbk5vZGUudHMiLCJ3ZWJwYWNrOi8vYXN0Ly4vc3JjL25vZGVzL0Zvck5vZGUudHMiLCJ3ZWJwYWNrOi8vYXN0Ly4vc3JjL25vZGVzL0Zvck9mTm9kZS50cyIsIndlYnBhY2s6Ly9hc3QvLi9zcmMvbm9kZXMvRnVuY3Rpb25DYWxsTm9kZS50cyIsIndlYnBhY2s6Ly9hc3QvLi9zcmMvbm9kZXMvSGlnaGVyRXFOb2RlLnRzIiwid2VicGFjazovL2FzdC8uL3NyYy9ub2Rlcy9IaWdoZXJOb2RlLnRzIiwid2VicGFjazovL2FzdC8uL3NyYy9ub2Rlcy9JZk5vZGUudHMiLCJ3ZWJwYWNrOi8vYXN0Ly4vc3JjL25vZGVzL01pbm9yRXFOb2RlLnRzIiwid2VicGFjazovL2FzdC8uL3NyYy9ub2Rlcy9NaW5vck5vZGUudHMiLCJ3ZWJwYWNrOi8vYXN0Ly4vc3JjL25vZGVzL01vZE5vZGUudHMiLCJ3ZWJwYWNrOi8vYXN0Ly4vc3JjL25vZGVzL011bE5vZGUudHMiLCJ3ZWJwYWNrOi8vYXN0Ly4vc3JjL25vZGVzL05vdE5vZGUudHMiLCJ3ZWJwYWNrOi8vYXN0Ly4vc3JjL25vZGVzL051bGxOb2RlLnRzIiwid2VicGFjazovL2FzdC8uL3NyYy9ub2Rlcy9OdW1iZXJOb2RlLnRzIiwid2VicGFjazovL2FzdC8uL3NyYy9ub2Rlcy9Pck5vZGUudHMiLCJ3ZWJwYWNrOi8vYXN0Ly4vc3JjL25vZGVzL1JlQWRkTm9kZS50cyIsIndlYnBhY2s6Ly9hc3QvLi9zcmMvbm9kZXMvUmVBc2lnbkFkZE5vZGUudHMiLCJ3ZWJwYWNrOi8vYXN0Ly4vc3JjL25vZGVzL1JlQXNpZ25EaXZOb2RlLnRzIiwid2VicGFjazovL2FzdC8uL3NyYy9ub2Rlcy9SZUFzaWduTW9kTm9kZS50cyIsIndlYnBhY2s6Ly9hc3QvLi9zcmMvbm9kZXMvUmVBc2lnbk11bE5vZGUudHMiLCJ3ZWJwYWNrOi8vYXN0Ly4vc3JjL25vZGVzL1JlQXNpZ25TdWJOb2RlLnRzIiwid2VicGFjazovL2FzdC8uL3NyYy9ub2Rlcy9SZVN1Yk5vZGUudHMiLCJ3ZWJwYWNrOi8vYXN0Ly4vc3JjL25vZGVzL1JldHVybk5vZGUudHMiLCJ3ZWJwYWNrOi8vYXN0Ly4vc3JjL25vZGVzL1JldHVybk9iai50cyIsIndlYnBhY2s6Ly9hc3QvLi9zcmMvbm9kZXMvU2VudGVuY2VUZXJuYXJ5Tm9kZS50cyIsIndlYnBhY2s6Ly9hc3QvLi9zcmMvbm9kZXMvU3RyaW5nTm9kZS50cyIsIndlYnBhY2s6Ly9hc3QvLi9zcmMvbm9kZXMvU3ViTm9kZS50cyIsIndlYnBhY2s6Ly9hc3QvLi9zcmMvbm9kZXMvU3VtTm9kZS50cyIsIndlYnBhY2s6Ly9hc3QvLi9zcmMvbm9kZXMvU3dpdGNoTm9kZS50cyIsIndlYnBhY2s6Ly9hc3QvLi9zcmMvbm9kZXMvVW5kZWZpbmVkTm9kZS50cyIsIndlYnBhY2s6Ly9hc3QvLi9zcmMvbm9kZXMvV2hpbGVOb2RlLnRzIiwid2VicGFjazovL2FzdC8uL3NyYy91dGlscy9BbGdlYnJhaWNPcGVyYXRpb25zRnVuY3Rpb25zLnRzIiwid2VicGFjazovL2FzdC8uL3NyYy91dGlscy9DbnRuci50cyIsIndlYnBhY2s6Ly9hc3QvLi9zcmMvdXRpbHMvQ29uc29sZS50cyIsIndlYnBhY2s6Ly9hc3QvLi9zcmMvdXRpbHMvRW52bW50LnRzIiwid2VicGFjazovL2FzdC8uL3NyYy91dGlscy9FcnJvcnNDb250cm9sLnRzIiwid2VicGFjazovL2FzdC8uL3NyYy91dGlscy9HcmFwaHZpek5vZGUudHMiLCJ3ZWJwYWNrOi8vYXN0Ly4vc3JjL3V0aWxzL0xvZ2ljYWxPcGVyYXRpb25zRnVuY3Rpb25zLnRzIiwid2VicGFjazovL2FzdC8uL3NyYy91dGlscy9Ob2Rlc0NvbnRyb2wudHMiLCJ3ZWJwYWNrOi8vYXN0Ly4vc3JjL3V0aWxzL09wLnRzIiwid2VicGFjazovL2FzdC8uL3NyYy91dGlscy9QcmltaXRpdmVUeXBvQ29udGFpbmVyLnRzIiwid2VicGFjazovL2FzdC8uL3NyYy91dGlscy9SZWZlcmVuY2UudHMiLCJ3ZWJwYWNrOi8vYXN0Ly4vc3JjL3V0aWxzL1JlbGF0aW9uYWxPcGVyYXRpb25zRnVuY3Rpb25zLnRzIiwid2VicGFjazovL2FzdC8uL3NyYy91dGlscy9UU0dyYXBoQ29udHJvbC50cyIsIndlYnBhY2s6Ly9hc3QvLi9zcmMvdXRpbHMvVXRpbHMudHMiLCJ3ZWJwYWNrOi8vYXN0Ly4vc3JjL3V0aWxzL2Z1bmN0aW9ucy9GdW5jdGlvblJlcHJlc2VudC50cyIsIndlYnBhY2s6Ly9hc3QvLi9zcmMvdXRpbHMvZnVuY3Rpb25zL05hdGl2ZS50cyIsIndlYnBhY2s6Ly9hc3QvLi9zcmMvdXRpbHMvZnVuY3Rpb25zL1VzZXJEZWZpbmVkLnRzIiwid2VicGFjazovL2FzdC8uL3NyYy91dGlscy9uYXRpdmVGdW5jdGlvbnMvZ3JhZmljYXJfdHMudHMiLCJ3ZWJwYWNrOi8vYXN0Ly4vc3JjL3V0aWxzL25hdGl2ZUZ1bmN0aW9ucy9sZW5ndGgudHMiLCJ3ZWJwYWNrOi8vYXN0Ly4vc3JjL3V0aWxzL25hdGl2ZUZ1bmN0aW9ucy9wb3AudHMiLCJ3ZWJwYWNrOi8vYXN0Ly4vc3JjL3V0aWxzL25hdGl2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UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBLGNBQWMsNEJBQTRCO1FBQzFDO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTs7UUFFSjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7O1FBRUE7UUFDQTtRQUNBLGVBQWUsNEJBQTRCO1FBQzNDO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0EsZUFBZSw0QkFBNEI7UUFDM0M7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQix1Q0FBdUM7UUFDeEQ7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQix1Q0FBdUM7UUFDeEQ7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxpQkFBaUIsc0JBQXNCO1FBQ3ZDO1FBQ0E7UUFDQTtRQUNBLFFBQVE7UUFDUjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxVQUFVO1FBQ1Y7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0EsY0FBYyx3Q0FBd0M7UUFDdEQ7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBLE9BQU87UUFDUDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxTQUFTO1FBQ1Q7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxRQUFRO1FBQ1I7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBLEtBQUs7UUFDTDs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxJQUFJO1FBQ0o7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGVBQWU7UUFDZjtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBLHNDQUFzQyx1QkFBdUI7OztRQUc3RDtRQUNBOzs7Ozs7Ozs7Ozs7QUN2MUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3ZCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTRDO0FBQ21CO0FBQ3pCO0FBQ0Y7QUFDTjtBQUNVO0FBRWM7QUFDUjtBQUNBO0FBQ0U7QUFDTjtBQUNVO0FBQ0U7QUFDUTtBQUNOO0FBQ1o7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRjtBQUNFO0FBQ007QUFDRjtBQUNNO0FBQ0Y7QUFDVjtBQUNFO0FBQ0E7QUFDYztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ1Y7QUFDQTtBQUNZO0FBQ0U7QUFDZDtBQUNjO0FBQ0E7QUFDTTtBQUNwQjtBQUNNO0FBQ1o7QUFDTTtBQUNJO0FBQ047QUFDSTtBQUNGO0FBQ0E7QUFDSjtBQUNtRDtBQUN2QztBQUNzQjtBQUNwQjtBQUNVO0FBQ2xCO0FBQ1k7QUFDSjtBQUNKO0FBQ0k7QUF1RnJEO0FBRU0sU0FBUyxVQUFVLENBQUMsU0FBb0I7SUFDM0Msc0RBQU8sQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLGlFQUFZLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDL0IscUVBQWMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNqQywrREFBaUIsQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQTJCLENBQUM7SUFDL0QsTUFBTSxHQUFHLEdBQUcsSUFBSSxvREFBTSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN4QyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDYixNQUFNLFdBQVcsR0FBRyxxRUFBYyxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDeEQsSUFBSSxXQUFXLEtBQUssRUFBRSxFQUFFO1FBQ3BCLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLHFFQUFjLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN6RixJQUFHLEdBQUcsS0FBSyxJQUFJO1lBQ1gsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQ25CO0FBQ0wsQ0FBQztBQUVNLFNBQVMsUUFBUSxDQUFDLFNBQW9CO0lBQ3pDLElBQUksS0FBSyxHQUNMLGVBQWU7UUFDZiw2QkFBNkI7UUFDN0IsMkZBQTJGO1FBQzNGLGlDQUFpQyxDQUFDO0lBQ3RDLE1BQU0sR0FBRyxHQUFHLElBQUksb0RBQU0sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDeEMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNuQyxLQUFLLElBQUksR0FBRyxDQUFDO0lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQixPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBRU0sU0FBUyx1QkFBdUIsQ0FBQyxJQUFZO0lBQ2hELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FDOUcsQ0FBQztBQUNOLENBQUM7QUFFRCxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsR0FBRztJQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FDM0w5QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWlDO0FBRXVCO0FBRUw7QUFFNUMsTUFBTSxPQUFRLFNBQVEsNENBQUU7SUFJM0IsWUFBWSxRQUFhLEVBQUUsRUFBTSxFQUFFLEVBQU07UUFDckMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELEVBQUUsQ0FBQyxHQUFXO1FBQ1YsT0FBTyw2RUFBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBVSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBVSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQVc7UUFDaEIsT0FBTyxJQUFJLGdFQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFRCxVQUFVO1FBQ04sT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUMzQkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQStCO0FBRWM7QUFDSTtBQUVFO0FBRTVDLE1BQU0sU0FBVSxTQUFRLDRDQUFFO0lBSTdCLFlBQVksUUFBYSxFQUFFLEVBQU0sRUFBRSxFQUFNO1FBQ3JDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxFQUFFLENBQUMsR0FBVztRQUNWLE1BQU0sS0FBSyxHQUFXLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sS0FBSyxHQUFXLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXZDLElBQUksQ0FBQyxDQUFDLEtBQUssWUFBWSwwREFBUyxDQUFDLEVBQUU7WUFDL0IsTUFBTSxJQUFJLDhEQUFpQixDQUFDLHlCQUEwQixLQUFlLENBQUMsSUFBSSx5REFBeUQsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdko7UUFDQSxLQUFtQixDQUFDLG1CQUFtQixDQUFDLEtBQWMsQ0FBQyxDQUFDO1FBQ3pELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxRQUFRLENBQUMsR0FBVztRQUNoQixPQUFPLElBQUksZ0VBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUVELFVBQVU7UUFDTixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7OztBQ25DRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQStCO0FBRXlCO0FBQ0w7QUFFNUMsTUFBTSxXQUFZLFNBQVEsNENBQUU7SUFHL0IsWUFBWSxRQUFhLEVBQUUsR0FBWTtRQUNuQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDbkIsQ0FBQztJQUVELEVBQUUsQ0FBQyxHQUFXO1FBQ1YsT0FBTyxJQUFJLHFFQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxRQUFRLENBQUMsR0FBVztRQUNoQixPQUFPLElBQUksZ0VBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLGdFQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRCxVQUFVO1FBQ04sT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUN4QkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQjtBQUVLO0FBQ2U7QUFFNUMsTUFBTyxTQUFVLFNBQVEsNENBQUU7SUFDOUIsRUFBRSxDQUFDLEdBQVc7UUFDVixPQUFPLElBQUksa0RBQVEsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFDRCxRQUFRLENBQUMsR0FBVztRQUNoQixPQUFPLElBQUksZ0VBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLGdFQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxVQUFVO1FBQ04sT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUNoQkQ7QUFBQTtBQUFBO0FBQXFDO0FBRTlCLE1BQU0sUUFBUyxTQUFRLGtEQUFLO0lBQy9CO1FBQ0ksS0FBSyxFQUFFLENBQUM7SUFDWixDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUNIRDtBQUFBO0FBQU8sTUFBTSxRQUFRO0lBS2pCLFlBQVksUUFBYSxFQUFFLGNBQWtCLEVBQUUsU0FBb0I7UUFDL0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQUVNLGlCQUFpQjtRQUNwQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDL0IsQ0FBQztJQUVNLFlBQVk7UUFDZixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7O0FDckJEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQjtBQUVjO0FBQ0o7QUFDVTtBQUU1QyxNQUFNLGNBQWUsU0FBUSw0Q0FBRTtJQUdsQyxZQUFZLFFBQWEsRUFBRSxVQUFxQjtRQUM1QyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDakMsQ0FBQztJQUVELEVBQUUsQ0FBQyxHQUFXO1FBQ1YsSUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDO1FBQ3pCLEtBQUksSUFBSSxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQyxJQUFJLEdBQUcsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlCLElBQUksR0FBRyxZQUFZLDBEQUFTLEVBQUU7Z0JBQzFCLEdBQUcsR0FBSSxHQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ3ZDO1lBQ0QsUUFBUSxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUM7U0FDekI7UUFDRCxzREFBTyxDQUFDLEdBQUcsSUFBSSxHQUFHLFFBQVEsSUFBSSxDQUFDO1FBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzNCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFBQSxDQUFDO0lBRUYsUUFBUSxDQUFDLEdBQVc7UUFDaEIsT0FBTyxJQUFJLGdFQUFZLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEcsQ0FBQztJQUVELFVBQVU7UUFDTixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7OztBQ25DRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQStCO0FBRVc7QUFDUztBQUU1QyxNQUFNLFlBQWEsU0FBUSw0Q0FBRTtJQUNoQyxFQUFFLENBQUMsR0FBVztRQUNWLE9BQU8sSUFBSSx3REFBVyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFXO1FBQ2hCLE9BQU8sSUFBSSxnRUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksZ0VBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVELFVBQVU7UUFDTixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7OztBQ2pCRDtBQUFBO0FBQUE7QUFBcUM7QUFFOUIsTUFBTSxXQUFZLFNBQVEsa0RBQUs7SUFDbEM7UUFDSSxLQUFLLEVBQUUsQ0FBQztJQUNaLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7OztBQ05EO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQStCO0FBR2M7QUFDSTtBQUNnQztBQUM5QjtBQUU1QyxNQUFNLGdCQUFpQixTQUFRLDRDQUFFO0lBSXBDLFlBQVksUUFBYSxFQUFFLEVBQU0sRUFBRSxLQUFTO1FBQ3hDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxFQUFFLENBQUMsR0FBVztRQUNWLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBVSxDQUFDO1FBQ3RDLHVDQUF1QztRQUN2Qyw4RUFBOEU7UUFDOUUsSUFBSTtRQUVKLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBVSxDQUFDO1FBQ3pDLElBQUksS0FBSyxZQUFZLDBEQUFTLEVBQUU7WUFDNUIsS0FBSyxHQUFJLEtBQW1CLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDM0M7UUFFRCxJQUFJLEtBQUssWUFBWSxvRUFBTSxFQUFFO1lBQ3pCLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBRSxLQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDbkQsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ1osTUFBTSxJQUFJLDhEQUFpQixDQUFDLGdEQUFnRCxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNoRztZQUNELEtBQUssR0FBRyxJQUFJLG9FQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDM0I7UUFFRCxJQUFJLENBQUMsQ0FBQyxLQUFLLFlBQVksb0VBQU0sQ0FBQyxFQUFFO1lBQzVCLE1BQU0sSUFBSSw4REFBaUIsQ0FBQyxnREFBZ0QsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDaEc7UUFFRCxJQUFJLEdBQUcsR0FBRyxLQUFLLFlBQVksMERBQVMsQ0FBQyxDQUFDLENBQUUsS0FBbUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBRS9FLElBQUksQ0FBQyxDQUFDLEdBQUcsWUFBWSxtRUFBSyxDQUFDLEVBQUU7WUFDekIsT0FBTyxJQUFJLHVFQUFTLEVBQUUsQ0FBQztTQUMxQjtRQUVELE9BQVEsR0FBYSxDQUFDLFFBQVEsQ0FBRSxLQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFXO1FBQ2hCLE9BQU8sSUFBSSxnRUFBWSxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7O0FDekREO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFpQztBQUdZO0FBQ1M7QUFDSDtBQUU1QyxNQUFNLGVBQWdCLFNBQVEsNENBQUU7SUFHbkMsWUFBWSxRQUFhLEVBQUUsSUFBZTtRQUN0QyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELEVBQUUsQ0FBQyxHQUFXO1FBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQVMsQ0FBQztRQUM5QixLQUFLLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDdEIsSUFBSSxTQUFTLEdBQUcsSUFBSSwwREFBUyxFQUFFLENBQUM7WUFDaEMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFVLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3hCO1FBQ0QsT0FBTyxJQUFJLG1FQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFXO1FBQ2hCLE9BQU8sSUFBSSxnRUFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRCxVQUFVO1FBQ04sT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUNoQ0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQjtBQUVRO0FBQ1k7QUFFNUMsTUFBTSxlQUFnQixTQUFRLDRDQUFFO0lBR25DLFlBQVksUUFBYSxFQUFFLEVBQVU7UUFDakMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxFQUFFLENBQUMsR0FBVztRQUNWLE9BQU8sNERBQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxRQUFRLENBQUMsR0FBVztRQUNoQixPQUFPLElBQUksZ0VBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLGdFQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7O0FDeEJEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQStCO0FBRWM7QUFFMEI7QUFDakM7QUFDYTtBQUU1QyxNQUFNLGdCQUFpQixTQUFRLDRDQUFFO0lBS3BDLFlBQVksUUFBYSxFQUFFLE1BQVUsRUFBRSxLQUFhLEVBQUUsSUFBZTtRQUNqRSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELEVBQUUsQ0FBQyxHQUFXO1FBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEMsSUFBSSxJQUFJLFlBQVksMERBQVMsRUFBRTtZQUMzQixJQUFJLEdBQUksSUFBa0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUN6QztRQUVELElBQUksR0FBRyxHQUFJLElBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxDQUFDLEdBQUcsWUFBWSxvRkFBaUIsQ0FBQyxFQUFFO1lBQ3JDLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFFRCxNQUFNLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBUyxDQUFDO1FBQ3RDLEtBQUssSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUN2QixJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLElBQUksUUFBUSxZQUFZLDBEQUFTLEVBQUU7Z0JBQy9CLFFBQVEsR0FBSSxRQUFzQixDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ2pEO1lBQ0QsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFpQixDQUFDLENBQUM7U0FDdEM7UUFFRCxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNuQyxJQUFJLEdBQUcsWUFBWSxvREFBUyxFQUFFO1lBQzFCLE9BQVEsR0FBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUN4QztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxRQUFRLENBQUMsR0FBVztRQUNoQixPQUFPLElBQUksZ0VBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLGdFQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksZ0VBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEssQ0FBQztJQUVELFVBQVU7UUFDTixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7OztBQ3RERDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBK0I7QUFHYztBQUNVO0FBQ0o7QUFFNUMsTUFBTSxhQUFjLFNBQVEsNENBQUU7SUFHakMsWUFBWSxRQUFhLEVBQUUsS0FBc0I7UUFDN0MsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxFQUFFLENBQUMsR0FBVztRQUNWLE1BQU0sSUFBSSxHQUF1QixJQUFJLEdBQUcsRUFBaUIsQ0FBQztRQUMxRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN4QixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksS0FBSyxZQUFZLDBEQUFTLEVBQUU7Z0JBQzVCLEtBQUssR0FBSSxLQUFtQixDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQzNDO1lBQ0QsTUFBTSxTQUFTLEdBQUcsSUFBSSwwREFBUyxFQUFFLENBQUM7WUFDbEMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLEtBQWMsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLG9FQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFXO1FBQ2hCLElBQUksTUFBTSxHQUFtQixFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGdFQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxnRUFBWSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7O0FDekNEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBK0I7QUFHYztBQUNJO0FBQ3NCO0FBQ2pDO0FBQ2E7QUFFNUMsTUFBTSxnQkFBaUIsU0FBUSw0Q0FBRTtJQUlwQyxZQUFZLFFBQWEsRUFBRSxFQUFNLEVBQUUsSUFBWTtRQUMzQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsRUFBRSxDQUFDLEdBQVc7UUFDVixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQVUsQ0FBQztRQUNuQyxJQUFJLENBQUMsQ0FBQyxFQUFFLFlBQVksMERBQVMsQ0FBQyxFQUFFO1lBQzVCLE1BQU0sSUFBSSw4REFBaUIsQ0FBQyw4QkFBOEIsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDOUU7UUFFRCxJQUFJLEdBQUcsR0FBSSxFQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxZQUFZLG9GQUFpQixFQUFFO1lBQ2hDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksS0FBSyxFQUFTLENBQUMsQ0FBQztZQUN6QyxJQUFJLEdBQUcsWUFBWSxvREFBUyxFQUFFO2dCQUMxQixPQUFRLEdBQWlCLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDeEM7U0FDSjtRQUVELE9BQU8sR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFXO1FBQ2hCLE9BQU8sSUFBSSxnRUFBWSxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksZ0VBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pHLENBQUM7SUFFRCxVQUFVO1FBQ04sT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUM1Q0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBK0I7QUFFNEI7QUFDZDtBQUNNO0FBQ0k7QUFFaEQsTUFBTSxjQUFlLFNBQVEsNENBQUU7SUFNbEMsWUFBWSxRQUFhLEVBQUUsSUFBWSxFQUFFLE1BQWlCLEVBQUUsU0FBb0IsRUFBRSxJQUFJLEdBQUcsS0FBSztRQUMxRixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELEVBQUUsQ0FBQyxHQUFXO1FBQ1YsTUFBTSxLQUFLLEdBQUcsSUFBSSx3RUFBVyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEUsTUFBTSxTQUFTLEdBQUcsSUFBSSwwREFBUyxFQUFFLENBQUM7UUFDbEMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLElBQUcsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUU7WUFDbkIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ2xDLE9BQU8sU0FBUyxDQUFDO1NBQ3BCO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFXO1FBQ2hCLE9BQU8sSUFBSSxnRUFBWSxDQUFDLFNBQVMsRUFBRTtZQUMvQixJQUFJLGdFQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUMzQixJQUFJLGdFQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUMzQixJQUFJLGdFQUFZLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLElBQUksZ0VBQVksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDM0YsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFVBQVU7UUFDTixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDZixNQUFNLE9BQU8sR0FBRyxvRUFBYyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzVDLEtBQUssSUFBSSxvQkFBb0IsT0FBTyxPQUFPLENBQUM7UUFDNUMsS0FBSyxJQUFJLGlCQUFpQjtZQUN0QixvQkFBb0I7WUFDcEIsd0JBQXdCLENBQUM7UUFDN0IsS0FBSyxJQUFJLGlFQUFpRSxDQUFDO1FBQzNFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzlCLEtBQUssSUFBSSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN4QixLQUFLLElBQUksS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxJQUFJLFlBQVksSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDO1FBQ3JDLEtBQUssSUFBSSxLQUFLLENBQUM7UUFDZixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUMzREQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBK0I7QUFFMkI7QUFDYjtBQUNNO0FBQ0k7QUFFaEQsTUFBTSxtQkFBb0IsU0FBUSw0Q0FBRTtJQUl2QyxZQUFZLFFBQWEsRUFBRSxJQUFZLEVBQUUsSUFBSSxHQUFHLEtBQUs7UUFDakQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxPQUFPO1FBQ0gsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxFQUFFLENBQUMsR0FBVztRQUNWLE1BQU0sS0FBSyxHQUFHLElBQUksdUVBQVMsRUFBRSxDQUFDO1FBQzlCLE1BQU0sU0FBUyxHQUFHLElBQUksMERBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsU0FBUyxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNsQyxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQVc7UUFDaEIsT0FBTyxJQUFJLGdFQUFZLENBQUMsZUFBZSxFQUFFLENBQUMsSUFBSSxnRUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLGdFQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RyxDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sSUFBSSxvRUFBYyxDQUFDLFNBQVMsRUFBRSxZQUFZLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQztRQUFBLENBQUM7SUFDdEUsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7O0FDcENEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBK0I7QUFFMEM7QUFDdEI7QUFFNUMsTUFBTSx3QkFBeUIsU0FBUSw0Q0FBRTtJQUk1QyxZQUFZLFFBQWEsRUFBRSxJQUFZLEVBQUUsVUFBaUI7UUFDdEQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUksVUFBb0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNyRCxDQUFDO0lBRUQsRUFBRSxDQUFDLEdBQVc7UUFDVixNQUFNLFNBQVMsR0FBRyxJQUFJLDREQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZELDhEQUFpQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNsRSxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQVc7UUFDaEIsSUFBSSxNQUFNLEdBQW1CLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksZ0VBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxnRUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksZ0VBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLGdFQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksZ0VBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNHLENBQUM7SUFFRCxVQUFVO1FBQ04sT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUNqQ0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQjtBQUkyQjtBQUNQO0FBRTVDLE1BQU0sa0JBQW1CLFNBQVEsNENBQUU7SUFNdEMsWUFBWSxRQUFhLEVBQUUsVUFBa0IsRUFBRSxjQUF5QixFQUFFLEtBQVUsRUFBRSxVQUFtQixLQUFLO1FBQzFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssSUFBSSxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDM0IsQ0FBQztJQUVELEVBQUUsQ0FBQyxHQUFXO1FBQ1YsS0FBSyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ2hDLElBQUk7Z0JBQ0EsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksRUFBRTtvQkFDcEIsRUFBcUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQ2hHO3FCQUFJO29CQUNBLEVBQXFCLENBQUMsUUFBUSxDQUFDLElBQUksdUVBQVMsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUNuRjtnQkFDRCxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2Y7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDUixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUMxQjtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFXO1FBQ2hCLE9BQU8sSUFBSSxnRUFBWSxDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxnRUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksZ0VBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbEwsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsVUFBVTtRQUNOLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2xDLEdBQUcsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7OztBQ2pERDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQjtBQUcyQjtBQUNiO0FBQ007QUFDSTtBQUVoRCxNQUFNLGNBQWUsU0FBUSw0Q0FBRTtJQU9sQyxZQUFZLFFBQWEsRUFBRSxJQUFZLEVBQUUsUUFBWSxJQUFJO1FBQ3JELEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQU5aLFVBQUssR0FBVSxJQUFJLHVFQUFTLEVBQUUsQ0FBQztRQU9uQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBRUQsRUFBRSxDQUFDLEdBQVc7UUFDVixJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLFFBQVEsQ0FBQyxRQUFlLElBQUksdUVBQVMsRUFBRSxFQUFFLFVBQW1CLEtBQUssRUFBRSxhQUFxQixLQUFLO1FBQ2hHLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksVUFBVSxLQUFLLEVBQUUsRUFBRTtZQUNuQixVQUFVLEdBQUcsS0FBSyxDQUFDO1NBQ3RCO1FBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVPLGVBQWUsQ0FBQyxHQUFXLEVBQUUsVUFBa0I7UUFDbkQsSUFBSSxLQUFLLEdBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUM5QixJQUFHLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO1lBQ3JCLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQVUsQ0FBQztTQUMxQztRQUNELE1BQU0sU0FBUyxHQUFjLElBQUksMERBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxRSxTQUFTLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFXO1FBQ2hCLE9BQU8sSUFBSSxnRUFBWSxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksZ0VBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxnRUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUMsS0FBSSxDQUFDLFVBQVUsRUFBQyxNQUFLLENBQUM7WUFDeEgsSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLGdFQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdGLENBQUM7SUFFRCxVQUFVO1FBQ04sT0FBTyxJQUFJLG9FQUFjLENBQUMsU0FBUyxFQUFFLFlBQVksSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDO0lBQ3JFLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7OztBQ3JERDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQStCO0FBQ2tDO0FBR2Q7QUFFNUMsTUFBTSxPQUFRLFNBQVEsNENBQUU7SUFJM0IsWUFBWSxRQUFhLEVBQUUsRUFBTSxFQUFFLEVBQU07UUFDckMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELEVBQUUsQ0FBQyxHQUFXO1FBQ1YsT0FBTyxzRkFBUyxDQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBVyxFQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBVyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQVc7UUFDaEIsT0FBTyxJQUFJLGdFQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFRCxVQUFVO1FBQ04sT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUMzQkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQjtBQUVzQztBQUVsQjtBQUU1QyxNQUFNLE9BQVEsU0FBUSw0Q0FBRTtJQUkzQixZQUFZLFFBQWEsRUFBRSxFQUFNLEVBQUUsRUFBTTtRQUNyQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsRUFBRSxDQUFDLEdBQVc7UUFDVixPQUFPLG9GQUFRLENBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFXLEVBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFXLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzdGLENBQUM7SUFFRCxRQUFRLENBQUMsR0FBVztRQUNoQixPQUFPLElBQUksZ0VBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVELFVBQVU7UUFDTixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7OztBQzNCRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBK0I7QUFFYTtBQUNPO0FBQ0k7QUFFaEQsTUFBTSxXQUFZLFNBQVEsNENBQUU7SUFJL0IsWUFBWSxRQUFhLEVBQUUsU0FBYSxFQUFFLFNBQW9CO1FBQzFELEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUMvQixDQUFDO0lBRUQsRUFBRSxDQUFDLEdBQVc7UUFDVixPQUFPLGlFQUFZLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQVc7UUFDaEIsT0FBTyxJQUFJLGdFQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxnRUFBWSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoSyxDQUFDO0lBRUQsVUFBVTtRQUNOLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNmLE1BQU0sT0FBTyxHQUFHLG9FQUFjLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDNUMsS0FBSyxJQUFJLG9CQUFvQixPQUFPLE9BQU8sQ0FBQztRQUM1QyxLQUFLLElBQUksaUJBQWlCO1lBQ3RCLG9CQUFvQjtZQUNwQix3QkFBd0IsQ0FBQztRQUM3QixLQUFLLElBQUksaUVBQWlFLENBQUM7UUFDM0UsS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDOUIsS0FBSyxJQUFJLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUNILEtBQUssSUFBSSxZQUFZLG1CQUFtQixNQUFNLENBQUM7UUFDL0MsS0FBSyxJQUFJLEtBQUssQ0FBQztRQUNmLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7OztBQ3hDRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQStCO0FBQzhCO0FBR1Y7QUFFNUMsTUFBTSxNQUFPLFNBQVEsNENBQUU7SUFJMUIsWUFBWSxRQUFhLEVBQUUsRUFBTSxFQUFFLEVBQU07UUFDckMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELEVBQUUsQ0FBQyxHQUFXO1FBQ1YsT0FBTyxrRkFBSyxDQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBVyxFQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBVyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxRixDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQVc7UUFDaEIsT0FBTyxJQUFJLGdFQUFZLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFRCxVQUFVO1FBQ04sT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUMzQkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQjtBQUVnQztBQUVaO0FBRTVDLE1BQU0sT0FBUSxTQUFRLDRDQUFFO0lBSTNCLFlBQVksUUFBYSxFQUFFLEVBQU0sRUFBRSxFQUFNO1FBQ3JDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxFQUFFLENBQUMsR0FBVztRQUNWLE9BQU8sb0ZBQVEsQ0FBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQVcsRUFBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQVcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0YsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFXO1FBQ2hCLE9BQU8sSUFBSSxnRUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7O0FDM0JEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQjtBQUNRO0FBQ007QUFDeUI7QUFDWjtBQUNQO0FBQ0k7QUFFaEQsTUFBTSxTQUFVLFNBQVEsNENBQUU7SUFNN0IsWUFBWSxRQUFhLEVBQUUsVUFBa0IsRUFBRSxhQUFzQixFQUFFLEtBQVMsRUFBRSxTQUFvQjtRQUNsRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDL0IsQ0FBQztJQUVELEVBQUUsQ0FBQyxHQUFXO1FBQ1YsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEMsSUFBSSxLQUFLLFlBQVksMERBQVMsRUFBRTtZQUM1QixLQUFLLEdBQUksS0FBbUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUMzQztRQUNELElBQUksQ0FBQyxDQUFDLEtBQUssWUFBWSxtRUFBSyxDQUFDLEVBQUU7WUFDM0IsTUFBTSxJQUFJLDhEQUFpQixDQUFDLHlEQUF5RCxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN6RztRQUVELE1BQU0sSUFBSSxHQUFHLElBQUksb0RBQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSwwREFBUyxFQUFFLENBQUMsQ0FBQztTQUN0RDtRQUVELEtBQUksSUFBSSxLQUFLLElBQUssS0FBZSxDQUFDLFlBQVksRUFBRSxFQUFDO1lBQzVDLDREQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxvRUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDMUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2pCO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFXO1FBQ2hCLE9BQU8sSUFBSSxnRUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksZ0VBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxnRUFBWSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwSyxDQUFDO0lBRUQsVUFBVTtRQUNOLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNmLE1BQU0sT0FBTyxHQUFHLG9FQUFjLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDNUMsS0FBSyxJQUFJLG9CQUFvQixPQUFPLE9BQU8sQ0FBQztRQUM1QyxLQUFLLElBQUksaUJBQWlCO1lBQ3RCLG9CQUFvQjtZQUNwQix3QkFBd0IsQ0FBQztRQUM3QixLQUFLLElBQUksaUVBQWlFLENBQUM7UUFDM0UsS0FBSyxJQUFJLElBQUksb0VBQWMsQ0FBQyxTQUFTLEVBQUUsWUFBWSxJQUFJLENBQUMsVUFBVSxNQUFNLENBQUM7UUFDekUsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDOUIsS0FBSyxJQUFJLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUNILEtBQUssSUFBSSxZQUFZLGlCQUFpQixNQUFNLENBQUM7UUFDN0MsS0FBSyxJQUFJLEtBQUssQ0FBQztRQUNmLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Q0FFSjs7Ozs7Ozs7Ozs7OztBQ2pFRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQjtBQUNRO0FBQ0c7QUFDUztBQUNJO0FBRWhELE1BQU0sT0FBUSxTQUFRLDRDQUFFO0lBTTNCLFlBQVksUUFBYSxFQUFFLFVBQWMsRUFBRSxVQUFjLEVBQUUsVUFBYyxFQUFFLFNBQW9CO1FBQzNGLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUMvQixDQUFDO0lBRUQsRUFBRSxDQUFDLEdBQVc7UUFDVixNQUFNLFlBQVksR0FBRyxJQUFJLG9EQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDeEQsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRXRCLCtEQUFVLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0UsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFXO1FBQ2hCLE9BQU8sSUFBSSxnRUFBWSxDQUFDLEtBQUssRUFBRTtZQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7WUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1lBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztZQUM3QixJQUFJLGdFQUFZLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQUMsQ0FBQyxDQUFDO0lBQy9GLENBQUM7SUFFRCxVQUFVO1FBQ04sSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2YsTUFBTSxPQUFPLEdBQUcsb0VBQWMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM1QyxLQUFLLElBQUksb0JBQW9CLE9BQU8sT0FBTyxDQUFDO1FBQzVDLEtBQUssSUFBSSxpQkFBaUI7WUFDdEIsb0JBQW9CO1lBQ3BCLHdCQUF3QixDQUFDO1FBQzdCLEtBQUssSUFBSSxpRUFBaUUsQ0FBQztRQUMzRSxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QyxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QyxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM5QixLQUFLLElBQUksUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxJQUFJLFlBQVksY0FBYyxNQUFNLENBQUM7UUFDMUMsS0FBSyxJQUFJLEtBQUssQ0FBQztRQUNmLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Q0FFSjs7Ozs7Ozs7Ozs7OztBQ3ZERDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBK0I7QUFDUTtBQUNNO0FBQ1M7QUFDSTtBQUNQO0FBQ0k7QUFFaEQsTUFBTSxTQUFVLFNBQVEsNENBQUU7SUFNN0IsWUFBWSxRQUFhLEVBQUUsVUFBa0IsRUFBRSxhQUFzQixFQUFFLEtBQVMsRUFBRSxTQUFvQjtRQUNsRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDL0IsQ0FBQztJQUVELEVBQUUsQ0FBQyxHQUFXO1FBQ1YsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEMsSUFBSSxLQUFLLFlBQVksMERBQVMsRUFBRTtZQUM1QixLQUFLLEdBQUksS0FBbUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUMzQztRQUNELElBQUksQ0FBQyxDQUFDLEtBQUssWUFBWSxtRUFBSyxDQUFDLEVBQUU7WUFDM0IsTUFBTSxJQUFJLDhEQUFpQixDQUFDLHdEQUF3RCxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDdkc7UUFFRCxNQUFNLElBQUksR0FBRyxJQUFJLG9EQUFNLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3QyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksMERBQVMsRUFBRSxDQUFDLENBQUM7U0FDdEQ7UUFFRCxLQUFLLElBQUksT0FBTyxJQUFLLEtBQWUsQ0FBQyxZQUFZLEVBQUUsRUFBRTtZQUNqRCxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUM7WUFDbEIsSUFBSSxHQUFHLFlBQVksMERBQVMsRUFBRTtnQkFDMUIsR0FBRyxHQUFJLEdBQWlCLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDdkM7WUFDQSw0REFBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNqQjtRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxRQUFRLENBQUMsR0FBVztRQUNoQixPQUFPLElBQUksZ0VBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLGdFQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUksZ0VBQVksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEssQ0FBQztJQUVELFVBQVU7UUFDTixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDZixNQUFNLE9BQU8sR0FBRyxvRUFBYyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzVDLEtBQUssSUFBSSxvQkFBb0IsT0FBTyxPQUFPLENBQUM7UUFDNUMsS0FBSyxJQUFJLGlCQUFpQjtZQUN0QixvQkFBb0I7WUFDcEIsd0JBQXdCLENBQUM7UUFDN0IsS0FBSyxJQUFJLGlFQUFpRSxDQUFDO1FBQzNFLEtBQUssSUFBSSxJQUFJLG9FQUFjLENBQUMsU0FBUyxFQUFFLFlBQVksSUFBSSxDQUFDLFVBQVUsTUFBTSxDQUFDO1FBQ3pFLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzlCLEtBQUssSUFBSSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFDSCxLQUFLLElBQUksWUFBWSxpQkFBaUIsTUFBTSxDQUFDO1FBQzdDLEtBQUssSUFBSSxLQUFLLENBQUM7UUFDZixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUNwRUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQStCO0FBR2M7QUFDMEI7QUFDakM7QUFDb0I7QUFDUTtBQUVmO0FBRTVDLE1BQU0sZ0JBQWlCLFNBQVEsNENBQUU7SUFJcEMsWUFBWSxRQUFhLEVBQUUsSUFBUSxFQUFFLElBQWU7UUFDaEQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxFQUFFLENBQUMsR0FBVztRQUNWLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLElBQUksRUFBRSxZQUFZLDBEQUFTLEVBQUU7WUFDekIsRUFBRSxHQUFJLEVBQWdCLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDckM7UUFFRCxNQUFNLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBUyxDQUFDO1FBQ3RDLEtBQUssSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUN2QixJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksR0FBRyxZQUFZLDBEQUFTLEVBQUU7Z0JBQzFCLEdBQUcsR0FBSSxHQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ3ZDO1lBQ0QsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFZLENBQUMsQ0FBQztTQUNqQztRQUVELElBQUksRUFBRSxZQUFZLG9GQUFpQixFQUFFO1lBQ2pDLElBQUksS0FBSyxHQUFJLEVBQWtCLENBQUM7WUFDaEMsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDckMsSUFBSSxHQUFHLFlBQVksb0RBQVMsRUFBRTtnQkFDMUIsSUFBSSxHQUFHLEdBQUksR0FBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDeEMsSUFBSSxHQUFHLFlBQVksMERBQVMsRUFBRTtvQkFDMUIsR0FBRyxHQUFJLEdBQWlCLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQ3ZDO2dCQUNELElBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLEdBQUcsQ0FBQyxJQUFJO3VCQUN4QixLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssS0FBSzt1QkFDekIsR0FBRyxDQUFDLElBQUksS0FBSyxNQUFNO3VCQUNuQixHQUFHLENBQUMsSUFBSSxLQUFLLFdBQVc7dUJBQ3hCLEdBQUcsQ0FBQyxJQUFJLEtBQUssUUFBUTt1QkFDckIsQ0FBQyxvRUFBZSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLEVBQ2hFO29CQUNFLE1BQU0sSUFBSSw4REFBaUIsQ0FBQywrQkFBK0IsS0FBSyxDQUFDLE9BQU8sRUFBRSxxQkFBcUIsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDN0g7Z0JBQ0QsT0FBUSxHQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ3hDO1NBQ0o7UUFDRCxPQUFPLElBQUksdUVBQVMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxRQUFRLENBQUMsR0FBVztRQUNoQixPQUFPLElBQUksZ0VBQVksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLGdFQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNJLENBQUM7SUFFRCxVQUFVO1FBQ04sT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUNsRUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQjtBQUVnQztBQUVaO0FBRTVDLE1BQU0sWUFBYSxTQUFRLDRDQUFFO0lBSWhDLFlBQVksUUFBYSxFQUFFLEVBQU0sRUFBRSxFQUFNO1FBQ3JDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxFQUFFLENBQUMsR0FBVztRQUNWLE9BQU8sb0ZBQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQVUsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEYsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFXO1FBQ2hCLE9BQU8sSUFBSSxnRUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RixDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7O0FDM0JEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBK0I7QUFFOEI7QUFFVjtBQUU1QyxNQUFNLFVBQVcsU0FBUSw0Q0FBRTtJQUk5QixZQUFZLFFBQWEsRUFBRSxFQUFNLEVBQUUsRUFBTTtRQUNyQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsRUFBRSxDQUFDLEdBQVc7UUFDVixPQUFPLGtGQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFVLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFFRCxRQUFRLENBQUMsR0FBVztRQUNoQixPQUFPLElBQUksZ0VBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVELFVBQVU7UUFDTixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7OztBQzNCRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBK0I7QUFDUTtBQUNpQjtBQUNYO0FBQ3VCO0FBQ2pCO0FBQ0k7QUFFaEQsTUFBTSxNQUFPLFNBQVEsNENBQUU7SUFLMUIsWUFBWSxRQUFhLEVBQUUsU0FBYSxFQUFFLGNBQXlCLEVBQUUsZUFBMEI7UUFDM0YsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO0lBQzNDLENBQUM7SUFFRCxFQUFFLENBQUMsR0FBVztRQUNWLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLElBQUksU0FBUyxZQUFZLDBEQUFTLEVBQUU7WUFDaEMsU0FBUyxHQUFJLFNBQXVCLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkQ7UUFDRCxJQUFHLENBQUMsQ0FBQyxTQUFTLFlBQVkscUVBQU8sQ0FBQyxFQUFDO1lBQy9CLE1BQU0sSUFBSSw4REFBaUIsQ0FBQyxrRUFBa0UsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbEg7UUFFRCxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUN0QixNQUFNLE9BQU8sR0FBRyxJQUFJLG9EQUFNLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNyRCxzRUFBaUIsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDaEMsT0FBTyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDM0I7UUFFRCxNQUFNLFFBQVEsR0FBRyxJQUFJLG9EQUFNLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN2RCxzRUFBaUIsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDakMsT0FBTyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFXO1FBQ2hCLE9BQU8sSUFBSSxnRUFBWSxDQUFDLElBQUksRUFBRTtZQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7WUFDNUIsSUFBSSxnRUFBWSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM3RixJQUFJLGdFQUFZLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ2xHLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxVQUFVO1FBQ04sSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2YsTUFBTSxPQUFPLEdBQUcsb0VBQWMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM1QyxLQUFLLElBQUksb0JBQW9CLE9BQU8sT0FBTyxDQUFDO1FBQzVDLEtBQUssSUFBSSxpQkFBaUI7WUFDdEIsb0JBQW9CO1lBQ3BCLHdCQUF3QixDQUFDO1FBQzdCLEtBQUssSUFBSSxpRUFBaUUsQ0FBQztRQUMzRSxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUdyQyxLQUFLLElBQUksb0JBQW9CLG9FQUFjLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQztRQUNoRSxLQUFLLElBQUksaUJBQWlCO1lBQ3RCLGdCQUFnQjtZQUNoQix1QkFBdUIsQ0FBQztRQUM1QixLQUFLLElBQUksZ0RBQWdELENBQUM7UUFDMUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDbkMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUNILEtBQUssSUFBSSxZQUFZLGtCQUFrQixNQUFNLENBQUM7UUFDOUMsS0FBSyxJQUFJLEtBQUssQ0FBQztRQUVmLEtBQUssSUFBSSxvQkFBb0Isb0VBQWMsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDO1FBQ2hFLEtBQUssSUFBSSxpQkFBaUI7WUFDdEIsZ0JBQWdCO1lBQ2hCLHVCQUF1QixDQUFDO1FBQzVCLEtBQUssSUFBSSxnREFBZ0QsQ0FBQztRQUMxRCxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNwQyxLQUFLLElBQUksUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxJQUFJLFlBQVksbUJBQW1CLE1BQU0sQ0FBQztRQUMvQyxLQUFLLElBQUksS0FBSyxDQUFDO1FBR2YsS0FBSyxJQUFJLFlBQVksYUFBYSxNQUFNLENBQUM7UUFDekMsS0FBSyxJQUFJLEtBQUssQ0FBQztRQUNmLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7OztBQ3RGRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQStCO0FBRWdDO0FBRVo7QUFHNUMsTUFBTSxXQUFZLFNBQVEsNENBQUU7SUFJL0IsWUFBWSxRQUFhLEVBQUUsRUFBTSxFQUFFLEVBQU07UUFDckMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELEVBQUUsQ0FBQyxHQUFXO1FBQ1YsT0FBTyxvRkFBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBVSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBVSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQVc7UUFDaEIsT0FBTyxJQUFJLGdFQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFFRCxVQUFVO1FBQ04sT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUM1QkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQjtBQUU4QjtBQUVWO0FBRTVDLE1BQU0sU0FBVSxTQUFRLDRDQUFFO0lBSTdCLFlBQVksUUFBYSxFQUFFLEVBQU0sRUFBRSxFQUFNO1FBQ3JDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxFQUFFLENBQUMsR0FBVztRQUNWLE9BQU8sa0ZBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQVUsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFXO1FBQ2hCLE9BQU8sSUFBSSxnRUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7O0FDM0JEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBK0I7QUFFOEI7QUFFVjtBQUU1QyxNQUFNLE9BQVEsU0FBUSw0Q0FBRTtJQUkzQixZQUFZLFFBQWEsRUFBRSxFQUFNLEVBQUUsRUFBTTtRQUNyQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsRUFBRSxDQUFDLEdBQVc7UUFDVixPQUFPLGtGQUFNLENBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFXLEVBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFXLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNGLENBQUM7SUFFRCxRQUFRLENBQUMsR0FBVztRQUNoQixPQUFPLElBQUksZ0VBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVELFVBQVU7UUFDTixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7OztBQzNCRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQStCO0FBQ3NDO0FBR2xCO0FBRTVDLE1BQU0sT0FBUSxTQUFRLDRDQUFFO0lBSTNCLFlBQVksUUFBYSxFQUFFLEVBQU0sRUFBRSxFQUFNO1FBQ3JDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxFQUFFLENBQUMsR0FBVztRQUNWLE9BQU8sMEZBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQVUsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0YsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFXO1FBQ2hCLE9BQU8sSUFBSSxnRUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7O0FDM0JEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBK0I7QUFFeUI7QUFFTDtBQUU1QyxNQUFNLE9BQVEsU0FBUSw0Q0FBRTtJQUczQixZQUFZLFFBQWEsRUFBRSxFQUFNLEVBQUUsRUFBTTtRQUNyQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELEVBQUUsQ0FBQyxHQUFXO1FBQ1YsT0FBTyw2RUFBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBVSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQVc7UUFDaEIsT0FBTyxJQUFJLGdFQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxVQUFVO1FBQ04sT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUN6QkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQjtBQUVzQjtBQUNGO0FBRTVDLE1BQU0sUUFBUyxTQUFRLDRDQUFFO0lBQzVCO1FBQ0ksS0FBSyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQsRUFBRSxDQUFDLEdBQVc7UUFDVixPQUFPLElBQUksa0VBQUksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxRQUFRLENBQUMsR0FBVztRQUNoQixPQUFPLElBQUksZ0VBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLGdFQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxVQUFVO1FBQ04sT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUNwQkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUF1RDtBQUN4QjtBQUNvQjtBQUU1QyxNQUFNLFVBQVcsU0FBUSw0Q0FBRTtJQUc5QixZQUFZLFFBQWEsRUFBRSxHQUFXO1FBQ2xDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNuQixDQUFDO0lBRUQsRUFBRSxDQUFDLEdBQVc7UUFDVixPQUFPLElBQUksb0VBQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFXO1FBQ2hCLE9BQU8sSUFBSSxnRUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksZ0VBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7O0FDeEJEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBK0I7QUFFd0I7QUFFSjtBQUU1QyxNQUFNLE1BQU8sU0FBUSw0Q0FBRTtJQUkxQixZQUFZLFFBQWEsRUFBRSxFQUFNLEVBQUUsRUFBTTtRQUNyQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsRUFBRSxDQUFDLEdBQVc7UUFDVixPQUFPLDRFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFVLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFRCxRQUFRLENBQUMsR0FBVztRQUNoQixPQUFPLElBQUksZ0VBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVELFVBQVU7UUFDTixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7OztBQzNCRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQStCO0FBRTJCO0FBRVA7QUFFNUMsTUFBTSxTQUFVLFNBQVEsNENBQUU7SUFHN0IsWUFBWSxRQUFhLEVBQUUsRUFBTTtRQUM3QixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELEVBQUUsQ0FBQyxHQUFXO1FBQ1YsT0FBTywrRUFBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBVSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQVc7UUFDaEIsT0FBTyxJQUFJLGdFQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCxVQUFVO1FBQ04sT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUN6QkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXNEO0FBQ0w7QUFDVTtBQUNSO0FBRTVDLE1BQU0sY0FBZSxTQUFRLHlDQUFFO0lBSWxDLFlBQVksUUFBYSxFQUFFLEVBQU0sRUFBRSxFQUFNO1FBQ3JDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxFQUFFLENBQUMsR0FBVztRQUNWLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTVCLElBQUksQ0FBQyxDQUFDLEVBQUUsWUFBWSxnREFBUyxDQUFDLEVBQUU7WUFDNUIsTUFBTSxJQUFJLDhEQUFpQixDQUFDLHlCQUF5QixFQUFFLHlEQUF5RCxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNwSTtRQUVBLEVBQWdCLENBQUMsbUJBQW1CLENBQ2pDLGdGQUFJLENBQUUsRUFBZ0IsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFXLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUNqRSxDQUFDO1FBQ0YsT0FBUSxFQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxRQUFRLENBQUMsR0FBVztRQUNoQixPQUFPLElBQUksZ0VBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUVELFVBQVU7UUFDTixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7OztBQ3BDRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQjtBQUVjO0FBQ0k7QUFDYztBQUVaO0FBRTVDLE1BQU0sY0FBZSxTQUFRLDRDQUFFO0lBSWxDLFlBQVksUUFBYSxFQUFFLEVBQU0sRUFBRSxFQUFNO1FBQ3JDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxFQUFFLENBQUMsR0FBVztRQUNWLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTVCLElBQUksQ0FBQyxDQUFDLEVBQUUsWUFBWSwwREFBUyxDQUFDLEVBQUU7WUFDNUIsTUFBTSxJQUFJLDhEQUFpQixDQUFDLHlCQUF5QixFQUFFLHlEQUF5RCxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNwSTtRQUVBLEVBQWdCLENBQUMsbUJBQW1CLENBQ2pDLG9GQUFRLENBQUUsRUFBZ0IsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFXLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUNyRSxDQUFDO1FBQ0YsT0FBUSxFQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxRQUFRLENBQUMsR0FBVztRQUNoQixPQUFPLElBQUksZ0VBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUVELFVBQVU7UUFDTixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7OztBQ3ZDRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQjtBQUVjO0FBQ0k7QUFDWTtBQUVWO0FBRTVDLE1BQU0sY0FBZSxTQUFRLDRDQUFFO0lBSWxDLFlBQVksUUFBYSxFQUFFLEVBQU0sRUFBRSxFQUFNO1FBQ3JDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxFQUFFLENBQUMsR0FBVztRQUNWLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTVCLElBQUksQ0FBQyxDQUFDLEVBQUUsWUFBWSwwREFBUyxDQUFDLEVBQUU7WUFDNUIsTUFBTSxJQUFJLDhEQUFpQixDQUFDLHlCQUF5QixFQUFFLHlEQUF5RCxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNwSTtRQUVBLEVBQWdCLENBQUMsbUJBQW1CLENBQ2pDLGtGQUFNLENBQUUsRUFBZ0IsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFXLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUNuRSxDQUFDO1FBQ0YsT0FBUSxFQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxRQUFRLENBQUMsR0FBVztRQUNoQixPQUFPLElBQUksZ0VBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUVELFVBQVU7UUFDTixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FFSjs7Ozs7Ozs7Ozs7OztBQ3hDRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQjtBQUVjO0FBQ0k7QUFDb0I7QUFFbEI7QUFFNUMsTUFBTSxjQUFlLFNBQVEsNENBQUU7SUFJbEMsWUFBWSxRQUFhLEVBQUUsRUFBTSxFQUFFLEVBQU07UUFDckMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELEVBQUUsQ0FBQyxHQUFXO1FBQ1YsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFNUIsSUFBSSxDQUFDLENBQUMsRUFBRSxZQUFZLDBEQUFTLENBQUMsRUFBRTtZQUM1QixNQUFNLElBQUksOERBQWlCLENBQUMseUJBQXlCLEVBQUUseURBQXlELEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3BJO1FBRUEsRUFBZ0IsQ0FBQyxtQkFBbUIsQ0FDakMsMEZBQWMsQ0FBRSxFQUFnQixDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQVcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQzNFLENBQUM7UUFDRixPQUFRLEVBQWdCLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFXO1FBQ2hCLE9BQU8sSUFBSSxnRUFBWSxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RixDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUVKOzs7Ozs7Ozs7Ozs7O0FDeENEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQStCO0FBRWM7QUFDSTtBQUNXO0FBRVQ7QUFFNUMsTUFBTSxjQUFlLFNBQVEsNENBQUU7SUFJbEMsWUFBWSxRQUFhLEVBQUUsRUFBTSxFQUFFLEVBQU07UUFDckMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELEVBQUUsQ0FBQyxHQUFXO1FBQ1YsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFNUIsSUFBSSxDQUFDLENBQUMsRUFBRSxZQUFZLDBEQUFTLENBQUMsRUFBRTtZQUM1QixNQUFNLElBQUksOERBQWlCLENBQUMseUJBQXlCLEVBQUUseURBQXlELEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3BJO1FBRUEsRUFBZ0IsQ0FBQyxtQkFBbUIsQ0FDakMsaUZBQUssQ0FBRSxFQUFnQixDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQVcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQ2xFLENBQUM7UUFDRixPQUFRLEVBQWdCLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFXO1FBQ2hCLE9BQU8sSUFBSSxnRUFBWSxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RixDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUVKOzs7Ozs7Ozs7Ozs7O0FDeENEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBK0I7QUFFMkI7QUFFUDtBQUU1QyxNQUFNLFNBQVUsU0FBUSw0Q0FBRTtJQUc3QixZQUFZLFFBQWEsRUFBRSxFQUFNO1FBQzdCLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsRUFBRSxDQUFDLEdBQVc7UUFDVixPQUFPLCtFQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCxRQUFRLENBQUMsR0FBVztRQUNoQixPQUFPLElBQUksZ0VBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELFVBQVU7UUFDTixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FFSjs7Ozs7Ozs7Ozs7OztBQzFCRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBK0I7QUFFTztBQUVvQjtBQUNQO0FBRTVDLE1BQU0sVUFBVyxTQUFRLDRDQUFFO0lBRzlCLFlBQVksUUFBYSxFQUFFLEtBQVM7UUFDaEMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxFQUFFLENBQUMsR0FBVztRQUNWLElBQUcsSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDcEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEMsT0FBTyxJQUFJLG9EQUFTLENBQUMsS0FBYyxDQUFDLENBQUM7U0FDeEM7UUFDRCxPQUFPLElBQUksb0RBQVMsQ0FBQyxJQUFJLHVFQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxRQUFRLENBQUMsR0FBVztRQUNoQixPQUFPLElBQUksZ0VBQVksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVELFVBQVU7UUFDTixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FFSjs7Ozs7Ozs7Ozs7OztBQy9CRDtBQUFBO0FBQUE7QUFBcUM7QUFFOUIsTUFBTSxTQUFVLFNBQVEsa0RBQUs7SUFHaEMsWUFBWSxPQUFjO1FBQ3RCLEtBQUssRUFBRSxDQUFDO1FBSVosYUFBUSxHQUFHLEdBQVcsRUFBRTtZQUNwQixPQUFPLDhCQUE4QixDQUFDO1FBQzFDLENBQUMsQ0FBQztRQUxFLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQzNCLENBQUM7SUFNTSxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7OztBQ2pCRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQjtBQUVjO0FBQ1c7QUFDUDtBQUNFO0FBRTVDLE1BQU0sbUJBQW9CLFNBQVEsNENBQUU7SUFLdkMsWUFBWSxRQUFhLEVBQUUsU0FBYSxFQUFFLFlBQWdCLEVBQUUsYUFBaUI7UUFDekUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxFQUFFLENBQUMsR0FBVztRQUNWLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLElBQUksR0FBRyxZQUFZLDBEQUFTLEVBQUU7WUFDMUIsR0FBRyxHQUFJLEdBQWlCLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDdkM7UUFFRCxJQUFJLENBQUMsQ0FBQyxHQUFHLFlBQVkscUVBQU8sQ0FBQyxFQUFFO1lBQzNCLE1BQU0sSUFBSSw4REFBaUIsQ0FBQyxzRUFBc0UsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdEg7UUFFRCxJQUFLLEdBQWUsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUM3QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3JDO1FBQ0QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQVc7UUFDaEIsT0FBTyxJQUFJLGdFQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFJLENBQUM7SUFFRCxVQUFVO1FBQ04sT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBRUo7Ozs7Ozs7Ozs7Ozs7QUMzQ0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQjtBQUV3QjtBQUNKO0FBRTVDLE1BQU0sVUFBVyxTQUFRLDRDQUFFO0lBRzlCLFlBQVksUUFBYSxFQUFFLEdBQVc7UUFDbEMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsbUJBQW1CLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFFRCxFQUFFLENBQUMsR0FBVztRQUNWLE9BQU8sSUFBSSxvRUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxRQUFRLENBQUMsR0FBVztRQUNoQixPQUFPLElBQUksZ0VBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLGdFQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RHLENBQUM7SUFFRCxVQUFVO1FBQ04sT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBRUo7Ozs7Ozs7Ozs7Ozs7QUN6QkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQjtBQUU2QjtBQUVUO0FBRTVDLE1BQU0sT0FBUSxTQUFRLDRDQUFFO0lBSTNCLFlBQVksUUFBYSxFQUFFLEVBQU0sRUFBRSxFQUFNO1FBQ3JDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxFQUFFLENBQUMsR0FBVztRQUNWLE9BQU8saUZBQUssQ0FBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQVcsRUFBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQVcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUYsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFXO1FBQ2hCLE9BQU8sSUFBSSxnRUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7O0FDM0JEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBK0I7QUFFNEI7QUFFUjtBQUU1QyxNQUFNLE9BQVEsU0FBUSw0Q0FBRTtJQUkzQixZQUFZLFFBQWEsRUFBRSxFQUFNLEVBQUUsRUFBTTtRQUNyQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsRUFBRSxDQUFDLEdBQVc7UUFDVixPQUFPLGdGQUFJLENBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFXLEVBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFXLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7SUFFRCxRQUFRLENBQUMsR0FBVztRQUNoQixPQUFPLElBQUksZ0VBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVELFVBQVU7UUFDTixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FFSjs7Ozs7Ozs7Ozs7OztBQzVCRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQjtBQUNRO0FBQ3NCO0FBSXpCO0FBQ0U7QUFDSTtBQUVPO0FBQ0U7QUFFNUMsTUFBTSxVQUFXLFNBQVEsNENBQUU7SUFJOUIsWUFBWSxRQUFhLEVBQUUsU0FBYSxFQUFFLEtBQXNCO1FBQzVELEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQsRUFBRSxDQUFDLEdBQVc7UUFDVixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLEdBQUcsR0FBVSxTQUFTLENBQUM7UUFDM0IsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBRXJCLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztRQUNyQixLQUFLLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDekIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxJQUFJLEVBQUU7Z0JBQ25DLFlBQVksRUFBRSxDQUFDO2FBQ2xCO1NBQ0o7UUFFRCxJQUFJLFlBQVksR0FBRyxDQUFDLEVBQUU7WUFDbEIsTUFBTSxJQUFJLDhEQUFpQixDQUFDLDhFQUE4RSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM5SDtRQUVELEtBQUssSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUN6QixJQUFJLEdBQUcsWUFBWSxrREFBUSxFQUFFO2dCQUN6QixNQUFNO2FBQ1Q7WUFDRCxJQUFJLEdBQUcsWUFBWSxvREFBUyxFQUFFO2dCQUMxQixPQUFPLEdBQUcsQ0FBQzthQUNkO1lBQ0QsSUFBSSxHQUFHLFlBQVksd0RBQVcsRUFBRTtnQkFDNUIsU0FBUzthQUNaO1lBRUQsSUFBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxJQUFJLEVBQUU7Z0JBQ2xDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsSUFBSSxDQUFFLGtGQUFLLENBQUMsU0FBa0IsRUFBRSxTQUFrQixFQUFFLElBQUksQ0FBQyxRQUFRLENBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDcEcsU0FBUztpQkFDWjthQUNKO1lBRUQsTUFBTSxJQUFJLEdBQUcsSUFBSSxvREFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztZQUNsRCxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3BCLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFFaEIsSUFBSSxHQUFHLFlBQVksa0RBQVEsRUFBRTtnQkFDekIsTUFBTTthQUNUO1lBQ0QsSUFBSSxHQUFHLFlBQVksb0RBQVMsRUFBRTtnQkFDMUIsT0FBTyxHQUFHLENBQUM7YUFDZDtTQUNKO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFXO1FBQ2hCLE9BQU8sSUFBSSxnRUFBWSxDQUFDLFFBQVEsRUFBRTtZQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7WUFDNUIsSUFBSSxnRUFBWSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUNuRCxJQUFJLGdFQUFZLENBQUMsTUFBTSxFQUFFO2dCQUNyQixLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLGdFQUFZLENBQUMsV0FBVyxDQUFDO2dCQUNuRyxJQUFJLGdFQUFZLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDOUYsQ0FBQyxDQUFDLENBQUM7U0FDWCxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUVKOzs7Ozs7Ozs7Ozs7O0FDdEZEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBK0I7QUFFMkI7QUFDUDtBQUU1QyxNQUFNLGFBQWMsU0FBUSw0Q0FBRTtJQUNqQztRQUNJLEtBQUssRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVELEVBQUUsQ0FBQyxHQUFXO1FBQ1YsT0FBTyxJQUFJLHVFQUFTLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQVc7UUFDaEIsT0FBTyxJQUFJLGdFQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxnRUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUVKOzs7Ozs7Ozs7Ozs7O0FDdEJEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQjtBQUVXO0FBQ1M7QUFDSTtBQUVoRCxNQUFNLFNBQVUsU0FBUSw0Q0FBRTtJQUk3QixZQUFZLFFBQWEsRUFBRSxTQUFhLEVBQUUsU0FBb0I7UUFDMUQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQy9CLENBQUM7SUFFRCxFQUFFLENBQUMsR0FBVztRQUNWLE9BQU8sK0RBQVUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxRQUFRLENBQUMsR0FBVztRQUNoQixPQUFPLElBQUksZ0VBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLGdFQUFZLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdKLENBQUM7SUFFRCxVQUFVO1FBQ04sSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2YsTUFBTSxPQUFPLEdBQUcsb0VBQWMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM1QyxLQUFLLElBQUksb0JBQW9CLE9BQU8sT0FBTyxDQUFDO1FBQzVDLEtBQUssSUFBSSxpQkFBaUI7WUFDdEIsb0JBQW9CO1lBQ3BCLHdCQUF3QixDQUFDO1FBQzdCLEtBQUssSUFBSSxpRUFBaUUsQ0FBQztRQUMzRSxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM5QixLQUFLLElBQUksUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxJQUFJLFlBQVksZ0JBQWdCLE1BQU0sQ0FBQztRQUM1QyxLQUFLLElBQUksS0FBSyxDQUFDO1FBQ2YsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7O0FDdkNEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXNDO0FBQ0k7QUFDNkM7QUFDOUM7QUFFbEMsU0FBUyxJQUFJLENBQUMsRUFBUyxFQUFFLEVBQVMsRUFBRSxXQUFxQixJQUFJLHVEQUFRLEVBQUU7SUFDMUUsRUFBRSxZQUFZLG9EQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBSSxFQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDakUsRUFBRSxZQUFZLG9EQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBSSxFQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFFakUsSUFBSTtRQUNBLE9BQU8sS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUN4QjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1IsTUFBTSxJQUFJLHdEQUFpQixDQUFDLDJCQUEyQixFQUFFLENBQUMsSUFBSSxNQUFNLEVBQUUsQ0FBQyxJQUFJLGtCQUFrQixFQUFFLFFBQVEsQ0FBQztLQUMzRztJQUVELFNBQVMsS0FBSyxDQUFDLEVBQU8sRUFBRSxFQUFPO1FBQzNCLFFBQVEsSUFBSSxFQUFFO1lBQ1YsS0FBSyxFQUFFLFlBQVksOERBQU07Z0JBQ3JCLFFBQVEsSUFBSSxFQUFFO29CQUNWLEtBQUssRUFBRSxZQUFZLDhEQUFNO3dCQUNyQixPQUFPLElBQUksOERBQU0sQ0FBRSxFQUFhLENBQUMsUUFBUSxFQUFFLEdBQUksRUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7b0JBQzdFLEtBQUssRUFBRSxZQUFZLCtEQUFPO3dCQUN0QixPQUFPLElBQUksOERBQU0sQ0FBRSxFQUFhLENBQUMsUUFBUSxFQUFFLEdBQUksRUFBYyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7b0JBQ3BGLEtBQUssRUFBRSxZQUFZLDhEQUFNO3dCQUNyQixPQUFPLElBQUksOERBQU0sQ0FBRSxFQUFhLENBQUMsUUFBUSxFQUFFLEdBQUksRUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7b0JBQzdFO3dCQUNJLE1BQU0sSUFBSSxLQUFLLEVBQUUsQ0FBQztpQkFDekI7WUFDTCxLQUFLLEVBQUUsWUFBWSwrREFBTztnQkFDdEIsUUFBUSxJQUFJLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLFlBQVksOERBQU07d0JBQ3JCLE9BQU8sSUFBSSw4REFBTSxDQUFFLEVBQWMsQ0FBQyxjQUFjLEVBQUUsR0FBSSxFQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDcEYsS0FBSyxFQUFFLFlBQVksK0RBQU87d0JBQ3RCLE9BQU8sSUFBSSw4REFBTSxDQUFFLEVBQWMsQ0FBQyxjQUFjLEVBQUUsR0FBSSxFQUFjLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztvQkFDM0YsS0FBSyxFQUFFLFlBQVksOERBQU07d0JBQ3JCLE9BQU8sSUFBSSw4REFBTSxDQUFFLEVBQWMsQ0FBQyxRQUFRLEVBQUUsR0FBSSxFQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDOUU7d0JBQ0ksTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDO2lCQUN6QjtZQUNMLEtBQUssRUFBRSxZQUFZLDhEQUFNO2dCQUNyQixRQUFRLElBQUksRUFBRTtvQkFDVixLQUFLLEVBQUUsWUFBWSw4REFBTTt3QkFDckIsT0FBTyxJQUFJLDhEQUFNLENBQUUsRUFBYSxDQUFDLFFBQVEsRUFBRSxHQUFJLEVBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO29CQUM3RSxLQUFLLEVBQUUsWUFBWSwrREFBTzt3QkFDdEIsT0FBTyxJQUFJLDhEQUFNLENBQUUsRUFBYSxDQUFDLFFBQVEsRUFBRSxHQUFJLEVBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO29CQUM5RSxLQUFLLEVBQUUsWUFBWSw4REFBTTt3QkFDckIsT0FBTyxJQUFJLDhEQUFNLENBQUUsRUFBYSxDQUFDLFFBQVEsRUFBRSxHQUFJLEVBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO29CQUM3RSxLQUFLLEVBQUUsWUFBWSxpRUFBUzt3QkFDeEIsT0FBTyxJQUFJLDhEQUFNLENBQUUsRUFBYSxDQUFDLFFBQVEsRUFBRSxHQUFJLEVBQWdCLENBQUMsQ0FBQztvQkFDckUsS0FBSyxFQUFFLFlBQVksNERBQUk7d0JBQ25CLE9BQU8sSUFBSSw4REFBTSxDQUFFLEVBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBSSxFQUFXLENBQUMsQ0FBQztvQkFDaEU7d0JBQ0ksTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDO2lCQUN6QjtZQUNMLEtBQUssRUFBRSxZQUFZLGlFQUFTO2dCQUN4QixRQUFRLElBQUksRUFBRTtvQkFDVixLQUFLLEVBQUUsWUFBWSw4REFBTTt3QkFDckIsT0FBTyxJQUFJLDhEQUFNLENBQUUsRUFBZ0IsR0FBSSxFQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDckU7d0JBQ0ksTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDO2lCQUN6QjtZQUNMLEtBQUssRUFBRSxZQUFZLDREQUFJO2dCQUNuQixRQUFRLElBQUksRUFBRTtvQkFDVixLQUFLLEVBQUUsWUFBWSw4REFBTTt3QkFDckIsT0FBTyxJQUFJLDhEQUFNLENBQUUsRUFBVyxHQUFJLEVBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO29CQUNoRTt3QkFDSSxNQUFNLElBQUksS0FBSyxFQUFFLENBQUM7aUJBQ3pCO1lBQ0w7Z0JBQ0ksTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDO1NBQ3pCO0lBQ0wsQ0FBQztBQUNMLENBQUM7QUFFTSxTQUFTLEtBQUssQ0FBQyxFQUFTLEVBQUUsRUFBUyxFQUFFLFdBQXFCLElBQUksdURBQVEsRUFBRTtJQUMzRSxFQUFFLFlBQVksb0RBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFJLEVBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNqRSxFQUFFLFlBQVksb0RBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFJLEVBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUVqRSxJQUFJO1FBQ0EsT0FBTyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ3pCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDUixNQUFNLElBQUksd0RBQWlCLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxJQUFJLE1BQU0sRUFBRSxDQUFDLElBQUksa0JBQWtCLEVBQUUsUUFBUSxDQUFDO0tBQzNHO0lBRUQsU0FBUyxNQUFNLENBQUMsRUFBTyxFQUFFLEVBQU87UUFDNUIsUUFBUSxJQUFJLEVBQUU7WUFDVixLQUFLLEVBQUUsWUFBWSw4REFBTTtnQkFDckIsUUFBUSxJQUFJLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLFlBQVksOERBQU07d0JBQ3JCLE9BQU8sSUFBSSw4REFBTSxDQUFFLEVBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBSSxFQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDN0UsS0FBSyxFQUFFLFlBQVksK0RBQU87d0JBQ3RCLE9BQU8sSUFBSSw4REFBTSxDQUFFLEVBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBSSxFQUFjLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztvQkFDcEY7d0JBQ0ksTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDO2lCQUN6QjtZQUNMLEtBQUssRUFBRSxZQUFZLCtEQUFPO2dCQUN0QixRQUFRLElBQUksRUFBRTtvQkFDVixLQUFLLEVBQUUsWUFBWSw4REFBTTt3QkFDckIsT0FBTyxJQUFJLDhEQUFNLENBQUUsRUFBYyxDQUFDLGNBQWMsRUFBRSxHQUFJLEVBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO29CQUNwRixLQUFLLEVBQUUsWUFBWSwrREFBTzt3QkFDdEIsT0FBTyxJQUFJLDhEQUFNLENBQUUsRUFBYyxDQUFDLGNBQWMsRUFBRSxHQUFJLEVBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO29CQUMzRjt3QkFDSSxNQUFNLElBQUksS0FBSyxFQUFFLENBQUM7aUJBQ3pCO1lBQ0w7Z0JBQ0ksTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDO1NBQ3pCO0lBQ0wsQ0FBQztBQUNMLENBQUM7QUFFTSxTQUFTLGNBQWMsQ0FBQyxFQUFTLEVBQUUsRUFBUyxFQUFFLFdBQXFCLElBQUksdURBQVEsRUFBRTtJQUNwRixFQUFFLFlBQVksb0RBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFJLEVBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNqRSxFQUFFLFlBQVksb0RBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFJLEVBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUVqRSxJQUFJO1FBQ0EsT0FBTyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQzlCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDUixNQUFNLElBQUksd0RBQWlCLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxJQUFJLE1BQU0sRUFBRSxDQUFDLElBQUksa0JBQWtCLEVBQUUsUUFBUSxDQUFDO0tBQzNHO0lBRUQsU0FBUyxXQUFXLENBQUMsRUFBTyxFQUFFLEVBQU87UUFDakMsUUFBUSxJQUFJLEVBQUU7WUFDVixLQUFLLEVBQUUsWUFBWSw4REFBTTtnQkFDckIsUUFBUSxJQUFJLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLFlBQVksOERBQU07d0JBQ3JCLE9BQU8sSUFBSSw4REFBTSxDQUFFLEVBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBSSxFQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDN0UsS0FBSyxFQUFFLFlBQVksK0RBQU87d0JBQ3RCLE9BQU8sSUFBSSw4REFBTSxDQUFFLEVBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBSSxFQUFjLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztvQkFDcEY7d0JBQ0ksTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDO2lCQUN6QjtZQUNMLEtBQUssRUFBRSxZQUFZLCtEQUFPO2dCQUN0QixRQUFRLElBQUksRUFBRTtvQkFDVixLQUFLLEVBQUUsWUFBWSw4REFBTTt3QkFDckIsT0FBTyxJQUFJLDhEQUFNLENBQUUsRUFBYyxDQUFDLGNBQWMsRUFBRSxHQUFJLEVBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO29CQUNwRixLQUFLLEVBQUUsWUFBWSwrREFBTzt3QkFDdEIsT0FBTyxJQUFJLDhEQUFNLENBQUUsRUFBYyxDQUFDLGNBQWMsRUFBRSxHQUFJLEVBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO29CQUMzRjt3QkFDSSxNQUFNLElBQUksS0FBSyxFQUFFLENBQUM7aUJBQ3pCO1lBQ0w7Z0JBQ0ksTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDO1NBQ3pCO0lBQ0wsQ0FBQztBQUNMLENBQUM7QUFFTSxTQUFTLFFBQVEsQ0FBQyxFQUFTLEVBQUUsRUFBUyxFQUFFLFdBQXFCLElBQUksdURBQVEsRUFBRTtJQUM5RSxFQUFFLFlBQVksb0RBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFJLEVBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNqRSxFQUFFLFlBQVksb0RBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFJLEVBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUVqRSxJQUFHLEVBQUUsWUFBWSw4REFBTSxFQUFDO1FBQ3BCLElBQUksRUFBYSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBQztZQUMvQixNQUFNLElBQUksd0RBQWlCLENBQUMsa0RBQWtELEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDN0Y7S0FDSjtTQUFNLElBQUcsRUFBRSxZQUFZLCtEQUFPLEVBQUM7UUFDNUIsSUFBSSxFQUFjLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxFQUFDO1lBQ3RDLE1BQU0sSUFBSSx3REFBaUIsQ0FBQyxrREFBa0QsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUM3RjtLQUNKO0lBQ0QsSUFBSTtRQUNBLE9BQU8sT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUMxQjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1IsTUFBTSxJQUFJLHdEQUFpQixDQUFDLDJCQUEyQixFQUFFLENBQUMsSUFBSSxNQUFNLEVBQUUsQ0FBQyxJQUFJLGtCQUFrQixDQUFDO0tBQ2pHO0lBRUQsU0FBUyxPQUFPLENBQUMsRUFBTyxFQUFFLEVBQU87UUFDN0IsUUFBUSxJQUFJLEVBQUU7WUFDVixLQUFLLEVBQUUsWUFBWSw4REFBTTtnQkFDckIsUUFBUSxJQUFJLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLFlBQVksOERBQU07d0JBQ3JCLE9BQU8sSUFBSSw4REFBTSxDQUFFLEVBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBSSxFQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDN0UsS0FBSyxFQUFFLFlBQVksK0RBQU87d0JBQ3RCLE9BQU8sSUFBSSw4REFBTSxDQUFFLEVBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBSSxFQUFjLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztvQkFDcEY7d0JBQ0ksTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDO2lCQUN6QjtZQUNMLEtBQUssRUFBRSxZQUFZLCtEQUFPO2dCQUN0QixRQUFRLElBQUksRUFBRTtvQkFDVixLQUFLLEVBQUUsWUFBWSw4REFBTTt3QkFDckIsT0FBTyxJQUFJLDhEQUFNLENBQUUsRUFBYyxDQUFDLGNBQWMsRUFBRSxHQUFJLEVBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO29CQUNwRixLQUFLLEVBQUUsWUFBWSwrREFBTzt3QkFDdEIsT0FBTyxJQUFJLDhEQUFNLENBQUUsRUFBYyxDQUFDLGNBQWMsRUFBRSxHQUFJLEVBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO29CQUMzRjt3QkFDSSxNQUFNLElBQUksS0FBSyxFQUFFLENBQUM7aUJBQ3pCO1lBQ0w7Z0JBQ0ksTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDO1NBQ3pCO0lBQ0wsQ0FBQztBQUNMLENBQUM7QUFFTSxTQUFTLE1BQU0sQ0FBQyxFQUFTLEVBQUUsRUFBUyxFQUFFLFdBQXFCLElBQUksdURBQVEsRUFBRTtJQUM1RSxFQUFFLFlBQVksb0RBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFJLEVBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNqRSxFQUFFLFlBQVksb0RBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFJLEVBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUVqRSxJQUFJO1FBQ0EsT0FBTyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ3RCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDUixNQUFNLElBQUksd0RBQWlCLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxJQUFJLE1BQU0sRUFBRSxDQUFDLElBQUksa0JBQWtCLEVBQUUsUUFBUSxDQUFDO0tBQzNHO0lBRUQsU0FBUyxHQUFHLENBQUMsRUFBTyxFQUFFLEVBQU87UUFDekIsUUFBUSxJQUFJLEVBQUU7WUFDVixLQUFLLEVBQUUsWUFBWSw4REFBTTtnQkFDckIsUUFBUSxJQUFJLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLFlBQVksOERBQU07d0JBQ3JCLE9BQU8sSUFBSSw4REFBTSxDQUFFLEVBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBSSxFQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDN0UsS0FBSyxFQUFFLFlBQVksK0RBQU87d0JBQ3RCLE9BQU8sSUFBSSw4REFBTSxDQUFFLEVBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBSSxFQUFjLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztvQkFDcEY7d0JBQ0ksTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDO2lCQUN6QjtZQUNMLEtBQUssRUFBRSxZQUFZLCtEQUFPO2dCQUN0QixRQUFRLElBQUksRUFBRTtvQkFDVixLQUFLLEVBQUUsWUFBWSw4REFBTTt3QkFDckIsT0FBTyxJQUFJLDhEQUFNLENBQUUsRUFBYyxDQUFDLGNBQWMsRUFBRSxHQUFJLEVBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO29CQUNwRixLQUFLLEVBQUUsWUFBWSwrREFBTzt3QkFDdEIsT0FBTyxJQUFJLDhEQUFNLENBQUUsRUFBYyxDQUFDLGNBQWMsRUFBRSxHQUFJLEVBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO29CQUMzRjt3QkFDSSxNQUFNLElBQUksS0FBSyxFQUFFLENBQUM7aUJBQ3pCO1lBQ0w7Z0JBQ0ksTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDO1NBQ3pCO0lBQ0wsQ0FBQztBQUNMLENBQUM7QUFFTSxTQUFTLFFBQVEsQ0FBQyxFQUFTLEVBQUUsRUFBUyxFQUFFLFdBQXFCLElBQUksdURBQVEsRUFBRTtJQUM5RSxFQUFFLFlBQVksb0RBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFJLEVBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNqRSxFQUFFLFlBQVksb0RBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFJLEVBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUVqRSxJQUFJO1FBQ0EsT0FBTyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ3RCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDUixNQUFNLElBQUksd0RBQWlCLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxJQUFJLE9BQU8sRUFBRSxDQUFDLElBQUksa0JBQWtCLEVBQUUsUUFBUSxDQUFDO0tBQzVHO0lBRUQsU0FBUyxHQUFHLENBQUMsRUFBTyxFQUFFLEVBQU87UUFDekIsUUFBUSxJQUFJLEVBQUU7WUFDVixLQUFLLEVBQUUsWUFBWSw4REFBTTtnQkFDckIsUUFBUSxJQUFJLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLFlBQVksOERBQU07d0JBQ3JCLE9BQU8sSUFBSSw4REFBTSxDQUFDLFNBQUMsRUFBYSxDQUFDLFFBQVEsRUFBRSxFQUFLLEVBQWEsQ0FBQyxRQUFRLEVBQUUsRUFBQyxDQUFDO29CQUM5RSxLQUFLLEVBQUUsWUFBWSwrREFBTzt3QkFDdEIsT0FBTyxJQUFJLDhEQUFNLENBQUMsU0FBQyxFQUFhLENBQUMsUUFBUSxFQUFFLEVBQU0sRUFBYyxDQUFDLGNBQWMsRUFBRSxFQUFDLENBQUM7b0JBQ3RGO3dCQUNJLE1BQU0sSUFBSSxLQUFLLEVBQUUsQ0FBQztpQkFDekI7WUFDTCxLQUFLLEVBQUUsWUFBWSwrREFBTztnQkFDdEIsUUFBUSxJQUFJLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLFlBQVksOERBQU07d0JBQ3JCLE9BQU8sSUFBSSw4REFBTSxDQUFDLFNBQUMsRUFBYyxDQUFDLGNBQWMsRUFBRSxFQUFLLEVBQWEsQ0FBQyxRQUFRLEVBQUUsRUFBQyxDQUFDO29CQUNyRixLQUFLLEVBQUUsWUFBWSwrREFBTzt3QkFDdEIsT0FBTyxJQUFJLDhEQUFNLENBQUMsU0FBQyxFQUFjLENBQUMsY0FBYyxFQUFFLEVBQUssRUFBYyxDQUFDLGNBQWMsRUFBRSxFQUFDLENBQUM7b0JBQzVGO3dCQUNJLE1BQU0sSUFBSSxLQUFLLEVBQUUsQ0FBQztpQkFDekI7WUFDTDtnQkFDSSxNQUFNLElBQUksS0FBSyxFQUFFLENBQUM7U0FDekI7SUFDTCxDQUFDO0FBQ0wsQ0FBQztBQUVNLFNBQVMsR0FBRyxDQUFDLEVBQVMsRUFBRSxXQUFxQixJQUFJLHVEQUFRLEVBQUU7SUFDOUQsSUFBSSxDQUFDLENBQUMsRUFBRSxZQUFZLG9EQUFTLENBQUMsRUFBRTtRQUM1QixNQUFNLElBQUksd0RBQWlCLENBQUMsd0RBQXdELEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDbkc7SUFFRCxNQUFNLEdBQUcsR0FBSSxFQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3pDLElBQUksR0FBRyxZQUFZLDhEQUFNLEVBQUU7UUFDdEIsRUFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSw4REFBTSxDQUFFLEdBQWMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLE9BQU8sR0FBYSxDQUFDO0tBQ3hCO0lBRUQsTUFBTSxJQUFJLHdEQUFpQixDQUFDLGlGQUFpRixFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzdILENBQUM7QUFFTSxTQUFTLEdBQUcsQ0FBQyxFQUFTLEVBQUUsV0FBcUIsSUFBSSx1REFBUSxFQUFFO0lBQzlELElBQUksQ0FBQyxDQUFDLEVBQUUsWUFBWSxvREFBUyxDQUFDLEVBQUU7UUFDNUIsTUFBTSxJQUFJLHdEQUFpQixDQUFDLHdEQUF3RCxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQ25HO0lBRUQsTUFBTSxHQUFHLEdBQUksRUFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN6QyxJQUFJLEdBQUcsWUFBWSw4REFBTSxFQUFFO1FBQ3RCLEVBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksOERBQU0sQ0FBRSxHQUFjLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RSxPQUFPLEdBQWEsQ0FBQztLQUN4QjtJQUVELE1BQU0sSUFBSSx3REFBaUIsQ0FBQyxpRkFBaUYsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUM3SCxDQUFDOzs7Ozs7Ozs7Ozs7O0FDbFNEO0FBQUE7QUFBQTtBQUFBO0FBQXNDO0FBRVU7QUFLekMsTUFBZSxLQUFLO0lBS3ZCLFlBQXNCLEtBQWE7UUFIbkIsVUFBSyxHQUFHLElBQUksR0FBRyxFQUFpQixDQUFDO1FBSTdDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxJQUFJLElBQUksQ0FBQztJQUMvQixDQUFDO0lBRU0sYUFBYTtRQUNoQixJQUFJLEdBQUcsR0FBRyxvQ0FBb0MsQ0FBQztRQUMvQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN4QixHQUFHLElBQUksQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsR0FBRyxJQUFJLG9DQUFvQyxDQUFDO1FBQzVDLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVNLFdBQVcsQ0FBQyxFQUFVLEVBQUUsS0FBWTtRQUN2Qyx3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFTSxXQUFXLENBQUMsRUFBVTtRQUMxQix5QkFBeUI7UUFDeEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0IsSUFBSSxHQUFHLEtBQUssSUFBSSxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7WUFDbkMsT0FBTyxHQUFHLENBQUM7U0FDZDtRQUVELHNDQUFzQztRQUN0Qyw0QkFBNEI7UUFDNUIsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVNLFVBQVUsQ0FBQyxRQUFnQixFQUFFO1FBQ2hDLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNmLE1BQU0sT0FBTyxHQUFHLDhEQUFjLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDNUMsS0FBSyxJQUFJLG9CQUFvQixPQUFPLE9BQU8sQ0FBQztRQUM1QyxLQUFLLElBQUksaUJBQWlCO1lBQ2pCLGdCQUFnQjtZQUNoQix1QkFBdUIsQ0FBQztRQUNqQyxLQUFLLElBQUksZ0RBQWdELENBQUM7UUFDMUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEIsS0FBSyxJQUFJLElBQUksOERBQWMsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLE1BQU07UUFDOUQsQ0FBQyxDQUFDLENBQUM7UUFDSCxLQUFLLElBQUksWUFBWSxLQUFLLE1BQU0sQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN4QixJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDWCxJQUFJLEVBQUUsWUFBWSxvREFBUyxFQUFFO2dCQUN6QixFQUFFLEdBQUksRUFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNyQztZQUNELEtBQUssSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxJQUFJLEtBQUs7UUFDZCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRU0sT0FBTyxDQUFDLEVBQVUsRUFBRSxLQUFZO1FBQ25DLHdCQUF3QjtRQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVNLE9BQU87UUFDVixPQUFPLElBQUksQ0FBQyxJQUFJO0lBQ3BCLENBQUM7SUFFTSxPQUFPLENBQUMsSUFBWTtRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRU0sUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUNqRkQ7QUFBQTtBQUFPLE1BQU0sT0FBTzs7QUFDRixXQUFHLEdBQVcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDRG5DO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQThCO0FBRWE7QUFDRTtBQUNJO0FBQ007QUFDb0I7QUFDL0I7QUFDYztBQUVuRCxNQUFNLE1BQU8sU0FBUSw0Q0FBSztJQUk3QixZQUFZLEtBQVksRUFBRSxVQUFxQjtRQUMzQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFKRCxVQUFLLEdBQUcsSUFBSSxHQUFHLEVBQWUsQ0FBQztRQUszQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxJQUFJLHdFQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFTSxNQUFNO1FBQ1QsS0FBSyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQzVCLElBQUksRUFBRSxZQUFZLG9FQUFjLElBQUksRUFBRSxZQUFZLHdGQUF3QixFQUFFO2dCQUN4RSxJQUFJO29CQUNBLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2hCO2dCQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztpQkFDekI7YUFDSjtTQUNKO1FBQ0QsS0FBSyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQzVCLElBQUksQ0FBQyxDQUFDLEVBQUUsWUFBWSxvRUFBYyxJQUFJLEVBQUUsWUFBWSx3RkFBd0IsQ0FBQyxFQUFFO2dCQUMzRSxJQUFJO29CQUNBLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzFCLElBQUksTUFBTSxZQUFZLHdEQUFRLElBQUksTUFBTSxZQUFZLDBEQUFTLElBQUksTUFBTSxZQUFZLDhEQUFXLEVBQUU7d0JBQzVGLE9BQU8sTUFBZSxDQUFDO3FCQUMxQjtpQkFDSjtnQkFBQyxPQUFPLENBQUMsRUFBRTtvQkFDUixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7aUJBQ3pCO2FBQ0o7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxRQUFRO1FBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQixPQUFPLElBQUksMERBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRyxDQUFDO0lBRU0sWUFBWTtRQUNmLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7QUN0REQ7QUFBQTtBQUFBO0FBQUE7QUFBTyxNQUFNLGFBQWE7SUFHZixNQUFNLENBQUMsZUFBZTtRQUN6QixhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksS0FBSyxFQUFTLENBQUM7SUFDOUMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxTQUFTO1FBQ25CLE9BQU8sYUFBYSxDQUFDLE1BQU0sQ0FBQztJQUNoQyxDQUFDO0lBRU0sTUFBTSxDQUFDLFFBQVEsQ0FDbEIsR0FBVyxFQUNYLE1BQWMsRUFDZCxRQUFnQixFQUNoQixRQUFnQixFQUNoQixJQUFZO1FBRVosSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQ3RCLEdBQUcsRUFDSCxNQUFNLEVBQ04sUUFBUSxFQUNSLFFBQVEsRUFDUixJQUFJLENBQ1AsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7QUF4QmMsb0JBQU0sR0FBaUIsSUFBSSxLQUFLLEVBQVMsQ0FBQztBQTJCdEQsTUFBTSxLQUFLO0lBT2QsWUFDSSxHQUFXLEVBQ1gsTUFBYyxFQUNkLFFBQWdCLEVBQ2hCLFFBQWdCLEVBQ2hCLElBQVk7UUFFWixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7Q0FDSjtBQUVNLE1BQU0sUUFBUTtJQU1qQjtRQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDeEIsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7O0FDOUREO0FBQUE7QUFBQTtBQUE0QztBQUVyQyxNQUFNLFlBQVk7SUFLckIsWUFBWSxLQUFhLEVBQUUsU0FBeUIsRUFBRTtRQU10RCxVQUFLLEdBQUcsR0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUU5QixhQUFRLEdBQUcsR0FBVyxFQUFFO1lBQ3BCLElBQUksS0FBSyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsWUFBWSxJQUFJLENBQUMsS0FBSyxPQUFPLENBQUM7WUFDcEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3hCLEtBQUssSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7WUFDakQsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDeEIsS0FBSyxJQUFJLEtBQUssQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUMsQ0FBQztRQWhCRSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksMERBQVksQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDO0lBQzdDLENBQUM7Q0FjSjs7Ozs7Ozs7Ozs7OztBQ3hCRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXNDO0FBQ0k7QUFDNkM7QUFDOUM7QUFFbEMsU0FBUyxFQUFFLENBQUMsRUFBUyxFQUFFLEVBQVMsRUFBRSxXQUFxQixJQUFJLHVEQUFRLEVBQUU7SUFDeEUsRUFBRSxZQUFZLG9EQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBSSxFQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDakUsRUFBRSxZQUFZLG9EQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBSSxFQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFFakUsSUFBSTtRQUNBLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUNyQjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1IsTUFBTSxJQUFJLHdEQUFpQixDQUFDLDJCQUEyQixFQUFFLENBQUMsSUFBSSxPQUFPLEVBQUUsQ0FBQyxJQUFJLGtCQUFrQixFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQzdHO0lBRUQsU0FBUyxFQUFFLENBQUMsRUFBTyxFQUFFLEVBQU87UUFDeEIsUUFBUSxJQUFJLEVBQUU7WUFDVixLQUFLLEVBQUUsWUFBWSwrREFBTztnQkFDdEIsUUFBUSxJQUFJLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLFlBQVksK0RBQU87d0JBQ3RCLE9BQU8sSUFBSSwrREFBTyxDQUFFLEVBQWMsQ0FBQyxRQUFRLEVBQUUsSUFBSyxFQUFjLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDakY7d0JBQ0ksTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDO2lCQUN6QjtZQUNMO2dCQUNJLE1BQU0sSUFBSSxLQUFLLEVBQUUsQ0FBQztTQUN6QjtJQUNMLENBQUM7QUFDTCxDQUFDO0FBRU0sU0FBUyxHQUFHLENBQUMsRUFBUyxFQUFFLEVBQVMsRUFBRSxXQUFxQixJQUFJLHVEQUFRLEVBQUU7SUFDekUsRUFBRSxZQUFZLG9EQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBSSxFQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDakUsRUFBRSxZQUFZLG9EQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBSSxFQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFFakUsSUFBSTtRQUNBLE9BQU8sR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUN0QjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1IsTUFBTSxJQUFJLHdEQUFpQixDQUFDLDJCQUEyQixFQUFFLENBQUMsSUFBSSxPQUFPLEVBQUUsQ0FBQyxJQUFJLGtCQUFrQixFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQzdHO0lBRUQsU0FBUyxHQUFHLENBQUMsRUFBTyxFQUFFLEVBQU87UUFDekIsUUFBUSxJQUFJLEVBQUU7WUFDVixLQUFLLEVBQUUsWUFBWSwrREFBTztnQkFDdEIsUUFBUSxJQUFJLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLFlBQVksK0RBQU87d0JBQ3RCLE9BQU8sSUFBSSwrREFBTyxDQUFFLEVBQWMsQ0FBQyxRQUFRLEVBQUUsSUFBSyxFQUFjLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDakY7d0JBQ0ksTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDO2lCQUN6QjtZQUNMO2dCQUNJLE1BQU0sSUFBSSxLQUFLLEVBQUUsQ0FBQztTQUN6QjtJQUNMLENBQUM7QUFDTCxDQUFDO0FBRU0sU0FBUyxHQUFHLENBQUMsRUFBUyxFQUFFLFdBQXFCLElBQUksdURBQVEsRUFBRTtJQUM5RCxFQUFFLFlBQVksb0RBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFJLEVBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUVqRSxJQUFJO1FBQ0EsT0FBTyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDbEI7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNSLE1BQU0sSUFBSSx3REFBaUIsQ0FBQyw2QkFBNkIsRUFBRSxDQUFDLElBQUksa0JBQWtCLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDakc7SUFFRCxTQUFTLEdBQUcsQ0FBQyxFQUFPO1FBQ2hCLFFBQVEsSUFBSSxFQUFFO1lBQ1YsS0FBSyxFQUFFLFlBQVksK0RBQU87Z0JBQ3RCLE9BQU8sSUFBSSwrREFBTyxDQUFDLENBQUUsRUFBYyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDcEQ7Z0JBQ0ksTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDO1NBQ3pCO0lBQ0wsQ0FBQztBQUNMLENBQUM7Ozs7Ozs7Ozs7Ozs7QUN6RUQ7QUFBQTtBQUFPLE1BQU0sWUFBWTtJQUlkLE1BQU0sQ0FBQyxlQUFlO1FBQ3pCLFlBQVksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7O0FBTGMsd0JBQVcsR0FBRyxDQUFDLENBQUM7QUFDakIsc0JBQVMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNEL0Q7QUFBQTtBQUFBO0FBQUE7QUFBbUM7QUFFTTtBQUVsQyxNQUFlLEVBQUU7SUFVcEIsWUFBWSxXQUFxQixJQUFJLHVEQUFRLEVBQUU7UUFDM0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQVhNLEdBQUcsQ0FBQyxHQUFXO1FBQ2xCLElBQUc7WUFDQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdkI7UUFBQSxPQUFPLENBQUMsRUFBRTtZQUNQLE1BQU0sSUFBSSxpREFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNuQztJQUNMLENBQUM7Q0FZSjs7Ozs7Ozs7Ozs7OztBQ3hCRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQThCO0FBQ1E7QUFDVTtBQUNKO0FBQ0Y7QUFFbkMsTUFBTSxPQUFRLFNBQVEsNENBQUs7SUFHOUIsWUFBWSxLQUFlO1FBQ3ZCLEtBQUssRUFBRSxDQUFDO1FBS0wsYUFBUSxHQUFHLEdBQVcsRUFBRTtZQUMzQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ3pDLENBQUMsQ0FBQztRQUVLLG1CQUFjLEdBQUcsR0FBVyxFQUFFO1lBQ2pDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUVNLGFBQVEsR0FBRyxHQUFZLEVBQUU7WUFDNUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUMsQ0FBQztRQWRFLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO0lBQzFCLENBQUM7Q0FhSjtBQUVNLE1BQU0sTUFBTyxTQUFRLDRDQUFLO0lBRzdCLFlBQVksS0FBYztRQUN0QixLQUFLLEVBQUUsQ0FBQztRQUtMLGFBQVEsR0FBRyxHQUFXLEVBQUU7WUFDM0IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUMsQ0FBQztRQUVLLGFBQVEsR0FBRyxHQUFXLEVBQUU7WUFDM0IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUMsQ0FBQztRQVZFLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztJQUN6QixDQUFDO0NBU0o7QUFFTSxNQUFNLE1BQU8sU0FBUSw0Q0FBSztJQUc3QixZQUFZLEtBQWM7UUFDdEIsS0FBSyxFQUFFLENBQUM7UUFLTCxhQUFRLEdBQUcsR0FBVyxFQUFFO1lBQzNCLE9BQU8sSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDM0IsQ0FBQyxDQUFDO1FBRUssYUFBUSxHQUFHLEdBQVcsRUFBRTtZQUMzQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQyxDQUFDO1FBVkUsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO0lBQ3pCLENBQUM7Q0FTSjtBQUVNLE1BQU0sU0FBVSxTQUFRLDRDQUFLO0lBQ2hDO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFJTCxhQUFRLEdBQUcsR0FBVyxFQUFFO1lBQzNCLE9BQU8sV0FBVyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQztRQUxFLElBQUksQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO0lBQzVCLENBQUM7Q0FLSjtBQUVNLE1BQU0sR0FBSSxTQUFRLDRDQUFLO0lBQzFCO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFJTCxhQUFRLEdBQUcsR0FBVyxFQUFFO1lBQzNCLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFMRyxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDO0NBS0o7QUFFTSxNQUFNLElBQUssU0FBUSw0Q0FBSztJQUMzQjtRQUNJLEtBQUssRUFBRSxDQUFDO1FBSUwsYUFBUSxHQUFHLEdBQVcsRUFBRTtZQUMzQixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUM7UUFFSyxhQUFRLEdBQUcsR0FBVyxFQUFFO1lBQzNCLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUMsQ0FBQztRQVRFLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7Q0FTSjtBQUVNLE1BQU0sS0FBTSxTQUFRLDRDQUFLO0lBSTVCLFlBQVksS0FBb0IsRUFBRSxjQUFzQixLQUFLO1FBQ3pELEtBQUssRUFBRSxDQUFDO1FBYUwsYUFBUSxHQUFHLEdBQVcsRUFBRTtZQUMzQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUMvQixJQUFJLEdBQUcsR0FBRyxVQUFVLElBQUksS0FBSyxDQUFDO1lBQzlCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzNCLEdBQUcsSUFBSSxHQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFlLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQztnQkFDcEQsSUFBSSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDaEIsR0FBRyxJQUFJLElBQUksQ0FBQztpQkFDZjthQUNKO1lBQ0QsR0FBRyxJQUFJLEdBQUcsQ0FBQztZQUNYLE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FBQyxDQUFDO1FBRUssYUFBUSxHQUFHLENBQUMsS0FBYSxFQUFVLEVBQUU7WUFDeEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1QixJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7Z0JBQ25CLE9BQU8sR0FBRyxDQUFDO2FBQ2Q7WUFDRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUM3QixPQUFPLElBQUksSUFBSSxLQUFLLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksb0RBQVMsRUFBRSxDQUFDLENBQUM7Z0JBQ2pDLElBQUksRUFBRSxDQUFDO2FBQ1Y7WUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDO1FBTUssaUJBQVksR0FBRyxHQUFpQixFQUFFO1lBQ3JDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDLENBQUM7UUE1Q0UsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLElBQUksSUFBSSxLQUFLLEVBQVMsQ0FBQztRQUN6QyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztRQUNwQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFHO1lBQ0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSw4REFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSwwREFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSx3REFBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDdEM7UUFBQSxPQUFPLENBQUMsRUFBRTtZQUNQLE1BQU0sSUFBSSxLQUFLLEVBQUUsQ0FBQztTQUNyQjtJQUNMLENBQUM7SUE0Qk0sUUFBUSxDQUFDLEtBQVk7UUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztDQUtKO0FBRU0sTUFBTSxNQUFPLFNBQVEsNENBQUs7SUFHN0IsWUFBWSxVQUErQjtRQUN2QyxLQUFLLEVBQUUsQ0FBQztRQWNMLGFBQVEsR0FBRyxHQUFXLEVBQUU7WUFDM0IsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ2QsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3hCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDZCxJQUFJLEtBQUssWUFBWSxvREFBUyxFQUFFO29CQUM1QixLQUFLLEdBQUksS0FBbUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDM0M7Z0JBQ0QsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUMzQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtvQkFDekIsR0FBRyxJQUFJLElBQUksQ0FBQztpQkFDZjtnQkFDRCxLQUFLLEVBQUUsQ0FBQztZQUNaLENBQUMsQ0FBQyxDQUFDO1lBQ0gsR0FBRyxJQUFJLEdBQUcsQ0FBQztZQUNYLE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FBQyxDQUFDO1FBN0JFLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxJQUFJLElBQUksR0FBRyxFQUFpQixDQUFDO1FBQ3pELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzdCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNkLElBQUksS0FBSyxZQUFZLG9EQUFTLEVBQUU7Z0JBQzVCLEtBQUssR0FBSSxLQUFtQixDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQzNDO1lBQ0QsTUFBTSxTQUFTLEdBQUcsSUFBSSxvREFBUyxFQUFFLENBQUM7WUFDbEMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7SUFDekIsQ0FBQztDQW1CSjs7Ozs7Ozs7Ozs7OztBQzdMRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQThCO0FBQzJDO0FBQ3RCO0FBRTVDLE1BQU0sU0FBVSxTQUFRLDRDQUFLO0lBS2hDLFlBQVksYUFBcUIsS0FBSyxFQUFFLFVBQW1CLEtBQUs7UUFDNUQsS0FBSyxFQUFFLENBQUM7UUFKSixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLGVBQVUsR0FBVyxLQUFLLENBQUM7UUFVNUIsc0JBQWlCLEdBQUcsR0FBWSxFQUFFO1lBQ3JDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN6QyxDQUFDLENBQUM7UUFFSyxhQUFRLEdBQUcsR0FBVyxFQUFFO1lBQzNCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNqQyxDQUFDLENBQUM7UUE0QkssYUFBUSxHQUFHLEdBQVUsRUFBRTtZQUMxQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQyxDQUFDO1FBRUssYUFBUSxHQUFHLENBQUMsS0FBWSxFQUFRLEVBQUU7WUFDckMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDdkIsQ0FBQyxDQUFDO1FBRUssU0FBSSxHQUFHLENBQUMsSUFBa0IsRUFBVSxFQUFFO1lBQ3pDLEtBQUssSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO2dCQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3BCO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFDO1FBckRFLElBQUksQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsMkRBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBVU0sbUJBQW1CLENBQUMsS0FBWTtRQUNuQyxJQUFHLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLFlBQVksaUVBQVMsQ0FBQyxFQUFDO1lBQ2xELE1BQU0sSUFBSSx3REFBaUIsQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1NBQ2hGO1FBRUQsSUFBSSxDQUFRLENBQUM7UUFDYixJQUFJLEtBQUssWUFBWSxTQUFTLEVBQUU7WUFDNUIsQ0FBQyxHQUFJLEtBQW1CLENBQUMsS0FBSyxDQUFDO1NBQ2xDO2FBQU07WUFDSCxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQ2I7UUFDRCxJQUFJLENBQUMsS0FBSyxTQUFTLEVBQUU7WUFDakIsQ0FBQyxHQUFHLElBQUksaUVBQVMsRUFBRSxDQUFDO1NBQ3ZCO1FBQ0QsSUFBRyxJQUFJLENBQUMsVUFBVSxLQUFLLENBQUMsQ0FBQyxJQUFJO2VBQ3RCLElBQUksQ0FBQyxVQUFVLEtBQUssS0FBSztlQUN6QixDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU07ZUFDakIsQ0FBQyxDQUFDLElBQUksS0FBSyxXQUFXO2VBQ3RCLENBQUMsQ0FBQyxJQUFJLEtBQUssUUFBUTtlQUNuQixDQUFDLDhEQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLEVBQzNGO1lBQ0csTUFBTSxJQUFJLHdEQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksNkNBQTZDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1NBQzdHO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQztDQWdCSjs7Ozs7Ozs7Ozs7OztBQ2hFRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXNDO0FBQ0k7QUFDNEQ7QUFDN0Q7QUFFbEMsU0FBUyxLQUFLLENBQUMsRUFBUyxFQUFFLEVBQVMsRUFBRSxXQUFxQixJQUFJLHVEQUFRLEVBQUU7SUFDM0UsRUFBRSxZQUFZLG9EQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBSSxFQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDakUsRUFBRSxZQUFZLG9EQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBSSxFQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFFakUsSUFBSTtRQUNBLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUNyQjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1IsTUFBTSxJQUFJLHdEQUFpQixDQUFDLDJCQUEyQixFQUFFLENBQUMsSUFBSSxPQUFPLEVBQUUsQ0FBQyxJQUFJLGtCQUFrQixFQUFFLFFBQVEsQ0FBQztLQUM1RztJQUVELFNBQVMsRUFBRSxDQUFDLEVBQU8sRUFBRSxFQUFPO1FBQ3hCLFFBQVEsSUFBSSxFQUFFO1lBQ1YsS0FBSyxFQUFFLFlBQVksOERBQU07Z0JBQ3JCLFFBQVEsSUFBSSxFQUFFO29CQUNWLEtBQUssRUFBRSxZQUFZLDhEQUFNO3dCQUNyQixPQUFPLElBQUksK0RBQU8sQ0FBRSxFQUFhLENBQUMsUUFBUSxFQUFFLEtBQU0sRUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7b0JBQ2hGLEtBQUssRUFBRSxZQUFZLCtEQUFPO3dCQUN0QixPQUFPLElBQUksK0RBQU8sQ0FBRSxFQUFhLENBQUMsUUFBUSxFQUFFLEtBQU0sRUFBYyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7b0JBQ3ZGLEtBQUssRUFBRSxZQUFZLDREQUFJO3dCQUNuQixPQUFPLElBQUksK0RBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDOUIsS0FBSyxFQUFFLFlBQVksaUVBQVM7d0JBQ3hCLE9BQU8sSUFBSSwrREFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUM5QixLQUFLLEVBQUUsWUFBWSwyREFBRzt3QkFDbEIsT0FBTyxJQUFJLCtEQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzlCO3dCQUNJLE1BQU0sSUFBSSxLQUFLLEVBQUUsQ0FBQztpQkFDekI7WUFDTCxLQUFLLEVBQUUsWUFBWSwrREFBTztnQkFDdEIsUUFBUSxJQUFJLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLFlBQVksOERBQU07d0JBQ3JCLE9BQU8sSUFBSSwrREFBTyxDQUFFLEVBQWMsQ0FBQyxjQUFjLEVBQUUsSUFBSyxFQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDdEYsS0FBSyxFQUFFLFlBQVksK0RBQU87d0JBQ3RCLE9BQU8sSUFBSSwrREFBTyxDQUFFLEVBQWMsQ0FBQyxjQUFjLEVBQUUsSUFBSyxFQUFjLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztvQkFDN0YsS0FBSyxFQUFFLFlBQVksNERBQUk7d0JBQ25CLE9BQU8sSUFBSSwrREFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUM5QixLQUFLLEVBQUUsWUFBWSxpRUFBUzt3QkFDeEIsT0FBTyxJQUFJLCtEQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzlCLEtBQUssRUFBRSxZQUFZLDJEQUFHO3dCQUNsQixPQUFPLElBQUksK0RBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDOUI7d0JBQ0ksTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDO2lCQUN6QjtZQUNMLEtBQUssRUFBRSxZQUFZLDhEQUFNO2dCQUNyQixRQUFRLElBQUksRUFBRTtvQkFDVixLQUFLLEVBQUUsWUFBWSw4REFBTTt3QkFDckIsT0FBTyxJQUFJLCtEQUFPLENBQUUsRUFBYSxDQUFDLFFBQVEsRUFBRSxLQUFNLEVBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO29CQUNoRixLQUFLLEVBQUUsWUFBWSw0REFBSTt3QkFDbkIsT0FBTyxJQUFJLCtEQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzlCLEtBQUssRUFBRSxZQUFZLGlFQUFTO3dCQUN4QixPQUFPLElBQUksK0RBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDOUIsS0FBSyxFQUFFLFlBQVksMkRBQUc7d0JBQ2xCLE9BQU8sSUFBSSwrREFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUM5Qjt3QkFDSSxNQUFNLElBQUksS0FBSyxFQUFFLENBQUM7aUJBQ3pCO1lBQ0wsS0FBSyxFQUFFLFlBQVksaUVBQVM7Z0JBQ3hCLFFBQVEsSUFBSSxFQUFFO29CQUNWLEtBQUssRUFBRSxZQUFZLGlFQUFTO3dCQUN4QixPQUFPLElBQUksK0RBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDN0I7d0JBQ0ksT0FBTyxJQUFJLCtEQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2pDO1lBQ0wsS0FBSyxFQUFFLFlBQVksNERBQUk7Z0JBQ25CLFFBQVEsSUFBSSxFQUFFO29CQUNWLEtBQUssRUFBRSxZQUFZLDREQUFJO3dCQUNuQixPQUFPLElBQUksK0RBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDN0I7d0JBQ0ksT0FBTyxJQUFJLCtEQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2pDO1lBQ0wsS0FBSyxFQUFFLFlBQVksMkRBQUc7Z0JBQ2xCLFFBQVEsSUFBSSxFQUFFO29CQUNWLEtBQUssRUFBRSxZQUFZLDJEQUFHO3dCQUNsQixPQUFPLElBQUksK0RBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDN0I7d0JBQ0ksT0FBTyxJQUFJLCtEQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2pDO1lBQ0wsS0FBSyxFQUFFLFlBQVksOERBQU07Z0JBQ3JCLE9BQU8sSUFBSSwrREFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlCLEtBQUssRUFBRSxZQUFZLDZEQUFLO2dCQUNwQixPQUFPLElBQUksK0RBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNoQztJQUNMLENBQUM7QUFDTCxDQUFDO0FBRU0sU0FBUyxTQUFTLENBQUMsRUFBUyxFQUFFLEVBQVMsRUFBRSxXQUFxQixJQUFJLHVEQUFRLEVBQUU7SUFDL0UsRUFBRSxZQUFZLG9EQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBSSxFQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDakUsRUFBRSxZQUFZLG9EQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBSSxFQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFFakUsSUFBSTtRQUNBLE9BQU8sR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUN0QjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1IsTUFBTSxJQUFJLHdEQUFpQixDQUFDLDJCQUEyQixFQUFFLENBQUMsSUFBSSxPQUFPLEVBQUUsQ0FBQyxJQUFJLGtCQUFrQixFQUFFLFFBQVEsQ0FBQztLQUM1RztJQUVELFNBQVMsR0FBRyxDQUFDLEVBQU8sRUFBRSxFQUFPO1FBQ3pCLFFBQVEsSUFBSSxFQUFFO1lBQ1YsS0FBSyxFQUFFLFlBQVksOERBQU07Z0JBQ3JCLFFBQVEsSUFBSSxFQUFFO29CQUNWLEtBQUssRUFBRSxZQUFZLDhEQUFNO3dCQUNyQixPQUFPLElBQUksK0RBQU8sQ0FBRSxFQUFhLENBQUMsUUFBUSxFQUFFLEtBQU0sRUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7b0JBQ2hGLEtBQUssRUFBRSxZQUFZLCtEQUFPO3dCQUN0QixPQUFPLElBQUksK0RBQU8sQ0FBRSxFQUFhLENBQUMsUUFBUSxFQUFFLEtBQU0sRUFBYyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7b0JBQ3ZGLEtBQUssRUFBRSxZQUFZLDREQUFJO3dCQUNuQixPQUFPLElBQUksK0RBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDN0IsS0FBSyxFQUFFLFlBQVksaUVBQVM7d0JBQ3hCLE9BQU8sSUFBSSwrREFBTyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM3QixLQUFLLEVBQUUsWUFBWSwyREFBRzt3QkFDbEIsT0FBTyxJQUFJLCtEQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzdCO3dCQUNJLE1BQU0sSUFBSSxLQUFLLEVBQUUsQ0FBQztpQkFDekI7WUFDTCxLQUFLLEVBQUUsWUFBWSwrREFBTztnQkFDdEIsUUFBUSxJQUFJLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLFlBQVksOERBQU07d0JBQ3JCLE9BQU8sSUFBSSwrREFBTyxDQUFFLEVBQWMsQ0FBQyxjQUFjLEVBQUUsSUFBSyxFQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDdEYsS0FBSyxFQUFFLFlBQVksK0RBQU87d0JBQ3RCLE9BQU8sSUFBSSwrREFBTyxDQUFFLEVBQWMsQ0FBQyxjQUFjLEVBQUUsSUFBSyxFQUFjLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztvQkFDN0YsS0FBSyxFQUFFLFlBQVksNERBQUk7d0JBQ25CLE9BQU8sSUFBSSwrREFBTyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM3QixLQUFLLEVBQUUsWUFBWSxpRUFBUzt3QkFDeEIsT0FBTyxJQUFJLCtEQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzdCLEtBQUssRUFBRSxZQUFZLDJEQUFHO3dCQUNsQixPQUFPLElBQUksK0RBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDN0I7d0JBQ0ksTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDO2lCQUN6QjtZQUNMLEtBQUssRUFBRSxZQUFZLDhEQUFNO2dCQUNyQixRQUFRLElBQUksRUFBRTtvQkFDVixLQUFLLEVBQUUsWUFBWSw4REFBTTt3QkFDckIsT0FBTyxJQUFJLCtEQUFPLENBQUUsRUFBYSxDQUFDLFFBQVEsRUFBRSxLQUFNLEVBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO29CQUNoRixLQUFLLEVBQUUsWUFBWSw0REFBSTt3QkFDbkIsT0FBTyxJQUFJLCtEQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzdCLEtBQUssRUFBRSxZQUFZLGlFQUFTO3dCQUN4QixPQUFPLElBQUksK0RBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDN0I7d0JBQ0ksTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDO2lCQUN6QjtZQUNMLEtBQUssRUFBRSxZQUFZLGlFQUFTO2dCQUN4QixRQUFRLElBQUksRUFBRTtvQkFDVixLQUFLLEVBQUUsWUFBWSxpRUFBUzt3QkFDeEIsT0FBTyxJQUFJLCtEQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzlCO3dCQUNJLE9BQU8sSUFBSSwrREFBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNoQztZQUNMLEtBQUssRUFBRSxZQUFZLDREQUFJO2dCQUNuQixRQUFRLElBQUksRUFBRTtvQkFDVixLQUFLLEVBQUUsWUFBWSw0REFBSTt3QkFDbkIsT0FBTyxJQUFJLCtEQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzlCO3dCQUNJLE9BQU8sSUFBSSwrREFBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNoQztZQUNMLEtBQUssRUFBRSxZQUFZLDJEQUFHO2dCQUNsQixRQUFRLElBQUksRUFBRTtvQkFDVixLQUFLLEVBQUUsWUFBWSwyREFBRzt3QkFDbEIsT0FBTyxJQUFJLCtEQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzlCO3dCQUNJLE9BQU8sSUFBSSwrREFBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNoQztZQUNMLEtBQUssRUFBRSxZQUFZLDhEQUFNO2dCQUNyQixPQUFPLElBQUksK0RBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QixLQUFLLEVBQUUsWUFBWSw2REFBSztnQkFDcEIsT0FBTyxJQUFJLCtEQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0I7Z0JBQ0ksTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDO1NBQ3pCO0lBQ0wsQ0FBQztBQUNMLENBQUM7QUFFTSxTQUFTLEtBQUssQ0FBQyxFQUFTLEVBQUUsRUFBUyxFQUFFLFdBQXFCLElBQUksdURBQVEsRUFBRTtJQUMzRSxFQUFFLFlBQVksb0RBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFJLEVBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNqRSxFQUFFLFlBQVksb0RBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFJLEVBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUVqRSxJQUFJO1FBQ0EsT0FBTyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ3RCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDUixNQUFNLElBQUksd0RBQWlCLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxJQUFJLE1BQU0sRUFBRSxDQUFDLElBQUkscUJBQXFCLEVBQUUsUUFBUSxDQUFDO0tBQzlHO0lBRUQsU0FBUyxHQUFHLENBQUMsRUFBTyxFQUFFLEVBQU87UUFDekIsUUFBUSxJQUFJLEVBQUU7WUFDVixLQUFLLEVBQUUsWUFBWSw4REFBTTtnQkFDckIsUUFBUSxJQUFJLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLFlBQVksOERBQU07d0JBQ3JCLE9BQU8sSUFBSSwrREFBTyxDQUFFLEVBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBSSxFQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDOUUsS0FBSyxFQUFFLFlBQVksK0RBQU87d0JBQ3RCLE9BQU8sSUFBSSwrREFBTyxDQUFFLEVBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBSSxFQUFjLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztvQkFDckYsS0FBSyxFQUFFLFlBQVksMkRBQUc7d0JBQ2xCLE9BQU8sSUFBSSwrREFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUM5Qjt3QkFDSSxPQUFPLElBQUksK0RBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDakM7WUFDTCxLQUFLLEVBQUUsWUFBWSwrREFBTztnQkFDdEIsUUFBUSxJQUFJLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLFlBQVksOERBQU07d0JBQ3JCLE9BQU8sSUFBSSwrREFBTyxDQUFFLEVBQWMsQ0FBQyxjQUFjLEVBQUUsR0FBSSxFQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDckYsS0FBSyxFQUFFLFlBQVksK0RBQU87d0JBQ3RCLE9BQU8sSUFBSSwrREFBTyxDQUFFLEVBQWMsQ0FBQyxjQUFjLEVBQUUsR0FBSSxFQUFjLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztvQkFDNUY7d0JBQ0ksT0FBTyxJQUFJLCtEQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2pDO1lBQ0wsS0FBSyxFQUFFLFlBQVksOERBQU07Z0JBQ3JCLFFBQVEsSUFBSSxFQUFFO29CQUNWLEtBQUssRUFBRSxZQUFZLDhEQUFNO3dCQUNyQixPQUFPLElBQUksK0RBQU8sQ0FBRSxFQUFhLENBQUMsUUFBUSxFQUFFLEdBQUksRUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7b0JBQzlFO3dCQUNJLE9BQU8sSUFBSSwrREFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNqQztZQUNMLEtBQUssRUFBRSxZQUFZLDJEQUFHO2dCQUNsQixRQUFRLElBQUksRUFBRTtvQkFDVixLQUFLLEVBQUUsWUFBWSw4REFBTTt3QkFDckIsT0FBTyxJQUFJLCtEQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzlCO3dCQUNJLE9BQU8sSUFBSSwrREFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNqQztZQUNMO2dCQUNJLE9BQU8sSUFBSSwrREFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQztBQUNMLENBQUM7QUFFTSxTQUFTLEtBQUssQ0FBQyxFQUFTLEVBQUUsRUFBUyxFQUFFLFdBQXFCLElBQUksdURBQVEsRUFBRTtJQUMzRSxFQUFFLFlBQVksb0RBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFJLEVBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNqRSxFQUFFLFlBQVksb0RBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFJLEVBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUVqRSxJQUFJO1FBQ0EsT0FBTyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ3RCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDUixNQUFNLElBQUksd0RBQWlCLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxJQUFJLE1BQU0sRUFBRSxDQUFDLElBQUksdUJBQXVCLEVBQUUsUUFBUSxDQUFDO0tBQ2hIO0lBRUQsU0FBUyxHQUFHLENBQUMsRUFBTyxFQUFFLEVBQU87UUFDekIsUUFBUSxJQUFJLEVBQUU7WUFDVixLQUFLLEVBQUUsWUFBWSw4REFBTTtnQkFDckIsUUFBUSxJQUFJLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLFlBQVksOERBQU07d0JBQ3JCLE9BQU8sSUFBSSwrREFBTyxDQUFFLEVBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBSSxFQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDOUUsS0FBSyxFQUFFLFlBQVksK0RBQU87d0JBQ3RCLE9BQU8sSUFBSSwrREFBTyxDQUFFLEVBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBSSxFQUFjLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztvQkFDckYsS0FBSyxFQUFFLFlBQVksMkRBQUc7d0JBQ2xCLE9BQU8sSUFBSSwrREFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUM5Qjt3QkFDSSxPQUFRLElBQUksK0RBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDbEM7WUFDTCxLQUFLLEVBQUUsWUFBWSwrREFBTztnQkFDdEIsUUFBUSxJQUFJLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLFlBQVksOERBQU07d0JBQ3JCLE9BQU8sSUFBSSwrREFBTyxDQUFFLEVBQWMsQ0FBQyxjQUFjLEVBQUUsR0FBSSxFQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDckYsS0FBSyxFQUFFLFlBQVksK0RBQU87d0JBQ3RCLE9BQU8sSUFBSSwrREFBTyxDQUFFLEVBQWMsQ0FBQyxjQUFjLEVBQUUsR0FBSSxFQUFjLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztvQkFDNUY7d0JBQ0ksT0FBUSxJQUFJLCtEQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2xDO1lBQ0wsS0FBSyxFQUFFLFlBQVksOERBQU07Z0JBQ3JCLFFBQVEsSUFBSSxFQUFFO29CQUNWLEtBQUssRUFBRSxZQUFZLDhEQUFNO3dCQUNyQixPQUFPLElBQUksK0RBQU8sQ0FBRSxFQUFhLENBQUMsUUFBUSxFQUFFLEdBQUksRUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7b0JBQzlFO3dCQUNJLE9BQU8sSUFBSSwrREFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNqQztZQUNMLEtBQUssRUFBRSxZQUFZLDJEQUFHO2dCQUNsQixRQUFRLElBQUksRUFBRTtvQkFDVixLQUFLLEVBQUUsWUFBWSw4REFBTTt3QkFDckIsT0FBTyxJQUFJLCtEQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzlCO3dCQUNJLE9BQU8sSUFBSSwrREFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNqQztZQUNMO2dCQUNJLE9BQU8sSUFBSSwrREFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQztBQUNMLENBQUM7QUFFTSxTQUFTLE9BQU8sQ0FBQyxFQUFTLEVBQUUsRUFBUyxFQUFFLFdBQXFCLElBQUksdURBQVEsRUFBRTtJQUM3RSxFQUFFLFlBQVksb0RBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFJLEVBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNqRSxFQUFFLFlBQVksb0RBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFJLEVBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUVqRSxJQUFJO1FBQ0EsT0FBTyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ3hCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDUixNQUFNLElBQUksd0RBQWlCLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxJQUFJLE9BQU8sRUFBRSxDQUFDLElBQUksa0JBQWtCLEVBQUUsUUFBUSxDQUFDO0tBQzVHO0lBRUQsU0FBUyxLQUFLLENBQUMsRUFBTyxFQUFFLEVBQU87UUFDM0IsUUFBUSxJQUFJLEVBQUU7WUFDVixLQUFLLEVBQUUsWUFBWSw4REFBTTtnQkFDckIsUUFBUSxJQUFJLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLFlBQVksOERBQU07d0JBQ3JCLE9BQU8sSUFBSSwrREFBTyxDQUFFLEVBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSyxFQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDL0UsS0FBSyxFQUFFLFlBQVksK0RBQU87d0JBQ3RCLE9BQU8sSUFBSSwrREFBTyxDQUFFLEVBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSyxFQUFjLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztvQkFDdEYsS0FBSyxFQUFFLFlBQVksMkRBQUc7d0JBQ2xCLE9BQU8sSUFBSSwrREFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUM5Qjt3QkFDSSxPQUFPLElBQUksK0RBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDakM7WUFDTCxLQUFLLEVBQUUsWUFBWSwrREFBTztnQkFDdEIsUUFBUSxJQUFJLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLFlBQVksOERBQU07d0JBQ3JCLE9BQU8sSUFBSSwrREFBTyxDQUFFLEVBQWMsQ0FBQyxjQUFjLEVBQUUsSUFBSyxFQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDdEYsS0FBSyxFQUFFLFlBQVksK0RBQU87d0JBQ3RCLE9BQU8sSUFBSSwrREFBTyxDQUFFLEVBQWMsQ0FBQyxjQUFjLEVBQUUsSUFBSyxFQUFjLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztvQkFDN0Y7d0JBQ0ksT0FBTyxJQUFJLCtEQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2pDO1lBQ0wsS0FBSyxFQUFFLFlBQVksOERBQU07Z0JBQ3JCLFFBQVEsSUFBSSxFQUFFO29CQUNWLEtBQUssRUFBRSxZQUFZLDhEQUFNO3dCQUNyQixPQUFPLElBQUksK0RBQU8sQ0FBRSxFQUFhLENBQUMsUUFBUSxFQUFFLElBQUssRUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7b0JBQy9FO3dCQUNJLE9BQU8sSUFBSSwrREFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNqQztZQUNMLEtBQUssRUFBRSxZQUFZLDJEQUFHO2dCQUNsQixRQUFRLElBQUksRUFBRTtvQkFDVixLQUFLLEVBQUUsWUFBWSw4REFBTTt3QkFDckIsT0FBTyxJQUFJLCtEQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzlCO3dCQUNJLE9BQU8sSUFBSSwrREFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNqQztZQUNMO2dCQUNJLE9BQU8sSUFBSSwrREFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQztBQUNMLENBQUM7QUFFTSxTQUFTLE9BQU8sQ0FBQyxFQUFTLEVBQUUsRUFBUyxFQUFFLFdBQXFCLElBQUksdURBQVEsRUFBRTtJQUM3RSxFQUFFLFlBQVksb0RBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFJLEVBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNqRSxFQUFFLFlBQVksb0RBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFJLEVBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUVqRSxJQUFJO1FBQ0EsT0FBTyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ3hCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDUixNQUFNLElBQUksd0RBQWlCLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxJQUFJLE9BQU8sRUFBRSxDQUFDLElBQUksa0JBQWtCLEVBQUUsUUFBUSxDQUFDO0tBQzVHO0lBRUQsU0FBUyxLQUFLLENBQUMsRUFBTyxFQUFFLEVBQU87UUFDM0IsUUFBUSxJQUFJLEVBQUU7WUFDVixLQUFLLEVBQUUsWUFBWSw4REFBTTtnQkFDckIsUUFBUSxJQUFJLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLFlBQVksOERBQU07d0JBQ3JCLE9BQU8sSUFBSSwrREFBTyxDQUFFLEVBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSyxFQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDL0UsS0FBSyxFQUFFLFlBQVksK0RBQU87d0JBQ3RCLE9BQU8sSUFBSSwrREFBTyxDQUFFLEVBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSyxFQUFjLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztvQkFDdEYsS0FBSyxFQUFFLFlBQVksMkRBQUc7d0JBQ2xCLE9BQU8sSUFBSSwrREFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUM5Qjt3QkFDSSxPQUFPLElBQUksK0RBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDakM7WUFDTCxLQUFLLEVBQUUsWUFBWSwrREFBTztnQkFDdEIsUUFBUSxJQUFJLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLFlBQVksOERBQU07d0JBQ3JCLE9BQU8sSUFBSSwrREFBTyxDQUFFLEVBQWMsQ0FBQyxjQUFjLEVBQUUsSUFBSyxFQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDdEYsS0FBSyxFQUFFLFlBQVksK0RBQU87d0JBQ3RCLE9BQU8sSUFBSSwrREFBTyxDQUFFLEVBQWMsQ0FBQyxjQUFjLEVBQUUsSUFBSyxFQUFjLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztvQkFDN0Y7d0JBQ0ksT0FBTyxJQUFJLCtEQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2pDO1lBQ0wsS0FBSyxFQUFFLFlBQVksOERBQU07Z0JBQ3JCLFFBQVEsSUFBSSxFQUFFO29CQUNWLEtBQUssRUFBRSxZQUFZLDhEQUFNO3dCQUNyQixPQUFPLElBQUksK0RBQU8sQ0FBRSxFQUFhLENBQUMsUUFBUSxFQUFFLElBQUssRUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7b0JBQy9FO3dCQUNJLE9BQU8sSUFBSSwrREFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNqQztZQUNMLEtBQUssRUFBRSxZQUFZLDJEQUFHO2dCQUNsQixRQUFRLElBQUksRUFBRTtvQkFDVixLQUFLLEVBQUUsWUFBWSw4REFBTTt3QkFDckIsT0FBTyxJQUFJLCtEQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzlCO3dCQUNJLE9BQU8sSUFBSSwrREFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNqQztZQUNMO2dCQUNJLE9BQU8sSUFBSSwrREFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQztBQUNMLENBQUM7Ozs7Ozs7Ozs7Ozs7QUM1WEQ7QUFBQTtBQUFPLE1BQU0sY0FBYztJQVdoQixNQUFNLENBQUMsZUFBZTtRQUN6QixjQUFjLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUNoQyxjQUFjLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUMvQixjQUFjLENBQUMsWUFBWSxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7SUFDdEQsQ0FBQzs7QUFkYywyQkFBWSxHQUFHLENBQUMsQ0FBQztBQUNsQix5QkFBVSxHQUFHLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUVoRCwwQkFBVyxHQUFHLENBQUMsQ0FBQztBQUNqQix3QkFBUyxHQUFHLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUU5QywyQkFBWSxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7QUFDcEMsNkJBQWMsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDNUUsaUNBQWtCLEdBQUcsR0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNUNUY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUEwRTtBQUUxQztBQUVNO0FBQ0s7QUFDRTtBQUNJO0FBQ0Q7QUFDUTtBQUVqRCxNQUFNLGlCQUFrQixTQUFRLEtBQUs7SUFDeEMsWUFBWSxPQUFnQixFQUFFLFdBQXFCLElBQUksdURBQVEsRUFBRTtRQUM3RCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZiw0REFBYSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxZQUFZLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNoRyxDQUFDO0NBQ0o7QUFFTSxNQUFNLFVBQVcsU0FBUSxLQUFLO0lBQ2pDLFlBQVksT0FBZ0IsRUFBRSxXQUFxQixJQUFJLHVEQUFRLEVBQUU7UUFDN0QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsNERBQWEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsWUFBWSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDaEcsQ0FBQztDQUNKO0FBRU0sU0FBUyxZQUFZLENBQUMsSUFBWTtJQUNyQyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN2QixPQUFPLElBQUksaUVBQVMsRUFBRSxDQUFDO0tBQzFCO0lBQ0QsT0FBTyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEMsQ0FBQztBQUVNLFNBQVMsZUFBZSxDQUFDLElBQVk7SUFDeEMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMxQixRQUFRLElBQUksRUFBRTtRQUNWLEtBQUssUUFBUSxDQUFDO1FBQ2QsS0FBSyxRQUFRLENBQUM7UUFDZCxLQUFLLFNBQVMsQ0FBQztRQUNmLEtBQUssS0FBSyxDQUFDO1FBQ1gsS0FBSyxPQUFPLENBQUM7UUFDYixLQUFLLE1BQU0sQ0FBQztRQUNaLEtBQUssV0FBVztZQUNaLE9BQU8sSUFBSSxDQUFDO1FBQ2hCO1lBQ0ksT0FBTyxLQUFLLENBQUM7S0FDcEI7QUFDTCxDQUFDO0FBRU0sU0FBUyxjQUFjLENBQUMsSUFBWTtJQUN2QyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzFCLElBQUksU0FBUyxHQUFvQixpQkFBaUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JFLElBQUksU0FBUyxLQUFLLElBQUksSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFO1FBQy9DLE1BQU0sSUFBSSxpQkFBaUIsQ0FBQyx5Q0FBeUMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUNoRjtJQUNELE9BQU8sU0FBUyxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ3ZDLENBQUM7QUFFTSxTQUFTLE9BQU8sQ0FBQyxJQUFXLEVBQUUsVUFBa0I7SUFDbkQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBRXRCLE9BQU8sVUFBVSxJQUFJLElBQUksRUFBQztRQUN0QixJQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUssU0FBUyxFQUFDO1lBQ2hELE9BQU8sVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM3QztRQUNELFVBQVUsR0FBRyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDdEM7SUFFRCxNQUFPLElBQUksaUJBQWlCLENBQUMsaUJBQWlCLFVBQVUsZ0JBQWdCLENBQUMsQ0FBQztBQUM5RSxDQUFDO0FBRU0sU0FBUyxPQUFPLENBQUMsTUFBYTtJQUNqQyxJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUM7SUFDeEIsT0FBTyxJQUFJLEVBQUU7UUFDVCxJQUFJLFVBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxJQUFJLEVBQUU7WUFDL0IsTUFBTTtTQUNUO1FBQ0QsVUFBVSxHQUFHLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUN0QztJQUNELE9BQU8sVUFBVSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMzQyxDQUFDO0FBRU0sU0FBUyxRQUFRLENBQUMsU0FBb0I7SUFDekMsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ2YsTUFBTSxPQUFPLEdBQUcsOERBQWMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUM1QyxLQUFLLElBQUksb0JBQW9CLE9BQU8sT0FBTyxDQUFDO0lBQ3hDLEtBQUssSUFBSSxpQkFBaUI7UUFDdEIsb0JBQW9CO1FBQ3BCLHdCQUF3QixDQUFDO0lBQzdCLEtBQUssSUFBSSxpRUFBaUUsQ0FBQztJQUMvRSxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3pCLEtBQUssSUFBSSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFDSCxLQUFLLElBQUksWUFBWSxRQUFRLE1BQU0sQ0FBQztJQUNwQyxLQUFLLElBQUksS0FBSztJQUNkLE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFFTSxTQUFTLGlCQUFpQixDQUFDLE1BQWMsRUFBRSxHQUFXO0lBQ3pELG1DQUFtQztJQUNuQyx5QkFBeUI7SUFDekIsTUFBTTtBQUNWLENBQUM7QUFFTSxTQUFTLFVBQVUsQ0FBQyxHQUFXLEVBQUUsU0FBYSxFQUFFLFNBQW9CLEVBQUUsS0FBUztJQUNsRixJQUFJLEdBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLElBQUksR0FBRyxZQUFZLG9EQUFTLEVBQUU7UUFDMUIsR0FBRyxHQUFJLEdBQWlCLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDdkM7SUFFRCxJQUFJLENBQUMsQ0FBQyxHQUFHLFlBQVksK0RBQU8sQ0FBQyxFQUFFO1FBQzNCLE1BQU0sSUFBSSxpQkFBaUIsQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO0tBQ2xGO0lBRUQsSUFBSSxHQUFHLEdBQUcsR0FBYyxDQUFDO0lBQ3pCLE9BQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQ25CLE1BQU0sSUFBSSxHQUFHLElBQUksOENBQU0sQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDeEMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUUxQixJQUFJLEdBQUcsWUFBWSx3REFBUSxFQUFFO1lBQ3pCLE1BQU07U0FDVDtRQUNELElBQUksR0FBRyxZQUFZLDBEQUFTLEVBQUU7WUFDMUIsT0FBTyxHQUFHLENBQUM7U0FDZDtRQUNELElBQUcsR0FBRyxZQUFZLDhEQUFXLEVBQUM7WUFDMUIsU0FBUztTQUNaO1FBRUQsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ2hCLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbEI7UUFFRCxJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLElBQUksSUFBSSxZQUFZLG9EQUFTLEVBQUU7WUFDM0IsSUFBSSxHQUFJLElBQWtCLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDekM7UUFDRCxHQUFHLEdBQUcsSUFBZSxDQUFDO0tBQ3pCO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUVNLFNBQVMsWUFBWSxDQUFDLEdBQVcsRUFBRSxTQUFhLEVBQUUsU0FBb0IsRUFBRSxLQUFTO0lBQ3BGLElBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsSUFBSSxHQUFHLFlBQVksb0RBQVMsRUFBRTtRQUMxQixHQUFHLEdBQUksR0FBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUN2QztJQUVELElBQUksQ0FBQyxDQUFDLEdBQUcsWUFBWSwrREFBTyxDQUFDLEVBQUU7UUFDM0IsTUFBTSxJQUFJLGlCQUFpQixDQUFDLGlEQUFpRCxDQUFDLENBQUM7S0FDbEY7SUFFRCxJQUFJLElBQUksR0FBRyxJQUFJLDhDQUFNLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3RDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFFZCxJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLElBQUksSUFBSSxZQUFZLG9EQUFTLEVBQUU7UUFDM0IsSUFBSSxHQUFJLElBQWtCLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDekM7SUFDRCxJQUFJLEdBQUcsR0FBRyxJQUFlLENBQUM7SUFFMUIsT0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDbkIsTUFBTSxJQUFJLEdBQUcsSUFBSSw4Q0FBTSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN4QyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0IsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRTFCLElBQUksR0FBRyxZQUFZLHdEQUFRLEVBQUU7WUFDekIsTUFBTTtTQUNUO1FBQ0QsSUFBSSxHQUFHLFlBQVksMERBQVMsRUFBRTtZQUMxQixPQUFPLEdBQUcsQ0FBQztTQUNkO1FBQ0QsSUFBRyxHQUFHLFlBQVksOERBQVcsRUFBQztZQUMxQixTQUFTO1NBQ1o7UUFFRCxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDaEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNsQjtRQUVELElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsSUFBSSxJQUFJLFlBQVksb0RBQVMsRUFBRTtZQUMzQixJQUFJLEdBQUksSUFBa0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUN6QztRQUNELEdBQUcsR0FBRyxJQUFlLENBQUM7S0FDekI7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBRU0sTUFBTSxLQUFLO0lBR2Q7UUFDSSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksR0FBRyxFQUFZLENBQUM7SUFDbkMsQ0FBQztJQUVELE1BQU07UUFDRixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFRLEVBQUUsS0FBVTtRQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztDQUNKO0FBRU0sTUFBTSxlQUFlO0lBR3hCLFlBQVksVUFBK0I7UUFDdkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDakMsQ0FBQztJQUVELGVBQWU7UUFDWCxNQUFNLFVBQVUsR0FBdUIsSUFBSSxHQUFHLEVBQWlCLENBQUM7UUFDaEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDN0IsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxpRUFBUyxFQUFFLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSw4REFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Q0FDSjtBQUVNLE1BQU0saUJBQWlCOztBQUNaLHlCQUFPLEdBQWlDLElBQUksR0FBRyxFQUEyQixDQUFDOzs7Ozs7Ozs7Ozs7O0FDOU43RjtBQUFBO0FBQUE7QUFBK0I7QUFHeEIsTUFBZSxpQkFBa0IsU0FBUSw0Q0FBSztDQUVwRDs7Ozs7Ozs7Ozs7OztBQ05EO0FBQUE7QUFBQTtBQUFzRDtBQUUvQyxNQUFlLE1BQU8sU0FBUSxvRUFBaUI7Q0FFckQ7Ozs7Ozs7Ozs7Ozs7QUNKRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBc0Q7QUFFckI7QUFFTTtBQUNVO0FBRzFDLE1BQU0sV0FBWSxTQUFRLG9FQUFpQjtJQUs5QyxZQUFZLEdBQWMsRUFBRSxNQUFpQixFQUFFLElBQVk7UUFDdkQsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFTSxPQUFPO1FBQ1YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxNQUFNO1FBQ1QsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxHQUFHLENBQUMsSUFBWSxFQUFFLElBQWtCO1FBQ2hDLElBQUksR0FBRyxHQUFHLElBQUksOENBQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sVUFBVSxHQUFxQixJQUFJLEtBQUssRUFBYSxDQUFDO1FBQzVELEtBQUssSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUMzQixVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFjLENBQUMsQ0FBQztTQUNoRDtRQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzNELFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM5QztRQUNELE9BQU8sR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFTSxVQUFVLENBQUMsUUFBZ0IsRUFBRTtRQUNoQyxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDZixNQUFNLE9BQU8sR0FBRyw4REFBYyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzVDLEtBQUssSUFBSSxvQkFBb0IsT0FBTyxPQUFPLENBQUM7UUFDNUMsS0FBSyxJQUFJLGlCQUFpQjtZQUN0QixvQkFBb0I7WUFDcEIsd0JBQXdCLENBQUM7UUFDN0IsS0FBSyxJQUFJLGlFQUFpRSxDQUFDO1FBQzNFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDdEIsS0FBSyxJQUFJLElBQUksOERBQWMsQ0FBQyxTQUFTLEVBQUUsWUFBYSxDQUF5QixDQUFDLE9BQU8sRUFBRSxNQUFNO1FBQ2pHLENBQUMsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxJQUFJLFlBQVksS0FBSyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUM7UUFDL0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxFQUFFLFlBQVksb0RBQVMsRUFBRTtnQkFDekIsRUFBRSxHQUFJLEVBQWdCLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDckM7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2hCLEtBQUssSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxJQUFJLEtBQUssQ0FBQztRQUNmLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7OztBQzlERDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBMkM7QUFFVDtBQUNrQjtBQUNIO0FBRTFDLE1BQU0sV0FBWSxTQUFRLHdEQUFNO0lBQ25DO1FBQ0ksS0FBSyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQsR0FBRyxDQUFDLElBQVksRUFBRSxJQUFrQjtRQUNoQyxJQUFJLFVBQVUsR0FBRyxJQUFhLENBQUM7UUFDL0IsT0FBTyxJQUFJLEVBQUU7WUFDVCxJQUFJLFVBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxJQUFJLEVBQUU7Z0JBQy9CLE1BQU07YUFDVDtZQUNELFVBQVUsR0FBRyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDdEM7UUFDRCxJQUFJLE9BQU8sR0FBRyxnRkFBZ0YsQ0FBQztRQUMvRixPQUFPLElBQVEsdURBQVEsQ0FBRSxVQUFxQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7UUFDL0QsT0FBTyxJQUFJLE9BQU8sQ0FBQztRQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JCLDhEQUFjLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sSUFBSSxpRUFBUyxFQUFFLENBQUM7SUFDM0IsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7O0FDM0JEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBMkM7QUFDYTtBQUdSO0FBRXpDLE1BQU0sTUFBTyxTQUFRLHdEQUFNO0lBRzlCLFlBQVksS0FBWTtRQUNwQixLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxHQUFHLENBQUMsSUFBWSxFQUFFLElBQWtCO1FBQ2hDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUMsTUFBTSxDQUFDO1FBQzVDLE9BQU8sSUFBSSwwREFBUyxDQUFDLElBQUksOERBQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7OztBQ2xCRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTJDO0FBQ2dCO0FBR1g7QUFFekMsTUFBTSxHQUFJLFNBQVEsd0RBQU07SUFHM0IsWUFBWSxLQUFZO1FBQ3BCLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUVELEdBQUcsQ0FBQyxJQUFZLEVBQUUsSUFBa0I7UUFDaEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUM1QyxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDckIsT0FBTyxJQUFJLDBEQUFTLENBQUMsSUFBSSxpRUFBUyxFQUFFLENBQUMsQ0FBQztTQUN6QztRQUNELE9BQU8sSUFBSSwwREFBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7OztBQ3JCRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBMkM7QUFDYTtBQUdSO0FBQ1Q7QUFHaEMsTUFBTSxJQUFLLFNBQVEsd0RBQU07SUFHNUIsWUFBWSxLQUFZO1FBQ3BCLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUVELEdBQUcsQ0FBQyxJQUFZLEVBQUUsSUFBa0I7UUFDaEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDNUMsS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDaEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxvREFBUyxFQUFFLENBQUM7WUFDMUIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM1QjtRQUNELE9BQU8sSUFBSSwwREFBUyxDQUFDLElBQUksOERBQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7Q0FDSiIsImZpbGUiOiJub2Rlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImFzdFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJhc3RcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gdGhpc1tcIndlYnBhY2tIb3RVcGRhdGVhc3RcIl07XG4gXHR0aGlzW1wid2VicGFja0hvdFVwZGF0ZWFzdFwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xuIFx0XHRpZiAobnVsbCkgc2NyaXB0LmNyb3NzT3JpZ2luID0gbnVsbDtcbiBcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0XHR9XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcImQzNmRiMTBmNzFiZWU4ZGIyOWE5XCI7XG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuIFx0XHRcdFx0XHRcdHJlcXVlc3QgK1xuIFx0XHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fSxcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH07XG4gXHRcdGZvciAodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJlXCIgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwidFwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRmbi50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0XHRpZiAobW9kZSAmIDEpIHZhbHVlID0gZm4odmFsdWUpO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQodmFsdWUsIG1vZGUgJiB+MSk7XG4gXHRcdH07XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmSW52YWxpZGF0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcbiBcdFx0XHRpbnZhbGlkYXRlOiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdHRoaXMuX3NlbGZJbnZhbGlkYXRlZCA9IHRydWU7XG4gXHRcdFx0XHRzd2l0Y2ggKGhvdFN0YXR1cykge1xuIFx0XHRcdFx0XHRjYXNlIFwiaWRsZVwiOlxuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInJlYWR5XCI6XG4gXHRcdFx0XHRcdFx0aG90QXBwbHlJbnZhbGlkYXRlZE1vZHVsZShtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJwcmVwYXJlXCI6XG4gXHRcdFx0XHRcdGNhc2UgXCJjaGVja1wiOlxuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZVwiOlxuIFx0XHRcdFx0XHRjYXNlIFwiYXBwbHlcIjpcbiBcdFx0XHRcdFx0XHQoaG90UXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzID1cbiBcdFx0XHRcdFx0XHRcdGhvdFF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyB8fCBbXSkucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0Ly8gaWdub3JlIHJlcXVlc3RzIGluIGVycm9yIHN0YXRlc1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoLCBob3RRdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXM7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoaG90QXBwbHlJbnZhbGlkYXRlZE1vZHVsZXMoKSA/IFwicmVhZHlcIiA6IFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdHZhciBjaHVua0lkID0gXCJtYWluXCI7XG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiZcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiZcbiBcdFx0XHRcdGhvdFdhaXRpbmdGaWxlcyA9PT0gMFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXG4gXHRcdFx0cmV0dXJuO1xuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xuIFx0XHRmb3IgKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYgKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcbiBcdFx0aWYgKCFkZWZlcnJlZCkgcmV0dXJuO1xuIFx0XHRpZiAoaG90QXBwbHlPblVwZGF0ZSkge1xuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXG4gXHRcdFx0Ly8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2NTY2NlxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpXG4gXHRcdFx0XHQudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUpO1xuIFx0XHRcdFx0fSlcbiBcdFx0XHRcdC50aGVuKFxuIFx0XHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gXHRcdFx0XHRcdH0sXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHQpO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpXG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiBcdFx0cmV0dXJuIGhvdEFwcGx5SW50ZXJuYWwob3B0aW9ucyk7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5SW50ZXJuYWwob3B0aW9ucykge1xuIFx0XHRob3RBcHBseUludmFsaWRhdGVkTW9kdWxlcygpO1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdCFtb2R1bGUgfHxcbiBcdFx0XHRcdFx0KG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCAmJiAhbW9kdWxlLmhvdC5fc2VsZkludmFsaWRhdGVkKVxuIFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkICYmXG4gXHRcdFx0XHQvLyByZW1vdmVkIHNlbGYtYWNjZXB0ZWQgbW9kdWxlcyBzaG91bGQgbm90IGJlIHJlcXVpcmVkXG4gXHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSAhPT0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlICYmXG4gXHRcdFx0XHQvLyB3aGVuIGNhbGxlZCBpbnZhbGlkYXRlIHNlbGYtYWNjZXB0aW5nIGlzIG5vdCBwb3NzaWJsZVxuIFx0XHRcdFx0IWluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkludmFsaWRhdGVkXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdHBhcmVudHM6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLnBhcmVudHMuc2xpY2UoKSxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aWYgKGhvdFVwZGF0ZU5ld0hhc2ggIT09IHVuZGVmaW5lZCkge1xuIFx0XHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdW5kZWZpbmVkO1xuIFx0XHR9XG4gXHRcdGhvdFVwZGF0ZSA9IHVuZGVmaW5lZDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gaXRlbS5wYXJlbnRzO1xuIFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IG1vZHVsZUlkO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRpZiAoaG90UXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzKSB7XG4gXHRcdFx0cmV0dXJuIGhvdEFwcGx5SW50ZXJuYWwob3B0aW9ucykudGhlbihmdW5jdGlvbihsaXN0KSB7XG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbihtb2R1bGVJZCkge1xuIFx0XHRcdFx0XHRpZiAobGlzdC5pbmRleE9mKG1vZHVsZUlkKSA8IDApIGxpc3QucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHR9KTtcbiBcdFx0XHRcdHJldHVybiBsaXN0O1xuIFx0XHRcdH0pO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseUludmFsaWRhdGVkTW9kdWxlcygpIHtcbiBcdFx0aWYgKGhvdFF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcykge1xuIFx0XHRcdGlmICghaG90VXBkYXRlKSBob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHRob3RRdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMuZm9yRWFjaChob3RBcHBseUludmFsaWRhdGVkTW9kdWxlKTtcbiBcdFx0XHRob3RRdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMgPSB1bmRlZmluZWQ7XG4gXHRcdFx0cmV0dXJuIHRydWU7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHlJbnZhbGlkYXRlZE1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHRpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIG1vZHVsZUlkKSlcbiBcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9kdWxlc1ttb2R1bGVJZF07XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoXCIuL3NyYy9pbmRleC50c1wiKShfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvcmlnaW5hbE1vZHVsZSkge1xuXHRpZiAoIW9yaWdpbmFsTW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdHZhciBtb2R1bGUgPSBPYmplY3QuY3JlYXRlKG9yaWdpbmFsTW9kdWxlKTtcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJleHBvcnRzXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWVcblx0XHR9KTtcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcblx0fVxuXHRyZXR1cm4gbW9kdWxlO1xufTtcbiIsImltcG9ydCB7UmVmZXJlbmNlfSBmcm9tIFwiLi91dGlscy9SZWZlcmVuY2VcIjtcclxuaW1wb3J0IHtVTkRFRklORUQsIE5VTEx9IGZyb20gXCIuL3V0aWxzL1ByaW1pdGl2ZVR5cG9Db250YWluZXJcIjtcclxuaW1wb3J0IHtFbnZtbnR9IGZyb20gXCIuL3V0aWxzL0Vudm1udFwiO1xyXG5pbXBvcnQge0NudG5yfSBmcm9tIFwiLi91dGlscy9DbnRuclwiO1xyXG5pbXBvcnQge09wfSBmcm9tIFwiLi91dGlscy9PcFwiO1xyXG5pbXBvcnQge0NvbnNvbGV9IGZyb20gXCIuL3V0aWxzL0NvbnNvbGVcIjtcclxuXHJcbmltcG9ydCB7Q29uc29sZUxvZ05vZGV9IGZyb20gXCIuL25vZGVzL0NvbnNvbGVMb2dOb2RlXCI7XHJcbmltcG9ydCB7TnVtYmVyTm9kZX0gZnJvbSBcIi4vbm9kZXMvTnVtYmVyTm9kZVwiO1xyXG5pbXBvcnQge1N0cmluZ05vZGV9IGZyb20gXCIuL25vZGVzL1N0cmluZ05vZGVcIjtcclxuaW1wb3J0IHtCb29sZWFuTm9kZX0gZnJvbSBcIi4vbm9kZXMvQm9vbGVhbk5vZGVcIjtcclxuaW1wb3J0IHtOdWxsTm9kZX0gZnJvbSBcIi4vbm9kZXMvTnVsbE5vZGVcIjtcclxuaW1wb3J0IHtVbmRlZmluZWROb2RlfSBmcm9tIFwiLi9ub2Rlcy9VbmRlZmluZWROb2RlXCI7XHJcbmltcG9ydCB7RGVjbGFyZVZhck5vZGV9IGZyb20gXCIuL25vZGVzL0RlY2xhcmVWYXJOb2RlXCI7XHJcbmltcG9ydCB7RGVjbGFyZVZhckxpc3ROb2RlfSBmcm9tIFwiLi9ub2Rlcy9EZWNsYXJlVmFyTGlzdE5vZGVcIjtcclxuaW1wb3J0IHtDcmVhdGVJZFZhck5vZGV9IGZyb20gXCIuL25vZGVzL0NyZWF0ZUlkVmFyTm9kZVwiO1xyXG5pbXBvcnQge0FzaWduTm9kZX0gZnJvbSBcIi4vbm9kZXMvQXNpZ25Ob2RlXCI7XHJcbmltcG9ydCB7U3VtTm9kZX0gZnJvbSBcIi4vbm9kZXMvU3VtTm9kZVwiO1xyXG5pbXBvcnQge1N1Yk5vZGV9IGZyb20gXCIuL25vZGVzL1N1Yk5vZGVcIjtcclxuaW1wb3J0IHtNdWxOb2RlfSBmcm9tIFwiLi9ub2Rlcy9NdWxOb2RlXCI7XHJcbmltcG9ydCB7RGl2Tm9kZX0gZnJvbSBcIi4vbm9kZXMvRGl2Tm9kZVwiO1xyXG5pbXBvcnQge01vZE5vZGV9IGZyb20gXCIuL25vZGVzL01vZE5vZGVcIjtcclxuaW1wb3J0IHtFeHBOb2RlfSBmcm9tIFwiLi9ub2Rlcy9FeHBOb2RlXCI7XHJcbmltcG9ydCB7RXFOb2RlfSBmcm9tIFwiLi9ub2Rlcy9FcU5vZGVcIjtcclxuaW1wb3J0IHtEaWZOb2RlfSBmcm9tIFwiLi9ub2Rlcy9EaWZOb2RlXCI7XHJcbmltcG9ydCB7SGlnaGVyTm9kZX0gZnJvbSBcIi4vbm9kZXMvSGlnaGVyTm9kZVwiO1xyXG5pbXBvcnQge01pbm9yTm9kZX0gZnJvbSBcIi4vbm9kZXMvTWlub3JOb2RlXCI7XHJcbmltcG9ydCB7SGlnaGVyRXFOb2RlfSBmcm9tIFwiLi9ub2Rlcy9IaWdoZXJFcU5vZGVcIjtcclxuaW1wb3J0IHtNaW5vckVxTm9kZX0gZnJvbSBcIi4vbm9kZXMvTWlub3JFcU5vZGVcIjtcclxuaW1wb3J0IHtPck5vZGV9IGZyb20gXCIuL25vZGVzL09yTm9kZVwiO1xyXG5pbXBvcnQge0FuZE5vZGV9IGZyb20gXCIuL25vZGVzL0FuZE5vZGVcIjtcclxuaW1wb3J0IHtOb3ROb2RlfSBmcm9tIFwiLi9ub2Rlcy9Ob3ROb2RlXCI7XHJcbmltcG9ydCB7UmVBc2lnbkFkZE5vZGV9IGZyb20gXCIuL25vZGVzL1JlQXNpZ25BZGROb2RlXCI7XHJcbmltcG9ydCB7UmVBc2lnblN1Yk5vZGV9IGZyb20gXCIuL25vZGVzL1JlQXNpZ25TdWJOb2RlXCI7XHJcbmltcG9ydCB7UmVBc2lnbk11bE5vZGV9IGZyb20gXCIuL25vZGVzL1JlQXNpZ25NdWxOb2RlXCI7XHJcbmltcG9ydCB7UmVBc2lnbkRpdk5vZGV9IGZyb20gXCIuL25vZGVzL1JlQXNpZ25EaXZOb2RlXCI7XHJcbmltcG9ydCB7UmVBc2lnbk1vZE5vZGV9IGZyb20gXCIuL25vZGVzL1JlQXNpZ25Nb2ROb2RlXCI7XHJcbmltcG9ydCB7UmVBZGROb2RlfSBmcm9tIFwiLi9ub2Rlcy9SZUFkZE5vZGVcIjtcclxuaW1wb3J0IHtSZVN1Yk5vZGV9IGZyb20gXCIuL25vZGVzL1JlU3ViTm9kZVwiO1xyXG5pbXBvcnQge0NyZWF0ZUFycmF5Tm9kZX0gZnJvbSBcIi4vbm9kZXMvQ3JlYXRlQXJyYXlOb2RlXCI7XHJcbmltcG9ydCB7Q3JlYXRlQXJyVmFyTm9kZX0gZnJvbSBcIi4vbm9kZXMvQ3JlYXRlQXJyVmFyTm9kZVwiO1xyXG5pbXBvcnQge1JldHVybk9ian0gZnJvbSBcIi4vbm9kZXMvUmV0dXJuT2JqXCI7XHJcbmltcG9ydCB7Q3JlYXRlT2JqVmFyTm9kZX0gZnJvbSBcIi4vbm9kZXMvQ3JlYXRlT2JqVmFyTm9kZVwiO1xyXG5pbXBvcnQge0NyZWF0ZU9iakZ1bk5vZGV9IGZyb20gXCIuL25vZGVzL0NyZWF0ZU9iakZ1bk5vZGVcIjtcclxuaW1wb3J0IHtTZW50ZW5jZVRlcm5hcnlOb2RlfSBmcm9tIFwiLi9ub2Rlcy9TZW50ZW5jZVRlcm5hcnlOb2RlXCI7XHJcbmltcG9ydCB7QnJlYWtOb2RlfSBmcm9tIFwiLi9ub2Rlcy9CcmVha05vZGVcIjtcclxuaW1wb3J0IHtDb250aW51ZU5vZGV9IGZyb20gXCIuL25vZGVzL0NvbnRpbnVlTm9kZVwiO1xyXG5pbXBvcnQge0lmTm9kZX0gZnJvbSBcIi4vbm9kZXMvSWZOb2RlXCI7XHJcbmltcG9ydCB7V2hpbGVOb2RlfSBmcm9tIFwiLi9ub2Rlcy9XaGlsZU5vZGVcIjtcclxuaW1wb3J0IHtEb1doaWxlTm9kZX0gZnJvbSBcIi4vbm9kZXMvRG9XaGlsZU5vZGVcIjtcclxuaW1wb3J0IHtDYXNlTm9kZX0gZnJvbSBcIi4vbm9kZXMvQ2FzZU5vZGVcIjtcclxuaW1wb3J0IHtTd2l0Y2hOb2RlfSBmcm9tIFwiLi9ub2Rlcy9Td2l0Y2hOb2RlXCI7XHJcbmltcG9ydCB7Rm9ySW5Ob2RlfSBmcm9tIFwiLi9ub2Rlcy9Gb3JJbk5vZGVcIjtcclxuaW1wb3J0IHtGb3JPZk5vZGV9IGZyb20gXCIuL25vZGVzL0Zvck9mTm9kZVwiO1xyXG5pbXBvcnQge0Zvck5vZGV9IGZyb20gXCIuL25vZGVzL0Zvck5vZGVcIjtcclxuaW1wb3J0IHtNeU1hcCwgT2JqZWN0c1N0cnVjdHVyZXMsIE9iamVjdFN0cnVjdHVyZSwgVFNHcmFwaCwgVFNHcmFwaDJ9IGZyb20gXCIuL3V0aWxzL1V0aWxzXCI7XHJcbmltcG9ydCB7Q3JlYXRlT2JqTm9kZX0gZnJvbSBcIi4vbm9kZXMvQ3JlYXRlT2JqTm9kZVwiO1xyXG5pbXBvcnQge0RlY2xhcmVUeXBlU3RydWN0dXJlTm9kZX0gZnJvbSBcIi4vbm9kZXMvRGVjbGFyZVR5cGVTdHJ1Y3R1cmVOb2RlXCI7XHJcbmltcG9ydCB7RGVjbGFyZUZ1bk5vZGV9IGZyb20gXCIuL25vZGVzL0RlY2xhcmVGdW5Ob2RlXCI7XHJcbmltcG9ydCB7RGVjbGFyZUZ1blBhcmFtTm9kZX0gZnJvbSBcIi4vbm9kZXMvRGVjbGFyZUZ1blBhcmFtTm9kZVwiO1xyXG5pbXBvcnQge1JldHVybk5vZGV9IGZyb20gXCIuL25vZGVzL1JldHVybk5vZGVcIjtcclxuaW1wb3J0IHtGdW5jdGlvbkNhbGxOb2RlfSBmcm9tIFwiLi9ub2Rlcy9GdW5jdGlvbkNhbGxOb2RlXCI7XHJcbmltcG9ydCB7VFNHcmFwaENvbnRyb2x9IGZyb20gXCIuL3V0aWxzL1RTR3JhcGhDb250cm9sXCI7XHJcbmltcG9ydCB7Tm9kZXNDb250cm9sfSBmcm9tIFwiLi91dGlscy9Ob2Rlc0NvbnRyb2xcIjtcclxuaW1wb3J0IHsgRXJyb3JzQ29udHJvbCB9IGZyb20gXCIuL3V0aWxzL0Vycm9yc0NvbnRyb2xcIjtcclxuXHJcbmV4cG9ydCB7XHJcbiAgICBDb25zb2xlLFxyXG4gICAgQ250bnIsXHJcbiAgICBFbnZtbnQsXHJcbiAgICBPcCxcclxuICAgIE5VTEwsXHJcbiAgICBVTkRFRklORUQsXHJcbiAgICBSZWZlcmVuY2UsXHJcblxyXG4gICAgQ29uc29sZUxvZ05vZGUsXHJcbiAgICBOdW1iZXJOb2RlLFxyXG4gICAgU3RyaW5nTm9kZSxcclxuICAgIEJvb2xlYW5Ob2RlLFxyXG4gICAgTnVsbE5vZGUsXHJcbiAgICBVbmRlZmluZWROb2RlLFxyXG5cclxuICAgIERlY2xhcmVWYXJOb2RlLFxyXG4gICAgRGVjbGFyZVZhckxpc3ROb2RlLFxyXG5cclxuICAgIENyZWF0ZUlkVmFyTm9kZSxcclxuXHJcbiAgICBBc2lnbk5vZGUsXHJcblxyXG4gICAgU3VtTm9kZSxcclxuICAgIFN1Yk5vZGUsXHJcbiAgICBNdWxOb2RlLFxyXG4gICAgRGl2Tm9kZSxcclxuICAgIE1vZE5vZGUsXHJcbiAgICBFeHBOb2RlLFxyXG5cclxuICAgIEVxTm9kZSxcclxuICAgIERpZk5vZGUsXHJcbiAgICBIaWdoZXJOb2RlLFxyXG4gICAgTWlub3JOb2RlLFxyXG4gICAgSGlnaGVyRXFOb2RlLFxyXG4gICAgTWlub3JFcU5vZGUsXHJcblxyXG4gICAgT3JOb2RlLFxyXG4gICAgQW5kTm9kZSxcclxuICAgIE5vdE5vZGUsXHJcblxyXG4gICAgUmVBc2lnbkFkZE5vZGUsXHJcbiAgICBSZUFzaWduU3ViTm9kZSxcclxuICAgIFJlQXNpZ25NdWxOb2RlLFxyXG4gICAgUmVBc2lnbkRpdk5vZGUsXHJcbiAgICBSZUFzaWduTW9kTm9kZSxcclxuXHJcbiAgICBSZUFkZE5vZGUsXHJcbiAgICBSZVN1Yk5vZGUsXHJcblxyXG4gICAgQ3JlYXRlQXJyYXlOb2RlLFxyXG4gICAgQ3JlYXRlQXJyVmFyTm9kZSxcclxuXHJcbiAgICBSZXR1cm5PYmosXHJcblxyXG4gICAgQ3JlYXRlT2JqVmFyTm9kZSxcclxuICAgIENyZWF0ZU9iakZ1bk5vZGUsXHJcblxyXG4gICAgU2VudGVuY2VUZXJuYXJ5Tm9kZSxcclxuXHJcbiAgICBCcmVha05vZGUsXHJcbiAgICBDb250aW51ZU5vZGUsXHJcblxyXG4gICAgSWZOb2RlLFxyXG4gICAgV2hpbGVOb2RlLFxyXG4gICAgRG9XaGlsZU5vZGUsXHJcblxyXG4gICAgQ2FzZU5vZGUsXHJcbiAgICBTd2l0Y2hOb2RlLFxyXG5cclxuICAgIEZvckluTm9kZSxcclxuICAgIEZvck9mTm9kZSxcclxuICAgIEZvck5vZGUsXHJcblxyXG4gICAgQ3JlYXRlT2JqTm9kZSxcclxuICAgIE15TWFwLFxyXG5cclxuICAgIERlY2xhcmVUeXBlU3RydWN0dXJlTm9kZSxcclxuXHJcbiAgICBEZWNsYXJlRnVuTm9kZSxcclxuICAgIERlY2xhcmVGdW5QYXJhbU5vZGUsXHJcbiAgICBSZXR1cm5Ob2RlLFxyXG5cclxuICAgIEZ1bmN0aW9uQ2FsbE5vZGUsXHJcbiAgICBFcnJvcnNDb250cm9sLFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRXhlY3V0ZUFTVChzZW50ZW5jZXM6IEFycmF5PE9wPikge1xyXG4gICAgQ29uc29sZS5sb2cgPSAnJztcclxuICAgIE5vZGVzQ29udHJvbC5jbGVhclN0cnVjdHVyZXMoKTtcclxuICAgIFRTR3JhcGhDb250cm9sLmNsZWFyU3RydWN0dXJlcygpO1xyXG4gICAgT2JqZWN0c1N0cnVjdHVyZXMub2JqZWN0cyA9IG5ldyBNYXA8c3RyaW5nLCBPYmplY3RTdHJ1Y3R1cmU+KCk7XHJcbiAgICBjb25zdCBlbnYgPSBuZXcgRW52bW50KG51bGwsIHNlbnRlbmNlcyk7XHJcbiAgICBlbnYuR09fQUxMKCk7XHJcbiAgICBjb25zdCBncmFwaFN0cmluZyA9IFRTR3JhcGhDb250cm9sLkdldEdldEdyYXBoc1N0cmluZygpO1xyXG4gICAgaWYgKGdyYXBoU3RyaW5nICE9PSAnJykge1xyXG4gICAgICAgIGNvbnN0IHdpbiA9IHdpbmRvdy5vcGVuKCcuL2dyYXBoLmh0bWwjJyArIFRTR3JhcGhDb250cm9sLkdldEdldEdyYXBoc1N0cmluZygpLCAnX2JsYW5rJyk7XHJcbiAgICAgICAgaWYod2luICE9PSBudWxsKVxyXG4gICAgICAgICAgICB3aW4uZm9jdXMoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEdyYXBoQVNUKHNlbnRlbmNlczogQXJyYXk8T3A+KTogc3RyaW5nIHtcclxuICAgIGxldCBncmFwaCA9XHJcbiAgICAgICAgJ2RpZ3JhcGggRyB7XFxuJyArXHJcbiAgICAgICAgJyAgICAgICAgYmdjb2xvcj1cIiMxRTIyMkFcIlxcbicgK1xyXG4gICAgICAgICcgICAgICAgIG5vZGUgW2ZpbGxjb2xvcj1cIiMyRTM0NDBcIjsgc3R5bGU9ZmlsbGVkOyBmb250Y29sb3I9XCIjMkJCQkFEXCI7IGNvbG9yPVwiIzJCQkJBRFwiXTtcXG4nICtcclxuICAgICAgICAnICAgICAgICBlZGdlIFtjb2xvcj1cIiMyQkJCQURcIl07JztcclxuICAgIGNvbnN0IGVudiA9IG5ldyBFbnZtbnQobnVsbCwgc2VudGVuY2VzKTtcclxuICAgIGdyYXBoICs9IGVudi5HZXRHcmFwaCgpLnRvU3RyaW5nKCk7XHJcbiAgICBncmFwaCArPSAnfSc7XHJcbiAgICBjb25zb2xlLmxvZyhncmFwaCk7XHJcbiAgICByZXR1cm4gZ3JhcGg7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBUcmFuc2xhdGVTdHJpbmdzQ29tcG9zZSh0ZXh0OiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoL2AoW17Mo2BdKilgL2csICh0ZXh0KSA9PlxyXG4gICAgICAgIHRleHQucmVwbGFjZSgvYC9nLCAnXCInKS5yZXBsYWNlKC9cXCR7W159XSp9L2csICh0ZXh0KSA9PiBcIlxcXCIrXCIgKyB0ZXh0LnN1YnN0cmluZygyLCB0ZXh0Lmxlbmd0aCAtIDEpICsgXCIrXFxcIlwiKVxyXG4gICAgKTtcclxufVxyXG5cclxuaWYgKG1vZHVsZSAmJiBtb2R1bGUuaG90KSBtb2R1bGUuaG90LmFjY2VwdCgpO1xyXG4iLCJpbXBvcnQgeyBPcCB9IGZyb20gXCIuLi91dGlscy9PcFwiO1xyXG5pbXBvcnQge0Vudm1udH0gZnJvbSBcIi4uL3V0aWxzL0Vudm1udFwiO1xyXG5pbXBvcnQge0FuZH0gZnJvbSBcIi4uL3V0aWxzL0xvZ2ljYWxPcGVyYXRpb25zRnVuY3Rpb25zXCI7XHJcbmltcG9ydCB7Q250bnJ9IGZyb20gXCIuLi91dGlscy9DbnRuclwiO1xyXG5pbXBvcnQge0dyYXBodml6Tm9kZX0gZnJvbSBcIi4uL3V0aWxzL0dyYXBodml6Tm9kZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFuZE5vZGUgZXh0ZW5kcyBPcHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbGY6IE9wO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBydDogT3A7XHJcblxyXG4gICAgY29uc3RydWN0b3IocG9zaXRpb246IGFueSwgbGY6IE9wLCBydDogT3ApIHtcclxuICAgICAgICBzdXBlcihwb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5sZiA9IGxmO1xyXG4gICAgICAgIHRoaXMucnQgPSBydDtcclxuICAgIH1cclxuXHJcbiAgICBHTyhlbnY6IEVudm1udCk6IG9iamVjdCB7XHJcbiAgICAgICAgcmV0dXJuIEFuZCh0aGlzLmxmLkV4ZShlbnYpIGFzIENudG5yLCB0aGlzLnJ0LkV4ZShlbnYpIGFzIENudG5yLCB0aGlzLnBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRHcmFwaChlbnY6IEVudm1udCk6IEdyYXBodml6Tm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHcmFwaHZpek5vZGUoJ0FORCcsIFt0aGlzLmxmLkdldEdyYXBoKGVudiksIHRoaXMucnQuR2V0R3JhcGgoZW52KV0pO1xyXG4gICAgfVxyXG5cclxuICAgIEdldFRTR3JhcGgoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge09wfSBmcm9tIFwiLi4vdXRpbHMvT3BcIjtcclxuaW1wb3J0IHtFbnZtbnR9IGZyb20gXCIuLi91dGlscy9FbnZtbnRcIjtcclxuaW1wb3J0IHtSZWZlcmVuY2V9IGZyb20gXCIuLi91dGlscy9SZWZlcmVuY2VcIjtcclxuaW1wb3J0IHtTZW1hbnRpY0V4Y2VwdGlvbn0gZnJvbSBcIi4uL3V0aWxzL1V0aWxzXCI7XHJcbmltcG9ydCB7Q250bnJ9IGZyb20gXCIuLi91dGlscy9DbnRuclwiO1xyXG5pbXBvcnQge0dyYXBodml6Tm9kZX0gZnJvbSBcIi4uL3V0aWxzL0dyYXBodml6Tm9kZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFzaWduTm9kZSBleHRlbmRzIE9we1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBsZjogT3A7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJ0OiBPcDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogYW55LCBsZjogT3AsIHJ0OiBPcCkge1xyXG4gICAgICAgIHN1cGVyKHBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLmxmID0gbGY7XHJcbiAgICAgICAgdGhpcy5ydCA9IHJ0O1xyXG4gICAgfVxyXG5cclxuICAgIEdPKGVudjogRW52bW50KTogb2JqZWN0IHtcclxuICAgICAgICBjb25zdCBsZlZhbDogb2JqZWN0ID0gdGhpcy5sZi5FeGUoZW52KTtcclxuICAgICAgICBjb25zdCBydFZhbDogb2JqZWN0ID0gdGhpcy5ydC5FeGUoZW52KTtcclxuXHJcbiAgICAgICAgaWYgKCEobGZWYWwgaW5zdGFuY2VvZiBSZWZlcmVuY2UpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBTZW1hbnRpY0V4Y2VwdGlvbihgTm8gc2UgcHVlZGUgYXNpZ25hciBhICR7KGxmVmFsIGFzIENudG5yKS50eXBvfSwgbGFzIGFzaWduYWNpb25lcyBzb2xvIHB1ZWRlbiBzZXIgc29icmUgdW5hIHJlZmVyZW5jaWFgLCB0aGlzLnBvc2l0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKGxmVmFsIGFzIFJlZmVyZW5jZSkuUHV0VmFsdWVPblJlZmVyZW5jZShydFZhbCBhcyBDbnRucik7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0R3JhcGgoZW52OiBFbnZtbnQpOiBHcmFwaHZpek5vZGUge1xyXG4gICAgICAgIHJldHVybiBuZXcgR3JhcGh2aXpOb2RlKCdBU0lHJywgW3RoaXMubGYuR2V0R3JhcGgoZW52KSwgdGhpcy5ydC5HZXRHcmFwaChlbnYpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0VFNHcmFwaCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7T3B9IGZyb20gXCIuLi91dGlscy9PcFwiO1xyXG5pbXBvcnQge0Vudm1udH0gZnJvbSBcIi4uL3V0aWxzL0Vudm1udFwiO1xyXG5pbXBvcnQge0JPT0xFQU59IGZyb20gXCIuLi91dGlscy9QcmltaXRpdmVUeXBvQ29udGFpbmVyXCI7XHJcbmltcG9ydCB7R3JhcGh2aXpOb2RlfSBmcm9tIFwiLi4vdXRpbHMvR3JhcGh2aXpOb2RlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQm9vbGVhbk5vZGUgZXh0ZW5kcyBPcHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdmFsOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBhbnksIHZhbDogYm9vbGVhbikge1xyXG4gICAgICAgIHN1cGVyKHBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLnZhbCA9IHZhbDtcclxuICAgIH1cclxuXHJcbiAgICBHTyhlbnY6IEVudm1udCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgQk9PTEVBTih0aGlzLnZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0R3JhcGgoZW52OiBFbnZtbnQpOiBHcmFwaHZpek5vZGUge1xyXG4gICAgICAgIHJldHVybiBuZXcgR3JhcGh2aXpOb2RlKCdCT09MRUFOJywgW25ldyBHcmFwaHZpek5vZGUodGhpcy52YWwgKyAnJywgW10pXSk7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0VFNHcmFwaCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7T3B9IGZyb20gXCIuLi91dGlscy9PcFwiO1xyXG5pbXBvcnQge0Vudm1udH0gZnJvbSBcIi4uL3V0aWxzL0Vudm1udFwiO1xyXG5pbXBvcnQge0JyZWFrT2JqfSBmcm9tIFwiLi9CcmVha09ialwiO1xyXG5pbXBvcnQge0dyYXBodml6Tm9kZX0gZnJvbSBcIi4uL3V0aWxzL0dyYXBodml6Tm9kZVwiO1xyXG5cclxuZXhwb3J0ICBjbGFzcyBCcmVha05vZGUgZXh0ZW5kcyBPcHtcclxuICAgIEdPKGVudjogRW52bW50KTogb2JqZWN0IHtcclxuICAgICAgICByZXR1cm4gbmV3IEJyZWFrT2JqKCk7XHJcbiAgICB9XHJcbiAgICBHZXRHcmFwaChlbnY6IEVudm1udCk6IEdyYXBodml6Tm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHcmFwaHZpek5vZGUoJ0JSRUFLJywgW25ldyBHcmFwaHZpek5vZGUoJ2JyZWFrJyldKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRUU0dyYXBoKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtDbnRucn0gZnJvbSBcIi4uL3V0aWxzL0NudG5yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQnJlYWtPYmogZXh0ZW5kcyBDbnRucntcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge09wfSBmcm9tIFwiLi4vdXRpbHMvT3BcIjtcclxuaW1wb3J0IHtQb3NpdGlvbn0gZnJvbSBcIi4uL3V0aWxzL0Vycm9yc0NvbnRyb2xcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDYXNlTm9kZSB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvbmRpdGlvblZhbHVlOiBPcDtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2VudGVuY2VzOiBBcnJheTxPcD47XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHBvc2l0aW9uOiBQb3NpdGlvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogYW55LCBjb25kaXRpb25WYWx1ZTogT3AsIHNlbnRlbmNlczogQXJyYXk8T3A+KSB7XHJcbiAgICAgICAgdGhpcy5jb25kaXRpb25WYWx1ZSA9IGNvbmRpdGlvblZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VudGVuY2VzID0gc2VudGVuY2VzO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q29uZGl0aW9uVmFsdWUoKTogT3Age1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbmRpdGlvblZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTZW50ZW5jZXMoKTogQXJyYXk8T3A+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZW50ZW5jZXM7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge09wfSBmcm9tIFwiLi4vdXRpbHMvT3BcIjtcclxuaW1wb3J0IHtFbnZtbnR9IGZyb20gXCIuLi91dGlscy9FbnZtbnRcIjtcclxuaW1wb3J0IHtSZWZlcmVuY2V9IGZyb20gXCIuLi91dGlscy9SZWZlcmVuY2VcIjtcclxuaW1wb3J0IHtDb25zb2xlfSBmcm9tIFwiLi4vdXRpbHMvQ29uc29sZVwiO1xyXG5pbXBvcnQge0dyYXBodml6Tm9kZX0gZnJvbSBcIi4uL3V0aWxzL0dyYXBodml6Tm9kZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbnNvbGVMb2dOb2RlIGV4dGVuZHMgT3B7XHJcbiAgICBwcml2YXRlIGV4cHJlc3Npb246IEFycmF5PE9wPjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogYW55LCBleHByZXNzaW9uOiBBcnJheTxPcD4pIHtcclxuICAgICAgICBzdXBlcihwb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5leHByZXNzaW9uID0gZXhwcmVzc2lvbjtcclxuICAgIH1cclxuXHJcbiAgICBHTyhlbnY6IEVudm1udCkgOiBvYmplY3Qge1xyXG4gICAgICAgIGxldCBmaW5hbExvZyA9ICdbTE9HXTogJztcclxuICAgICAgICBmb3IobGV0IGV4cHJlc3Npb24gb2YgdGhpcy5leHByZXNzaW9uKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWwgPSBleHByZXNzaW9uLkV4ZShlbnYpO1xyXG4gICAgICAgICAgICBpZiAodmFsIGluc3RhbmNlb2YgUmVmZXJlbmNlKSB7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSAodmFsIGFzIFJlZmVyZW5jZSkuZ2V0VmFsdWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmaW5hbExvZyArPSBgJHt2YWx9IGA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIENvbnNvbGUubG9nICs9IGAke2ZpbmFsTG9nfVxcbmA7XHJcbiAgICAgICAgY29uc29sZS5sb2coYCR7ZmluYWxMb2d9YCk7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIEdldEdyYXBoKGVudjogRW52bW50KTogR3JhcGh2aXpOb2RlIHtcclxuICAgICAgICByZXR1cm4gbmV3IEdyYXBodml6Tm9kZSgnQ09OU09MRS5MT0cnLCB0aGlzLmV4cHJlc3Npb24ubWFwKGV4cHJlc3Npb24gPT4gZXhwcmVzc2lvbi5HZXRHcmFwaChlbnYpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0VFNHcmFwaCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7T3B9IGZyb20gXCIuLi91dGlscy9PcFwiO1xyXG5pbXBvcnQge0Vudm1udH0gZnJvbSBcIi4uL3V0aWxzL0Vudm1udFwiO1xyXG5pbXBvcnQge0NvbnRpbnVlT2JqfSBmcm9tIFwiLi9Db250aW51ZU9ialwiO1xyXG5pbXBvcnQge0dyYXBodml6Tm9kZX0gZnJvbSBcIi4uL3V0aWxzL0dyYXBodml6Tm9kZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbnRpbnVlTm9kZSBleHRlbmRzIE9we1xyXG4gICAgR08oZW52OiBFbnZtbnQpOiBvYmplY3Qge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29udGludWVPYmooKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRHcmFwaChlbnY6IEVudm1udCk6IEdyYXBodml6Tm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHcmFwaHZpek5vZGUoJ0NPTlRJTlVFJywgW25ldyBHcmFwaHZpek5vZGUoJ2NvbnRpbnVlJyldKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRUU0dyYXBoKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtDbnRucn0gZnJvbSBcIi4uL3V0aWxzL0NudG5yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29udGludWVPYmogZXh0ZW5kcyBDbnRucntcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge09wfSBmcm9tIFwiLi4vdXRpbHMvT3BcIjtcclxuaW1wb3J0IHtFbnZtbnR9IGZyb20gXCIuLi91dGlscy9FbnZtbnRcIjtcclxuaW1wb3J0IHtDbnRucn0gZnJvbSBcIi4uL3V0aWxzL0NudG5yXCI7XHJcbmltcG9ydCB7UmVmZXJlbmNlfSBmcm9tIFwiLi4vdXRpbHMvUmVmZXJlbmNlXCI7XHJcbmltcG9ydCB7U2VtYW50aWNFeGNlcHRpb259IGZyb20gXCIuLi91dGlscy9VdGlsc1wiO1xyXG5pbXBvcnQge0FSUkFZLCBOVU1CRVIsIFNUUklORywgVU5ERUZJTkVEfSBmcm9tIFwiLi4vdXRpbHMvUHJpbWl0aXZlVHlwb0NvbnRhaW5lclwiO1xyXG5pbXBvcnQge0dyYXBodml6Tm9kZX0gZnJvbSBcIi4uL3V0aWxzL0dyYXBodml6Tm9kZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENyZWF0ZUFyclZhck5vZGUgZXh0ZW5kcyBPcCB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGlkOiBPcDtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgaW5kZXg6IE9wO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBhbnksIGlkOiBPcCwgaW5kZXg6IE9wKSB7XHJcbiAgICAgICAgc3VwZXIocG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgR08oZW52OiBFbnZtbnQpOiBvYmplY3Qge1xyXG4gICAgICAgIGxldCBpZFJlZiA9IHRoaXMuaWQuRXhlKGVudikgYXMgQ250bnI7XHJcbiAgICAgICAgLy8gaWYgKCEoaWRSZWYgaW5zdGFuY2VvZiBSZWZlcmVuY2UpKSB7XHJcbiAgICAgICAgLy8gICAgIHRocm93IG5ldyBTZW1hbnRpY0V4Y2VwdGlvbihgTGxhbWFkYSBhIEFycmVnbG8gJHtpZFJlZn0gbm8gZGVmaW5pZG8uYCk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmluZGV4LkV4ZShlbnYpIGFzIENudG5yO1xyXG4gICAgICAgIGlmIChpbmRleCBpbnN0YW5jZW9mIFJlZmVyZW5jZSkge1xyXG4gICAgICAgICAgICBpbmRleCA9IChpbmRleCBhcyBSZWZlcmVuY2UpLmdldFZhbHVlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaW5kZXggaW5zdGFuY2VvZiBTVFJJTkcpIHtcclxuICAgICAgICAgICAgY29uc3QgdmFsID0gcGFyc2VJbnQoKGluZGV4IGFzIFNUUklORykuZ2V0VmFsdWUoKSk7XHJcbiAgICAgICAgICAgIGlmIChpc05hTih2YWwpKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU2VtYW50aWNFeGNlcHRpb24oXCJFbCBpbmRpY2UgcGFyYSBhY2Nlc2FyIGRlYmUgc2VyIGRlIHRpcG8gTlVNQkVSXCIsIHRoaXMucG9zaXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGluZGV4ID0gbmV3IE5VTUJFUih2YWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCEoaW5kZXggaW5zdGFuY2VvZiBOVU1CRVIpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBTZW1hbnRpY0V4Y2VwdGlvbihcIkVsIGluZGljZSBwYXJhIGFjY2VzYXIgZGViZSBzZXIgZGUgdGlwbyBOVU1CRVJcIiwgdGhpcy5wb3NpdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcmVmID0gaWRSZWYgaW5zdGFuY2VvZiBSZWZlcmVuY2UgPyAoaWRSZWYgYXMgUmVmZXJlbmNlKS5nZXRWYWx1ZSgpIDogaWRSZWY7XHJcblxyXG4gICAgICAgIGlmICghKHJlZiBpbnN0YW5jZW9mIEFSUkFZKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFVOREVGSU5FRCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIChyZWYgYXMgQVJSQVkpLmdldFZhbHVlKChpbmRleCBhcyBOVU1CRVIpLmdldFZhbHVlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIEdldEdyYXBoKGVudjogRW52bW50KTogR3JhcGh2aXpOb2RlIHtcclxuICAgICAgICByZXR1cm4gbmV3IEdyYXBodml6Tm9kZSgnQVJSX0VMRU1FTlQnLCBbdGhpcy5pZC5HZXRHcmFwaChlbnYpLCB0aGlzLmluZGV4LkdldEdyYXBoKGVudildKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRUU0dyYXBoKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgT3AgfSBmcm9tIFwiLi4vdXRpbHMvT3BcIjtcclxuaW1wb3J0IHtFbnZtbnR9IGZyb20gXCIuLi91dGlscy9FbnZtbnRcIjtcclxuaW1wb3J0IHtDbnRucn0gZnJvbSBcIi4uL3V0aWxzL0NudG5yXCI7XHJcbmltcG9ydCB7UmVmZXJlbmNlfSBmcm9tIFwiLi4vdXRpbHMvUmVmZXJlbmNlXCI7XHJcbmltcG9ydCB7QVJSQVl9IGZyb20gXCIuLi91dGlscy9QcmltaXRpdmVUeXBvQ29udGFpbmVyXCI7XHJcbmltcG9ydCB7R3JhcGh2aXpOb2RlfSBmcm9tIFwiLi4vdXRpbHMvR3JhcGh2aXpOb2RlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ3JlYXRlQXJyYXlOb2RlIGV4dGVuZHMgT3B7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHZhbHM6IEFycmF5PE9wPjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogYW55LCB2YWxzOiBBcnJheTxPcD4pIHtcclxuICAgICAgICBzdXBlcihwb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy52YWxzID0gdmFscztcclxuICAgIH1cclxuXHJcbiAgICBHTyhlbnY6IEVudm1udCk6IG9iamVjdCB7XHJcbiAgICAgICAgbGV0IHJlYWwgPSBuZXcgQXJyYXk8Q250bnI+KCk7XHJcbiAgICAgICAgZm9yIChsZXQgb3Agb2YgdGhpcy52YWxzKSB7XHJcbiAgICAgICAgICAgIGxldCByZWZlcmVuY2UgPSBuZXcgUmVmZXJlbmNlKCk7XHJcbiAgICAgICAgICAgIHJlZmVyZW5jZS5QdXRWYWx1ZU9uUmVmZXJlbmNlKG9wLkV4ZShlbnYpIGFzIENudG5yKTtcclxuICAgICAgICAgICAgcmVhbC5wdXNoKHJlZmVyZW5jZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgQVJSQVkocmVhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0R3JhcGgoZW52OiBFbnZtbnQpOiBHcmFwaHZpek5vZGUge1xyXG4gICAgICAgIHJldHVybiBuZXcgR3JhcGh2aXpOb2RlKCdBUlJBWScsIHRoaXMudmFscy5tYXAodmFsID0+IHZhbC5HZXRHcmFwaChlbnYpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0VFNHcmFwaCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7T3B9IGZyb20gXCIuLi91dGlscy9PcFwiO1xyXG5pbXBvcnQge0Vudm1udH0gZnJvbSBcIi4uL3V0aWxzL0Vudm1udFwiO1xyXG5pbXBvcnQge0ZpbmRWYXJ9IGZyb20gXCIuLi91dGlscy9VdGlsc1wiO1xyXG5pbXBvcnQge0dyYXBodml6Tm9kZX0gZnJvbSBcIi4uL3V0aWxzL0dyYXBodml6Tm9kZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENyZWF0ZUlkVmFyTm9kZSBleHRlbmRzIE9we1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBpZDogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBhbnksIGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihwb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgfVxyXG5cclxuICAgIEdPKGVudjogRW52bW50KSA6IG9iamVjdHtcclxuICAgICAgICByZXR1cm4gRmluZFZhcihlbnYsIHRoaXMuaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIEdldEdyYXBoKGVudjogRW52bW50KTogR3JhcGh2aXpOb2RlIHtcclxuICAgICAgICByZXR1cm4gbmV3IEdyYXBodml6Tm9kZSgnVkFSJywgW25ldyBHcmFwaHZpek5vZGUodGhpcy5pZCldKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRUU0dyYXBoKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtPcH0gZnJvbSBcIi4uL3V0aWxzL09wXCI7XHJcbmltcG9ydCB7IEVudm1udCB9IGZyb20gXCIuLi91dGlscy9FbnZtbnRcIjtcclxuaW1wb3J0IHtSZWZlcmVuY2V9IGZyb20gXCIuLi91dGlscy9SZWZlcmVuY2VcIjtcclxuaW1wb3J0IHtDbnRucn0gZnJvbSBcIi4uL3V0aWxzL0NudG5yXCI7XHJcbmltcG9ydCB7RnVuY3Rpb25SZXByZXNlbnR9IGZyb20gXCIuLi91dGlscy9mdW5jdGlvbnMvRnVuY3Rpb25SZXByZXNlbnRcIjtcclxuaW1wb3J0IHtSZXR1cm5PYmp9IGZyb20gXCIuL1JldHVybk9ialwiO1xyXG5pbXBvcnQge0dyYXBodml6Tm9kZX0gZnJvbSBcIi4uL3V0aWxzL0dyYXBodml6Tm9kZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENyZWF0ZU9iakZ1bk5vZGUgZXh0ZW5kcyBPcHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgb2JqZWN0OiBPcDtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZnVuSWQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgYXJnczogQXJyYXk8T3A+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBhbnksIG9iamVjdDogT3AsIGZ1bklkOiBzdHJpbmcsIGFyZ3M6IEFycmF5PE9wPikge1xyXG4gICAgICAgIHN1cGVyKHBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLm9iamVjdCA9IG9iamVjdDtcclxuICAgICAgICB0aGlzLmZ1bklkID0gZnVuSWQ7XHJcbiAgICAgICAgdGhpcy5hcmdzID0gYXJncztcclxuICAgIH1cclxuXHJcbiAgICBHTyhlbnY6IEVudm1udCk6IG9iamVjdCB7XHJcbiAgICAgICAgbGV0IHJlZmUgPSB0aGlzLm9iamVjdC5FeGUoZW52KTtcclxuICAgICAgICBpZiAocmVmZSBpbnN0YW5jZW9mIFJlZmVyZW5jZSkge1xyXG4gICAgICAgICAgICByZWZlID0gKHJlZmUgYXMgUmVmZXJlbmNlKS5nZXRWYWx1ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGZ1biA9IChyZWZlIGFzIENudG5yKS5HZXRQcm9wZXJ0eSh0aGlzLmZ1bklkKTtcclxuICAgICAgICBpZiAoIShmdW4gaW5zdGFuY2VvZiBGdW5jdGlvblJlcHJlc2VudCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCByZWZlcmVuY2VzID0gbmV3IEFycmF5PENudG5yPigpO1xyXG4gICAgICAgIGZvciAobGV0IGFyZyBvZiB0aGlzLmFyZ3MpIHtcclxuICAgICAgICAgICAgbGV0IGFyZ1ZhbHVlID0gYXJnLkV4ZShlbnYpO1xyXG4gICAgICAgICAgICBpZiAoYXJnVmFsdWUgaW5zdGFuY2VvZiBSZWZlcmVuY2UpIHtcclxuICAgICAgICAgICAgICAgIGFyZ1ZhbHVlID0gKGFyZ1ZhbHVlIGFzIFJlZmVyZW5jZSkuZ2V0VmFsdWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZWZlcmVuY2VzLnB1c2goYXJnVmFsdWUgYXMgQ250bnIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFucyA9IGZ1bi5FWEUoZW52LCByZWZlcmVuY2VzKTtcclxuICAgICAgICBpZiAoYW5zIGluc3RhbmNlb2YgUmV0dXJuT2JqKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoYW5zIGFzIFJldHVybk9iaikuZ2V0VmFsdWUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0R3JhcGgoZW52OiBFbnZtbnQpOiBHcmFwaHZpek5vZGUge1xyXG4gICAgICAgIHJldHVybiBuZXcgR3JhcGh2aXpOb2RlKCdGVU5DVElPTicsIFt0aGlzLm9iamVjdC5HZXRHcmFwaChlbnYpLCBuZXcgR3JhcGh2aXpOb2RlKHRoaXMuZnVuSWQpLCBuZXcgR3JhcGh2aXpOb2RlKCdBUkdTJywgdGhpcy5hcmdzLm1hcChhcmcgPT4gYXJnLkdldEdyYXBoKGVudikpKV0pO1xyXG4gICAgfVxyXG5cclxuICAgIEdldFRTR3JhcGgoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge09wfSBmcm9tIFwiLi4vdXRpbHMvT3BcIjtcclxuaW1wb3J0IHtFbnZtbnR9IGZyb20gXCIuLi91dGlscy9FbnZtbnRcIjtcclxuaW1wb3J0IHtDbnRucn0gZnJvbSBcIi4uL3V0aWxzL0NudG5yXCI7XHJcbmltcG9ydCB7UmVmZXJlbmNlfSBmcm9tIFwiLi4vdXRpbHMvUmVmZXJlbmNlXCI7XHJcbmltcG9ydCB7T0JKRUNUfSBmcm9tIFwiLi4vdXRpbHMvUHJpbWl0aXZlVHlwb0NvbnRhaW5lclwiO1xyXG5pbXBvcnQge0dyYXBodml6Tm9kZX0gZnJvbSBcIi4uL3V0aWxzL0dyYXBodml6Tm9kZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENyZWF0ZU9iak5vZGUgZXh0ZW5kcyBPcCB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGF0dHJzOiBNYXA8c3RyaW5nLCBPcD47XHJcblxyXG4gICAgY29uc3RydWN0b3IocG9zaXRpb246IGFueSwgYXR0cnM6IE1hcDxzdHJpbmcsIE9wPikge1xyXG4gICAgICAgIHN1cGVyKHBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLmF0dHJzID0gYXR0cnM7XHJcbiAgICB9XHJcblxyXG4gICAgR08oZW52OiBFbnZtbnQpOiBvYmplY3Qge1xyXG4gICAgICAgIGNvbnN0IHJlYWw6IE1hcDxzdHJpbmcsIENudG5yPiA9IG5ldyBNYXA8c3RyaW5nLCBDbnRucj4oKTtcclxuICAgICAgICB0aGlzLmF0dHJzLmZvckVhY2goKHYsIGspID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gdi5FeGUoZW52KTtcclxuICAgICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgUmVmZXJlbmNlKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9ICh2YWx1ZSBhcyBSZWZlcmVuY2UpLmdldFZhbHVlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgcmVmZXJlbmNlID0gbmV3IFJlZmVyZW5jZSgpO1xyXG4gICAgICAgICAgICByZWZlcmVuY2UuUHV0VmFsdWVPblJlZmVyZW5jZSh2YWx1ZSBhcyBDbnRucik7XHJcbiAgICAgICAgICAgIHJlYWwuc2V0KGssIHJlZmVyZW5jZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBPQkpFQ1QocmVhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0R3JhcGgoZW52OiBFbnZtbnQpOiBHcmFwaHZpek5vZGUge1xyXG4gICAgICAgIGxldCB2YWx1ZXM6IEdyYXBodml6Tm9kZVtdID0gW107XHJcbiAgICAgICAgdGhpcy5hdHRycy5mb3JFYWNoKCh2LCBrKSA9PiB7XHJcbiAgICAgICAgICAgIHZhbHVlcy5wdXNoKG5ldyBHcmFwaHZpek5vZGUoaykpO1xyXG4gICAgICAgICAgICB2YWx1ZXMucHVzaCh2LkdldEdyYXBoKGVudikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBuZXcgR3JhcGh2aXpOb2RlKCdUWVBFX1ZBTFVFJywgdmFsdWVzKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRUU0dyYXBoKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtPcH0gZnJvbSBcIi4uL3V0aWxzL09wXCI7XHJcbmltcG9ydCB7RW52bW50fSBmcm9tIFwiLi4vdXRpbHMvRW52bW50XCI7XHJcbmltcG9ydCB7Q250bnJ9IGZyb20gXCIuLi91dGlscy9DbnRuclwiO1xyXG5pbXBvcnQge1JlZmVyZW5jZX0gZnJvbSBcIi4uL3V0aWxzL1JlZmVyZW5jZVwiO1xyXG5pbXBvcnQge1NlbWFudGljRXhjZXB0aW9ufSBmcm9tIFwiLi4vdXRpbHMvVXRpbHNcIjtcclxuaW1wb3J0IHtGdW5jdGlvblJlcHJlc2VudH0gZnJvbSBcIi4uL3V0aWxzL2Z1bmN0aW9ucy9GdW5jdGlvblJlcHJlc2VudFwiO1xyXG5pbXBvcnQge1JldHVybk9ian0gZnJvbSBcIi4vUmV0dXJuT2JqXCI7XHJcbmltcG9ydCB7R3JhcGh2aXpOb2RlfSBmcm9tIFwiLi4vdXRpbHMvR3JhcGh2aXpOb2RlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ3JlYXRlT2JqVmFyTm9kZSBleHRlbmRzIE9we1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBpZDogT3A7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGF0dHI6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogYW55LCBpZDogT3AsIGF0dHI6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKHBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5hdHRyID0gYXR0cjtcclxuICAgIH1cclxuXHJcbiAgICBHTyhlbnY6IEVudm1udCk6IG9iamVjdCB7XHJcbiAgICAgICAgbGV0IGlkID0gdGhpcy5pZC5FeGUoZW52KSBhcyBDbnRucjtcclxuICAgICAgICBpZiAoIShpZCBpbnN0YW5jZW9mIFJlZmVyZW5jZSkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFNlbWFudGljRXhjZXB0aW9uKFwiTGxhbWFkYSBhIE9iamV0byBubyBkZWZpbmlkb1wiLCB0aGlzLnBvc2l0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByZWYgPSAoaWQgYXMgUmVmZXJlbmNlKS5nZXRWYWx1ZSgpO1xyXG4gICAgICAgIGxldCBlID0gcmVmLkdldFByb3BlcnR5KHRoaXMuYXR0cik7XHJcbiAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBGdW5jdGlvblJlcHJlc2VudCkge1xyXG4gICAgICAgICAgICBsZXQgYW5zID0gZS5FWEUoZW52LCBuZXcgQXJyYXk8Q250bnI+KCkpO1xyXG4gICAgICAgICAgICBpZiAoYW5zIGluc3RhbmNlb2YgUmV0dXJuT2JqKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKGFucyBhcyBSZXR1cm5PYmopLmdldFZhbHVlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZWYuR2V0UHJvcGVydHkodGhpcy5hdHRyKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRHcmFwaChlbnY6IEVudm1udCk6IEdyYXBodml6Tm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHcmFwaHZpek5vZGUoJ1RZUEVfTUVNQkVSJywgW3RoaXMuaWQuR2V0R3JhcGgoZW52KSwgbmV3IEdyYXBodml6Tm9kZSh0aGlzLmF0dHIpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0VFNHcmFwaCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7T3B9IGZyb20gXCIuLi91dGlscy9PcFwiO1xyXG5pbXBvcnQge0Vudm1udH0gZnJvbSBcIi4uL3V0aWxzL0Vudm1udFwiO1xyXG5pbXBvcnQge1VzZXJEZWZpbmVkfSBmcm9tIFwiLi4vdXRpbHMvZnVuY3Rpb25zL1VzZXJEZWZpbmVkXCI7XHJcbmltcG9ydCB7UmVmZXJlbmNlfSBmcm9tIFwiLi4vdXRpbHMvUmVmZXJlbmNlXCI7XHJcbmltcG9ydCB7R3JhcGh2aXpOb2RlfSBmcm9tIFwiLi4vdXRpbHMvR3JhcGh2aXpOb2RlXCI7XHJcbmltcG9ydCB7VFNHcmFwaENvbnRyb2x9IGZyb20gXCIuLi91dGlscy9UU0dyYXBoQ29udHJvbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERlY2xhcmVGdW5Ob2RlIGV4dGVuZHMgT3B7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgcGFyYW1zOiBBcnJheTxPcD47XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNlbnRlbmNlczogQXJyYXk8T3A+O1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSB0eXBlOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IocG9zaXRpb246IGFueSwgbmFtZTogc3RyaW5nLCBwYXJhbXM6IEFycmF5PE9wPiwgc2VudGVuY2VzOiBBcnJheTxPcD4sIHR5cGUgPSAnQU5ZJykge1xyXG4gICAgICAgIHN1cGVyKHBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xyXG4gICAgICAgIHRoaXMuc2VudGVuY2VzID0gc2VudGVuY2VzO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgR08oZW52OiBFbnZtbnQpOiBvYmplY3Qge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gbmV3IFVzZXJEZWZpbmVkKHRoaXMuc2VudGVuY2VzLCB0aGlzLnBhcmFtcywgdGhpcy50eXBlKTtcclxuICAgICAgICBjb25zdCByZWZlcmVuY2UgPSBuZXcgUmVmZXJlbmNlKCk7XHJcbiAgICAgICAgcmVmZXJlbmNlLlB1dFZhbHVlT25SZWZlcmVuY2UodmFsdWUpO1xyXG4gICAgICAgIGlmKHRoaXMubmFtZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBlbnYuRGVjbGFyZSh0aGlzLm5hbWUsIHJlZmVyZW5jZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRHcmFwaChlbnY6IEVudm1udCk6IEdyYXBodml6Tm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHcmFwaHZpek5vZGUoJ05FV19GVU4nLCBbXHJcbiAgICAgICAgICAgIG5ldyBHcmFwaHZpek5vZGUodGhpcy5uYW1lKSxcclxuICAgICAgICAgICAgbmV3IEdyYXBodml6Tm9kZSh0aGlzLnR5cGUpLFxyXG4gICAgICAgICAgICBuZXcgR3JhcGh2aXpOb2RlKCdQQVJBTVMnLCB0aGlzLnBhcmFtcy5tYXAocGFyYW0gPT4gcGFyYW0uR2V0R3JhcGgoZW52KSkpLFxyXG4gICAgICAgICAgICBuZXcgR3JhcGh2aXpOb2RlKCdORVdfRlVOX0JPRFknLCB0aGlzLnNlbnRlbmNlcy5tYXAoc2VudGVuY2UgPT4gc2VudGVuY2UuR2V0R3JhcGgoZW52KSkpXHJcbiAgICAgICAgXSk7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0VFNHcmFwaCgpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCB2YWx1ZSA9ICcnO1xyXG4gICAgICAgIGNvbnN0IGdyYXBoSWQgPSBUU0dyYXBoQ29udHJvbC5HZXRHcmFwaElkKCk7XHJcbiAgICAgICAgdmFsdWUgKz0gYHN1YmdyYXBoIGNsdXN0ZXJfJHtncmFwaElkfSB7IFxcbmA7XHJcbiAgICAgICAgdmFsdWUgKz0gJ3N0eWxlPWZpbGxlZDtcXG4nICtcclxuICAgICAgICAgICAgJ2NvbG9yPVwiIzJCQkJBRFwiO1xcbicgK1xyXG4gICAgICAgICAgICAnZmlsbGNvbG9yPVwiIzFFMjIyQVwiO1xcbic7XHJcbiAgICAgICAgdmFsdWUgKz0gJ25vZGUgW2NvbG9yPVwiIzJCQkJBRFwiIGZvbnRjb2xvcj1cIiMyQkJCQURcIiBzaGFwZT1cInJlY3RhbmdsZVwiXSBcXG4nO1xyXG4gICAgICAgIHRoaXMuc2VudGVuY2VzLmZvckVhY2goc2VudGVuY2UgPT4ge1xyXG4gICAgICAgICAgICB2YWx1ZSArPSBzZW50ZW5jZS5HZXRUU0dyYXBoKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMuZm9yRWFjaChwYXJhbSA9PiB7XHJcbiAgICAgICAgICAgIHZhbHVlICs9IHBhcmFtLkdldFRTR3JhcGgoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB2YWx1ZSArPSBgbGFiZWwgPSBcIiR7dGhpcy5uYW1lfVwiO1xcbmA7XHJcbiAgICAgICAgdmFsdWUgKz0gYH1cXG5gO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge09wfSBmcm9tIFwiLi4vdXRpbHMvT3BcIjtcclxuaW1wb3J0IHtFbnZtbnR9IGZyb20gXCIuLi91dGlscy9FbnZtbnRcIjtcclxuaW1wb3J0IHtVTkRFRklORUR9IGZyb20gXCIuLi91dGlscy9QcmltaXRpdmVUeXBvQ29udGFpbmVyXCI7XHJcbmltcG9ydCB7UmVmZXJlbmNlfSBmcm9tIFwiLi4vdXRpbHMvUmVmZXJlbmNlXCI7XHJcbmltcG9ydCB7R3JhcGh2aXpOb2RlfSBmcm9tIFwiLi4vdXRpbHMvR3JhcGh2aXpOb2RlXCI7XHJcbmltcG9ydCB7VFNHcmFwaENvbnRyb2x9IGZyb20gXCIuLi91dGlscy9UU0dyYXBoQ29udHJvbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERlY2xhcmVGdW5QYXJhbU5vZGUgZXh0ZW5kcyBPcHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbmFtZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSB0eXBlOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IocG9zaXRpb246IGFueSwgbmFtZTogc3RyaW5nLCB0eXBlID0gJ0FOWScpIHtcclxuICAgICAgICBzdXBlcihwb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlLnRvVXBwZXJDYXNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0TmFtZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5uYW1lLnRvVXBwZXJDYXNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgR08oZW52OiBFbnZtbnQpOiBvYmplY3Qge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gbmV3IFVOREVGSU5FRCgpO1xyXG4gICAgICAgIGNvbnN0IHJlZmVyZW5jZSA9IG5ldyBSZWZlcmVuY2UodGhpcy50eXBlKTtcclxuICAgICAgICByZWZlcmVuY2UuUHV0VmFsdWVPblJlZmVyZW5jZSh2YWx1ZSk7XHJcbiAgICAgICAgZW52LkRlY2xhcmUodGhpcy5uYW1lLCByZWZlcmVuY2UpO1xyXG4gICAgICAgIHJldHVybiByZWZlcmVuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0R3JhcGgoZW52OiBFbnZtbnQpOiBHcmFwaHZpek5vZGUge1xyXG4gICAgICAgIHJldHVybiBuZXcgR3JhcGh2aXpOb2RlKCdORVdfRlVOX1BBUkFNJywgW25ldyBHcmFwaHZpek5vZGUodGhpcy5uYW1lKSwgbmV3IEdyYXBodml6Tm9kZSh0aGlzLnR5cGUpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0VFNHcmFwaCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBgbiR7VFNHcmFwaENvbnRyb2wuR2V0Tm9kZUlkKCl9IFtsYWJlbD1cIiR7dGhpcy5uYW1lfVwiXVxcbmA7O1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7T3B9IGZyb20gXCIuLi91dGlscy9PcFwiO1xyXG5pbXBvcnQge0Vudm1udH0gZnJvbSBcIi4uL3V0aWxzL0Vudm1udFwiO1xyXG5pbXBvcnQge015TWFwLCBPYmplY3RzU3RydWN0dXJlcywgT2JqZWN0U3RydWN0dXJlfSBmcm9tIFwiLi4vdXRpbHMvVXRpbHNcIjtcclxuaW1wb3J0IHtHcmFwaHZpek5vZGV9IGZyb20gXCIuLi91dGlscy9HcmFwaHZpek5vZGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBEZWNsYXJlVHlwZVN0cnVjdHVyZU5vZGUgZXh0ZW5kcyBPcHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbmFtZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBwcm9wZXJ0aWVzOiBNYXA8c3RyaW5nLCBzdHJpbmc+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBhbnksIG5hbWU6IHN0cmluZywgcHJvcGVydGllczogTXlNYXApIHtcclxuICAgICAgICBzdXBlcihwb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSAocHJvcGVydGllcyBhcyBNeU1hcCkuZ2V0TWFwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgR08oZW52OiBFbnZtbnQpOiBvYmplY3Qge1xyXG4gICAgICAgIGNvbnN0IHN0cnVjdHVyZSA9IG5ldyBPYmplY3RTdHJ1Y3R1cmUodGhpcy5wcm9wZXJ0aWVzKTtcclxuICAgICAgICBPYmplY3RzU3RydWN0dXJlcy5vYmplY3RzLnNldCh0aGlzLm5hbWUudG9VcHBlckNhc2UoKSwgc3RydWN0dXJlKTtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIEdldEdyYXBoKGVudjogRW52bW50KTogR3JhcGh2aXpOb2RlIHtcclxuICAgICAgICBsZXQgdmFsdWVzOiBHcmFwaHZpek5vZGVbXSA9IFtdO1xyXG4gICAgICAgIHRoaXMucHJvcGVydGllcy5mb3JFYWNoKCh2LCBrKSA9PiB7XHJcbiAgICAgICAgICAgIHZhbHVlcy5wdXNoKG5ldyBHcmFwaHZpek5vZGUoaykpO1xyXG4gICAgICAgICAgICB2YWx1ZXMucHVzaChuZXcgR3JhcGh2aXpOb2RlKHYpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbmV3IEdyYXBodml6Tm9kZSgnTkVXX1RZUEUnLCBbbmV3IEdyYXBodml6Tm9kZSh0aGlzLm5hbWUpLCBuZXcgR3JhcGh2aXpOb2RlKCdWQUxVRVMnLCB2YWx1ZXMpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0VFNHcmFwaCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7T3B9IGZyb20gXCIuLi91dGlscy9PcFwiO1xyXG5pbXBvcnQge0Vudm1udH0gZnJvbSBcIi4uL3V0aWxzL0Vudm1udFwiO1xyXG5pbXBvcnQge0RlY2xhcmVWYXJOb2RlfSBmcm9tIFwiLi9EZWNsYXJlVmFyTm9kZVwiO1xyXG5pbXBvcnQge0NudG5yfSBmcm9tIFwiLi4vdXRpbHMvQ250bnJcIjtcclxuaW1wb3J0IHtVTkRFRklORUR9IGZyb20gXCIuLi91dGlscy9QcmltaXRpdmVUeXBvQ29udGFpbmVyXCI7XHJcbmltcG9ydCB7R3JhcGh2aXpOb2RlfSBmcm9tIFwiLi4vdXRpbHMvR3JhcGh2aXpOb2RlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGVjbGFyZVZhckxpc3ROb2RlIGV4dGVuZHMgT3Age1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSB0aXBvTm9tYnJlOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHZhbHVlOiBPcDtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZGVjbGFyYXRpb25PcHM6IEFycmF5PE9wPjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgaXNDb25zdDogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogYW55LCB0aXBvTm9tYnJlOiBzdHJpbmcsIGRlY2xhcmF0aW9uT3BzOiBBcnJheTxPcD4sIHZhbHVlPzogT3AsIGlzQ29uc3Q6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIHN1cGVyKHBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLnRpcG9Ob21icmUgPSB0aXBvTm9tYnJlO1xyXG4gICAgICAgIHRoaXMuZGVjbGFyYXRpb25PcHMgPSBkZWNsYXJhdGlvbk9wcztcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWUgfHwgbnVsbDtcclxuICAgICAgICB0aGlzLmlzQ29uc3QgPSBpc0NvbnN0O1xyXG4gICAgfVxyXG5cclxuICAgIEdPKGVudjogRW52bW50KTogb2JqZWN0IHtcclxuICAgICAgICBmb3IgKGxldCBvcCBvZiB0aGlzLmRlY2xhcmF0aW9uT3BzKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52YWx1ZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIChvcCBhcyBEZWNsYXJlVmFyTm9kZSkuQWRkVmFsdWUodGhpcy52YWx1ZS5FeGUoZW52KSBhcyBDbnRuciwgdGhpcy5pc0NvbnN0LCB0aGlzLnRpcG9Ob21icmUpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgKG9wIGFzIERlY2xhcmVWYXJOb2RlKS5BZGRWYWx1ZShuZXcgVU5ERUZJTkVEKCksIHRoaXMuaXNDb25zdCwgdGhpcy50aXBvTm9tYnJlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG9wLkV4ZShlbnYpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIEdldEdyYXBoKGVudjogRW52bW50KTogR3JhcGh2aXpOb2RlIHtcclxuICAgICAgICByZXR1cm4gbmV3IEdyYXBodml6Tm9kZSgnREVDTEFSRV9WQVJfTElTVCcsIFtuZXcgR3JhcGh2aXpOb2RlKHRoaXMudGlwb05vbWJyZT8gdGhpcy50aXBvTm9tYnJlOiAnQU5ZJyksIHRoaXMudmFsdWUgPT09IG51bGwgPyBuZXcgR3JhcGh2aXpOb2RlKCdVTkRFRklORUQnKSA6IHRoaXMudmFsdWUuR2V0R3JhcGgoZW52KV1cclxuICAgICAgICAgICAgLmNvbmNhdCh0aGlzLmRlY2xhcmF0aW9uT3BzLm1hcChvcCA9PiBvcC5HZXRHcmFwaChlbnYpKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIEdldFRTR3JhcGgoKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgdmFsID0gJyc7XHJcbiAgICAgICAgdGhpcy5kZWNsYXJhdGlvbk9wcy5mb3JFYWNoKGRlY2xhcmUgPT4ge1xyXG4gICAgICAgICAgICB2YWwgKz0gZGVjbGFyZS5HZXRUU0dyYXBoKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge09wfSBmcm9tIFwiLi4vdXRpbHMvT3BcIjtcclxuaW1wb3J0IHtDbnRucn0gZnJvbSAnLi4vdXRpbHMvQ250bnInO1xyXG5pbXBvcnQge0Vudm1udH0gZnJvbSBcIi4uL3V0aWxzL0Vudm1udFwiO1xyXG5pbXBvcnQge1VOREVGSU5FRH0gZnJvbSBcIi4uL3V0aWxzL1ByaW1pdGl2ZVR5cG9Db250YWluZXJcIjtcclxuaW1wb3J0IHtSZWZlcmVuY2V9IGZyb20gXCIuLi91dGlscy9SZWZlcmVuY2VcIjtcclxuaW1wb3J0IHtHcmFwaHZpek5vZGV9IGZyb20gXCIuLi91dGlscy9HcmFwaHZpek5vZGVcIjtcclxuaW1wb3J0IHtUU0dyYXBoQ29udHJvbH0gZnJvbSBcIi4uL3V0aWxzL1RTR3JhcGhDb250cm9sXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGVjbGFyZVZhck5vZGUgZXh0ZW5kcyBPcCB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgdmFsdWU6IENudG5yID0gbmV3IFVOREVGSU5FRCgpO1xyXG4gICAgcHJpdmF0ZSB2YWx1ZU9wOiBPcDtcclxuICAgIHByaXZhdGUgaXNDb25zdDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgdGlwb05vbWJyZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IE9wID0gbnVsbCkge1xyXG4gICAgICAgIHN1cGVyKHBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMudmFsdWVPcCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIEdPKGVudjogRW52bW50KTogb2JqZWN0IHtcclxuICAgICAgICB0aGlzLkFkZFZhck9uRGVjbGFyZShlbnYsIHRoaXMubmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEFkZFZhbHVlKHZhbHVlOiBDbnRuciA9IG5ldyBVTkRFRklORUQoKSwgaXNDb25zdDogYm9vbGVhbiA9IGZhbHNlLCB0aXBvTm9tYnJlOiBzdHJpbmcgPSAnQU5ZJykge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLmlzQ29uc3QgPSBpc0NvbnN0O1xyXG4gICAgICAgIGlmICh0aXBvTm9tYnJlID09PSAnJykge1xyXG4gICAgICAgICAgICB0aXBvTm9tYnJlID0gJ0FOWSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGlwb05vbWJyZSA9IHRpcG9Ob21icmUudG9VcHBlckNhc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIEFkZFZhck9uRGVjbGFyZShlbnY6IEVudm1udCwgaWRlbnRpZmllcjogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHZhbHVlOiBDbnRuciA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgaWYodGhpcy52YWx1ZU9wICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnZhbHVlT3AuRXhlKGVudikgYXMgQ250bnI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHJlZmVyZW5jZTogUmVmZXJlbmNlID0gbmV3IFJlZmVyZW5jZSh0aGlzLnRpcG9Ob21icmUsIHRoaXMuaXNDb25zdCk7XHJcbiAgICAgICAgcmVmZXJlbmNlLlB1dFZhbHVlT25SZWZlcmVuY2UodmFsdWUpO1xyXG4gICAgICAgIGVudi5EZWNsYXJlKGlkZW50aWZpZXIsIHJlZmVyZW5jZSk7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0R3JhcGgoZW52OiBFbnZtbnQpOiBHcmFwaHZpek5vZGUge1xyXG4gICAgICAgIHJldHVybiBuZXcgR3JhcGh2aXpOb2RlKCdERUNMQVJFX1ZBUicsIFtuZXcgR3JhcGh2aXpOb2RlKHRoaXMubmFtZSksIG5ldyBHcmFwaHZpek5vZGUodGhpcy50aXBvTm9tYnJlP3RoaXMudGlwb05vbWJyZTonQU5ZJyksXHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVPcCAhPT0gbnVsbCA/IHRoaXMudmFsdWVPcC5HZXRHcmFwaChlbnYpIDogbmV3IEdyYXBodml6Tm9kZSgndW5kZWZpbmVkJyldKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRUU0dyYXBoKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGBuJHtUU0dyYXBoQ29udHJvbC5HZXROb2RlSWQoKX0gW2xhYmVsPVwiJHt0aGlzLm5hbWV9XCJdXFxuYDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge09wfSBmcm9tIFwiLi4vdXRpbHMvT3BcIjtcclxuaW1wb3J0IHtEaWZlcmVudGV9IGZyb20gXCIuLi91dGlscy9SZWxhdGlvbmFsT3BlcmF0aW9uc0Z1bmN0aW9uc1wiO1xyXG5pbXBvcnQge0NudG5yfSBmcm9tIFwiLi4vdXRpbHMvQ250bnJcIjtcclxuaW1wb3J0IHtFbnZtbnR9IGZyb20gXCIuLi91dGlscy9FbnZtbnRcIjtcclxuaW1wb3J0IHtHcmFwaHZpek5vZGV9IGZyb20gXCIuLi91dGlscy9HcmFwaHZpek5vZGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBEaWZOb2RlIGV4dGVuZHMgT3Age1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBsZjogT3A7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJ0OiBPcDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogYW55LCBsZjogT3AsIHJ0OiBPcCkge1xyXG4gICAgICAgIHN1cGVyKHBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLmxmID0gbGY7XHJcbiAgICAgICAgdGhpcy5ydCA9IHJ0O1xyXG4gICAgfVxyXG5cclxuICAgIEdPKGVudjogRW52bW50KTogb2JqZWN0IHtcclxuICAgICAgICByZXR1cm4gRGlmZXJlbnRlKCh0aGlzLmxmLkV4ZShlbnYpIGFzIENudG5yKSwgKHRoaXMucnQuRXhlKGVudikgYXMgQ250bnIpLCB0aGlzLnBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRHcmFwaChlbnY6IEVudm1udCk6IEdyYXBodml6Tm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHcmFwaHZpek5vZGUoJ0RJRicsIFt0aGlzLmxmLkdldEdyYXBoKGVudiksIHRoaXMucnQuR2V0R3JhcGgoZW52KV0pO1xyXG4gICAgfVxyXG5cclxuICAgIEdldFRTR3JhcGgoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge09wfSBmcm9tIFwiLi4vdXRpbHMvT3BcIjtcclxuaW1wb3J0IHtFbnZtbnR9IGZyb20gXCIuLi91dGlscy9FbnZtbnRcIjtcclxuaW1wb3J0IHtEaXZpc2lvbiwgU3VtYX0gZnJvbSBcIi4uL3V0aWxzL0FsZ2VicmFpY09wZXJhdGlvbnNGdW5jdGlvbnNcIjtcclxuaW1wb3J0IHtDbnRucn0gZnJvbSBcIi4uL3V0aWxzL0NudG5yXCI7XHJcbmltcG9ydCB7R3JhcGh2aXpOb2RlfSBmcm9tIFwiLi4vdXRpbHMvR3JhcGh2aXpOb2RlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGl2Tm9kZSBleHRlbmRzIE9we1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBsZjogT3A7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJ0OiBPcDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogYW55LCBsZjogT3AsIHJ0OiBPcCkge1xyXG4gICAgICAgIHN1cGVyKHBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLmxmID0gbGY7XHJcbiAgICAgICAgdGhpcy5ydCA9IHJ0O1xyXG4gICAgfVxyXG5cclxuICAgIEdPKGVudjogRW52bW50KTogb2JqZWN0IHtcclxuICAgICAgICByZXR1cm4gRGl2aXNpb24oKHRoaXMubGYuRXhlKGVudikgYXMgQ250bnIpLCAodGhpcy5ydC5FeGUoZW52KSBhcyBDbnRuciksIHRoaXMucG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIEdldEdyYXBoKGVudjogRW52bW50KTogR3JhcGh2aXpOb2RlIHtcclxuICAgICAgICByZXR1cm4gbmV3IEdyYXBodml6Tm9kZSgnRElWJywgW3RoaXMubGYuR2V0R3JhcGgoZW52KSwgdGhpcy5ydC5HZXRHcmFwaChlbnYpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0VFNHcmFwaCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7T3B9IGZyb20gXCIuLi91dGlscy9PcFwiO1xyXG5pbXBvcnQge0Vudm1udH0gZnJvbSBcIi4uL3V0aWxzL0Vudm1udFwiO1xyXG5pbXBvcnQge0xvZ2ljRG9XaGlsZX0gZnJvbSBcIi4uL3V0aWxzL1V0aWxzXCI7XHJcbmltcG9ydCB7R3JhcGh2aXpOb2RlfSBmcm9tIFwiLi4vdXRpbHMvR3JhcGh2aXpOb2RlXCI7XHJcbmltcG9ydCB7VFNHcmFwaENvbnRyb2x9IGZyb20gXCIuLi91dGlscy9UU0dyYXBoQ29udHJvbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERvV2hpbGVOb2RlIGV4dGVuZHMgT3Age1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjb25kaXRpb246IE9wO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBzZW50ZW5jZXM6IEFycmF5PE9wPjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogYW55LCBjb25kaXRpb246IE9wLCBzZW50ZW5jZXM6IEFycmF5PE9wPikge1xyXG4gICAgICAgIHN1cGVyKHBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLmNvbmRpdGlvbiA9IGNvbmRpdGlvbjtcclxuICAgICAgICB0aGlzLnNlbnRlbmNlcyA9IHNlbnRlbmNlcztcclxuICAgIH1cclxuXHJcbiAgICBHTyhlbnY6IEVudm1udCk6IG9iamVjdCB7XHJcbiAgICAgICAgcmV0dXJuIExvZ2ljRG9XaGlsZShlbnYsIHRoaXMuY29uZGl0aW9uLCB0aGlzLnNlbnRlbmNlcywgbnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0R3JhcGgoZW52OiBFbnZtbnQpOiBHcmFwaHZpek5vZGUge1xyXG4gICAgICAgIHJldHVybiBuZXcgR3JhcGh2aXpOb2RlKCdET19XSElMRScsIFtuZXcgR3JhcGh2aXpOb2RlKCdXSElMRV9CT0RZJywgdGhpcy5zZW50ZW5jZXMubWFwKHNlbnRlbmNlID0+IHNlbnRlbmNlLkdldEdyYXBoKGVudikpKSwgdGhpcy5jb25kaXRpb24uR2V0R3JhcGgoZW52KV0pO1xyXG4gICAgfVxyXG5cclxuICAgIEdldFRTR3JhcGgoKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgdmFsdWUgPSAnJztcclxuICAgICAgICBjb25zdCBncmFwaElkID0gVFNHcmFwaENvbnRyb2wuR2V0R3JhcGhJZCgpO1xyXG4gICAgICAgIHZhbHVlICs9IGBzdWJncmFwaCBjbHVzdGVyXyR7Z3JhcGhJZH0geyBcXG5gO1xyXG4gICAgICAgIHZhbHVlICs9ICdzdHlsZT1maWxsZWQ7XFxuJyArXHJcbiAgICAgICAgICAgICdjb2xvcj1cIiMyQkJCQURcIjtcXG4nICtcclxuICAgICAgICAgICAgJ2ZpbGxjb2xvcj1cIiMxRTIyMkFcIjtcXG4nO1xyXG4gICAgICAgIHZhbHVlICs9ICdub2RlIFtjb2xvcj1cIiMyQkJCQURcIiBmb250Y29sb3I9XCIjMkJCQkFEXCIgc2hhcGU9XCJyZWN0YW5nbGVcIl0gXFxuJztcclxuICAgICAgICB2YWx1ZSArPSB0aGlzLmNvbmRpdGlvbi5HZXRUU0dyYXBoKCk7XHJcbiAgICAgICAgdGhpcy5zZW50ZW5jZXMuZm9yRWFjaChzZW50ZW5jZSA9PiB7XHJcbiAgICAgICAgICAgIHZhbHVlICs9IHNlbnRlbmNlLkdldFRTR3JhcGgoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB2YWx1ZSArPSBgbGFiZWwgPSBcIiR7XCJET19XSElMRV9TRU5URU5DRVwifVwiO1xcbmA7XHJcbiAgICAgICAgdmFsdWUgKz0gYH1cXG5gO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge09wfSBmcm9tIFwiLi4vdXRpbHMvT3BcIjtcclxuaW1wb3J0IHtJZ3VhbH0gZnJvbSBcIi4uL3V0aWxzL1JlbGF0aW9uYWxPcGVyYXRpb25zRnVuY3Rpb25zXCI7XHJcbmltcG9ydCB7RW52bW50fSBmcm9tIFwiLi4vdXRpbHMvRW52bW50XCI7XHJcbmltcG9ydCB7Q250bnJ9IGZyb20gXCIuLi91dGlscy9DbnRuclwiO1xyXG5pbXBvcnQge0dyYXBodml6Tm9kZX0gZnJvbSBcIi4uL3V0aWxzL0dyYXBodml6Tm9kZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEVxTm9kZSBleHRlbmRzIE9wIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbGY6IE9wO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBydDogT3A7XHJcblxyXG4gICAgY29uc3RydWN0b3IocG9zaXRpb246IGFueSwgbGY6IE9wLCBydDogT3ApIHtcclxuICAgICAgICBzdXBlcihwb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5sZiA9IGxmO1xyXG4gICAgICAgIHRoaXMucnQgPSBydDtcclxuICAgIH1cclxuXHJcbiAgICBHTyhlbnY6IEVudm1udCk6IG9iamVjdCB7XHJcbiAgICAgICAgcmV0dXJuIElndWFsKCh0aGlzLmxmLkV4ZShlbnYpIGFzIENudG5yKSwgKHRoaXMucnQuRXhlKGVudikgYXMgQ250bnIpLCB0aGlzLnBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRHcmFwaChlbnY6IEVudm1udCk6IEdyYXBodml6Tm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHcmFwaHZpek5vZGUoJ0VRJywgW3RoaXMubGYuR2V0R3JhcGgoZW52KSwgdGhpcy5ydC5HZXRHcmFwaChlbnYpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0VFNHcmFwaCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7T3B9IGZyb20gXCIuLi91dGlscy9PcFwiO1xyXG5pbXBvcnQge0Vudm1udH0gZnJvbSBcIi4uL3V0aWxzL0Vudm1udFwiO1xyXG5pbXBvcnQge1BvdGVuY2lhfSBmcm9tIFwiLi4vdXRpbHMvQWxnZWJyYWljT3BlcmF0aW9uc0Z1bmN0aW9uc1wiO1xyXG5pbXBvcnQge0NudG5yfSBmcm9tIFwiLi4vdXRpbHMvQ250bnJcIjtcclxuaW1wb3J0IHtHcmFwaHZpek5vZGV9IGZyb20gXCIuLi91dGlscy9HcmFwaHZpek5vZGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBFeHBOb2RlIGV4dGVuZHMgT3Age1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBsZjogT3A7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJ0OiBPcDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogYW55LCBsZjogT3AsIHJ0OiBPcCkge1xyXG4gICAgICAgIHN1cGVyKHBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLmxmID0gbGY7XHJcbiAgICAgICAgdGhpcy5ydCA9IHJ0O1xyXG4gICAgfVxyXG5cclxuICAgIEdPKGVudjogRW52bW50KTogb2JqZWN0IHtcclxuICAgICAgICByZXR1cm4gUG90ZW5jaWEoKHRoaXMubGYuRXhlKGVudikgYXMgQ250bnIpLCAodGhpcy5ydC5FeGUoZW52KSBhcyBDbnRuciksIHRoaXMucG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIEdldEdyYXBoKGVudjogRW52bW50KTogR3JhcGh2aXpOb2RlIHtcclxuICAgICAgICByZXR1cm4gbmV3IEdyYXBodml6Tm9kZSgnRVhQJywgW3RoaXMubGYuR2V0R3JhcGgoZW52KSwgdGhpcy5ydC5HZXRHcmFwaChlbnYpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0VFNHcmFwaCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7T3B9IGZyb20gXCIuLi91dGlscy9PcFwiO1xyXG5pbXBvcnQge0Vudm1udH0gZnJvbSBcIi4uL3V0aWxzL0Vudm1udFwiO1xyXG5pbXBvcnQge1JlZmVyZW5jZX0gZnJvbSBcIi4uL3V0aWxzL1JlZmVyZW5jZVwiO1xyXG5pbXBvcnQge0FSUkFZLCBOVU1CRVIsIFNUUklOR30gZnJvbSBcIi4uL3V0aWxzL1ByaW1pdGl2ZVR5cG9Db250YWluZXJcIjtcclxuaW1wb3J0IHtGaW5kVmFyLCBTZW1hbnRpY0V4Y2VwdGlvbn0gZnJvbSBcIi4uL3V0aWxzL1V0aWxzXCI7XHJcbmltcG9ydCB7R3JhcGh2aXpOb2RlfSBmcm9tIFwiLi4vdXRpbHMvR3JhcGh2aXpOb2RlXCI7XHJcbmltcG9ydCB7VFNHcmFwaENvbnRyb2x9IGZyb20gXCIuLi91dGlscy9UU0dyYXBoQ29udHJvbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZvckluTm9kZSBleHRlbmRzIE9wIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgY29udHJvbFZhcjogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBuZXdDb250cm9sVmFyOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBhcnJheTogT3A7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNlbnRlbmNlczogQXJyYXk8T3A+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBhbnksIGNvbnRyb2xWYXI6IHN0cmluZywgbmV3Q29udHJvbFZhcjogYm9vbGVhbiwgYXJyYXk6IE9wLCBzZW50ZW5jZXM6IEFycmF5PE9wPikge1xyXG4gICAgICAgIHN1cGVyKHBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xWYXIgPSBjb250cm9sVmFyO1xyXG4gICAgICAgIHRoaXMubmV3Q29udHJvbFZhciA9IG5ld0NvbnRyb2xWYXI7XHJcbiAgICAgICAgdGhpcy5hcnJheSA9IGFycmF5O1xyXG4gICAgICAgIHRoaXMuc2VudGVuY2VzID0gc2VudGVuY2VzO1xyXG4gICAgfVxyXG5cclxuICAgIEdPKGVudjogRW52bW50KTogb2JqZWN0IHtcclxuICAgICAgICBsZXQgYXJyYXkgPSB0aGlzLmFycmF5LkV4ZShlbnYpO1xyXG4gICAgICAgIGlmIChhcnJheSBpbnN0YW5jZW9mIFJlZmVyZW5jZSkge1xyXG4gICAgICAgICAgICBhcnJheSA9IChhcnJheSBhcyBSZWZlcmVuY2UpLmdldFZhbHVlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghKGFycmF5IGluc3RhbmNlb2YgQVJSQVkpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBTZW1hbnRpY0V4Y2VwdGlvbihcIlNlIGVzcGVyYWJhIHVuYSByZWZlcmVuY2lhIGEgdW4gYXJyZWdsbyBlbiBjaWNsbyBGb3IgSW5cIiwgdGhpcy5wb3NpdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBlbnYwID0gbmV3IEVudm1udChlbnYsIHRoaXMuc2VudGVuY2VzKTtcclxuICAgICAgICBpZiAodGhpcy5uZXdDb250cm9sVmFyKSB7XHJcbiAgICAgICAgICAgIGVudjAuQWRkUHJvcGVydHkodGhpcy5jb250cm9sVmFyLCBuZXcgUmVmZXJlbmNlKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yKGxldCBpbmRleCBpbiAoYXJyYXkgYXMgQVJSQVkpLmdldFZhbHVlTGlzdCgpKXtcclxuICAgICAgICAgICAgKEZpbmRWYXIoZW52MCwgdGhpcy5jb250cm9sVmFyKSBhcyBSZWZlcmVuY2UpLnNldFZhbHVlKG5ldyBTVFJJTkcoaW5kZXgpKTtcclxuICAgICAgICAgICAgZW52MC5HT19BTEwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBHZXRHcmFwaChlbnY6IEVudm1udCk6IEdyYXBodml6Tm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHcmFwaHZpek5vZGUoJ0ZPUl9JTicsIFtuZXcgR3JhcGh2aXpOb2RlKHRoaXMuY29udHJvbFZhciksIG5ldyBHcmFwaHZpek5vZGUoJ0ZPUl9JTl9CT0RZJywgdGhpcy5zZW50ZW5jZXMubWFwKHNlbnRlbmNlID0+IHNlbnRlbmNlLkdldEdyYXBoKGVudikpKV0pO1xyXG4gICAgfVxyXG5cclxuICAgIEdldFRTR3JhcGgoKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgdmFsdWUgPSAnJztcclxuICAgICAgICBjb25zdCBncmFwaElkID0gVFNHcmFwaENvbnRyb2wuR2V0R3JhcGhJZCgpO1xyXG4gICAgICAgIHZhbHVlICs9IGBzdWJncmFwaCBjbHVzdGVyXyR7Z3JhcGhJZH0geyBcXG5gO1xyXG4gICAgICAgIHZhbHVlICs9ICdzdHlsZT1maWxsZWQ7XFxuJyArXHJcbiAgICAgICAgICAgICdjb2xvcj1cIiMyQkJCQURcIjtcXG4nICtcclxuICAgICAgICAgICAgJ2ZpbGxjb2xvcj1cIiMxRTIyMkFcIjtcXG4nO1xyXG4gICAgICAgIHZhbHVlICs9ICdub2RlIFtjb2xvcj1cIiMyQkJCQURcIiBmb250Y29sb3I9XCIjMkJCQkFEXCIgc2hhcGU9XCJyZWN0YW5nbGVcIl0gXFxuJztcclxuICAgICAgICB2YWx1ZSArPSBgbiR7VFNHcmFwaENvbnRyb2wuR2V0Tm9kZUlkKCl9IFtsYWJlbD1cIiR7dGhpcy5jb250cm9sVmFyfVwiXVxcbmA7XHJcbiAgICAgICAgdmFsdWUgKz0gdGhpcy5hcnJheS5HZXRUU0dyYXBoKCk7XHJcbiAgICAgICAgdGhpcy5zZW50ZW5jZXMuZm9yRWFjaChzZW50ZW5jZSA9PiB7XHJcbiAgICAgICAgICAgIHZhbHVlICs9IHNlbnRlbmNlLkdldFRTR3JhcGgoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB2YWx1ZSArPSBgbGFiZWwgPSBcIiR7XCJGT1JfSU5fU0VOVEVOQ0VcIn1cIjtcXG5gO1xyXG4gICAgICAgIHZhbHVlICs9IGB9XFxuYDtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7T3B9IGZyb20gXCIuLi91dGlscy9PcFwiO1xyXG5pbXBvcnQge0Vudm1udH0gZnJvbSBcIi4uL3V0aWxzL0Vudm1udFwiO1xyXG5pbXBvcnQge0xvZ2ljV2hpbGV9IGZyb20gXCIuLi91dGlscy9VdGlsc1wiO1xyXG5pbXBvcnQge0dyYXBodml6Tm9kZX0gZnJvbSBcIi4uL3V0aWxzL0dyYXBodml6Tm9kZVwiO1xyXG5pbXBvcnQge1RTR3JhcGhDb250cm9sfSBmcm9tIFwiLi4vdXRpbHMvVFNHcmFwaENvbnRyb2xcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBGb3JOb2RlIGV4dGVuZHMgT3Age1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjb25kaXRpb24wOiBPcDtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgY29uZGl0aW9uMTogT3A7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvbmRpdGlvbjI6IE9wO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2VudGVuY2VzOiBBcnJheTxPcD47XHJcbiAgICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogYW55LCBjb25kaXRpb24wOiBPcCwgY29uZGl0aW9uMTogT3AsIGNvbmRpdGlvbjI6IE9wLCBzZW50ZW5jZXM6IEFycmF5PE9wPikge1xyXG4gICAgICAgIHN1cGVyKHBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLmNvbmRpdGlvbjAgPSBjb25kaXRpb24wO1xyXG4gICAgICAgIHRoaXMuY29uZGl0aW9uMSA9IGNvbmRpdGlvbjE7XHJcbiAgICAgICAgdGhpcy5jb25kaXRpb24yID0gY29uZGl0aW9uMjtcclxuICAgICAgICB0aGlzLnNlbnRlbmNlcyA9IHNlbnRlbmNlcztcclxuICAgIH1cclxuXHJcbiAgICBHTyhlbnY6IEVudm1udCk6IG9iamVjdCB7XHJcbiAgICAgICAgY29uc3QgY29uZGl0aW9uRW52ID0gbmV3IEVudm1udChlbnYsIFt0aGlzLmNvbmRpdGlvbjBdKTtcclxuICAgICAgICBjb25kaXRpb25FbnYuR09fQUxMKCk7XHJcblxyXG4gICAgICAgIExvZ2ljV2hpbGUoY29uZGl0aW9uRW52LCB0aGlzLmNvbmRpdGlvbjEsIHRoaXMuc2VudGVuY2VzLCB0aGlzLmNvbmRpdGlvbjIpO1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0R3JhcGgoZW52OiBFbnZtbnQpOiBHcmFwaHZpek5vZGUge1xyXG4gICAgICAgIHJldHVybiBuZXcgR3JhcGh2aXpOb2RlKCdGT1InLCBbXHJcbiAgICAgICAgICAgIHRoaXMuY29uZGl0aW9uMC5HZXRHcmFwaChlbnYpLFxyXG4gICAgICAgICAgICB0aGlzLmNvbmRpdGlvbjEuR2V0R3JhcGgoZW52KSxcclxuICAgICAgICAgICAgdGhpcy5jb25kaXRpb24yLkdldEdyYXBoKGVudiksXHJcbiAgICAgICAgICAgIG5ldyBHcmFwaHZpek5vZGUoJ0ZPUl9CT0RZJywgdGhpcy5zZW50ZW5jZXMubWFwKHNlbnRlbmNlID0+IHNlbnRlbmNlLkdldEdyYXBoKGVudikpKV0pO1xyXG4gICAgfVxyXG5cclxuICAgIEdldFRTR3JhcGgoKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgdmFsdWUgPSAnJztcclxuICAgICAgICBjb25zdCBncmFwaElkID0gVFNHcmFwaENvbnRyb2wuR2V0R3JhcGhJZCgpO1xyXG4gICAgICAgIHZhbHVlICs9IGBzdWJncmFwaCBjbHVzdGVyXyR7Z3JhcGhJZH0geyBcXG5gO1xyXG4gICAgICAgIHZhbHVlICs9ICdzdHlsZT1maWxsZWQ7XFxuJyArXHJcbiAgICAgICAgICAgICdjb2xvcj1cIiMyQkJCQURcIjtcXG4nICtcclxuICAgICAgICAgICAgJ2ZpbGxjb2xvcj1cIiMxRTIyMkFcIjtcXG4nO1xyXG4gICAgICAgIHZhbHVlICs9ICdub2RlIFtjb2xvcj1cIiMyQkJCQURcIiBmb250Y29sb3I9XCIjMkJCQkFEXCIgc2hhcGU9XCJyZWN0YW5nbGVcIl0gXFxuJztcclxuICAgICAgICB2YWx1ZSArPSB0aGlzLmNvbmRpdGlvbjAuR2V0VFNHcmFwaCgpO1xyXG4gICAgICAgIHZhbHVlICs9IHRoaXMuY29uZGl0aW9uMS5HZXRUU0dyYXBoKCk7XHJcbiAgICAgICAgdmFsdWUgKz0gdGhpcy5jb25kaXRpb24yLkdldFRTR3JhcGgoKTtcclxuICAgICAgICB0aGlzLnNlbnRlbmNlcy5mb3JFYWNoKHNlbnRlbmNlID0+IHtcclxuICAgICAgICAgICAgdmFsdWUgKz0gc2VudGVuY2UuR2V0VFNHcmFwaCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhbHVlICs9IGBsYWJlbCA9IFwiJHtcIkZPUl9TRU5URU5DRVwifVwiO1xcbmA7XHJcbiAgICAgICAgdmFsdWUgKz0gYH1cXG5gO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtPcH0gZnJvbSBcIi4uL3V0aWxzL09wXCI7XHJcbmltcG9ydCB7RW52bW50fSBmcm9tIFwiLi4vdXRpbHMvRW52bW50XCI7XHJcbmltcG9ydCB7UmVmZXJlbmNlfSBmcm9tIFwiLi4vdXRpbHMvUmVmZXJlbmNlXCI7XHJcbmltcG9ydCB7QVJSQVl9IGZyb20gXCIuLi91dGlscy9QcmltaXRpdmVUeXBvQ29udGFpbmVyXCI7XHJcbmltcG9ydCB7RmluZFZhciwgU2VtYW50aWNFeGNlcHRpb259IGZyb20gXCIuLi91dGlscy9VdGlsc1wiO1xyXG5pbXBvcnQge0dyYXBodml6Tm9kZX0gZnJvbSBcIi4uL3V0aWxzL0dyYXBodml6Tm9kZVwiO1xyXG5pbXBvcnQge1RTR3JhcGhDb250cm9sfSBmcm9tIFwiLi4vdXRpbHMvVFNHcmFwaENvbnRyb2xcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBGb3JPZk5vZGUgZXh0ZW5kcyBPcCB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvbnRyb2xWYXI6IHN0cmluZztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbmV3Q29udHJvbFZhcjogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgYXJyYXk6IE9wO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBzZW50ZW5jZXM6IEFycmF5PE9wPjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogYW55LCBjb250cm9sVmFyOiBzdHJpbmcsIG5ld0NvbnRyb2xWYXI6IGJvb2xlYW4sIGFycmF5OiBPcCwgc2VudGVuY2VzOiBBcnJheTxPcD4pIHtcclxuICAgICAgICBzdXBlcihwb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5jb250cm9sVmFyID0gY29udHJvbFZhcjtcclxuICAgICAgICB0aGlzLm5ld0NvbnRyb2xWYXIgPSBuZXdDb250cm9sVmFyO1xyXG4gICAgICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcclxuICAgICAgICB0aGlzLnNlbnRlbmNlcyA9IHNlbnRlbmNlcztcclxuICAgIH1cclxuXHJcbiAgICBHTyhlbnY6IEVudm1udCk6IG9iamVjdCB7XHJcbiAgICAgICAgbGV0IGFycmF5ID0gdGhpcy5hcnJheS5FeGUoZW52KTtcclxuICAgICAgICBpZiAoYXJyYXkgaW5zdGFuY2VvZiBSZWZlcmVuY2UpIHtcclxuICAgICAgICAgICAgYXJyYXkgPSAoYXJyYXkgYXMgUmVmZXJlbmNlKS5nZXRWYWx1ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIShhcnJheSBpbnN0YW5jZW9mIEFSUkFZKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgU2VtYW50aWNFeGNlcHRpb24oXCJTZSBlc3BlcmFiYSB1bmEgcmVmZXJuY2lhIGEgdW4gYXJyZWdsbyBlbiBjaWNsbyBGb3IgT2ZcIiwgdGhpcy5wb3NpdGlvbilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGVudjAgPSBuZXcgRW52bW50KGVudiwgdGhpcy5zZW50ZW5jZXMpO1xyXG4gICAgICAgIGlmICh0aGlzLm5ld0NvbnRyb2xWYXIpIHtcclxuICAgICAgICAgICAgZW52MC5BZGRQcm9wZXJ0eSh0aGlzLmNvbnRyb2xWYXIsIG5ldyBSZWZlcmVuY2UoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBlbGVtZW50IG9mIChhcnJheSBhcyBBUlJBWSkuZ2V0VmFsdWVMaXN0KCkpIHtcclxuICAgICAgICAgICAgbGV0IHZhbCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGlmICh2YWwgaW5zdGFuY2VvZiBSZWZlcmVuY2UpIHtcclxuICAgICAgICAgICAgICAgIHZhbCA9ICh2YWwgYXMgUmVmZXJlbmNlKS5nZXRWYWx1ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIChGaW5kVmFyKGVudjAsIHRoaXMuY29udHJvbFZhcikgYXMgUmVmZXJlbmNlKS5zZXRWYWx1ZSh2YWwpO1xyXG4gICAgICAgICAgICBlbnYwLkdPX0FMTCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIEdldEdyYXBoKGVudjogRW52bW50KTogR3JhcGh2aXpOb2RlIHtcclxuICAgICAgICByZXR1cm4gbmV3IEdyYXBodml6Tm9kZSgnRk9SX09GJywgW25ldyBHcmFwaHZpek5vZGUodGhpcy5jb250cm9sVmFyKSwgbmV3IEdyYXBodml6Tm9kZSgnRk9SX09GX0JPRFknLCB0aGlzLnNlbnRlbmNlcy5tYXAoc2VudGVuY2UgPT4gc2VudGVuY2UuR2V0R3JhcGgoZW52KSkpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0VFNHcmFwaCgpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCB2YWx1ZSA9ICcnO1xyXG4gICAgICAgIGNvbnN0IGdyYXBoSWQgPSBUU0dyYXBoQ29udHJvbC5HZXRHcmFwaElkKCk7XHJcbiAgICAgICAgdmFsdWUgKz0gYHN1YmdyYXBoIGNsdXN0ZXJfJHtncmFwaElkfSB7IFxcbmA7XHJcbiAgICAgICAgdmFsdWUgKz0gJ3N0eWxlPWZpbGxlZDtcXG4nICtcclxuICAgICAgICAgICAgJ2NvbG9yPVwiIzJCQkJBRFwiO1xcbicgK1xyXG4gICAgICAgICAgICAnZmlsbGNvbG9yPVwiIzFFMjIyQVwiO1xcbic7XHJcbiAgICAgICAgdmFsdWUgKz0gJ25vZGUgW2NvbG9yPVwiIzJCQkJBRFwiIGZvbnRjb2xvcj1cIiMyQkJCQURcIiBzaGFwZT1cInJlY3RhbmdsZVwiXSBcXG4nO1xyXG4gICAgICAgIHZhbHVlICs9IGBuJHtUU0dyYXBoQ29udHJvbC5HZXROb2RlSWQoKX0gW2xhYmVsPVwiJHt0aGlzLmNvbnRyb2xWYXJ9XCJdXFxuYDtcclxuICAgICAgICB2YWx1ZSArPSB0aGlzLmFycmF5LkdldFRTR3JhcGgoKTtcclxuICAgICAgICB0aGlzLnNlbnRlbmNlcy5mb3JFYWNoKHNlbnRlbmNlID0+IHtcclxuICAgICAgICAgICAgdmFsdWUgKz0gc2VudGVuY2UuR2V0VFNHcmFwaCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhbHVlICs9IGBsYWJlbCA9IFwiJHtcIkZPUl9PRl9TRU5URU5DRVwifVwiO1xcbmA7XHJcbiAgICAgICAgdmFsdWUgKz0gYH1cXG5gO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge09wfSBmcm9tIFwiLi4vdXRpbHMvT3BcIjtcclxuaW1wb3J0IHtFbnZtbnR9IGZyb20gXCIuLi91dGlscy9FbnZtbnRcIjtcclxuaW1wb3J0IHtDbnRucn0gZnJvbSBcIi4uL3V0aWxzL0NudG5yXCI7XHJcbmltcG9ydCB7UmVmZXJlbmNlfSBmcm9tIFwiLi4vdXRpbHMvUmVmZXJlbmNlXCI7XHJcbmltcG9ydCB7RnVuY3Rpb25SZXByZXNlbnR9IGZyb20gXCIuLi91dGlscy9mdW5jdGlvbnMvRnVuY3Rpb25SZXByZXNlbnRcIjtcclxuaW1wb3J0IHtSZXR1cm5PYmp9IGZyb20gXCIuL1JldHVybk9ialwiO1xyXG5pbXBvcnQge1VOREVGSU5FRH0gZnJvbSBcIi4uL3V0aWxzL1ByaW1pdGl2ZVR5cG9Db250YWluZXJcIjtcclxuaW1wb3J0IHtJc1ByaW1pdGl2ZVR5cG8sIFNlbWFudGljRXhjZXB0aW9ufSBmcm9tIFwiLi4vdXRpbHMvVXRpbHNcIjtcclxuaW1wb3J0IHtVc2VyRGVmaW5lZH0gZnJvbSBcIi4uL3V0aWxzL2Z1bmN0aW9ucy9Vc2VyRGVmaW5lZFwiO1xyXG5pbXBvcnQge0dyYXBodml6Tm9kZX0gZnJvbSBcIi4uL3V0aWxzL0dyYXBodml6Tm9kZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZ1bmN0aW9uQ2FsbE5vZGUgZXh0ZW5kcyBPcHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbmFtZTogT3A7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGFyZ3M6IEFycmF5PE9wPjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogYW55LCBuYW1lOiBPcCwgYXJnczogQXJyYXk8T3A+KSB7XHJcbiAgICAgICAgc3VwZXIocG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5hcmdzID0gYXJncztcclxuICAgIH1cclxuXHJcbiAgICBHTyhlbnY6IEVudm1udCk6IG9iamVjdCB7XHJcbiAgICAgICAgbGV0IGlkID0gdGhpcy5uYW1lLkV4ZShlbnYpO1xyXG4gICAgICAgIGlmIChpZCBpbnN0YW5jZW9mIFJlZmVyZW5jZSkge1xyXG4gICAgICAgICAgICBpZCA9IChpZCBhcyBSZWZlcmVuY2UpLmdldFZhbHVlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBhcmdzVmFsdWVzID0gbmV3IEFycmF5PENudG5yPigpO1xyXG4gICAgICAgIGZvciAobGV0IGFyZyBvZiB0aGlzLmFyZ3MpIHtcclxuICAgICAgICAgICAgbGV0IGFucyA9IGFyZy5FeGUoZW52KTtcclxuICAgICAgICAgICAgaWYgKGFucyBpbnN0YW5jZW9mIFJlZmVyZW5jZSkge1xyXG4gICAgICAgICAgICAgICAgYW5zID0gKGFucyBhcyBSZWZlcmVuY2UpLmdldFZhbHVlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXJnc1ZhbHVlcy5wdXNoKGFucyBhcyBDbnRucik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaWQgaW5zdGFuY2VvZiBGdW5jdGlvblJlcHJlc2VudCkge1xyXG4gICAgICAgICAgICBsZXQgZnVuY3QgPSAoaWQgYXMgVXNlckRlZmluZWQpO1xyXG4gICAgICAgICAgICBsZXQgYW5zID0gZnVuY3QuRVhFKGVudiwgYXJnc1ZhbHVlcyk7XHJcbiAgICAgICAgICAgIGlmIChhbnMgaW5zdGFuY2VvZiBSZXR1cm5PYmopIHtcclxuICAgICAgICAgICAgICAgIGxldCByZXQgPSAoYW5zIGFzIFJldHVybk9iaikuZ2V0VmFsdWUoKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXQgaW5zdGFuY2VvZiBSZWZlcmVuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXQgPSAocmV0IGFzIFJlZmVyZW5jZSkuZ2V0VmFsdWUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGZ1bmN0LmdldFR5cGUoKSAhPT0gcmV0LnR5cG9cclxuICAgICAgICAgICAgICAgICAgICAmJiBmdW5jdC5nZXRUeXBlKCkgIT09ICdBTlknXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgcmV0LnR5cG8gIT09ICdOVUxMJ1xyXG4gICAgICAgICAgICAgICAgICAgICYmIHJldC50eXBvICE9PSAnVU5ERUZJTkVEJ1xyXG4gICAgICAgICAgICAgICAgICAgICYmIHJldC50eXBvICE9PSAnT0JKRUNUJ1xyXG4gICAgICAgICAgICAgICAgICAgIHx8IChJc1ByaW1pdGl2ZVR5cG8oZnVuY3QuZ2V0VHlwZSgpKSAmJiByZXQudHlwbyA9PT0gJ09CSkVDVCcpXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU2VtYW50aWNFeGNlcHRpb24oYFNlIGVzcGVyYWJhIHJldG9ybm8gZGUgdGlwbyAke2Z1bmN0LmdldFR5cGUoKX0sIHNlIHJldG9ybm8gdGlwbyAke3JldC50eXBvfWAsIHRoaXMucG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChhbnMgYXMgUmV0dXJuT2JqKS5nZXRWYWx1ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgVU5ERUZJTkVEKCk7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0R3JhcGgoZW52OiBFbnZtbnQpOiBHcmFwaHZpek5vZGUge1xyXG4gICAgICAgIHJldHVybiBuZXcgR3JhcGh2aXpOb2RlKCdGVU5DVElPTl9DQUxMJywgW3RoaXMubmFtZS5HZXRHcmFwaChlbnYpLCBuZXcgR3JhcGh2aXpOb2RlKCdBUkdTJywgdGhpcy5hcmdzLm1hcChhcmcgPT4gYXJnLkdldEdyYXBoKGVudikpKV0pO1xyXG4gICAgfVxyXG5cclxuICAgIEdldFRTR3JhcGgoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge09wfSBmcm9tIFwiLi4vdXRpbHMvT3BcIjtcclxuaW1wb3J0IHtFbnZtbnR9IGZyb20gXCIuLi91dGlscy9FbnZtbnRcIjtcclxuaW1wb3J0IHtNYXlvckVxfSBmcm9tIFwiLi4vdXRpbHMvUmVsYXRpb25hbE9wZXJhdGlvbnNGdW5jdGlvbnNcIjtcclxuaW1wb3J0IHtDbnRucn0gZnJvbSBcIi4uL3V0aWxzL0NudG5yXCI7XHJcbmltcG9ydCB7R3JhcGh2aXpOb2RlfSBmcm9tIFwiLi4vdXRpbHMvR3JhcGh2aXpOb2RlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSGlnaGVyRXFOb2RlIGV4dGVuZHMgT3Age1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBsZjogT3A7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJ0OiBPcDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogYW55LCBsZjogT3AsIHJ0OiBPcCkge1xyXG4gICAgICAgIHN1cGVyKHBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLmxmID0gbGY7XHJcbiAgICAgICAgdGhpcy5ydCA9IHJ0O1xyXG4gICAgfVxyXG5cclxuICAgIEdPKGVudjogRW52bW50KTogb2JqZWN0IHtcclxuICAgICAgICByZXR1cm4gTWF5b3JFcSh0aGlzLmxmLkV4ZShlbnYpIGFzIENudG5yLCB0aGlzLnJ0LkV4ZShlbnYpIGFzIENudG5yLCB0aGlzLnBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRHcmFwaChlbnY6IEVudm1udCk6IEdyYXBodml6Tm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHcmFwaHZpek5vZGUoJ01BWV9FUScsIFt0aGlzLmxmLkdldEdyYXBoKGVudiksIHRoaXMucnQuR2V0R3JhcGgoZW52KV0pO1xyXG4gICAgfVxyXG5cclxuICAgIEdldFRTR3JhcGgoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge09wfSBmcm9tIFwiLi4vdXRpbHMvT3BcIjtcclxuaW1wb3J0IHtFbnZtbnR9IGZyb20gXCIuLi91dGlscy9FbnZtbnRcIjtcclxuaW1wb3J0IHtNYXlvcn0gZnJvbSBcIi4uL3V0aWxzL1JlbGF0aW9uYWxPcGVyYXRpb25zRnVuY3Rpb25zXCI7XHJcbmltcG9ydCB7Q250bnJ9IGZyb20gXCIuLi91dGlscy9DbnRuclwiO1xyXG5pbXBvcnQge0dyYXBodml6Tm9kZX0gZnJvbSBcIi4uL3V0aWxzL0dyYXBodml6Tm9kZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEhpZ2hlck5vZGUgZXh0ZW5kcyBPcCB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxmOiBPcDtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgcnQ6IE9wO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBhbnksIGxmOiBPcCwgcnQ6IE9wKSB7XHJcbiAgICAgICAgc3VwZXIocG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMubGYgPSBsZjtcclxuICAgICAgICB0aGlzLnJ0ID0gcnQ7XHJcbiAgICB9XHJcblxyXG4gICAgR08oZW52OiBFbnZtbnQpOiBvYmplY3Qge1xyXG4gICAgICAgIHJldHVybiBNYXlvcih0aGlzLmxmLkV4ZShlbnYpIGFzIENudG5yLCB0aGlzLnJ0LkV4ZShlbnYpIGFzIENudG5yLCB0aGlzLnBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRHcmFwaChlbnY6IEVudm1udCk6IEdyYXBodml6Tm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHcmFwaHZpek5vZGUoJ01BWScsIFt0aGlzLmxmLkdldEdyYXBoKGVudiksIHRoaXMucnQuR2V0R3JhcGgoZW52KV0pO1xyXG4gICAgfVxyXG5cclxuICAgIEdldFRTR3JhcGgoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge09wfSBmcm9tIFwiLi4vdXRpbHMvT3BcIjtcclxuaW1wb3J0IHtFbnZtbnR9IGZyb20gXCIuLi91dGlscy9FbnZtbnRcIjtcclxuaW1wb3J0IHtCT09MRUFOfSBmcm9tIFwiLi4vdXRpbHMvUHJpbWl0aXZlVHlwb0NvbnRhaW5lclwiO1xyXG5pbXBvcnQge1JlZmVyZW5jZX0gZnJvbSBcIi4uL3V0aWxzL1JlZmVyZW5jZVwiO1xyXG5pbXBvcnQge1Bhc3NQcm9wc0FuZEZ1bmNzLCBTZW1hbnRpY0V4Y2VwdGlvbn0gZnJvbSBcIi4uL3V0aWxzL1V0aWxzXCI7XHJcbmltcG9ydCB7R3JhcGh2aXpOb2RlfSBmcm9tIFwiLi4vdXRpbHMvR3JhcGh2aXpOb2RlXCI7XHJcbmltcG9ydCB7VFNHcmFwaENvbnRyb2x9IGZyb20gXCIuLi91dGlscy9UU0dyYXBoQ29udHJvbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIElmTm9kZSBleHRlbmRzIE9we1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjb25kaXRpb246IE9wO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBvcGVyYXRpb25zVHJ1ZTogQXJyYXk8T3A+O1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBvcGVyYXRpb25zRmFsc2U6IEFycmF5PE9wPjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogYW55LCBjb25kaXRpb246IE9wLCBvcGVyYXRpb25zVHJ1ZTogQXJyYXk8T3A+LCBvcGVyYXRpb25zRmFsc2U6IEFycmF5PE9wPikge1xyXG4gICAgICAgIHN1cGVyKHBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLmNvbmRpdGlvbiA9IGNvbmRpdGlvbjtcclxuICAgICAgICB0aGlzLm9wZXJhdGlvbnNUcnVlID0gb3BlcmF0aW9uc1RydWU7XHJcbiAgICAgICAgdGhpcy5vcGVyYXRpb25zRmFsc2UgPSBvcGVyYXRpb25zRmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgR08oZW52OiBFbnZtbnQpOiBvYmplY3Qge1xyXG4gICAgICAgIGxldCBjb25kaXRpb24gPSB0aGlzLmNvbmRpdGlvbi5FeGUoZW52KTtcclxuICAgICAgICBpZiAoY29uZGl0aW9uIGluc3RhbmNlb2YgUmVmZXJlbmNlKSB7XHJcbiAgICAgICAgICAgIGNvbmRpdGlvbiA9IChjb25kaXRpb24gYXMgUmVmZXJlbmNlKS5nZXRWYWx1ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighKGNvbmRpdGlvbiBpbnN0YW5jZW9mIEJPT0xFQU4pKXtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFNlbWFudGljRXhjZXB0aW9uKFwiQ29uZGljaW9uIHV0aWxpemFkYSBjb21vIHBhcmFtZXRybyBubyBzb3BvcnRhZGEgcG9yIHNlbnRlbmNpYSBJZlwiLCB0aGlzLnBvc2l0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjb25kaXRpb24uZ2V0VmFsdWUoKSkge1xyXG4gICAgICAgICAgICBjb25zdCBlbnZUcnVlID0gbmV3IEVudm1udChlbnYsIHRoaXMub3BlcmF0aW9uc1RydWUpO1xyXG4gICAgICAgICAgICBQYXNzUHJvcHNBbmRGdW5jcyhlbnYsIGVudlRydWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gZW52VHJ1ZS5HT19BTEwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGVudkZhbHNlID0gbmV3IEVudm1udChlbnYsIHRoaXMub3BlcmF0aW9uc0ZhbHNlKTtcclxuICAgICAgICBQYXNzUHJvcHNBbmRGdW5jcyhlbnYsIGVudkZhbHNlKTtcclxuICAgICAgICByZXR1cm4gZW52RmFsc2UuR09fQUxMKCk7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0R3JhcGgoZW52OiBFbnZtbnQpOiBHcmFwaHZpek5vZGUge1xyXG4gICAgICAgIHJldHVybiBuZXcgR3JhcGh2aXpOb2RlKCdJRicsIFtcclxuICAgICAgICAgICAgdGhpcy5jb25kaXRpb24uR2V0R3JhcGgoZW52KSxcclxuICAgICAgICAgICAgbmV3IEdyYXBodml6Tm9kZSgnSUZfQk9EWV9UUlVFJywgdGhpcy5vcGVyYXRpb25zVHJ1ZS5tYXAoc2VudGVuY2UgPT4gc2VudGVuY2UuR2V0R3JhcGgoZW52KSkpLFxyXG4gICAgICAgICAgICBuZXcgR3JhcGh2aXpOb2RlKCdJRl9CT0RZX0ZBTFNFJywgdGhpcy5vcGVyYXRpb25zRmFsc2UubWFwKHNlbnRlbmNlID0+IHNlbnRlbmNlLkdldEdyYXBoKGVudikpKVxyXG4gICAgICAgIF0pO1xyXG4gICAgfVxyXG5cclxuICAgIEdldFRTR3JhcGgoKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgdmFsdWUgPSAnJztcclxuICAgICAgICBjb25zdCBncmFwaElkID0gVFNHcmFwaENvbnRyb2wuR2V0R3JhcGhJZCgpO1xyXG4gICAgICAgIHZhbHVlICs9IGBzdWJncmFwaCBjbHVzdGVyXyR7Z3JhcGhJZH0geyBcXG5gO1xyXG4gICAgICAgIHZhbHVlICs9ICdzdHlsZT1maWxsZWQ7XFxuJyArXHJcbiAgICAgICAgICAgICdjb2xvcj1cIiMyQkJCQURcIjtcXG4nICtcclxuICAgICAgICAgICAgJ2ZpbGxjb2xvcj1cIiMxRTIyMkFcIjtcXG4nO1xyXG4gICAgICAgIHZhbHVlICs9ICdub2RlIFtjb2xvcj1cIiMyQkJCQURcIiBmb250Y29sb3I9XCIjMkJCQkFEXCIgc2hhcGU9XCJyZWN0YW5nbGVcIl0gXFxuJztcclxuICAgICAgICB2YWx1ZSArPSB0aGlzLmNvbmRpdGlvbi5HZXRUU0dyYXBoKCk7XHJcblxyXG5cclxuICAgICAgICB2YWx1ZSArPSBgc3ViZ3JhcGggY2x1c3Rlcl8ke1RTR3JhcGhDb250cm9sLkdldEdyYXBoSWQoKX0geyBcXG5gO1xyXG4gICAgICAgIHZhbHVlICs9ICdzdHlsZT1maWxsZWQ7XFxuJyArXHJcbiAgICAgICAgICAgICdjb2xvcj1ibGFjaztcXG4nICtcclxuICAgICAgICAgICAgJ2ZpbGxjb2xvcj1cInllbGxvd1wiO1xcbic7XHJcbiAgICAgICAgdmFsdWUgKz0gJ25vZGUgW2ZpbGxjb2xvcj1cInllbGxvd1wiIHNoYXBlPVwicmVjdGFuZ2xlXCJdIFxcbic7XHJcbiAgICAgICAgdGhpcy5vcGVyYXRpb25zVHJ1ZS5mb3JFYWNoKHNlbnRlbmNlID0+IHtcclxuICAgICAgICAgICAgdmFsdWUgKz0gc2VudGVuY2UuR2V0VFNHcmFwaCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhbHVlICs9IGBsYWJlbCA9IFwiJHtcIklGX1NFTlRFTkNFX1RSVUVcIn1cIjtcXG5gO1xyXG4gICAgICAgIHZhbHVlICs9IGB9XFxuYDtcclxuXHJcbiAgICAgICAgdmFsdWUgKz0gYHN1YmdyYXBoIGNsdXN0ZXJfJHtUU0dyYXBoQ29udHJvbC5HZXRHcmFwaElkKCl9IHsgXFxuYDtcclxuICAgICAgICB2YWx1ZSArPSAnc3R5bGU9ZmlsbGVkO1xcbicgK1xyXG4gICAgICAgICAgICAnY29sb3I9YmxhY2s7XFxuJyArXHJcbiAgICAgICAgICAgICdmaWxsY29sb3I9XCJ5ZWxsb3dcIjtcXG4nO1xyXG4gICAgICAgIHZhbHVlICs9ICdub2RlIFtmaWxsY29sb3I9XCJ5ZWxsb3dcIiBzaGFwZT1cInJlY3RhbmdsZVwiXSBcXG4nO1xyXG4gICAgICAgIHRoaXMub3BlcmF0aW9uc0ZhbHNlLmZvckVhY2goc2VudGVuY2UgPT4ge1xyXG4gICAgICAgICAgICB2YWx1ZSArPSBzZW50ZW5jZS5HZXRUU0dyYXBoKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFsdWUgKz0gYGxhYmVsID0gXCIke1wiSUZfU0VOVEVOQ0VfRkFMU0VcIn1cIjtcXG5gO1xyXG4gICAgICAgIHZhbHVlICs9IGB9XFxuYDtcclxuXHJcblxyXG4gICAgICAgIHZhbHVlICs9IGBsYWJlbCA9IFwiJHtcIklGX1NFTlRFTkNFXCJ9XCI7XFxuYDtcclxuICAgICAgICB2YWx1ZSArPSBgfVxcbmA7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7T3B9IGZyb20gXCIuLi91dGlscy9PcFwiO1xyXG5pbXBvcnQge0Vudm1udH0gZnJvbSBcIi4uL3V0aWxzL0Vudm1udFwiO1xyXG5pbXBvcnQge01lbm9yRXF9IGZyb20gXCIuLi91dGlscy9SZWxhdGlvbmFsT3BlcmF0aW9uc0Z1bmN0aW9uc1wiO1xyXG5pbXBvcnQge0NudG5yfSBmcm9tIFwiLi4vdXRpbHMvQ250bnJcIjtcclxuaW1wb3J0IHtHcmFwaHZpek5vZGV9IGZyb20gXCIuLi91dGlscy9HcmFwaHZpek5vZGVcIjtcclxuaW1wb3J0IHtQb3NpdGlvbn0gZnJvbSBcIi4uL3V0aWxzL0Vycm9yc0NvbnRyb2xcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNaW5vckVxTm9kZSBleHRlbmRzIE9wIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbGY6IE9wO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBydDogT3A7XHJcblxyXG4gICAgY29uc3RydWN0b3IocG9zaXRpb246IGFueSwgbGY6IE9wLCBydDogT3ApIHtcclxuICAgICAgICBzdXBlcihwb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5sZiA9IGxmO1xyXG4gICAgICAgIHRoaXMucnQgPSBydDtcclxuICAgIH1cclxuXHJcbiAgICBHTyhlbnY6IEVudm1udCk6IG9iamVjdCB7XHJcbiAgICAgICAgcmV0dXJuIE1lbm9yRXEodGhpcy5sZi5FeGUoZW52KSBhcyBDbnRuciwgdGhpcy5ydC5FeGUoZW52KSBhcyBDbnRuciwgdGhpcy5wb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0R3JhcGgoZW52OiBFbnZtbnQpOiBHcmFwaHZpek5vZGUge1xyXG4gICAgICAgIHJldHVybiBuZXcgR3JhcGh2aXpOb2RlKCdNSU5fRVEnLCBbdGhpcy5sZi5HZXRHcmFwaChlbnYpLCB0aGlzLnJ0LkdldEdyYXBoKGVudildKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRUU0dyYXBoKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtPcH0gZnJvbSBcIi4uL3V0aWxzL09wXCI7XHJcbmltcG9ydCB7IEVudm1udCB9IGZyb20gXCIuLi91dGlscy9FbnZtbnRcIjtcclxuaW1wb3J0IHtNZW5vcn0gZnJvbSBcIi4uL3V0aWxzL1JlbGF0aW9uYWxPcGVyYXRpb25zRnVuY3Rpb25zXCI7XHJcbmltcG9ydCB7Q250bnJ9IGZyb20gXCIuLi91dGlscy9DbnRuclwiO1xyXG5pbXBvcnQge0dyYXBodml6Tm9kZX0gZnJvbSBcIi4uL3V0aWxzL0dyYXBodml6Tm9kZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1pbm9yTm9kZSBleHRlbmRzIE9wIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbGY6IE9wO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBydDogT3A7XHJcblxyXG4gICAgY29uc3RydWN0b3IocG9zaXRpb246IGFueSwgbGY6IE9wLCBydDogT3ApIHtcclxuICAgICAgICBzdXBlcihwb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5sZiA9IGxmO1xyXG4gICAgICAgIHRoaXMucnQgPSBydDtcclxuICAgIH1cclxuXHJcbiAgICBHTyhlbnY6IEVudm1udCk6IG9iamVjdCB7XHJcbiAgICAgICAgcmV0dXJuIE1lbm9yKHRoaXMubGYuRXhlKGVudikgYXMgQ250bnIsIHRoaXMucnQuRXhlKGVudikgYXMgQ250bnIsIHRoaXMucG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIEdldEdyYXBoKGVudjogRW52bW50KTogR3JhcGh2aXpOb2RlIHtcclxuICAgICAgICByZXR1cm4gbmV3IEdyYXBodml6Tm9kZSgnTUlOJywgW3RoaXMubGYuR2V0R3JhcGgoZW52KSwgdGhpcy5ydC5HZXRHcmFwaChlbnYpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0VFNHcmFwaCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7T3B9IGZyb20gXCIuLi91dGlscy9PcFwiO1xyXG5pbXBvcnQge0Vudm1udH0gZnJvbSBcIi4uL3V0aWxzL0Vudm1udFwiO1xyXG5pbXBvcnQge01vZHVsb30gZnJvbSBcIi4uL3V0aWxzL0FsZ2VicmFpY09wZXJhdGlvbnNGdW5jdGlvbnNcIjtcclxuaW1wb3J0IHtDbnRucn0gZnJvbSBcIi4uL3V0aWxzL0NudG5yXCI7XHJcbmltcG9ydCB7R3JhcGh2aXpOb2RlfSBmcm9tIFwiLi4vdXRpbHMvR3JhcGh2aXpOb2RlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTW9kTm9kZSBleHRlbmRzIE9we1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBsZjogT3A7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJ0OiBPcDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogYW55LCBsZjogT3AsIHJ0OiBPcCkge1xyXG4gICAgICAgIHN1cGVyKHBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLmxmID0gbGY7XHJcbiAgICAgICAgdGhpcy5ydCA9IHJ0O1xyXG4gICAgfVxyXG5cclxuICAgIEdPKGVudjogRW52bW50KTogb2JqZWN0IHtcclxuICAgICAgICByZXR1cm4gTW9kdWxvKCh0aGlzLmxmLkV4ZShlbnYpIGFzIENudG5yKSwgKHRoaXMucnQuRXhlKGVudikgYXMgQ250bnIpLCB0aGlzLnBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRHcmFwaChlbnY6IEVudm1udCk6IEdyYXBodml6Tm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHcmFwaHZpek5vZGUoJ01PRCcsIFt0aGlzLmxmLkdldEdyYXBoKGVudiksIHRoaXMucnQuR2V0R3JhcGgoZW52KV0pO1xyXG4gICAgfVxyXG5cclxuICAgIEdldFRTR3JhcGgoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge09wfSBmcm9tIFwiLi4vdXRpbHMvT3BcIjtcclxuaW1wb3J0IHtNdWx0aXBsaWNhY2lvbn0gZnJvbSBcIi4uL3V0aWxzL0FsZ2VicmFpY09wZXJhdGlvbnNGdW5jdGlvbnNcIjtcclxuaW1wb3J0IHtDbnRucn0gZnJvbSBcIi4uL3V0aWxzL0NudG5yXCI7XHJcbmltcG9ydCB7RW52bW50fSBmcm9tIFwiLi4vdXRpbHMvRW52bW50XCI7XHJcbmltcG9ydCB7R3JhcGh2aXpOb2RlfSBmcm9tIFwiLi4vdXRpbHMvR3JhcGh2aXpOb2RlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTXVsTm9kZSBleHRlbmRzIE9we1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBsZjogT3A7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJ0OiBPcDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogYW55LCBsZjogT3AsIHJ0OiBPcCkge1xyXG4gICAgICAgIHN1cGVyKHBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLmxmID0gbGY7XHJcbiAgICAgICAgdGhpcy5ydCA9IHJ0O1xyXG4gICAgfVxyXG5cclxuICAgIEdPKGVudjogRW52bW50KTogb2JqZWN0IHtcclxuICAgICAgICByZXR1cm4gTXVsdGlwbGljYWNpb24odGhpcy5sZi5FeGUoZW52KSBhcyBDbnRuciwgdGhpcy5ydC5FeGUoZW52KSBhcyBDbnRuciwgdGhpcy5wb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0R3JhcGgoZW52OiBFbnZtbnQpOiBHcmFwaHZpek5vZGUge1xyXG4gICAgICAgIHJldHVybiBuZXcgR3JhcGh2aXpOb2RlKCdNVUwnLCBbdGhpcy5sZi5HZXRHcmFwaChlbnYpLCB0aGlzLnJ0LkdldEdyYXBoKGVudildKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRUU0dyYXBoKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtPcH0gZnJvbSBcIi4uL3V0aWxzL09wXCI7XHJcbmltcG9ydCB7RW52bW50fSBmcm9tIFwiLi4vdXRpbHMvRW52bW50XCI7XHJcbmltcG9ydCB7Tm90fSBmcm9tIFwiLi4vdXRpbHMvTG9naWNhbE9wZXJhdGlvbnNGdW5jdGlvbnNcIjtcclxuaW1wb3J0IHtDbnRucn0gZnJvbSBcIi4uL3V0aWxzL0NudG5yXCI7XHJcbmltcG9ydCB7R3JhcGh2aXpOb2RlfSBmcm9tIFwiLi4vdXRpbHMvR3JhcGh2aXpOb2RlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTm90Tm9kZSBleHRlbmRzIE9wIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbGY6IE9wO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBhbnksIGxmOiBPcCwgcnQ6IE9wKSB7XHJcbiAgICAgICAgc3VwZXIocG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMubGYgPSBsZjtcclxuICAgIH1cclxuXHJcbiAgICBHTyhlbnY6IEVudm1udCk6IG9iamVjdCB7XHJcbiAgICAgICAgcmV0dXJuIE5vdCh0aGlzLmxmLkV4ZShlbnYpIGFzIENudG5yLCB0aGlzLnBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRHcmFwaChlbnY6IEVudm1udCk6IEdyYXBodml6Tm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHcmFwaHZpek5vZGUoJ05PVCcsIFt0aGlzLmxmLkdldEdyYXBoKGVudildKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRUU0dyYXBoKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtPcH0gZnJvbSBcIi4uL3V0aWxzL09wXCI7XHJcbmltcG9ydCB7RW52bW50fSBmcm9tIFwiLi4vdXRpbHMvRW52bW50XCI7XHJcbmltcG9ydCB7TlVMTH0gZnJvbSBcIi4uL3V0aWxzL1ByaW1pdGl2ZVR5cG9Db250YWluZXJcIjtcclxuaW1wb3J0IHtHcmFwaHZpek5vZGV9IGZyb20gXCIuLi91dGlscy9HcmFwaHZpek5vZGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBOdWxsTm9kZSBleHRlbmRzIE9we1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBHTyhlbnY6IEVudm1udCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgTlVMTCgpO1xyXG4gICAgfVxyXG5cclxuICAgIEdldEdyYXBoKGVudjogRW52bW50KTogR3JhcGh2aXpOb2RlIHtcclxuICAgICAgICByZXR1cm4gbmV3IEdyYXBodml6Tm9kZSgnTlVMTCcsIFtuZXcgR3JhcGh2aXpOb2RlKCdudWxsJyldKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRUU0dyYXBoKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtFbnZtbnR9IGZyb20gXCIuLi91dGlscy9FbnZtbnRcIjtcclxuaW1wb3J0IHtOVU1CRVJ9IGZyb20gXCIuLi91dGlscy9QcmltaXRpdmVUeXBvQ29udGFpbmVyXCI7XHJcbmltcG9ydCB7T3B9IGZyb20gXCIuLi91dGlscy9PcFwiO1xyXG5pbXBvcnQge0dyYXBodml6Tm9kZX0gZnJvbSBcIi4uL3V0aWxzL0dyYXBodml6Tm9kZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE51bWJlck5vZGUgZXh0ZW5kcyBPcHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdmFsOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocG9zaXRpb246IGFueSwgdmFsOiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcihwb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy52YWwgPSB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgR08oZW52OiBFbnZtbnQpe1xyXG4gICAgICAgIHJldHVybiBuZXcgTlVNQkVSKHRoaXMudmFsKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRHcmFwaChlbnY6IEVudm1udCk6IEdyYXBodml6Tm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHcmFwaHZpek5vZGUoJ05VTUJFUicsIFtuZXcgR3JhcGh2aXpOb2RlKHRoaXMudmFsICsgJycpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0VFNHcmFwaCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7T3B9IGZyb20gXCIuLi91dGlscy9PcFwiO1xyXG5pbXBvcnQge0Vudm1udH0gZnJvbSBcIi4uL3V0aWxzL0Vudm1udFwiO1xyXG5pbXBvcnQge09yfSBmcm9tIFwiLi4vdXRpbHMvTG9naWNhbE9wZXJhdGlvbnNGdW5jdGlvbnNcIjtcclxuaW1wb3J0IHtDbnRucn0gZnJvbSBcIi4uL3V0aWxzL0NudG5yXCI7XHJcbmltcG9ydCB7R3JhcGh2aXpOb2RlfSBmcm9tIFwiLi4vdXRpbHMvR3JhcGh2aXpOb2RlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgT3JOb2RlIGV4dGVuZHMgT3Age1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBsZjogT3A7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJ0OiBPcDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogYW55LCBsZjogT3AsIHJ0OiBPcCkge1xyXG4gICAgICAgIHN1cGVyKHBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLmxmID0gbGY7XHJcbiAgICAgICAgdGhpcy5ydCA9IHJ0O1xyXG4gICAgfVxyXG5cclxuICAgIEdPKGVudjogRW52bW50KTogb2JqZWN0IHtcclxuICAgICAgICByZXR1cm4gT3IodGhpcy5sZi5FeGUoZW52KSBhcyBDbnRuciwgdGhpcy5ydC5FeGUoZW52KSBhcyBDbnRuciwgdGhpcy5wb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0R3JhcGgoZW52OiBFbnZtbnQpOiBHcmFwaHZpek5vZGUge1xyXG4gICAgICAgIHJldHVybiBuZXcgR3JhcGh2aXpOb2RlKCdPUicsIFt0aGlzLmxmLkdldEdyYXBoKGVudiksIHRoaXMucnQuR2V0R3JhcGgoZW52KV0pO1xyXG4gICAgfVxyXG5cclxuICAgIEdldFRTR3JhcGgoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge09wfSBmcm9tIFwiLi4vdXRpbHMvT3BcIjtcclxuaW1wb3J0IHtFbnZtbnR9IGZyb20gXCIuLi91dGlscy9FbnZtbnRcIjtcclxuaW1wb3J0IHtBZGR9IGZyb20gXCIuLi91dGlscy9BbGdlYnJhaWNPcGVyYXRpb25zRnVuY3Rpb25zXCI7XHJcbmltcG9ydCB7Q250bnJ9IGZyb20gXCIuLi91dGlscy9DbnRuclwiO1xyXG5pbXBvcnQge0dyYXBodml6Tm9kZX0gZnJvbSBcIi4uL3V0aWxzL0dyYXBodml6Tm9kZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlQWRkTm9kZSBleHRlbmRzIE9wIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbGY6IE9wO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBhbnksIGxmOiBPcCkge1xyXG4gICAgICAgIHN1cGVyKHBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLmxmID0gbGY7XHJcbiAgICB9XHJcblxyXG4gICAgR08oZW52OiBFbnZtbnQpOiBvYmplY3Qge1xyXG4gICAgICAgIHJldHVybiBBZGQodGhpcy5sZi5FeGUoZW52KSBhcyBDbnRuciwgdGhpcy5wb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0R3JhcGgoZW52OiBFbnZtbnQpOiBHcmFwaHZpek5vZGUge1xyXG4gICAgICAgIHJldHVybiBuZXcgR3JhcGh2aXpOb2RlKCdSRV9BREQnLCBbdGhpcy5sZi5HZXRHcmFwaChlbnYpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0VFNHcmFwaCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7Q250bnIsIEVudm1udCwgT3AsIFJlZmVyZW5jZX0gZnJvbSBcIi4uL2luZGV4XCI7XHJcbmltcG9ydCB7U2VtYW50aWNFeGNlcHRpb259IGZyb20gXCIuLi91dGlscy9VdGlsc1wiO1xyXG5pbXBvcnQge1N1bWF9IGZyb20gXCIuLi91dGlscy9BbGdlYnJhaWNPcGVyYXRpb25zRnVuY3Rpb25zXCI7XHJcbmltcG9ydCB7R3JhcGh2aXpOb2RlfSBmcm9tIFwiLi4vdXRpbHMvR3JhcGh2aXpOb2RlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVBc2lnbkFkZE5vZGUgZXh0ZW5kcyBPcCB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxmOiBPcDtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgcnQ6IE9wO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBhbnksIGxmOiBPcCwgcnQ6IE9wKSB7XHJcbiAgICAgICAgc3VwZXIocG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMubGYgPSBsZjtcclxuICAgICAgICB0aGlzLnJ0ID0gcnQ7XHJcbiAgICB9XHJcblxyXG4gICAgR08oZW52OiBFbnZtbnQpOiBvYmplY3Qge1xyXG4gICAgICAgIGNvbnN0IGxmID0gdGhpcy5sZi5FeGUoZW52KTtcclxuICAgICAgICBjb25zdCBydCA9IHRoaXMucnQuRXhlKGVudik7XHJcblxyXG4gICAgICAgIGlmICghKGxmIGluc3RhbmNlb2YgUmVmZXJlbmNlKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgU2VtYW50aWNFeGNlcHRpb24oYE5vIHNlIHB1ZWRlIGFzaWdhbnIgYSAke2xmfSwgbGFzIGFzaWduYWNpb25lcyBzb2xvIHB1ZWRlbiBzZXIgc29icmUgdW5hIHJlZmVyZW5jaWFgLCB0aGlzLnBvc2l0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIChsZiBhcyBSZWZlcmVuY2UpLlB1dFZhbHVlT25SZWZlcmVuY2UoXHJcbiAgICAgICAgICAgIFN1bWEoKGxmIGFzIFJlZmVyZW5jZSkuZ2V0VmFsdWUoKSwgcnQgYXMgQ250bnIsIHRoaXMucG9zaXRpb24pXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gKGxmIGFzIFJlZmVyZW5jZSkuZ2V0VmFsdWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRHcmFwaChlbnY6IEVudm1udCk6IEdyYXBodml6Tm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHcmFwaHZpek5vZGUoJ1JFX0FTSUdOX0FERCcsIFt0aGlzLmxmLkdldEdyYXBoKGVudiksIHRoaXMucnQuR2V0R3JhcGgoZW52KV0pO1xyXG4gICAgfVxyXG5cclxuICAgIEdldFRTR3JhcGgoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge09wfSBmcm9tIFwiLi4vdXRpbHMvT3BcIjtcclxuaW1wb3J0IHtFbnZtbnR9IGZyb20gXCIuLi91dGlscy9FbnZtbnRcIjtcclxuaW1wb3J0IHtSZWZlcmVuY2V9IGZyb20gXCIuLi91dGlscy9SZWZlcmVuY2VcIjtcclxuaW1wb3J0IHtTZW1hbnRpY0V4Y2VwdGlvbn0gZnJvbSBcIi4uL3V0aWxzL1V0aWxzXCI7XHJcbmltcG9ydCB7RGl2aXNpb259IGZyb20gXCIuLi91dGlscy9BbGdlYnJhaWNPcGVyYXRpb25zRnVuY3Rpb25zXCI7XHJcbmltcG9ydCB7Q250bnJ9IGZyb20gXCIuLi91dGlscy9DbnRuclwiO1xyXG5pbXBvcnQge0dyYXBodml6Tm9kZX0gZnJvbSBcIi4uL3V0aWxzL0dyYXBodml6Tm9kZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlQXNpZ25EaXZOb2RlIGV4dGVuZHMgT3Age1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBsZjogT3A7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJ0OiBPcDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogYW55LCBsZjogT3AsIHJ0OiBPcCkge1xyXG4gICAgICAgIHN1cGVyKHBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLmxmID0gbGY7XHJcbiAgICAgICAgdGhpcy5ydCA9IHJ0O1xyXG4gICAgfVxyXG5cclxuICAgIEdPKGVudjogRW52bW50KTogb2JqZWN0IHtcclxuICAgICAgICBjb25zdCBsZiA9IHRoaXMubGYuRXhlKGVudik7XHJcbiAgICAgICAgY29uc3QgcnQgPSB0aGlzLnJ0LkV4ZShlbnYpO1xyXG5cclxuICAgICAgICBpZiAoIShsZiBpbnN0YW5jZW9mIFJlZmVyZW5jZSkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFNlbWFudGljRXhjZXB0aW9uKGBObyBzZSBwdWVkZSBhc2lnYW5yIGEgJHtsZn0sIGxhcyBhc2lnbmFjaW9uZXMgc29sbyBwdWVkZW4gc2VyIHNvYnJlIHVuYSByZWZlcmVuY2lhYCwgdGhpcy5wb3NpdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAobGYgYXMgUmVmZXJlbmNlKS5QdXRWYWx1ZU9uUmVmZXJlbmNlKFxyXG4gICAgICAgICAgICBEaXZpc2lvbigobGYgYXMgUmVmZXJlbmNlKS5nZXRWYWx1ZSgpLCBydCBhcyBDbnRuciwgdGhpcy5wb3NpdGlvbilcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiAobGYgYXMgUmVmZXJlbmNlKS5nZXRWYWx1ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIEdldEdyYXBoKGVudjogRW52bW50KTogR3JhcGh2aXpOb2RlIHtcclxuICAgICAgICByZXR1cm4gbmV3IEdyYXBodml6Tm9kZSgnUkVfQVNJR05fRElWJywgW3RoaXMubGYuR2V0R3JhcGgoZW52KSwgdGhpcy5ydC5HZXRHcmFwaChlbnYpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0VFNHcmFwaCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7T3B9IGZyb20gXCIuLi91dGlscy9PcFwiO1xyXG5pbXBvcnQge0Vudm1udH0gZnJvbSBcIi4uL3V0aWxzL0Vudm1udFwiO1xyXG5pbXBvcnQge1JlZmVyZW5jZX0gZnJvbSBcIi4uL3V0aWxzL1JlZmVyZW5jZVwiO1xyXG5pbXBvcnQge1NlbWFudGljRXhjZXB0aW9ufSBmcm9tIFwiLi4vdXRpbHMvVXRpbHNcIjtcclxuaW1wb3J0IHtNb2R1bG99IGZyb20gXCIuLi91dGlscy9BbGdlYnJhaWNPcGVyYXRpb25zRnVuY3Rpb25zXCI7XHJcbmltcG9ydCB7Q250bnJ9IGZyb20gXCIuLi91dGlscy9DbnRuclwiO1xyXG5pbXBvcnQge0dyYXBodml6Tm9kZX0gZnJvbSBcIi4uL3V0aWxzL0dyYXBodml6Tm9kZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlQXNpZ25Nb2ROb2RlIGV4dGVuZHMgT3Age1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBsZjogT3A7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJ0OiBPcDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogYW55LCBsZjogT3AsIHJ0OiBPcCkge1xyXG4gICAgICAgIHN1cGVyKHBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLmxmID0gbGY7XHJcbiAgICAgICAgdGhpcy5ydCA9IHJ0O1xyXG4gICAgfVxyXG5cclxuICAgIEdPKGVudjogRW52bW50KTogb2JqZWN0IHtcclxuICAgICAgICBjb25zdCBsZiA9IHRoaXMubGYuRXhlKGVudik7XHJcbiAgICAgICAgY29uc3QgcnQgPSB0aGlzLnJ0LkV4ZShlbnYpO1xyXG5cclxuICAgICAgICBpZiAoIShsZiBpbnN0YW5jZW9mIFJlZmVyZW5jZSkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFNlbWFudGljRXhjZXB0aW9uKGBObyBzZSBwdWVkZSBhc2lnYW5yIGEgJHtsZn0sIGxhcyBhc2lnbmFjaW9uZXMgc29sbyBwdWVkZW4gc2VyIHNvYnJlIHVuYSByZWZlcmVuY2lhYCwgdGhpcy5wb3NpdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAobGYgYXMgUmVmZXJlbmNlKS5QdXRWYWx1ZU9uUmVmZXJlbmNlKFxyXG4gICAgICAgICAgICBNb2R1bG8oKGxmIGFzIFJlZmVyZW5jZSkuZ2V0VmFsdWUoKSwgcnQgYXMgQ250bnIsIHRoaXMucG9zaXRpb24pXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gKGxmIGFzIFJlZmVyZW5jZSkuZ2V0VmFsdWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRHcmFwaChlbnY6IEVudm1udCk6IEdyYXBodml6Tm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHcmFwaHZpek5vZGUoJ1JFX0FTSUdOX01PRCcsIFt0aGlzLmxmLkdldEdyYXBoKGVudiksIHRoaXMucnQuR2V0R3JhcGgoZW52KV0pO1xyXG4gICAgfVxyXG5cclxuICAgIEdldFRTR3JhcGgoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtPcH0gZnJvbSBcIi4uL3V0aWxzL09wXCI7XHJcbmltcG9ydCB7RW52bW50fSBmcm9tIFwiLi4vdXRpbHMvRW52bW50XCI7XHJcbmltcG9ydCB7UmVmZXJlbmNlfSBmcm9tIFwiLi4vdXRpbHMvUmVmZXJlbmNlXCI7XHJcbmltcG9ydCB7U2VtYW50aWNFeGNlcHRpb259IGZyb20gXCIuLi91dGlscy9VdGlsc1wiO1xyXG5pbXBvcnQge011bHRpcGxpY2FjaW9ufSBmcm9tIFwiLi4vdXRpbHMvQWxnZWJyYWljT3BlcmF0aW9uc0Z1bmN0aW9uc1wiO1xyXG5pbXBvcnQge0NudG5yfSBmcm9tIFwiLi4vdXRpbHMvQ250bnJcIjtcclxuaW1wb3J0IHtHcmFwaHZpek5vZGV9IGZyb20gXCIuLi91dGlscy9HcmFwaHZpek5vZGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZUFzaWduTXVsTm9kZSBleHRlbmRzIE9wIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbGY6IE9wO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBydDogT3A7XHJcblxyXG4gICAgY29uc3RydWN0b3IocG9zaXRpb246IGFueSwgbGY6IE9wLCBydDogT3ApIHtcclxuICAgICAgICBzdXBlcihwb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5sZiA9IGxmO1xyXG4gICAgICAgIHRoaXMucnQgPSBydDtcclxuICAgIH1cclxuXHJcbiAgICBHTyhlbnY6IEVudm1udCk6IG9iamVjdCB7XHJcbiAgICAgICAgY29uc3QgbGYgPSB0aGlzLmxmLkV4ZShlbnYpO1xyXG4gICAgICAgIGNvbnN0IHJ0ID0gdGhpcy5ydC5FeGUoZW52KTtcclxuXHJcbiAgICAgICAgaWYgKCEobGYgaW5zdGFuY2VvZiBSZWZlcmVuY2UpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBTZW1hbnRpY0V4Y2VwdGlvbihgTm8gc2UgcHVlZGUgYXNpZ2FuciBhICR7bGZ9LCBsYXMgYXNpZ25hY2lvbmVzIHNvbG8gcHVlZGVuIHNlciBzb2JyZSB1bmEgcmVmZXJlbmNpYWAsIHRoaXMucG9zaXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgKGxmIGFzIFJlZmVyZW5jZSkuUHV0VmFsdWVPblJlZmVyZW5jZShcclxuICAgICAgICAgICAgTXVsdGlwbGljYWNpb24oKGxmIGFzIFJlZmVyZW5jZSkuZ2V0VmFsdWUoKSwgcnQgYXMgQ250bnIsIHRoaXMucG9zaXRpb24pXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gKGxmIGFzIFJlZmVyZW5jZSkuZ2V0VmFsdWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRHcmFwaChlbnY6IEVudm1udCk6IEdyYXBodml6Tm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHcmFwaHZpek5vZGUoJ1JFX0FTSUdOX01VTC0nLCBbdGhpcy5sZi5HZXRHcmFwaChlbnYpLCB0aGlzLnJ0LkdldEdyYXBoKGVudildKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRUU0dyYXBoKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7T3B9IGZyb20gXCIuLi91dGlscy9PcFwiO1xyXG5pbXBvcnQge0Vudm1udH0gZnJvbSBcIi4uL3V0aWxzL0Vudm1udFwiO1xyXG5pbXBvcnQge1JlZmVyZW5jZX0gZnJvbSBcIi4uL3V0aWxzL1JlZmVyZW5jZVwiO1xyXG5pbXBvcnQge1NlbWFudGljRXhjZXB0aW9ufSBmcm9tIFwiLi4vdXRpbHMvVXRpbHNcIjtcclxuaW1wb3J0IHtSZXN0YX0gZnJvbSBcIi4uL3V0aWxzL0FsZ2VicmFpY09wZXJhdGlvbnNGdW5jdGlvbnNcIjtcclxuaW1wb3J0IHtDbnRucn0gZnJvbSBcIi4uL3V0aWxzL0NudG5yXCI7XHJcbmltcG9ydCB7R3JhcGh2aXpOb2RlfSBmcm9tIFwiLi4vdXRpbHMvR3JhcGh2aXpOb2RlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVBc2lnblN1Yk5vZGUgZXh0ZW5kcyBPcCB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxmOiBPcDtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgcnQ6IE9wO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBhbnksIGxmOiBPcCwgcnQ6IE9wKSB7XHJcbiAgICAgICAgc3VwZXIocG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMubGYgPSBsZjtcclxuICAgICAgICB0aGlzLnJ0ID0gcnQ7XHJcbiAgICB9XHJcblxyXG4gICAgR08oZW52OiBFbnZtbnQpOiBvYmplY3Qge1xyXG4gICAgICAgIGNvbnN0IGxmID0gdGhpcy5sZi5FeGUoZW52KTtcclxuICAgICAgICBjb25zdCBydCA9IHRoaXMucnQuRXhlKGVudik7XHJcblxyXG4gICAgICAgIGlmICghKGxmIGluc3RhbmNlb2YgUmVmZXJlbmNlKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgU2VtYW50aWNFeGNlcHRpb24oYE5vIHNlIHB1ZWRlIGFzaWdhbnIgYSAke2xmfSwgbGFzIGFzaWduYWNpb25lcyBzb2xvIHB1ZWRlbiBzZXIgc29icmUgdW5hIHJlZmVyZW5jaWFgLCB0aGlzLnBvc2l0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIChsZiBhcyBSZWZlcmVuY2UpLlB1dFZhbHVlT25SZWZlcmVuY2UoXHJcbiAgICAgICAgICAgIFJlc3RhKChsZiBhcyBSZWZlcmVuY2UpLmdldFZhbHVlKCksIHJ0IGFzIENudG5yLCB0aGlzLnBvc2l0aW9uKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuIChsZiBhcyBSZWZlcmVuY2UpLmdldFZhbHVlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0R3JhcGgoZW52OiBFbnZtbnQpOiBHcmFwaHZpek5vZGUge1xyXG4gICAgICAgIHJldHVybiBuZXcgR3JhcGh2aXpOb2RlKCdSRV9BU0lHTl9TVUInLCBbdGhpcy5sZi5HZXRHcmFwaChlbnYpLCB0aGlzLnJ0LkdldEdyYXBoKGVudildKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRUU0dyYXBoKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7T3B9IGZyb20gXCIuLi91dGlscy9PcFwiO1xyXG5pbXBvcnQge0Vudm1udH0gZnJvbSBcIi4uL3V0aWxzL0Vudm1udFwiO1xyXG5pbXBvcnQge1N1Yn0gZnJvbSBcIi4uL3V0aWxzL0FsZ2VicmFpY09wZXJhdGlvbnNGdW5jdGlvbnNcIjtcclxuaW1wb3J0IHtDbnRucn0gZnJvbSBcIi4uL3V0aWxzL0NudG5yXCI7XHJcbmltcG9ydCB7R3JhcGh2aXpOb2RlfSBmcm9tIFwiLi4vdXRpbHMvR3JhcGh2aXpOb2RlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVTdWJOb2RlIGV4dGVuZHMgT3Age1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBsZjogT3A7XHJcblxyXG4gICAgY29uc3RydWN0b3IocG9zaXRpb246IGFueSwgbGY6IE9wKSB7XHJcbiAgICAgICAgc3VwZXIocG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMubGYgPSBsZjtcclxuICAgIH1cclxuXHJcbiAgICBHTyhlbnY6IEVudm1udCk6IG9iamVjdCB7XHJcbiAgICAgICAgcmV0dXJuIFN1Yih0aGlzLmxmLkV4ZShlbnYpIGFzIENudG5yLCB0aGlzLnBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRHcmFwaChlbnY6IEVudm1udCk6IEdyYXBodml6Tm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHcmFwaHZpek5vZGUoJ1JFX1NVQicsIFt0aGlzLmxmLkdldEdyYXBoKGVudildKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRUU0dyYXBoKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7T3B9IGZyb20gXCIuLi91dGlscy9PcFwiO1xyXG5pbXBvcnQge0Vudm1udH0gZnJvbSBcIi4uL3V0aWxzL0Vudm1udFwiO1xyXG5pbXBvcnQge1JldHVybk9ian0gZnJvbSBcIi4vUmV0dXJuT2JqXCI7XHJcbmltcG9ydCB7Q250bnJ9IGZyb20gXCIuLi91dGlscy9DbnRuclwiO1xyXG5pbXBvcnQge1VOREVGSU5FRH0gZnJvbSBcIi4uL3V0aWxzL1ByaW1pdGl2ZVR5cG9Db250YWluZXJcIjtcclxuaW1wb3J0IHtHcmFwaHZpek5vZGV9IGZyb20gXCIuLi91dGlscy9HcmFwaHZpek5vZGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZXR1cm5Ob2RlIGV4dGVuZHMgT3B7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHZhbHVlOiBPcDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogYW55LCB2YWx1ZTogT3ApIHtcclxuICAgICAgICBzdXBlcihwb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIEdPKGVudjogRW52bW50KTogb2JqZWN0IHtcclxuICAgICAgICBpZih0aGlzLnZhbHVlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy52YWx1ZS5FeGUoZW52KTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZXR1cm5PYmoodmFsdWUgYXMgQ250bnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IFJldHVybk9iaihuZXcgVU5ERUZJTkVEKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIEdldEdyYXBoKGVudjogRW52bW50KTogR3JhcGh2aXpOb2RlIHtcclxuICAgICAgICByZXR1cm4gbmV3IEdyYXBodml6Tm9kZSgnUkVUVVJOJywgdGhpcy52YWx1ZSA/IFt0aGlzLnZhbHVlLkdldEdyYXBoKGVudildOiBbXSk7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0VFNHcmFwaCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQge0NudG5yfSBmcm9tIFwiLi4vdXRpbHMvQ250bnJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZXR1cm5PYmogZXh0ZW5kcyBDbnRuciB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJldHVybm46IENudG5yO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHJldHVybm46IENudG5yKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnJldHVybm4gPSByZXR1cm5uO1xyXG4gICAgfVxyXG5cclxuICAgIHRvU3RyaW5nID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIFwibWkgb2JqZXRvIHJldHVybiAoUmV0dXJuT2JqKVwiO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0VmFsdWUoKTogQ250bnIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJldHVybm47XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge09wfSBmcm9tIFwiLi4vdXRpbHMvT3BcIjtcclxuaW1wb3J0IHtFbnZtbnR9IGZyb20gXCIuLi91dGlscy9FbnZtbnRcIjtcclxuaW1wb3J0IHtSZWZlcmVuY2V9IGZyb20gXCIuLi91dGlscy9SZWZlcmVuY2VcIjtcclxuaW1wb3J0IHtCT09MRUFOfSBmcm9tIFwiLi4vdXRpbHMvUHJpbWl0aXZlVHlwb0NvbnRhaW5lclwiO1xyXG5pbXBvcnQge1NlbWFudGljRXhjZXB0aW9ufSBmcm9tIFwiLi4vdXRpbHMvVXRpbHNcIjtcclxuaW1wb3J0IHtHcmFwaHZpek5vZGV9IGZyb20gXCIuLi91dGlscy9HcmFwaHZpek5vZGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTZW50ZW5jZVRlcm5hcnlOb2RlIGV4dGVuZHMgT3B7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvbmRpY2lvbjogT3A7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRydWVTZW50ZW5jZTogT3A7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGZhbHNlU2VudGVuY2U6IE9wO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBhbnksIGNvbmRpdGlvbjogT3AsIHRydWVTZW50ZW5jZTogT3AsIGZhbHNlU2VudGVuY2U6IE9wKSB7XHJcbiAgICAgICAgc3VwZXIocG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMuY29uZGljaW9uID0gY29uZGl0aW9uO1xyXG4gICAgICAgIHRoaXMudHJ1ZVNlbnRlbmNlID0gdHJ1ZVNlbnRlbmNlO1xyXG4gICAgICAgIHRoaXMuZmFsc2VTZW50ZW5jZSA9IGZhbHNlU2VudGVuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgR08oZW52OiBFbnZtbnQpOiBvYmplY3Qge1xyXG4gICAgICAgIGxldCBhbnMgPSB0aGlzLmNvbmRpY2lvbi5FeGUoZW52KTtcclxuICAgICAgICBpZiAoYW5zIGluc3RhbmNlb2YgUmVmZXJlbmNlKSB7XHJcbiAgICAgICAgICAgIGFucyA9IChhbnMgYXMgUmVmZXJlbmNlKS5nZXRWYWx1ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCEoYW5zIGluc3RhbmNlb2YgQk9PTEVBTikpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFNlbWFudGljRXhjZXB0aW9uKFwiQ29uZGljaW9uIHV0aWxpemFkYSBjb24gcGFyYW1ldHJvIG5vIHNvcG9ydGFkYSBwb3Igb3BlcmFkb3IgdGVybmFyaW9cIiwgdGhpcy5wb3NpdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoKGFucyBhcyBCT09MRUFOKS5nZXRWYWx1ZSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRydWVTZW50ZW5jZS5FeGUoZW52KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmFsc2VTZW50ZW5jZS5FeGUoZW52KTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRHcmFwaChlbnY6IEVudm1udCk6IEdyYXBodml6Tm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHcmFwaHZpek5vZGUoJ1RFUk5BUlknLCBbdGhpcy5jb25kaWNpb24uR2V0R3JhcGgoZW52KSwgdGhpcy50cnVlU2VudGVuY2UuR2V0R3JhcGgoZW52KSwgdGhpcy5mYWxzZVNlbnRlbmNlLkdldEdyYXBoKGVudildKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRUU0dyYXBoKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7T3B9IGZyb20gXCIuLi91dGlscy9PcFwiO1xyXG5pbXBvcnQge0Vudm1udH0gZnJvbSBcIi4uL3V0aWxzL0Vudm1udFwiO1xyXG5pbXBvcnQge1NUUklOR30gZnJvbSBcIi4uL3V0aWxzL1ByaW1pdGl2ZVR5cG9Db250YWluZXJcIjtcclxuaW1wb3J0IHtHcmFwaHZpek5vZGV9IGZyb20gXCIuLi91dGlscy9HcmFwaHZpek5vZGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTdHJpbmdOb2RlIGV4dGVuZHMgT3B7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHZhbDogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBhbnksIHZhbDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIocG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMudmFsID0gdmFsLnJlcGxhY2UoL1xcXFxuL2csIFwiJiMxMzsmIzEwOyAgICAgICBcIikucmVwbGFjZSgvXFxcXHQvZywgXCImIzk7XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIEdPKGVudjogRW52bW50KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBTVFJJTkcodGhpcy52YWwuc3Vic3RyaW5nKDEsIHRoaXMudmFsLmxlbmd0aCAtIDEpKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRHcmFwaChlbnY6IEVudm1udCk6IEdyYXBodml6Tm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHcmFwaHZpek5vZGUoJ1NUUklORycsIFtuZXcgR3JhcGh2aXpOb2RlKHRoaXMudmFsLnN1YnN0cmluZygxLCB0aGlzLnZhbC5sZW5ndGggLSAxKSldKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRUU0dyYXBoKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7T3B9IGZyb20gXCIuLi91dGlscy9PcFwiO1xyXG5pbXBvcnQge0Vudm1udH0gZnJvbSBcIi4uL3V0aWxzL0Vudm1udFwiO1xyXG5pbXBvcnQge1Jlc3RhfSBmcm9tIFwiLi4vdXRpbHMvQWxnZWJyYWljT3BlcmF0aW9uc0Z1bmN0aW9uc1wiO1xyXG5pbXBvcnQge0NudG5yfSBmcm9tIFwiLi4vdXRpbHMvQ250bnJcIjtcclxuaW1wb3J0IHtHcmFwaHZpek5vZGV9IGZyb20gXCIuLi91dGlscy9HcmFwaHZpek5vZGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTdWJOb2RlIGV4dGVuZHMgT3Age1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBsZjogT3A7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJ0OiBPcDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogYW55LCBsZjogT3AsIHJ0OiBPcCkge1xyXG4gICAgICAgIHN1cGVyKHBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLmxmID0gbGY7XHJcbiAgICAgICAgdGhpcy5ydCA9IHJ0O1xyXG4gICAgfVxyXG5cclxuICAgIEdPKGVudjogRW52bW50KTogb2JqZWN0IHtcclxuICAgICAgICByZXR1cm4gUmVzdGEoKHRoaXMubGYuRXhlKGVudikgYXMgQ250bnIpLCAodGhpcy5ydC5FeGUoZW52KSBhcyBDbnRuciksIHRoaXMucG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIEdldEdyYXBoKGVudjogRW52bW50KTogR3JhcGh2aXpOb2RlIHtcclxuICAgICAgICByZXR1cm4gbmV3IEdyYXBodml6Tm9kZSgnU1VCJywgW3RoaXMubGYuR2V0R3JhcGgoZW52KSwgdGhpcy5ydC5HZXRHcmFwaChlbnYpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0VFNHcmFwaCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7T3B9IGZyb20gXCIuLi91dGlscy9PcFwiO1xyXG5pbXBvcnQge0Vudm1udH0gZnJvbSBcIi4uL3V0aWxzL0Vudm1udFwiO1xyXG5pbXBvcnQge1N1bWF9IGZyb20gXCIuLi91dGlscy9BbGdlYnJhaWNPcGVyYXRpb25zRnVuY3Rpb25zXCI7XHJcbmltcG9ydCB7Q250bnJ9IGZyb20gXCIuLi91dGlscy9DbnRuclwiO1xyXG5pbXBvcnQge0dyYXBodml6Tm9kZX0gZnJvbSBcIi4uL3V0aWxzL0dyYXBodml6Tm9kZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN1bU5vZGUgZXh0ZW5kcyBPcCB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxmOiBPcDtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgcnQ6IE9wO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBhbnksIGxmOiBPcCwgcnQ6IE9wKSB7XHJcbiAgICAgICAgc3VwZXIocG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMubGYgPSBsZjtcclxuICAgICAgICB0aGlzLnJ0ID0gcnQ7XHJcbiAgICB9XHJcblxyXG4gICAgR08oZW52OiBFbnZtbnQpOiBvYmplY3Qge1xyXG4gICAgICAgIHJldHVybiBTdW1hKCh0aGlzLmxmLkV4ZShlbnYpIGFzIENudG5yKSwgKHRoaXMucnQuRXhlKGVudikgYXMgQ250bnIpLCB0aGlzLnBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRHcmFwaChlbnY6IEVudm1udCk6IEdyYXBodml6Tm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHcmFwaHZpek5vZGUoJ1NVTScsIFt0aGlzLmxmLkdldEdyYXBoKGVudiksIHRoaXMucnQuR2V0R3JhcGgoZW52KV0pO1xyXG4gICAgfVxyXG5cclxuICAgIEdldFRTR3JhcGgoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtPcH0gZnJvbSBcIi4uL3V0aWxzL09wXCI7XHJcbmltcG9ydCB7RW52bW50fSBmcm9tIFwiLi4vdXRpbHMvRW52bW50XCI7XHJcbmltcG9ydCB7SWd1YWx9IGZyb20gXCIuLi91dGlscy9SZWxhdGlvbmFsT3BlcmF0aW9uc0Z1bmN0aW9uc1wiO1xyXG5pbXBvcnQge0NudG5yfSBmcm9tIFwiLi4vdXRpbHMvQ250bnJcIjtcclxuaW1wb3J0IHtCT09MRUFOfSBmcm9tIFwiLi4vdXRpbHMvUHJpbWl0aXZlVHlwb0NvbnRhaW5lclwiO1xyXG5pbXBvcnQge0JyZWFrTm9kZX0gZnJvbSBcIi4vQnJlYWtOb2RlXCI7XHJcbmltcG9ydCB7QnJlYWtPYmp9IGZyb20gXCIuL0JyZWFrT2JqXCI7XHJcbmltcG9ydCB7UmV0dXJuT2JqfSBmcm9tIFwiLi9SZXR1cm5PYmpcIjtcclxuaW1wb3J0IHtDb250aW51ZU9ian0gZnJvbSBcIi4vQ29udGludWVPYmpcIjtcclxuaW1wb3J0IHtDYXNlTm9kZX0gZnJvbSBcIi4vQ2FzZU5vZGVcIjtcclxuaW1wb3J0IHtTZW1hbnRpY0V4Y2VwdGlvbn0gZnJvbSBcIi4uL3V0aWxzL1V0aWxzXCI7XHJcbmltcG9ydCB7R3JhcGh2aXpOb2RlfSBmcm9tIFwiLi4vdXRpbHMvR3JhcGh2aXpOb2RlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU3dpdGNoTm9kZSBleHRlbmRzIE9wIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgY29uZGl0aW9uOiBPcDtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2FzZXM6IEFycmF5PENhc2VOb2RlPjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogYW55LCBjb25kaXRpb246IE9wLCBjYXNlczogQXJyYXk8Q2FzZU5vZGU+KSB7XHJcbiAgICAgICAgc3VwZXIocG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMuY29uZGl0aW9uID0gY29uZGl0aW9uO1xyXG4gICAgICAgIHRoaXMuY2FzZXMgPSBjYXNlcztcclxuICAgIH1cclxuXHJcbiAgICBHTyhlbnY6IEVudm1udCk6IG9iamVjdCB7XHJcbiAgICAgICAgbGV0IGNvbmRpdGlvbiA9IHRoaXMuY29uZGl0aW9uLkV4ZShlbnYpO1xyXG4gICAgICAgIGxldCByZXQ6IENudG5yID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCBoYXNFbnRlciA9IGZhbHNlO1xyXG5cclxuICAgICAgICBsZXQgZGVmYXVsdENvdW50ID0gMDtcclxuICAgICAgICBmb3IgKGxldCBDYXNlIG9mIHRoaXMuY2FzZXMpIHtcclxuICAgICAgICAgICAgaWYgKENhc2UuZ2V0Q29uZGl0aW9uVmFsdWUoKSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdENvdW50Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkZWZhdWx0Q291bnQgPiAxKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBTZW1hbnRpY0V4Y2VwdGlvbihcIk5vIHB1ZWRlbiBleGlzaXN0aXIgbWFzIGRlIHVuYSBzZW50ZW5jaWEgJ2RlZmF1bHQnIGRlbnRybyBkZSB1biBjaWNsbyBzd2l0Y2hcIiwgdGhpcy5wb3NpdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBDYXNlIG9mIHRoaXMuY2FzZXMpIHtcclxuICAgICAgICAgICAgaWYgKHJldCBpbnN0YW5jZW9mIEJyZWFrT2JqKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocmV0IGluc3RhbmNlb2YgUmV0dXJuT2JqKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyZXQgaW5zdGFuY2VvZiBDb250aW51ZU9iaikge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKENhc2UuZ2V0Q29uZGl0aW9uVmFsdWUoKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNhc2VWYWx1ZSA9IENhc2UuZ2V0Q29uZGl0aW9uVmFsdWUoKS5FeGUoZW52KTtcclxuICAgICAgICAgICAgICAgIGlmICghKElndWFsKGNvbmRpdGlvbiBhcyBDbnRuciwgY2FzZVZhbHVlIGFzIENudG5yLCB0aGlzLnBvc2l0aW9uKSBhcyBCT09MRUFOKS5nZXRWYWx1ZSgpICYmICFoYXNFbnRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBlbnYwID0gbmV3IEVudm1udChlbnYsIENhc2UuZ2V0U2VudGVuY2VzKCkpO1xyXG4gICAgICAgICAgICByZXQgPSBlbnYwLkdPX0FMTCgpO1xyXG4gICAgICAgICAgICBoYXNFbnRlciA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAocmV0IGluc3RhbmNlb2YgQnJlYWtPYmopIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyZXQgaW5zdGFuY2VvZiBSZXR1cm5PYmopIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBHZXRHcmFwaChlbnY6IEVudm1udCk6IEdyYXBodml6Tm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHcmFwaHZpek5vZGUoJ1NXVElDSCcsIFtcclxuICAgICAgICAgICAgdGhpcy5jb25kaXRpb24uR2V0R3JhcGgoZW52KSxcclxuICAgICAgICAgICAgbmV3IEdyYXBodml6Tm9kZSgnU1dJVENIX0JPRFknLCB0aGlzLmNhc2VzLm1hcChjYXNlZSA9PlxyXG4gICAgICAgICAgICAgICAgbmV3IEdyYXBodml6Tm9kZSgnQ0FTRScsIFtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlZS5nZXRDb25kaXRpb25WYWx1ZSgpID8gY2FzZWUuZ2V0Q29uZGl0aW9uVmFsdWUoKS5HZXRHcmFwaChlbnYpIDogbmV3IEdyYXBodml6Tm9kZSgnVU5ERUZJTkVEJyksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IEdyYXBodml6Tm9kZSgnU0VOVEVOQ0VTJywgY2FzZWUuZ2V0U2VudGVuY2VzKCkubWFwKHNlbnRlbmNlID0+IHNlbnRlbmNlLkdldEdyYXBoKGVudikpKVxyXG4gICAgICAgICAgICAgICAgXSkpKVxyXG4gICAgICAgIF0pO1xyXG4gICAgfVxyXG5cclxuICAgIEdldFRTR3JhcGgoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtPcH0gZnJvbSBcIi4uL3V0aWxzL09wXCI7XHJcbmltcG9ydCB7RW52bW50fSBmcm9tIFwiLi4vdXRpbHMvRW52bW50XCI7XHJcbmltcG9ydCB7VU5ERUZJTkVEfSBmcm9tIFwiLi4vdXRpbHMvUHJpbWl0aXZlVHlwb0NvbnRhaW5lclwiO1xyXG5pbXBvcnQge0dyYXBodml6Tm9kZX0gZnJvbSBcIi4uL3V0aWxzL0dyYXBodml6Tm9kZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFVuZGVmaW5lZE5vZGUgZXh0ZW5kcyBPcHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgR08oZW52OiBFbnZtbnQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFVOREVGSU5FRCgpO1xyXG4gICAgfVxyXG5cclxuICAgIEdldEdyYXBoKGVudjogRW52bW50KTogR3JhcGh2aXpOb2RlIHtcclxuICAgICAgICByZXR1cm4gbmV3IEdyYXBodml6Tm9kZSgnVU5ERUZJTkVEJywgW25ldyBHcmFwaHZpek5vZGUoJ3VuZGVmaW5lZCcpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0VFNHcmFwaCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQge09wfSBmcm9tIFwiLi4vdXRpbHMvT3BcIjtcclxuaW1wb3J0IHtFbnZtbnR9IGZyb20gXCIuLi91dGlscy9FbnZtbnRcIjtcclxuaW1wb3J0IHtMb2dpY1doaWxlfSBmcm9tIFwiLi4vdXRpbHMvVXRpbHNcIjtcclxuaW1wb3J0IHtHcmFwaHZpek5vZGV9IGZyb20gXCIuLi91dGlscy9HcmFwaHZpek5vZGVcIjtcclxuaW1wb3J0IHtUU0dyYXBoQ29udHJvbH0gZnJvbSBcIi4uL3V0aWxzL1RTR3JhcGhDb250cm9sXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgV2hpbGVOb2RlIGV4dGVuZHMgT3Age1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjb25kaXRpb246IE9wO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBzZW50ZW5jZXM6IEFycmF5PE9wPjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogYW55LCBjb25kaXRpb246IE9wLCBzZW50ZW5jZXM6IEFycmF5PE9wPikge1xyXG4gICAgICAgIHN1cGVyKHBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLmNvbmRpdGlvbiA9IGNvbmRpdGlvbjtcclxuICAgICAgICB0aGlzLnNlbnRlbmNlcyA9IHNlbnRlbmNlcztcclxuICAgIH1cclxuXHJcbiAgICBHTyhlbnY6IEVudm1udCk6IG9iamVjdCB7XHJcbiAgICAgICAgcmV0dXJuIExvZ2ljV2hpbGUoZW52LCB0aGlzLmNvbmRpdGlvbiwgdGhpcy5zZW50ZW5jZXMsIG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIEdldEdyYXBoKGVudjogRW52bW50KTogR3JhcGh2aXpOb2RlIHtcclxuICAgICAgICByZXR1cm4gbmV3IEdyYXBodml6Tm9kZSgnV0hJTEUnLCBbdGhpcy5jb25kaXRpb24uR2V0R3JhcGgoZW52KSwgbmV3IEdyYXBodml6Tm9kZSgnV0hJTEVfQk9EWScsIHRoaXMuc2VudGVuY2VzLm1hcChzZW50ZW5jZSA9PiBzZW50ZW5jZS5HZXRHcmFwaChlbnYpKSldKTtcclxuICAgIH1cclxuXHJcbiAgICBHZXRUU0dyYXBoKCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHZhbHVlID0gJyc7XHJcbiAgICAgICAgY29uc3QgZ3JhcGhJZCA9IFRTR3JhcGhDb250cm9sLkdldEdyYXBoSWQoKTtcclxuICAgICAgICB2YWx1ZSArPSBgc3ViZ3JhcGggY2x1c3Rlcl8ke2dyYXBoSWR9IHsgXFxuYDtcclxuICAgICAgICB2YWx1ZSArPSAnc3R5bGU9ZmlsbGVkO1xcbicgK1xyXG4gICAgICAgICAgICAnY29sb3I9XCIjMkJCQkFEXCI7XFxuJyArXHJcbiAgICAgICAgICAgICdmaWxsY29sb3I9XCIjMUUyMjJBXCI7XFxuJztcclxuICAgICAgICB2YWx1ZSArPSAnbm9kZSBbY29sb3I9XCIjMkJCQkFEXCIgZm9udGNvbG9yPVwiIzJCQkJBRFwiIHNoYXBlPVwicmVjdGFuZ2xlXCJdIFxcbic7XHJcbiAgICAgICAgdmFsdWUgKz0gdGhpcy5jb25kaXRpb24uR2V0VFNHcmFwaCgpO1xyXG4gICAgICAgIHRoaXMuc2VudGVuY2VzLmZvckVhY2goc2VudGVuY2UgPT4ge1xyXG4gICAgICAgICAgICB2YWx1ZSArPSBzZW50ZW5jZS5HZXRUU0dyYXBoKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFsdWUgKz0gYGxhYmVsID0gXCIke1wiV0hJTEVfU0VOVEVOQ0VcIn1cIjtcXG5gO1xyXG4gICAgICAgIHZhbHVlICs9IGB9XFxuYDtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtDbnRucn0gZnJvbSBcIi4vQ250bnJcIjtcclxuaW1wb3J0IHtSZWZlcmVuY2V9IGZyb20gXCIuL1JlZmVyZW5jZVwiO1xyXG5pbXBvcnQge1NlbWFudGljRXhjZXB0aW9ufSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQge0JPT0xFQU4sIE5BTiwgTlVMTCwgTlVNQkVSLCBTVFJJTkcsIFVOREVGSU5FRH0gZnJvbSBcIi4vUHJpbWl0aXZlVHlwb0NvbnRhaW5lclwiO1xyXG5pbXBvcnQge1Bvc2l0aW9ufSBmcm9tIFwiLi9FcnJvcnNDb250cm9sXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gU3VtYShsZjogQ250bnIsIHJ0OiBDbnRuciwgcG9zaXRpb246IFBvc2l0aW9uID0gbmV3IFBvc2l0aW9uKCkpOiBDbnRuciB7XHJcbiAgICBsZiBpbnN0YW5jZW9mIFJlZmVyZW5jZSA/IGxmID0gKGxmIGFzIFJlZmVyZW5jZSkuZ2V0VmFsdWUoKSA6IGxmO1xyXG4gICAgcnQgaW5zdGFuY2VvZiBSZWZlcmVuY2UgPyBydCA9IChydCBhcyBSZWZlcmVuY2UpLmdldFZhbHVlKCkgOiBydDtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIHJldHVybiBTdW1hcihsZiwgcnQpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIHRocm93IG5ldyBTZW1hbnRpY0V4Y2VwdGlvbihgT3BlcmFjaW9uIGVudHJlIHRpcG9zICggJHtsZi50eXBvfSArICR7cnQudHlwb30gKSBubyBwZXJtaXRpZGEuYCwgcG9zaXRpb24pXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gU3VtYXIobGY6IGFueSwgcnQ6IGFueSk6IENudG5yIHtcclxuICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgY2FzZSBsZiBpbnN0YW5jZW9mIE5VTUJFUjpcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcnQgaW5zdGFuY2VvZiBOVU1CRVI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTlVNQkVSKChsZiBhcyBOVU1CRVIpLmdldFZhbHVlKCkgKyAocnQgYXMgTlVNQkVSKS5nZXRWYWx1ZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgQk9PTEVBTjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBOVU1CRVIoKGxmIGFzIE5VTUJFUikuZ2V0VmFsdWUoKSArIChydCBhcyBCT09MRUFOKS5nZXRWYWx1ZU51bWJlcigpKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgU1RSSU5HOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFNUUklORygobGYgYXMgTlVNQkVSKS5nZXRWYWx1ZSgpICsgKHJ0IGFzIFNUUklORykuZ2V0VmFsdWUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgbGYgaW5zdGFuY2VvZiBCT09MRUFOOlxyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBydCBpbnN0YW5jZW9mIE5VTUJFUjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBOVU1CRVIoKGxmIGFzIEJPT0xFQU4pLmdldFZhbHVlTnVtYmVyKCkgKyAocnQgYXMgTlVNQkVSKS5nZXRWYWx1ZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgQk9PTEVBTjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBOVU1CRVIoKGxmIGFzIEJPT0xFQU4pLmdldFZhbHVlTnVtYmVyKCkgKyAocnQgYXMgQk9PTEVBTikuZ2V0VmFsdWVOdW1iZXIoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBydCBpbnN0YW5jZW9mIFNUUklORzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBTVFJJTkcoKGxmIGFzIEJPT0xFQU4pLmdldFZhbHVlKCkgKyAocnQgYXMgU1RSSU5HKS5nZXRWYWx1ZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBsZiBpbnN0YW5jZW9mIFNUUklORzpcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcnQgaW5zdGFuY2VvZiBOVU1CRVI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgU1RSSU5HKChsZiBhcyBTVFJJTkcpLmdldFZhbHVlKCkgKyAocnQgYXMgTlVNQkVSKS5nZXRWYWx1ZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgQk9PTEVBTjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBTVFJJTkcoKGxmIGFzIFNUUklORykuZ2V0VmFsdWUoKSArIChydCBhcyBCT09MRUFOKS5nZXRWYWx1ZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgU1RSSU5HOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFNUUklORygobGYgYXMgU1RSSU5HKS5nZXRWYWx1ZSgpICsgKHJ0IGFzIFNUUklORykuZ2V0VmFsdWUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBydCBpbnN0YW5jZW9mIFVOREVGSU5FRDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBTVFJJTkcoKGxmIGFzIFNUUklORykuZ2V0VmFsdWUoKSArIChydCBhcyBVTkRFRklORUQpKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgTlVMTDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBTVFJJTkcoKGxmIGFzIFNUUklORykuZ2V0VmFsdWUoKSArIChydCBhcyBOVUxMKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgbGYgaW5zdGFuY2VvZiBVTkRFRklORUQ6XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgU1RSSU5HOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFNUUklORygobGYgYXMgVU5ERUZJTkVEKSArIChydCBhcyBTVFJJTkcpLmdldFZhbHVlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIGxmIGluc3RhbmNlb2YgTlVMTDpcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcnQgaW5zdGFuY2VvZiBTVFJJTkc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgU1RSSU5HKChsZiBhcyBOVUxMKSArIChydCBhcyBTVFJJTkcpLmdldFZhbHVlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVzdGEobGY6IENudG5yLCBydDogQ250bnIsIHBvc2l0aW9uOiBQb3NpdGlvbiA9IG5ldyBQb3NpdGlvbigpKTogQ250bnIge1xyXG4gICAgbGYgaW5zdGFuY2VvZiBSZWZlcmVuY2UgPyBsZiA9IChsZiBhcyBSZWZlcmVuY2UpLmdldFZhbHVlKCkgOiBsZjtcclxuICAgIHJ0IGluc3RhbmNlb2YgUmVmZXJlbmNlID8gcnQgPSAocnQgYXMgUmVmZXJlbmNlKS5nZXRWYWx1ZSgpIDogcnQ7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gUmVzdGFyKGxmLCBydCk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFNlbWFudGljRXhjZXB0aW9uKGBPcGVyYWNpb24gZW50cmUgdGlwb3MgKCAke2xmLnR5cG99IC0gJHtydC50eXBvfSApIG5vIHBlcm1pdGlkYS5gLCBwb3NpdGlvbilcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBSZXN0YXIobGY6IGFueSwgcnQ6IGFueSk6IENudG5yIHtcclxuICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgY2FzZSBsZiBpbnN0YW5jZW9mIE5VTUJFUjpcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcnQgaW5zdGFuY2VvZiBOVU1CRVI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTlVNQkVSKChsZiBhcyBOVU1CRVIpLmdldFZhbHVlKCkgLSAocnQgYXMgTlVNQkVSKS5nZXRWYWx1ZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgQk9PTEVBTjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBOVU1CRVIoKGxmIGFzIE5VTUJFUikuZ2V0VmFsdWUoKSAtIChydCBhcyBCT09MRUFOKS5nZXRWYWx1ZU51bWJlcigpKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBsZiBpbnN0YW5jZW9mIEJPT0xFQU46XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgTlVNQkVSOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE5VTUJFUigobGYgYXMgQk9PTEVBTikuZ2V0VmFsdWVOdW1iZXIoKSAtIChydCBhcyBOVU1CRVIpLmdldFZhbHVlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcnQgaW5zdGFuY2VvZiBCT09MRUFOOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE5VTUJFUigobGYgYXMgQk9PTEVBTikuZ2V0VmFsdWVOdW1iZXIoKSAtIChydCBhcyBCT09MRUFOKS5nZXRWYWx1ZU51bWJlcigpKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE11bHRpcGxpY2FjaW9uKGxmOiBDbnRuciwgcnQ6IENudG5yLCBwb3NpdGlvbjogUG9zaXRpb24gPSBuZXcgUG9zaXRpb24oKSk6IENudG5yIHtcclxuICAgIGxmIGluc3RhbmNlb2YgUmVmZXJlbmNlID8gbGYgPSAobGYgYXMgUmVmZXJlbmNlKS5nZXRWYWx1ZSgpIDogbGY7XHJcbiAgICBydCBpbnN0YW5jZW9mIFJlZmVyZW5jZSA/IHJ0ID0gKHJ0IGFzIFJlZmVyZW5jZSkuZ2V0VmFsdWUoKSA6IHJ0O1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIE11bHRpcGxpY2FyKGxmLCBydCk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFNlbWFudGljRXhjZXB0aW9uKGBPcGVyYWNpb24gZW50cmUgdGlwb3MgKCAke2xmLnR5cG99ICogJHtydC50eXBvfSApIG5vIHBlcm1pdGlkYS5gLCBwb3NpdGlvbilcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBNdWx0aXBsaWNhcihsZjogYW55LCBydDogYW55KTogQ250bnIge1xyXG4gICAgICAgIHN3aXRjaCAodHJ1ZSkge1xyXG4gICAgICAgICAgICBjYXNlIGxmIGluc3RhbmNlb2YgTlVNQkVSOlxyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBydCBpbnN0YW5jZW9mIE5VTUJFUjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBOVU1CRVIoKGxmIGFzIE5VTUJFUikuZ2V0VmFsdWUoKSAqIChydCBhcyBOVU1CRVIpLmdldFZhbHVlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcnQgaW5zdGFuY2VvZiBCT09MRUFOOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE5VTUJFUigobGYgYXMgTlVNQkVSKS5nZXRWYWx1ZSgpICogKHJ0IGFzIEJPT0xFQU4pLmdldFZhbHVlTnVtYmVyKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIGxmIGluc3RhbmNlb2YgQk9PTEVBTjpcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcnQgaW5zdGFuY2VvZiBOVU1CRVI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTlVNQkVSKChsZiBhcyBCT09MRUFOKS5nZXRWYWx1ZU51bWJlcigpICogKHJ0IGFzIE5VTUJFUikuZ2V0VmFsdWUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBydCBpbnN0YW5jZW9mIEJPT0xFQU46XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTlVNQkVSKChsZiBhcyBCT09MRUFOKS5nZXRWYWx1ZU51bWJlcigpICogKHJ0IGFzIEJPT0xFQU4pLmdldFZhbHVlTnVtYmVyKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRGl2aXNpb24obGY6IENudG5yLCBydDogQ250bnIsIHBvc2l0aW9uOiBQb3NpdGlvbiA9IG5ldyBQb3NpdGlvbigpKTogQ250bnIge1xyXG4gICAgbGYgaW5zdGFuY2VvZiBSZWZlcmVuY2UgPyBsZiA9IChsZiBhcyBSZWZlcmVuY2UpLmdldFZhbHVlKCkgOiBsZjtcclxuICAgIHJ0IGluc3RhbmNlb2YgUmVmZXJlbmNlID8gcnQgPSAocnQgYXMgUmVmZXJlbmNlKS5nZXRWYWx1ZSgpIDogcnQ7XHJcblxyXG4gICAgaWYocnQgaW5zdGFuY2VvZiBOVU1CRVIpe1xyXG4gICAgICAgIGlmKChydCBhcyBOVU1CRVIpLmdldFZhbHVlKCkgPT09IDApe1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgU2VtYW50aWNFeGNlcHRpb24oJ09wZXJhY2nDs24gbm8gdsOhbGlkYSwgbm8gc2UgcHVlZGUgZGl2aWRpciBlbnRyZSAwJywgcG9zaXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSBpZihydCBpbnN0YW5jZW9mIEJPT0xFQU4pe1xyXG4gICAgICAgIGlmKChydCBhcyBCT09MRUFOKS5nZXRWYWx1ZU51bWJlcigpID09PSAwKXtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFNlbWFudGljRXhjZXB0aW9uKCdPcGVyYWNpw7NuIG5vIHbDoWxpZGEsIG5vIHNlIHB1ZWRlIGRpdmlkaXIgZW50cmUgMCcsIHBvc2l0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHJldHVybiBEaXZpZGlyKGxmLCBydCk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFNlbWFudGljRXhjZXB0aW9uKGBPcGVyYWNpb24gZW50cmUgdGlwb3MgKCAke2xmLnR5cG99IC8gJHtydC50eXBvfSApIG5vIHBlcm1pdGlkYS5gKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIERpdmlkaXIobGY6IGFueSwgcnQ6IGFueSk6IENudG5yIHtcclxuICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgY2FzZSBsZiBpbnN0YW5jZW9mIE5VTUJFUjpcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcnQgaW5zdGFuY2VvZiBOVU1CRVI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTlVNQkVSKChsZiBhcyBOVU1CRVIpLmdldFZhbHVlKCkgLyAocnQgYXMgTlVNQkVSKS5nZXRWYWx1ZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgQk9PTEVBTjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBOVU1CRVIoKGxmIGFzIE5VTUJFUikuZ2V0VmFsdWUoKSAvIChydCBhcyBCT09MRUFOKS5nZXRWYWx1ZU51bWJlcigpKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBsZiBpbnN0YW5jZW9mIEJPT0xFQU46XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgTlVNQkVSOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE5VTUJFUigobGYgYXMgQk9PTEVBTikuZ2V0VmFsdWVOdW1iZXIoKSAvIChydCBhcyBOVU1CRVIpLmdldFZhbHVlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcnQgaW5zdGFuY2VvZiBCT09MRUFOOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE5VTUJFUigobGYgYXMgQk9PTEVBTikuZ2V0VmFsdWVOdW1iZXIoKSAvIChydCBhcyBCT09MRUFOKS5nZXRWYWx1ZU51bWJlcigpKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE1vZHVsbyhsZjogQ250bnIsIHJ0OiBDbnRuciwgcG9zaXRpb246IFBvc2l0aW9uID0gbmV3IFBvc2l0aW9uKCkpOiBDbnRuciB7XHJcbiAgICBsZiBpbnN0YW5jZW9mIFJlZmVyZW5jZSA/IGxmID0gKGxmIGFzIFJlZmVyZW5jZSkuZ2V0VmFsdWUoKSA6IGxmO1xyXG4gICAgcnQgaW5zdGFuY2VvZiBSZWZlcmVuY2UgPyBydCA9IChydCBhcyBSZWZlcmVuY2UpLmdldFZhbHVlKCkgOiBydDtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIHJldHVybiBNb2QobGYsIHJ0KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICB0aHJvdyBuZXcgU2VtYW50aWNFeGNlcHRpb24oYE9wZXJhY2lvbiBlbnRyZSB0aXBvcyAoICR7bGYudHlwb30gJSAke3J0LnR5cG99ICkgbm8gcGVybWl0aWRhLmAsIHBvc2l0aW9uKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIE1vZChsZjogYW55LCBydDogYW55KTogQ250bnIge1xyXG4gICAgICAgIHN3aXRjaCAodHJ1ZSkge1xyXG4gICAgICAgICAgICBjYXNlIGxmIGluc3RhbmNlb2YgTlVNQkVSOlxyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBydCBpbnN0YW5jZW9mIE5VTUJFUjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBOVU1CRVIoKGxmIGFzIE5VTUJFUikuZ2V0VmFsdWUoKSAlIChydCBhcyBOVU1CRVIpLmdldFZhbHVlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcnQgaW5zdGFuY2VvZiBCT09MRUFOOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE5VTUJFUigobGYgYXMgTlVNQkVSKS5nZXRWYWx1ZSgpICUgKHJ0IGFzIEJPT0xFQU4pLmdldFZhbHVlTnVtYmVyKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIGxmIGluc3RhbmNlb2YgQk9PTEVBTjpcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcnQgaW5zdGFuY2VvZiBOVU1CRVI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTlVNQkVSKChsZiBhcyBCT09MRUFOKS5nZXRWYWx1ZU51bWJlcigpICUgKHJ0IGFzIE5VTUJFUikuZ2V0VmFsdWUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBydCBpbnN0YW5jZW9mIEJPT0xFQU46XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTlVNQkVSKChsZiBhcyBCT09MRUFOKS5nZXRWYWx1ZU51bWJlcigpICUgKHJ0IGFzIEJPT0xFQU4pLmdldFZhbHVlTnVtYmVyKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUG90ZW5jaWEobGY6IENudG5yLCBydDogQ250bnIsIHBvc2l0aW9uOiBQb3NpdGlvbiA9IG5ldyBQb3NpdGlvbigpKTogQ250bnIge1xyXG4gICAgbGYgaW5zdGFuY2VvZiBSZWZlcmVuY2UgPyBsZiA9IChsZiBhcyBSZWZlcmVuY2UpLmdldFZhbHVlKCkgOiBsZjtcclxuICAgIHJ0IGluc3RhbmNlb2YgUmVmZXJlbmNlID8gcnQgPSAocnQgYXMgUmVmZXJlbmNlKS5nZXRWYWx1ZSgpIDogcnQ7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gUG90KGxmLCBydCk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFNlbWFudGljRXhjZXB0aW9uKGBPcGVyYWNpb24gZW50cmUgdGlwb3MgKCAke2xmLnR5cG99ICoqICR7cnQudHlwb30gKSBubyBwZXJtaXRpZGEuYCwgcG9zaXRpb24pXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gUG90KGxmOiBhbnksIHJ0OiBhbnkpOiBDbnRuciB7XHJcbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgbGYgaW5zdGFuY2VvZiBOVU1CRVI6XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgTlVNQkVSOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE5VTUJFUigobGYgYXMgTlVNQkVSKS5nZXRWYWx1ZSgpICoqIChydCBhcyBOVU1CRVIpLmdldFZhbHVlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcnQgaW5zdGFuY2VvZiBCT09MRUFOOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE5VTUJFUigobGYgYXMgTlVNQkVSKS5nZXRWYWx1ZSgpICoqICAocnQgYXMgQk9PTEVBTikuZ2V0VmFsdWVOdW1iZXIoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgbGYgaW5zdGFuY2VvZiBCT09MRUFOOlxyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBydCBpbnN0YW5jZW9mIE5VTUJFUjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBOVU1CRVIoKGxmIGFzIEJPT0xFQU4pLmdldFZhbHVlTnVtYmVyKCkgKiogKHJ0IGFzIE5VTUJFUikuZ2V0VmFsdWUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBydCBpbnN0YW5jZW9mIEJPT0xFQU46XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTlVNQkVSKChsZiBhcyBCT09MRUFOKS5nZXRWYWx1ZU51bWJlcigpICoqIChydCBhcyBCT09MRUFOKS5nZXRWYWx1ZU51bWJlcigpKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEFkZChsZjogQ250bnIsIHBvc2l0aW9uOiBQb3NpdGlvbiA9IG5ldyBQb3NpdGlvbigpKTogQ250bnIge1xyXG4gICAgaWYgKCEobGYgaW5zdGFuY2VvZiBSZWZlcmVuY2UpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFNlbWFudGljRXhjZXB0aW9uKFwiT3BlcmFjaW9uIHtyZWYrK30gcGVybWl0aWRhIHNvbGFtZW50ZSBzb2JyZSByZWZlcmVuY2FzXCIsIHBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB2YWwgPSAobGYgYXMgUmVmZXJlbmNlKS5nZXRWYWx1ZSgpO1xyXG4gICAgaWYgKHZhbCBpbnN0YW5jZW9mIE5VTUJFUikge1xyXG4gICAgICAgIChsZiBhcyBSZWZlcmVuY2UpLnNldFZhbHVlKG5ldyBOVU1CRVIoKHZhbCBhcyBOVU1CRVIpLmdldFZhbHVlKCkgKyAxKSk7XHJcbiAgICAgICAgcmV0dXJuIHZhbCBhcyBOVU1CRVI7XHJcbiAgICB9XHJcblxyXG4gICAgdGhyb3cgbmV3IFNlbWFudGljRXhjZXB0aW9uKFwiT3BlcmFjaW9uIHtyZWYrK30gTm8gc2UgcHVlZGUgcmVhbGl6YXIgc29icmUgdmFyaWFibGVzIGRpc3RpbnRhcyBkZSB0aXBvIG51bWJlclwiLCBwb3NpdGlvbik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBTdWIobGY6IENudG5yLCBwb3NpdGlvbjogUG9zaXRpb24gPSBuZXcgUG9zaXRpb24oKSk6IENudG5yIHtcclxuICAgIGlmICghKGxmIGluc3RhbmNlb2YgUmVmZXJlbmNlKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBTZW1hbnRpY0V4Y2VwdGlvbihcIk9wZXJhY2lvbiB7cmVmLS19IHBlcm1pdGlkYSBzb2xhbWVudGUgc29icmUgcmVmZXJlbmNhc1wiLCBwb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdmFsID0gKGxmIGFzIFJlZmVyZW5jZSkuZ2V0VmFsdWUoKTtcclxuICAgIGlmICh2YWwgaW5zdGFuY2VvZiBOVU1CRVIpIHtcclxuICAgICAgICAobGYgYXMgUmVmZXJlbmNlKS5zZXRWYWx1ZShuZXcgTlVNQkVSKCh2YWwgYXMgTlVNQkVSKS5nZXRWYWx1ZSgpIC0gMSkpO1xyXG4gICAgICAgIHJldHVybiB2YWwgYXMgTlVNQkVSO1xyXG4gICAgfVxyXG5cclxuICAgIHRocm93IG5ldyBTZW1hbnRpY0V4Y2VwdGlvbihcIk9wZXJhY2lvbiB7cmVmLS19IE5vIHNlIHB1ZWRlIHJlYWxpemFyIHNvYnJlIHZhcmlhYmxlcyBkaXN0aW50YXMgZGUgdGlwbyBudW1iZXJcIiwgcG9zaXRpb24pO1xyXG59XHJcbiIsImltcG9ydCB7UmVmZXJlbmNlfSBmcm9tIFwiLi9SZWZlcmVuY2VcIjtcclxuaW1wb3J0IHtVTkRFRklORUR9IGZyb20gXCIuL1ByaW1pdGl2ZVR5cG9Db250YWluZXJcIjtcclxuaW1wb3J0IHtUU0dyYXBoQ29udHJvbH0gZnJvbSBcIi4vVFNHcmFwaENvbnRyb2xcIjtcclxuaW1wb3J0IHtGdW5jdGlvblJlcHJlc2VudH0gZnJvbSBcIi4vZnVuY3Rpb25zL0Z1bmN0aW9uUmVwcmVzZW50XCI7XHJcbmltcG9ydCB7TmF0aXZlfSBmcm9tIFwiLi9mdW5jdGlvbnMvTmF0aXZlXCI7XHJcbmltcG9ydCB7VXNlckRlZmluZWR9IGZyb20gXCIuL2Z1bmN0aW9ucy9Vc2VyRGVmaW5lZFwiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENudG5yIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgb3duZXI6IENudG5yO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHByb3BzID0gbmV3IE1hcDxzdHJpbmcsIENudG5yPigpO1xyXG4gICAgcHVibGljIHR5cG86IHN0cmluZztcclxuXHJcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3Iob3duZXI/OiBDbnRucikge1xyXG4gICAgICAgIHRoaXMub3duZXIgPSBvd25lciB8fCBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBBc09iamVjdFByb3BzKCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGFucyA9IFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXG5cIjtcclxuICAgICAgICB0aGlzLnByb3BzLmZvckVhY2goKHYsIGspID0+IHtcclxuICAgICAgICAgICAgYW5zICs9IGsgKyAnID0+ICcgKyB2ICsgJ1xcbic7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYW5zICs9IFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXG5cIjtcclxuICAgICAgICByZXR1cm4gYW5zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBBZGRQcm9wZXJ0eShpZDogc3RyaW5nLCBjbnRucjogQ250bnIpOiB2b2lkIHtcclxuICAgICAgICAvL2lkID0gaWQudG9VcHBlckNhc2UoKTtcclxuICAgICAgICB0aGlzLnByb3BzLnNldChpZCwgY250bnIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRQcm9wZXJ0eShpZDogc3RyaW5nKTogQ250bnIge1xyXG4gICAgICAgLy8gaWQgPSBpZC50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgIGNvbnN0IHZhbCA9IHRoaXMucHJvcHMuZ2V0KGlkKTtcclxuICAgICAgICBpZiAodmFsICE9PSBudWxsICYmIHZhbCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3RoaXMucHJvcHMuc2V0KGlkLCBuZXcgUmVmZXJlbmNlKCkpO1xyXG4gICAgICAgIC8vcmV0dXJuIHRoaXMucHJvcHMuZ2V0KGlkKTtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRUU0dyYXBoKG93bmVyOiBzdHJpbmcgPSAnJyk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHZhbHVlID0gJyc7XHJcbiAgICAgICAgY29uc3QgZ3JhcGhJZCA9IFRTR3JhcGhDb250cm9sLkdldEdyYXBoSWQoKTtcclxuICAgICAgICB2YWx1ZSArPSBgc3ViZ3JhcGggY2x1c3Rlcl8ke2dyYXBoSWR9IHsgXFxuYDtcclxuICAgICAgICB2YWx1ZSArPSAnc3R5bGU9ZmlsbGVkO1xcbicgK1xyXG4gICAgICAgICAgICAgICAgICdjb2xvcj1ibGFjaztcXG4nICtcclxuICAgICAgICAgICAgICAgICAnZmlsbGNvbG9yPVwiIzFFMjIyXCI7XFxuJztcclxuICAgICAgICB2YWx1ZSArPSAnbm9kZSBbZmlsbGNvbG9yPVwieWVsbG93XCIgc2hhcGU9XCJyZWN0YW5nbGVcIl0gXFxuJztcclxuICAgICAgICB0aGlzLnByb3BzLmZvckVhY2goKHYsIGspID0+IHtcclxuICAgICAgICAgICAgdmFsdWUgKz0gYG4ke1RTR3JhcGhDb250cm9sLkdldE5vZGVJZCgpfSBbbGFiZWw9XCIke2t9XCJdXFxuYFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhbHVlICs9IGBsYWJlbCA9IFwiJHtvd25lcn1cIjtcXG5gO1xyXG4gICAgICAgIHRoaXMucHJvcHMuZm9yRWFjaCgodiwgaykgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdnYgPSB2O1xyXG4gICAgICAgICAgICBpZiAodnYgaW5zdGFuY2VvZiBSZWZlcmVuY2UpIHtcclxuICAgICAgICAgICAgICAgIHZ2ID0gKHZ2IGFzIFJlZmVyZW5jZSkuZ2V0VmFsdWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YWx1ZSArPSB2di5HZXRUU0dyYXBoKGspO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhbHVlICs9IGB9XFxuYFxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgRGVjbGFyZShpZDogc3RyaW5nLCBjbnRucjogQ250bnIpOiB2b2lkIHtcclxuICAgICAgICAvL2lkID0gaWQudG9VcHBlckNhc2UoKTtcclxuICAgICAgICB0aGlzLnByb3BzLnNldChpZCwgY250bnIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRUeXBvKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwb1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTZXRUeXBvKHR5cG86IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudHlwbyA9IHR5cG87XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldE93bmVyKCk6IENudG5yIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vd25lcjtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgQ29uc29sZSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGxvZzogc3RyaW5nID0gJyc7XHJcbn0iLCJpbXBvcnQge0NudG5yfSBmcm9tIFwiLi9DbnRuclwiO1xyXG5pbXBvcnQge09wfSBmcm9tIFwiLi9PcFwiO1xyXG5pbXBvcnQge0JyZWFrT2JqfSBmcm9tIFwiLi4vbm9kZXMvQnJlYWtPYmpcIjtcclxuaW1wb3J0IHtSZXR1cm5PYmp9IGZyb20gXCIuLi9ub2Rlcy9SZXR1cm5PYmpcIjtcclxuaW1wb3J0IHtDb250aW51ZU9ian0gZnJvbSBcIi4uL25vZGVzL0NvbnRpbnVlT2JqXCI7XHJcbmltcG9ydCB7RGVjbGFyZUZ1bk5vZGV9IGZyb20gXCIuLi9ub2Rlcy9EZWNsYXJlRnVuTm9kZVwiO1xyXG5pbXBvcnQge0RlY2xhcmVUeXBlU3RydWN0dXJlTm9kZX0gZnJvbSBcIi4uL25vZGVzL0RlY2xhcmVUeXBlU3RydWN0dXJlTm9kZVwiO1xyXG5pbXBvcnQge0dyYXBodml6Tm9kZX0gZnJvbSBcIi4vR3JhcGh2aXpOb2RlXCI7XHJcbmltcG9ydCB7R3JhZmljYXJfdHN9IGZyb20gXCIuL25hdGl2ZUZ1bmN0aW9ucy9ncmFmaWNhcl90c1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEVudm1udCBleHRlbmRzIENudG5yIHtcclxuICAgIHB1YmxpYyByZWFkb25seSBFeHRyYSA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IG9wZXJhdGlvbnM6IEFycmF5PE9wPjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihvd25lcjogQ250bnIsIG9wZXJhdGlvbnM6IEFycmF5PE9wPikge1xyXG4gICAgICAgIHN1cGVyKG93bmVyKTtcclxuICAgICAgICB0aGlzLm9wZXJhdGlvbnMgPSBvcGVyYXRpb25zO1xyXG4gICAgICAgIHRoaXMudHlwbyA9IFwiQW1iaXRvXCI7XHJcbiAgICAgICAgdGhpcy5EZWNsYXJlKFwiZ3JhZmljYXJfdHNcIiwgbmV3IEdyYWZpY2FyX3RzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHT19BTEwoKTogQ250bnIge1xyXG4gICAgICAgIGZvciAobGV0IG9wIG9mIHRoaXMub3BlcmF0aW9ucykge1xyXG4gICAgICAgICAgICBpZiAob3AgaW5zdGFuY2VvZiBEZWNsYXJlRnVuTm9kZSB8fCBvcCBpbnN0YW5jZW9mIERlY2xhcmVUeXBlU3RydWN0dXJlTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBvcC5FeGUodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZS5tZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IG9wIG9mIHRoaXMub3BlcmF0aW9ucykge1xyXG4gICAgICAgICAgICBpZiAoIShvcCBpbnN0YW5jZW9mIERlY2xhcmVGdW5Ob2RlIHx8IG9wIGluc3RhbmNlb2YgRGVjbGFyZVR5cGVTdHJ1Y3R1cmVOb2RlKSkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gb3AuRXhlKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBCcmVha09iaiB8fCByZXN1bHQgaW5zdGFuY2VvZiBSZXR1cm5PYmogfHwgcmVzdWx0IGluc3RhbmNlb2YgQ29udGludWVPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdCBhcyBDbnRucjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZS5tZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRHcmFwaCgpOiBHcmFwaHZpek5vZGUge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdhdmVyJyk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHcmFwaHZpek5vZGUoJ1JPT1QnLCB0aGlzLm9wZXJhdGlvbnMubWFwKG9wZXJhdGlvbiA9PiBvcGVyYXRpb24uR2V0R3JhcGgodGhpcykpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0U2VudGVuY2VzKCk6IEFycmF5PE9wPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3BlcmF0aW9ucztcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgRXJyb3JzQ29udHJvbCB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBlcnJvcnM6IEFycmF5PEVycm9yPiA9IG5ldyBBcnJheTxFcnJvcj4oKTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsZWFyU3RydWN0dXJlcygpIHtcclxuICAgICAgICBFcnJvcnNDb250cm9sLmVycm9ycyA9IG5ldyBBcnJheTxFcnJvcj4oKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldEVycm9ycygpOiBBcnJheTxFcnJvcj4ge1xyXG4gICAgICAgIHJldHVybiBFcnJvcnNDb250cm9sLmVycm9ycztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEFkZEVycm9yKFxyXG4gICAgICAgIHJvdzogbnVtYmVyLFxyXG4gICAgICAgIGNvbHVtbjogbnVtYmVyLFxyXG4gICAgICAgIGV4cGVjdGVkOiBzdHJpbmcsXHJcbiAgICAgICAgb2J0YWluZWQ6IHN0cmluZyxcclxuICAgICAgICB0eXBvOiBzdHJpbmcsXHJcbiAgICApOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmVycm9ycy5wdXNoKG5ldyBFcnJvcihcclxuICAgICAgICAgICAgcm93LFxyXG4gICAgICAgICAgICBjb2x1bW4sXHJcbiAgICAgICAgICAgIGV4cGVjdGVkLFxyXG4gICAgICAgICAgICBvYnRhaW5lZCxcclxuICAgICAgICAgICAgdHlwb1xyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRXJyb3Ige1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSByb3c6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgY29sdW1uOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGV4cGVjdGVkOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IG9idGFpbmVkOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHR5cG86IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICByb3c6IG51bWJlcixcclxuICAgICAgICBjb2x1bW46IG51bWJlcixcclxuICAgICAgICBleHBlY3RlZDogc3RyaW5nLFxyXG4gICAgICAgIG9idGFpbmVkOiBzdHJpbmcsXHJcbiAgICAgICAgdHlwbzogc3RyaW5nLFxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5yb3cgPSByb3c7XHJcbiAgICAgICAgdGhpcy5jb2x1bW4gPSBjb2x1bW47XHJcbiAgICAgICAgdGhpcy5leHBlY3RlZCA9IGV4cGVjdGVkO1xyXG4gICAgICAgIHRoaXMub2J0YWluZWQgPSBvYnRhaW5lZDtcclxuICAgICAgICB0aGlzLnR5cG8gPSB0eXBvO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUG9zaXRpb24ge1xyXG4gICAgcHVibGljIGZpcnN0X2xpbmU6IG51bWJlcjtcclxuICAgIHB1YmxpYyBsYXN0X2xpbmU6IG51bWJlcjtcclxuICAgIHB1YmxpYyBmaXJzdF9jb2x1bW46IG51bWJlcjtcclxuICAgIHB1YmxpYyBsYXN0X2NvbHVtbjogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZmlyc3RfY29sdW1uID0gLTE7XHJcbiAgICAgICAgdGhpcy5maXJzdF9saW5lID0gLTE7XHJcbiAgICAgICAgdGhpcy5sYXN0X2NvbHVtbiA9IC0xO1xyXG4gICAgICAgIHRoaXMubGFzdF9saW5lID0gLTE7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge05vZGVzQ29udHJvbH0gZnJvbSBcIi4vTm9kZXNDb250cm9sXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgR3JhcGh2aXpOb2RlIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbGFiZWw6IHN0cmluZztcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2hpbGRzOiBHcmFwaHZpek5vZGVbXTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgaWQ6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihsYWJlbDogc3RyaW5nLCBjaGlsZHM6IEdyYXBodml6Tm9kZVtdID0gW10pIHtcclxuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XHJcbiAgICAgICAgdGhpcy5jaGlsZHMgPSBjaGlsZHM7XHJcbiAgICAgICAgdGhpcy5pZCA9IGBuJHtOb2Rlc0NvbnRyb2wuR2V0Tm9kZUlkKCl9YDtcclxuICAgIH1cclxuXHJcbiAgICBHZXRJZCA9ICgpOiBzdHJpbmcgPT4gdGhpcy5pZDtcclxuXHJcbiAgICB0b1N0cmluZyA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IGAke3RoaXMuaWR9IFtsYWJlbD1cIiR7dGhpcy5sYWJlbH1cIl07XFxuYDtcclxuICAgICAgICB0aGlzLmNoaWxkcy5mb3JFYWNoKGNoaWxkID0+IHtcclxuICAgICAgICAgICAgdmFsdWUgKz0gYCR7dGhpcy5pZH0gLT4gJHtjaGlsZC5HZXRJZCgpfTtcXG5gO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY2hpbGRzLmZvckVhY2goY2hpbGQgPT4ge1xyXG4gICAgICAgICAgICB2YWx1ZSArPSBjaGlsZDtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9O1xyXG59IiwiaW1wb3J0IHtDbnRucn0gZnJvbSBcIi4vQ250bnJcIjtcclxuaW1wb3J0IHtSZWZlcmVuY2V9IGZyb20gXCIuL1JlZmVyZW5jZVwiO1xyXG5pbXBvcnQge1NlbWFudGljRXhjZXB0aW9ufSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQge0JPT0xFQU4sIE5BTiwgTlVMTCwgTlVNQkVSLCBTVFJJTkcsIFVOREVGSU5FRH0gZnJvbSBcIi4vUHJpbWl0aXZlVHlwb0NvbnRhaW5lclwiO1xyXG5pbXBvcnQge1Bvc2l0aW9ufSBmcm9tIFwiLi9FcnJvcnNDb250cm9sXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gT3IobGY6IENudG5yLCBydDogQ250bnIsIHBvc2l0aW9uOiBQb3NpdGlvbiA9IG5ldyBQb3NpdGlvbigpKTogQ250bnIge1xyXG4gICAgbGYgaW5zdGFuY2VvZiBSZWZlcmVuY2UgPyBsZiA9IChsZiBhcyBSZWZlcmVuY2UpLmdldFZhbHVlKCkgOiBsZjtcclxuICAgIHJ0IGluc3RhbmNlb2YgUmVmZXJlbmNlID8gcnQgPSAocnQgYXMgUmVmZXJlbmNlKS5nZXRWYWx1ZSgpIDogcnQ7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gb3IobGYsIHJ0KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICB0aHJvdyBuZXcgU2VtYW50aWNFeGNlcHRpb24oYE9wZXJhY2lvbiBlbnRyZSB0aXBvcyAoICR7bGYudHlwb30gfHwgJHtydC50eXBvfSApIG5vIHBlcm1pdGlkYS5gLCBwb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb3IobGY6IGFueSwgcnQ6IGFueSk6IENudG5yIHtcclxuICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgY2FzZSBsZiBpbnN0YW5jZW9mIEJPT0xFQU46XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgQk9PTEVBTjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCT09MRUFOKChsZiBhcyBCT09MRUFOKS5nZXRWYWx1ZSgpIHx8IChydCBhcyBCT09MRUFOKS5nZXRWYWx1ZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEFuZChsZjogQ250bnIsIHJ0OiBDbnRuciwgcG9zaXRpb246IFBvc2l0aW9uID0gbmV3IFBvc2l0aW9uKCkpOiBDbnRuciB7XHJcbiAgICBsZiBpbnN0YW5jZW9mIFJlZmVyZW5jZSA/IGxmID0gKGxmIGFzIFJlZmVyZW5jZSkuZ2V0VmFsdWUoKSA6IGxmO1xyXG4gICAgcnQgaW5zdGFuY2VvZiBSZWZlcmVuY2UgPyBydCA9IChydCBhcyBSZWZlcmVuY2UpLmdldFZhbHVlKCkgOiBydDtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIHJldHVybiBhbmQobGYsIHJ0KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICB0aHJvdyBuZXcgU2VtYW50aWNFeGNlcHRpb24oYE9wZXJhY2lvbiBlbnRyZSB0aXBvcyAoICR7bGYudHlwb30gJiYgJHtydC50eXBvfSApIG5vIHBlcm1pdGlkYS5gLCBwb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYW5kKGxmOiBhbnksIHJ0OiBhbnkpOiBDbnRuciB7XHJcbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgbGYgaW5zdGFuY2VvZiBCT09MRUFOOlxyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBydCBpbnN0YW5jZW9mIEJPT0xFQU46XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTigobGYgYXMgQk9PTEVBTikuZ2V0VmFsdWUoKSAmJiAocnQgYXMgQk9PTEVBTikuZ2V0VmFsdWUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBOb3QobGY6IENudG5yLCBwb3NpdGlvbjogUG9zaXRpb24gPSBuZXcgUG9zaXRpb24oKSk6IENudG5yIHtcclxuICAgIGxmIGluc3RhbmNlb2YgUmVmZXJlbmNlID8gbGYgPSAobGYgYXMgUmVmZXJlbmNlKS5nZXRWYWx1ZSgpIDogbGY7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gbm90KGxmKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICB0aHJvdyBuZXcgU2VtYW50aWNFeGNlcHRpb24oYE9wZXJhY2lvbiBlbnRyZSB0aXBvcyAoICEgJHtsZi50eXBvfSApIG5vIHBlcm1pdGlkYS5gLCBwb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbm90KGxmOiBhbnkpOiBDbnRuciB7XHJcbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgbGYgaW5zdGFuY2VvZiBCT09MRUFOOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCT09MRUFOKCEobGYgYXMgQk9PTEVBTikuZ2V0VmFsdWUoKSk7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIE5vZGVzQ29udHJvbCB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBub2RlSWRDb3VudCA9IDA7XHJcbiAgICBwdWJsaWMgc3RhdGljIEdldE5vZGVJZCA9ICgpID0+IE5vZGVzQ29udHJvbC5ub2RlSWRDb3VudCsrO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xlYXJTdHJ1Y3R1cmVzKCkge1xyXG4gICAgICAgIE5vZGVzQ29udHJvbC5ub2RlSWRDb3VudCA9IDA7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtFbnZtbnR9IGZyb20gXCIuL0Vudm1udFwiO1xyXG5pbXBvcnQge0Vycm9yQ29tcG99IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCB7R3JhcGh2aXpOb2RlfSBmcm9tIFwiLi9HcmFwaHZpek5vZGVcIjtcclxuaW1wb3J0IHtQb3NpdGlvbn0gZnJvbSBcIi4vRXJyb3JzQ29udHJvbFwiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE9wIHtcclxuICAgIHB1YmxpYyBFeGUoZW52OiBFbnZtbnQpOiBvYmplY3R7XHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5HTyhlbnYpO1xyXG4gICAgICAgIH1jYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3JDb21wbyhlLm1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyByZWFkb25seSBwb3NpdGlvbjogUG9zaXRpb247XHJcblxyXG4gICAgY29uc3RydWN0b3IocG9zaXRpb246IFBvc2l0aW9uID0gbmV3IFBvc2l0aW9uKCkpIHtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IEdPKGVudjogRW52bW50KTogb2JqZWN0O1xyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBHZXRHcmFwaChlbnY6IEVudm1udCk6IEdyYXBodml6Tm9kZTtcclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgR2V0VFNHcmFwaCgpOiBzdHJpbmc7XHJcbn1cclxuIiwiaW1wb3J0IHtDbnRucn0gZnJvbSBcIi4vQ250bnJcIjtcclxuaW1wb3J0IHtSZWZlcmVuY2V9IGZyb20gXCIuL1JlZmVyZW5jZVwiO1xyXG5pbXBvcnQge0xlbmd0aH0gZnJvbSBcIi4vbmF0aXZlRnVuY3Rpb25zL2xlbmd0aFwiO1xyXG5pbXBvcnQge1B1c2h9IGZyb20gXCIuL25hdGl2ZUZ1bmN0aW9ucy9wdXNoXCI7XHJcbmltcG9ydCB7UG9wfSBmcm9tIFwiLi9uYXRpdmVGdW5jdGlvbnMvcG9wXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQk9PTEVBTiBleHRlbmRzIENudG5yIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdmFsdWU6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IodmFsdWU/OiBib29sZWFuKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy50eXBvID0gXCJCT09MRUFOXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvU3RyaW5nID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUgPyBcInRydWVcIiA6IFwiZmFsc2VcIjtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGdldFZhbHVlTnVtYmVyID0gKCk6IG51bWJlciA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUgPyAxIDogMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VmFsdWUgPSAoKTogYm9vbGVhbiA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU1RSSU5HIGV4dGVuZHMgQ250bnIge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSB2YWx1ZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHZhbHVlPzogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWUgfHwgJyc7XHJcbiAgICAgICAgdGhpcy50eXBvID0gXCJTVFJJTkdcIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdG9TdHJpbmcgPSAoKTogc3RyaW5nID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGdldFZhbHVlID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTlVNQkVSIGV4dGVuZHMgQ250bnIge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSB2YWx1ZTogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHZhbHVlPzogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWUgfHwgMDtcclxuICAgICAgICB0aGlzLnR5cG8gPSBcIk5VTUJFUlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b1N0cmluZyA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlICsgJyc7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBnZXRWYWx1ZSA9ICgpOiBudW1iZXIgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFVOREVGSU5FRCBleHRlbmRzIENudG5yIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy50eXBvID0gXCJVTkRFRklORURcIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdG9TdHJpbmcgPSAoKTogc3RyaW5nID0+IHtcclxuICAgICAgICByZXR1cm4gXCJ1bmRlZmluZWRcIjtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBOQU4gZXh0ZW5kcyBDbnRuciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMudHlwbyA9IFwiTkFOXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvU3RyaW5nID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIFwiTmFOXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBOVUxMIGV4dGVuZHMgQ250bnIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnR5cG8gPSBcIk5VTExcIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdG9TdHJpbmcgPSAoKTogc3RyaW5nID0+IHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGdldFZhbHVlID0gKCk6IG9iamVjdCA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQVJSQVkgZXh0ZW5kcyBDbnRuciB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHZhbHVlOiBBcnJheTxDbnRucj47XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvbnRlbnRUeXBlOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IodmFsdWU/OiBBcnJheTxDbnRucj4sIGNvbnRlbnRUeXBlOiBzdHJpbmcgPSAnQU5ZJykge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlIHx8IG5ldyBBcnJheTxDbnRucj4oKTtcclxuICAgICAgICB0aGlzLnR5cG8gPSBgQVJSQVlgO1xyXG4gICAgICAgIHRoaXMuY29udGVudFR5cGUgPSBjb250ZW50VHlwZTtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIHRoaXMuRGVjbGFyZShcImxlbmd0aFwiLCBuZXcgTGVuZ3RoKHRoaXMpKTtcclxuICAgICAgICAgICAgdGhpcy5EZWNsYXJlKFwicHVzaFwiLCBuZXcgUHVzaCh0aGlzKSk7XHJcbiAgICAgICAgICAgIHRoaXMuRGVjbGFyZShcInBvcFwiLCBuZXcgUG9wKHRoaXMpKTtcclxuICAgICAgICB9Y2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b1N0cmluZyA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNpemUgPSB0aGlzLnZhbHVlLmxlbmd0aDtcclxuICAgICAgICBsZXQgbG9nID0gYEFycmF5ICgke3NpemV9KSBbYDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xyXG4gICAgICAgICAgICBsb2cgKz0gYCR7KHRoaXMudmFsdWVbaV0gYXMgUmVmZXJlbmNlKS5nZXRWYWx1ZSgpfWA7XHJcbiAgICAgICAgICAgIGlmIChzaXplIC0gMSAhPT0gaSkge1xyXG4gICAgICAgICAgICAgICAgbG9nICs9ICcsICc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbG9nICs9ICddJztcclxuICAgICAgICByZXR1cm4gbG9nO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0VmFsdWUgPSAoaW5kZXg6IG51bWJlcik6IG9iamVjdCA9PiB7XHJcbiAgICAgICAgbGV0IHZhbCA9IHRoaXMudmFsdWVbaW5kZXhdO1xyXG4gICAgICAgIGlmICh2YWwgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc2l6ZSA9IHRoaXMudmFsdWUubGVuZ3RoO1xyXG4gICAgICAgIHdoaWxlIChzaXplIDw9IGluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUucHVzaChuZXcgUmVmZXJlbmNlKCkpO1xyXG4gICAgICAgICAgICBzaXplKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlW2luZGV4XTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGFkZFZhbHVlKHZhbHVlOiBDbnRucikge1xyXG4gICAgICAgIHRoaXMudmFsdWUucHVzaCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFZhbHVlTGlzdCA9ICgpOiBBcnJheTxDbnRucj4gPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE9CSkVDVCBleHRlbmRzIENudG5yIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgYXR0cmlidXRlczogTWFwPHN0cmluZywgQ250bnI+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXM/OiBNYXA8c3RyaW5nLCBDbnRucj4pIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXMgfHwgbmV3IE1hcDxzdHJpbmcsIENudG5yPigpO1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlcy5mb3JFYWNoKCh2LCBrKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHY7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFJlZmVyZW5jZSkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSAodmFsdWUgYXMgUmVmZXJlbmNlKS5nZXRWYWx1ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHJlZmVyZW5jZSA9IG5ldyBSZWZlcmVuY2UoKTtcclxuICAgICAgICAgICAgcmVmZXJlbmNlLlB1dFZhbHVlT25SZWZlcmVuY2UodmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLkRlY2xhcmUoaywgcmVmZXJlbmNlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnR5cG8gPSBcIk9CSkVDVFwiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b1N0cmluZyA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIGxldCBsb2cgPSAneyc7XHJcbiAgICAgICAgbGV0IGNvdW50ID0gMTtcclxuICAgICAgICB0aGlzLnByb3BzLmZvckVhY2goKHYsIGspID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gdjtcclxuICAgICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgUmVmZXJlbmNlKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9ICh2YWx1ZSBhcyBSZWZlcmVuY2UpLmdldFZhbHVlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbG9nICs9IGBcIiR7a31cIiA6ICR7dmFsdWV9YDtcclxuICAgICAgICAgICAgaWYgKGNvdW50IDwgdGhpcy5wcm9wcy5zaXplKSB7XHJcbiAgICAgICAgICAgICAgICBsb2cgKz0gJywgJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxvZyArPSAnfSc7XHJcbiAgICAgICAgcmV0dXJuIGxvZztcclxuICAgIH07XHJcbn0iLCJpbXBvcnQge0NudG5yfSBmcm9tIFwiLi9DbnRuclwiO1xyXG5pbXBvcnQge0RlZmF1bHRWYWx1ZSwgSXNQcmltaXRpdmVUeXBvLCBTZW1hbnRpY0V4Y2VwdGlvbn0gZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IHtVTkRFRklORUR9IGZyb20gXCIuL1ByaW1pdGl2ZVR5cG9Db250YWluZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZWZlcmVuY2UgZXh0ZW5kcyBDbnRuciB7XHJcbiAgICBwcml2YXRlIHZhbHVlOiBDbnRucjtcclxuICAgIHByaXZhdGUgaXNDb25zdDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSB0aXBvTm9tYnJlOiBzdHJpbmcgPSAnYW55JztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0aXBvTm9tYnJlOiBzdHJpbmcgPSAnQU5ZJywgaXNDb25zdDogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnR5cG8gPSBcIlJFRkVSRU5DRVwiO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSBEZWZhdWx0VmFsdWUodGlwb05vbWJyZSk7XHJcbiAgICAgICAgdGhpcy50aXBvTm9tYnJlID0gdGlwb05vbWJyZTtcclxuICAgICAgICB0aGlzLmlzQ29uc3QgPSBpc0NvbnN0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRSZWZlcmVuY2VWYWx1ZSA9ICgpIDogc3RyaW5nID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy50aXBvTm9tYnJlLnRvVXBwZXJDYXNlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyB0b1N0cmluZyA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBQdXRWYWx1ZU9uUmVmZXJlbmNlKHZhbHVlOiBDbnRucik6IHZvaWQge1xyXG4gICAgICAgIGlmKHRoaXMuaXNDb25zdCAmJiAhKHRoaXMudmFsdWUgaW5zdGFuY2VvZiBVTkRFRklORUQpKXtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFNlbWFudGljRXhjZXB0aW9uKCdObyBzZSBwdWVkZSBjYW1iaWFyIGVsIHZhbG9yIGRlIHVuYSBjb25zdGFudGUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB2OiBDbnRucjtcclxuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBSZWZlcmVuY2UpIHtcclxuICAgICAgICAgICAgdiA9ICh2YWx1ZSBhcyBSZWZlcmVuY2UpLnZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHYgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHYgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB2ID0gbmV3IFVOREVGSU5FRCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnRpcG9Ob21icmUgIT09IHYudHlwb1xyXG4gICAgICAgICAgICAmJiB0aGlzLnRpcG9Ob21icmUgIT09ICdBTlknXHJcbiAgICAgICAgICAgICYmIHYudHlwbyAhPT0gJ05VTEwnXHJcbiAgICAgICAgICAgICYmIHYudHlwbyAhPT0gJ1VOREVGSU5FRCdcclxuICAgICAgICAgICAgJiYgdi50eXBvICE9PSAnT0JKRUNUJ1xyXG4gICAgICAgICAgICB8fCAoSXNQcmltaXRpdmVUeXBvKHRoaXMudGlwb05vbWJyZSkgJiYgdi50eXBvID09PSAnT0JKRUNUJyAmJiB0aGlzLnRpcG9Ob21icmUgIT0gXCJBTllcIilcclxuICAgICAgICApe1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgU2VtYW50aWNFeGNlcHRpb24oYFRpcG8gJHt2LnR5cG99IG5vIHB1ZWRlIHNlciBhc2lnbmFkbyBhIFZhcmlhYmxlIGRlIHRpcG8gJHt0aGlzLnRpcG9Ob21icmV9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRWYWx1ZSA9ICgpOiBDbnRuciA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBzZXRWYWx1ZSA9ICh2YWx1ZTogQ250bnIpOiB2b2lkID0+IHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBDYWxsID0gKGFyZ3M6IEFycmF5PENudG5yPik6IG9iamVjdCA9PiB7XHJcbiAgICAgICAgZm9yIChsZXQgYXJnIG9mIGFyZ3MpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYXJnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9O1xyXG59XHJcbiIsImltcG9ydCB7Q250bnJ9IGZyb20gXCIuL0NudG5yXCI7XHJcbmltcG9ydCB7UmVmZXJlbmNlfSBmcm9tIFwiLi9SZWZlcmVuY2VcIjtcclxuaW1wb3J0IHtTZW1hbnRpY0V4Y2VwdGlvbn0gZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IHtBUlJBWSwgQk9PTEVBTiwgTkFOLCBOVUxMLCBOVU1CRVIsIE9CSkVDVCwgU1RSSU5HLCBVTkRFRklORUR9IGZyb20gXCIuL1ByaW1pdGl2ZVR5cG9Db250YWluZXJcIjtcclxuaW1wb3J0IHtQb3NpdGlvbn0gZnJvbSBcIi4vRXJyb3JzQ29udHJvbFwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIElndWFsKGxmOiBDbnRuciwgcnQ6IENudG5yLCBwb3NpdGlvbjogUG9zaXRpb24gPSBuZXcgUG9zaXRpb24oKSk6IENudG5yIHtcclxuICAgIGxmIGluc3RhbmNlb2YgUmVmZXJlbmNlID8gbGYgPSAobGYgYXMgUmVmZXJlbmNlKS5nZXRWYWx1ZSgpIDogbGY7XHJcbiAgICBydCBpbnN0YW5jZW9mIFJlZmVyZW5jZSA/IHJ0ID0gKHJ0IGFzIFJlZmVyZW5jZSkuZ2V0VmFsdWUoKSA6IHJ0O1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIEVxKGxmLCBydCk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFNlbWFudGljRXhjZXB0aW9uKGBPcGVyYWNpb24gZW50cmUgdGlwb3MgKCAke2xmLnR5cG99ID09ICR7cnQudHlwb30gKSBubyBwZXJtaXRpZGEuYCwgcG9zaXRpb24pXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gRXEobGY6IGFueSwgcnQ6IGFueSk6IENudG5yIHtcclxuICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgY2FzZSBsZiBpbnN0YW5jZW9mIE5VTUJFUjpcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcnQgaW5zdGFuY2VvZiBOVU1CRVI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTigobGYgYXMgTlVNQkVSKS5nZXRWYWx1ZSgpID09PSAocnQgYXMgTlVNQkVSKS5nZXRWYWx1ZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgQk9PTEVBTjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCT09MRUFOKChsZiBhcyBOVU1CRVIpLmdldFZhbHVlKCkgPT09IChydCBhcyBCT09MRUFOKS5nZXRWYWx1ZU51bWJlcigpKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgTlVMTDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCT09MRUFOKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgVU5ERUZJTkVEOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJPT0xFQU4oZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcnQgaW5zdGFuY2VvZiBOQU46XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgbGYgaW5zdGFuY2VvZiBCT09MRUFOOlxyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBydCBpbnN0YW5jZW9mIE5VTUJFUjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCT09MRUFOKChsZiBhcyBCT09MRUFOKS5nZXRWYWx1ZU51bWJlcigpID09IChydCBhcyBOVU1CRVIpLmdldFZhbHVlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcnQgaW5zdGFuY2VvZiBCT09MRUFOOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJPT0xFQU4oKGxmIGFzIEJPT0xFQU4pLmdldFZhbHVlTnVtYmVyKCkgPT0gKHJ0IGFzIEJPT0xFQU4pLmdldFZhbHVlTnVtYmVyKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcnQgaW5zdGFuY2VvZiBOVUxMOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJPT0xFQU4oZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcnQgaW5zdGFuY2VvZiBVTkRFRklORUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBydCBpbnN0YW5jZW9mIE5BTjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCT09MRUFOKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBsZiBpbnN0YW5jZW9mIFNUUklORzpcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcnQgaW5zdGFuY2VvZiBTVFJJTkc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTigobGYgYXMgU1RSSU5HKS5nZXRWYWx1ZSgpID09PSAocnQgYXMgU1RSSU5HKS5nZXRWYWx1ZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgTlVMTDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCT09MRUFOKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgVU5ERUZJTkVEOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJPT0xFQU4oZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcnQgaW5zdGFuY2VvZiBOQU46XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgbGYgaW5zdGFuY2VvZiBVTkRFRklORUQ6XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgVU5ERUZJTkVEOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJPT0xFQU4odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCT09MRUFOKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBsZiBpbnN0YW5jZW9mIE5VTEw6XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgTlVMTDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCT09MRUFOKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgbGYgaW5zdGFuY2VvZiBOQU46XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgTkFOOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJPT0xFQU4odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCT09MRUFOKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBsZiBpbnN0YW5jZW9mIE9CSkVDVDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTihmYWxzZSk7XHJcbiAgICAgICAgICAgIGNhc2UgbGYgaW5zdGFuY2VvZiBBUlJBWTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTih0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBEaWZlcmVudGUobGY6IENudG5yLCBydDogQ250bnIsIHBvc2l0aW9uOiBQb3NpdGlvbiA9IG5ldyBQb3NpdGlvbigpKTogQ250bnIge1xyXG4gICAgbGYgaW5zdGFuY2VvZiBSZWZlcmVuY2UgPyBsZiA9IChsZiBhcyBSZWZlcmVuY2UpLmdldFZhbHVlKCkgOiBsZjtcclxuICAgIHJ0IGluc3RhbmNlb2YgUmVmZXJlbmNlID8gcnQgPSAocnQgYXMgUmVmZXJlbmNlKS5nZXRWYWx1ZSgpIDogcnQ7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gRGlmKGxmLCBydCk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFNlbWFudGljRXhjZXB0aW9uKGBPcGVyYWNpb24gZW50cmUgdGlwb3MgKCAke2xmLnR5cG99ICE9ICR7cnQudHlwb30gKSBubyBwZXJtaXRpZGEuYCwgcG9zaXRpb24pXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gRGlmKGxmOiBhbnksIHJ0OiBhbnkpOiBDbnRuciB7XHJcbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgbGYgaW5zdGFuY2VvZiBOVU1CRVI6XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgTlVNQkVSOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJPT0xFQU4oKGxmIGFzIE5VTUJFUikuZ2V0VmFsdWUoKSAhPT0gKHJ0IGFzIE5VTUJFUikuZ2V0VmFsdWUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBydCBpbnN0YW5jZW9mIEJPT0xFQU46XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTigobGYgYXMgTlVNQkVSKS5nZXRWYWx1ZSgpICE9PSAocnQgYXMgQk9PTEVBTikuZ2V0VmFsdWVOdW1iZXIoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBydCBpbnN0YW5jZW9mIE5VTEw6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgVU5ERUZJTkVEOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJPT0xFQU4odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBydCBpbnN0YW5jZW9mIE5BTjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCT09MRUFOKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIGxmIGluc3RhbmNlb2YgQk9PTEVBTjpcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcnQgaW5zdGFuY2VvZiBOVU1CRVI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTigobGYgYXMgQk9PTEVBTikuZ2V0VmFsdWVOdW1iZXIoKSAhPSAocnQgYXMgTlVNQkVSKS5nZXRWYWx1ZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgQk9PTEVBTjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCT09MRUFOKChsZiBhcyBCT09MRUFOKS5nZXRWYWx1ZU51bWJlcigpICE9IChydCBhcyBCT09MRUFOKS5nZXRWYWx1ZU51bWJlcigpKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgTlVMTDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCT09MRUFOKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcnQgaW5zdGFuY2VvZiBVTkRFRklORUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgTkFOOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJPT0xFQU4odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgbGYgaW5zdGFuY2VvZiBTVFJJTkc6XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgU1RSSU5HOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJPT0xFQU4oKGxmIGFzIFNUUklORykuZ2V0VmFsdWUoKSAhPT0gKHJ0IGFzIFNUUklORykuZ2V0VmFsdWUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBydCBpbnN0YW5jZW9mIE5VTEw6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgVU5ERUZJTkVEOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJPT0xFQU4odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgbGYgaW5zdGFuY2VvZiBVTkRFRklORUQ6XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgVU5ERUZJTkVEOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJPT0xFQU4oZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTih0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBsZiBpbnN0YW5jZW9mIE5VTEw6XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgTlVMTDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCT09MRUFOKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJPT0xFQU4odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgbGYgaW5zdGFuY2VvZiBOQU46XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgTkFOOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJPT0xFQU4oZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTih0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBsZiBpbnN0YW5jZW9mIE9CSkVDVDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTih0cnVlKTtcclxuICAgICAgICAgICAgY2FzZSBsZiBpbnN0YW5jZW9mIEFSUkFZOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCT09MRUFOKHRydWUpO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTWF5b3IobGY6IENudG5yLCBydDogQ250bnIsIHBvc2l0aW9uOiBQb3NpdGlvbiA9IG5ldyBQb3NpdGlvbigpKTogQ250bnIge1xyXG4gICAgbGYgaW5zdGFuY2VvZiBSZWZlcmVuY2UgPyBsZiA9IChsZiBhcyBSZWZlcmVuY2UpLmdldFZhbHVlKCkgOiBsZjtcclxuICAgIHJ0IGluc3RhbmNlb2YgUmVmZXJlbmNlID8gcnQgPSAocnQgYXMgUmVmZXJlbmNlKS5nZXRWYWx1ZSgpIDogcnQ7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gTWF5KGxmLCBydCk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFNlbWFudGljRXhjZXB0aW9uKGBPcGVyYWNpb24gZW50cmUgdGlwb3MgKCAke2xmLnR5cG99ID4gJHtydC50eXBvfSApIGRkZG5vIHBlcm1pdGlkYS5gLCBwb3NpdGlvbilcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBNYXkobGY6IGFueSwgcnQ6IGFueSk6IENudG5yIHtcclxuICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgY2FzZSBsZiBpbnN0YW5jZW9mIE5VTUJFUjpcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcnQgaW5zdGFuY2VvZiBOVU1CRVI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTigobGYgYXMgTlVNQkVSKS5nZXRWYWx1ZSgpID4gKHJ0IGFzIE5VTUJFUikuZ2V0VmFsdWUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBydCBpbnN0YW5jZW9mIEJPT0xFQU46XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTigobGYgYXMgTlVNQkVSKS5nZXRWYWx1ZSgpID4gKHJ0IGFzIEJPT0xFQU4pLmdldFZhbHVlTnVtYmVyKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcnQgaW5zdGFuY2VvZiBOQU46XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCT09MRUFOKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBsZiBpbnN0YW5jZW9mIEJPT0xFQU46XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgTlVNQkVSOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJPT0xFQU4oKGxmIGFzIEJPT0xFQU4pLmdldFZhbHVlTnVtYmVyKCkgPiAocnQgYXMgTlVNQkVSKS5nZXRWYWx1ZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgQk9PTEVBTjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCT09MRUFOKChsZiBhcyBCT09MRUFOKS5nZXRWYWx1ZU51bWJlcigpID4gKHJ0IGFzIEJPT0xFQU4pLmdldFZhbHVlTnVtYmVyKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgbGYgaW5zdGFuY2VvZiBTVFJJTkc6XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgU1RSSU5HOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJPT0xFQU4oKGxmIGFzIFNUUklORykuZ2V0VmFsdWUoKSA+IChydCBhcyBTVFJJTkcpLmdldFZhbHVlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgbGYgaW5zdGFuY2VvZiBOQU46XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgTlVNQkVSOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJPT0xFQU4oZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJPT0xFQU4oZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE1lbm9yKGxmOiBDbnRuciwgcnQ6IENudG5yLCBwb3NpdGlvbjogUG9zaXRpb24gPSBuZXcgUG9zaXRpb24oKSk6IENudG5yIHtcclxuICAgIGxmIGluc3RhbmNlb2YgUmVmZXJlbmNlID8gbGYgPSAobGYgYXMgUmVmZXJlbmNlKS5nZXRWYWx1ZSgpIDogbGY7XHJcbiAgICBydCBpbnN0YW5jZW9mIFJlZmVyZW5jZSA/IHJ0ID0gKHJ0IGFzIFJlZmVyZW5jZSkuZ2V0VmFsdWUoKSA6IHJ0O1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIE1pbihsZiwgcnQpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIHRocm93IG5ldyBTZW1hbnRpY0V4Y2VwdGlvbihgT3BlcmFjaW9uIGVudHJlIHRpcG9zICggJHtsZi50eXBvfSA8ICR7cnQudHlwb30gKSBuZGFkZmFvIHBlcm1pdGlkYS5gLCBwb3NpdGlvbilcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBNaW4obGY6IGFueSwgcnQ6IGFueSk6IENudG5yIHtcclxuICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgY2FzZSBsZiBpbnN0YW5jZW9mIE5VTUJFUjpcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcnQgaW5zdGFuY2VvZiBOVU1CRVI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTigobGYgYXMgTlVNQkVSKS5nZXRWYWx1ZSgpIDwgKHJ0IGFzIE5VTUJFUikuZ2V0VmFsdWUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBydCBpbnN0YW5jZW9mIEJPT0xFQU46XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTigobGYgYXMgTlVNQkVSKS5nZXRWYWx1ZSgpIDwgKHJ0IGFzIEJPT0xFQU4pLmdldFZhbHVlTnVtYmVyKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcnQgaW5zdGFuY2VvZiBOQU46XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICBuZXcgQk9PTEVBTihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgbGYgaW5zdGFuY2VvZiBCT09MRUFOOlxyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBydCBpbnN0YW5jZW9mIE5VTUJFUjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCT09MRUFOKChsZiBhcyBCT09MRUFOKS5nZXRWYWx1ZU51bWJlcigpIDwgKHJ0IGFzIE5VTUJFUikuZ2V0VmFsdWUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBydCBpbnN0YW5jZW9mIEJPT0xFQU46XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTigobGYgYXMgQk9PTEVBTikuZ2V0VmFsdWVOdW1iZXIoKSA8IChydCBhcyBCT09MRUFOKS5nZXRWYWx1ZU51bWJlcigpKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIG5ldyBCT09MRUFOKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBsZiBpbnN0YW5jZW9mIFNUUklORzpcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcnQgaW5zdGFuY2VvZiBTVFJJTkc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTigobGYgYXMgU1RSSU5HKS5nZXRWYWx1ZSgpIDwgKHJ0IGFzIFNUUklORykuZ2V0VmFsdWUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCT09MRUFOKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBsZiBpbnN0YW5jZW9mIE5BTjpcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcnQgaW5zdGFuY2VvZiBOVU1CRVI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCT09MRUFOKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTihmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTWF5b3JFcShsZjogQ250bnIsIHJ0OiBDbnRuciwgcG9zaXRpb246IFBvc2l0aW9uID0gbmV3IFBvc2l0aW9uKCkpOiBDbnRuciB7XHJcbiAgICBsZiBpbnN0YW5jZW9mIFJlZmVyZW5jZSA/IGxmID0gKGxmIGFzIFJlZmVyZW5jZSkuZ2V0VmFsdWUoKSA6IGxmO1xyXG4gICAgcnQgaW5zdGFuY2VvZiBSZWZlcmVuY2UgPyBydCA9IChydCBhcyBSZWZlcmVuY2UpLmdldFZhbHVlKCkgOiBydDtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIHJldHVybiBNYXlFcShsZiwgcnQpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIHRocm93IG5ldyBTZW1hbnRpY0V4Y2VwdGlvbihgT3BlcmFjaW9uIGVudHJlIHRpcG9zICggJHtsZi50eXBvfSA+PSAke3J0LnR5cG99ICkgbm8gcGVybWl0aWRhLmAsIHBvc2l0aW9uKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIE1heUVxKGxmOiBhbnksIHJ0OiBhbnkpOiBDbnRuciB7XHJcbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgbGYgaW5zdGFuY2VvZiBOVU1CRVI6XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgTlVNQkVSOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJPT0xFQU4oKGxmIGFzIE5VTUJFUikuZ2V0VmFsdWUoKSA+PSAocnQgYXMgTlVNQkVSKS5nZXRWYWx1ZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgQk9PTEVBTjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCT09MRUFOKChsZiBhcyBOVU1CRVIpLmdldFZhbHVlKCkgPj0gKHJ0IGFzIEJPT0xFQU4pLmdldFZhbHVlTnVtYmVyKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcnQgaW5zdGFuY2VvZiBOQU46XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCT09MRUFOKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBsZiBpbnN0YW5jZW9mIEJPT0xFQU46XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgTlVNQkVSOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJPT0xFQU4oKGxmIGFzIEJPT0xFQU4pLmdldFZhbHVlTnVtYmVyKCkgPj0gKHJ0IGFzIE5VTUJFUikuZ2V0VmFsdWUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBydCBpbnN0YW5jZW9mIEJPT0xFQU46XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTigobGYgYXMgQk9PTEVBTikuZ2V0VmFsdWVOdW1iZXIoKSA+PSAocnQgYXMgQk9PTEVBTikuZ2V0VmFsdWVOdW1iZXIoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCT09MRUFOKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBsZiBpbnN0YW5jZW9mIFNUUklORzpcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcnQgaW5zdGFuY2VvZiBTVFJJTkc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTigobGYgYXMgU1RSSU5HKS5nZXRWYWx1ZSgpID49IChydCBhcyBTVFJJTkcpLmdldFZhbHVlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgbGYgaW5zdGFuY2VvZiBOQU46XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgTlVNQkVSOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJPT0xFQU4oZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJPT0xFQU4oZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE1lbm9yRXEobGY6IENudG5yLCBydDogQ250bnIsIHBvc2l0aW9uOiBQb3NpdGlvbiA9IG5ldyBQb3NpdGlvbigpKTogQ250bnIge1xyXG4gICAgbGYgaW5zdGFuY2VvZiBSZWZlcmVuY2UgPyBsZiA9IChsZiBhcyBSZWZlcmVuY2UpLmdldFZhbHVlKCkgOiBsZjtcclxuICAgIHJ0IGluc3RhbmNlb2YgUmVmZXJlbmNlID8gcnQgPSAocnQgYXMgUmVmZXJlbmNlKS5nZXRWYWx1ZSgpIDogcnQ7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gTWluRXEobGYsIHJ0KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICB0aHJvdyBuZXcgU2VtYW50aWNFeGNlcHRpb24oYE9wZXJhY2lvbiBlbnRyZSB0aXBvcyAoICR7bGYudHlwb30gPj0gJHtydC50eXBvfSApIG5vIHBlcm1pdGlkYS5gLCBwb3NpdGlvbilcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBNaW5FcShsZjogYW55LCBydDogYW55KTogQ250bnIge1xyXG4gICAgICAgIHN3aXRjaCAodHJ1ZSkge1xyXG4gICAgICAgICAgICBjYXNlIGxmIGluc3RhbmNlb2YgTlVNQkVSOlxyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBydCBpbnN0YW5jZW9mIE5VTUJFUjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCT09MRUFOKChsZiBhcyBOVU1CRVIpLmdldFZhbHVlKCkgPD0gKHJ0IGFzIE5VTUJFUikuZ2V0VmFsdWUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBydCBpbnN0YW5jZW9mIEJPT0xFQU46XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTigobGYgYXMgTlVNQkVSKS5nZXRWYWx1ZSgpIDw9IChydCBhcyBCT09MRUFOKS5nZXRWYWx1ZU51bWJlcigpKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgTkFOOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJPT0xFQU4oZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgbGYgaW5zdGFuY2VvZiBCT09MRUFOOlxyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBydCBpbnN0YW5jZW9mIE5VTUJFUjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCT09MRUFOKChsZiBhcyBCT09MRUFOKS5nZXRWYWx1ZU51bWJlcigpIDw9IChydCBhcyBOVU1CRVIpLmdldFZhbHVlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgcnQgaW5zdGFuY2VvZiBCT09MRUFOOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJPT0xFQU4oKGxmIGFzIEJPT0xFQU4pLmdldFZhbHVlTnVtYmVyKCkgPD0gKHJ0IGFzIEJPT0xFQU4pLmdldFZhbHVlTnVtYmVyKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQk9PTEVBTihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgbGYgaW5zdGFuY2VvZiBTVFJJTkc6XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHJ0IGluc3RhbmNlb2YgU1RSSU5HOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJPT0xFQU4oKGxmIGFzIFNUUklORykuZ2V0VmFsdWUoKSA8PSAocnQgYXMgU1RSSU5HKS5nZXRWYWx1ZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJPT0xFQU4oZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIGxmIGluc3RhbmNlb2YgTkFOOlxyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBydCBpbnN0YW5jZW9mIE5VTUJFUjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCT09MRUFOKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJPT0xFQU4oZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCT09MRUFOKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIFRTR3JhcGhDb250cm9sIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGdyYXBoSWRDb3VudCA9IDA7XHJcbiAgICBwdWJsaWMgc3RhdGljIEdldEdyYXBoSWQgPSAoKSA9PiBUU0dyYXBoQ29udHJvbC5ncmFwaElkQ291bnQrKztcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBub2RlSWRDb3VudCA9IDA7XHJcbiAgICBwdWJsaWMgc3RhdGljIEdldE5vZGVJZCA9ICgpID0+IFRTR3JhcGhDb250cm9sLm5vZGVJZENvdW50Kys7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ3JhcGhTdHJpbmdzID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgQWRkR3JhcGhTdHJpbmcgPSAoZ3JhcGg6IHN0cmluZykgPT4gVFNHcmFwaENvbnRyb2wuZ3JhcGhTdHJpbmdzLnB1c2goZ3JhcGgpO1xyXG4gICAgcHVibGljIHN0YXRpYyBHZXRHZXRHcmFwaHNTdHJpbmcgPSAoKTogc3RyaW5nID0+IFRTR3JhcGhDb250cm9sLmdyYXBoU3RyaW5ncy5qb2luKCdcXG4nKTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsZWFyU3RydWN0dXJlcygpIHtcclxuICAgICAgICBUU0dyYXBoQ29udHJvbC5ncmFwaElkQ291bnQgPSAwO1xyXG4gICAgICAgIFRTR3JhcGhDb250cm9sLm5vZGVJZENvdW50ID0gMDtcclxuICAgICAgICBUU0dyYXBoQ29udHJvbC5ncmFwaFN0cmluZ3MgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7Qk9PTEVBTiwgTlVMTCwgT0JKRUNULCBVTkRFRklORUR9IGZyb20gXCIuL1ByaW1pdGl2ZVR5cG9Db250YWluZXJcIjtcclxuaW1wb3J0IHtDbnRucn0gZnJvbSBcIi4vQ250bnJcIjtcclxuaW1wb3J0IHtFbnZtbnR9IGZyb20gXCIuL0Vudm1udFwiO1xyXG5pbXBvcnQge09wfSBmcm9tIFwiLi9PcFwiO1xyXG5pbXBvcnQge1JlZmVyZW5jZX0gZnJvbSBcIi4vUmVmZXJlbmNlXCI7XHJcbmltcG9ydCB7QnJlYWtPYmp9IGZyb20gXCIuLi9ub2Rlcy9CcmVha09ialwiO1xyXG5pbXBvcnQge1JldHVybk9ian0gZnJvbSBcIi4uL25vZGVzL1JldHVybk9ialwiO1xyXG5pbXBvcnQge0NvbnRpbnVlT2JqfSBmcm9tIFwiLi4vbm9kZXMvQ29udGludWVPYmpcIjtcclxuaW1wb3J0IHtUU0dyYXBoQ29udHJvbH0gZnJvbSBcIi4vVFNHcmFwaENvbnRyb2xcIjtcclxuaW1wb3J0IHtFcnJvcnNDb250cm9sLCBQb3NpdGlvbn0gZnJvbSBcIi4vRXJyb3JzQ29udHJvbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlbWFudGljRXhjZXB0aW9uIGV4dGVuZHMgRXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IobWVzc2FnZT86IHN0cmluZywgcG9zaXRpb246IFBvc2l0aW9uID0gbmV3IFBvc2l0aW9uKCkpIHtcclxuICAgICAgICBzdXBlcihtZXNzYWdlKTtcclxuICAgICAgICBFcnJvcnNDb250cm9sLkFkZEVycm9yKHBvc2l0aW9uLmZpcnN0X2xpbmUsIHBvc2l0aW9uLmZpcnN0X2NvbHVtbiwgJycsIG1lc3NhZ2UsICdTRU1BTlRJQycpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRXJyb3JDb21wbyBleHRlbmRzIEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2U/OiBzdHJpbmcsIHBvc2l0aW9uOiBQb3NpdGlvbiA9IG5ldyBQb3NpdGlvbigpKSB7XHJcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XHJcbiAgICAgICAgRXJyb3JzQ29udHJvbC5BZGRFcnJvcihwb3NpdGlvbi5maXJzdF9saW5lLCBwb3NpdGlvbi5maXJzdF9jb2x1bW4sICcnLCBtZXNzYWdlLCAnU0VNQU5USUMnKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIERlZmF1bHRWYWx1ZSh0eXBvOiBzdHJpbmcpOiBDbnRuciB7XHJcbiAgICBpZiAoSXNQcmltaXRpdmVUeXBvKHR5cG8pKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBVTkRFRklORUQoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBHZXRPYmplY3RWYWx1ZSh0eXBvKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIElzUHJpbWl0aXZlVHlwbyh0eXBvOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIHR5cG8gPSB0eXBvLnRvVXBwZXJDYXNlKCk7XHJcbiAgICBzd2l0Y2ggKHR5cG8pIHtcclxuICAgICAgICBjYXNlIFwiU1RSSU5HXCI6XHJcbiAgICAgICAgY2FzZSBcIk5VTUJFUlwiOlxyXG4gICAgICAgIGNhc2UgXCJCT09MRUFOXCI6XHJcbiAgICAgICAgY2FzZSBcIkFOWVwiOlxyXG4gICAgICAgIGNhc2UgXCJBUlJBWVwiOlxyXG4gICAgICAgIGNhc2UgXCJOVUxMXCI6XHJcbiAgICAgICAgY2FzZSBcIlVOREVGSU5FRFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBHZXRPYmplY3RWYWx1ZSh0eXBvOiBzdHJpbmcpOiBDbnRuciB7XHJcbiAgICB0eXBvID0gdHlwby50b1VwcGVyQ2FzZSgpO1xyXG4gICAgbGV0IHN0cnVjdHVyZTogT2JqZWN0U3RydWN0dXJlID0gT2JqZWN0c1N0cnVjdHVyZXMub2JqZWN0cy5nZXQodHlwbyk7XHJcbiAgICBpZiAoc3RydWN0dXJlID09PSBudWxsIHx8IHN0cnVjdHVyZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFNlbWFudGljRXhjZXB0aW9uKGBObyBleGlzdGUgdW5hIGRlZmluaWNpb24gcGFyYSBlbCB0aXBvICR7dHlwb31gKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdHJ1Y3R1cmUuR2V0RGVmYXVsdFZhbHVlKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBGaW5kVmFyKGNvbnQ6IENudG5yLCBpZGVudGlmaWVyOiBzdHJpbmcpOiBDbnRuciB7XHJcbiAgICBsZXQgb3duZXJDbnRuciA9IGNvbnQ7XHJcblxyXG4gICAgd2hpbGUgKG93bmVyQ250bnIgIT0gbnVsbCl7XHJcbiAgICAgICAgaWYob3duZXJDbnRuci5HZXRQcm9wZXJ0eShpZGVudGlmaWVyKSAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIG93bmVyQ250bnIuR2V0UHJvcGVydHkoaWRlbnRpZmllcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG93bmVyQ250bnIgPSBvd25lckNudG5yLkdldE93bmVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhyb3cgIG5ldyBTZW1hbnRpY0V4Y2VwdGlvbihgaWRlbnRpZmljYWRvciAke2lkZW50aWZpZXJ9IG5vIGVuY29udHJhZG9gKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFRTR3JhcGgoZW52bW50OiBDbnRucik6IHN0cmluZyB7XHJcbiAgICBsZXQgb3duZXJDbnRuciA9IGVudm1udDtcclxuICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgaWYgKG93bmVyQ250bnIuR2V0T3duZXIoKSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvd25lckNudG5yID0gb3duZXJDbnRuci5HZXRPd25lcigpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG93bmVyQ250bnIuR2V0VFNHcmFwaCgnZ2xvYmFsJyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBUU0dyYXBoMihzZW50ZW5jZXM6IEFycmF5PE9wPik6IHN0cmluZyB7XHJcbiAgICBsZXQgdmFsdWUgPSAnJztcclxuICAgIGNvbnN0IGdyYXBoSWQgPSBUU0dyYXBoQ29udHJvbC5HZXRHcmFwaElkKCk7XHJcbiAgICB2YWx1ZSArPSBgc3ViZ3JhcGggY2x1c3Rlcl8ke2dyYXBoSWR9IHsgXFxuYDtcclxuICAgICAgICB2YWx1ZSArPSAnc3R5bGU9ZmlsbGVkO1xcbicgK1xyXG4gICAgICAgICAgICAnY29sb3I9XCIjMkJCQkFEXCI7XFxuJyArXHJcbiAgICAgICAgICAgICdmaWxsY29sb3I9XCIjMUUyMjJBXCI7XFxuJztcclxuICAgICAgICB2YWx1ZSArPSAnbm9kZSBbY29sb3I9XCIjMkJCQkFEXCIgZm9udGNvbG9yPVwiIzJCQkJBRFwiIHNoYXBlPVwicmVjdGFuZ2xlXCJdIFxcbic7XHJcbiAgICBzZW50ZW5jZXMuZm9yRWFjaChzZW50ZW5jZSA9PiB7XHJcbiAgICAgICAgdmFsdWUgKz0gc2VudGVuY2UuR2V0VFNHcmFwaCgpO1xyXG4gICAgfSk7XHJcbiAgICB2YWx1ZSArPSBgbGFiZWwgPSBcIiR7J0dMT0JBTCd9XCI7XFxuYDtcclxuICAgIHZhbHVlICs9IGB9XFxuYFxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUGFzc1Byb3BzQW5kRnVuY3MoZmF0aGVyOiBFbnZtbnQsIHNvbjogRW52bW50KSB7XHJcbiAgICAvLyBmYXRoZXIucHJvcHMuZm9yRWFjaCgodiwgaykgPT4ge1xyXG4gICAgLy8gICAgIHNvbi5EZWNsYXJlKGssIHYpO1xyXG4gICAgLy8gfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBMb2dpY1doaWxlKGVudjogRW52bW50LCBjb25kaXRpb246IE9wLCBzZW50ZW5jZXM6IEFycmF5PE9wPiwgZXh0cmE6IE9wKSB7XHJcbiAgICBsZXQgYW5zID0gY29uZGl0aW9uLkV4ZShlbnYpO1xyXG4gICAgaWYgKGFucyBpbnN0YW5jZW9mIFJlZmVyZW5jZSkge1xyXG4gICAgICAgIGFucyA9IChhbnMgYXMgUmVmZXJlbmNlKS5nZXRWYWx1ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghKGFucyBpbnN0YW5jZW9mIEJPT0xFQU4pKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFNlbWFudGljRXhjZXB0aW9uKFwiQ29uZGljaW9uIHV0aWxpemFkYSBlbiBjaWNsbyB3aGlsZSBubyBzb3BvcnRhZGFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHRtcCA9IGFucyBhcyBCT09MRUFOO1xyXG4gICAgd2hpbGUgKHRtcC5nZXRWYWx1ZSgpKSB7XHJcbiAgICAgICAgY29uc3QgZW52MCA9IG5ldyBFbnZtbnQoZW52LCBzZW50ZW5jZXMpO1xyXG4gICAgICAgIFBhc3NQcm9wc0FuZEZ1bmNzKGVudiwgZW52MCk7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gZW52MC5HT19BTEwoKTtcclxuXHJcbiAgICAgICAgaWYgKHJldCBpbnN0YW5jZW9mIEJyZWFrT2JqKSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmV0IGluc3RhbmNlb2YgUmV0dXJuT2JqKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHJldCBpbnN0YW5jZW9mIENvbnRpbnVlT2JqKXtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZXh0cmEgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgZXh0cmEuRXhlKGVudik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYW5zMCA9IGNvbmRpdGlvbi5FeGUoZW52KTtcclxuICAgICAgICBpZiAoYW5zMCBpbnN0YW5jZW9mIFJlZmVyZW5jZSkge1xyXG4gICAgICAgICAgICBhbnMwID0gKGFuczAgYXMgUmVmZXJlbmNlKS5nZXRWYWx1ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0bXAgPSBhbnMwIGFzIEJPT0xFQU47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIExvZ2ljRG9XaGlsZShlbnY6IEVudm1udCwgY29uZGl0aW9uOiBPcCwgc2VudGVuY2VzOiBBcnJheTxPcD4sIGV4dHJhOiBPcCkge1xyXG4gICAgbGV0IGFucyA9IGNvbmRpdGlvbi5FeGUoZW52KTtcclxuICAgIGlmIChhbnMgaW5zdGFuY2VvZiBSZWZlcmVuY2UpIHtcclxuICAgICAgICBhbnMgPSAoYW5zIGFzIFJlZmVyZW5jZSkuZ2V0VmFsdWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIShhbnMgaW5zdGFuY2VvZiBCT09MRUFOKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBTZW1hbnRpY0V4Y2VwdGlvbihcIkNvbmRpY2lvbiB1dGlsaXphZGEgZW4gY2ljbG8gd2hpbGUgbm8gc29wb3J0YWRhXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBlbnYwID0gbmV3IEVudm1udChlbnYsIHNlbnRlbmNlcyk7XHJcbiAgICBQYXNzUHJvcHNBbmRGdW5jcyhlbnYsIGVudjApO1xyXG4gICAgZW52MC5HT19BTEwoKTtcclxuXHJcbiAgICBsZXQgYW5zMCA9IGNvbmRpdGlvbi5FeGUoZW52KTtcclxuICAgIGlmIChhbnMwIGluc3RhbmNlb2YgUmVmZXJlbmNlKSB7XHJcbiAgICAgICAgYW5zMCA9IChhbnMwIGFzIFJlZmVyZW5jZSkuZ2V0VmFsdWUoKTtcclxuICAgIH1cclxuICAgIGxldCB0bXAgPSBhbnMwIGFzIEJPT0xFQU47XHJcblxyXG4gICAgd2hpbGUgKHRtcC5nZXRWYWx1ZSgpKSB7XHJcbiAgICAgICAgY29uc3QgZW52MCA9IG5ldyBFbnZtbnQoZW52LCBzZW50ZW5jZXMpO1xyXG4gICAgICAgIFBhc3NQcm9wc0FuZEZ1bmNzKGVudiwgZW52MCk7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gZW52MC5HT19BTEwoKTtcclxuXHJcbiAgICAgICAgaWYgKHJldCBpbnN0YW5jZW9mIEJyZWFrT2JqKSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmV0IGluc3RhbmNlb2YgUmV0dXJuT2JqKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHJldCBpbnN0YW5jZW9mIENvbnRpbnVlT2JqKXtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZXh0cmEgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgZXh0cmEuRXhlKGVudik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYW5zMCA9IGNvbmRpdGlvbi5FeGUoZW52KTtcclxuICAgICAgICBpZiAoYW5zMCBpbnN0YW5jZW9mIFJlZmVyZW5jZSkge1xyXG4gICAgICAgICAgICBhbnMwID0gKGFuczAgYXMgUmVmZXJlbmNlKS5nZXRWYWx1ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0bXAgPSBhbnMwIGFzIEJPT0xFQU47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE15TWFwIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbWFwOiBNYXA8YW55LCBhbnk+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubWFwID0gbmV3IE1hcDxhbnksIGFueT4oKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEVudHJ5KGtleTogYW55LCB2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5tYXAuc2V0KGtleSwgdmFsdWUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgT2JqZWN0U3RydWN0dXJlIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgcHJvcGVydGllczogTWFwPHN0cmluZywgc3RyaW5nPjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzOiBNYXA8c3RyaW5nLCBzdHJpbmc+KSB7XHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gcHJvcGVydGllcztcclxuICAgIH1cclxuXHJcbiAgICBHZXREZWZhdWx0VmFsdWUoKTogQ250bnJ7XHJcbiAgICAgICAgY29uc3QgYXR0cmlidXRlczogTWFwPHN0cmluZywgQ250bnI+ID0gbmV3IE1hcDxzdHJpbmcsIENudG5yPigpO1xyXG4gICAgICAgIHRoaXMucHJvcGVydGllcy5mb3JFYWNoKCh2LCBrKSA9PiB7XHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMuc2V0KGssIG5ldyBVTkRFRklORUQoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBPQkpFQ1QoYXR0cmlidXRlcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBPYmplY3RzU3RydWN0dXJlc3tcclxuICAgIHB1YmxpYyBzdGF0aWMgb2JqZWN0czogTWFwPHN0cmluZywgT2JqZWN0U3RydWN0dXJlPiA9IG5ldyBNYXA8c3RyaW5nLCBPYmplY3RTdHJ1Y3R1cmU+KCk7XHJcbn1cclxuIiwiaW1wb3J0IHtFbnZtbnR9IGZyb20gXCIuLi9FbnZtbnRcIjtcclxuaW1wb3J0IHtDbnRucn0gZnJvbSBcIi4uL0NudG5yXCI7XHJcblxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEZ1bmN0aW9uUmVwcmVzZW50IGV4dGVuZHMgQ250bnJ7XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgRVhFKGVudjA6IEVudm1udCwgYXJnczogQXJyYXk8Q250bnI+KTogQ250bnI7XHJcbn0iLCJpbXBvcnQge0Z1bmN0aW9uUmVwcmVzZW50fSBmcm9tIFwiLi9GdW5jdGlvblJlcHJlc2VudFwiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE5hdGl2ZSBleHRlbmRzIEZ1bmN0aW9uUmVwcmVzZW50e1xyXG5cclxufSIsImltcG9ydCB7RnVuY3Rpb25SZXByZXNlbnR9IGZyb20gXCIuL0Z1bmN0aW9uUmVwcmVzZW50XCI7XHJcbmltcG9ydCB7T3B9IGZyb20gXCIuLi9PcFwiO1xyXG5pbXBvcnQge0Vudm1udH0gZnJvbSBcIi4uL0Vudm1udFwiO1xyXG5pbXBvcnQge0NudG5yfSBmcm9tIFwiLi4vQ250bnJcIjtcclxuaW1wb3J0IHtSZWZlcmVuY2V9IGZyb20gXCIuLi9SZWZlcmVuY2VcIjtcclxuaW1wb3J0IHtUU0dyYXBoQ29udHJvbH0gZnJvbSBcIi4uL1RTR3JhcGhDb250cm9sXCI7XHJcbmltcG9ydCB7RGVjbGFyZUZ1blBhcmFtTm9kZX0gZnJvbSBcIi4uLy4uL25vZGVzL0RlY2xhcmVGdW5QYXJhbU5vZGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBVc2VyRGVmaW5lZCBleHRlbmRzIEZ1bmN0aW9uUmVwcmVzZW50IHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgc3JjOiBBcnJheTxPcD47XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHBhcmFtczogQXJyYXk8T3A+O1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSB0eXBlOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc3JjOiBBcnJheTxPcD4sIHBhcmFtczogQXJyYXk8T3A+LCB0eXBlOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc3JjID0gc3JjO1xyXG4gICAgICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGUudG9VcHBlckNhc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpOiBzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0U3JjKCk6IEFycmF5PE9wPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3JjO1xyXG4gICAgfVxyXG5cclxuICAgIEVYRShlbnYwOiBFbnZtbnQsIGFyZ3M6IEFycmF5PENudG5yPik6IENudG5yIHtcclxuICAgICAgICBsZXQgZW52ID0gbmV3IEVudm1udChlbnYwLCB0aGlzLnNyYyk7XHJcbiAgICAgICAgY29uc3QgcmVmZXJlbmNlczogQXJyYXk8UmVmZXJlbmNlPiA9IG5ldyBBcnJheTxSZWZlcmVuY2U+KCk7XHJcbiAgICAgICAgZm9yIChsZXQgcGFyYW0gb2YgdGhpcy5wYXJhbXMpIHtcclxuICAgICAgICAgICAgcmVmZXJlbmNlcy5wdXNoKHBhcmFtLkV4ZShlbnYpIGFzIFJlZmVyZW5jZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJncy5sZW5ndGggJiYgaSA8IHJlZmVyZW5jZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcmVmZXJlbmNlc1tpXS5QdXRWYWx1ZU9uUmVmZXJlbmNlKGFyZ3NbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZW52LkdPX0FMTCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRUU0dyYXBoKG93bmVyOiBzdHJpbmcgPSAnJyk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHZhbHVlID0gJyc7XHJcbiAgICAgICAgY29uc3QgZ3JhcGhJZCA9IFRTR3JhcGhDb250cm9sLkdldEdyYXBoSWQoKTtcclxuICAgICAgICB2YWx1ZSArPSBgc3ViZ3JhcGggY2x1c3Rlcl8ke2dyYXBoSWR9IHsgXFxuYDtcclxuICAgICAgICB2YWx1ZSArPSAnc3R5bGU9ZmlsbGVkO1xcbicgK1xyXG4gICAgICAgICAgICAnY29sb3I9XCIjMkJCQkFEXCI7XFxuJyArXHJcbiAgICAgICAgICAgICdmaWxsY29sb3I9XCIjMUUyMjJBXCI7XFxuJztcclxuICAgICAgICB2YWx1ZSArPSAnbm9kZSBbY29sb3I9XCIjMkJCQkFEXCIgZm9udGNvbG9yPVwiIzJCQkJBRFwiIHNoYXBlPVwicmVjdGFuZ2xlXCJdIFxcbic7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMuZm9yRWFjaCgodikgPT4ge1xyXG4gICAgICAgICAgICB2YWx1ZSArPSBgbiR7VFNHcmFwaENvbnRyb2wuR2V0Tm9kZUlkKCl9IFtsYWJlbD1cIiR7KHYgYXMgRGVjbGFyZUZ1blBhcmFtTm9kZSkuR2V0TmFtZSgpfVwiXVxcbmBcclxuICAgICAgICB9KTtcclxuICAgICAgICB2YWx1ZSArPSBgbGFiZWwgPSBcIiR7b3duZXIudG9VcHBlckNhc2UoKX1cIjtcXG5gO1xyXG4gICAgICAgIHRoaXMucHJvcHMuZm9yRWFjaCgodiwgaykgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdnYgPSB2O1xyXG4gICAgICAgICAgICBpZiAodnYgaW5zdGFuY2VvZiBSZWZlcmVuY2UpIHtcclxuICAgICAgICAgICAgICAgIHZ2ID0gKHZ2IGFzIFJlZmVyZW5jZSkuZ2V0VmFsdWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh2dik7XHJcbiAgICAgICAgICAgIHZhbHVlICs9IHZ2LkdldFRTR3JhcGgoayk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFsdWUgKz0gYH1cXG5gO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0Vudm1udH0gZnJvbSBcIi4uL0Vudm1udFwiO1xyXG5pbXBvcnQge05hdGl2ZX0gZnJvbSBcIi4uL2Z1bmN0aW9ucy9OYXRpdmVcIjtcclxuaW1wb3J0IHtDbnRucn0gZnJvbSBcIi4uL0NudG5yXCI7XHJcbmltcG9ydCB7VFNHcmFwaDJ9IGZyb20gXCIuLi9VdGlsc1wiO1xyXG5pbXBvcnQge1VOREVGSU5FRH0gZnJvbSBcIi4uL1ByaW1pdGl2ZVR5cG9Db250YWluZXJcIjtcclxuaW1wb3J0IHtUU0dyYXBoQ29udHJvbH0gZnJvbSBcIi4uL1RTR3JhcGhDb250cm9sXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgR3JhZmljYXJfdHMgZXh0ZW5kcyBOYXRpdmV7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIEVYRShlbnYwOiBFbnZtbnQsIGFyZ3M6IEFycmF5PENudG5yPik6IENudG5yIHtcclxuICAgICAgICBsZXQgb3duZXJDbnRuciA9IGVudjAgYXMgQ250bnI7XHJcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICAgICAgaWYgKG93bmVyQ250bnIuR2V0T3duZXIoKSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvd25lckNudG5yID0gb3duZXJDbnRuci5HZXRPd25lcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY29udGVudCA9ICdkaWdyYXBoIEcge2JnY29sb3I9XCIjMkUzNDQwXCIgZ3JhZGllbnRhbmdsZT0wIHJhbmtkaXI9VEIgZm9udGNvbG9yPVwiIzJCQkJBRFwiIFxcbic7XHJcbiAgICAgICAgY29udGVudCArPSAgICAgVFNHcmFwaDIoKG93bmVyQ250bnIgYXMgRW52bW50KS5HZXRTZW50ZW5jZXMoKSk7XHJcbiAgICAgICAgY29udGVudCArPSAnfVxcblxcbic7XHJcbiAgICAgICAgY29uc29sZS5sb2coY29udGVudCk7XHJcbiAgICAgICAgVFNHcmFwaENvbnRyb2wuQWRkR3JhcGhTdHJpbmcoY29udGVudCk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBVTkRFRklORUQoKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge05hdGl2ZX0gZnJvbSBcIi4uL2Z1bmN0aW9ucy9OYXRpdmVcIjtcclxuaW1wb3J0IHtBUlJBWSwgTlVNQkVSfSBmcm9tIFwiLi4vUHJpbWl0aXZlVHlwb0NvbnRhaW5lclwiO1xyXG5pbXBvcnQge0Vudm1udH0gZnJvbSBcIi4uL0Vudm1udFwiO1xyXG5pbXBvcnQge0NudG5yfSBmcm9tIFwiLi4vQ250bnJcIjtcclxuaW1wb3J0IHtSZXR1cm5PYmp9IGZyb20gXCIuLi8uLi9ub2Rlcy9SZXR1cm5PYmpcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBMZW5ndGggZXh0ZW5kcyBOYXRpdmV7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGFycmF5OiBBUlJBWTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhcnJheTogQVJSQVkpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcclxuICAgIH1cclxuXHJcbiAgICBFWEUoZW52MDogRW52bW50LCBhcmdzOiBBcnJheTxDbnRucj4pOiBDbnRuciB7XHJcbiAgICAgICAgbGV0IHNpemUgPSB0aGlzLmFycmF5LmdldFZhbHVlTGlzdCgpLmxlbmd0aDtcclxuICAgICAgICByZXR1cm4gbmV3IFJldHVybk9iaihuZXcgTlVNQkVSKHNpemUpKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7TmF0aXZlfSBmcm9tIFwiLi4vZnVuY3Rpb25zL05hdGl2ZVwiO1xyXG5pbXBvcnQge0FSUkFZLCBVTkRFRklORUR9IGZyb20gXCIuLi9QcmltaXRpdmVUeXBvQ29udGFpbmVyXCI7XHJcbmltcG9ydCB7RW52bW50fSBmcm9tIFwiLi4vRW52bW50XCI7XHJcbmltcG9ydCB7Q250bnJ9IGZyb20gXCIuLi9DbnRuclwiO1xyXG5pbXBvcnQge1JldHVybk9ian0gZnJvbSBcIi4uLy4uL25vZGVzL1JldHVybk9ialwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBvcCBleHRlbmRzIE5hdGl2ZXtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgYXJyYXk6IEFSUkFZO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFycmF5OiBBUlJBWSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5hcnJheSA9IGFycmF5O1xyXG4gICAgfVxyXG5cclxuICAgIEVYRShlbnYwOiBFbnZtbnQsIGFyZ3M6IEFycmF5PENudG5yPik6IENudG5yIHtcclxuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmFycmF5LmdldFZhbHVlTGlzdCgpLnBvcCgpO1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmV0dXJuT2JqKG5ldyBVTkRFRklORUQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgUmV0dXJuT2JqKHZhbHVlKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7TmF0aXZlfSBmcm9tIFwiLi4vZnVuY3Rpb25zL05hdGl2ZVwiO1xyXG5pbXBvcnQge0FSUkFZLCBOVU1CRVJ9IGZyb20gXCIuLi9QcmltaXRpdmVUeXBvQ29udGFpbmVyXCI7XHJcbmltcG9ydCB7RW52bW50fSBmcm9tIFwiLi4vRW52bW50XCI7XHJcbmltcG9ydCB7Q250bnJ9IGZyb20gXCIuLi9DbnRuclwiO1xyXG5pbXBvcnQge1JldHVybk9ian0gZnJvbSBcIi4uLy4uL25vZGVzL1JldHVybk9ialwiO1xyXG5pbXBvcnQge1JlZmVyZW5jZX0gZnJvbSBcIi4uL1JlZmVyZW5jZVwiO1xyXG5pbXBvcnQge1NlbWFudGljRXhjZXB0aW9ufSBmcm9tIFwiLi4vVXRpbHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQdXNoIGV4dGVuZHMgTmF0aXZle1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBhcnJheTogQVJSQVk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYXJyYXk6IEFSUkFZKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmFycmF5ID0gYXJyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgRVhFKGVudjA6IEVudm1udCwgYXJnczogQXJyYXk8Q250bnI+KTogQ250bnIge1xyXG4gICAgICAgIGxldCBzaXplID0gdGhpcy5hcnJheS5nZXRWYWx1ZUxpc3QoKS5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBhcmdzKSB7XHJcbiAgICAgICAgICAgIGxldCByZWYgPSBuZXcgUmVmZXJlbmNlKCk7XHJcbiAgICAgICAgICAgIHJlZi5zZXRWYWx1ZShhcmdzW2ldKTtcclxuICAgICAgICAgICAgdGhpcy5hcnJheS5hZGRWYWx1ZShyZWYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IFJldHVybk9iaihuZXcgTlVNQkVSKHNpemUpKTtcclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290IjoiIn0=