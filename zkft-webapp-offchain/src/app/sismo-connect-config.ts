import {
  ClaimType,
  AuthType,
  SignatureRequest,
  AuthRequest,
  ClaimRequest,
  SismoConnectConfig,
} from "@sismo-core/sismo-connect-client";

export { ClaimType, AuthType };
export const CONFIG: SismoConnectConfig = {
  appId: "0xd9986c4f44e37fa4520cd661084e300b",
  vault: {
    impersonate: [
      "0x00f8C039BBc88085f07f9aA1e92DEdc8BBE01CC8"
    ],
  },
};

export const AUTHS: AuthRequest[] = [
  { authType: AuthType.VAULT },
];

export const CLAIMS: ClaimRequest[] = [
  {
    groupId: "0xda49a7e9a0d9250d763be33b3e1cbfe6",
    value: 10
  }
];

// Request users to sign a message
export const SIGNATURE_REQUEST: SignatureRequest = {
  message: "I love Sismo!",
  isSelectableByUser: true,
};
