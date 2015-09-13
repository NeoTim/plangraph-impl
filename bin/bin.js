"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _get = function get(_x17, _x18, _x19) { var _again = true; _function: while (_again) { var object = _x17, property = _x18, receiver = _x19; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x17 = parent; _x18 = property; _x19 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var test = "a";

var ActualSet = (function () {
    function ActualSet(hasher, source) {
        _classCallCheck(this, ActualSet);

        this.map = new Map();
        if (hasher[ActualSet.hash]) this.hasher = hasher[ActualSet.hash];else this.hasher = hasher;
        if (source !== undefined) for (var e of source) {
            this.add(e);
        }
    }

    _createClass(ActualSet, [{
        key: "add",
        value: function add(item) {
            this.map.set(this.hasher(item), item);
            return this;
        }
    }, {
        key: "clear",
        value: function clear() {
            this.map.clear();
            return this;
        }
    }, {
        key: "delete",
        value: function _delete(item) {
            return this.map["delete"](this.hasher(item));
        }
    }, {
        key: "entries",
        value: function entries() {
            var realIt = this.map.values();
            var it = {
                next: realIt.next.bind(realIt),
                "return": realIt["return"].bind(realIt),
                "throw": realIt["throw"].bind(realIt)
            };
            var it2 = it;
            it2[Symbol.iterator] = function () {
                return it2;
            };
            return it2;
        }
    }, {
        key: Symbol.iterator,
        value: function value() {
            return this.map.values();
        }
    }, {
        key: "has",
        value: function has(item) {
            return this.map.has(this.hasher(item));
        }
    }, {
        key: "forEach",
        value: function forEach(callbackfn) {
            var thisArg = arguments.length <= 1 || arguments[1] === undefined ? this : arguments[1];

            for (var v of this) {
                callbackfn.call(thisArg, v, v);
            }
        }
    }, {
        key: "keys",
        value: function keys() {
            return this.map.values();
        }
    }, {
        key: "values",
        value: function values() {
            return this.map.values();
        }
    }, {
        key: "some",
        value: function some(predicate) {
            for (var t of this.map.values()) {
                if (predicate(t)) return true;
            }return false;
        }
    }, {
        key: "size",
        get: function get() {
            return this.map.size;
        }
    }, {
        key: "asPredicate",
        get: function get() {
            return this.has.bind(this);
        }
    }, {
        key: Symbol.toStringTag,
        get: function get() {
            return this.map[Symbol.toStringTag];
        }
    }]);

    return ActualSet;
})();

ActualSet.hash = Symbol("hasher for ActualSet");
var Util;
(function (Util) {
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
    Util.rgbToHex = rgbToHex;
    // Based on http://stackoverflow.com/a/565282/64009
    function intersect(a, b) {
        function cross(_ref, p2) {
            var x = _ref.x;
            var y = _ref.y;

            return x * p2.y - y * p2.x;
        }
        // Check if the segments are exactly the same (or just reversed).
        if (a[0] === b[0] && a[1] === b[1] || a[0] === b[1] && a[1] === b[0]) return true;
        // Represent the segments as p + tr and q + us, where t and u are scalar
        // parameters.
        var p = a[0],
            r = { x: a[1].x - p.x, y: a[1].y - p.y },
            q = b[0],
            s = { x: b[1].x - q.x, y: b[1].y - q.y };
        var rxs = cross(r, s),
            q_p = { x: q.x - p.x, y: q.y - p.y },
            t = cross(q_p, s) / rxs,
            u = cross(q_p, r) / rxs,
            epsilon = 1e-6;
        return t > epsilon && t < 1 - epsilon && u > epsilon && u < 1 - epsilon;
    }
    Util.intersect = intersect;
    function findIntersection(line1a, line1b, line2a, line2b) {
        var denominator = (line2b.y - line2a.y) * (line1b.x - line1a.x) - (line2b.x - line2a.x) * (line1b.y - line1a.y);
        if (denominator == 0) {
            return null;
        }
        var a = line1a.y - line2a.y;
        var b = line1a.x - line2a.x;
        var numerator1 = (line2b.x - line2a.x) * a - (line2b.y - line2a.y) * b;
        var numerator2 = (line1b.x - line1a.x) * a - (line1b.y - line1a.y) * b;
        a = numerator1 / denominator;
        b = numerator2 / denominator;
        return {
            // if we cast these lines infinitely in both directions, they intersect here:
            x: line1a.x + a * (line1b.x - line1a.x),
            y: line1a.y + a * (line1b.y - line1a.y),
            /*
                    // it is worth noting that this should be the same as:
                    x = line2a.x + (b * (line2b.x - line2a.x));
                    y = line2a.x + (b * (line2b.y - line2a.y));
                    */
            // if line1 is a segment and line2 is infinite, they intersect if:
            onLine1: a > 0 && a < 1,
            // if line2 is a segment and line1 is infinite, they intersect if:
            onLine2: b > 0 && b < 1
        };
    }
    Util.findIntersection = findIntersection;
    ;
    function array(size, supplier) {
        var arr = new Array(size);
        for (var i = 0; i < arr.length; i++) {
            arr[i] = supplier(i);
        }return arr;
    }
    Util.array = array;
    function shuffle(array) {
        var currentIndex = array.length;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            var randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            var _ref2 = [array[randomIndex], array[currentIndex]];
            array[currentIndex] = _ref2[0];
            array[randomIndex] = _ref2[1];
        }
        return array;
    }
    Util.shuffle = shuffle;
    function flatten(array) {
        return array.reduce(function (a, b) {
            return a.concat(b);
        }, []);
    }
    Util.flatten = flatten;
    function randomChoice(array) {
        return array[Math.random() * array.length | 0];
    }
    Util.randomChoice = randomChoice;
    function lineCenter(p, q) {
        return { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
    }
    Util.lineCenter = lineCenter;
    function linePerpendicular(p, q) {
        var _lineDistance = lineDistance(p, q);

        var _lineDistance2 = _slicedToArray(_lineDistance, 3);

        var dx = _lineDistance2[0];
        var dy = _lineDistance2[1];
        var dist = _lineDistance2[2];

        dx /= dist, dy /= dist;
        return { x: dy, y: -dx };
    }
    Util.linePerpendicular = linePerpendicular;
    function lineDistance(_ref3, _ref4) {
        var x1 = _ref3.x;
        var y1 = _ref3.y;
        var x2 = _ref4.x;
        var y2 = _ref4.y;

        var dx = x1 - x2,
            dy = y1 - y2;
        var dist = Math.sqrt(dx * dx + dy * dy);
        dx /= dist, dy /= dist;
        return [dx, dy, dist];
    }
    Util.lineDistance = lineDistance;
    function polygonConvex(p) {
        console.log(p);
        var l = p.length;
        for (var i = 0; i < l; i++) {
            var p1 = p[i],
                p2 = p[(i + 1) % l],
                p3 = p[(i + 2) % l];
            if (!pointsConvex(p1, p2, p3)) return false;
        }
        return true;
    }
    Util.polygonConvex = polygonConvex;
    function pointsConvex(_ref5, _ref6, _ref7) {
        var x0 = _ref5.x;
        var y0 = _ref5.y;
        var x1 = _ref6.x;
        var y1 = _ref6.y;
        var x2 = _ref7.x;
        var y2 = _ref7.y;

        var dx1 = x1 - x0;
        var dy1 = y1 - y0;
        var dx2 = x2 - x1;
        var dy2 = y2 - y1;
        var zcrossproduct = dx1 * dy2 - dy1 * dx2;
        return zcrossproduct <= 0;
    }
    Util.pointsConvex = pointsConvex;
    /*export function findAngle(p1: Point, p2: Point, p3: Point) {
        // invert - because of screen coordinates
        return (Math.atan2(-(p1.y - p2.y), p1.x - p2.x) - Math.atan2(-(p3.y - p2.y), p3.x - p2.x)) * 180 / Math.PI;
    }*/
    function polygonCentroid(vertices) {
        var l = vertices.length;
        var centroid = { x: 0, y: 0 };
        var signedArea = 0.0;
        var x0 = 0.0; // Current vertex X
        var y0 = 0.0; // Current vertex Y
        var x1 = 0.0; // Next vertex X
        var y1 = 0.0; // Next vertex Y
        var a = 0.0; // Partial signed area
        // For all vertices except last
        for (var i = 0; i < vertices.length; ++i) {
            x0 = vertices[i].x;
            y0 = vertices[i].y;
            x1 = vertices[(i + 1) % l].x;
            y1 = vertices[(i + 1) % l].y;
            a = x0 * y1 - x1 * y0;
            signedArea += a;
            centroid.x += (x0 + x1) * a;
            centroid.y += (y0 + y1) * a;
        }
        signedArea *= 0.5;
        centroid.x /= 6.0 * signedArea;
        centroid.y /= 6.0 * signedArea;
        return centroid;
    }
    Util.polygonCentroid = polygonCentroid;
    function polygonKernel(points) {
        // find kernel of containing facet. (lul)
        var minx = points.reduce(function (min, p) {
            return Math.min(min, p.x);
        }, Infinity);
        var maxx = points.reduce(function (max, p) {
            return Math.max(max, p.x);
        }, -Infinity);
        var miny = points.reduce(function (min, p) {
            return Math.min(min, p.y);
        }, Infinity);
        var maxy = points.reduce(function (max, p) {
            return Math.max(max, p.y);
        }, -Infinity);
        var pointsForVisPoly = points.map(function (p) {
            return [p.x, p.y];
        }).reverse();
        var inxMap = new Map(pointsForVisPoly.map(function (v, i) {
            return ["" + v, i];
        }));
        var polyIsSame = function polyIsSame(poly) {
            if (pointsForVisPoly.length !== poly.length) return false;
            var offset = inxMap.get(poly[0] + "");
            for (var i = 0; i < poly.length; i++) {
                var p1 = poly[i];
                var p2 = pointsForVisPoly[(i + offset) % poly.length];
                if (!p2) return false;
                if (p1[0] !== p2[0] || p1[1] !== p2[1]) return false;
            }
            return true;
        };
        var segments = VisibilityPolygon.convertToSegments([pointsForVisPoly]);
        var x = undefined,
            y = undefined;
        console.log("searching for ", points, segments);
        while (true) {
            x = Math.random() * (maxx - minx) + minx;
            y = Math.random() * (maxy - miny) + miny;
            if (VisibilityPolygon.inPolygon([x, y], pointsForVisPoly)) {
                try {
                    if (polyIsSame(VisibilityPolygon.compute([x, y], segments))) break;
                } catch (e) {
                    // sometimes fails when point to close to edge
                    continue;
                }
            }
        }
        return { x: x, y: y };
    }
    Util.polygonKernel = polygonKernel;
})(Util || (Util = {}));

var Edge = (function () {
    function Edge(v1, v2) {
        var _this = this;

        _classCallCheck(this, Edge);

        this.v1 = v1;
        this.v2 = v2;
        this.toString = function () {
            return _this.id;
        };
    }

    _createClass(Edge, [{
        key: "id",
        get: function get() {
            return "e" + this.v1.id + "-" + this.v2.id;
        }
    }], [{
        key: "undirected",
        value: function undirected(v1, v2) {
            if (v1.id > v2.id) {
                return new Edge(v2, v1);
            }
            return new Edge(v1, v2);
        }
    }, {
        key: "ordered",
        value: function ordered(v1, v2) {
            return new Edge(v1, v2);
        }
    }, {
        key: ActualSet.hash,
        value: function value(e) {
            if (!(e instanceof Edge)) throw new Error("assertion error");
            return e.id;
        }
    }, {
        key: "Set",
        value: function Set() {
            for (var _len = arguments.length, e = Array(_len), _key = 0; _key < _len; _key++) {
                e[_key] = arguments[_key];
            }

            return new ActualSet(Edge, e);
        }
    }]);

    return Edge;
})();

var Vertex = (function () {
    function Vertex() {
        var _this2 = this;

        _classCallCheck(this, Vertex);

        this.toString = function () {
            return _this2.sigmaId;
        };
        this.id = Vertex.counter++;
    }

    _createClass(Vertex, [{
        key: "sigmaId",
        get: function get() {
            return "" + this.id;
        }
    }], [{
        key: ActualSet.hash,
        value: function value(v) {
            if (!(v instanceof Vertex)) throw new Error("assertion error");
            return v.sigmaId;
        }
    }, {
        key: "Set",
        value: function Set() {
            for (var _len2 = arguments.length, v = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                v[_key2] = arguments[_key2];
            }

            return new ActualSet(Vertex, v);
        }
    }]);

    return Vertex;
})();

Vertex.counter = 0;

var Graph = (function () {
    function Graph() {
        var V = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
        var E = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

        _classCallCheck(this, Graph);

        this.V = Vertex.Set.apply(Vertex, _toConsumableArray(V));
        this.E = new Map(E);
        for (var v of this.V) {
            if (!this.E.has(v)) this.E.set(v, []);
        }
    }

    _createClass(Graph, [{
        key: "subgraph",
        value: function subgraph(subV) {
            return new Graph(subV, new Map(this.E));
        }
    }, {
        key: "union",
        value: function union(g2) {
            return new Graph(Vertex.Set.apply(Vertex, [].concat(_toConsumableArray(this.V), _toConsumableArray(g2.V))), new Map([].concat(_toConsumableArray(this.E), _toConsumableArray(g2.E))));
        }
    }, {
        key: "hasEdgeUndirected",
        value: function hasEdgeUndirected(v, to) {
            if (this.getEdgesUndirected(v).indexOf(to) >= 0 && this.getEdgesUndirected(to).indexOf(v) >= 0) return true;else return false;
        }
    }, {
        key: "addVertex",
        value: function addVertex(v) {
            this.V.add(v);
            if (!this.E.has(v)) this.E.set(v, []);
        }
    }, {
        key: "addEdgeUndirected",
        value: function addEdgeUndirected(from, to) {
            console.log("adding (" + from + "," + to + ")");
            if (this.hasEdgeUndirected(from, to)) throw from + " to " + to + " already exists";
            this.getEdgesUndirected(from).push(to);
            this.getEdgesUndirected(to).push(from);
        }
    }, {
        key: "getEdgesUndirected",
        value: function getEdgesUndirected(v) {
            if (!v || !this.V.has(v)) throw new Error("graph does not contain " + v);
            return this.E.get(v);
        }
    }, {
        key: "getAllEdgesUndirected",
        value: function getAllEdgesUndirected() {
            var out = Edge.Set();
            for (var v1 of this.V) {
                for (var v2 of this.getEdgesUndirected(v1)) {
                    var e = Edge.undirected(v1, v2);
                    if (!out.has(e)) out.add(e);
                }
            }return out;
        }
    }, {
        key: "getVertices",
        value: function getVertices() {
            return this.V;
        }
    }, {
        key: "getSomeVertex",
        value: function getSomeVertex() {
            return this.V.values().next().value;
        }
    }, {
        key: "getRandomVertex",
        value: function getRandomVertex() {
            return Util.randomChoice([].concat(_toConsumableArray(this.V)));
        }
    }, {
        key: "getVertexById",
        value: function getVertexById(id) {
            for (var v of this.V) {
                if (v.id === id) return v;
            }return null;
        }
    }, {
        key: "getEdgeIndex",
        value: function getEdgeIndex(v1, v2) {
            var edges = this.getEdgesUndirected(v1);
            for (var i = 0; i < edges.length; i++) {
                if (edges[i] === v2) return i;
            }
            throw "(" + v1 + "," + v2 + ") does not exist";
        }
    }, {
        key: "removeEdgeUndirected",
        value: function removeEdgeUndirected(v1, v2) {
            this.getEdgesUndirected(v1).splice(this.getEdgeIndex(v1, v2), 1);
            this.getEdgesUndirected(v2).splice(this.getEdgeIndex(v2, v1), 1);
        }

        /*removeVertex(v: Vertex) {
            this.V.delete(v);
            // todo
        }*/
    }, {
        key: "sortEdges",
        value: function sortEdges(mapper) {
            var _this3 = this;

            var _loop = function (v1) {
                _this3.E.set(v1, _this3.E.get(v1).sort(function (v2a, v2b) {
                    return mapper(v1, v2a) - mapper(v1, v2b);
                }));
            };

            for (var v1 of this.V) {
                _loop(v1);
            }
        }
    }, {
        key: "setPositionMap",
        value: function setPositionMap(map) {
            this.positionMap = map;
            console.log("bef");
            //for(var e of this.E) console.log(e[0]+" -> "+e[1])
            this.sortEdges(function (v1, v2) {
                var p1 = map(v1);
                var p2 = map(v2);

                var angle = -Math.atan2(p2.y - p1.y, p2.x - p1.x); // counter clockwise
                // console.log(`angle between ${v1} and ${v2} is ${angle*180/Math.PI}`);
                return angle;
            });
            //for(var e of this.E) console.log(e[0]+" -> "+e[1])
        }
    }, {
        key: "toSigma",
        value: function toSigma() {
            var posMap = this.positionMap || function (v) {
                return { x: Math.random(), y: Math.random() };
            };
            var nodes = [].concat(_toConsumableArray(this.V)).map(function (v) {
                var pos = posMap(v);
                return { id: "" + v.id, x: pos.x, y: pos.y, original_x: pos.x, original_y: pos.y, size: 1, label: "" + v.id };
            });
            var edges = [];
            for (var e of this.getAllEdgesUndirected()) {
                edges.push({ id: e.id, source: "" + e.v1.id, target: "" + e.v2.id });
            }
            return { nodes: nodes, edges: edges };
        }
    }, {
        key: "draw",
        value: function draw(sigmainst) {
            var s = this.toSigma();
            sigmainst.graph.read(s);
            sigmainst.refresh();
            if (!this.positionMap) {
                sigmainst.configForceAtlas2({ slowDown: 1 });
                sigmainst.startForceAtlas2();
                setTimeout(function () {
                    return sigmainst.stopForceAtlas2();
                }, 2000);
            }
        }
    }, {
        key: "n",
        get: function get() {
            return this.V.size;
        }
    }, {
        key: "m",
        get: function get() {
            return this.E.size;
        }
    }], [{
        key: "randomGraph",
        value: function randomGraph() {
            var n = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0];
            var m = arguments.length <= 1 || arguments[1] === undefined ? 15 : arguments[1];

            var verts = [];
            for (var i = 0; i < n; i++) {
                verts.push(new Vertex());
            }var g = new Graph(verts);
            for (var i = 0; i < m; i++) {
                var e = undefined;
                var v1 = undefined,
                    v2 = undefined;
                do {
                    v1 = Math.random() * n | 0;
                    v2 = Math.random() * n | 0;
                } while (g.hasEdgeUndirected(verts[v1], verts[v2]));
                g.addEdgeUndirected(verts[v1], verts[v2]);
            }
            return g;
        }

        /** complete graph of size n */
    }, {
        key: "K",
        value: function K(n) {
            var vertices = [];
            for (var i = 0; i < n; i++) {
                vertices.push(new Vertex());
            }var g = new Graph(new Set(vertices));
            for (var i = 0; i < n; i++) {
                for (var j = 0; j < n; j++) {
                    if (i != j) g.addEdgeUndirected(vertices[i], vertices[j]);
                }
            }
        }
    }, {
        key: "fromAscii",
        value: function fromAscii(ascii) {
            var data = ascii.split('\n');
            while (data[0].length == 0 || data[0].match(/_+/)) data.shift();
            var toPos = new Map();
            var V = [];
            for (var _ref83 of data.entries()) {
                var _ref82 = _slicedToArray(_ref83, 2);

                var y = _ref82[0];
                var line = _ref82[1];

                for (var _ref93 of line.split('').entries()) {
                    var _ref92 = _slicedToArray(_ref93, 2);

                    var x = _ref92[0];
                    var char = _ref92[1];

                    if (char.match(/\d/) !== null) {
                        var v = new Vertex();
                        var id = +char;
                        V[id] = v;
                        console.log(id, x, y);
                        toPos.set(v, { x: x, y: y });
                    }
                }
            }
            var G = new PlanarGraph(V.filter(function (v) {
                return v != null;
            }));

            for (var _len3 = arguments.length, edges = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                edges[_key3 - 1] = arguments[_key3];
            }

            for (var path of edges) {
                for (var i = 0; i < path.length - 1; i++) {
                    G.addEdgeUndirected(V[path[i]], V[path[i + 1]]);
                }
            }
            G.setPositionMap(toPos.get.bind(toPos));
            return G;
        }
    }]);

    return Graph;
})();

var PlanarGraph = (function (_Graph) {
    _inherits(PlanarGraph, _Graph);

    function PlanarGraph() {
        var V = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
        var E = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

        _classCallCheck(this, PlanarGraph);

        _get(Object.getPrototypeOf(PlanarGraph.prototype), "constructor", this).call(this, V, E);
    }

    _createClass(PlanarGraph, [{
        key: "triangulateAll",
        value: function triangulateAll() {
            var _this4 = this;

            var invert = function invert(_ref10) {
                var _ref102 = _slicedToArray(_ref10, 2);

                var v1 = _ref102[0];
                var v2 = _ref102[1];
                return [v2, v1];
            };
            var Θ = function Θ(_ref11) {
                var _ref112 = _slicedToArray(_ref11, 2);

                var v1 = _ref112[0];
                var v2 = _ref112[1];
                return [v1, _this4.getNextEdge(v1, v2)];
            };
            var Θstar = function Θstar(e) {
                return Θ(invert(e));
            };
            var s = function s(_ref12) {
                var _ref122 = _slicedToArray(_ref12, 2);

                var _s = _ref122[0];
                var t = _ref122[1];
                return _s;
            },
                t = function t(_ref13) {
                var _ref132 = _slicedToArray(_ref13, 2);

                var s = _ref132[0];
                var _t = _ref132[1];
                return _t;
            };
            var equal = function equal(_ref14, _ref15) {
                var _ref142 = _slicedToArray(_ref14, 2);

                var s1 = _ref142[0];
                var t1 = _ref142[1];

                var _ref152 = _slicedToArray(_ref15, 2);

                var s2 = _ref152[0];
                var t2 = _ref152[1];
                return s1 === s2 && t1 === t2;
            };
            var triangulate = function triangulate(e, é) {
                if (equal(e, é)) return;
                console.log("triangulating " + e + " and " + é);
                if (s(e) !== s(é)) throw "assertion error";
                var v = s(e);
                var é́ = Θstar(é);
                if (equal(Θstar(é́), invert(e))) return; // already triangular
                if (_this4.hasEdgeUndirected(v, t(é́)) || t(é́) === v) {
                    _this4.addEdgeUndirected(t(é), t(e), v, _this4.getPrevEdge(t(e), v));
                    return;
                }
                // todo: sonderfall
                var eneu = [s(é), t(é́)];
                _this4.addEdgeUndirected(s(eneu), t(eneu), _this4.getPrevEdge(s(eneu), t(é)), t(é));
                triangulate(e, eneu);
            };
            for (var v of Util.shuffle([].concat(_toConsumableArray(this.V)))) {
                for (var v2 of this.getEdgesUndirected(v)) {
                    if (v === v2) continue;
                    var e = [v, v2];
                    var é = Θ(e);
                    triangulate(e, é);
                }
            }
            return this;
        }
    }, {
        key: "getNextEdges",
        value: function* getNextEdges(v1, v2) {
            var v2start = v2;
            v2 = this.getNextEdge(v1, v2);
            while (v2 !== v2start) {
                yield v2;
                v2 = this.getNextEdge(v1, v2);
            }
        }
    }, {
        key: "getNextEdge",
        value: function getNextEdge(v1, v2) {
            if (!this.hasEdgeUndirected(v1, v2)) throw new Error("does not have edge " + v1 + " - " + v2);
            var edges = this.getEdgesUndirected(v1);
            var nextEdge = (this.getEdgeIndex(v1, v2) + 1) % edges.length;
            return edges[nextEdge];
        }
    }, {
        key: "getPrevEdge",
        value: function getPrevEdge(v1, v2) {
            if (!this.hasEdgeUndirected(v1, v2)) throw new Error("does not have edge " + v1 + " - " + v2);
            var edges = this.getEdgesUndirected(v1);
            var nextEdge = (this.getEdgeIndex(v1, v2) - 1 + edges.length) % edges.length;
            return edges[nextEdge];
        }
    }, {
        key: "getEdgesBetween",
        value: function* getEdgesBetween(vbefore, vref, vafter) {
            if (!this.hasEdgeUndirected(vref, vafter)) throw new Error("does not have edge " + vref + " - " + vafter);
            if (vafter === vbefore) throw new Error("same edge");
            var edge = this.getNextEdge(vref, vbefore);
            while (edge !== vafter) {
                yield edge;
                edge = this.getNextEdge(vref, edge);
            }
        }
    }, {
        key: "edgeIsBetween",
        value: function edgeIsBetween(base, target, rightEdge, leftEdge) {
            for (var edge of this.getEdgesBetween(rightEdge, base, leftEdge)) {
                if (edge === target) return true;
            }return false;
        }
    }, {
        key: "addEdgeUndirected",
        value: function addEdgeUndirected(from, to, afterEdge1, afterEdge2) {
            console.log("adding (" + from + "," + to + ") after " + from + "," + afterEdge1 + " and " + to + "," + afterEdge2);
            if (this.hasEdgeUndirected(from, to)) throw from + " to " + to + " already exists";
            if (afterEdge1 === undefined && afterEdge2 === undefined) {
                this.getEdgesUndirected(from).push(to);
                this.getEdgesUndirected(to).push(from);
            } else {
                var edges1 = this.getEdgesUndirected(from);
                var index1 = afterEdge1 === undefined ? edges1.length - 1 : this.getEdgeIndex(from, afterEdge1);
                edges1.splice(index1 + 1, 0, to);
                var edges2 = this.getEdgesUndirected(to);
                var index2 = afterEdge2 === undefined ? edges2.length - 1 : this.getEdgeIndex(to, afterEdge2);
                edges2.splice(index2 + 1, 0, from);
            }
            console.log(from + ": " + this.getEdgesUndirected(from) + ", " + to + ": " + this.getEdgesUndirected(to));
        }
    }, {
        key: "facetsAround",
        value: function* facetsAround(v) {
            for (var v2 of this.getEdgesUndirected(v)) {
                var facet = [v, v2];
                while (facet[facet.length - 1] !== v) facet.push(this.getPrevEdge(facet[facet.length - 1], facet[facet.length - 2]));
                facet.pop(); //no duplicate point
                yield facet;
            }
        }
    }, {
        key: "checkTriangulated",
        value: function checkTriangulated() {
            var _this5 = this;

            var has = function has(v1, v2) {
                return _this5.hasEdgeUndirected(v1, v2);
            };
            for (var v1 of this.getVertices()) {
                for (var v2 of this.getEdgesUndirected(v1)) {
                    var v3 = this.getNextEdge(v1, v2);
                    if (!has(v1, v3) || this.getPrevEdge(v1, v3) !== v2) return false;
                    if (!has(v2, v3) || this.getNextEdge(v2, v3) !== v1) return false;
                    if (!has(v2, v1) || this.getPrevEdge(v2, v1) !== v3) return false;
                    if (!has(v3, v1) || this.getNextEdge(v3, v1) !== v2) return false;
                    if (!has(v3, v2) || this.getPrevEdge(v3, v2) !== v1) return false;
                }
            }
            return true;
        }
    }, {
        key: "clone",
        value: function clone() {
            var e = [].concat(_toConsumableArray(this.E));
            for (var x of e) {
                x[1] = x[1].slice();
            } // clone edge arrays
            return new PlanarGraph(this.V, e);
        }
    }], [{
        key: "randomPlanarGraph",
        value: function randomPlanarGraph(n) {
            var positionMap = new Map();
            var toPos = positionMap.get.bind(positionMap);
            var V = Util.array(n, function (i) {
                return new Vertex();
            });
            var E = new ActualSet(function (_ref16) {
                var _ref162 = _slicedToArray(_ref16, 2);

                var v1 = _ref162[0];
                var v2 = _ref162[1];
                return v1.id + "|" + v2.id;
            });
            var G = new PlanarGraph(V);
            for (var v of V) {
                positionMap.set(v, { x: Math.random(), y: Math.random() });
            }function addPlanarLink(edge, links) {
                if (!links.has(edge) && edge[0] !== edge[1] && !links.some(function (other) {
                    return Util.intersect([toPos(edge[0]), toPos(edge[1])], [toPos(other[0]), toPos(other[1])]);
                })) E.add(edge);
            }
            for (var point of V) {
                addPlanarLink([point, V[Math.random() * n | 0]], E);
            }for (var i = 0; i < n; i++) {
                for (var j = 1 + 1; j < n; j++) {
                    addPlanarLink([V[i], V[j]], E);
                }
            }
            for (var _ref173 of E) {
                var _ref172 = _slicedToArray(_ref173, 2);

                var v1 = _ref172[0];
                var v2 = _ref172[1];

                G.addEdgeUndirected(v1, v2);
            }G.setPositionMap(toPos);
            return G;
        }
    }]);

    return PlanarGraph;
})(Graph);

var sigmainst = undefined,
    g = undefined;
var Color = {
    PrimaryHighlight: "#ff0000",
    SecondaryHighlight: "#00ff00",
    TertiaryHighlight: "#0000ff",
    Normal: "#000000",
    GrayedOut: "#999999",
    Invisible: "#ffffff"
};

var GraphAlgorithm = function GraphAlgorithm(name, supplier) {
    _classCallCheck(this, GraphAlgorithm);

    this.name = name;
    this.supplier = supplier;
};

var Algorithms = [new GraphAlgorithm("Breadth First Search", function () {
    return BFS.run(g);
}), new GraphAlgorithm("Tree Lemma (Separator ≤ 2h + 1)", function () {
    return treeLemma(g, StepByStep.complete(BFS.run(g)));
}), new GraphAlgorithm("Find embedding", function () {
    return findPlanarEmbedding(g);
}), new GraphAlgorithm("vertex disjunct Menger algorithm", function () {
    return mengerVertexDisjunct(g, g.getRandomVertex(), g.getRandomVertex());
})];
var GUI;
(function (GUI) {
    GUI.currentAlgorithm = null;
    var timeout = undefined;
    var running = false;
    function algorithmStep() {
        if (GUI.currentAlgorithm) {
            if (StepByStep.step(GUI.currentAlgorithm, algorithmCallback)) {
                onAlgorithmFinish();
            }
        } else {
            onAlgorithmFinish();
        }
    }
    GUI.algorithmStep = algorithmStep;
    function algorithmCallback() {
        if (running) setTimeout(function () {
            return !running || algorithmStep();
        }, 300);
    }
    GUI.algorithmCallback = algorithmCallback;
    function onAlgorithmFinish() {
        $("#stepButton").prop("disabled", true);
        $("#runButton").prop("disabled", true);
        if (running) {
            algorithmRunToggle();
        }
    }
    GUI.onAlgorithmFinish = onAlgorithmFinish;
    function algorithmRunToggle() {
        var btn = $("#runButton");
        if (running) {
            running = false;
            btn.text("Run");
            clearInterval(timeout);
        } else {
            running = true;
            btn.text("Stop");
            algorithmStep();
        }
    }
    GUI.algorithmRunToggle = algorithmRunToggle;
    function startAlgorithm() {
        var select = $("#selectAlgorithm")[0];
        var algo = Algorithms[+select.value];
        $("#stepButton").prop("disabled", false);
        $("#runButton").prop("disabled", false);
        GUI.currentAlgorithm = algo.supplier();
        algorithmStep();
    }
    GUI.startAlgorithm = startAlgorithm;
    GUI.Macros = {
        bfsPositions: function bfsPositions() {
            addPositions('bfs', StepByStep.complete(BFS.run(g)).getTreeOrderPositions());
            animatePositions('bfs');
        },
        bfsHighlights: function bfsHighlights() {
            highlightEdges(g, "#000000", { set: StepByStep.complete(BFS.run(g)).getUsedEdges(), color: Color.PrimaryHighlight });
            sigmainst.refresh();
        },
        noHighlights: function noHighlights() {
            highlightEdges(g, "#000000");
            sigmainst.refresh();
        },
        newRandomPlanarGraph: function newRandomPlanarGraph() {
            sigmainst.graph.clear();
            g = PlanarGraph.randomPlanarGraph(+document.getElementById("vertexCount").value);
            g.draw(sigmainst);
        }
    };
    function init() {
        sigmainst = new sigma('graph-container');
        GUI.Macros.newRandomPlanarGraph();
        var select = $("#selectAlgorithm")[0];
        for (var _ref183 of Algorithms.entries()) {
            var _ref182 = _slicedToArray(_ref183, 2);

            var i = _ref182[0];
            var algo = _ref182[1];

            select.add(new Option(algo.name, i + "", i === 0));
        }
    }
    GUI.init = init;
})(GUI || (GUI = {}));

var StepByStep = (function () {
    function StepByStep() {
        _classCallCheck(this, StepByStep);
    }

    _createClass(StepByStep, null, [{
        key: "step",
        value: function step(algo, callback) {
            var next = algo.next();
            if (next.done) return true;
            StepByStep.applyState(next.value, callback);
            return next.value.finalResult !== undefined;
        }
    }, {
        key: "complete",
        value: function complete(algo) {
            for (var state of algo) {
                if (state.finalResult !== undefined) return state.finalResult;
            }
            throw "did not get final result";
        }
    }, {
        key: "applyState",
        value: function applyState(state, callback) {
            highlightEdges.apply(undefined, [g, state.resetEdgeHighlights].concat(_toConsumableArray(state.newEdgeHighlights || [])));
            highlightVertices.apply(undefined, [g, state.resetNodeHighlights].concat(_toConsumableArray(state.newNodeHighlights || [])));
            $("#stateOutput").text(state.textOutput);
            sigmainst.refresh();
            if (state.changePositions !== undefined) {
                addPositions("_temp", state.changePositions);
                animatePositions("_temp", [].concat(_toConsumableArray(state.changePositions.keys())).map(function (v) {
                    return v.sigmaId;
                }), callback);
            } else {
                callback();
            }
        }
    }]);

    return StepByStep;
})();

var Tree = (function () {
    function Tree(element) {
        var children = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

        _classCallCheck(this, Tree);

        this.element = element;
        this.children = children;
    }

    _createClass(Tree, [{
        key: "preOrder",
        value: function preOrder(fn) {
            var parent = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
            var layer = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
            var childIndex = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

            fn(this, parent, layer, childIndex);
            for (var _ref193 of this.children.entries()) {
                var _ref192 = _slicedToArray(_ref193, 2);

                var i = _ref192[0];
                var child = _ref192[1];

                child.preOrder(fn, this, layer + 1, i);
            }
        }
    }, {
        key: "postOrder",
        value: function postOrder(fn) {
            var parent = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
            var layer = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
            var childIndex = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

            for (var _ref203 of this.children.entries()) {
                var _ref202 = _slicedToArray(_ref203, 2);

                var i = _ref202[0];
                var child = _ref202[1];

                child.postOrder(fn, this, layer + 1, i);
            }fn(this, parent, layer, childIndex);
        }
    }, {
        key: "toArray",
        value: function toArray() {
            var layers = new Array(this.depth);
            function add(t, parent, layer, childIndex) {
                if (!layers[layer]) layers[layer] = [];
                layers[layer].push({ element: t.element, parent: parent ? parent.element : null });
            }
            this.preOrder(add);
            return layers;
        }
    }, {
        key: "depth",
        get: function get() {
            if (this.children.length == 0) return 1;
            return 1 + Math.max.apply(Math, _toConsumableArray(this.children.map(function (c) {
                return c.depth;
            })));
        }
    }]);

    return Tree;
})();

var BFS = (function () {
    function BFS(tree /*, public usedEdges: ActualSet<Edge>*/) {
        _classCallCheck(this, BFS);

        this.tree = tree;
    }

    _createClass(BFS, [{
        key: "getTreeOrderPositions",
        value: function getTreeOrderPositions() {
            var layers = this.treeLayers;
            var repos = new Map();
            for (var _ref213 of layers.entries()) {
                var _ref212 = _slicedToArray(_ref213, 2);

                var i = _ref212[0];
                var layer = _ref212[1];

                for (var _ref223 of layer.entries()) {
                    var _ref222 = _slicedToArray(_ref223, 2);

                    var n = _ref222[0];
                    var _ref222$1 = _ref222[1];
                    var element = _ref222$1.element;
                    var _parent = _ref222$1.parent;

                    repos.set(element, { x: (n + 1) / (_parent == null ? 2 : layer.length + 1), y: i / layers.length });
                }
            }
            return repos;
        }
    }, {
        key: "getUsedEdges",
        value: function getUsedEdges() {
            var edges = Edge.Set();
            for (var layer of this.treeLayers) {
                for (var _ref232 of layer) {
                    var element = _ref232.element;
                    var _parent2 = _ref232.parent;

                    if (_parent2 == null) continue;
                    edges.add(Edge.undirected(_parent2, element));
                }
            }return edges;
        }
    }, {
        key: "treeLayers",
        get: function get() {
            if (this._treeLayers === undefined) this._treeLayers = this.tree.toArray();
            return this._treeLayers;
        }
    }], [{
        key: "run",
        value: function* run(G) {
            var root = arguments.length <= 1 || arguments[1] === undefined ? G.getSomeVertex() : arguments[1];
            return yield* (function* () {
                var rootTree = new Tree(root);
                var visited = Vertex.Set(root);
                var queue = [rootTree];
                var usedEdges = Edge.Set();
                while (queue.length > 0) {
                    var v = queue.shift();
                    var currentChildren = Edge.Set();
                    for (var child of G.getEdgesUndirected(v.element)) {
                        if (visited.has(child)) continue;
                        var t = new Tree(child);
                        v.children.push(t);
                        var edge = Edge.undirected(v.element, child);
                        usedEdges.add(edge);
                        currentChildren.add(edge);
                        queue.push(t);
                        visited.add(child);
                    }
                    yield {
                        resetEdgeHighlights: Color.GrayedOut,
                        resetNodeHighlights: Color.GrayedOut,
                        newNodeHighlights: [{ set: Vertex.Set(v.element), color: Color.PrimaryHighlight }, { set: Vertex.Set.apply(Vertex, _toConsumableArray(queue.map(function (v) {
                                return v.element;
                            }))), color: Color.SecondaryHighlight }, { set: visited, color: Color.Normal }],
                        newEdgeHighlights: [{ set: currentChildren, color: Color.PrimaryHighlight }, { set: usedEdges, color: Color.Normal }],
                        textOutput: "Found " + visited.size + " of " + G.n + " vertices"
                    };
                }
                var bfs = new BFS(rootTree);
                yield {
                    resetEdgeHighlights: Color.GrayedOut,
                    resetNodeHighlights: Color.Normal,
                    newEdgeHighlights: [{ set: bfs.getUsedEdges(), color: Color.Normal }],
                    finalResult: bfs,
                    textOutput: "BFS successful"
                };
            })();
        }
    }]);

    return BFS;
})();

function addPositions(prefix, posMap) {
    var nodes = sigmainst.graph.nodes();
    var ys = nodes.map(function (n) {
        return n.y;
    }),
        xs = nodes.map(function (n) {
        return n.x;
    });
    for (var _ref243 of posMap) {
        var _ref242 = _slicedToArray(_ref243, 2);

        var vertex = _ref242[0];
        var _ref242$1 = _ref242[1];
        var x = _ref242$1.x;
        var y = _ref242$1.y;

        var node = sigmainst.graph.nodes(vertex.sigmaId);
        node[prefix + "_x"] = x;
        node[prefix + "_y"] = y;
    }
}
function animatePositions(prefix, nodes, callback) {
    sigma.plugins.animate(sigmainst, {
        x: prefix + '_x', y: prefix + '_y'
    }, {
        easing: 'cubicInOut',
        duration: 1000,
        nodes: nodes,
        onComplete: callback
    });
}
function highlightEdges(g, othersColor) {
    for (var _len4 = arguments.length, edgeSets = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
        edgeSets[_key4 - 2] = arguments[_key4];
    }

    var _loop2 = function (_edge) {
        var result = edgeSets.find(function (_ref25) {
            var set = _ref25.set;
            return set.has(_edge);
        });
        var edge = sigmainst.graph.edges(_edge.id);
        if (result !== undefined) {
            edge.color = result.color;
            edge.size = 6;
        } else if (othersColor !== undefined) {
            edge.color = othersColor;
            edge.size = undefined;
        }
    };

    for (var _edge of g.getAllEdgesUndirected()) {
        _loop2(_edge);
    }
}
function highlightVertices(g, othersColor) {
    for (var _len5 = arguments.length, vertexSets = Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
        vertexSets[_key5 - 2] = arguments[_key5];
    }

    var _loop3 = function (vertex) {
        var result = vertexSets.find(function (_ref26) {
            var set = _ref26.set;
            return set.has(vertex);
        });
        var node = sigmainst.graph.nodes(vertex.sigmaId);
        if (result !== undefined) {
            node.color = result.color;
        } else if (othersColor !== undefined) {
            node.color = othersColor;
        }
    };

    for (var vertex of g.getVertices()) {
        _loop3(vertex);
    }
}
function resetPositions(G) {
    animatePositions("original");
}
function* findPlanarEmbedding(g) {
    var embeddedSubgraph = new PlanarGraph();
    g.triangulateAll();
    sigmainst.graph.clear();
    g.draw(sigmainst);
    yield {
        textOutput: "Triangulated"
    };
    var map = new Map();
    var vertices = [].concat(_toConsumableArray(g.getVertices()));
    var v1 = Util.randomChoice(vertices);
    var v2 = Util.randomChoice(g.getEdgesUndirected(v1));
    var v3 = g.getNextEdge(v1, v2);
    embeddedSubgraph.addVertex(v1);
    embeddedSubgraph.addVertex(v2);
    embeddedSubgraph.addVertex(v3);
    embeddedSubgraph.addEdgeUndirected(v1, v2);
    embeddedSubgraph.addEdgeUndirected(v2, v3);
    embeddedSubgraph.addEdgeUndirected(v3, v1);
    window._g = embeddedSubgraph;
    function facetContainsAt(f, v, i) {
        var c = f.vertices.length;
        var vafter = f.vertices[(i + c - 1) % c];
        var vref = f.vertices[i % c];
        var vbefore = f.vertices[(i + 1) % c];
        for (var vert of g.getEdgesBetween(vbefore, vref, vafter)) {
            if (vert === v) return true;
        }return false;
    }
    function facetContains(f, v) {
        for (var i = 0; i < f.vertices.length; i++) {
            if (facetContainsAt(f, v, i)) return true;
        }
        return false;
    }
    var facets = new Set();
    facets.add({ vertices: [v1, v2, v3], isOuter: true });
    facets.add({ vertices: [v1, v3, v2] });
    map.set(v1, { x: 0, y: 0 });
    map.set(v2, { x: 1, y: 0 });
    map.set(v3, { x: 0.5, y: Math.sqrt(3) / 2 });
    yield {
        textOutput: "Added initial facet",
        changePositions: map,
        resetEdgeHighlights: "#cccccc",
        resetNodeHighlights: "#cccccc",
        newEdgeHighlights: [{ set: embeddedSubgraph.getAllEdgesUndirected(), color: Color.Normal }],
        newNodeHighlights: [{ set: Vertex.Set.apply(Vertex, _toConsumableArray(map.keys())), color: Color.Normal }]
    };
    var halfEmbeddedEdges = function halfEmbeddedEdges(v) {
        return g.getEdgesUndirected(v).filter(function (w) {
            return map.has(w);
        });
    };

    var _loop4 = function* () {
        var v = vertices.find(function (v) {
            if (map.has(v)) return false;var e = halfEmbeddedEdges(v);return e.length >= 2;
        });
        if (v === undefined) throw "bläsius error";
        var edges = halfEmbeddedEdges(v);
        yield {
            textOutput: "next vertex to insert",
            resetEdgeHighlights: "#cccccc",
            resetNodeHighlights: "#cccccc",
            changePositions: map,
            newEdgeHighlights: [{ set: embeddedSubgraph.getAllEdgesUndirected(), color: Color.Normal }],
            newNodeHighlights: [{ set: Vertex.Set(v), color: Color.PrimaryHighlight }, { set: Vertex.Set.apply(Vertex, _toConsumableArray(edges)), color: Color.SecondaryHighlight }, { set: Vertex.Set.apply(Vertex, _toConsumableArray(map.keys())), color: Color.Normal }]
        };
        var neighbour = edges[0];
        var containingFacets = [].concat(_toConsumableArray(facets)).filter(function (facet) {
            var i = facet.vertices.indexOf(neighbour);
            if (i < 0) return false;
            return facetContainsAt(facet, v, i);
        });
        if (containingFacets.length !== 1) throw new Error("internal error " + containingFacets);
        var containingFacet = containingFacets[0];
        console.log(v, "is in", containingFacet);
        var points = containingFacet.vertices.map(function (v) {
            return map.get(v);
        });
        var point = undefined;
        if (Util.polygonConvex(points)) {
            console.log("is convex");
            point = Util.polygonCentroid(points);
        } else {
            point = Util.polygonKernel(points);
        }
        map.set(v, point);
        yield {
            textOutput: "moved vertex to new position",
            resetEdgeHighlights: "#cccccc",
            resetNodeHighlights: "#cccccc",
            changePositions: map,
            newEdgeHighlights: [{ set: embeddedSubgraph.getAllEdgesUndirected(), color: Color.Normal }],
            newNodeHighlights: [{ set: Vertex.Set(v), color: Color.PrimaryHighlight }, { set: Vertex.Set.apply(Vertex, _toConsumableArray(edges)), color: Color.SecondaryHighlight }, { set: Vertex.Set.apply(Vertex, _toConsumableArray(map.keys())), color: Color.Normal }]
        };
        var lastEdge = undefined;
        var edgesSet = Vertex.Set.apply(Vertex, _toConsumableArray(edges));
        embeddedSubgraph.addVertex(v);
        for (var _ref273 of containingFacet.vertices.entries()) {
            var _ref272 = _slicedToArray(_ref273, 2);

            var i = _ref272[0];
            var vertex = _ref272[1];

            if (edgesSet.has(vertex)) {
                embeddedSubgraph.addEdgeUndirected(v, vertex, lastEdge, containingFacet.vertices[(i + 1) % containingFacet.vertices.length]);
                lastEdge = vertex;
            }
        }
        yield {
            textOutput: "added new edges to vertex " + v,
            newEdgeHighlights: [{ set: Edge.Set.apply(Edge, _toConsumableArray([].concat(_toConsumableArray(edgesSet)).map(function (v2) {
                    return Edge.undirected(v, v2);
                }))), color: Color.PrimaryHighlight }]
        };
        facets["delete"](containingFacet);
        for (var facet of embeddedSubgraph.facetsAround(v)) {
            facets.add({ vertices: facet });
            yield {
                textOutput: "adding facets",
                resetEdgeHighlights: "#cccccc",
                newEdgeHighlights: [{ set: Edge.Set.apply(Edge, _toConsumableArray(vertexArrayToEdges(facet, true))), color: Color.PrimaryHighlight }, { set: embeddedSubgraph.getAllEdgesUndirected(), color: Color.Normal }]
            };
        }
    };

    while (map.size < vertices.length) {
        yield* _loop4();
    }
    yield {
        textOutput: "Embedding successful",
        resetNodeHighlights: Color.Normal,
        resetEdgeHighlights: Color.Normal,
        finalResult: map
    };
}
function vertexArrayToEdges(path) {
    var wrapAround = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    var pathEdges = [];
    for (var i = 0; i < path.length - 1; i++) {
        pathEdges.push(Edge.undirected(path[i], path[i + 1]));
    }if (wrapAround && path.length > 1) pathEdges.push(Edge.undirected(path[path.length - 1], path[0]));
    return pathEdges;
}
function* mengerVertexDisjunct(orig_g, s, t) {
    var pathCounter = 0;
    var paths = [];
    var g = orig_g.clone();

    var Info = (function () {
        function Info(path, pathIndex) {
            _classCallCheck(this, Info);

            this.path = path;
            this.pathIndex = pathIndex;
        }

        _createClass(Info, [{
            key: "previous",
            get: function get() {
                return this.path[this.pathIndex - 1];
            }
        }, {
            key: "next",
            get: function get() {
                return this.path[this.pathIndex + 1];
            }
        }], [{
            key: "fromPrevious",
            value: function fromPrevious(i, v) {
                var path = i.path;
                if (i.path.length === 1) path = path.slice();
                if (path.length > i.pathIndex) path.splice(i.pathIndex + 1);
                path.push(v);
                return new Info(path, i.pathIndex + 1);
            }
        }]);

        return Info;
    })();

    var infoMap = new Map([[s, new Info([s], 0)]]);
    var stHighlight = { set: Vertex.Set(s, t), color: Color.TertiaryHighlight };
    function* visit(v, prev) {
        if (!v) return;
        if (v === infoMap.get(prev).previous) {
            var next = g.getNextEdge(v, prev);
            g.removeEdgeUndirected(v, prev);
            yield* visit(next, v);
            return true;
        }
        if (v === s) {
            var next = g.getNextEdge(prev, v);
            // g.removeEdgeUndirected(prev, v);
            yield* visit(next, prev);
            return;
        }
        if (v === t) {
            yield {
                textOutput: "Found path!",
                newEdgeHighlights: [{ set: Edge.Set(Edge.undirected(prev, v)), color: Color.PrimaryHighlight }]
            };
            var info = infoMap.get(prev);
            info.path.push(v);
            paths.push(info.path);
            return true;
        }
        if (infoMap.has(v)) {
            var theirInfo = infoMap.get(v);
            console.log("already visited " + v + " from " + theirInfo.previous + " to " + theirInfo.next + ", now from " + prev);
            if (theirInfo.path[theirInfo.pathIndex] === v && theirInfo.next && g.edgeIsBetween(v, prev, theirInfo.previous, theirInfo.next)) {
                var _theirInfo$path, _thisInfo$path;

                console.log("conflict from right");
                // conflict from right
                // swap prev arrays
                var thisInfo = infoMap.get(prev);
                var _ref28 = [theirInfo.pathIndex, thisInfo.pathIndex];
                thisInfo.pathIndex = _ref28[0];
                theirInfo.pathIndex = _ref28[1];

                var oldStartSegment = thisInfo.path;
                thisInfo.path = thisInfo.path.slice();
                theirInfo.path = theirInfo.path.slice();
                var newStartSegment = (_theirInfo$path = theirInfo.path).splice.apply(_theirInfo$path, [0, thisInfo.pathIndex].concat(_toConsumableArray(thisInfo.path)));
                (_thisInfo$path = thisInfo.path).splice.apply(_thisInfo$path, [0, thisInfo.path.length].concat(_toConsumableArray(newStartSegment)));
                prev = thisInfo.previous;
                yield {
                    textOutput: "Conflict from right - replacing segments",
                    resetEdgeHighlights: Color.GrayedOut,
                    newEdgeHighlights: [{ set: Edge.Set.apply(Edge, _toConsumableArray(vertexArrayToEdges(newStartSegment))), color: Color.PrimaryHighlight }, { set: Edge.Set.apply(Edge, _toConsumableArray(vertexArrayToEdges(oldStartSegment))), color: Color.SecondaryHighlight }, { set: Edge.Set.apply(Edge, _toConsumableArray(vertexArrayToEdges(theirInfo.path))), color: Color.TertiaryHighlight }]
                };
            }
            console.log("conflict from left");
            // conflict from left
            // backtrack remove
            var next = g.getNextEdge(prev, v);
            g.removeEdgeUndirected(prev, v);
            yield* visit(next, prev);
            return;
        } else {
            infoMap.set(v, Info.fromPrevious(infoMap.get(prev), v));
            console.log(infoMap.get(v));
            yield {
                textOutput: "Visiting " + v,
                resetNodeHighlights: Color.GrayedOut,
                resetEdgeHighlights: Color.Invisible,
                newNodeHighlights: [{ set: Vertex.Set(v), color: Color.PrimaryHighlight }, { set: Vertex.Set(prev), color: Color.SecondaryHighlight }, stHighlight, { set: Vertex.Set.apply(Vertex, _toConsumableArray(infoMap.keys())), color: Color.Normal }],
                newEdgeHighlights: [{ set: Edge.Set.apply(Edge, _toConsumableArray(vertexArrayToEdges(infoMap.get(v).path))), color: Color.PrimaryHighlight }, { set: Edge.Set.apply(Edge, _toConsumableArray(Util.flatten(paths.map(function (path) {
                        return vertexArrayToEdges(path);
                    })))), color: Color.Normal }, { set: g.getAllEdgesUndirected(), color: Color.GrayedOut }]
            };
            var res = yield* visit(g.getNextEdge(v, prev), v);
            if (res === true) return true;
        }
    }
    for (var v of g.getEdgesUndirected(s)) {
        pathCounter++;
        yield {
            textOutput: "Starting new path " + pathCounter,
            resetEdgeHighlights: Color.GrayedOut,
            resetNodeHighlights: Color.Normal,
            newEdgeHighlights: [{ set: Edge.Set.apply(Edge, _toConsumableArray(Util.flatten(paths.map(function (path) {
                    return vertexArrayToEdges(path);
                })))), color: Color.Normal }],
            newNodeHighlights: [stHighlight]
        };
        yield* visit(v, s);
    }
    yield {
        finalResult: paths,
        textOutput: "Found " + paths.length + " s-t-paths"
    };
}
function* treeLemma(G, bfs) {
    var parentMap = new Map();
    for (var layer of bfs.treeLayers) {
        for (var _ref292 of layer) {
            var element = _ref292.element;
            var _parent3 = _ref292.parent;

            parentMap.set(element, _parent3);
        }
    }var leaves = [];
    bfs.tree.preOrder(function (t) {
        if (t.children.length === 0) leaves.push(t.element);
    });
    var childrenCount = new Map();
    leaves.forEach(function (leaf) {
        return childrenCount.set(leaf, [1, [leaf]]);
    });
    bfs.tree.postOrder(function (node) {
        var outp = node.children.reduce(function (_ref30, node) {
            var _ref302 = _slicedToArray(_ref30, 2);

            var sum = _ref302[0];
            var children = _ref302[1];

            var _childrenCount$get = childrenCount.get(node.element);

            var _childrenCount$get2 = _slicedToArray(_childrenCount$get, 2);

            var sum2 = _childrenCount$get2[0];
            var children2 = _childrenCount$get2[1];

            return [sum + sum2, children.concat(children2)];
        }, [1, [node.element]]);
        childrenCount.set(node.element, outp);
    });
    /**  elements to the left / the right of the edge from this node to it's parent */
    var rightLeftCounts = new Map();
    bfs.tree.postOrder(function (node, parent, layer, childIndex) {
        var vertex = node.element;
        if (parent === null) return; // root
        var parentVertex = parent.element;
        var edges = G.getEdgesUndirected(parentVertex);
        var parentParentIndex = edges.indexOf(parentMap.get(parentVertex));
        var selfIndex = edges.indexOf(vertex);
        if (parentParentIndex === selfIndex || parentParentIndex < 0 && selfIndex < 0) throw new Error("assertion error");
        var leftNodes = [];
        var rightNodes = [];
        if (parentParentIndex > selfIndex) {
            leftNodes = edges.slice(selfIndex + 1, parentParentIndex);
            rightNodes = edges.slice(parentParentIndex + 1).concat(edges.slice(0, selfIndex));
        } else {
            leftNodes = edges.slice(selfIndex + 1).concat(edges.slice(0, parentParentIndex));
            rightNodes = edges.slice(parentParentIndex + 1, selfIndex);
        }
        var leftCount = leftNodes.reduce(function (sum, node) {
            return sum + childrenCount.get(node)[0];
        }, 0);
        var rightCount = rightNodes.reduce(function (sum, node) {
            return sum + childrenCount.get(node)[0];
        }, 0);
        rightLeftCounts.set(vertex, [leftCount, rightCount, leftNodes, rightNodes]);
    });
    var treeEdges = bfs.getUsedEdges();
    var nonTreeEdges = [].concat(_toConsumableArray(G.getAllEdgesUndirected())).filter(function (e) {
        return !treeEdges.has(e);
    });
    var nonTreeEdge = Util.randomChoice(nonTreeEdges);
    var path1 = [nonTreeEdge.v1],
        path2 = [nonTreeEdge.v2];
    while (parentMap.get(path1[0]) !== undefined) path1.unshift(parentMap.get(path1[0]));
    var path1Set = new Set(path1);
    // only go up until find crossing with other path
    while (true) {
        var _parent4 = parentMap.get(path2[0]);
        if (_parent4 === undefined) break;
        if (path1Set.has(_parent4)) {
            path2.unshift(_parent4);
            break;
        }
        path2.unshift(_parent4);
    }
    // find common root
    var commonRoot = path2[0];
    while (path1[0] !== commonRoot) path1.shift();
    var path1Edges = vertexArrayToEdges(path1);
    var path2Edges = vertexArrayToEdges(path2);
    yield {
        resetEdgeHighlights: Color.GrayedOut,
        resetNodeHighlights: Color.Normal,
        newNodeHighlights: [{ set: Vertex.Set(nonTreeEdge.v1, nonTreeEdge.v2), color: Color.PrimaryHighlight }, { set: Vertex.Set(commonRoot), color: Color.SecondaryHighlight }],
        newEdgeHighlights: [{ set: Edge.Set(nonTreeEdge), color: Color.PrimaryHighlight }, { set: Edge.Set.apply(Edge, _toConsumableArray(path1Edges)), color: Color.SecondaryHighlight }, { set: Edge.Set.apply(Edge, _toConsumableArray(path2Edges)), color: Color.TertiaryHighlight }, { set: treeEdges, color: Color.Normal }],
        textOutput: "found initial nontree edge and circle"
    };
    var innerSize = 0;
    var innerNodes = [];
    for (var _ref313 of path1.entries()) {
        var _ref312 = _slicedToArray(_ref313, 2);

        var i = _ref312[0];
        var v = _ref312[1];

        if (i == 0 || i == 1) continue; //skip root

        var _rightLeftCounts$get = rightLeftCounts.get(v);

        var _rightLeftCounts$get2 = _slicedToArray(_rightLeftCounts$get, 4);

        var left = _rightLeftCounts$get2[0];
        var right = _rightLeftCounts$get2[1];
        var l = _rightLeftCounts$get2[2];
        var r = _rightLeftCounts$get2[3];

        innerSize += right;
        innerNodes = innerNodes.concat(Util.flatten(r.map(function (node) {
            return childrenCount.get(node)[1].concat([node]);
        })));
    }
    console.log(innerSize);
    yield {
        resetNodeHighlights: Color.GrayedOut,
        newNodeHighlights: [{ set: Vertex.Set.apply(Vertex, _toConsumableArray(innerNodes)), color: Color.PrimaryHighlight }],
        textOutput: "found inner node count"
    };
    yield { textOutput: "not implemented",
        finalResult: { v1: null, v2: null, s: null } };
}
function PST(G) {
    var n = G.n;
    if (n < 5) throw "n is not >= 5";
    var tree = StepByStep.complete(BFS.run(G, G.getSomeVertex()));
    var layers = tree.treeLayers.map(function (layer) {
        return layer.map(function (ele) {
            return ele.element;
        });
    });
    layers.push([]); // empty layer for M
    var nodeCount = 0;
    var middleLayer = -1;
    var flat = Util.flatten;
    for (var _ref323 of layers.entries()) {
        var _ref322 = _slicedToArray(_ref323, 2);

        var i = _ref322[0];
        var layer = _ref322[1];

        nodeCount += layer.length;
        if (nodeCount > n / 2) {
            middleLayer = i;
            break;
        }
    }
    if (layers[middleLayer].length <= 4 * Math.sqrt(n)) return {
        v1: flat(layers.slice(0, middleLayer)),
        v2: flat(layers.slice(middleLayer + 1)),
        s: layers[middleLayer]
    };
    var m = middleLayer;
    while (layers[m].length > Math.sqrt(n)) m--;
    var M = middleLayer;
    while (layers[M].length > Math.sqrt(n)) m++;
    var A1 = layers.slice(0, m);
    var A2 = layers.slice(m + 1, M);
    var A3 = flat(layers.slice(M + 1));
    if (A2.reduce(function (sum, layer) {
        return sum + layer.length;
    }, 0) <= 2 / 3 * n) {
        return { v1: flat(A2), v2: flat([].concat(_toConsumableArray(A1), _toConsumableArray(A2))), s: [].concat(_toConsumableArray(layers[m]), _toConsumableArray(layers[M])) };
    }
    // |A2| > 2/3 n

    var _StepByStep$complete = StepByStep.complete(treeLemma(null, null));

    var v1_b = _StepByStep$complete.v1;
    var v2_b = _StepByStep$complete.v2;
    var s_b = _StepByStep$complete.s;

    return null;
}
function matching(G) {
    if (G.n >= 5) {
        var _PST = PST(G);

        var v1 = _PST.v1;
        var v2 = _PST.v2;
        var s = _PST.s;

        var g1 = G.subgraph(v1),
            g2 = G.subgraph(v2);
        var m1 = matching(g1),
            m2 = matching(g2);
        var m = m1.concat(m2);
        var _g = g1.union(g2);
        for (var v of s) {}
        return m;
    }
    return null;
}
document.addEventListener('DOMContentLoaded', function () {
    return GUI.init();
});
var TestGraphs = {
    testAGraph: function testAGraph() {
        return Graph.fromAscii("\n__________\n         1\n\n2\n\n         3\n__________", [1, 2, 3]);
    },
    testBGraph: function testBGraph() {
        return Graph.fromAscii("\n__________\n     1\n\n     2\n\n3        4", [1, 2, 3], [2, 4]);
    },
    testCGraph: function testCGraph() {
        return Graph.fromAscii("\n__________\n1  2\n\n3  4\n__________", [1, 2, 4, 3, 1], [2, 3]);
    },
    testDGraph: function testDGraph() {
        return Graph.fromAscii("\n__________\n1  2  3\n\n4  5  6  7\n\n  8  9\n__________", [1, 2, 3, 6, 5, 4, 1], [2, 5, 3], [7, 6, 9, 8, 4]);
    }
};
//# sourceMappingURL=tmp.js.map
//# sourceMappingURL=bin.js.map