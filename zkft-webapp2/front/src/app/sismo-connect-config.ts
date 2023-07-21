import {
  ClaimType,
  AuthType,
  SignatureRequest,
  AuthRequest,
  ClaimRequest,
  SismoConnectConfig,
} from "@sismo-core/sismo-connect-client";

export { ClaimType, AuthType };

// For development purposes insert the Data Sources that you want to impersonate
// Never use this in production
// the appId is not referenced here as it is set directly in the contract
export const CONFIG: SismoConnectConfig = {
  appId: "0xd9986c4f44e37fa4520cd661084e300b",
  vault: {
    impersonate: [
      "0x00f8C039BBc88085f07f9aA1e92DEdc8BBE01CC8"
    ],
  },
};

export const AUTHS: AuthRequest[] = [
  // vaultId = hash(vaultSecret, appId).
  // full docs: https://docs.sismo.io/sismo-docs/build-with-sismo-connect/technical-documentation/vault-and-proof-identifiers
  { authType: AuthType.VAULT }
];

export const CLAIMS: ClaimRequest[] = [
  {
    groupId: "0xda49a7e9a0d9250d763be33b3e1cbfe6",
    value: 10
  }
];
