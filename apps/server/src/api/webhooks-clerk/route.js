"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = exports.dynamic = void 0;
var prisma_1 = require("@/prisma");
var server_1 = require("@trpc/server");
var svix_1 = require("svix");
exports.dynamic = 'force-dynamic';
// it requires an api to forward requests to local server
// it requires WEBHOOK_SECRET from Clerk Dashboard to be set in .env or .env.local
// listens for user.create event from Clerk and creates user in local database
function POST(request, res) {
    return __awaiter(this, void 0, void 0, function () {
        var WEBHOOK_SECRET, payload, svix_id, svix_timestamp, svix_signature, headers, wh, evt, userData, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    WEBHOOK_SECRET = process.env.NODE_ENV === 'production' ? process.env.CLERK_WEBHOOK_SECRET : process.env.CLERK_WEBHOOK_SECRET_TEST;
                    if (!WEBHOOK_SECRET) {
                        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
                    }
                    return [4 /*yield*/, request.body];
                case 1:
                    payload = _a.sent();
                    svix_id = request.get('svix-id');
                    svix_timestamp = request.get('svix-timestamp');
                    svix_signature = request.get('svix-signature');
                    headers = {
                        'svix-id': svix_id,
                        'svix-timestamp': svix_timestamp,
                        'svix-signature': svix_signature,
                    };
                    // If there are no headers, error out
                    if (!headers) {
                        throw new server_1.TRPCError({
                            code: 'BAD_REQUEST',
                        });
                    }
                    wh = new svix_1.Webhook(WEBHOOK_SECRET);
                    try {
                        evt = wh.verify(payload, headers);
                    }
                    catch (err) {
                        console.error('Error verifying webhook:', err);
                        throw new server_1.TRPCError({
                            code: 'INTERNAL_SERVER_ERROR',
                        });
                    }
                    if (!evt) return [3 /*break*/, 6];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    if (!(evt.type === 'user.updated' || evt.type === 'user.created')) return [3 /*break*/, 4];
                    userData = {
                        externalId: evt.data.id,
                        userName: evt.data.username,
                        displayName: "".concat(evt.data.first_name, " ").concat(evt.data.last_name),
                    };
                    return [4 /*yield*/, prisma_1.default.user.create({ data: userData })];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    res.status(200).send('OK');
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _a.sent();
                    console.error(err_1);
                    throw new server_1.TRPCError({
                        code: 'PARSE_ERROR',
                    });
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.POST = POST;
