// Generated by CoffeeScript 1.6.3
(function() {
  var Collection, EventEmitter, Schema, UUID, fs,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  fs = require('fs');

  UUID = require('node-uuid');

  Schema = require('./backless.schema');

  EventEmitter = require("events").EventEmitter;

  Collection = (function(_super) {
    __extends(Collection, _super);

    Collection.prototype.models = [];

    Collection.prototype._indexes = {};

    function Collection(name, options) {
      this.name = name;
      if (options) {
        this.id = options.id;
      }
      if (!this.id) {
        this.id = UUID.v1();
      }
    }

    Collection.prototype.add = function(model) {
      var length;
      this.emit("onBeforeAdd", model);
      if (model !== {}) {
        length = this.models.length;
        this.models.push(model);
        this._indexes[model.id] = length;
        this.emit("onAfterAdd", model);
      }
      return this;
    };

    Collection.prototype.find = function(index) {
      var attr, matches, mod, models, spec, total, val, _i, _j, _len, _len1, _ref;
      models = [];
      if (typeof index === 'object') {
        spec = index;
        _ref = this.models;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          mod = _ref[_i];
          matches = 0;
          total = Object.keys(spec).length;
          for (val = _j = 0, _len1 = spec.length; _j < _len1; val = ++_j) {
            attr = spec[val];
            if (col[attr] !== val) {
              break;
            }
            models.push(col);
            matches++;
          }
          if (matches === total) {
            models.push(col);
          }
        }
        if (models.length === 1) {
          models = models[0];
        }
      } else {
        models = this.models[this._indexes[index]];
      }
      this.emit("onBeforeDeliver", models);
      return models;
    };

    return Collection;

  })(EventEmitter);

  module.exports = Collection;

}).call(this);