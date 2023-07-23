"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEPOSIT_SIGNATURE_REQUEST = exports.DEPOSIT_CLAIMS = exports.DEPOSIT_AUTHS = exports.DEPOSIT_CONFIG = exports.AuthType = exports.ClaimType = void 0;
var sismo_connect_client_1 = require("@sismo-core/sismo-connect-client");
Object.defineProperty(exports, "ClaimType", { enumerable: true, get: function () { return sismo_connect_client_1.ClaimType; } });
Object.defineProperty(exports, "AuthType", { enumerable: true, get: function () { return sismo_connect_client_1.AuthType; } });
exports.DEPOSIT_CONFIG = {
    appId: "0xd9986c4f44e37fa4520cd661084e300b",
    vault: {
        impersonate: [
            "0x00f8C039BBc88085f07f9aA1e92DEdc8BBE01CC8"
        ],
    },
};
exports.DEPOSIT_AUTHS = [
    { authType: sismo_connect_client_1.AuthType.VAULT },
];
exports.DEPOSIT_CLAIMS = [
    {
        groupId: "0xda49a7e9a0d9250d763be33b3e1cbfe6",
        value: 10
    }
];
// Request users to sign a message
exports.DEPOSIT_SIGNATURE_REQUEST = {
    message: "I love Sismo!",
    isSelectableByUser: true,
};
