"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OWNERSHIP_SIGNATURE_REQUEST = exports.OWNERSHIP_CLAIMS = exports.OWNERSHIP_AUTHS = exports.OWNERSHIP_CONFIG = exports.AuthType = exports.ClaimType = void 0;
var sismo_connect_client_1 = require("@sismo-core/sismo-connect-client");
Object.defineProperty(exports, "ClaimType", { enumerable: true, get: function () { return sismo_connect_client_1.ClaimType; } });
Object.defineProperty(exports, "AuthType", { enumerable: true, get: function () { return sismo_connect_client_1.AuthType; } });
exports.OWNERSHIP_CONFIG = {
    appId: "0xd9986c4f44e37fa4520cd661084e300b",
    vault: {
        impersonate: [
            "0x00f8C039BBc88085f07f9aA1e92DEdc8BBE01CC8"
        ],
    },
};
exports.OWNERSHIP_AUTHS = [
    { authType: sismo_connect_client_1.AuthType.VAULT },
];
exports.OWNERSHIP_CLAIMS = [
    {
        groupId: "0xda49a7e9a0d9250d763be33b3e1cbfe6",
    }
];
// Request users to sign a message
exports.OWNERSHIP_SIGNATURE_REQUEST = {
    message: "I love Sismo!",
    isSelectableByUser: true,
};
