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
var protocol_kit_1 = require("@safe-global/protocol-kit");
var api_kit_1 = require("@safe-global/api-kit");
var ethers_1 = require("ethers");
var protocol_kit_2 = require("@safe-global/protocol-kit");
require('dotenv').config();
function safeWalletCreator(signerPrivateKey) {
    return __awaiter(this, void 0, void 0, function () {
        var RPC_URL, provider, owner1Signer, safeAccountConfig, ethAdapterOwner1, txServiceUrl, safeService, safeFactory, safeSdkOwner1, safeAddress;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    RPC_URL = 'https://polygon-mumbai-bor.publicnode.com/';
                    provider = new ethers_1.ethers.providers.JsonRpcProvider(RPC_URL);
                    owner1Signer = new ethers_1.ethers.Wallet(signerPrivateKey, provider) //need private key, not public
                    ;
                    _a = {};
                    return [4 /*yield*/, owner1Signer.getAddress()];
                case 1:
                    safeAccountConfig = (_a.owners = [
                        _b.sent()
                    ],
                        _a.threshold = 1,
                        _a);
                    ethAdapterOwner1 = new protocol_kit_2.EthersAdapter({
                        ethers: ethers_1.ethers,
                        signerOrProvider: owner1Signer
                    });
                    txServiceUrl = 'https://safe-transaction-goerli.safe.global';
                    safeService = new api_kit_1.default({ txServiceUrl: txServiceUrl, ethAdapter: ethAdapterOwner1 });
                    return [4 /*yield*/, protocol_kit_1.SafeFactory.create({ ethAdapter: ethAdapterOwner1 })];
                case 2:
                    safeFactory = _b.sent();
                    return [4 /*yield*/, safeFactory.deploySafe({ safeAccountConfig: safeAccountConfig })];
                case 3:
                    safeSdkOwner1 = _b.sent();
                    return [4 /*yield*/, safeSdkOwner1.getAddress()];
                case 4:
                    safeAddress = _b.sent();
                    console.log('Your Safe has been deployed:');
                    console.log("https://goerli.etherscan.io/address/".concat(safeAddress));
                    console.log("https://app.safe.global/gor:".concat(safeAddress));
                    return [2 /*return*/];
            }
        });
    });
}
// Call start
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('before start');
                return [4 /*yield*/, safeWalletCreator(process.env.PRIVATE_KEY)];
            case 1:
                _a.sent();
                console.log('after start');
                return [2 /*return*/];
        }
    });
}); })();
