"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validateEnv_1 = require("@/utils/validateEnv");
var route_1 = require("./api/webhooks-clerk/route");
var standalone_1 = require("@trpc/server/adapters/standalone");
var body_parser_1 = require("body-parser");
var cors_1 = require("cors");
var express_1 = require("express");
var routers_1 = require("routers");
(0, validateEnv_1.ValidateEnv)();
var port = 3000;
var app = (0, express_1.default)();
var clientUrl = process.env.NODE_ENV === 'production' ? 'https://mativated.space' : 'http://localhost:5173';
app.use((0, cors_1.default)({
    credentials: true,
    origin: clientUrl,
}));
app.post('/api/webhooks/user', body_parser_1.default.raw({ type: 'application/json' }), function (req, res) { return (0, route_1.POST)(req, res); });
console.log('Server is running.');
app.use('/trpc', (0, standalone_1.createHTTPHandler)({
    router: routers_1.mergedRouter,
}));
app.listen(port);
