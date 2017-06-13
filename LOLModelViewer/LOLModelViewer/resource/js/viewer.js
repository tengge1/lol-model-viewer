(function($) {
    if (!$.fn.on) {
        $.fn.on = function(events, selector, data, handler) {
            var self = this;
            var args = arguments.length;
            if (args > 3) {
                return self.delegate(selector, events, data, handler)
            } else if (args > 2) {
                if (typeof selector === "string") {
                    return self.delegate(selector, events, data)
                } else {
                    return self.bind(events, selector, data)
                }
            } else {
                return self.bind(events, selector)
            }
        }
    }
    if (!$.fn.off) {
        $.fn.off = function(events, selector, handler) {
            var self = this;
            var args = arguments.length;
            if (typeof selector === "string") {
                if (args > 2) {
                    return self.undelegate(selector, events, handler)
                } else if (args > 1) {
                    return self.undelegate(selector, events)
                } else {
                    return self.undelegate()
                }
            } else {
                if (args > 1) {
                    handler = selector;
                    return self.unbind(events, handler)
                } else if (args > 0) {
                    return self.unbind(events)
                } else {
                    return self.unbind()
                }
            }
        }
    }
})(this.jQuery); (function(_global) {
    "use strict";
    var shim = {};
    if (typeof exports === "undefined") {
        if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
            shim.exports = {};
            define(function() {
                return shim.exports
            })
        } else {
            shim.exports = typeof window !== "undefined" ? window: _global
        }
    } else {
        shim.exports = exports
    } (function(exports) {
        if (!GLMAT_EPSILON) {
            var GLMAT_EPSILON = 1e-6
        }
        if (!GLMAT_ARRAY_TYPE) {
            var GLMAT_ARRAY_TYPE = typeof Float32Array !== "undefined" ? Float32Array: Array
        }
        if (!GLMAT_RANDOM) {
            var GLMAT_RANDOM = Math.random
        }
        var glMatrix = {};
        glMatrix.setMatrixArrayType = function(type) {
            GLMAT_ARRAY_TYPE = type
        };
        if (typeof exports !== "undefined") {
            exports.glMatrix = glMatrix
        }
        var degree = Math.PI / 180;
        glMatrix.toRadian = function(a) {
            return a * degree
        };
        var vec2 = {};
        vec2.create = function() {
            var out = new GLMAT_ARRAY_TYPE(2);
            out[0] = 0;
            out[1] = 0;
            return out
        };
        vec2.clone = function(a) {
            var out = new GLMAT_ARRAY_TYPE(2);
            out[0] = a[0];
            out[1] = a[1];
            return out
        };
        vec2.fromValues = function(x, y) {
            var out = new GLMAT_ARRAY_TYPE(2);
            out[0] = x;
            out[1] = y;
            return out
        };
        vec2.copy = function(out, a) {
            out[0] = a[0];
            out[1] = a[1];
            return out
        };
        vec2.set = function(out, x, y) {
            out[0] = x;
            out[1] = y;
            return out
        };
        vec2.add = function(out, a, b) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            return out
        };
        vec2.subtract = function(out, a, b) {
            out[0] = a[0] - b[0];
            out[1] = a[1] - b[1];
            return out
        };
        vec2.sub = vec2.subtract;
        vec2.multiply = function(out, a, b) {
            out[0] = a[0] * b[0];
            out[1] = a[1] * b[1];
            return out
        };
        vec2.mul = vec2.multiply;
        vec2.divide = function(out, a, b) {
            out[0] = a[0] / b[0];
            out[1] = a[1] / b[1];
            return out
        };
        vec2.div = vec2.divide;
        vec2.min = function(out, a, b) {
            out[0] = Math.min(a[0], b[0]);
            out[1] = Math.min(a[1], b[1]);
            return out
        };
        vec2.max = function(out, a, b) {
            out[0] = Math.max(a[0], b[0]);
            out[1] = Math.max(a[1], b[1]);
            return out
        };
        vec2.scale = function(out, a, b) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            return out
        };
        vec2.scaleAndAdd = function(out, a, b, scale) {
            out[0] = a[0] + b[0] * scale;
            out[1] = a[1] + b[1] * scale;
            return out
        };
        vec2.distance = function(a, b) {
            var x = b[0] - a[0],
            y = b[1] - a[1];
            return Math.sqrt(x * x + y * y)
        };
        vec2.dist = vec2.distance;
        vec2.squaredDistance = function(a, b) {
            var x = b[0] - a[0],
            y = b[1] - a[1];
            return x * x + y * y
        };
        vec2.sqrDist = vec2.squaredDistance;
        vec2.length = function(a) {
            var x = a[0],
            y = a[1];
            return Math.sqrt(x * x + y * y)
        };
        vec2.len = vec2.length;
        vec2.squaredLength = function(a) {
            var x = a[0],
            y = a[1];
            return x * x + y * y
        };
        vec2.sqrLen = vec2.squaredLength;
        vec2.negate = function(out, a) {
            out[0] = -a[0];
            out[1] = -a[1];
            return out
        };
        vec2.normalize = function(out, a) {
            var x = a[0],
            y = a[1];
            var len = x * x + y * y;
            if (len > 0) {
                len = 1 / Math.sqrt(len);
                out[0] = a[0] * len;
                out[1] = a[1] * len
            }
            return out
        };
        vec2.dot = function(a, b) {
            return a[0] * b[0] + a[1] * b[1]
        };
        vec2.cross = function(out, a, b) {
            var z = a[0] * b[1] - a[1] * b[0];
            out[0] = out[1] = 0;
            out[2] = z;
            return out
        };
        vec2.lerp = function(out, a, b, t) {
            var ax = a[0],
            ay = a[1];
            out[0] = ax + t * (b[0] - ax);
            out[1] = ay + t * (b[1] - ay);
            return out
        };
        vec2.random = function(out, scale) {
            scale = scale || 1;
            var r = GLMAT_RANDOM() * 2 * Math.PI;
            out[0] = Math.cos(r) * scale;
            out[1] = Math.sin(r) * scale;
            return out
        };
        vec2.transformMat2 = function(out, a, m) {
            var x = a[0],
            y = a[1];
            out[0] = m[0] * x + m[2] * y;
            out[1] = m[1] * x + m[3] * y;
            return out
        };
        vec2.transformMat2d = function(out, a, m) {
            var x = a[0],
            y = a[1];
            out[0] = m[0] * x + m[2] * y + m[4];
            out[1] = m[1] * x + m[3] * y + m[5];
            return out
        };
        vec2.transformMat3 = function(out, a, m) {
            var x = a[0],
            y = a[1];
            out[0] = m[0] * x + m[3] * y + m[6];
            out[1] = m[1] * x + m[4] * y + m[7];
            return out
        };
        vec2.transformMat4 = function(out, a, m) {
            var x = a[0],
            y = a[1];
            out[0] = m[0] * x + m[4] * y + m[12];
            out[1] = m[1] * x + m[5] * y + m[13];
            return out
        };
        vec2.forEach = function() {
            var vec = vec2.create();
            return function(a, stride, offset, count, fn, arg) {
                var i, l;
                if (!stride) {
                    stride = 2
                }
                if (!offset) {
                    offset = 0
                }
                if (count) {
                    l = Math.min(count * stride + offset, a.length)
                } else {
                    l = a.length
                }
                for (i = offset; i < l; i += stride) {
                    vec[0] = a[i];
                    vec[1] = a[i + 1];
                    fn(vec, vec, arg);
                    a[i] = vec[0];
                    a[i + 1] = vec[1]
                }
                return a
            }
        } ();
        vec2.str = function(a) {
            return "vec2(" + a[0] + ", " + a[1] + ")"
        };
        if (typeof exports !== "undefined") {
            exports.vec2 = vec2
        }
        var vec3 = {};
        vec3.create = function() {
            var out = new GLMAT_ARRAY_TYPE(3);
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            return out
        };
        vec3.clone = function(a) {
            var out = new GLMAT_ARRAY_TYPE(3);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            return out
        };
        vec3.fromValues = function(x, y, z) {
            var out = new GLMAT_ARRAY_TYPE(3);
            out[0] = x;
            out[1] = y;
            out[2] = z;
            return out
        };
        vec3.copy = function(out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            return out
        };
        vec3.set = function(out, x, y, z) {
            out[0] = x;
            out[1] = y;
            out[2] = z;
            return out
        };
        vec3.add = function(out, a, b) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            out[2] = a[2] + b[2];
            return out
        };
        vec3.subtract = function(out, a, b) {
            out[0] = a[0] - b[0];
            out[1] = a[1] - b[1];
            out[2] = a[2] - b[2];
            return out
        };
        vec3.sub = vec3.subtract;
        vec3.multiply = function(out, a, b) {
            out[0] = a[0] * b[0];
            out[1] = a[1] * b[1];
            out[2] = a[2] * b[2];
            return out
        };
        vec3.mul = vec3.multiply;
        vec3.divide = function(out, a, b) {
            out[0] = a[0] / b[0];
            out[1] = a[1] / b[1];
            out[2] = a[2] / b[2];
            return out
        };
        vec3.div = vec3.divide;
        vec3.min = function(out, a, b) {
            out[0] = Math.min(a[0], b[0]);
            out[1] = Math.min(a[1], b[1]);
            out[2] = Math.min(a[2], b[2]);
            return out
        };
        vec3.max = function(out, a, b) {
            out[0] = Math.max(a[0], b[0]);
            out[1] = Math.max(a[1], b[1]);
            out[2] = Math.max(a[2], b[2]);
            return out
        };
        vec3.scale = function(out, a, b) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            out[2] = a[2] * b;
            return out
        };
        vec3.scaleAndAdd = function(out, a, b, scale) {
            out[0] = a[0] + b[0] * scale;
            out[1] = a[1] + b[1] * scale;
            out[2] = a[2] + b[2] * scale;
            return out
        };
        vec3.distance = function(a, b) {
            var x = b[0] - a[0],
            y = b[1] - a[1],
            z = b[2] - a[2];
            return Math.sqrt(x * x + y * y + z * z)
        };
        vec3.dist = vec3.distance;
        vec3.squaredDistance = function(a, b) {
            var x = b[0] - a[0],
            y = b[1] - a[1],
            z = b[2] - a[2];
            return x * x + y * y + z * z
        };
        vec3.sqrDist = vec3.squaredDistance;
        vec3.length = function(a) {
            var x = a[0],
            y = a[1],
            z = a[2];
            return Math.sqrt(x * x + y * y + z * z)
        };
        vec3.len = vec3.length;
        vec3.squaredLength = function(a) {
            var x = a[0],
            y = a[1],
            z = a[2];
            return x * x + y * y + z * z
        };
        vec3.sqrLen = vec3.squaredLength;
        vec3.negate = function(out, a) {
            out[0] = -a[0];
            out[1] = -a[1];
            out[2] = -a[2];
            return out
        };
        vec3.normalize = function(out, a) {
            var x = a[0],
            y = a[1],
            z = a[2];
            var len = x * x + y * y + z * z;
            if (len > 0) {
                len = 1 / Math.sqrt(len);
                out[0] = a[0] * len;
                out[1] = a[1] * len;
                out[2] = a[2] * len
            }
            return out
        };
        vec3.dot = function(a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
        };
        vec3.cross = function(out, a, b) {
            var ax = a[0],
            ay = a[1],
            az = a[2],
            bx = b[0],
            by = b[1],
            bz = b[2];
            out[0] = ay * bz - az * by;
            out[1] = az * bx - ax * bz;
            out[2] = ax * by - ay * bx;
            return out
        };
        vec3.lerp = function(out, a, b, t) {
            var ax = a[0],
            ay = a[1],
            az = a[2];
            out[0] = ax + t * (b[0] - ax);
            out[1] = ay + t * (b[1] - ay);
            out[2] = az + t * (b[2] - az);
            return out
        };
        vec3.random = function(out, scale) {
            scale = scale || 1;
            var r = GLMAT_RANDOM() * 2 * Math.PI;
            var z = GLMAT_RANDOM() * 2 - 1;
            var zScale = Math.sqrt(1 - z * z) * scale;
            out[0] = Math.cos(r) * zScale;
            out[1] = Math.sin(r) * zScale;
            out[2] = z * scale;
            return out
        };
        vec3.transformMat4 = function(out, a, m) {
            var x = a[0],
            y = a[1],
            z = a[2];
            out[0] = m[0] * x + m[4] * y + m[8] * z + m[12];
            out[1] = m[1] * x + m[5] * y + m[9] * z + m[13];
            out[2] = m[2] * x + m[6] * y + m[10] * z + m[14];
            return out
        };
        vec3.transformMat3 = function(out, a, m) {
            var x = a[0],
            y = a[1],
            z = a[2];
            out[0] = x * m[0] + y * m[3] + z * m[6];
            out[1] = x * m[1] + y * m[4] + z * m[7];
            out[2] = x * m[2] + y * m[5] + z * m[8];
            return out
        };
        vec3.transformQuat = function(out, a, q) {
            var x = a[0],
            y = a[1],
            z = a[2],
            qx = q[0],
            qy = q[1],
            qz = q[2],
            qw = q[3],
            ix = qw * x + qy * z - qz * y,
            iy = qw * y + qz * x - qx * z,
            iz = qw * z + qx * y - qy * x,
            iw = -qx * x - qy * y - qz * z;
            out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
            out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
            out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
            return out
        };
        vec3.rotateX = function(out, a, b, c) {
            var p = [],
            r = [];
            p[0] = a[0] - b[0];
            p[1] = a[1] - b[1];
            p[2] = a[2] - b[2];
            r[0] = p[0];
            r[1] = p[1] * Math.cos(c) - p[2] * Math.sin(c);
            r[2] = p[1] * Math.sin(c) + p[2] * Math.cos(c);
            out[0] = r[0] + b[0];
            out[1] = r[1] + b[1];
            out[2] = r[2] + b[2];
            return out
        };
        vec3.rotateY = function(out, a, b, c) {
            var p = [],
            r = [];
            p[0] = a[0] - b[0];
            p[1] = a[1] - b[1];
            p[2] = a[2] - b[2];
            r[0] = p[2] * Math.sin(c) + p[0] * Math.cos(c);
            r[1] = p[1];
            r[2] = p[2] * Math.cos(c) - p[0] * Math.sin(c);
            out[0] = r[0] + b[0];
            out[1] = r[1] + b[1];
            out[2] = r[2] + b[2];
            return out
        };
        vec3.rotateZ = function(out, a, b, c) {
            var p = [],
            r = [];
            p[0] = a[0] - b[0];
            p[1] = a[1] - b[1];
            p[2] = a[2] - b[2];
            r[0] = p[0] * Math.cos(c) - p[1] * Math.sin(c);
            r[1] = p[0] * Math.sin(c) + p[1] * Math.cos(c);
            r[2] = p[2];
            out[0] = r[0] + b[0];
            out[1] = r[1] + b[1];
            out[2] = r[2] + b[2];
            return out
        };
        vec3.forEach = function() {
            var vec = vec3.create();
            return function(a, stride, offset, count, fn, arg) {
                var i, l;
                if (!stride) {
                    stride = 3
                }
                if (!offset) {
                    offset = 0
                }
                if (count) {
                    l = Math.min(count * stride + offset, a.length)
                } else {
                    l = a.length
                }
                for (i = offset; i < l; i += stride) {
                    vec[0] = a[i];
                    vec[1] = a[i + 1];
                    vec[2] = a[i + 2];
                    fn(vec, vec, arg);
                    a[i] = vec[0];
                    a[i + 1] = vec[1];
                    a[i + 2] = vec[2]
                }
                return a
            }
        } ();
        vec3.str = function(a) {
            return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")"
        };
        if (typeof exports !== "undefined") {
            exports.vec3 = vec3
        }
        var vec4 = {};
        vec4.create = function() {
            var out = new GLMAT_ARRAY_TYPE(4);
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            return out
        };
        vec4.clone = function(a) {
            var out = new GLMAT_ARRAY_TYPE(4);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out
        };
        vec4.fromValues = function(x, y, z, w) {
            var out = new GLMAT_ARRAY_TYPE(4);
            out[0] = x;
            out[1] = y;
            out[2] = z;
            out[3] = w;
            return out
        };
        vec4.copy = function(out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out
        };
        vec4.set = function(out, x, y, z, w) {
            out[0] = x;
            out[1] = y;
            out[2] = z;
            out[3] = w;
            return out
        };
        vec4.add = function(out, a, b) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            out[2] = a[2] + b[2];
            out[3] = a[3] + b[3];
            return out
        };
        vec4.subtract = function(out, a, b) {
            out[0] = a[0] - b[0];
            out[1] = a[1] - b[1];
            out[2] = a[2] - b[2];
            out[3] = a[3] - b[3];
            return out
        };
        vec4.sub = vec4.subtract;
        vec4.multiply = function(out, a, b) {
            out[0] = a[0] * b[0];
            out[1] = a[1] * b[1];
            out[2] = a[2] * b[2];
            out[3] = a[3] * b[3];
            return out
        };
        vec4.mul = vec4.multiply;
        vec4.divide = function(out, a, b) {
            out[0] = a[0] / b[0];
            out[1] = a[1] / b[1];
            out[2] = a[2] / b[2];
            out[3] = a[3] / b[3];
            return out
        };
        vec4.div = vec4.divide;
        vec4.min = function(out, a, b) {
            out[0] = Math.min(a[0], b[0]);
            out[1] = Math.min(a[1], b[1]);
            out[2] = Math.min(a[2], b[2]);
            out[3] = Math.min(a[3], b[3]);
            return out
        };
        vec4.max = function(out, a, b) {
            out[0] = Math.max(a[0], b[0]);
            out[1] = Math.max(a[1], b[1]);
            out[2] = Math.max(a[2], b[2]);
            out[3] = Math.max(a[3], b[3]);
            return out
        };
        vec4.scale = function(out, a, b) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            out[2] = a[2] * b;
            out[3] = a[3] * b;
            return out
        };
        vec4.scaleAndAdd = function(out, a, b, scale) {
            out[0] = a[0] + b[0] * scale;
            out[1] = a[1] + b[1] * scale;
            out[2] = a[2] + b[2] * scale;
            out[3] = a[3] + b[3] * scale;
            return out
        };
        vec4.distance = function(a, b) {
            var x = b[0] - a[0],
            y = b[1] - a[1],
            z = b[2] - a[2],
            w = b[3] - a[3];
            return Math.sqrt(x * x + y * y + z * z + w * w)
        };
        vec4.dist = vec4.distance;
        vec4.squaredDistance = function(a, b) {
            var x = b[0] - a[0],
            y = b[1] - a[1],
            z = b[2] - a[2],
            w = b[3] - a[3];
            return x * x + y * y + z * z + w * w
        };
        vec4.sqrDist = vec4.squaredDistance;
        vec4.length = function(a) {
            var x = a[0],
            y = a[1],
            z = a[2],
            w = a[3];
            return Math.sqrt(x * x + y * y + z * z + w * w)
        };
        vec4.len = vec4.length;
        vec4.squaredLength = function(a) {
            var x = a[0],
            y = a[1],
            z = a[2],
            w = a[3];
            return x * x + y * y + z * z + w * w
        };
        vec4.sqrLen = vec4.squaredLength;
        vec4.negate = function(out, a) {
            out[0] = -a[0];
            out[1] = -a[1];
            out[2] = -a[2];
            out[3] = -a[3];
            return out
        };
        vec4.normalize = function(out, a) {
            var x = a[0],
            y = a[1],
            z = a[2],
            w = a[3];
            var len = x * x + y * y + z * z + w * w;
            if (len > 0) {
                len = 1 / Math.sqrt(len);
                out[0] = a[0] * len;
                out[1] = a[1] * len;
                out[2] = a[2] * len;
                out[3] = a[3] * len
            }
            return out
        };
        vec4.dot = function(a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]
        };
        vec4.lerp = function(out, a, b, t) {
            var ax = a[0],
            ay = a[1],
            az = a[2],
            aw = a[3];
            out[0] = ax + t * (b[0] - ax);
            out[1] = ay + t * (b[1] - ay);
            out[2] = az + t * (b[2] - az);
            out[3] = aw + t * (b[3] - aw);
            return out
        };
        vec4.random = function(out, scale) {
            scale = scale || 1;
            out[0] = GLMAT_RANDOM();
            out[1] = GLMAT_RANDOM();
            out[2] = GLMAT_RANDOM();
            out[3] = GLMAT_RANDOM();
            vec4.normalize(out, out);
            vec4.scale(out, out, scale);
            return out
        };
        vec4.transformMat4 = function(out, a, m) {
            var x = a[0],
            y = a[1],
            z = a[2],
            w = a[3];
            out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
            out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
            out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
            out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
            return out
        };
        vec4.transformQuat = function(out, a, q) {
            var x = a[0],
            y = a[1],
            z = a[2],
            qx = q[0],
            qy = q[1],
            qz = q[2],
            qw = q[3],
            ix = qw * x + qy * z - qz * y,
            iy = qw * y + qz * x - qx * z,
            iz = qw * z + qx * y - qy * x,
            iw = -qx * x - qy * y - qz * z;
            out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
            out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
            out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
            return out
        };
        vec4.forEach = function() {
            var vec = vec4.create();
            return function(a, stride, offset, count, fn, arg) {
                var i, l;
                if (!stride) {
                    stride = 4
                }
                if (!offset) {
                    offset = 0
                }
                if (count) {
                    l = Math.min(count * stride + offset, a.length)
                } else {
                    l = a.length
                }
                for (i = offset; i < l; i += stride) {
                    vec[0] = a[i];
                    vec[1] = a[i + 1];
                    vec[2] = a[i + 2];
                    vec[3] = a[i + 3];
                    fn(vec, vec, arg);
                    a[i] = vec[0];
                    a[i + 1] = vec[1];
                    a[i + 2] = vec[2];
                    a[i + 3] = vec[3]
                }
                return a
            }
        } ();
        vec4.str = function(a) {
            return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")"
        };
        if (typeof exports !== "undefined") {
            exports.vec4 = vec4
        }
        var mat2 = {};
        mat2.create = function() {
            var out = new GLMAT_ARRAY_TYPE(4);
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out
        };
        mat2.clone = function(a) {
            var out = new GLMAT_ARRAY_TYPE(4);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out
        };
        mat2.copy = function(out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out
        };
        mat2.identity = function(out) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out
        };
        mat2.transpose = function(out, a) {
            if (out === a) {
                var a1 = a[1];
                out[1] = a[2];
                out[2] = a1
            } else {
                out[0] = a[0];
                out[1] = a[2];
                out[2] = a[1];
                out[3] = a[3]
            }
            return out
        };
        mat2.invert = function(out, a) {
            var a0 = a[0],
            a1 = a[1],
            a2 = a[2],
            a3 = a[3],
            det = a0 * a3 - a2 * a1;
            if (!det) {
                return null
            }
            det = 1 / det;
            out[0] = a3 * det;
            out[1] = -a1 * det;
            out[2] = -a2 * det;
            out[3] = a0 * det;
            return out
        };
        mat2.adjoint = function(out, a) {
            var a0 = a[0];
            out[0] = a[3];
            out[1] = -a[1];
            out[2] = -a[2];
            out[3] = a0;
            return out
        };
        mat2.determinant = function(a) {
            return a[0] * a[3] - a[2] * a[1]
        };
        mat2.multiply = function(out, a, b) {
            var a0 = a[0],
            a1 = a[1],
            a2 = a[2],
            a3 = a[3];
            var b0 = b[0],
            b1 = b[1],
            b2 = b[2],
            b3 = b[3];
            out[0] = a0 * b0 + a2 * b1;
            out[1] = a1 * b0 + a3 * b1;
            out[2] = a0 * b2 + a2 * b3;
            out[3] = a1 * b2 + a3 * b3;
            return out
        };
        mat2.mul = mat2.multiply;
        mat2.rotate = function(out, a, rad) {
            var a0 = a[0],
            a1 = a[1],
            a2 = a[2],
            a3 = a[3],
            s = Math.sin(rad),
            c = Math.cos(rad);
            out[0] = a0 * c + a2 * s;
            out[1] = a1 * c + a3 * s;
            out[2] = a0 * -s + a2 * c;
            out[3] = a1 * -s + a3 * c;
            return out
        };
        mat2.scale = function(out, a, v) {
            var a0 = a[0],
            a1 = a[1],
            a2 = a[2],
            a3 = a[3],
            v0 = v[0],
            v1 = v[1];
            out[0] = a0 * v0;
            out[1] = a1 * v0;
            out[2] = a2 * v1;
            out[3] = a3 * v1;
            return out
        };
        mat2.str = function(a) {
            return "mat2(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")"
        };
        mat2.frob = function(a) {
            return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2))
        };
        mat2.LDU = function(L, D, U, a) {
            L[2] = a[2] / a[0];
            U[0] = a[0];
            U[1] = a[1];
            U[3] = a[3] - L[2] * U[1];
            return [L, D, U]
        };
        if (typeof exports !== "undefined") {
            exports.mat2 = mat2
        }
        var mat2d = {};
        mat2d.create = function() {
            var out = new GLMAT_ARRAY_TYPE(6);
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            out[4] = 0;
            out[5] = 0;
            return out
        };
        mat2d.clone = function(a) {
            var out = new GLMAT_ARRAY_TYPE(6);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            return out
        };
        mat2d.copy = function(out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            return out
        };
        mat2d.identity = function(out) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            out[4] = 0;
            out[5] = 0;
            return out
        };
        mat2d.invert = function(out, a) {
            var aa = a[0],
            ab = a[1],
            ac = a[2],
            ad = a[3],
            atx = a[4],
            aty = a[5];
            var det = aa * ad - ab * ac;
            if (!det) {
                return null
            }
            det = 1 / det;
            out[0] = ad * det;
            out[1] = -ab * det;
            out[2] = -ac * det;
            out[3] = aa * det;
            out[4] = (ac * aty - ad * atx) * det;
            out[5] = (ab * atx - aa * aty) * det;
            return out
        };
        mat2d.determinant = function(a) {
            return a[0] * a[3] - a[1] * a[2]
        };
        mat2d.multiply = function(out, a, b) {
            var a0 = a[0],
            a1 = a[1],
            a2 = a[2],
            a3 = a[3],
            a4 = a[4],
            a5 = a[5],
            b0 = b[0],
            b1 = b[1],
            b2 = b[2],
            b3 = b[3],
            b4 = b[4],
            b5 = b[5];
            out[0] = a0 * b0 + a2 * b1;
            out[1] = a1 * b0 + a3 * b1;
            out[2] = a0 * b2 + a2 * b3;
            out[3] = a1 * b2 + a3 * b3;
            out[4] = a0 * b4 + a2 * b5 + a4;
            out[5] = a1 * b4 + a3 * b5 + a5;
            return out
        };
        mat2d.mul = mat2d.multiply;
        mat2d.rotate = function(out, a, rad) {
            var a0 = a[0],
            a1 = a[1],
            a2 = a[2],
            a3 = a[3],
            a4 = a[4],
            a5 = a[5],
            s = Math.sin(rad),
            c = Math.cos(rad);
            out[0] = a0 * c + a2 * s;
            out[1] = a1 * c + a3 * s;
            out[2] = a0 * -s + a2 * c;
            out[3] = a1 * -s + a3 * c;
            out[4] = a4;
            out[5] = a5;
            return out
        };
        mat2d.scale = function(out, a, v) {
            var a0 = a[0],
            a1 = a[1],
            a2 = a[2],
            a3 = a[3],
            a4 = a[4],
            a5 = a[5],
            v0 = v[0],
            v1 = v[1];
            out[0] = a0 * v0;
            out[1] = a1 * v0;
            out[2] = a2 * v1;
            out[3] = a3 * v1;
            out[4] = a4;
            out[5] = a5;
            return out
        };
        mat2d.translate = function(out, a, v) {
            var a0 = a[0],
            a1 = a[1],
            a2 = a[2],
            a3 = a[3],
            a4 = a[4],
            a5 = a[5],
            v0 = v[0],
            v1 = v[1];
            out[0] = a0;
            out[1] = a1;
            out[2] = a2;
            out[3] = a3;
            out[4] = a0 * v0 + a2 * v1 + a4;
            out[5] = a1 * v0 + a3 * v1 + a5;
            return out
        };
        mat2d.str = function(a) {
            return "mat2d(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ")"
        };
        mat2d.frob = function(a) {
            return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1)
        };
        if (typeof exports !== "undefined") {
            exports.mat2d = mat2d
        }
        var mat3 = {};
        mat3.create = function() {
            var out = new GLMAT_ARRAY_TYPE(9);
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 1;
            out[5] = 0;
            out[6] = 0;
            out[7] = 0;
            out[8] = 1;
            return out
        };
        mat3.fromMat4 = function(out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[4];
            out[4] = a[5];
            out[5] = a[6];
            out[6] = a[8];
            out[7] = a[9];
            out[8] = a[10];
            return out
        };
        mat3.clone = function(a) {
            var out = new GLMAT_ARRAY_TYPE(9);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            return out
        };
        mat3.copy = function(out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            return out
        };
        mat3.identity = function(out) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 1;
            out[5] = 0;
            out[6] = 0;
            out[7] = 0;
            out[8] = 1;
            return out
        };
        mat3.transpose = function(out, a) {
            if (out === a) {
                var a01 = a[1],
                a02 = a[2],
                a12 = a[5];
                out[1] = a[3];
                out[2] = a[6];
                out[3] = a01;
                out[5] = a[7];
                out[6] = a02;
                out[7] = a12
            } else {
                out[0] = a[0];
                out[1] = a[3];
                out[2] = a[6];
                out[3] = a[1];
                out[4] = a[4];
                out[5] = a[7];
                out[6] = a[2];
                out[7] = a[5];
                out[8] = a[8]
            }
            return out
        };
        mat3.invert = function(out, a) {
            var a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a10 = a[3],
            a11 = a[4],
            a12 = a[5],
            a20 = a[6],
            a21 = a[7],
            a22 = a[8],
            b01 = a22 * a11 - a12 * a21,
            b11 = -a22 * a10 + a12 * a20,
            b21 = a21 * a10 - a11 * a20,
            det = a00 * b01 + a01 * b11 + a02 * b21;
            if (!det) {
                return null
            }
            det = 1 / det;
            out[0] = b01 * det;
            out[1] = ( - a22 * a01 + a02 * a21) * det;
            out[2] = (a12 * a01 - a02 * a11) * det;
            out[3] = b11 * det;
            out[4] = (a22 * a00 - a02 * a20) * det;
            out[5] = ( - a12 * a00 + a02 * a10) * det;
            out[6] = b21 * det;
            out[7] = ( - a21 * a00 + a01 * a20) * det;
            out[8] = (a11 * a00 - a01 * a10) * det;
            return out
        };
        mat3.adjoint = function(out, a) {
            var a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a10 = a[3],
            a11 = a[4],
            a12 = a[5],
            a20 = a[6],
            a21 = a[7],
            a22 = a[8];
            out[0] = a11 * a22 - a12 * a21;
            out[1] = a02 * a21 - a01 * a22;
            out[2] = a01 * a12 - a02 * a11;
            out[3] = a12 * a20 - a10 * a22;
            out[4] = a00 * a22 - a02 * a20;
            out[5] = a02 * a10 - a00 * a12;
            out[6] = a10 * a21 - a11 * a20;
            out[7] = a01 * a20 - a00 * a21;
            out[8] = a00 * a11 - a01 * a10;
            return out
        };
        mat3.determinant = function(a) {
            var a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a10 = a[3],
            a11 = a[4],
            a12 = a[5],
            a20 = a[6],
            a21 = a[7],
            a22 = a[8];
            return a00 * (a22 * a11 - a12 * a21) + a01 * ( - a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20)
        };
        mat3.multiply = function(out, a, b) {
            var a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a10 = a[3],
            a11 = a[4],
            a12 = a[5],
            a20 = a[6],
            a21 = a[7],
            a22 = a[8],
            b00 = b[0],
            b01 = b[1],
            b02 = b[2],
            b10 = b[3],
            b11 = b[4],
            b12 = b[5],
            b20 = b[6],
            b21 = b[7],
            b22 = b[8];
            out[0] = b00 * a00 + b01 * a10 + b02 * a20;
            out[1] = b00 * a01 + b01 * a11 + b02 * a21;
            out[2] = b00 * a02 + b01 * a12 + b02 * a22;
            out[3] = b10 * a00 + b11 * a10 + b12 * a20;
            out[4] = b10 * a01 + b11 * a11 + b12 * a21;
            out[5] = b10 * a02 + b11 * a12 + b12 * a22;
            out[6] = b20 * a00 + b21 * a10 + b22 * a20;
            out[7] = b20 * a01 + b21 * a11 + b22 * a21;
            out[8] = b20 * a02 + b21 * a12 + b22 * a22;
            return out
        };
        mat3.mul = mat3.multiply;
        mat3.translate = function(out, a, v) {
            var a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a10 = a[3],
            a11 = a[4],
            a12 = a[5],
            a20 = a[6],
            a21 = a[7],
            a22 = a[8],
            x = v[0],
            y = v[1];
            out[0] = a00;
            out[1] = a01;
            out[2] = a02;
            out[3] = a10;
            out[4] = a11;
            out[5] = a12;
            out[6] = x * a00 + y * a10 + a20;
            out[7] = x * a01 + y * a11 + a21;
            out[8] = x * a02 + y * a12 + a22;
            return out
        };
        mat3.rotate = function(out, a, rad) {
            var a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a10 = a[3],
            a11 = a[4],
            a12 = a[5],
            a20 = a[6],
            a21 = a[7],
            a22 = a[8],
            s = Math.sin(rad),
            c = Math.cos(rad);
            out[0] = c * a00 + s * a10;
            out[1] = c * a01 + s * a11;
            out[2] = c * a02 + s * a12;
            out[3] = c * a10 - s * a00;
            out[4] = c * a11 - s * a01;
            out[5] = c * a12 - s * a02;
            out[6] = a20;
            out[7] = a21;
            out[8] = a22;
            return out
        };
        mat3.scale = function(out, a, v) {
            var x = v[0],
            y = v[1];
            out[0] = x * a[0];
            out[1] = x * a[1];
            out[2] = x * a[2];
            out[3] = y * a[3];
            out[4] = y * a[4];
            out[5] = y * a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            return out
        };
        mat3.fromMat2d = function(out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = 0;
            out[3] = a[2];
            out[4] = a[3];
            out[5] = 0;
            out[6] = a[4];
            out[7] = a[5];
            out[8] = 1;
            return out
        };
        mat3.fromQuat = function(out, q) {
            var x = q[0],
            y = q[1],
            z = q[2],
            w = q[3],
            x2 = x + x,
            y2 = y + y,
            z2 = z + z,
            xx = x * x2,
            yx = y * x2,
            yy = y * y2,
            zx = z * x2,
            zy = z * y2,
            zz = z * z2,
            wx = w * x2,
            wy = w * y2,
            wz = w * z2;
            out[0] = 1 - yy - zz;
            out[3] = yx - wz;
            out[6] = zx + wy;
            out[1] = yx + wz;
            out[4] = 1 - xx - zz;
            out[7] = zy - wx;
            out[2] = zx - wy;
            out[5] = zy + wx;
            out[8] = 1 - xx - yy;
            return out
        };
        mat3.normalFromMat4 = function(out, a) {
            var a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a03 = a[3],
            a10 = a[4],
            a11 = a[5],
            a12 = a[6],
            a13 = a[7],
            a20 = a[8],
            a21 = a[9],
            a22 = a[10],
            a23 = a[11],
            a30 = a[12],
            a31 = a[13],
            a32 = a[14],
            a33 = a[15],
            b00 = a00 * a11 - a01 * a10,
            b01 = a00 * a12 - a02 * a10,
            b02 = a00 * a13 - a03 * a10,
            b03 = a01 * a12 - a02 * a11,
            b04 = a01 * a13 - a03 * a11,
            b05 = a02 * a13 - a03 * a12,
            b06 = a20 * a31 - a21 * a30,
            b07 = a20 * a32 - a22 * a30,
            b08 = a20 * a33 - a23 * a30,
            b09 = a21 * a32 - a22 * a31,
            b10 = a21 * a33 - a23 * a31,
            b11 = a22 * a33 - a23 * a32,
            det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
            if (!det) {
                return null
            }
            det = 1 / det;
            out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
            out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
            out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
            out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
            out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
            out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
            out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
            out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
            out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
            return out
        };
        mat3.str = function(a) {
            return "mat3(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ")"
        };
        mat3.frob = function(a) {
            return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2))
        };
        if (typeof exports !== "undefined") {
            exports.mat3 = mat3
        }
        var mat4 = {};
        mat4.create = function() {
            var out = new GLMAT_ARRAY_TYPE(16);
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = 1;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 1;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
            return out
        };
        mat4.clone = function(a) {
            var out = new GLMAT_ARRAY_TYPE(16);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            out[9] = a[9];
            out[10] = a[10];
            out[11] = a[11];
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
            return out
        };
        mat4.copy = function(out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            out[9] = a[9];
            out[10] = a[10];
            out[11] = a[11];
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
            return out
        };
        mat4.identity = function(out) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = 1;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 1;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
            return out
        };
        mat4.transpose = function(out, a) {
            if (out === a) {
                var a01 = a[1],
                a02 = a[2],
                a03 = a[3],
                a12 = a[6],
                a13 = a[7],
                a23 = a[11];
                out[1] = a[4];
                out[2] = a[8];
                out[3] = a[12];
                out[4] = a01;
                out[6] = a[9];
                out[7] = a[13];
                out[8] = a02;
                out[9] = a12;
                out[11] = a[14];
                out[12] = a03;
                out[13] = a13;
                out[14] = a23
            } else {
                out[0] = a[0];
                out[1] = a[4];
                out[2] = a[8];
                out[3] = a[12];
                out[4] = a[1];
                out[5] = a[5];
                out[6] = a[9];
                out[7] = a[13];
                out[8] = a[2];
                out[9] = a[6];
                out[10] = a[10];
                out[11] = a[14];
                out[12] = a[3];
                out[13] = a[7];
                out[14] = a[11];
                out[15] = a[15]
            }
            return out
        };
        mat4.invert = function(out, a) {
            var a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a03 = a[3],
            a10 = a[4],
            a11 = a[5],
            a12 = a[6],
            a13 = a[7],
            a20 = a[8],
            a21 = a[9],
            a22 = a[10],
            a23 = a[11],
            a30 = a[12],
            a31 = a[13],
            a32 = a[14],
            a33 = a[15],
            b00 = a00 * a11 - a01 * a10,
            b01 = a00 * a12 - a02 * a10,
            b02 = a00 * a13 - a03 * a10,
            b03 = a01 * a12 - a02 * a11,
            b04 = a01 * a13 - a03 * a11,
            b05 = a02 * a13 - a03 * a12,
            b06 = a20 * a31 - a21 * a30,
            b07 = a20 * a32 - a22 * a30,
            b08 = a20 * a33 - a23 * a30,
            b09 = a21 * a32 - a22 * a31,
            b10 = a21 * a33 - a23 * a31,
            b11 = a22 * a33 - a23 * a32,
            det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
            if (!det) {
                return null
            }
            det = 1 / det;
            out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
            out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
            out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
            out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
            out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
            out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
            out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
            out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
            out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
            out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
            out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
            out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
            out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
            out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
            out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
            out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
            return out
        };
        mat4.adjoint = function(out, a) {
            var a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a03 = a[3],
            a10 = a[4],
            a11 = a[5],
            a12 = a[6],
            a13 = a[7],
            a20 = a[8],
            a21 = a[9],
            a22 = a[10],
            a23 = a[11],
            a30 = a[12],
            a31 = a[13],
            a32 = a[14],
            a33 = a[15];
            out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
            out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
            out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
            out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
            out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
            out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
            out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
            out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
            out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
            out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
            out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
            out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
            out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
            out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
            out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
            out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
            return out
        };
        mat4.determinant = function(a) {
            var a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a03 = a[3],
            a10 = a[4],
            a11 = a[5],
            a12 = a[6],
            a13 = a[7],
            a20 = a[8],
            a21 = a[9],
            a22 = a[10],
            a23 = a[11],
            a30 = a[12],
            a31 = a[13],
            a32 = a[14],
            a33 = a[15],
            b00 = a00 * a11 - a01 * a10,
            b01 = a00 * a12 - a02 * a10,
            b02 = a00 * a13 - a03 * a10,
            b03 = a01 * a12 - a02 * a11,
            b04 = a01 * a13 - a03 * a11,
            b05 = a02 * a13 - a03 * a12,
            b06 = a20 * a31 - a21 * a30,
            b07 = a20 * a32 - a22 * a30,
            b08 = a20 * a33 - a23 * a30,
            b09 = a21 * a32 - a22 * a31,
            b10 = a21 * a33 - a23 * a31,
            b11 = a22 * a33 - a23 * a32;
            return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06
        };
        mat4.multiply = function(out, a, b) {
            var a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a03 = a[3],
            a10 = a[4],
            a11 = a[5],
            a12 = a[6],
            a13 = a[7],
            a20 = a[8],
            a21 = a[9],
            a22 = a[10],
            a23 = a[11],
            a30 = a[12],
            a31 = a[13],
            a32 = a[14],
            a33 = a[15];
            var b0 = b[0],
            b1 = b[1],
            b2 = b[2],
            b3 = b[3];
            out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            b0 = b[4];
            b1 = b[5];
            b2 = b[6];
            b3 = b[7];
            out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            b0 = b[8];
            b1 = b[9];
            b2 = b[10];
            b3 = b[11];
            out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            b0 = b[12];
            b1 = b[13];
            b2 = b[14];
            b3 = b[15];
            out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            return out
        };
        mat4.mul = mat4.multiply;
        mat4.translate = function(out, a, v) {
            var x = v[0],
            y = v[1],
            z = v[2],
            a00,
            a01,
            a02,
            a03,
            a10,
            a11,
            a12,
            a13,
            a20,
            a21,
            a22,
            a23;
            if (a === out) {
                out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
                out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
                out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
                out[15] = a[3] * x + a[7] * y + a[11] * z + a[15]
            } else {
                a00 = a[0];
                a01 = a[1];
                a02 = a[2];
                a03 = a[3];
                a10 = a[4];
                a11 = a[5];
                a12 = a[6];
                a13 = a[7];
                a20 = a[8];
                a21 = a[9];
                a22 = a[10];
                a23 = a[11];
                out[0] = a00;
                out[1] = a01;
                out[2] = a02;
                out[3] = a03;
                out[4] = a10;
                out[5] = a11;
                out[6] = a12;
                out[7] = a13;
                out[8] = a20;
                out[9] = a21;
                out[10] = a22;
                out[11] = a23;
                out[12] = a00 * x + a10 * y + a20 * z + a[12];
                out[13] = a01 * x + a11 * y + a21 * z + a[13];
                out[14] = a02 * x + a12 * y + a22 * z + a[14];
                out[15] = a03 * x + a13 * y + a23 * z + a[15]
            }
            return out
        };
        mat4.scale = function(out, a, v) {
            var x = v[0],
            y = v[1],
            z = v[2];
            out[0] = a[0] * x;
            out[1] = a[1] * x;
            out[2] = a[2] * x;
            out[3] = a[3] * x;
            out[4] = a[4] * y;
            out[5] = a[5] * y;
            out[6] = a[6] * y;
            out[7] = a[7] * y;
            out[8] = a[8] * z;
            out[9] = a[9] * z;
            out[10] = a[10] * z;
            out[11] = a[11] * z;
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
            return out
        };
        mat4.rotate = function(out, a, rad, axis) {
            var x = axis[0],
            y = axis[1],
            z = axis[2],
            len = Math.sqrt(x * x + y * y + z * z),
            s,
            c,
            t,
            a00,
            a01,
            a02,
            a03,
            a10,
            a11,
            a12,
            a13,
            a20,
            a21,
            a22,
            a23,
            b00,
            b01,
            b02,
            b10,
            b11,
            b12,
            b20,
            b21,
            b22;
            if (Math.abs(len) < GLMAT_EPSILON) {
                return null
            }
            len = 1 / len;
            x *= len;
            y *= len;
            z *= len;
            s = Math.sin(rad);
            c = Math.cos(rad);
            t = 1 - c;
            a00 = a[0];
            a01 = a[1];
            a02 = a[2];
            a03 = a[3];
            a10 = a[4];
            a11 = a[5];
            a12 = a[6];
            a13 = a[7];
            a20 = a[8];
            a21 = a[9];
            a22 = a[10];
            a23 = a[11];
            b00 = x * x * t + c;
            b01 = y * x * t + z * s;
            b02 = z * x * t - y * s;
            b10 = x * y * t - z * s;
            b11 = y * y * t + c;
            b12 = z * y * t + x * s;
            b20 = x * z * t + y * s;
            b21 = y * z * t - x * s;
            b22 = z * z * t + c;
            out[0] = a00 * b00 + a10 * b01 + a20 * b02;
            out[1] = a01 * b00 + a11 * b01 + a21 * b02;
            out[2] = a02 * b00 + a12 * b01 + a22 * b02;
            out[3] = a03 * b00 + a13 * b01 + a23 * b02;
            out[4] = a00 * b10 + a10 * b11 + a20 * b12;
            out[5] = a01 * b10 + a11 * b11 + a21 * b12;
            out[6] = a02 * b10 + a12 * b11 + a22 * b12;
            out[7] = a03 * b10 + a13 * b11 + a23 * b12;
            out[8] = a00 * b20 + a10 * b21 + a20 * b22;
            out[9] = a01 * b20 + a11 * b21 + a21 * b22;
            out[10] = a02 * b20 + a12 * b21 + a22 * b22;
            out[11] = a03 * b20 + a13 * b21 + a23 * b22;
            if (a !== out) {
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15]
            }
            return out
        };
        mat4.rotateX = function(out, a, rad) {
            var s = Math.sin(rad),
            c = Math.cos(rad),
            a10 = a[4],
            a11 = a[5],
            a12 = a[6],
            a13 = a[7],
            a20 = a[8],
            a21 = a[9],
            a22 = a[10],
            a23 = a[11];
            if (a !== out) {
                out[0] = a[0];
                out[1] = a[1];
                out[2] = a[2];
                out[3] = a[3];
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15]
            }
            out[4] = a10 * c + a20 * s;
            out[5] = a11 * c + a21 * s;
            out[6] = a12 * c + a22 * s;
            out[7] = a13 * c + a23 * s;
            out[8] = a20 * c - a10 * s;
            out[9] = a21 * c - a11 * s;
            out[10] = a22 * c - a12 * s;
            out[11] = a23 * c - a13 * s;
            return out
        };
        mat4.rotateY = function(out, a, rad) {
            var s = Math.sin(rad),
            c = Math.cos(rad),
            a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a03 = a[3],
            a20 = a[8],
            a21 = a[9],
            a22 = a[10],
            a23 = a[11];
            if (a !== out) {
                out[4] = a[4];
                out[5] = a[5];
                out[6] = a[6];
                out[7] = a[7];
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15]
            }
            out[0] = a00 * c - a20 * s;
            out[1] = a01 * c - a21 * s;
            out[2] = a02 * c - a22 * s;
            out[3] = a03 * c - a23 * s;
            out[8] = a00 * s + a20 * c;
            out[9] = a01 * s + a21 * c;
            out[10] = a02 * s + a22 * c;
            out[11] = a03 * s + a23 * c;
            return out
        };
        mat4.rotateZ = function(out, a, rad) {
            var s = Math.sin(rad),
            c = Math.cos(rad),
            a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a03 = a[3],
            a10 = a[4],
            a11 = a[5],
            a12 = a[6],
            a13 = a[7];
            if (a !== out) {
                out[8] = a[8];
                out[9] = a[9];
                out[10] = a[10];
                out[11] = a[11];
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15]
            }
            out[0] = a00 * c + a10 * s;
            out[1] = a01 * c + a11 * s;
            out[2] = a02 * c + a12 * s;
            out[3] = a03 * c + a13 * s;
            out[4] = a10 * c - a00 * s;
            out[5] = a11 * c - a01 * s;
            out[6] = a12 * c - a02 * s;
            out[7] = a13 * c - a03 * s;
            return out
        };
        mat4.fromRotationTranslation = function(out, q, v) {
            var x = q[0],
            y = q[1],
            z = q[2],
            w = q[3],
            x2 = x + x,
            y2 = y + y,
            z2 = z + z,
            xx = x * x2,
            xy = x * y2,
            xz = x * z2,
            yy = y * y2,
            yz = y * z2,
            zz = z * z2,
            wx = w * x2,
            wy = w * y2,
            wz = w * z2;
            out[0] = 1 - (yy + zz);
            out[1] = xy + wz;
            out[2] = xz - wy;
            out[3] = 0;
            out[4] = xy - wz;
            out[5] = 1 - (xx + zz);
            out[6] = yz + wx;
            out[7] = 0;
            out[8] = xz + wy;
            out[9] = yz - wx;
            out[10] = 1 - (xx + yy);
            out[11] = 0;
            out[12] = v[0];
            out[13] = v[1];
            out[14] = v[2];
            out[15] = 1;
            return out
        };
        mat4.fromQuat = function(out, q) {
            var x = q[0],
            y = q[1],
            z = q[2],
            w = q[3],
            x2 = x + x,
            y2 = y + y,
            z2 = z + z,
            xx = x * x2,
            yx = y * x2,
            yy = y * y2,
            zx = z * x2,
            zy = z * y2,
            zz = z * z2,
            wx = w * x2,
            wy = w * y2,
            wz = w * z2;
            out[0] = 1 - yy - zz;
            out[1] = yx + wz;
            out[2] = zx - wy;
            out[3] = 0;
            out[4] = yx - wz;
            out[5] = 1 - xx - zz;
            out[6] = zy + wx;
            out[7] = 0;
            out[8] = zx + wy;
            out[9] = zy - wx;
            out[10] = 1 - xx - yy;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
            return out
        };
        mat4.frustum = function(out, left, right, bottom, top, near, far) {
            var rl = 1 / (right - left),
            tb = 1 / (top - bottom),
            nf = 1 / (near - far);
            out[0] = near * 2 * rl;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = near * 2 * tb;
            out[6] = 0;
            out[7] = 0;
            out[8] = (right + left) * rl;
            out[9] = (top + bottom) * tb;
            out[10] = (far + near) * nf;
            out[11] = -1;
            out[12] = 0;
            out[13] = 0;
            out[14] = far * near * 2 * nf;
            out[15] = 0;
            return out
        };
        mat4.perspective = function(out, fovy, aspect, near, far) {
            var f = 1 / Math.tan(fovy / 2),
            nf = 1 / (near - far);
            out[0] = f / aspect;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = f;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = (far + near) * nf;
            out[11] = -1;
            out[12] = 0;
            out[13] = 0;
            out[14] = 2 * far * near * nf;
            out[15] = 0;
            return out
        };
        mat4.ortho = function(out, left, right, bottom, top, near, far) {
            var lr = 1 / (left - right),
            bt = 1 / (bottom - top),
            nf = 1 / (near - far);
            out[0] = -2 * lr;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = -2 * bt;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 2 * nf;
            out[11] = 0;
            out[12] = (left + right) * lr;
            out[13] = (top + bottom) * bt;
            out[14] = (far + near) * nf;
            out[15] = 1;
            return out
        };
        mat4.lookAt = function(out, eye, center, up) {
            var x0, x1, x2, y0, y1, y2, z0, z1, z2, len, eyex = eye[0],
            eyey = eye[1],
            eyez = eye[2],
            upx = up[0],
            upy = up[1],
            upz = up[2],
            centerx = center[0],
            centery = center[1],
            centerz = center[2];
            if (Math.abs(eyex - centerx) < GLMAT_EPSILON && Math.abs(eyey - centery) < GLMAT_EPSILON && Math.abs(eyez - centerz) < GLMAT_EPSILON) {
                return mat4.identity(out)
            }
            z0 = eyex - centerx;
            z1 = eyey - centery;
            z2 = eyez - centerz;
            len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
            z0 *= len;
            z1 *= len;
            z2 *= len;
            x0 = upy * z2 - upz * z1;
            x1 = upz * z0 - upx * z2;
            x2 = upx * z1 - upy * z0;
            len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
            if (!len) {
                x0 = 0;
                x1 = 0;
                x2 = 0
            } else {
                len = 1 / len;
                x0 *= len;
                x1 *= len;
                x2 *= len
            }
            y0 = z1 * x2 - z2 * x1;
            y1 = z2 * x0 - z0 * x2;
            y2 = z0 * x1 - z1 * x0;
            len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
            if (!len) {
                y0 = 0;
                y1 = 0;
                y2 = 0
            } else {
                len = 1 / len;
                y0 *= len;
                y1 *= len;
                y2 *= len
            }
            out[0] = x0;
            out[1] = y0;
            out[2] = z0;
            out[3] = 0;
            out[4] = x1;
            out[5] = y1;
            out[6] = z1;
            out[7] = 0;
            out[8] = x2;
            out[9] = y2;
            out[10] = z2;
            out[11] = 0;
            out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
            out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
            out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
            out[15] = 1;
            return out
        };
        mat4.str = function(a) {
            return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")"
        };
        mat4.frob = function(a) {
            return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2))
        };
        if (typeof exports !== "undefined") {
            exports.mat4 = mat4
        }
        var quat = {};
        quat.create = function() {
            var out = new GLMAT_ARRAY_TYPE(4);
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out
        };
        quat.rotationTo = function() {
            var tmpvec3 = vec3.create();
            var xUnitVec3 = vec3.fromValues(1, 0, 0);
            var yUnitVec3 = vec3.fromValues(0, 1, 0);
            return function(out, a, b) {
                var dot = vec3.dot(a, b);
                if (dot < -.999999) {
                    vec3.cross(tmpvec3, xUnitVec3, a);
                    if (vec3.length(tmpvec3) < 1e-6) vec3.cross(tmpvec3, yUnitVec3, a);
                    vec3.normalize(tmpvec3, tmpvec3);
                    quat.setAxisAngle(out, tmpvec3, Math.PI);
                    return out
                } else if (dot > .999999) {
                    out[0] = 0;
                    out[1] = 0;
                    out[2] = 0;
                    out[3] = 1;
                    return out
                } else {
                    vec3.cross(tmpvec3, a, b);
                    out[0] = tmpvec3[0];
                    out[1] = tmpvec3[1];
                    out[2] = tmpvec3[2];
                    out[3] = 1 + dot;
                    return quat.normalize(out, out)
                }
            }
        } ();
        quat.setAxes = function() {
            var matr = mat3.create();
            return function(out, view, right, up) {
                matr[0] = right[0];
                matr[3] = right[1];
                matr[6] = right[2];
                matr[1] = up[0];
                matr[4] = up[1];
                matr[7] = up[2];
                matr[2] = -view[0];
                matr[5] = -view[1];
                matr[8] = -view[2];
                return quat.normalize(out, quat.fromMat3(out, matr))
            }
        } ();
        quat.clone = vec4.clone;
        quat.fromValues = vec4.fromValues;
        quat.copy = vec4.copy;
        quat.set = vec4.set;
        quat.identity = function(out) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out
        };
        quat.setAxisAngle = function(out, axis, rad) {
            rad = rad * .5;
            var s = Math.sin(rad);
            out[0] = s * axis[0];
            out[1] = s * axis[1];
            out[2] = s * axis[2];
            out[3] = Math.cos(rad);
            return out
        };
        quat.add = vec4.add;
        quat.multiply = function(out, a, b) {
            var ax = a[0],
            ay = a[1],
            az = a[2],
            aw = a[3],
            bx = b[0],
            by = b[1],
            bz = b[2],
            bw = b[3];
            out[0] = ax * bw + aw * bx + ay * bz - az * by;
            out[1] = ay * bw + aw * by + az * bx - ax * bz;
            out[2] = az * bw + aw * bz + ax * by - ay * bx;
            out[3] = aw * bw - ax * bx - ay * by - az * bz;
            return out
        };
        quat.mul = quat.multiply;
        quat.scale = vec4.scale;
        quat.rotateX = function(out, a, rad) {
            rad *= .5;
            var ax = a[0],
            ay = a[1],
            az = a[2],
            aw = a[3],
            bx = Math.sin(rad),
            bw = Math.cos(rad);
            out[0] = ax * bw + aw * bx;
            out[1] = ay * bw + az * bx;
            out[2] = az * bw - ay * bx;
            out[3] = aw * bw - ax * bx;
            return out
        };
        quat.rotateY = function(out, a, rad) {
            rad *= .5;
            var ax = a[0],
            ay = a[1],
            az = a[2],
            aw = a[3],
            by = Math.sin(rad),
            bw = Math.cos(rad);
            out[0] = ax * bw - az * by;
            out[1] = ay * bw + aw * by;
            out[2] = az * bw + ax * by;
            out[3] = aw * bw - ay * by;
            return out
        };
        quat.rotateZ = function(out, a, rad) {
            rad *= .5;
            var ax = a[0],
            ay = a[1],
            az = a[2],
            aw = a[3],
            bz = Math.sin(rad),
            bw = Math.cos(rad);
            out[0] = ax * bw + ay * bz;
            out[1] = ay * bw - ax * bz;
            out[2] = az * bw + aw * bz;
            out[3] = aw * bw - az * bz;
            return out
        };
        quat.calculateW = function(out, a) {
            var x = a[0],
            y = a[1],
            z = a[2];
            out[0] = x;
            out[1] = y;
            out[2] = z;
            out[3] = -Math.sqrt(Math.abs(1 - x * x - y * y - z * z));
            return out
        };
        quat.dot = vec4.dot;
        quat.lerp = vec4.lerp;
        quat.slerp = function(out, a, b, t) {
            var ax = a[0],
            ay = a[1],
            az = a[2],
            aw = a[3],
            bx = b[0],
            by = b[1],
            bz = b[2],
            bw = b[3];
            var omega, cosom, sinom, scale0, scale1;
            cosom = ax * bx + ay * by + az * bz + aw * bw;
            if (cosom < 0) {
                cosom = -cosom;
                bx = -bx;
                by = -by;
                bz = -bz;
                bw = -bw
            }
            if (1 - cosom > 1e-6) {
                omega = Math.acos(cosom);
                sinom = Math.sin(omega);
                scale0 = Math.sin((1 - t) * omega) / sinom;
                scale1 = Math.sin(t * omega) / sinom
            } else {
                scale0 = 1 - t;
                scale1 = t
            }
            out[0] = scale0 * ax + scale1 * bx;
            out[1] = scale0 * ay + scale1 * by;
            out[2] = scale0 * az + scale1 * bz;
            out[3] = scale0 * aw + scale1 * bw;
            return out
        };
        quat.invert = function(out, a) {
            var a0 = a[0],
            a1 = a[1],
            a2 = a[2],
            a3 = a[3],
            dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3,
            invDot = dot ? 1 / dot: 0;
            out[0] = -a0 * invDot;
            out[1] = -a1 * invDot;
            out[2] = -a2 * invDot;
            out[3] = a3 * invDot;
            return out
        };
        quat.conjugate = function(out, a) {
            out[0] = -a[0];
            out[1] = -a[1];
            out[2] = -a[2];
            out[3] = a[3];
            return out
        };
        quat.length = vec4.length;
        quat.len = quat.length;
        quat.squaredLength = vec4.squaredLength;
        quat.sqrLen = quat.squaredLength;
        quat.normalize = vec4.normalize;
        quat.fromMat3 = function(out, m) {
            var fTrace = m[0] + m[4] + m[8];
            var fRoot;
            if (fTrace > 0) {
                fRoot = Math.sqrt(fTrace + 1);
                out[3] = .5 * fRoot;
                fRoot = .5 / fRoot;
                out[0] = (m[7] - m[5]) * fRoot;
                out[1] = (m[2] - m[6]) * fRoot;
                out[2] = (m[3] - m[1]) * fRoot
            } else {
                var i = 0;
                if (m[4] > m[0]) i = 1;
                if (m[8] > m[i * 3 + i]) i = 2;
                var j = (i + 1) % 3;
                var k = (i + 2) % 3;
                fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1);
                out[i] = .5 * fRoot;
                fRoot = .5 / fRoot;
                out[3] = (m[k * 3 + j] - m[j * 3 + k]) * fRoot;
                out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
                out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot
            }
            return out
        };
        quat.str = function(a) {
            return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")"
        };
        if (typeof exports !== "undefined") {
            exports.quat = quat
        }
    })(shim.exports)
})(this); !
function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        var f;
        "undefined" != typeof window ? f = window: "undefined" != typeof global ? f = global: "undefined" != typeof self && (f = self),
        f.pako = e()
    }
} (function() {
    var define, module, exports;
    return function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;
                    if (!u && a) return a(o, !0);
                    if (i) return i(o, !0);
                    throw new Error("Cannot find module '" + o + "'")
                }
                var f = n[o] = {
                    exports: {}
                };
                t[o][0].call(f.exports,
                function(e) {
                    var n = t[o][1][e];
                    return s(n ? n: e)
                },
                f, f.exports, e, t, n, r)
            }
            return n[o].exports
        }
        var i = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++) s(r[o]);
        return s
    } ({
        1 : [function(_dereq_, module, exports) {
            "use strict";
            var zlib_inflate = _dereq_("./zlib/inflate.js");
            var utils = _dereq_("./utils/common");
            var strings = _dereq_("./utils/strings");
            var c = _dereq_("./zlib/constants");
            var msg = _dereq_("./zlib/messages");
            var zstream = _dereq_("./zlib/zstream");
            var gzheader = _dereq_("./zlib/gzheader");
            var Inflate = function(options) {
                this.options = utils.assign({
                    chunkSize: 16384,
                    windowBits: 0,
                    to: ""
                },
                options || {});
                var opt = this.options;
                if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
                    opt.windowBits = -opt.windowBits;
                    if (opt.windowBits === 0) {
                        opt.windowBits = -15
                    }
                }
                if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
                    opt.windowBits += 32
                }
                if (opt.windowBits > 15 && opt.windowBits < 48) {
                    if ((opt.windowBits & 15) === 0) {
                        opt.windowBits |= 15
                    }
                }
                this.err = 0;
                this.msg = "";
                this.ended = false;
                this.chunks = [];
                this.strm = new zstream;
                this.strm.avail_out = 0;
                var status = zlib_inflate.inflateInit2(this.strm, opt.windowBits);
                if (status !== c.Z_OK) {
                    throw new Error(msg[status])
                }
                this.header = new gzheader;
                zlib_inflate.inflateGetHeader(this.strm, this.header)
            };
            Inflate.prototype.push = function(data, mode) {
                var strm = this.strm;
                var chunkSize = this.options.chunkSize;
                var status, _mode;
                var next_out_utf8, tail, utf8str;
                if (this.ended) {
                    return false
                }
                _mode = mode === ~~mode ? mode: mode === true ? c.Z_FINISH: c.Z_NO_FLUSH;
                if (typeof data === "string") {
                    strm.input = strings.binstring2buf(data)
                } else {
                    strm.input = data
                }
                strm.next_in = 0;
                strm.avail_in = strm.input.length;
                do {
                    if (strm.avail_out === 0) {
                        strm.output = new utils.Buf8(chunkSize);
                        strm.next_out = 0;
                        strm.avail_out = chunkSize
                    }
                    status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);
                    if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
                        this.onEnd(status);
                        this.ended = true;
                        return false
                    }
                    if (strm.next_out) {
                        if (strm.avail_out === 0 || status === c.Z_STREAM_END || strm.avail_in === 0 && _mode === c.Z_FINISH) {
                            if (this.options.to === "string") {
                                next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
                                tail = strm.next_out - next_out_utf8;
                                utf8str = strings.buf2string(strm.output, next_out_utf8);
                                strm.next_out = tail;
                                strm.avail_out = chunkSize - tail;
                                if (tail) {
                                    utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0)
                                }
                                this.onData(utf8str)
                            } else {
                                this.onData(utils.shrinkBuf(strm.output, strm.next_out))
                            }
                        }
                    }
                } while ( strm . avail_in > 0 && status !== c . Z_STREAM_END );
                if (status === c.Z_STREAM_END) {
                    _mode = c.Z_FINISH
                }
                if (_mode === c.Z_FINISH) {
                    status = zlib_inflate.inflateEnd(this.strm);
                    this.onEnd(status);
                    this.ended = true;
                    return status === c.Z_OK
                }
                return true
            };
            Inflate.prototype.onData = function(chunk) {
                this.chunks.push(chunk)
            };
            Inflate.prototype.onEnd = function(status) {
                if (status === c.Z_OK) {
                    if (this.options.to === "string") {
                        this.result = this.chunks.join("")
                    } else {
                        this.result = utils.flattenChunks(this.chunks)
                    }
                }
                this.chunks = [];
                this.err = status;
                this.msg = this.strm.msg
            };
            function inflate(input, options) {
                var inflator = new Inflate(options);
                inflator.push(input, true);
                if (inflator.err) {
                    throw inflator.msg
                }
                return inflator.result
            }
            function inflateRaw(input, options) {
                options = options || {};
                options.raw = true;
                return inflate(input, options)
            }
            exports.Inflate = Inflate;
            exports.inflate = inflate;
            exports.inflateRaw = inflateRaw;
            exports.ungzip = inflate
        },
        {
            "./utils/common": 2,
            "./utils/strings": 3,
            "./zlib/constants": 5,
            "./zlib/gzheader": 7,
            "./zlib/inflate.js": 9,
            "./zlib/messages": 11,
            "./zlib/zstream": 12
        }],
        2 : [function(_dereq_, module, exports) {
            "use strict";
            var TYPED_OK = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Int32Array !== "undefined";
            exports.assign = function(obj) {
                var sources = Array.prototype.slice.call(arguments, 1);
                while (sources.length) {
                    var source = sources.shift();
                    if (!source) {
                        continue
                    }
                    if (typeof source !== "object") {
                        throw new TypeError(source + "must be non-object")
                    }
                    for (var p in source) {
                        if (source.hasOwnProperty(p)) {
                            obj[p] = source[p]
                        }
                    }
                }
                return obj
            };
            exports.shrinkBuf = function(buf, size) {
                if (buf.length === size) {
                    return buf
                }
                if (buf.subarray) {
                    return buf.subarray(0, size)
                }
                buf.length = size;
                return buf
            };
            var fnTyped = {
                arraySet: function(dest, src, src_offs, len, dest_offs) {
                    if (src.subarray && dest.subarray) {
                        dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
                        return
                    }
                    for (var i = 0; i < len; i++) {
                        dest[dest_offs + i] = src[src_offs + i]
                    }
                },
                flattenChunks: function(chunks) {
                    var i, l, len, pos, chunk, result;
                    len = 0;
                    for (i = 0, l = chunks.length; i < l; i++) {
                        len += chunks[i].length
                    }
                    result = new Uint8Array(len);
                    pos = 0;
                    for (i = 0, l = chunks.length; i < l; i++) {
                        chunk = chunks[i];
                        result.set(chunk, pos);
                        pos += chunk.length
                    }
                    return result
                }
            };
            var fnUntyped = {
                arraySet: function(dest, src, src_offs, len, dest_offs) {
                    for (var i = 0; i < len; i++) {
                        dest[dest_offs + i] = src[src_offs + i]
                    }
                },
                flattenChunks: function(chunks) {
                    return [].concat.apply([], chunks)
                }
            };
            exports.setTyped = function(on) {
                if (on) {
                    exports.Buf8 = Uint8Array;
                    exports.Buf16 = Uint16Array;
                    exports.Buf32 = Int32Array;
                    exports.assign(exports, fnTyped)
                } else {
                    exports.Buf8 = Array;
                    exports.Buf16 = Array;
                    exports.Buf32 = Array;
                    exports.assign(exports, fnUntyped)
                }
            };
            exports.setTyped(TYPED_OK)
        },
        {}],
        3 : [function(_dereq_, module, exports) {
            "use strict";
            var utils = _dereq_("./common");
            var STR_APPLY_OK = true;
            var STR_APPLY_UIA_OK = true;
            try {
                String.fromCharCode.apply(null, [0])
            } catch(__) {
                STR_APPLY_OK = false
            }
            try {
                String.fromCharCode.apply(null, new Uint8Array(1))
            } catch(__) {
                STR_APPLY_UIA_OK = false
            }
            var _utf8len = new utils.Buf8(256);
            for (var i = 0; i < 256; i++) {
                _utf8len[i] = i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1
            }
            _utf8len[254] = _utf8len[254] = 1;
            exports.string2buf = function(str) {
                var buf, c, c2, m_pos, i, str_len = str.length,
                buf_len = 0;
                for (m_pos = 0; m_pos < str_len; m_pos++) {
                    c = str.charCodeAt(m_pos);
                    if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
                        c2 = str.charCodeAt(m_pos + 1);
                        if ((c2 & 64512) === 56320) {
                            c = 65536 + (c - 55296 << 10) + (c2 - 56320);
                            m_pos++
                        }
                    }
                    buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4
                }
                buf = new utils.Buf8(buf_len);
                for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
                    c = str.charCodeAt(m_pos);
                    if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
                        c2 = str.charCodeAt(m_pos + 1);
                        if ((c2 & 64512) === 56320) {
                            c = 65536 + (c - 55296 << 10) + (c2 - 56320);
                            m_pos++
                        }
                    }
                    if (c < 128) {
                        buf[i++] = c
                    } else if (c < 2048) {
                        buf[i++] = 192 | c >>> 6;
                        buf[i++] = 128 | c & 63
                    } else if (c < 65536) {
                        buf[i++] = 224 | c >>> 12;
                        buf[i++] = 128 | c >>> 6 & 63;
                        buf[i++] = 128 | c & 63
                    } else {
                        buf[i++] = 240 | c >>> 18;
                        buf[i++] = 128 | c >>> 12 & 63;
                        buf[i++] = 128 | c >>> 6 & 63;
                        buf[i++] = 128 | c & 63
                    }
                }
                return buf
            };
            function buf2binstring(buf, len) {
                if (len < 65537) {
                    if (buf.subarray && STR_APPLY_UIA_OK || !buf.subarray && STR_APPLY_OK) {
                        return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len))
                    }
                }
                var result = "";
                for (var i = 0; i < len; i++) {
                    result += String.fromCharCode(buf[i])
                }
                return result
            }
            exports.buf2binstring = function(buf) {
                return buf2binstring(buf, buf.length)
            };
            exports.binstring2buf = function(str) {
                var buf = new utils.Buf8(str.length);
                for (var i = 0,
                len = buf.length; i < len; i++) {
                    buf[i] = str.charCodeAt(i)
                }
                return buf
            };
            exports.buf2string = function(buf, max) {
                var i, out, c, c_len;
                var len = max || buf.length;
                var utf16buf = new Array(len * 2);
                for (out = 0, i = 0; i < len;) {
                    c = buf[i++];
                    if (c < 128) {
                        utf16buf[out++] = c;
                        continue
                    }
                    c_len = _utf8len[c];
                    if (c_len > 4) {
                        utf16buf[out++] = 65533;
                        i += c_len - 1;
                        continue
                    }
                    c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
                    while (c_len > 1 && i < len) {
                        c = c << 6 | buf[i++] & 63;
                        c_len--
                    }
                    if (c_len > 1) {
                        utf16buf[out++] = 65533;
                        continue
                    }
                    if (c < 65536) {
                        utf16buf[out++] = c
                    } else {
                        c -= 65536;
                        utf16buf[out++] = 55296 | c >> 10 & 1023;
                        utf16buf[out++] = 56320 | c & 1023
                    }
                }
                return buf2binstring(utf16buf, out)
            };
            exports.utf8border = function(buf, max) {
                var pos;
                max = max || buf.length;
                if (max > buf.length) {
                    max = buf.length
                }
                pos = max - 1;
                while (pos >= 0 && (buf[pos] & 192) === 128) {
                    pos--
                }
                if (pos < 0) {
                    return max
                }
                if (pos === 0) {
                    return max
                }
                return pos + _utf8len[buf[pos]] > max ? pos: max
            }
        },
        {
            "./common": 2
        }],
        4 : [function(_dereq_, module, exports) {
            "use strict";
            function adler32(adler, buf, len, pos) {
                var s1 = adler & 65535 | 0,
                s2 = adler >>> 16 & 65535 | 0,
                n = 0;
                while (len !== 0) {
                    n = len > 2e3 ? 2e3: len;
                    len -= n;
                    do {
                        s1 = s1 + buf[pos++] | 0;
                        s2 = s2 + s1 | 0
                    } while (-- n );
                    s1 %= 65521;
                    s2 %= 65521
                }
                return s1 | s2 << 16 | 0
            }
            module.exports = adler32
        },
        {}],
        5 : [function(_dereq_, module, exports) {
            module.exports = {
                Z_NO_FLUSH: 0,
                Z_PARTIAL_FLUSH: 1,
                Z_SYNC_FLUSH: 2,
                Z_FULL_FLUSH: 3,
                Z_FINISH: 4,
                Z_BLOCK: 5,
                Z_TREES: 6,
                Z_OK: 0,
                Z_STREAM_END: 1,
                Z_NEED_DICT: 2,
                Z_ERRNO: -1,
                Z_STREAM_ERROR: -2,
                Z_DATA_ERROR: -3,
                Z_BUF_ERROR: -5,
                Z_NO_COMPRESSION: 0,
                Z_BEST_SPEED: 1,
                Z_BEST_COMPRESSION: 9,
                Z_DEFAULT_COMPRESSION: -1,
                Z_FILTERED: 1,
                Z_HUFFMAN_ONLY: 2,
                Z_RLE: 3,
                Z_FIXED: 4,
                Z_DEFAULT_STRATEGY: 0,
                Z_BINARY: 0,
                Z_TEXT: 1,
                Z_UNKNOWN: 2,
                Z_DEFLATED: 8
            }
        },
        {}],
        6 : [function(_dereq_, module, exports) {
            "use strict";
            function makeTable() {
                var c, table = [];
                for (var n = 0; n < 256; n++) {
                    c = n;
                    for (var k = 0; k < 8; k++) {
                        c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1
                    }
                    table[n] = c
                }
                return table
            }
            var crcTable = makeTable();
            function crc32(crc, buf, len, pos) {
                var t = crcTable,
                end = pos + len;
                crc = crc ^ -1;
                for (var i = pos; i < end; i++) {
                    crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255]
                }
                return crc ^ -1
            }
            module.exports = crc32
        },
        {}],
        7 : [function(_dereq_, module, exports) {
            "use strict";
            function GZheader() {
                this.text = 0;
                this.time = 0;
                this.xflags = 0;
                this.os = 0;
                this.extra = null;
                this.extra_len = 0;
                this.name = "";
                this.comment = "";
                this.hcrc = 0;
                this.done = false
            }
            module.exports = GZheader
        },
        {}],
        8 : [function(_dereq_, module, exports) {
            "use strict";
            var BAD = 30;
            var TYPE = 12;
            module.exports = function inflate_fast(strm, start) {
                var state;
                var _in;
                var last;
                var _out;
                var beg;
                var end;
                var dmax;
                var wsize;
                var whave;
                var wnext;
                var window;
                var hold;
                var bits;
                var lcode;
                var dcode;
                var lmask;
                var dmask;
                var here;
                var op;
                var len;
                var dist;
                var from;
                var from_source;
                var input, output;
                state = strm.state;
                _in = strm.next_in;
                input = strm.input;
                last = _in + (strm.avail_in - 5);
                _out = strm.next_out;
                output = strm.output;
                beg = _out - (start - strm.avail_out);
                end = _out + (strm.avail_out - 257);
                dmax = state.dmax;
                wsize = state.wsize;
                whave = state.whave;
                wnext = state.wnext;
                window = state.window;
                hold = state.hold;
                bits = state.bits;
                lcode = state.lencode;
                dcode = state.distcode;
                lmask = (1 << state.lenbits) - 1;
                dmask = (1 << state.distbits) - 1;
                top: do {
                    if (bits < 15) {
                        hold += input[_in++] << bits;
                        bits += 8;
                        hold += input[_in++] << bits;
                        bits += 8
                    }
                    here = lcode[hold & lmask];
                    dolen: for (;;) {
                        op = here >>> 24;
                        hold >>>= op;
                        bits -= op;
                        op = here >>> 16 & 255;
                        if (op === 0) {
                            output[_out++] = here & 65535
                        } else if (op & 16) {
                            len = here & 65535;
                            op &= 15;
                            if (op) {
                                if (bits < op) {
                                    hold += input[_in++] << bits;
                                    bits += 8
                                }
                                len += hold & (1 << op) - 1;
                                hold >>>= op;
                                bits -= op
                            }
                            if (bits < 15) {
                                hold += input[_in++] << bits;
                                bits += 8;
                                hold += input[_in++] << bits;
                                bits += 8
                            }
                            here = dcode[hold & dmask];
                            dodist: for (;;) {
                                op = here >>> 24;
                                hold >>>= op;
                                bits -= op;
                                op = here >>> 16 & 255;
                                if (op & 16) {
                                    dist = here & 65535;
                                    op &= 15;
                                    if (bits < op) {
                                        hold += input[_in++] << bits;
                                        bits += 8;
                                        if (bits < op) {
                                            hold += input[_in++] << bits;
                                            bits += 8
                                        }
                                    }
                                    dist += hold & (1 << op) - 1;
                                    if (dist > dmax) {
                                        strm.msg = "invalid distance too far back";
                                        state.mode = BAD;
                                        break top
                                    }
                                    hold >>>= op;
                                    bits -= op;
                                    op = _out - beg;
                                    if (dist > op) {
                                        op = dist - op;
                                        if (op > whave) {
                                            if (state.sane) {
                                                strm.msg = "invalid distance too far back";
                                                state.mode = BAD;
                                                break top
                                            }
                                        }
                                        from = 0;
                                        from_source = window;
                                        if (wnext === 0) {
                                            from += wsize - op;
                                            if (op < len) {
                                                len -= op;
                                                do {
                                                    output[_out++] = window[from++]
                                                } while (-- op );
                                                from = _out - dist;
                                                from_source = output
                                            }
                                        } else if (wnext < op) {
                                            from += wsize + wnext - op;
                                            op -= wnext;
                                            if (op < len) {
                                                len -= op;
                                                do {
                                                    output[_out++] = window[from++]
                                                } while (-- op );
                                                from = 0;
                                                if (wnext < len) {
                                                    op = wnext;
                                                    len -= op;
                                                    do {
                                                        output[_out++] = window[from++]
                                                    } while (-- op );
                                                    from = _out - dist;
                                                    from_source = output
                                                }
                                            }
                                        } else {
                                            from += wnext - op;
                                            if (op < len) {
                                                len -= op;
                                                do {
                                                    output[_out++] = window[from++]
                                                } while (-- op );
                                                from = _out - dist;
                                                from_source = output
                                            }
                                        }
                                        while (len > 2) {
                                            output[_out++] = from_source[from++];
                                            output[_out++] = from_source[from++];
                                            output[_out++] = from_source[from++];
                                            len -= 3
                                        }
                                        if (len) {
                                            output[_out++] = from_source[from++];
                                            if (len > 1) {
                                                output[_out++] = from_source[from++]
                                            }
                                        }
                                    } else {
                                        from = _out - dist;
                                        do {
                                            output[_out++] = output[from++];
                                            output[_out++] = output[from++];
                                            output[_out++] = output[from++];
                                            len -= 3
                                        } while ( len > 2 );
                                        if (len) {
                                            output[_out++] = output[from++];
                                            if (len > 1) {
                                                output[_out++] = output[from++]
                                            }
                                        }
                                    }
                                } else if ((op & 64) === 0) {
                                    here = dcode[(here & 65535) + (hold & (1 << op) - 1)];
                                    continue dodist
                                } else {
                                    strm.msg = "invalid distance code";
                                    state.mode = BAD;
                                    break top
                                }
                                break
                            }
                        } else if ((op & 64) === 0) {
                            here = lcode[(here & 65535) + (hold & (1 << op) - 1)];
                            continue dolen
                        } else if (op & 32) {
                            state.mode = TYPE;
                            break top
                        } else {
                            strm.msg = "invalid literal/length code";
                            state.mode = BAD;
                            break top
                        }
                        break
                    }
                } while ( _in < last && _out < end );
                len = bits >> 3;
                _in -= len;
                bits -= len << 3;
                hold &= (1 << bits) - 1;
                strm.next_in = _in;
                strm.next_out = _out;
                strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
                strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
                state.hold = hold;
                state.bits = bits;
                return
            }
        },
        {}],
        9 : [function(_dereq_, module, exports) {
            "use strict";
            var utils = _dereq_("../utils/common");
            var adler32 = _dereq_("./adler32");
            var crc32 = _dereq_("./crc32");
            var inflate_fast = _dereq_("./inffast");
            var inflate_table = _dereq_("./inftrees");
            var CODES = 0;
            var LENS = 1;
            var DISTS = 2;
            var Z_FINISH = 4;
            var Z_BLOCK = 5;
            var Z_TREES = 6;
            var Z_OK = 0;
            var Z_STREAM_END = 1;
            var Z_NEED_DICT = 2;
            var Z_STREAM_ERROR = -2;
            var Z_DATA_ERROR = -3;
            var Z_MEM_ERROR = -4;
            var Z_BUF_ERROR = -5;
            var Z_DEFLATED = 8;
            var HEAD = 1;
            var FLAGS = 2;
            var TIME = 3;
            var OS = 4;
            var EXLEN = 5;
            var EXTRA = 6;
            var NAME = 7;
            var COMMENT = 8;
            var HCRC = 9;
            var DICTID = 10;
            var DICT = 11;
            var TYPE = 12;
            var TYPEDO = 13;
            var STORED = 14;
            var COPY_ = 15;
            var COPY = 16;
            var TABLE = 17;
            var LENLENS = 18;
            var CODELENS = 19;
            var LEN_ = 20;
            var LEN = 21;
            var LENEXT = 22;
            var DIST = 23;
            var DISTEXT = 24;
            var MATCH = 25;
            var LIT = 26;
            var CHECK = 27;
            var LENGTH = 28;
            var DONE = 29;
            var BAD = 30;
            var MEM = 31;
            var SYNC = 32;
            var ENOUGH_LENS = 852;
            var ENOUGH_DISTS = 592;
            var MAX_WBITS = 15;
            var DEF_WBITS = MAX_WBITS;
            function ZSWAP32(q) {
                return (q >>> 24 & 255) + (q >>> 8 & 65280) + ((q & 65280) << 8) + ((q & 255) << 24)
            }
            function InflateState() {
                this.mode = 0;
                this.last = false;
                this.wrap = 0;
                this.havedict = false;
                this.flags = 0;
                this.dmax = 0;
                this.check = 0;
                this.total = 0;
                this.head = null;
                this.wbits = 0;
                this.wsize = 0;
                this.whave = 0;
                this.wnext = 0;
                this.window = null;
                this.hold = 0;
                this.bits = 0;
                this.length = 0;
                this.offset = 0;
                this.extra = 0;
                this.lencode = null;
                this.distcode = null;
                this.lenbits = 0;
                this.distbits = 0;
                this.ncode = 0;
                this.nlen = 0;
                this.ndist = 0;
                this.have = 0;
                this.next = null;
                this.lens = new utils.Buf16(320);
                this.work = new utils.Buf16(288);
                this.lendyn = null;
                this.distdyn = null;
                this.sane = 0;
                this.back = 0;
                this.was = 0
            }
            function inflateResetKeep(strm) {
                var state;
                if (!strm || !strm.state) {
                    return Z_STREAM_ERROR
                }
                state = strm.state;
                strm.total_in = strm.total_out = state.total = 0;
                strm.msg = "";
                if (state.wrap) {
                    strm.adler = state.wrap & 1
                }
                state.mode = HEAD;
                state.last = 0;
                state.havedict = 0;
                state.dmax = 32768;
                state.head = null;
                state.hold = 0;
                state.bits = 0;
                state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
                state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);
                state.sane = 1;
                state.back = -1;
                return Z_OK
            }
            function inflateReset(strm) {
                var state;
                if (!strm || !strm.state) {
                    return Z_STREAM_ERROR
                }
                state = strm.state;
                state.wsize = 0;
                state.whave = 0;
                state.wnext = 0;
                return inflateResetKeep(strm)
            }
            function inflateReset2(strm, windowBits) {
                var wrap;
                var state;
                if (!strm || !strm.state) {
                    return Z_STREAM_ERROR
                }
                state = strm.state;
                if (windowBits < 0) {
                    wrap = 0;
                    windowBits = -windowBits
                } else {
                    wrap = (windowBits >> 4) + 1;
                    if (windowBits < 48) {
                        windowBits &= 15
                    }
                }
                if (windowBits && (windowBits < 8 || windowBits > 15)) {
                    return Z_STREAM_ERROR
                }
                if (state.window !== null && state.wbits !== windowBits) {
                    state.window = null
                }
                state.wrap = wrap;
                state.wbits = windowBits;
                return inflateReset(strm)
            }
            function inflateInit2(strm, windowBits) {
                var ret;
                var state;
                if (!strm) {
                    return Z_STREAM_ERROR
                }
                state = new InflateState;
                strm.state = state;
                state.window = null;
                ret = inflateReset2(strm, windowBits);
                if (ret !== Z_OK) {
                    strm.state = null
                }
                return ret
            }
            function inflateInit(strm) {
                return inflateInit2(strm, DEF_WBITS)
            }
            var virgin = true;
            var lenfix, distfix;
            function fixedtables(state) {
                if (virgin) {
                    var sym;
                    lenfix = new utils.Buf32(512);
                    distfix = new utils.Buf32(32);
                    sym = 0;
                    while (sym < 144) {
                        state.lens[sym++] = 8
                    }
                    while (sym < 256) {
                        state.lens[sym++] = 9
                    }
                    while (sym < 280) {
                        state.lens[sym++] = 7
                    }
                    while (sym < 288) {
                        state.lens[sym++] = 8
                    }
                    inflate_table(LENS, state.lens, 0, 288, lenfix, 0, state.work, {
                        bits: 9
                    });
                    sym = 0;
                    while (sym < 32) {
                        state.lens[sym++] = 5
                    }
                    inflate_table(DISTS, state.lens, 0, 32, distfix, 0, state.work, {
                        bits: 5
                    });
                    virgin = false
                }
                state.lencode = lenfix;
                state.lenbits = 9;
                state.distcode = distfix;
                state.distbits = 5
            }
            function updatewindow(strm, src, end, copy) {
                var dist;
                var state = strm.state;
                if (state.window === null) {
                    state.wsize = 1 << state.wbits;
                    state.wnext = 0;
                    state.whave = 0;
                    state.window = new utils.Buf8(state.wsize)
                }
                if (copy >= state.wsize) {
                    utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
                    state.wnext = 0;
                    state.whave = state.wsize
                } else {
                    dist = state.wsize - state.wnext;
                    if (dist > copy) {
                        dist = copy
                    }
                    utils.arraySet(state.window, src, end - copy, dist, state.wnext);
                    copy -= dist;
                    if (copy) {
                        utils.arraySet(state.window, src, end - copy, copy, 0);
                        state.wnext = copy;
                        state.whave = state.wsize
                    } else {
                        state.wnext += dist;
                        if (state.wnext === state.wsize) {
                            state.wnext = 0
                        }
                        if (state.whave < state.wsize) {
                            state.whave += dist
                        }
                    }
                }
                return 0
            }
            function inflate(strm, flush) {
                var state;
                var input, output;
                var next;
                var put;
                var have, left;
                var hold;
                var bits;
                var _in, _out;
                var copy;
                var from;
                var from_source;
                var here = 0;
                var here_bits, here_op, here_val;
                var last_bits, last_op, last_val;
                var len;
                var ret;
                var hbuf = new utils.Buf8(4);
                var opts;
                var n;
                var order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
                if (!strm || !strm.state || !strm.output || !strm.input && strm.avail_in !== 0) {
                    return Z_STREAM_ERROR
                }
                state = strm.state;
                if (state.mode === TYPE) {
                    state.mode = TYPEDO
                }
                put = strm.next_out;
                output = strm.output;
                left = strm.avail_out;
                next = strm.next_in;
                input = strm.input;
                have = strm.avail_in;
                hold = state.hold;
                bits = state.bits;
                _in = have;
                _out = left;
                ret = Z_OK;
                inf_leave: for (;;) {
                    switch (state.mode) {
                    case HEAD:
                        if (state.wrap === 0) {
                            state.mode = TYPEDO;
                            break
                        }
                        while (bits < 16) {
                            if (have === 0) {
                                break inf_leave
                            }
                            have--;
                            hold += input[next++] << bits;
                            bits += 8
                        }
                        if (state.wrap & 2 && hold === 35615) {
                            state.check = 0;
                            hbuf[0] = hold & 255;
                            hbuf[1] = hold >>> 8 & 255;
                            state.check = crc32(state.check, hbuf, 2, 0);
                            hold = 0;
                            bits = 0;
                            state.mode = FLAGS;
                            break
                        }
                        state.flags = 0;
                        if (state.head) {
                            state.head.done = false
                        }
                        if (! (state.wrap & 1) || (((hold & 255) << 8) + (hold >> 8)) % 31) {
                            strm.msg = "incorrect header check";
                            state.mode = BAD;
                            break
                        }
                        if ((hold & 15) !== Z_DEFLATED) {
                            strm.msg = "unknown compression method";
                            state.mode = BAD;
                            break
                        }
                        hold >>>= 4;
                        bits -= 4;
                        len = (hold & 15) + 8;
                        if (state.wbits === 0) {
                            state.wbits = len
                        } else if (len > state.wbits) {
                            strm.msg = "invalid window size";
                            state.mode = BAD;
                            break
                        }
                        state.dmax = 1 << len;
                        strm.adler = state.check = 1;
                        state.mode = hold & 512 ? DICTID: TYPE;
                        hold = 0;
                        bits = 0;
                        break;
                    case FLAGS:
                        while (bits < 16) {
                            if (have === 0) {
                                break inf_leave
                            }
                            have--;
                            hold += input[next++] << bits;
                            bits += 8
                        }
                        state.flags = hold;
                        if ((state.flags & 255) !== Z_DEFLATED) {
                            strm.msg = "unknown compression method";
                            state.mode = BAD;
                            break
                        }
                        if (state.flags & 57344) {
                            strm.msg = "unknown header flags set";
                            state.mode = BAD;
                            break
                        }
                        if (state.head) {
                            state.head.text = hold >> 8 & 1
                        }
                        if (state.flags & 512) {
                            hbuf[0] = hold & 255;
                            hbuf[1] = hold >>> 8 & 255;
                            state.check = crc32(state.check, hbuf, 2, 0)
                        }
                        hold = 0;
                        bits = 0;
                        state.mode = TIME;
                    case TIME:
                        while (bits < 32) {
                            if (have === 0) {
                                break inf_leave
                            }
                            have--;
                            hold += input[next++] << bits;
                            bits += 8
                        }
                        if (state.head) {
                            state.head.time = hold
                        }
                        if (state.flags & 512) {
                            hbuf[0] = hold & 255;
                            hbuf[1] = hold >>> 8 & 255;
                            hbuf[2] = hold >>> 16 & 255;
                            hbuf[3] = hold >>> 24 & 255;
                            state.check = crc32(state.check, hbuf, 4, 0)
                        }
                        hold = 0;
                        bits = 0;
                        state.mode = OS;
                    case OS:
                        while (bits < 16) {
                            if (have === 0) {
                                break inf_leave
                            }
                            have--;
                            hold += input[next++] << bits;
                            bits += 8
                        }
                        if (state.head) {
                            state.head.xflags = hold & 255;
                            state.head.os = hold >> 8
                        }
                        if (state.flags & 512) {
                            hbuf[0] = hold & 255;
                            hbuf[1] = hold >>> 8 & 255;
                            state.check = crc32(state.check, hbuf, 2, 0)
                        }
                        hold = 0;
                        bits = 0;
                        state.mode = EXLEN;
                    case EXLEN:
                        if (state.flags & 1024) {
                            while (bits < 16) {
                                if (have === 0) {
                                    break inf_leave
                                }
                                have--;
                                hold += input[next++] << bits;
                                bits += 8
                            }
                            state.length = hold;
                            if (state.head) {
                                state.head.extra_len = hold
                            }
                            if (state.flags & 512) {
                                hbuf[0] = hold & 255;
                                hbuf[1] = hold >>> 8 & 255;
                                state.check = crc32(state.check, hbuf, 2, 0)
                            }
                            hold = 0;
                            bits = 0
                        } else if (state.head) {
                            state.head.extra = null
                        }
                        state.mode = EXTRA;
                    case EXTRA:
                        if (state.flags & 1024) {
                            copy = state.length;
                            if (copy > have) {
                                copy = have
                            }
                            if (copy) {
                                if (state.head) {
                                    len = state.head.extra_len - state.length;
                                    if (!state.head.extra) {
                                        state.head.extra = new Array(state.head.extra_len)
                                    }
                                    utils.arraySet(state.head.extra, input, next, copy, len)
                                }
                                if (state.flags & 512) {
                                    state.check = crc32(state.check, input, copy, next)
                                }
                                have -= copy;
                                next += copy;
                                state.length -= copy
                            }
                            if (state.length) {
                                break inf_leave
                            }
                        }
                        state.length = 0;
                        state.mode = NAME;
                    case NAME:
                        if (state.flags & 2048) {
                            if (have === 0) {
                                break inf_leave
                            }
                            copy = 0;
                            do {
                                len = input[next + copy++];
                                if (state.head && len && state.length < 65536) {
                                    state.head.name += String.fromCharCode(len)
                                }
                            } while ( len && copy < have );
                            if (state.flags & 512) {
                                state.check = crc32(state.check, input, copy, next)
                            }
                            have -= copy;
                            next += copy;
                            if (len) {
                                break inf_leave
                            }
                        } else if (state.head) {
                            state.head.name = null
                        }
                        state.length = 0;
                        state.mode = COMMENT;
                    case COMMENT:
                        if (state.flags & 4096) {
                            if (have === 0) {
                                break inf_leave
                            }
                            copy = 0;
                            do {
                                len = input[next + copy++];
                                if (state.head && len && state.length < 65536) {
                                    state.head.comment += String.fromCharCode(len)
                                }
                            } while ( len && copy < have );
                            if (state.flags & 512) {
                                state.check = crc32(state.check, input, copy, next)
                            }
                            have -= copy;
                            next += copy;
                            if (len) {
                                break inf_leave
                            }
                        } else if (state.head) {
                            state.head.comment = null
                        }
                        state.mode = HCRC;
                    case HCRC:
                        if (state.flags & 512) {
                            while (bits < 16) {
                                if (have === 0) {
                                    break inf_leave
                                }
                                have--;
                                hold += input[next++] << bits;
                                bits += 8
                            }
                            if (hold !== (state.check & 65535)) {
                                strm.msg = "header crc mismatch";
                                state.mode = BAD;
                                break
                            }
                            hold = 0;
                            bits = 0
                        }
                        if (state.head) {
                            state.head.hcrc = state.flags >> 9 & 1;
                            state.head.done = true
                        }
                        strm.adler = state.check = 0;
                        state.mode = TYPE;
                        break;
                    case DICTID:
                        while (bits < 32) {
                            if (have === 0) {
                                break inf_leave
                            }
                            have--;
                            hold += input[next++] << bits;
                            bits += 8
                        }
                        strm.adler = state.check = ZSWAP32(hold);
                        hold = 0;
                        bits = 0;
                        state.mode = DICT;
                    case DICT:
                        if (state.havedict === 0) {
                            strm.next_out = put;
                            strm.avail_out = left;
                            strm.next_in = next;
                            strm.avail_in = have;
                            state.hold = hold;
                            state.bits = bits;
                            return Z_NEED_DICT
                        }
                        strm.adler = state.check = 1;
                        state.mode = TYPE;
                    case TYPE:
                        if (flush === Z_BLOCK || flush === Z_TREES) {
                            break inf_leave
                        }
                    case TYPEDO:
                        if (state.last) {
                            hold >>>= bits & 7;
                            bits -= bits & 7;
                            state.mode = CHECK;
                            break
                        }
                        while (bits < 3) {
                            if (have === 0) {
                                break inf_leave
                            }
                            have--;
                            hold += input[next++] << bits;
                            bits += 8
                        }
                        state.last = hold & 1;
                        hold >>>= 1;
                        bits -= 1;
                        switch (hold & 3) {
                        case 0:
                            state.mode = STORED;
                            break;
                        case 1:
                            fixedtables(state);
                            state.mode = LEN_;
                            if (flush === Z_TREES) {
                                hold >>>= 2;
                                bits -= 2;
                                break inf_leave
                            }
                            break;
                        case 2:
                            state.mode = TABLE;
                            break;
                        case 3:
                            strm.msg = "invalid block type";
                            state.mode = BAD
                        }
                        hold >>>= 2;
                        bits -= 2;
                        break;
                    case STORED:
                        hold >>>= bits & 7;
                        bits -= bits & 7;
                        while (bits < 32) {
                            if (have === 0) {
                                break inf_leave
                            }
                            have--;
                            hold += input[next++] << bits;
                            bits += 8
                        }
                        if ((hold & 65535) !== (hold >>> 16 ^ 65535)) {
                            strm.msg = "invalid stored block lengths";
                            state.mode = BAD;
                            break
                        }
                        state.length = hold & 65535;
                        hold = 0;
                        bits = 0;
                        state.mode = COPY_;
                        if (flush === Z_TREES) {
                            break inf_leave
                        }
                    case COPY_:
                        state.mode = COPY;
                    case COPY:
                        copy = state.length;
                        if (copy) {
                            if (copy > have) {
                                copy = have
                            }
                            if (copy > left) {
                                copy = left
                            }
                            if (copy === 0) {
                                break inf_leave
                            }
                            utils.arraySet(output, input, next, copy, put);
                            have -= copy;
                            next += copy;
                            left -= copy;
                            put += copy;
                            state.length -= copy;
                            break
                        }
                        state.mode = TYPE;
                        break;
                    case TABLE:
                        while (bits < 14) {
                            if (have === 0) {
                                break inf_leave
                            }
                            have--;
                            hold += input[next++] << bits;
                            bits += 8
                        }
                        state.nlen = (hold & 31) + 257;
                        hold >>>= 5;
                        bits -= 5;
                        state.ndist = (hold & 31) + 1;
                        hold >>>= 5;
                        bits -= 5;
                        state.ncode = (hold & 15) + 4;
                        hold >>>= 4;
                        bits -= 4;
                        if (state.nlen > 286 || state.ndist > 30) {
                            strm.msg = "too many length or distance symbols";
                            state.mode = BAD;
                            break
                        }
                        state.have = 0;
                        state.mode = LENLENS;
                    case LENLENS:
                        while (state.have < state.ncode) {
                            while (bits < 3) {
                                if (have === 0) {
                                    break inf_leave
                                }
                                have--;
                                hold += input[next++] << bits;
                                bits += 8
                            }
                            state.lens[order[state.have++]] = hold & 7;
                            hold >>>= 3;
                            bits -= 3
                        }
                        while (state.have < 19) {
                            state.lens[order[state.have++]] = 0
                        }
                        state.lencode = state.lendyn;
                        state.lenbits = 7;
                        opts = {
                            bits: state.lenbits
                        };
                        ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
                        state.lenbits = opts.bits;
                        if (ret) {
                            strm.msg = "invalid code lengths set";
                            state.mode = BAD;
                            break
                        }
                        state.have = 0;
                        state.mode = CODELENS;
                    case CODELENS:
                        while (state.have < state.nlen + state.ndist) {
                            for (;;) {
                                here = state.lencode[hold & (1 << state.lenbits) - 1];
                                here_bits = here >>> 24;
                                here_op = here >>> 16 & 255;
                                here_val = here & 65535;
                                if (here_bits <= bits) {
                                    break
                                }
                                if (have === 0) {
                                    break inf_leave
                                }
                                have--;
                                hold += input[next++] << bits;
                                bits += 8
                            }
                            if (here_val < 16) {
                                hold >>>= here_bits;
                                bits -= here_bits;
                                state.lens[state.have++] = here_val
                            } else {
                                if (here_val === 16) {
                                    n = here_bits + 2;
                                    while (bits < n) {
                                        if (have === 0) {
                                            break inf_leave
                                        }
                                        have--;
                                        hold += input[next++] << bits;
                                        bits += 8
                                    }
                                    hold >>>= here_bits;
                                    bits -= here_bits;
                                    if (state.have === 0) {
                                        strm.msg = "invalid bit length repeat";
                                        state.mode = BAD;
                                        break
                                    }
                                    len = state.lens[state.have - 1];
                                    copy = 3 + (hold & 3);
                                    hold >>>= 2;
                                    bits -= 2
                                } else if (here_val === 17) {
                                    n = here_bits + 3;
                                    while (bits < n) {
                                        if (have === 0) {
                                            break inf_leave
                                        }
                                        have--;
                                        hold += input[next++] << bits;
                                        bits += 8
                                    }
                                    hold >>>= here_bits;
                                    bits -= here_bits;
                                    len = 0;
                                    copy = 3 + (hold & 7);
                                    hold >>>= 3;
                                    bits -= 3
                                } else {
                                    n = here_bits + 7;
                                    while (bits < n) {
                                        if (have === 0) {
                                            break inf_leave
                                        }
                                        have--;
                                        hold += input[next++] << bits;
                                        bits += 8
                                    }
                                    hold >>>= here_bits;
                                    bits -= here_bits;
                                    len = 0;
                                    copy = 11 + (hold & 127);
                                    hold >>>= 7;
                                    bits -= 7
                                }
                                if (state.have + copy > state.nlen + state.ndist) {
                                    strm.msg = "invalid bit length repeat";
                                    state.mode = BAD;
                                    break
                                }
                                while (copy--) {
                                    state.lens[state.have++] = len
                                }
                            }
                        }
                        if (state.mode === BAD) {
                            break
                        }
                        if (state.lens[256] === 0) {
                            strm.msg = "invalid code -- missing end-of-block";
                            state.mode = BAD;
                            break
                        }
                        state.lenbits = 9;
                        opts = {
                            bits: state.lenbits
                        };
                        ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
                        state.lenbits = opts.bits;
                        if (ret) {
                            strm.msg = "invalid literal/lengths set";
                            state.mode = BAD;
                            break
                        }
                        state.distbits = 6;
                        state.distcode = state.distdyn;
                        opts = {
                            bits: state.distbits
                        };
                        ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
                        state.distbits = opts.bits;
                        if (ret) {
                            strm.msg = "invalid distances set";
                            state.mode = BAD;
                            break
                        }
                        state.mode = LEN_;
                        if (flush === Z_TREES) {
                            break inf_leave
                        }
                    case LEN_:
                        state.mode = LEN;
                    case LEN:
                        if (have >= 6 && left >= 258) {
                            strm.next_out = put;
                            strm.avail_out = left;
                            strm.next_in = next;
                            strm.avail_in = have;
                            state.hold = hold;
                            state.bits = bits;
                            inflate_fast(strm, _out);
                            put = strm.next_out;
                            output = strm.output;
                            left = strm.avail_out;
                            next = strm.next_in;
                            input = strm.input;
                            have = strm.avail_in;
                            hold = state.hold;
                            bits = state.bits;
                            if (state.mode === TYPE) {
                                state.back = -1
                            }
                            break
                        }
                        state.back = 0;
                        for (;;) {
                            here = state.lencode[hold & (1 << state.lenbits) - 1];
                            here_bits = here >>> 24;
                            here_op = here >>> 16 & 255;
                            here_val = here & 65535;
                            if (here_bits <= bits) {
                                break
                            }
                            if (have === 0) {
                                break inf_leave
                            }
                            have--;
                            hold += input[next++] << bits;
                            bits += 8
                        }
                        if (here_op && (here_op & 240) === 0) {
                            last_bits = here_bits;
                            last_op = here_op;
                            last_val = here_val;
                            for (;;) {
                                here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                                here_bits = here >>> 24;
                                here_op = here >>> 16 & 255;
                                here_val = here & 65535;
                                if (last_bits + here_bits <= bits) {
                                    break
                                }
                                if (have === 0) {
                                    break inf_leave
                                }
                                have--;
                                hold += input[next++] << bits;
                                bits += 8
                            }
                            hold >>>= last_bits;
                            bits -= last_bits;
                            state.back += last_bits
                        }
                        hold >>>= here_bits;
                        bits -= here_bits;
                        state.back += here_bits;
                        state.length = here_val;
                        if (here_op === 0) {
                            state.mode = LIT;
                            break
                        }
                        if (here_op & 32) {
                            state.back = -1;
                            state.mode = TYPE;
                            break
                        }
                        if (here_op & 64) {
                            strm.msg = "invalid literal/length code";
                            state.mode = BAD;
                            break
                        }
                        state.extra = here_op & 15;
                        state.mode = LENEXT;
                    case LENEXT:
                        if (state.extra) {
                            n = state.extra;
                            while (bits < n) {
                                if (have === 0) {
                                    break inf_leave
                                }
                                have--;
                                hold += input[next++] << bits;
                                bits += 8
                            }
                            state.length += hold & (1 << state.extra) - 1;
                            hold >>>= state.extra;
                            bits -= state.extra;
                            state.back += state.extra
                        }
                        state.was = state.length;
                        state.mode = DIST;
                    case DIST:
                        for (;;) {
                            here = state.distcode[hold & (1 << state.distbits) - 1];
                            here_bits = here >>> 24;
                            here_op = here >>> 16 & 255;
                            here_val = here & 65535;
                            if (here_bits <= bits) {
                                break
                            }
                            if (have === 0) {
                                break inf_leave
                            }
                            have--;
                            hold += input[next++] << bits;
                            bits += 8
                        }
                        if ((here_op & 240) === 0) {
                            last_bits = here_bits;
                            last_op = here_op;
                            last_val = here_val;
                            for (;;) {
                                here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                                here_bits = here >>> 24;
                                here_op = here >>> 16 & 255;
                                here_val = here & 65535;
                                if (last_bits + here_bits <= bits) {
                                    break
                                }
                                if (have === 0) {
                                    break inf_leave
                                }
                                have--;
                                hold += input[next++] << bits;
                                bits += 8
                            }
                            hold >>>= last_bits;
                            bits -= last_bits;
                            state.back += last_bits
                        }
                        hold >>>= here_bits;
                        bits -= here_bits;
                        state.back += here_bits;
                        if (here_op & 64) {
                            strm.msg = "invalid distance code";
                            state.mode = BAD;
                            break
                        }
                        state.offset = here_val;
                        state.extra = here_op & 15;
                        state.mode = DISTEXT;
                    case DISTEXT:
                        if (state.extra) {
                            n = state.extra;
                            while (bits < n) {
                                if (have === 0) {
                                    break inf_leave
                                }
                                have--;
                                hold += input[next++] << bits;
                                bits += 8
                            }
                            state.offset += hold & (1 << state.extra) - 1;
                            hold >>>= state.extra;
                            bits -= state.extra;
                            state.back += state.extra
                        }
                        if (state.offset > state.dmax) {
                            strm.msg = "invalid distance too far back";
                            state.mode = BAD;
                            break
                        }
                        state.mode = MATCH;
                    case MATCH:
                        if (left === 0) {
                            break inf_leave
                        }
                        copy = _out - left;
                        if (state.offset > copy) {
                            copy = state.offset - copy;
                            if (copy > state.whave) {
                                if (state.sane) {
                                    strm.msg = "invalid distance too far back";
                                    state.mode = BAD;
                                    break
                                }
                            }
                            if (copy > state.wnext) {
                                copy -= state.wnext;
                                from = state.wsize - copy
                            } else {
                                from = state.wnext - copy
                            }
                            if (copy > state.length) {
                                copy = state.length
                            }
                            from_source = state.window
                        } else {
                            from_source = output;
                            from = put - state.offset;
                            copy = state.length
                        }
                        if (copy > left) {
                            copy = left
                        }
                        left -= copy;
                        state.length -= copy;
                        do {
                            output[put++] = from_source[from++]
                        } while (-- copy );
                        if (state.length === 0) {
                            state.mode = LEN
                        }
                        break;
                    case LIT:
                        if (left === 0) {
                            break inf_leave
                        }
                        output[put++] = state.length;
                        left--;
                        state.mode = LEN;
                        break;
                    case CHECK:
                        if (state.wrap) {
                            while (bits < 32) {
                                if (have === 0) {
                                    break inf_leave
                                }
                                have--;
                                hold |= input[next++] << bits;
                                bits += 8
                            }
                            _out -= left;
                            strm.total_out += _out;
                            state.total += _out;
                            if (_out) {
                                strm.adler = state.check = state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out)
                            }
                            _out = left;
                            if ((state.flags ? hold: ZSWAP32(hold)) !== state.check) {
                                strm.msg = "incorrect data check";
                                state.mode = BAD;
                                break
                            }
                            hold = 0;
                            bits = 0
                        }
                        state.mode = LENGTH;
                    case LENGTH:
                        if (state.wrap && state.flags) {
                            while (bits < 32) {
                                if (have === 0) {
                                    break inf_leave
                                }
                                have--;
                                hold += input[next++] << bits;
                                bits += 8
                            }
                            if (hold !== (state.total & 4294967295)) {
                                strm.msg = "incorrect length check";
                                state.mode = BAD;
                                break
                            }
                            hold = 0;
                            bits = 0
                        }
                        state.mode = DONE;
                    case DONE:
                        ret = Z_STREAM_END;
                        break inf_leave;
                    case BAD:
                        ret = Z_DATA_ERROR;
                        break inf_leave;
                    case MEM:
                        return Z_MEM_ERROR;
                    case SYNC:
                    default:
                        return Z_STREAM_ERROR
                    }
                }
                strm.next_out = put;
                strm.avail_out = left;
                strm.next_in = next;
                strm.avail_in = have;
                state.hold = hold;
                state.bits = bits;
                if (state.wsize || _out !== strm.avail_out && state.mode < BAD && (state.mode < CHECK || flush !== Z_FINISH)) {
                    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
                        state.mode = MEM;
                        return Z_MEM_ERROR
                    }
                }
                _in -= strm.avail_in;
                _out -= strm.avail_out;
                strm.total_in += _in;
                strm.total_out += _out;
                state.total += _out;
                if (state.wrap && _out) {
                    strm.adler = state.check = state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out)
                }
                strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
                if ((_in === 0 && _out === 0 || flush === Z_FINISH) && ret === Z_OK) {
                    ret = Z_BUF_ERROR
                }
                return ret
            }
            function inflateEnd(strm) {
                if (!strm || !strm.state) {
                    return Z_STREAM_ERROR
                }
                var state = strm.state;
                if (state.window) {
                    state.window = null
                }
                strm.state = null;
                return Z_OK
            }
            function inflateGetHeader(strm, head) {
                var state;
                if (!strm || !strm.state) {
                    return Z_STREAM_ERROR
                }
                state = strm.state;
                if ((state.wrap & 2) === 0) {
                    return Z_STREAM_ERROR
                }
                state.head = head;
                head.done = false;
                return Z_OK
            }
            exports.inflateReset = inflateReset;
            exports.inflateReset2 = inflateReset2;
            exports.inflateResetKeep = inflateResetKeep;
            exports.inflateInit = inflateInit;
            exports.inflateInit2 = inflateInit2;
            exports.inflate = inflate;
            exports.inflateEnd = inflateEnd;
            exports.inflateGetHeader = inflateGetHeader;
            exports.inflateInfo = "pako inflate (from Nodeca project)"
        },
        {
            "../utils/common": 2,
            "./adler32": 4,
            "./crc32": 6,
            "./inffast": 8,
            "./inftrees": 10
        }],
        10 : [function(_dereq_, module, exports) {
            "use strict";
            var utils = _dereq_("../utils/common");
            var MAXBITS = 15;
            var ENOUGH_LENS = 852;
            var ENOUGH_DISTS = 592;
            var CODES = 0;
            var LENS = 1;
            var DISTS = 2;
            var lbase = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0];
            var lext = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78];
            var dbase = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0];
            var dext = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
            module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts) {
                var bits = opts.bits;
                var len = 0;
                var sym = 0;
                var min = 0,
                max = 0;
                var root = 0;
                var curr = 0;
                var drop = 0;
                var left = 0;
                var used = 0;
                var huff = 0;
                var incr;
                var fill;
                var low;
                var mask;
                var next;
                var base = null;
                var base_index = 0;
                var end;
                var count = new utils.Buf16(MAXBITS + 1);
                var offs = new utils.Buf16(MAXBITS + 1);
                var extra = null;
                var extra_index = 0;
                var here_bits, here_op, here_val;
                for (len = 0; len <= MAXBITS; len++) {
                    count[len] = 0
                }
                for (sym = 0; sym < codes; sym++) {
                    count[lens[lens_index + sym]]++
                }
                root = bits;
                for (max = MAXBITS; max >= 1; max--) {
                    if (count[max] !== 0) {
                        break
                    }
                }
                if (root > max) {
                    root = max
                }
                if (max === 0) {
                    table[table_index++] = 1 << 24 | 64 << 16 | 0;
                    table[table_index++] = 1 << 24 | 64 << 16 | 0;
                    opts.bits = 1;
                    return 0
                }
                for (min = 1; min < max; min++) {
                    if (count[min] !== 0) {
                        break
                    }
                }
                if (root < min) {
                    root = min
                }
                left = 1;
                for (len = 1; len <= MAXBITS; len++) {
                    left <<= 1;
                    left -= count[len];
                    if (left < 0) {
                        return - 1
                    }
                }
                if (left > 0 && (type === CODES || max !== 1)) {
                    return - 1
                }
                offs[1] = 0;
                for (len = 1; len < MAXBITS; len++) {
                    offs[len + 1] = offs[len] + count[len]
                }
                for (sym = 0; sym < codes; sym++) {
                    if (lens[lens_index + sym] !== 0) {
                        work[offs[lens[lens_index + sym]]++] = sym
                    }
                }
                if (type === CODES) {
                    base = extra = work;
                    end = 19
                } else if (type === LENS) {
                    base = lbase;
                    base_index -= 257;
                    extra = lext;
                    extra_index -= 257;
                    end = 256
                } else {
                    base = dbase;
                    extra = dext;
                    end = -1
                }
                huff = 0;
                sym = 0;
                len = min;
                next = table_index;
                curr = root;
                drop = 0;
                low = -1;
                used = 1 << root;
                mask = used - 1;
                if (type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS) {
                    return 1
                }
                var i = 0;
                for (;;) {
                    i++;
                    here_bits = len - drop;
                    if (work[sym] < end) {
                        here_op = 0;
                        here_val = work[sym]
                    } else if (work[sym] > end) {
                        here_op = extra[extra_index + work[sym]];
                        here_val = base[base_index + work[sym]]
                    } else {
                        here_op = 32 + 64;
                        here_val = 0
                    }
                    incr = 1 << len - drop;
                    fill = 1 << curr;
                    min = fill;
                    do {
                        fill -= incr;
                        table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0
                    } while ( fill !== 0 );
                    incr = 1 << len - 1;
                    while (huff & incr) {
                        incr >>= 1
                    }
                    if (incr !== 0) {
                        huff &= incr - 1;
                        huff += incr
                    } else {
                        huff = 0
                    }
                    sym++;
                    if (--count[len] === 0) {
                        if (len === max) {
                            break
                        }
                        len = lens[lens_index + work[sym]]
                    }
                    if (len > root && (huff & mask) !== low) {
                        if (drop === 0) {
                            drop = root
                        }
                        next += min;
                        curr = len - drop;
                        left = 1 << curr;
                        while (curr + drop < max) {
                            left -= count[curr + drop];
                            if (left <= 0) {
                                break
                            }
                            curr++;
                            left <<= 1
                        }
                        used += 1 << curr;
                        if (type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS) {
                            return 1
                        }
                        low = huff & mask;
                        table[low] = root << 24 | curr << 16 | next - table_index | 0
                    }
                }
                if (huff !== 0) {
                    table[next + huff] = len - drop << 24 | 64 << 16 | 0
                }
                opts.bits = root;
                return 0
            }
        },
        {
            "../utils/common": 2
        }],
        11 : [function(_dereq_, module, exports) {
            "use strict";
            module.exports = {
                2 : "need dictionary",
                1 : "stream end",
                0 : "",
                "-1": "file error",
                "-2": "stream error",
                "-3": "data error",
                "-4": "insufficient memory",
                "-5": "buffer error",
                "-6": "incompatible version"
            }
        },
        {}],
        12 : [function(_dereq_, module, exports) {
            "use strict";
            function ZStream() {
                this.input = null;
                this.next_in = 0;
                this.avail_in = 0;
                this.total_in = 0;
                this.output = null;
                this.next_out = 0;
                this.avail_out = 0;
                this.total_out = 0;
                this.msg = "";
                this.state = null;
                this.data_type = 2;
                this.adler = 0
            }
            module.exports = ZStream
        },
        {}]
    },
    {},
    [1])(1)
});
var swfobject = function() {
    var D = "undefined",
    r = "object",
    T = "Shockwave Flash",
    Z = "ShockwaveFlash.ShockwaveFlash",
    q = "application/x-shockwave-flash",
    S = "SWFObjectExprInst",
    x = "onreadystatechange",
    Q = window,
    h = document,
    t = navigator,
    V = false,
    X = [],
    o = [],
    P = [],
    K = [],
    I,
    p,
    E,
    B,
    L = false,
    a = false,
    m,
    G,
    j = true,
    l = false,
    O = function() {
        var ad = typeof h.getElementById != D && typeof h.getElementsByTagName != D && typeof h.createElement != D,
        ak = t.userAgent.toLowerCase(),
        ab = t.platform.toLowerCase(),
        ah = ab ? /win/.test(ab) : /win/.test(ak),
        af = ab ? /mac/.test(ab) : /mac/.test(ak),
        ai = /webkit/.test(ak) ? parseFloat(ak.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false,
        aa = t.appName === "Microsoft Internet Explorer",
        aj = [0, 0, 0],
        ae = null;
        if (typeof t.plugins != D && typeof t.plugins[T] == r) {
            ae = t.plugins[T].description;
            if (ae && (typeof t.mimeTypes != D && t.mimeTypes[q] && t.mimeTypes[q].enabledPlugin)) {
                V = true;
                aa = false;
                ae = ae.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                aj[0] = n(ae.replace(/^(.*)\..*$/, "$1"));
                aj[1] = n(ae.replace(/^.*\.(.*)\s.*$/, "$1"));
                aj[2] = /[a-zA-Z]/.test(ae) ? n(ae.replace(/^.*[a-zA-Z]+(.*)$/, "$1")) : 0
            }
        } else {
            if (typeof Q.ActiveXObject != D) {
                try {
                    var ag = new ActiveXObject(Z);
                    if (ag) {
                        ae = ag.GetVariable("$version");
                        if (ae) {
                            aa = true;
                            ae = ae.split(" ")[1].split(",");
                            aj = [n(ae[0]), n(ae[1]), n(ae[2])]
                        }
                    }
                } catch(ac) {}
            }
        }
        return {
            w3: ad,
            pv: aj,
            wk: ai,
            ie: aa,
            win: ah,
            mac: af
        }
    } (),
    i = function() {
        if (!O.w3) {
            return
        }
        if (typeof h.readyState != D && (h.readyState === "complete" || h.readyState === "interactive") || typeof h.readyState == D && (h.getElementsByTagName("body")[0] || h.body)) {
            f()
        }
        if (!L) {
            if (typeof h.addEventListener != D) {
                h.addEventListener("DOMContentLoaded", f, false)
            }
            if (O.ie) {
                h.attachEvent(x,
                function aa() {
                    if (h.readyState == "complete") {
                        h.detachEvent(x, aa);
                        f()
                    }
                });
                if (Q == top) { (function ac() {
                        if (L) {
                            return
                        }
                        try {
                            h.documentElement.doScroll("left")
                        } catch(ad) {
                            setTimeout(ac, 0);
                            return
                        }
                        f()
                    })()
                }
            }
            if (O.wk) { (function ab() {
                    if (L) {
                        return
                    }
                    if (!/loaded|complete/.test(h.readyState)) {
                        setTimeout(ab, 0);
                        return
                    }
                    f()
                })()
            }
        }
    } ();
    function f() {
        if (L || !document.getElementsByTagName("body")[0]) {
            return
        }
        try {
            var ac, ad = C("span");
            ad.style.display = "none";
            ac = h.getElementsByTagName("body")[0].appendChild(ad);
            ac.parentNode.removeChild(ac);
            ac = null;
            ad = null
        } catch(ae) {
            return
        }
        L = true;
        var aa = X.length;
        for (var ab = 0; ab < aa; ab++) {
            X[ab]()
        }
    }
    function M(aa) {
        if (L) {
            aa()
        } else {
            X[X.length] = aa
        }
    }
    function s(ab) {
        if (typeof Q.addEventListener != D) {
            Q.addEventListener("load", ab, false)
        } else {
            if (typeof h.addEventListener != D) {
                h.addEventListener("load", ab, false)
            } else {
                if (typeof Q.attachEvent != D) {
                    g(Q, "onload", ab)
                } else {
                    if (typeof Q.onload == "function") {
                        var aa = Q.onload;
                        Q.onload = function() {
                            aa();
                            ab()
                        }
                    } else {
                        Q.onload = ab
                    }
                }
            }
        }
    }
    function Y() {
        var aa = h.getElementsByTagName("body")[0];
        var ae = C(r);
        ae.setAttribute("style", "visibility: hidden;");
        ae.setAttribute("type", q);
        var ad = aa.appendChild(ae);
        if (ad) {
            var ac = 0; (function ab() {
                if (typeof ad.GetVariable != D) {
                    try {
                        var ag = ad.GetVariable("$version");
                        if (ag) {
                            ag = ag.split(" ")[1].split(",");
                            O.pv = [n(ag[0]), n(ag[1]), n(ag[2])]
                        }
                    } catch(af) {
                        O.pv = [8, 0, 0]
                    }
                } else {
                    if (ac < 10) {
                        ac++;
                        setTimeout(ab, 10);
                        return
                    }
                }
                aa.removeChild(ae);
                ad = null;
                H()
            })()
        } else {
            H()
        }
    }
    function H() {
        var aj = o.length;
        if (aj > 0) {
            for (var ai = 0; ai < aj; ai++) {
                var ab = o[ai].id;
                var ae = o[ai].callbackFn;
                var ad = {
                    success: false,
                    id: ab
                };
                if (O.pv[0] > 0) {
                    var ah = c(ab);
                    if (ah) {
                        if (F(o[ai].swfVersion) && !(O.wk && O.wk < 312)) {
                            w(ab, true);
                            if (ae) {
                                ad.success = true;
                                ad.ref = z(ab);
                                ad.id = ab;
                                ae(ad)
                            }
                        } else {
                            if (o[ai].expressInstall && A()) {
                                var al = {};
                                al.data = o[ai].expressInstall;
                                al.width = ah.getAttribute("width") || "0";
                                al.height = ah.getAttribute("height") || "0";
                                if (ah.getAttribute("class")) {
                                    al.styleclass = ah.getAttribute("class")
                                }
                                if (ah.getAttribute("align")) {
                                    al.align = ah.getAttribute("align")
                                }
                                var ak = {};
                                var aa = ah.getElementsByTagName("param");
                                var af = aa.length;
                                for (var ag = 0; ag < af; ag++) {
                                    if (aa[ag].getAttribute("name").toLowerCase() != "movie") {
                                        ak[aa[ag].getAttribute("name")] = aa[ag].getAttribute("value")
                                    }
                                }
                                R(al, ak, ab, ae)
                            } else {
                                b(ah);
                                if (ae) {
                                    ae(ad)
                                }
                            }
                        }
                    }
                } else {
                    w(ab, true);
                    if (ae) {
                        var ac = z(ab);
                        if (ac && typeof ac.SetVariable != D) {
                            ad.success = true;
                            ad.ref = ac;
                            ad.id = ac.id
                        }
                        ae(ad)
                    }
                }
            }
        }
    }
    X[0] = function() {
        if (V) {
            Y()
        } else {
            H()
        }
    };
    function z(ac) {
        var aa = null,
        ab = c(ac);
        if (ab && ab.nodeName.toUpperCase() === "OBJECT") {
            if (typeof ab.SetVariable !== D) {
                aa = ab
            } else {
                aa = ab.getElementsByTagName(r)[0] || ab
            }
        }
        return aa
    }
    function A() {
        return ! a && F("6.0.65") && (O.win || O.mac) && !(O.wk && O.wk < 312)
    }
    function R(ad, ae, aa, ac) {
        var ah = c(aa);
        aa = W(aa);
        a = true;
        E = ac || null;
        B = {
            success: false,
            id: aa
        };
        if (ah) {
            if (ah.nodeName.toUpperCase() == "OBJECT") {
                I = J(ah);
                p = null
            } else {
                I = ah;
                p = aa
            }
            ad.id = S;
            if (typeof ad.width == D || !/%$/.test(ad.width) && n(ad.width) < 310) {
                ad.width = "310"
            }
            if (typeof ad.height == D || !/%$/.test(ad.height) && n(ad.height) < 137) {
                ad.height = "137"
            }
            var ag = O.ie ? "ActiveX": "PlugIn",
            af = "MMredirectURL=" + encodeURIComponent(Q.location.toString().replace(/&/g, "%26")) + "&MMplayerType=" + ag + "&MMdoctitle=" + encodeURIComponent(h.title.slice(0, 47) + " - Flash Player Installation");
            if (typeof ae.flashvars != D) {
                ae.flashvars += "&" + af
            } else {
                ae.flashvars = af
            }
            if (O.ie && ah.readyState != 4) {
                var ab = C("div");
                aa += "SWFObjectNew";
                ab.setAttribute("id", aa);
                ah.parentNode.insertBefore(ab, ah);
                ah.style.display = "none";
                y(ah)
            }
            u(ad, ae, aa)
        }
    }
    function b(ab) {
        if (O.ie && ab.readyState != 4) {
            ab.style.display = "none";
            var aa = C("div");
            ab.parentNode.insertBefore(aa, ab);
            aa.parentNode.replaceChild(J(ab), aa);
            y(ab)
        } else {
            ab.parentNode.replaceChild(J(ab), ab)
        }
    }
    function J(af) {
        var ae = C("div");
        if (O.win && O.ie) {
            ae.innerHTML = af.innerHTML
        } else {
            var ab = af.getElementsByTagName(r)[0];
            if (ab) {
                var ag = ab.childNodes;
                if (ag) {
                    var aa = ag.length;
                    for (var ad = 0; ad < aa; ad++) {
                        if (! (ag[ad].nodeType == 1 && ag[ad].nodeName == "PARAM") && !(ag[ad].nodeType == 8)) {
                            ae.appendChild(ag[ad].cloneNode(true))
                        }
                    }
                }
            }
        }
        return ae
    }
    function k(aa, ab) {
        var ac = C("div");
        ac.innerHTML = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'><param name='movie' value='" + aa + "'>" + ab + "</object>";
        return ac.firstChild
    }
    function u(ai, ag, ab) {
        var aa, ad = c(ab);
        ab = W(ab);
        if (O.wk && O.wk < 312) {
            return aa
        }
        if (ad) {
            var ac = O.ie ? C("div") : C(r),
            af,
            ah,
            ae;
            if (typeof ai.id == D) {
                ai.id = ab
            }
            for (ae in ag) {
                if (ag.hasOwnProperty(ae) && ae.toLowerCase() !== "movie") {
                    e(ac, ae, ag[ae])
                }
            }
            if (O.ie) {
                ac = k(ai.data, ac.innerHTML)
            }
            for (af in ai) {
                if (ai.hasOwnProperty(af)) {
                    ah = af.toLowerCase();
                    if (ah === "styleclass") {
                        ac.setAttribute("class", ai[af])
                    } else {
                        if (ah !== "classid" && ah !== "data") {
                            ac.setAttribute(af, ai[af])
                        }
                    }
                }
            }
            if (O.ie) {
                P[P.length] = ai.id
            } else {
                ac.setAttribute("type", q);
                ac.setAttribute("data", ai.data)
            }
            ad.parentNode.replaceChild(ac, ad);
            aa = ac
        }
        return aa
    }
    function e(ac, aa, ab) {
        var ad = C("param");
        ad.setAttribute("name", aa);
        ad.setAttribute("value", ab);
        ac.appendChild(ad)
    }
    function y(ac) {
        var ab = c(ac);
        if (ab && ab.nodeName.toUpperCase() == "OBJECT") {
            if (O.ie) {
                ab.style.display = "none"; (function aa() {
                    if (ab.readyState == 4) {
                        for (var ad in ab) {
                            if (typeof ab[ad] == "function") {
                                ab[ad] = null
                            }
                        }
                        ab.parentNode.removeChild(ab)
                    } else {
                        setTimeout(aa, 10)
                    }
                })()
            } else {
                ab.parentNode.removeChild(ab)
            }
        }
    }
    function U(aa) {
        return aa && aa.nodeType && aa.nodeType === 1
    }
    function W(aa) {
        return U(aa) ? aa.id: aa
    }
    function c(ac) {
        if (U(ac)) {
            return ac
        }
        var aa = null;
        try {
            aa = h.getElementById(ac)
        } catch(ab) {}
        return aa
    }
    function C(aa) {
        return h.createElement(aa)
    }
    function n(aa) {
        return parseInt(aa, 10)
    }
    function g(ac, aa, ab) {
        ac.attachEvent(aa, ab);
        K[K.length] = [ac, aa, ab]
    }
    function F(ac) {
        ac += "";
        var ab = O.pv,
        aa = ac.split(".");
        aa[0] = n(aa[0]);
        aa[1] = n(aa[1]) || 0;
        aa[2] = n(aa[2]) || 0;
        return ab[0] > aa[0] || ab[0] == aa[0] && ab[1] > aa[1] || ab[0] == aa[0] && ab[1] == aa[1] && ab[2] >= aa[2] ? true: false
    }
    function v(af, ab, ag, ae) {
        var ad = h.getElementsByTagName("head")[0];
        if (!ad) {
            return
        }
        var aa = typeof ag == "string" ? ag: "screen";
        if (ae) {
            m = null;
            G = null
        }
        if (!m || G != aa) {
            var ac = C("style");
            ac.setAttribute("type", "text/css");
            ac.setAttribute("media", aa);
            m = ad.appendChild(ac);
            if (O.ie && typeof h.styleSheets != D && h.styleSheets.length > 0) {
                m = h.styleSheets[h.styleSheets.length - 1]
            }
            G = aa
        }
        if (m) {
            if (typeof m.addRule != D) {
                m.addRule(af, ab)
            } else {
                if (typeof h.createTextNode != D) {
                    m.appendChild(h.createTextNode(af + " {" + ab + "}"))
                }
            }
        }
    }
    function w(ad, aa) {
        if (!j) {
            return
        }
        var ab = aa ? "visible": "hidden",
        ac = c(ad);
        if (L && ac) {
            ac.style.visibility = ab
        } else {
            if (typeof ad === "string") {
                v("#" + ad, "visibility:" + ab)
            }
        }
    }
    function N(ab) {
        var ac = /[\\\"<>\.;]/;
        var aa = ac.exec(ab) != null;
        return aa && typeof encodeURIComponent != D ? encodeURIComponent(ab) : ab
    }
    var d = function() {
        if (O.ie) {
            window.attachEvent("onunload",
            function() {
                var af = K.length;
                for (var ae = 0; ae < af; ae++) {
                    K[ae][0].detachEvent(K[ae][1], K[ae][2])
                }
                var ac = P.length;
                for (var ad = 0; ad < ac; ad++) {
                    y(P[ad])
                }
                for (var ab in O) {
                    O[ab] = null
                }
                O = null;
                for (var aa in swfobject) {
                    swfobject[aa] = null
                }
                swfobject = null
            })
        }
    } ();
    return {
        registerObject: function(ae, aa, ad, ac) {
            if (O.w3 && ae && aa) {
                var ab = {};
                ab.id = ae;
                ab.swfVersion = aa;
                ab.expressInstall = ad;
                ab.callbackFn = ac;
                o[o.length] = ab;
                w(ae, false)
            } else {
                if (ac) {
                    ac({
                        success: false,
                        id: ae
                    })
                }
            }
        },
        getObjectById: function(aa) {
            if (O.w3) {
                return z(aa)
            }
        },
        embedSWF: function(af, al, ai, ak, ab, ae, ad, ah, aj, ag) {
            var ac = W(al),
            aa = {
                success: false,
                id: ac
            };
            if (O.w3 && !(O.wk && O.wk < 312) && af && al && ai && ak && ab) {
                w(ac, false);
                M(function() {
                    ai += "";
                    ak += "";
                    var an = {};
                    if (aj && typeof aj === r) {
                        for (var aq in aj) {
                            an[aq] = aj[aq]
                        }
                    }
                    an.data = af;
                    an.width = ai;
                    an.height = ak;
                    var ar = {};
                    if (ah && typeof ah === r) {
                        for (var ao in ah) {
                            ar[ao] = ah[ao]
                        }
                    }
                    if (ad && typeof ad === r) {
                        for (var am in ad) {
                            if (ad.hasOwnProperty(am)) {
                                var ap = l ? encodeURIComponent(am) : am,
                                at = l ? encodeURIComponent(ad[am]) : ad[am];
                                if (typeof ar.flashvars != D) {
                                    ar.flashvars += "&" + ap + "=" + at
                                } else {
                                    ar.flashvars = ap + "=" + at
                                }
                            }
                        }
                    }
                    if (F(ab)) {
                        var au = u(an, ar, al);
                        if (an.id == ac) {
                            w(ac, true)
                        }
                        aa.success = true;
                        aa.ref = au;
                        aa.id = au.id
                    } else {
                        if (ae && A()) {
                            an.data = ae;
                            R(an, ar, al, ag);
                            return
                        } else {
                            w(ac, true)
                        }
                    }
                    if (ag) {
                        ag(aa)
                    }
                })
            } else {
                if (ag) {
                    ag(aa)
                }
            }
        },
        switchOffAutoHideShow: function() {
            j = false
        },
        enableUriEncoding: function(aa) {
            l = typeof aa === D ? true: aa
        },
        ua: O,
        getFlashPlayerVersion: function() {
            return {
                major: O.pv[0],
                minor: O.pv[1],
                release: O.pv[2]
            }
        },
        hasFlashPlayerVersion: F,
        createSWF: function(ac, ab, aa) {
            if (O.w3) {
                return u(ac, ab, aa)
            } else {
                return undefined
            }
        },
        showExpressInstall: function(ac, ad, aa, ab) {
            if (O.w3 && A()) {
                R(ac, ad, aa, ab)
            }
        },
        removeSWF: function(aa) {
            if (O.w3) {
                y(aa)
            }
        },
        createCSS: function(ad, ac, ab, aa) {
            if (O.w3) {
                v(ad, ac, ab, aa)
            }
        },
        addDomLoadEvent: M,
        addLoadEvent: s,
        getQueryParamValue: function(ad) {
            var ac = h.location.search || h.location.hash;
            if (ac) {
                if (/\?/.test(ac)) {
                    ac = ac.split("?")[1]
                }
                if (ad == null) {
                    return N(ac)
                }
                var ab = ac.split("&");
                for (var aa = 0; aa < ab.length; aa++) {
                    if (ab[aa].substring(0, ab[aa].indexOf("=")) == ad) {
                        return N(ab[aa].substring(ab[aa].indexOf("=") + 1))
                    }
                }
            }
            return ""
        },
        expressInstallCallback: function() {
            if (a) {
                var aa = c(S);
                if (aa && I) {
                    aa.parentNode.replaceChild(I, aa);
                    if (p) {
                        w(p, true);
                        if (O.ie) {
                            I.style.display = "block"
                        }
                    }
                    if (E) {
                        E(B)
                    }
                }
                a = false
            }
        },
        version: "2.3"
    }
} ();
mat4.translation = function(out, vec) {
    mat4.identity(out);
    out[12] = vec[0];
    out[13] = vec[1];
    out[14] = vec[2];
    return out
};
mat4.rotationQuat = function(out, q) {
    mat4.identity(out);
    var xx = q[0] * q[0],
    yy = q[1] * q[1],
    zz = q[2] * q[2],
    xy = q[0] * q[1],
    zw = q[2] * q[3],
    zx = q[2] * q[0],
    yw = q[1] * q[3],
    yz = q[1] * q[2],
    xw = q[0] * q[3];
    out[0] = 1 - 2 * (yy + zz);
    out[1] = 2 * (xy + zw);
    out[2] = 2 * (zx - yw);
    out[4] = 2 * (xy - zw);
    out[5] = 1 - 2 * (zz + xx);
    out[6] = 2 * (yz + xw);
    out[8] = 2 * (zx + yw);
    out[9] = 2 * (yz - xw);
    out[10] = 1 - 2 * (yy + xx);
    return out
};
mat4.mulSlimDX = function(out, l, r) {
    var left = {
        M11: l[0],
        M12: l[1],
        M13: l[2],
        M14: l[3],
        M21: l[4],
        M22: l[5],
        M23: l[6],
        M24: l[7],
        M31: l[8],
        M32: l[9],
        M33: l[10],
        M34: l[11],
        M41: l[12],
        M42: l[13],
        M43: l[14],
        M44: l[15]
    };
    var right = {
        M11: r[0],
        M12: r[1],
        M13: r[2],
        M14: r[3],
        M21: r[4],
        M22: r[5],
        M23: r[6],
        M24: r[7],
        M31: r[8],
        M32: r[9],
        M33: r[10],
        M34: r[11],
        M41: r[12],
        M42: r[13],
        M43: r[14],
        M44: r[15]
    };
    out[0] = left.M11 * right.M11 + left.M12 * right.M21 + left.M13 * right.M31 + left.M14 * right.M41;
    out[1] = left.M11 * right.M12 + left.M12 * right.M22 + left.M13 * right.M32 + left.M14 * right.M42;
    out[2] = left.M11 * right.M13 + left.M12 * right.M23 + left.M13 * right.M33 + left.M14 * right.M43;
    out[3] = left.M11 * right.M14 + left.M12 * right.M24 + left.M13 * right.M34 + left.M14 * right.M44;
    out[4] = left.M21 * right.M11 + left.M22 * right.M21 + left.M23 * right.M31 + left.M24 * right.M41;
    out[5] = left.M21 * right.M12 + left.M22 * right.M22 + left.M23 * right.M32 + left.M24 * right.M42;
    out[6] = left.M21 * right.M13 + left.M22 * right.M23 + left.M23 * right.M33 + left.M24 * right.M43;
    out[7] = left.M21 * right.M14 + left.M22 * right.M24 + left.M23 * right.M34 + left.M24 * right.M44;
    out[8] = left.M31 * right.M11 + left.M32 * right.M21 + left.M33 * right.M31 + left.M34 * right.M41;
    out[9] = left.M31 * right.M12 + left.M32 * right.M22 + left.M33 * right.M32 + left.M34 * right.M42;
    out[10] = left.M31 * right.M13 + left.M32 * right.M23 + left.M33 * right.M33 + left.M34 * right.M43;
    out[11] = left.M31 * right.M14 + left.M32 * right.M24 + left.M33 * right.M34 + left.M34 * right.M44;
    out[12] = left.M41 * right.M11 + left.M42 * right.M21 + left.M43 * right.M31 + left.M44 * right.M41;
    out[13] = left.M41 * right.M12 + left.M42 * right.M22 + left.M43 * right.M32 + left.M44 * right.M42;
    out[14] = left.M41 * right.M13 + left.M42 * right.M23 + left.M43 * right.M33 + left.M44 * right.M43;
    out[15] = left.M41 * right.M14 + left.M42 * right.M24 + left.M43 * right.M34 + left.M44 * right.M44;
    return out
};
mat4.transformVec3 = function(out, v, m) {
    out[0] = v[0] * m[0] + v[1] * m[4] + v[2] * m[8] + m[12];
    out[1] = v[0] * m[1] + v[1] * m[5] + v[2] * m[9] + m[13];
    out[2] = v[0] * m[2] + v[1] * m[6] + v[2] * m[10] + m[14];
    return out
};
mat4.transformVec4 = function(out, v, m) {
    out[0] = v[0] * m[0] + v[1] * m[4] + v[2] * m[8] + v[3] * m[12];
    out[1] = v[0] * m[1] + v[1] * m[5] + v[2] * m[9] + v[3] * m[13];
    out[2] = v[0] * m[2] + v[1] * m[6] + v[2] * m[10] + v[3] * m[14];
    out[3] = v[0] * m[3] + v[1] * m[7] + v[2] * m[11] + v[3] * m[15];
    return out
};
mat4.extractEulerAngles = function(out, m) {
    out[0] = Math.atan2(m[6], m[10]);
    var c2 = Math.sqrt(m[0] * m[0] + m[1] * m[1]);
    out[1] = Math.atan2( - m[2], c2);
    var s1 = Math.sin(out[0]),
    c1 = Math.cos(out[0]);
    out[2] = Math.atan2(s1 * m[8] - c1 * m[4], c1 * m[5] - s1 * m[9]);
    return out
};
mat4.invert2 = function(out, m) {
    var det = m[0] * (m[5] * m[10] - m[6] * m[9]) + m[4] * (m[2] * m[9] - m[1] * m[10]) + m[8] * (m[1] * m[6] - m[2] * m[5]);
    if (det == 0) return null;
    var invDet = 1 / det;
    out[0] = (m[5] * m[10] - m[6] * m[9]) * invDet;
    out[1] = (m[9] * m[2] - m[10] * m[1]) * invDet;
    out[2] = (m[1] * m[6] - m[2] * m[5]) * invDet;
    out[4] = (m[6] * m[8] - m[4] * m[10]) * invDet;
    out[5] = (m[10] * m[0] - m[8] * m[2]) * invDet;
    out[6] = (m[2] * m[4] - m[0] * m[6]) * invDet;
    out[8] = (m[4] * m[9] - m[5] * m[8]) * invDet;
    out[9] = (m[8] * m[1] - m[9] * m[0]) * invDet;
    out[10] = (m[0] * m[5] - m[1] * m[4]) * invDet;
    out[3] = out[0] * -m[3] + out[1] * -m[7] + out[2] * -m[11];
    out[7] = out[4] * -m[3] + out[5] * -m[7] + out[6] * -m[11];
    out[11] = out[8] * -m[3] + out[9] * -m[7] + out[10] * -m[11];
    out[12] = out[13] = out[14] = 0;
    out[15] = 1;
    return out
};
window.requestAnimFrame = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback, element) {
        window.setTimeout(callback, 1e3 / 60)
    }
} ();
jQuery.support.cors = true;
if ($.ajaxTransport) {
    $.ajaxSetup({
        flatOptions: {
            renderer: true
        }
    });
    $.ajaxTransport("+binary",
    function(options, originalOptions, jqXHR) {
        if (window.FormData && (options.dataType && options.dataType == "binary" || options.data && (window.ArrayBuffer && options.data instanceof ArrayBuffer || window.Blob && options.data instanceof Blob))) {
            return {
                send: function(_, callback) {
                    var xhr = new XMLHttpRequest,
                    url = options.url,
                    type = options.type,
                    dataType = options.responseType || "blob",
                    data = options.data || null;
                    if (options.renderer) {
                        xhr.addEventListener("progress",
                        function(event) {
                            if (event.lengthComputable) {
                                if (!options.renderer.downloads[this.responseURL]) {
                                    options.renderer.downloads[this.responseURL] = {
                                        loaded: event.loaded,
                                        total: event.total
                                    }
                                } else {
                                    options.renderer.downloads[this.responseURL].loaded = event.loaded
                                }
                                options.renderer.updateProgress()
                            }
                        })
                    }
                    xhr.addEventListener("load",
                    function() {
                        if (options.renderer) {
                            delete options.renderer.downloads[this.responseURL];
                            options.renderer.updateProgress()
                        }
                        var data = {};
                        data[options.dataType] = xhr.response;
                        callback(xhr.status, xhr.statusText, data, xhr.getAllResponseHeaders())
                    });
                    xhr.open(type, url, true);
                    xhr.responseType = dataType;
                    xhr.send(data)
                },
                abort: function() {
                    jqXHR.abort()
                }
            }
        }
    })
} else { (function() {
        var httpData = $.httpData;
        $.httpData = function(xhr, type, s) {
            if (type == "binary") {
                return xhr.response
            } else {
                return httpData(xhr, type, s)
            }
        }
    })();
    $.ajaxSetup({
        beforeSend: function(xhr, options) {
            if (options.dataType == "binary") {
                xhr.responseType = options.responseType || "arraybuffer";
                xhr.addEventListener("progress",
                function(event) {
                    if (!options.renderer) return;
                    if (event.lengthComputable) {
                        if (!options.renderer.downloads[this.responseURL]) {
                            options.renderer.downloads[this.responseURL] = {
                                loaded: event.loaded,
                                total: event.total
                            }
                        } else {
                            options.renderer.downloads[this.responseURL].loaded = event.loaded
                        }
                        options.renderer.updateProgress()
                    }
                },
                false);
                xhr.addEventListener("load",
                function() {
                    if (!options.renderer) return;
                    delete options.renderer.downloads[this.responseURL];
                    options.renderer.updateProgress()
                },
                false)
            }
        }
    })
}
Math.randomInt = function() {
    return Math.randomInt ||
    function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min
    }
} ();
if (typeof Object.create != "function") {
    Object.create = function() {
        var obj = function() {};
        return function(prototype) {
            if (arguments.length > 1) {
                throw Error("Second argument not supported")
            }
            if (typeof prototype != "object") {
                throw TypeError("Argument must be an object")
            }
            obj.prototype = prototype;
            var result = new obj;
            obj.prototype = null;
            return result
        }
    } ()
}
window.console = window.console || {
    log: function() {},
    error: function() {},
    warn: function() {}
};
function ZamModelViewer(opts) {
    var self = this;
    if (!opts.type || !self.validTypes[opts.type]) throw "Viewer error: Bad viewer type given";
    if (!opts.container) throw "Viewer error: Bad container given";
    if (!opts.aspect) throw "Viewer error: Bad aspect ratio given";
    if (!opts.contentPath) throw "Viewer error: No content path given";
    self.type = opts.type;
    self.container = opts.container;
    self.aspect = parseFloat(opts.aspect);
    self.renderer = null;
    self.options = opts;
    var width = parseInt(self.container.width());
    var height = Math.round(width / self.aspect);
    self.init(width, height)
}
ZamModelViewer.WEBGL = 1;
ZamModelViewer.FLASH = 2;
ZamModelViewer.TOR = 1;
ZamModelViewer.WOW = 2;
ZamModelViewer.LOL = 3;
ZamModelViewer.GW2 = 4;
ZamModelViewer.WILDSTAR = 5;
ZamModelViewer.HEROES = 6;
ZamModelViewer.DESTINY = 7;
ZamModelViewer.Models = {};
ZamModelViewer.prototype = {
    validTypes: {
        2 : "Wowhead",
        3 : "LolKing",
        6 : "HeroKing",
        7 : "DestinyDB"
    },
    destroy: function() {
        var self = this;
        if (self.renderer) self.renderer.destroy();
        self.options = null;
        self.container = null
    },
    init: function(width, height) {
        var self = this,
        glSupport = false;
        if (typeof window["Uint8Array"] !== undefined && typeof window["DataView"] !== undefined) {
            try {
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("webgl", {
                    alpha: false
                }) || canvas.getContext("experimental-webgl", {
                    alpha: false
                });
                if (ctx) glSupport = true
            } catch(e) {}
        }
        if (!self.options.flash && glSupport) {
            self.mode = ZamModelViewer.WEBGL;
            self.renderer = new ZamModelViewer.WebGL(self)
        } else {
            self.mode = ZamModelViewer.FLASH;
            self.renderer = new ZamModelViewer.Flash(self)
        }
        self.renderer.resize(width, height);
        self.renderer.init()
    },
    method: function(name, params) {
        var self = this;
        if (params === undefined) params = [];
        if (self.renderer) return self.renderer.method(name, [].concat(params));
        return null
    },
    option: function(key, val) {
        var self = this;
        if (val !== undefined) {
            self.options[key] = val
        }
        return self.options[key]
    }
};
ZamModelViewer.isFullscreen = function() {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) return true;
    return false
};
ZamModelViewer.requestFullscreen = function(e) {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) return;
    if (e.requestFullscreen) {
        e.requestFullscreen()
    } else if (e.webkitRequestFullscreen) {
        e.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
    } else if (e.mozRequestFullScreen) {
        e.mozRequestFullScreen()
    } else if (e.msRequestFullscreen) {
        e.msRequestFullscreen()
    }
};
ZamModelViewer.exitFullscreen = function() {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) return;
    if (document.exitFullscreen) {
        document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
    }
};
ZamModelViewer.DataView = function(buffer) {
    this.buffer = new DataView(buffer);
    this.position = 0
};
ZamModelViewer.DataView.prototype = {
    getBool: function() {
        var v = this.buffer.getUint8(this.position) != 0;
        this.position += 1;
        return v
    },
    getUint8: function() {
        var v = this.buffer.getUint8(this.position);
        this.position += 1;
        return v
    },
    getInt8: function() {
        var v = this.buffer.getInt8(this.position);
        this.position += 1;
        return v
    },
    getUint16: function() {
        var v = this.buffer.getUint16(this.position, true);
        this.position += 2;
        return v
    },
    getInt16: function() {
        var v = this.buffer.getInt16(this.position, true);
        this.position += 2;
        return v
    },
    getUint32: function() {
        var v = this.buffer.getUint32(this.position, true);
        this.position += 4;
        return v
    },
    getInt32: function() {
        var v = this.buffer.getInt32(this.position, true);
        this.position += 4;
        return v
    },
    getFloat: function() {
        var v = this.buffer.getFloat32(this.position, true);
        this.position += 4;
        return v
    },
    getString: function(len) {
        if (len === undefined) len = this.getUint16();
        var str = "";
        for (var i = 0; i < len; ++i) {
            str += String.fromCharCode(this.getUint8())
        }
        return str
    },
    setBool: function(v) {
        this.buffer.setUint8(this.position, v ? 1 : 0);
        this.position += 1
    },
    setUint8: function(v) {
        this.buffer.setUint8(this.position, v);
        this.position += 1
    },
    setInt8: function(v) {
        this.buffer.setInt8(this.position, v);
        this.position += 1
    },
    setUint16: function(v) {
        this.buffer.setUint16(this.position, v, true);
        this.position += 2
    },
    setInt16: function(v) {
        this.buffer.setInt16(this.position, v, true);
        this.position += 2
    },
    setUint32: function(v) {
        this.buffer.setUint32(this.position, v, true);
        this.position += 4
    },
    setInt32: function(v) {
        this.buffer.setInt32(this.position, v, true);
        this.position += 4
    },
    setFloat: function(v) {
        this.buffer.setFloat32(this.position, v, true);
        this.position += 4
    }
};
ZamModelViewer.WebGL = function(viewer) {
    var self = this;
    self.viewer = viewer;
    self.options = viewer.options;
    self.downloads = {};
    self.context = null;
    self.width = 0;
    self.height = 0;
    self.time = 0;
    self.delta = 0;
    self.models = [];
    self.screenshotDataURL = null;
    self.makeDataURL = false;
    self.azimuth = Math.PI * 1.5;
    self.zenith = Math.PI / 2;
    self.distance = 15;
    self.fov = 30;
    self.translation = [0, 0, 0];
    self.target = [0, 0, 0];
    self.eye = [0, 0, 0];
    self.up = [0, 0, 1];
    self.lookDir = vec3.create();
    self.fullscreen = false;
    self.projMatrix = mat4.create();
    self.viewMatrix = mat4.create();
    self.panningMatrix = mat4.create();
    self.viewOffset = vec3.create();
    if (!ZamModelViewer.WebGL.addedCss) {
        ZamModelViewer.WebGL.addedCss = true;
    }
};
ZamModelViewer.WebGL.prototype = {
    updateProgress: function() {
        var self = this,
        totalSize = 0,
        totalLoaded = 0;
        for (var url in self.downloads) {
            totalSize += self.downloads[url].total;
            totalLoaded += self.downloads[url].loaded
        }
        if (totalSize <= 0) {
            if (self.progressShown) {
                self.progressBg.hide();
                self.progressBar.hide();
                self.progressShown = false
            }
        } else {
            if (!self.progressShown) {
                self.progressBg.show();
                self.progressBar.show();
                self.progressShown = true
            }
            var pct = totalLoaded / totalSize;
            self.progressBar.width(Math.round(self.width * pct) + "px")
        }
    },
    destroy: function() {
        var self = this;
        self.stop = true;
        if (self.canvas) {
            self.canvas.detach();
            self.progressBg.detach();
            self.progressBar.detach();
            self.canvas.off("mousedown touchstart", self.onMouseDown).off("DOMMouseScroll", self.onMouseScroll).off("mousewheel", self.onMouseWheel).off("dblclick", self.onDoubleClick).off("contextmenu", self.onContextMenu);
            $(window).off("resize", self.onFullscreen);
            $(document).off("mouseup touchend", self.onMouseUp).off("mousemove touchmove", self.onMouseMove);
            self.canvas = self.progressBg = self.progressBar = null
        }
        if (self.context) {
            var gl = self.context;
            if (self.bgTexture) gl.deleteTexture(self.bgTexture);
            self.bgTexture = null;
            if (self.program) gl.deleteProgram(self.program);
            self.program = null;
            if (self.vb) gl.deleteBuffer(self.vb);
            if (self.vs) gl.deleteShader(self.vs);
            if (self.fs) gl.deleteShader(self.fs);
            self.vb = self.vs = self.fs = null
        }
        if (self.bgImg) self.bgImg = null;
        for (var i = 0; i < self.models.length; ++i) {
            self.models[i].destroy();
            self.models[i] = null
        }
        self.models = []
    },
    method: function(name, params) {
        var self = this;
        if (self.models.length > 0 && self.models[0].external && self.models[0].external[name]) {
            return self.models[0].external[name].apply(self.models[0], params)
        } else {
            return null
        }
    },
    getTime: function() {
        if (window.performance && window.performance.now) return window.performance.now();
        else return Date.now()
    },
    draw: function() {
        var self = this,
        gl = self.context,
        i;
        var time = self.getTime();
        self.delta = (time - self.time) * .001;
        self.time = time;
        self.updateCamera();
        gl.viewport(0, 0, self.width, self.height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        if (self.bgTexture && self.program) {
            gl.useProgram(self.program);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, self.bgTexture);
            gl.uniform1i(self.uTexture, 0);
            gl.bindBuffer(gl.ARRAY_BUFFER, self.vb);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
            gl.enableVertexAttribArray(self.aPosition);
            gl.vertexAttribPointer(self.aPosition, 2, gl.FLOAT, false, 16, 0);
            gl.enableVertexAttribArray(self.aTexCoord);
            gl.vertexAttribPointer(self.aTexCoord, 2, gl.FLOAT, false, 16, 8);
            gl.depthMask(false);
            gl.disable(gl.CULL_FACE);
            gl.blendFunc(gl.ONE, gl.ZERO);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            gl.enable(gl.CULL_FACE);
            gl.depthMask(true);
            gl.disableVertexAttribArray(self.aPosition);
            gl.disableVertexAttribArray(self.aTexCoord)
        }
        for (i = 0; i < self.models.length; ++i) self.models[i].draw()
    },
    updateCamera: function() {
        var self = this;
        var d = self.distance,
        a = self.azimuth,
        z = self.zenith;
        if (self.up[2] == 1) {
            self.eye[0] = -d * Math.sin(z) * Math.cos(a) + self.target[0];
            self.eye[1] = -d * Math.sin(z) * Math.sin(a) + self.target[1];
            self.eye[2] = -d * Math.cos(z) + self.target[2]
        } else {
            self.eye[0] = -d * Math.sin(z) * Math.cos(a) + self.target[0];
            self.eye[1] = -d * Math.cos(z) + self.target[1];
            self.eye[2] = -d * Math.sin(z) * Math.sin(a) + self.target[2]
        }
        vec3.subtract(self.lookDir, self.target, self.eye);
        vec3.normalize(self.lookDir, self.lookDir);
        mat4.lookAt(self.viewMatrix, self.eye, self.target, self.up);
        mat4.identity(self.panningMatrix);
        if (self.up[2] == 1) {
            vec3.set(self.viewOffset, self.translation[0], -self.translation[1], 0)
        } else {
            vec3.set(self.viewOffset, self.translation[0], 0, self.translation[1])
        }
        mat4.translate(self.panningMatrix, self.panningMatrix, self.viewOffset);
        mat4.multiply(self.viewMatrix, self.panningMatrix, self.viewMatrix)
    },
    init: function() {
        var self = this,
        gl = self.context,
        i;
        mat4.perspective(self.projMatrix, self.fov * .0174532925, self.viewer.aspect, .1, 5e3);
        self.updateCamera();
        gl.clearColor(0, 0, 0, 1);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.BLEND);
        if ((self.options.models || self.options.items) && ZamModelViewer.Models[self.viewer.type]) {
            var Model = ZamModelViewer.Models[self.viewer.type];
            var models = [].concat(self.options.models);
            if (models.length > 0) {
                for (i = 0; i < models.length; ++i) {
                    self.models.push(new Model(self, self.viewer, models[i], i))
                }
            } else if (self.viewer.type == ZamModelViewer.DESTINY && self.options.items) {
                self.models.push(new Model(self, self.viewer))
            }
        }
        function tick() {
            if (self.stop) return;
            requestAnimFrame(tick);
            self.draw();
            if (self.makeDataURL !== false) {
                if (self.canvas[0].toDataURL) {
                    if (!Array.isArray(self.makeDataURL)) {
                        self.makeDataURL = []
                    }
                    self.screenshotDataURL = self.canvas[0].toDataURL.apply(self.canvas[0], self.makeDataURL)
                }
                self.makeDataURL = false
            }
        }
        tick()
    },
    resize: function(width, height) {
        var self = this;
        if (self.width === width) return;
        if (!self.fullscreen) {
            self.viewer.container.css({
                height: height + "px",
                position: "relative"
            })
        }
        self.width = width;
        self.height = height;
        if (!self.canvas) {
            self.canvas = $("<canvas/>");
            self.canvas.attr({
                width: width,
                height: height
            });
            self.viewer.container.append(self.canvas);
            self.context = self.canvas[0].getContext("webgl", {
                alpha: false
            }) || self.canvas[0].getContext("experimental-webgl", {
                alpha: false
            });
            self.progressBg = $("<div/>", {
                css: {
                    display: "none",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "10px",
                    backgroundColor: "#000"
                }
            });
            self.progressBar = $("<div/>", {
                css: {
                    display: "none",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: 0,
                    height: "10px",
                    backgroundColor: "#ccc"
                }
            });
            self.viewer.container.append(self.progressBg);
            self.viewer.container.append(self.progressBar);
            if (!self.context) {
                alert("No WebGL support, sorry! You should totally use Chrome.");
                self.canvas.detach();
                self.canvas = null;
                return
            }
            self.toggleSize = function(event) {
                if (!self.resized) {
                    self.restoreWidth = self.width;
                    self.restoreHeight = self.height;
                    self.resized = true;
                    self.resize(640, 480);
                    mat4.perspective(self.projMatrix, self.fov * .0174532925, 640 / 480, .1, 5e3)
                } else {
                    self.resized = false;
                    self.resize(self.restoreWidth, self.restoreHeight);
                    mat4.perspective(self.projMatrix, self.fov * .0174532925, self.viewer.aspect, .1, 5e3)
                }
            };
            self.onDoubleClick = function(event) {
                if (ZamModelViewer.isFullscreen()) {
                    ZamModelViewer.exitFullscreen()
                } else {
                    ZamModelViewer.requestFullscreen(self.canvas[0])
                }
            };
            self.onFullscreen = function(event) {
                if (!self.fullscreen && ZamModelViewer.isFullscreen()) {
                    self.restoreWidth = self.width;
                    self.restoreHeight = self.height;
                    self.fullscreen = true;
                    var $window = $(window);
                    self.resize($window.width(), $window.height());
                    mat4.perspective(self.projMatrix, self.fov * .0174532925, $window.width() / $window.height(), .1, 5e3)
                } else if (self.fullscreen && !ZamModelViewer.isFullscreen()) {
                    self.fullscreen = false;
                    self.resize(self.restoreWidth, self.restoreHeight);
                    mat4.perspective(self.projMatrix, self.fov * .0174532925, self.viewer.aspect, .1, 5e3)
                }
            };
            self.onMouseDown = function(event) {
                if (event.which == 3 || event.ctrlKey) {
                    self.rightMouseDown = true
                } else {
                    self.mouseDown = true
                }
                if (event.type == "touchstart") {
                    self.mouseX = event.originalEvent.touches[0].clientX;
                    self.mouseY = event.originalEvent.touches[0].clientY
                } else {
                    self.mouseX = event.originalEvent.clientX;
                    self.mouseY = event.originalEvent.clientY
                }
                $("body").addClass("unselectable")
            };
            self.onMouseScroll = function(event) {
                if (event.originalEvent.detail > 0) {
                    self.distance *= 1.25
                } else {
                    self.distance *= .75
                }
                event.preventDefault();
                return false
            };
            self.onMouseWheel = function(event) {
                if (event.originalEvent.wheelDelta < 0) {
                    self.distance *= 1.25
                } else {
                    self.distance *= .75
                }
                event.preventDefault();
                return false
            };
            self.onMouseUp = function(event) {
                if (self.mouseDown || self.rightMouseDown) {
                    $("body").removeClass("unselectable");
                    self.mouseDown = false;
                    self.rightMouseDown = false
                }
            };
            self.onMouseMove = function(event) {
                if (!self.mouseDown && !self.rightMouseDown || self.mouseX === undefined) return;
                var x, y;
                if (event.type == "touchmove") {
                    event.preventDefault();
                    x = event.originalEvent.touches[0].clientX;
                    y = event.originalEvent.touches[0].clientY
                } else {
                    x = event.originalEvent.clientX;
                    y = event.originalEvent.clientY
                }
                var dx = (x - self.mouseX) / self.width * Math.PI * 2;
                var dy = (y - self.mouseY) / self.width * Math.PI * 2;
                if (self.mouseDown && !self.rightMouseDown) {
                    if (self.up[2] == 1) {
                        self.azimuth -= dx
                    } else {
                        self.azimuth += dx
                    }
                    self.zenith += dy;
                    var pi2 = Math.PI * 2;
                    while (self.azimuth < 0) self.azimuth += pi2;
                    while (self.azimuth > pi2) self.azimuth -= pi2;
                    if (self.zenith < 1e-4) self.zenith = 1e-4;
                    if (self.zenith >= Math.PI) self.zenith = Math.PI - 1e-4
                } else {
                    self.translation[0] += x - self.mouseX;
                    self.target[1] += y - self.mouseY
                }
                self.mouseX = x;
                self.mouseY = y
            };
            self.onContextMenu = function(event) {
                return false
            };
            self.canvas.on("mousedown touchstart", self.onMouseDown).on("DOMMouseScroll", self.onMouseScroll).on("mousewheel", self.onMouseWheel).on("dblclick", self.onDoubleClick).on("contextmenu", self.onContextMenu);
            $(window).on("resize", self.onFullscreen);
            $(document).on("mouseup touchend", self.onMouseUp).on("mousemove touchmove", self.onMouseMove)
        } else {
            self.canvas.attr({
                width: width,
                height: height
            });
            self.canvas.css({
                width: width + "px",
                height: height + "px"
            });
            self.context.viewport(0, 0, self.drawingBufferWidth, self.drawingBufferHeight)
        }
        if (self.options.background) {
            self.loadBackground()
        }
    },
    loadBackground: function() {
        var self = this,
        gl = self.context;
        var initVb = function() {
            self.vb = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, self.vb);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(16), gl.DYNAMIC_DRAW);
            var vs = self.compileShader(gl.VERTEX_SHADER, self.vertShader);
            var fs = self.compileShader(gl.FRAGMENT_SHADER, self.fragShader);
            var program = gl.createProgram();
            gl.attachShader(program, vs);
            gl.attachShader(program, fs);
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                console.error("Error linking shaders");
                return
            }
            self.vs = vs;
            self.fs = fs;
            self.program = program;
            self.uTexture = gl.getUniformLocation(program, "uTexture");
            self.aPosition = gl.getAttribLocation(program, "aPosition");
            self.aTexCoord = gl.getAttribLocation(program, "aTexCoord")
        };
        var updateVb = function() {
            var u = self.width / self.bgImg.width,
            v = self.height / self.bgImg.height;
            var vbData = [ - 1, -1, 0, v, 1, -1, u, v, -1, 1, 0, 0, 1, 1, u, 0];
            gl.bindBuffer(gl.ARRAY_BUFFER, self.vb);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(vbData))
        };
        if (!self.bgImg) {
            self.bgImg = new Image;
            self.bgImg.crossOrigin = "";
            self.bgImg.onload = function() {
                self.bgImg.loaded = true;
                self.bgTexture = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_2D, self.bgTexture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, self.bgImg);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                if (!self.vb) initVb();
                updateVb()
            };
            self.bgImg.onerror = function() {
                self.bgImg = null
            };
            self.bgImg.src = self.options.contentPath + self.options.background
        } else if (self.bgImg.loaded) {
            if (!self.vb) initVb();
            updateVb()
        }
    },
    vertShader: "    attribute vec2 aPosition;    attribute vec2 aTexCoord;        varying vec2 vTexCoord;        void main(void) {        vTexCoord = aTexCoord;        gl_Position = vec4(aPosition, 0, 1);    }    ",
    fragShader: "    precision mediump float;    varying vec2 vTexCoord;        uniform sampler2D uTexture;        void main(void) {        gl_FragColor = texture2D(uTexture, vTexCoord);    }    ",
    compileShader: function(type, source) {
        var self = this,
        gl = self.context;
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            throw "Shader compile error: " + gl.getShaderInfoLog(shader)
        }
        return shader
    }
};

ZamModelViewer.Lol = function() {};
ZamModelViewer.Lol.Model = function(renderer, viewer, model, index, parent) {
    var self = this;
    vec3.set(renderer.up, 0, 1, 0);
    self.renderer = renderer;
    self.viewer = viewer;
    self.model = model;
    self.modelIndex = index;
    self.loaded = false;
    self.animsLoaded = false;
    self.opts = self.viewer.options;
    self.meta = null;
    self.parent = parent || null;
    self.texture = null;
    self.meshTextures = {};
    self.animIndex = -1;
    self.animName = null;
    self.baseAnim = null;
    self.meshes = null;
    self.vertices = null;
    self.indices = null;
    self.transforms = null;
    self.bones = null;
    self.boneLookup = {};
    self.matrix = mat4.create();
    self.ib = null;
    self.shaderReady = false;
    self.vs = null;
    self.fs = null;
    self.program = null;
    self.uniforms = null;
    self.attribs = null;
    self.ambientColor = [.35, .35, .35, 1];
    self.primaryColor = [1, 1, 1, 1];
    self.secondaryColor = [.35, .35, .35, 1];
    self.lightDir1 = vec3.create();
    self.lightDir2 = vec3.create();
    self.lightDir3 = vec3.create();
    vec3.normalize(self.lightDir1, [5, 5, -5]);
    vec3.normalize(self.lightDir2, [5, 5, 5]);
    vec3.normalize(self.lightDir3, [ - 5, -5, -5]);
    self.animBounds = false;
    self.boundsCenter = [0, 0, 0];
    self.boundsSize = [0, 0, 0];
    self.boundsMin = [0, 0, 0];
    self.boundsMax = [0, 0, 0];
    self.modelOffset = 0;
    self.defaultDistance = 0;
    self.newAnimation = false;
    self.tmpMat = mat4.create();
    self.tmpVec = vec4.create();
    self.ANIMATED = true;
    self.hiddenBones = null;
    var hiddenBones = ZamModelViewer.Lol.Model.HiddenBones;
    if (hiddenBones[self.model.champion] !== undefined) {
        if (hiddenBones[self.model.champion][self.model.skin] !== undefined) {
            self.hiddenBones = hiddenBones[self.model.champion][self.model.skin]
        }
    }
    self.load()
};
ZamModelViewer.Models[ZamModelViewer.LOL] = ZamModelViewer.Lol.Model;
ZamModelViewer.Lol.Model.prototype = {
    external: {
        getNumAnimations: function() {
            return this.animations ? this.animations.length: 0
        },
        getAnimation: function(index) {
            this.animations.sort(function(a, b) {
                if (a.name < b.name) return - 1;
                if (a.name > b.name) return 1;
                return 0
            });
            if (this.animations && this.animations.length > index && index > -1) {
                return this.animations[index].name
            } else {
                return ""
            }
        },
        setAnimation: function(name) {
            for (i = 0; i < this.renderer.models.length; ++i) {
                this.renderer.models[i].setAnimation(name)
            }
        },
        isLoaded: function() {
            return this.loaded && this.animsLoaded
        }
    },
    destroy: function() {
        var self = this,
        gl = self.renderer.context,
        i, j;
        if (self.program) gl.deleteProgram(self.program);
        if (self.vs) gl.deleteShader(self.vs);
        if (self.fs) gl.deleteShader(self.fs);
        if (self.textures) {
            for (i = 0; i < self.textures.length; ++i) {
                self.textures[i].destroy()
            }
        }
        if (self.models) {
            for (i = 0; i < self.models.length; ++i) {
                self.models[i].destroy()
            }
        }
        if (self.geometry) {
            for (i = 0; i < self.geometry.length; ++i) {
                self.geometry[i].destroy()
            }
        }
    },
    getAnimation: function(name) {
        var self = this,
        i, animIndex = -1;
        if (!self.animations) return animIndex;
        name = name.toLowerCase();
        if (name == "idle" || name == "attack") {
            var anims = [],
            re = new RegExp(name + "[0-9]*");
            for (i = 0; i < self.animations.length; ++i) {
                if (self.animations[i].name.search(re) == 0) anims.push(i)
            }
            if (anims.length > 0) {
                animIndex = anims[Math.randomInt(0, anims.length)]
            }
        } else {
            for (i = 0; i < self.animations.length; ++i) {
                if (self.animations[i].name == name) {
                    animIndex = i;
                    break
                }
            }
        }
        return animIndex
    },
    setAnimation: function(name) {
        var self = this;
        self.animIndex = self.getAnimation(name);
        if (self.animIndex == -1) {
            if (name == "idle") {
                self.animIndex = 0;
                if (self.animations) {
                    self.animName = self.animations[0].name
                }
            } else {
                self.setAnimation("idle");
                return
            }
        } else {
            self.animName = name
        }
        var baseAnims = ZamModelViewer.Lol.Model.BaseAnimations;
        if (baseAnims[self.model.champion] !== undefined) {
            if (baseAnims[self.model.champion][self.model.skin] !== undefined) {
                var baseAnim = baseAnims[self.model.champion][self.model.skin],
                baseIndex = -1;
                if (baseAnim[self.animations[self.animIndex].name]) baseIndex = self.getAnimation(baseAnim[self.animations[self.animIndex].name]);
                else if (baseAnim["all"]) baseIndex = self.getAnimation(baseAnim["all"]);
                if (baseIndex > -1) self.baseAnim = self.animations[baseIndex];
                else self.baseAnim = null
            }
        }
        self.animTime = self.renderer.time;
        self.newAnimation = true
    },
    update: function() {
        var self = this,
        i, j, gl = self.renderer.context;
        if (!self.loaded || !self.vertices || !self.animations || self.animations.length == 0) return;
        if (self.animIndex == -1) self.setAnimation("idle");
        var time = self.renderer.time - self.animTime;
        var anim = self.animations[self.animIndex];
        if (time >= anim.duration) {
            self.setAnimation(self.animName);
            anim = self.animations[self.animIndex];
            time = 0
        }
        if (self.ANIMATED) {
            var timePerFrame = 1e3 / anim.fps;
            var frame = Math.floor(time / timePerFrame);
            var r = time % timePerFrame / timePerFrame;
            var hiddenBones = {};
            if (self.hiddenBones) {
                if (self.hiddenBones[anim.name]) hiddenBones = self.hiddenBones[anim.name];
                else if (self.hiddenBones["all"]) hiddenBones = self.hiddenBones["all"]
            }
            var b;
            if (self.version >= 1) {
                for (i = 0; i < self.bones.length; ++i) {
                    b = self.bones[i];
                    if (hiddenBones[b.name]) {
                        mat4.identity(self.tmpMat);
                        mat4.scale(self.tmpMat, self.tmpMat, vec3.set(self.tmpVec, 0, 0, 0));
                        mat4.copy(self.transforms[i], self.tmpMat)
                    } else if (anim.lookup[b.name] !== undefined) {
                        anim.bones[anim.lookup[b.name]].update(i, frame, r)
                    } else if (self.baseAnim && self.baseAnim.lookup[b.name] !== undefined) {
                        self.baseAnim.bones[self.baseAnim.lookup[b.name]].update(i, frame, r)
                    } else {
                        if (b.parent != -1) {
                            mat4.mulSlimDX(self.transforms[i], b.incrMatrix, self.transforms[b.parent])
                        } else {
                            mat4.copy(self.transforms[i], b.incrMatrix)
                        }
                    }
                }
            } else {
                for (i = 0; i < anim.bones.length; ++i) {
                    b = anim.bones[i];
                    if (self.boneLookup[b.bone] !== undefined) {
                        b.update(self.boneLookup[b.bone], frame, r)
                    } else {
                        var parentBone = anim.bones[i - 1];
                        if (!parentBone) continue;
                        if (parentBone.index + 1 < self.transforms.length) {
                            mat4.copy(self.transforms[parentBone.index + 1], self.transforms[parentBone.index])
                        }
                        b.index = parentBone.index + 1
                    }
                }
            }
            var numBones = Math.min(self.transforms.length, self.bones.length);
            for (i = 0; i < numBones; ++i) {
                mat4.mulSlimDX(self.transforms[i], self.bones[i].baseMatrix, self.transforms[i])
            }
            mat4.identity(self.tmpMat);
            var numVerts = self.vertices.length,
            vbData = self.vbData,
            vec = self.tmpVec,
            v, w, m, idx;
            for (i = 0; i < numVerts; ++i) {
                v = self.vertices[i];
                idx = i * 8;
                vbData[idx] = vbData[idx + 1] = vbData[idx + 2] = vbData[idx + 3] = vbData[idx + 4] = vbData[idx + 5] = 0;
                for (j = 0; j < 4; ++j) {
                    if (v.weights[j] > 0) {
                        w = v.weights[j];
                        m = anim.fps == 1 ? self.tmpMat: self.transforms[v.bones[j]];
                        vec3.transformMat4(vec, v.position, m);
                        vbData[idx] += vec[0] * w;
                        vbData[idx + 1] += vec[1] * w;
                        vbData[idx + 2] += vec[2] * w;
                        vec4.transformMat4(vec, v.normal, m);
                        vbData[idx + 3] += vec[0] * w;
                        vbData[idx + 4] += vec[1] * w;
                        vbData[idx + 5] += vec[2] * w
                    }
                }
            }
            if (!self.animBounds) {
                self.updateBounds(true);
                self.animBounds = true
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, self.vb);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, self.vbData)
        }
        if (self.newAnimation) {
            self.updateBounds(true);
            self.newAnimation = false
        }
    },
    updatePosition: function() {
        var self = this,
        index = self.modelIndex,
        offset = self.renderer.models[0].boundsSize[0] * 1.5;
        if (index > 2) {
            offset += Math.abs(self.renderer.models[index - 2].modelOffset)
        }
        if (self.modelIndex % 2 > 0) offset = -offset;
        self.modelOffset = offset;
        mat4.identity(self.matrix);
        mat4.translate(self.matrix, self.matrix, vec3.negate(self.tmpVec, self.boundsCenter));
        mat4.scale(self.matrix, self.matrix, vec3.set(self.tmpVec, -1, 1, 1));
        vec3.normalize(self.tmpVec, vec3.set(self.tmpVec, 4, 0, -1));
        vec3.scale(self.tmpVec, self.tmpVec, offset);
        if (offset < 0) self.tmpVec[2] = -self.tmpVec[2];
        self.matrix[12] += self.tmpVec[0];
        self.matrix[13] += self.tmpVec[1];
        self.matrix[14] += self.tmpVec[2]
    },
    updateBounds: function(useVb) {
        var self = this,
        i, j, m, idx, verts = self.vertices,
        vbData = self.vbData;
        var min = vec3.set(self.boundsMin, 9999, 9999, 9999),
        max = vec3.set(self.boundsMax, -9999, -9999, -9999),
        pos;
        if (!verts) return;
        if (self.meshes && self.indices) {
            var firstIndex, numIndices, visible;
            for (i = 0; i < self.meshes.length; ++i) {
                m = self.meshes[i];
                visible = !(self.meta && self.meta.meshVis[m.name] === false);
                if (!visible) continue;
                firstIndex = m.iStart;
                numIndices = m.iCount;
                for (j = 0; j < numIndices; ++j) {
                    if (useVb) {
                        idx = self.indices[firstIndex + j] * 8;
                        pos = vec3.set(self.tmpVec, vbData[idx], vbData[idx + 1], vbData[idx + 2])
                    } else {
                        pos = vec3.copy(self.tmpVec, verts[self.indices[firstIndex + j]].position)
                    }
                    if (pos[1] < -250) pos[1] = min[1];
                    min = vec3.min(min, min, pos);
                    max = vec3.max(max, max, pos)
                }
            }
        } else {
            for (i = 0; i < verts.length; ++i) {
                if (useVb) {
                    idx = i * 8;
                    pos = vec3.set(self.tmpVec, vbData[idx], vbData[idx + 1], vbData[idx + 2])
                } else {
                    pos = vec3.copy(self.tmpVec, verts[i].position)
                }
                if (pos[1] < -250) pos[1] = min[1];
                min = vec3.min(min, min, pos);
                max = vec3.max(max, max, pos)
            }
        }
        vec3.subtract(self.boundsSize, max, min);
        vec3.scaleAndAdd(self.boundsCenter, min, self.boundsSize, .5);
        vec3.copy(self.tmpVec, self.boundsCenter);
        self.tmpVec[1] = -self.tmpVec[1];
        mat4.identity(self.matrix);
        mat4.translate(self.matrix, self.matrix, self.tmpVec);
        mat4.scale(self.matrix, self.matrix, vec3.set(self.tmpVec, -1, 1, 1));
        var models = self.renderer.models;
        if (models.length > 1) {
            for (i = 1; i < models.length; ++i) {
                models[i].updatePosition()
            }
            if (self.modelIndex != 0) models[0].updateDistance()
        }
        if (self.modelIndex == 0) {
            self.updateDistance()
        }
    },
    updateDistance: function() {
        var self = this,
        models = self.renderer.models;
        var wSize = self.boundsSize[0],
        hSize = self.boundsSize[1],
        dSize = self.boundsSize[2];
        if (models.length > 1) {
            var width = Math.abs(models[models.length - 1].modelOffset) + models[models.length - 1].boundsSize[0];
            if (models.length > 2) {
                width += Math.abs(models[models.length - 2].modelOffset) + models[models.length - 2].boundsSize[0]
            } else {
                width *= 2
            }
            wSize = Math.max(wSize, width)
        }
        var dist;
        if (self.opts.dist) {
            dist = self.opts.dist
        } else {
            var ratio = self.renderer.width / self.renderer.height;
            var hTan = 2 * Math.tan(self.renderer.fov / 2 * .0174532925);
            var wTan = hTan * ratio;
            var hDist = hSize * 1.2 / hTan;
            var wDist = wSize * 1.2 / wTan;
            dist = Math.max(Math.max(hDist, wDist), dSize * 2)
        }
        if (self.defaultDistance == 0 || self.defaultDistance == self.renderer.distance) {
            self.defaultDistance = self.renderer.distance = dist
        }
    }
};
ZamModelViewer.Lol.Model.prototype.load = function() {
    var self = this;
    if (self.model && self.model.champion !== undefined && self.model.skin !== undefined) {
        self._load(self.model.champion, self.model.skin)
    }
};
ZamModelViewer.Lol.Model.prototype._load = function(champion, skin) {
    var self = this;
    self.champion = champion;
    self.skin = skin;
    $.getJSON(self.opts.contentPath + "meta/" + champion + "_" + skin + ".json",
    function(data) {
        self.loadMeta(data)
    });
    var url = self.opts.contentPath + "models/" + champion + "_" + skin + ".lmesh";
    $.ajax({
        url: url,
        type: "GET",
        dataType: "binary",
        responseType: "arraybuffer",
        processData: false,
        renderer: self.renderer,
        success: function(buffer) {
            self.loadMesh(buffer)
        },
        error: function(xhr, status, error) {
            console.log(error);
            alert("Model currently isn't loading! We're sorry and hope to have this fixed soon.")
        }
    })
};
ZamModelViewer.Lol.Model.prototype.loadMeta = function(meta) {
    var self = this;
    self.meta = meta;
    if (self.animations) self.updateBounds(self.animBounds);
    if (meta) {
        for (var t in meta.meshTextures) {
            self.meshTextures[t] = new ZamModelViewer.Lol.Texture(self, self.champion + "/" + meta.meshTextures[t] + ".png")
        }
    }
};
ZamModelViewer.Lol.Model.prototype.loadMesh = function(buffer) {
    if (!buffer) {
        console.error("Bad buffer for DataView");
        return
    }
    var self = this,
    r = new ZamModelViewer.DataView(buffer),
    i,
    v,
    idx,
    Lol = ZamModelViewer.Lol;
    var gl = self.renderer.context;
    try {
        var magic = r.getUint32();
        if (magic != 604210091) {
            console.log("Bad magic value");
            return
        }
    } catch(err) {
        alert("Model currently isn't loading! We're sorry and hope to have this fixed soon.");
        console.log(err);
        return
    }
    self.version = r.getUint32();
    var animFile = r.getString();
    var textureFile = r.getString();
    if (animFile && animFile.length > 0) {
        var url = self.opts.contentPath + "models/" + animFile + ".lanim";
        $.ajax({
            url: url,
            type: "GET",
            dataType: "binary",
            responseType: "arraybuffer",
            processData: false,
            renderer: self.renderer,
            success: function(buffer) {
                self.loadAnim(buffer)
            },
            error: function(xhr, status, error) {
                console.log(error);
                alert("Model currently isn't loading! We're sorry and hope to have this fixed soon.")
            }
        })
    }
    if (textureFile && textureFile.length > 0) {
        self.texture = new Lol.Texture(self, self.champion + "/" + textureFile + ".png")
    }
    var numMeshes = r.getUint32();
    if (numMeshes > 0) {
        self.meshes = new Array(numMeshes);
        for (i = 0; i < numMeshes; ++i) {
            var name = r.getString().toLowerCase();
            var vStart = r.getUint32();
            var vCount = r.getUint32();
            var iStart = r.getUint32();
            var iCount = r.getUint32();
            self.meshes[i] = {
                name: name,
                vStart: vStart,
                vCount: vCount,
                iStart: iStart,
                iCount: iCount
            }
        }
    }
    var numVerts = r.getUint32();
    if (numVerts > 0) {
        self.vertices = new Array(numVerts);
        self.vbData = new Float32Array(numVerts * 8);
        for (i = 0; i < numVerts; ++i) {
            idx = i * 8;
            self.vertices[i] = v = new Lol.Vertex(r);
            self.vbData[idx] = v.position[0];
            self.vbData[idx + 1] = v.position[1];
            self.vbData[idx + 2] = v.position[2];
            self.vbData[idx + 3] = v.normal[0];
            self.vbData[idx + 4] = v.normal[1];
            self.vbData[idx + 5] = v.normal[2];
            self.vbData[idx + 6] = v.u;
            self.vbData[idx + 7] = v.v
        }
    }
    var numIndices = r.getUint32();
    if (numIndices > 0) {
        self.indices = new Array(numIndices);
        for (i = 0; i < numIndices; ++i) {
            self.indices[i] = r.getUint16()
        }
    }
    var numBones = r.getUint32();
    if (numBones > 0) {
        self.transforms = new Array(numBones);
        self.bones = new Array(numBones);
        for (i = 0; i < numBones; ++i) {
            self.bones[i] = new Lol.Bone(self, i, r);
            if (self.boneLookup[self.bones[i].name] !== undefined) {
                self.bones[i].name = self.bones[i].name + "2"
            }
            self.boneLookup[self.bones[i].name] = i;
            self.transforms[i] = new mat4.create
        }
    }
    if (self.vbData) {
        self.vb = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, self.vb);
        gl.bufferData(gl.ARRAY_BUFFER, self.vbData, gl.DYNAMIC_DRAW)
    }
    if (self.indices) {
        self.ib = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, self.ib);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(self.indices), gl.STATIC_DRAW)
    }
    self.loaded = true;
    self.updateBounds()
};
ZamModelViewer.Lol.Model.prototype.loadAnim = function(buffer) {
    if (!buffer) {
        console.error("Bad buffer for DataView");
        return
    }
    var self = this,
    r = new ZamModelViewer.DataView(buffer),
    i,
    Lol = ZamModelViewer.Lol;
    var magic = r.getUint32();
    if (magic != 604210092) {
        console.log("Bad magic value");
        return
    }
    var version = r.getUint32();
    if (version >= 2) {
        var compressedData = new Uint8Array(buffer, r.position);
        var data = null;
        try {
            data = pako.inflate(compressedData)
        } catch(err) {
            console.log("Decompression error: " + err);
            return
        }
        r = new ZamModelViewer.DataView(data.buffer)
    }
    var numAnims = r.getUint32();
    if (numAnims > 0) {
        self.animations = new Array(numAnims);
        for (i = 0; i < numAnims; ++i) {
            self.animations[i] = new Lol.Animation(self, r, version)
        }
    }
    self.animsLoaded = true
};
ZamModelViewer.Lol.Model.prototype.draw = function() {
    var self = this,
    gl = self.renderer.context,
    i;
    if (!self.loaded) return;
    if (!self.shaderReady) self.initShader();
    if (!self.program) return;
    self.update();
    gl.useProgram(self.program);
    gl.uniformMatrix4fv(self.uniforms.vModelMatrix, false, self.matrix);
    gl.uniformMatrix4fv(self.uniforms.vViewMatrix, false, self.renderer.viewMatrix);
    gl.uniformMatrix4fv(self.uniforms.vProjMatrix, false, self.renderer.projMatrix);
    gl.uniform4fv(self.uniforms.fAmbientColor, self.ambientColor);
    gl.uniform4fv(self.uniforms.fPrimaryColor, self.primaryColor);
    gl.uniform4fv(self.uniforms.fSecondaryColor, self.secondaryColor);
    gl.uniform3fv(self.uniforms.fLightDir1, self.lightDir1);
    gl.uniform3fv(self.uniforms.fLightDir2, self.lightDir2);
    gl.uniform3fv(self.uniforms.fLightDir3, self.lightDir3);
    gl.uniform1i(self.uniforms.fTexture, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, self.vb);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, self.ib);
    var cull = gl.getParameter(gl.CULL_FACE);
    if (!cull) gl.enable(gl.CULL_FACE);
    var face = gl.getParameter(gl.FRONT_FACE);
    if (face != gl.CW) gl.frontFace(gl.CW);
    for (i in self.attribs) {
        var a = self.attribs[i];
        gl.enableVertexAttribArray(a.loc);
        gl.vertexAttribPointer(a.loc, a.size, a.type, false, a.stride, a.offset)
    }
    if (self.meshes) {
        var m, visible;
        for (i = 0; i < self.meshes.length; ++i) {
            m = self.meshes[i];
            visible = !(self.meta && self.meta.meshVis[m.name] === false);
            if (self.meta && self.meta.animMeshVis[self.animName] !== undefined && self.meta.animMeshVis[self.animName][m.name] !== undefined) visible = self.meta.animMeshVis[self.animName][m.name];
            if (!visible) continue;
            if (self.meshTextures[m.name] !== undefined) {
                if (self.meshTextures[m.name].texture) {
                    gl.uniform1i(self.uniforms.fHasTexture, true);
                    gl.bindTexture(gl.TEXTURE_2D, self.meshTextures[m.name].texture)
                } else {
                    gl.uniform1i(self.uniforms.fHasTexture, false)
                }
            } else if (self.texture && self.texture.texture) {
                gl.uniform1i(self.uniforms.fHasTexture, true);
                gl.bindTexture(gl.TEXTURE_2D, self.texture.texture)
            } else {
                gl.uniform1i(self.uniforms.fHasTexture, false)
            }
            gl.drawElements(gl.TRIANGLES, m.iCount, gl.UNSIGNED_SHORT, m.iStart * 2)
        }
    } else {
        if (self.texture && self.texture.texture) {
            gl.uniform1i(self.uniforms.fHasTexture, true);
            gl.bindTexture(gl.TEXTURE_2D, self.texture.texture)
        } else {
            gl.uniform1i(self.uniforms.fHasTexture, false)
        }
        gl.drawElements(gl.TRIANGLES, self.indices.length, gl.UNSIGNED_SHORT, 0)
    }
    for (i in self.attribs) {
        gl.disableVertexAttribArray(self.attribs[i].loc)
    }
    if (!cull) gl.disable(gl.CULL_FACE);
    if (face == gl.CCW) gl.frontFace(gl.CCW)
};
ZamModelViewer.Lol.Model.prototype.initShader = function() {
    var self = this,
    gl = self.renderer.context;
    self.shaderReady = true;
    var vs = self.renderer.compileShader(gl.VERTEX_SHADER, self.vertShader);
    var fs = self.renderer.compileShader(gl.FRAGMENT_SHADER, self.fragShader);
    var program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Error linking shaders");
        return
    }
    self.vs = vs;
    self.fs = fs;
    self.program = program;
    self.uniforms = {
        vModelMatrix: gl.getUniformLocation(program, "uModelMatrix"),
        vViewMatrix: gl.getUniformLocation(program, "uViewMatrix"),
        vProjMatrix: gl.getUniformLocation(program, "uProjMatrix"),
        fHasTexture: gl.getUniformLocation(program, "uHasTexture"),
        fAmbientColor: gl.getUniformLocation(program, "uAmbientColor"),
        fPrimaryColor: gl.getUniformLocation(program, "uPrimaryColor"),
        fSecondaryColor: gl.getUniformLocation(program, "uSecondaryColor"),
        fLightDir1: gl.getUniformLocation(program, "uLightDir1"),
        fLightDir2: gl.getUniformLocation(program, "uLightDir2"),
        fLightDir3: gl.getUniformLocation(program, "uLightDir3"),
        fTexture: gl.getUniformLocation(program, "uTexture")
    };
    self.attribs = {
        position: {
            loc: gl.getAttribLocation(program, "aPosition"),
            type: gl.FLOAT,
            size: 3,
            offset: 0,
            stride: 32
        },
        normal: {
            loc: gl.getAttribLocation(program, "aNormal"),
            type: gl.FLOAT,
            size: 3,
            offset: 12,
            stride: 32
        },
        texcoord: {
            loc: gl.getAttribLocation(program, "aTexCoord"),
            type: gl.FLOAT,
            size: 2,
            offset: 24,
            stride: 32
        }
    }
}; 
ZamModelViewer.Lol.Model.prototype.vertShader = "    attribute vec3 aPosition;    attribute vec3 aNormal;    attribute vec2 aTexCoord;        varying vec3 vNormal;    varying vec2 vTexCoord;        uniform mat4 uModelMatrix;    uniform mat4 uViewMatrix;    uniform mat4 uProjMatrix;        void main(void) {        gl_Position = uProjMatrix * uViewMatrix * uModelMatrix * vec4(aPosition, 1);        vNormal = mat3(uViewMatrix * uModelMatrix) * normalize(aNormal);        vTexCoord = aTexCoord;    }";
ZamModelViewer.Lol.Model.prototype.fragShader = "    precision mediump float;        varying vec3 vNormal;    varying vec2 vTexCoord;        uniform bool uHasTexture;    uniform vec4 uAmbientColor;    uniform vec4 uPrimaryColor;    uniform vec4 uSecondaryColor;    uniform vec3 uLightDir1;    uniform vec3 uLightDir2;    uniform vec3 uLightDir3;    uniform sampler2D uTexture;        void main(void) {        vec4 color = vec4(1, 1, 1, 1);        if (uHasTexture) {            color = texture2D(uTexture, vTexCoord.st);        } else {            color = vec4(vTexCoord.st, 0, 1);        }                vec4 litColor = uAmbientColor;        vec3 normal = normalize(vNormal);                float dp = max(0.0, dot(normal, uLightDir1));        litColor += uPrimaryColor * dp;                dp = max(0.0, dot(normal, uLightDir2));        litColor += uSecondaryColor * dp;                dp = max(0.0, dot(normal, uLightDir3));        litColor += uSecondaryColor * dp;                litColor = clamp(litColor, vec4(0,0,0,0), vec4(1,1,1,1));        color *= litColor;                gl_FragColor = color;    }";
ZamModelViewer.Lol.Texture = function(model, url) {
    var self = this;
    self.model = model;
    self.url = model.opts.contentPath + "textures/" + url;
    self.texture = null;
    self.load()
};
ZamModelViewer.Lol.Texture.prototype = {
    destroy: function() {
        var self = this,
        gl = self.model.renderer.context;
        if (self.texture) gl.deleteTexture(self.texture);
        self.img = null
    },
    load: function() {
        var self = this,
        gl = self.model.renderer.context; (function(self, gl) {
            self.img = new Image;
            self.img.crossOrigin = "";
            self.img.onload = function() {
                self.img.loaded = true;
                self.texture = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_2D, self.texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, self.img);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
            };
            self.img.onerror = function() {
                self.img = null;
                self.error = true
            };
            self.img.src = self.url
        })(self, gl)
    }
};
ZamModelViewer.Lol.Vertex = function(r) {
    var self = this,
    i;
    self.position = [r.getFloat(), r.getFloat(), r.getFloat()];
    self.normal = [r.getFloat(), r.getFloat(), r.getFloat(), 0];
    self.u = r.getFloat();
    self.v = r.getFloat();
    self.bones = new Array(4);
    for (i = 0; i < 4; ++i) self.bones[i] = r.getUint8();
    self.weights = new Array(4);
    for (i = 0; i < 4; ++i) self.weights[i] = r.getFloat()
};
ZamModelViewer.Lol.Bone = function(model, index, r) {
    var self = this,
    i;
    self.model = model;
    self.index = index;
    self.name = r.getString().toLowerCase();
    self.parent = r.getInt32();
    self.scale = r.getFloat();
    self.origMatrix = mat4.create();
    for (i = 0; i < 16; ++i) self.origMatrix[i] = r.getFloat();
    self.baseMatrix = mat4.clone(self.origMatrix);
    mat4.transpose(self.baseMatrix, self.baseMatrix);
    mat4.invert(self.baseMatrix, self.baseMatrix);
    mat4.transpose(self.origMatrix, self.origMatrix);
    self.incrMatrix = mat4.create();
    if (model.version >= 2) {
        for (i = 0; i < 16; ++i) self.incrMatrix[i] = r.getFloat();
        mat4.transpose(self.incrMatrix, self.incrMatrix)
    } else {
        mat4.identity(self.incrMatrix)
    }
};
ZamModelViewer.Lol.Animation = function(model, r, version) {
    var self = this,
    i, Lol = ZamModelViewer.Lol;
    self.model = model;
    self.meshOverride = {};
    self.name = r.getString().toLowerCase();
    self.fps = r.getInt32();
    var numBones = r.getUint32();
    self.bones = new Array(numBones);
    self.lookup = {};
    for (i = 0; i < numBones; ++i) {
        self.bones[i] = new Lol.AnimationBone(model, self, r, version);
        self.lookup[self.bones[i].bone] = i
    }
    if (numBones == 0 || self.fps <= 1) {
        self.duration = 1e3
    } else {
        self.duration = Math.floor(1e3 * (self.bones[0].frames.length / self.fps))
    }
};
ZamModelViewer.Lol.AnimationBone = function(model, anim, r, version) {
    var self = this;
    self.model = model;
    self.anim = anim;
    var numFrames = r.getUint32();
    self.bone = r.getString().toLowerCase();
    self.flags = r.getUint32();
    self.frames = new Array(numFrames);
    var scale = [1, 1, 1];
    for (var i = 0; i < numFrames; ++i) {
        var pos = [r.getFloat(), r.getFloat(), r.getFloat()];
        var rot = [r.getFloat(), r.getFloat(), r.getFloat(), r.getFloat()];
        if (version >= 3) scale = [r.getFloat(), r.getFloat(), r.getFloat()];
        self.frames[i] = {
            pos: pos,
            rot: rot,
            scale: scale
        }
    }
    self.matrix = mat4.create();
    self.tmpMat = mat4.create();
    self.tmpMat2 = mat4.create();
    self.tmpPos = vec3.create();
    self.tmpRot = quat.create();
    self.tmpScale = vec3.create()
};
ZamModelViewer.Lol.AnimationBone.prototype.update = function(boneId, frame, r) {
    var self = this;
    self.index = boneId;
    var parent = self.model.bones[boneId].parent;
    var f0 = frame % self.frames.length,
    f1 = (frame + 1) % self.frames.length;
    vec3.lerp(self.tmpPos, self.frames[f0].pos, self.frames[f1].pos, r);
    vec3.lerp(self.tmpScale, self.frames[f0].scale, self.frames[f1].scale, r);
    quat.slerp(self.tmpRot, self.frames[f0].rot, self.frames[f1].rot, r);
    mat4.translation(self.tmpMat2, self.tmpPos);
    mat4.rotationQuat(self.tmpMat, self.tmpRot);
    mat4.mulSlimDX(self.matrix, self.tmpMat, self.tmpMat2);
    if (parent != -1) {
        mat4.mulSlimDX(self.matrix, self.matrix, self.model.transforms[parent])
    }
    mat4.copy(self.model.transforms[boneId], self.matrix)
};
ZamModelViewer.Lol.Model.BaseAnimations = {
    19 : {
        0 : {
            all: "idle"
        }
    },
    32 : {
        4 : {
            all: "idle1_bow",
            idle1_bow: "idle1"
        }
    },
    55 : {
        7 : {
            idle1_candycane_below: "idle1"
        }
    }
};
ZamModelViewer.Lol.Model.HiddenBones = {
    12 : {
        9 : {
            recall: {},
            all: {
                recall_chair: true
            }
        },
        10 : {
            recall: {
                cowbell: true,
                stick: true
            },
            dancein: {
                cata_root: true,
                catb_root: true,
                catc_root: true,
                cork: true,
                bowl: true,
                bowl_milk: true,
                milk_root: true,
                bottle: true
            },
            danceloop: {
                cata_root: true,
                catb_root: true,
                catc_root: true,
                cork: true,
                bowl: true,
                bowl_milk: true,
                milk_root: true,
                bottle: true
            },
            all: {}
        },
        11 : {
            recall: {
                cowbell: true,
                stick: true
            },
            dancein: {
                cata_root: true,
                catb_root: true,
                catc_root: true,
                cork: true,
                bowl: true,
                bowl_milk: true,
                milk_root: true,
                bottle: true
            },
            danceloop: {
                cata_root: true,
                catb_root: true,
                catc_root: true,
                cork: true,
                bowl: true,
                bowl_milk: true,
                milk_root: true,
                bottle: true
            },
            all: {}
        },
        12 : {
            recall: {
                cowbell: true,
                stick: true
            },
            dancein: {
                cata_root: true,
                catb_root: true,
                catc_root: true,
                cork: true,
                bowl: true,
                bowl_milk: true,
                milk_root: true,
                bottle: true
            },
            danceloop: {
                cata_root: true,
                catb_root: true,
                catc_root: true,
                cork: true,
                bowl: true,
                bowl_milk: true,
                milk_root: true,
                bottle: true
            },
            all: {}
        },
        13 : {
            recall: {
                cowbell: true,
                stick: true
            },
            dancein: {
                cata_root: true,
                catb_root: true,
                catc_root: true,
                cork: true,
                bowl: true,
                bowl_milk: true,
                milk_root: true,
                bottle: true
            },
            danceloop: {
                cata_root: true,
                catb_root: true,
                catc_root: true,
                cork: true,
                bowl: true,
                bowl_milk: true,
                milk_root: true,
                bottle: true
            },
            all: {}
        },
        14 : {
            recall: {
                cowbell: true,
                stick: true
            },
            dancein: {
                cata_root: true,
                catb_root: true,
                catc_root: true,
                cork: true,
                bowl: true,
                bowl_milk: true,
                milk_root: true,
                bottle: true
            },
            danceloop: {
                cata_root: true,
                catb_root: true,
                catc_root: true,
                cork: true,
                bowl: true,
                bowl_milk: true,
                milk_root: true,
                bottle: true
            },
            all: {}
        },
        15 : {
            recall: {
                cowbell: true,
                stick: true
            },
            dancein: {
                cata_root: true,
                catb_root: true,
                catc_root: true,
                cork: true,
                bowl: true,
                bowl_milk: true,
                milk_root: true,
                bottle: true
            },
            danceloop: {
                cata_root: true,
                catb_root: true,
                catc_root: true,
                cork: true,
                bowl: true,
                bowl_milk: true,
                milk_root: true,
                bottle: true
            },
            all: {}
        },
        16 : {
            recall: {
                cowbell: true,
                stick: true
            },
            dancein: {
                cata_root: true,
                catb_root: true,
                catc_root: true,
                cork: true,
                bowl: true,
                bowl_milk: true,
                milk_root: true,
                bottle: true
            },
            danceloop: {
                cata_root: true,
                catb_root: true,
                catc_root: true,
                cork: true,
                bowl: true,
                bowl_milk: true,
                milk_root: true,
                bottle: true
            },
            all: {}
        },
        17 : {
            recall: {
                cowbell: true,
                stick: true
            },
            dancein: {
                cata_root: true,
                catb_root: true,
                catc_root: true,
                cork: true,
                bowl: true,
                bowl_milk: true,
                milk_root: true,
                bottle: true
            },
            danceloop: {
                cata_root: true,
                catb_root: true,
                catc_root: true,
                cork: true,
                bowl: true,
                bowl_milk: true,
                milk_root: true,
                bottle: true
            },
            all: {}
        },
        18 : {
            recall: {
                cowbell: true,
                stick: true
            },
            dancein: {
                cata_root: true,
                catb_root: true,
                catc_root: true,
                cork: true,
                bowl: true,
                bowl_milk: true,
                milk_root: true,
                bottle: true
            },
            danceloop: {
                cata_root: true,
                catb_root: true,
                catc_root: true,
                cork: true,
                bowl: true,
                bowl_milk: true,
                milk_root: true,
                bottle: true
            },
            all: {}
        }
    },
    21 : {
        9 : {
            all: {
                orange: true
            },
            recall: {
                l_weapon: true,
                r_weapon: true
            }
        },
        10 : {
            recall: {},
            all: {
                tv_joint: true,
                tv_rabit_ears_joints: true
            }
        },
        11 : {
            recall: {},
            all: {
                tv_joint: true,
                tv_rabit_ears_joints: true
            }
        },
        12 : {
            recall: {},
            all: {
                tv_joint: true,
                tv_rabit_ears_joints: true
            }
        },
        13 : {
            recall: {},
            all: {
                tv_joint: true,
                tv_rabit_ears_joints: true
            }
        },
        14 : {
            recall: {},
            all: {
                tv_joint: true,
                tv_rabit_ears_joints: true
            }
        }
    },
    22 : {
        8 : {
            all: {
                c_drone_base: true
            },
            joke: {},
            dance: {}
        }
    },
    36 : {
        9 : {
            all: {
                recall_chair: true
            },
            recall: {}
        }
    },
    41 : {
        0 : {
            all: {
                orange1: true,
                orange2: true,
                orange3: true
            },
            joke: {}
        },
        1 : {
            all: {
                orange1: true,
                orange2: true,
                orange3: true
            },
            joke: {}
        },
        2 : {
            all: {
                orange1: true,
                orange2: true,
                orange3: true
            },
            joke: {}
        },
        3 : {
            all: {
                orange1: true,
                orange2: true,
                orange3: true
            },
            joke: {}
        },
        4 : {
            all: {
                orange1: true,
                orange2: true,
                orange3: true
            },
            joke: {}
        },
        5 : {
            all: {
                orange1: true,
                orange2: true,
                orange3: true
            },
            joke: {}
        },
        6 : {
            all: {
                orange1: true,
                orange2: true,
                orange3: true
            },
            joke: {}
        },
        7 : {
            all: {
                orange1: true,
                orange2: true,
                orange3: true
            },
            joke: {}
        }
    },
    44 : {
        4 : {
            all: {
                jacket: true
            },
            dance: {
                jacket: true,
                weapon: true
            },
            recall: {
                weapon: true
            }
        }
    },
    55 : {
        7 : {
            recall: {},
            all: {
                xmas_pole_skin07: true
            }
        }
    },
    61 : {
        7 : {
            recall: {},
            all: {
                planet1: true,
                planet2: true,
                planet3: true,
                planet4: true,
                planet5: true,
                planet6: true
            }
        }
    },
    69 : {
        4 : {
            all: {
                l_fan: true,
                r_fan: true
            },
            recall: {}
        }
    },
    80 : {
        8 : {
            all: {
                oven: true
            },
            recall: {}
        }
    },
    83 : {
        0 : {
            all: {},
            idle2: {
                weapon: true
            }
        },
        1 : {
            all: {},
            idle2: {
                weapon: true
            }
        },
        2 : {
            all: {},
            idle2: {
                weapon: true
            }
        }
    },
    103 : {
        7 : {
            recall: {},
            all: {
                arcade: true
            }
        }
    },
    114 : {
        5 : {
            all: {
                weapon_krab: true,
                root_krab: true
            },
            recall: {}
        }
    },
    115 : {
        4 : {
            all: {
                sled: true
            },
            satcheljump: {
                bomb: true,
                bomb_b: true
            }
        }
    },
    119 : {
        4 : {
            all: {
                chair_root: true,
                sun_reflector_root: true
            },
            recall: {}
        }
    },
    136 : {
        0 : {
            all: {
                shades_sunglass: true
            },
            joke: {}
        },
        1 : {
            all: {
                shades_sunglass: true
            },
            joke: {}
        }
    },
    143 : {
        4 : {
            attack1: {
                r_wing: true,
                l_wing: true
            },
            attack2: {
                r_wing: true,
                l_wing: true
            },
            dance: {
                r_wing: true,
                l_wing: true
            },
            idle1: {
                r_wing: true,
                l_wing: true
            },
            idle3: {
                r_wing: true,
                l_wing: true
            },
            idle4: {
                r_wing: true,
                l_wing: true
            },
            laugh: {
                r_wing: true,
                l_wing: true
            },
            run: {
                r_wing: true,
                l_wing: true
            },
            spell2: {
                r_wing: true,
                l_wing: true
            },
            all: {}
        }
    },
    157 : {
        4 : {
            all: {
                flute: true
            },
            dance: {}
        },
        5 : {
            all: {
                flute: true
            },
            dance: {}
        },
        6 : {
            all: {
                flute: true
            },
            dance: {}
        },
        7 : {
            all: {
                flute: true
            },
            dance: {}
        },
        8 : {
            all: {
                flute: true
            },
            dance: {}
        }
    },
    201 : {
        3 : {
            all: {
                poro: true
            }
        }
    },
    222 : {
        4 : {
            all: {
                rocket_launcher: true
            },
            r_attack1: {},
            r_attack2: {},
            r_idle1: {},
            r_idle_in: {},
            r_run: {},
            r_run_fast: {},
            r_run_haste: {},
            r_spell2: {},
            r_spell3: {},
            r_spell3_run: {},
            r_spell4: {},
            respawn_trans_rlauncher: {},
            rlauncher_spell3: {},
            spell1a: {}
        }
    },
    238 : {
        10 : {
            all: {
                chair_skin10: true,
                step1_skin10: true,
                step2_skin10: true
            },
            recall: {}
        }
    },
    245 : {
        0 : {
            deathrespawn: {},
            all: {
                book_pen: true
            }
        },
        1 : {
            deathrespawn: {},
            all: {
                book_pen: true
            }
        },
        2 : {
            deathrespawn: {},
            all: {
                book_pen: true
            }
        },
        3 : {
            deathrespawn: {},
            all: {
                book_pen: true
            }
        },
        4 : {
            deathrespawn: {},
            all: {
                book_pen: true
            }
        },
        5 : {
            deathrespawn: {},
            all: {
                book_pen: true
            }
        },
        6 : {
            deathrespawn: {},
            all: {
                book_pen: true
            }
        },
        7 : {
            deathrespawn: {},
            all: {
                book_pen: true
            }
        },
        8 : {
            deathrespawn: {},
            all: {
                book_pen: true
            }
        },
        9 : {
            deathrespawn: {},
            all: {
                book_pen: true
            }
        },
        10 : {
            deathrespawn: {},
            all: {
                book_pen: true
            }
        }
    },
    254 : {
        0 : {
            all: {
                teacup: true
            },
            taunt2: {}
        },
        1 : {
            all: {
                teacup: true
            },
            taunt2: {}
        },
        3 : {
            all: {
                teacup: true
            },
            taunt2: {}
        },
        4 : {
            all: {
                teacup: true
            },
            taunt2: {}
        }
    },
    412 : {
        1 : {
            all: {
                coin1: true,
                coin2: true,
                coin3: true,
                coin4: true,
                coin5: true,
                coin6: true,
                coin7: true,
                treasure_chest: true,
                treasure_chest_cover: true,
                tire: true
            },
            recall: {
                tire: true
            },
            undersea_recall_loop: {
                tire: true
            },
            undersea_recall_loop2: {
                coin1: true,
                coin2: true,
                coin3: true,
                coin4: true,
                coin5: true,
                coin6: true,
                coin7: true,
                treasure_chest: true,
                treasure_chest_cover: true
            },
            undersea_recall_windup: {
                tire: true
            },
            undersea_recall_windup2: {
                coin1: true,
                coin2: true,
                coin3: true,
                coin4: true,
                coin5: true,
                coin6: true,
                coin7: true,
                treasure_chest: true,
                treasure_chest_cover: true
            }
        },
        5 : {
            all: {
                mini_root: true
            },
            joke: {}
        }
    },
    420 : {
        0 : {
            all: {
                c_tentacle1: true
            }
        },
        1 : {
            all: {
                c_tentacle1: true
            }
        }
    },
    429 : {
        3 : {
            death: {
                altar_spear: true,
                buffbone_cstm_back_spear1: true,
                buffbone_cstm_back_spear2: true,
                buffbone_cstm_back_spear3: true
            }
        }
    },
    432 : {
        0 : {
            all: {
                follower_root: true
            },
            dance: {}
        },
        2 : {
            all: {
                follower_root: true
            },
            dance: {}
        },
        3 : {
            all: {
                follower_root: true
            },
            dance: {}
        },
        4 : {
            all: {
                follower_root: true
            },
            dance: {}
        }
    },
    gnarbig: {
        0 : {
            all: {
                rock: true
            },
            spell1: {},
            laugh: {}
        },
        1 : {
            all: {
                rock: true
            },
            spell1: {},
            laugh: {}
        },
        2 : {
            all: {
                rock: true,
                cane_bot: true,
                cane_top: true
            },
            spell1: {
                cane_bot: true,
                cane_top: true
            },
            laugh: {
                cane_bot: true,
                cane_top: true
            },
            recall: {
                rock: true
            }
        },
        3 : {
            all: {
                rock: true
            },
            spell1: {},
            laugh: {}
        },
        4 : {
            all: {
                rock: true
            },
            spell1: {},
            laugh: {}
        },
        5 : {
            all: {
                rock: true
            },
            spell1: {},
            laugh: {}
        },
        6 : {
            all: {
                rock: true
            },
            spell1: {},
            laugh: {}
        },
        7 : {
            all: {
                rock: true
            },
            spell1: {},
            laugh: {}
        },
        8 : {
            all: {
                rock: true
            },
            spell1: {},
            laugh: {}
        },
        9 : {
            all: {
                rock: true
            },
            spell1: {},
            laugh: {}
        },
        10 : {
            all: {
                rock: true
            },
            spell1: {},
            laugh: {}
        },
        11 : {
            all: {
                rock: true
            },
            spell1: {},
            laugh: {}
        },
        12 : {
            all: {
                rock: true
            },
            spell1: {},
            laugh: {}
        }
    }
};
