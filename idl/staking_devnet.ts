/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/pgn_staking.json`.
 */
export type PgnStaking = {
  address: "8icXpLgEgEVVbvhTAgL7W7AUMZbaUh1UJ1czMiQXCuVE";
  metadata: {
    name: "pgnStaking";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "addCustomDomain";
      discriminator: [218, 122, 170, 253, 19, 30, 237, 180];
      accounts: [
        {
          name: "domainRegistry";
          writable: true;
        },
        {
          name: "authority";
          signer: true;
          relations: ["domainRegistry"];
        }
      ];
      args: [
        {
          name: "name";
          type: "string";
        }
      ];
    },
    {
      name: "enableWithdrawals";
      discriminator: [97, 146, 76, 161, 177, 54, 109, 83];
      accounts: [
        {
          name: "programState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  112,
                  114,
                  111,
                  103,
                  114,
                  97,
                  109,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ];
              }
            ];
          };
        },
        {
          name: "userReward";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114, 95, 114, 101, 119, 97, 114, 100];
              },
              {
                kind: "arg";
                path: "userAddress";
              },
              {
                kind: "arg";
                path: "batchId";
              }
            ];
          };
        },
        {
          name: "marketMaker";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "batchId";
          type: "u64";
        },
        {
          name: "userAddress";
          type: "pubkey";
        }
      ];
    },
    {
      name: "initialize";
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [
        {
          name: "admin";
          writable: true;
          signer: true;
        },
        {
          name: "pgnMint";
        },
        {
          name: "programState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  112,
                  114,
                  111,
                  103,
                  114,
                  97,
                  109,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ];
              }
            ];
          };
        },
        {
          name: "vault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [118, 97, 117, 108, 116];
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "tokenProgram";
        }
      ];
      args: [];
    },
    {
      name: "initializeDomainRegistry";
      discriminator: [117, 160, 95, 91, 252, 34, 75, 131];
      accounts: [
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "programState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  112,
                  114,
                  111,
                  103,
                  114,
                  97,
                  109,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ];
              }
            ];
          };
        },
        {
          name: "domainRegistry";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  100,
                  111,
                  109,
                  97,
                  105,
                  110,
                  95,
                  114,
                  101,
                  103,
                  105,
                  115,
                  116,
                  114,
                  121
                ];
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "removeCustomDomain";
      discriminator: [123, 218, 7, 181, 63, 66, 188, 165];
      accounts: [
        {
          name: "domainRegistry";
          writable: true;
        },
        {
          name: "authority";
          signer: true;
          relations: ["domainRegistry"];
        }
      ];
      args: [
        {
          name: "domainType";
          type: "u8";
        }
      ];
    },
    {
      name: "setCanStake";
      discriminator: [98, 164, 229, 15, 18, 50, 139, 125];
      accounts: [
        {
          name: "programState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  112,
                  114,
                  111,
                  103,
                  114,
                  97,
                  109,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ];
              }
            ];
          };
        },
        {
          name: "admin";
          writable: true;
          signer: true;
        }
      ];
      args: [
        {
          name: "canStake";
          type: "bool";
        }
      ];
    },
    {
      name: "setPaused";
      discriminator: [91, 60, 125, 192, 176, 225, 166, 218];
      accounts: [
        {
          name: "programState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  112,
                  114,
                  111,
                  103,
                  114,
                  97,
                  109,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ];
              }
            ];
          };
        },
        {
          name: "admin";
          writable: true;
          signer: true;
        }
      ];
      args: [
        {
          name: "paused";
          type: "bool";
        }
      ];
    },
    {
      name: "setUserRewards";
      discriminator: [150, 244, 216, 70, 236, 29, 172, 157];
      accounts: [
        {
          name: "programState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  112,
                  114,
                  111,
                  103,
                  114,
                  97,
                  109,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ];
              }
            ];
          };
        },
        {
          name: "userReward";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114, 95, 114, 101, 119, 97, 114, 100];
              },
              {
                kind: "arg";
                path: "userAddress";
              },
              {
                kind: "arg";
                path: "batchId";
              }
            ];
          };
        },
        {
          name: "marketMaker";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "batchId";
          type: "u64";
        },
        {
          name: "userAddress";
          type: "pubkey";
        },
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "stake";
      discriminator: [206, 176, 202, 18, 200, 209, 179, 108];
      accounts: [
        {
          name: "programState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  112,
                  114,
                  111,
                  103,
                  114,
                  97,
                  109,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ];
              }
            ];
          };
        },
        {
          name: "userStake";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114, 95, 115, 116, 97, 107, 101];
              },
              {
                kind: "account";
                path: "user";
              }
            ];
          };
        },
        {
          name: "userTokenAccount";
          writable: true;
        },
        {
          name: "vault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [118, 97, 117, 108, 116];
              }
            ];
          };
        },
        {
          name: "user";
          writable: true;
          signer: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        },
        {
          name: "timelockBoost";
          type: {
            defined: {
              name: "timelockBoost";
            };
          };
        }
      ];
    },
    {
      name: "startPreparingBatch";
      discriminator: [166, 58, 229, 62, 125, 29, 26, 4];
      accounts: [
        {
          name: "programState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  112,
                  114,
                  111,
                  103,
                  114,
                  97,
                  109,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ];
              }
            ];
          };
        },
        {
          name: "batch";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [98, 97, 116, 99, 104];
              },
              {
                kind: "account";
                path: "program_state.next_batch_id";
                account: "programState";
              }
            ];
          };
        },
        {
          name: "marketMakerTokenAccount";
          writable: true;
        },
        {
          name: "marketMaker";
          writable: true;
          signer: true;
        },
        {
          name: "vault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [118, 97, 117, 108, 116];
              }
            ];
          };
        },
        {
          name: "domainRegistry";
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "domains";
          type: {
            vec: {
              defined: {
                name: "domainReward";
              };
            };
          };
        }
      ];
    },
    {
      name: "unstake";
      discriminator: [90, 95, 107, 42, 205, 124, 50, 225];
      accounts: [
        {
          name: "programState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  112,
                  114,
                  111,
                  103,
                  114,
                  97,
                  109,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ];
              }
            ];
          };
        },
        {
          name: "userStake";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114, 95, 115, 116, 97, 107, 101];
              },
              {
                kind: "account";
                path: "user";
              }
            ];
          };
        },
        {
          name: "userTokenAccount";
          writable: true;
        },
        {
          name: "vault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [118, 97, 117, 108, 116];
              }
            ];
          };
        },
        {
          name: "userReward";
          optional: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114, 95, 114, 101, 119, 97, 114, 100];
              },
              {
                kind: "account";
                path: "user";
              }
            ];
          };
        },
        {
          name: "user";
          writable: true;
          signer: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "updateCustomDomain";
      discriminator: [138, 94, 16, 146, 20, 238, 11, 32];
      accounts: [
        {
          name: "domainRegistry";
          writable: true;
        },
        {
          name: "authority";
          signer: true;
          relations: ["domainRegistry"];
        }
      ];
      args: [
        {
          name: "domainType";
          type: "u8";
        },
        {
          name: "isActive";
          type: "bool";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "batch";
      discriminator: [156, 194, 70, 44, 22, 88, 137, 44];
    },
    {
      name: "domainRegistry";
      discriminator: [226, 107, 164, 187, 87, 63, 140, 57];
    },
    {
      name: "programState";
      discriminator: [77, 209, 137, 229, 149, 67, 167, 230];
    },
    {
      name: "userReward";
      discriminator: [174, 124, 198, 235, 242, 192, 95, 93];
    },
    {
      name: "userStake";
      discriminator: [102, 53, 163, 107, 9, 138, 87, 153];
    }
  ];
  events: [
    {
      name: "batchStarted";
      discriminator: [171, 56, 230, 2, 106, 231, 14, 186];
    },
    {
      name: "canStakeSet";
      discriminator: [7, 161, 30, 176, 17, 53, 44, 109];
    },
    {
      name: "customDomainAdded";
      discriminator: [84, 8, 165, 254, 74, 151, 28, 252];
    },
    {
      name: "customDomainRemoved";
      discriminator: [154, 231, 232, 31, 181, 219, 147, 253];
    },
    {
      name: "customDomainUpdated";
      discriminator: [197, 78, 77, 119, 19, 115, 189, 238];
    },
    {
      name: "domainRegistryInitialized";
      discriminator: [75, 33, 16, 92, 36, 1, 237, 222];
    },
    {
      name: "pausedSet";
      discriminator: [171, 125, 127, 156, 233, 81, 68, 66];
    },
    {
      name: "programStateInitialized";
      discriminator: [52, 235, 156, 191, 223, 43, 109, 144];
    },
    {
      name: "stakeEvent";
      discriminator: [226, 134, 188, 173, 19, 33, 75, 175];
    },
    {
      name: "unstakeEvent";
      discriminator: [162, 104, 137, 228, 81, 3, 79, 197];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "unauthorizedCanStakeModification";
      msg: "Only admin can modify can_stake flag";
    },
    {
      code: 6001;
      name: "unauthorizedPauseModification";
      msg: "Only admin can pause/unpause the program";
    },
    {
      code: 6002;
      name: "domainNameTooLong";
      msg: "Domain name is too long (max 32 characters)";
    },
    {
      code: 6003;
      name: "inactiveDomain";
      msg: "Domain is not active";
    },
    {
      code: 6004;
      name: "domainAlreadyExists";
      msg: "Domain already exists";
    },
    {
      code: 6005;
      name: "unauthorizedDomainModification";
      msg: "Only authority can modify domains";
    },
    {
      code: 6006;
      name: "domainNotFound";
      msg: "Domain not found";
    },
    {
      code: 6007;
      name: "invalidDomainType";
      msg: "Invalid domain type";
    },
    {
      code: 6008;
      name: "invalidMintDecimals";
      msg: "The provided mint account must have 9 decimals";
    },
    {
      code: 6009;
      name: "invalidMintAuthority";
      msg: "The mint authority must be the admin";
    },
    {
      code: 6010;
      name: "batchNotFound";
      msg: "Batch not found";
    },
    {
      code: 6011;
      name: "invalidBatchAmount";
      msg: "Invalid batch amount";
    },
    {
      code: 6012;
      name: "rewardsAlreadySet";
      msg: "Rewards already set for this batch";
    },
    {
      code: 6013;
      name: "unauthorizedBatchCreation";
      msg: "Only market maker can create batches";
    },
    {
      code: 6014;
      name: "duplicateDomainInBatch";
      msg: "Duplicate domain in batch";
    },
    {
      code: 6015;
      name: "invalidTokenAccount";
      msg: "Token account must be owned by market maker";
    },
    {
      code: 6016;
      name: "invalidMint";
      msg: "Token account must be of the correct mint";
    },
    {
      code: 6017;
      name: "insufficientAmount";
      msg: "Insufficient token amount for staking";
    },
    {
      code: 6018;
      name: "timelockNotExpired";
      msg: "Cannot unstake before timelock period expires";
    },
    {
      code: 6019;
      name: "stakingDisabled";
      msg: "Staking is currently disabled";
    },
    {
      code: 6020;
      name: "programPaused";
      msg: "Program is currently paused";
    },
    {
      code: 6021;
      name: "invalidTimelockPeriod";
      msg: "Invalid timelock period. Must be at least the minimum lock period";
    },
    {
      code: 6022;
      name: "withdrawalsNotEnabled";
      msg: "Withdrawals are not enabled for this reward";
    },
    {
      code: 6023;
      name: "invalidRewardAmount";
      msg: "Invalid reward amount";
    },
    {
      code: 6024;
      name: "invalidOwner";
      msg: "Invalid owner for reward account";
    },
    {
      code: 6025;
      name: "activeTimelock";
      msg: "Cannot modify existing stake while timelock is active";
    },
    {
      code: 6026;
      name: "existingStakeActive";
      msg: "Must unstake existing position before creating a new one";
    },
    {
      code: 6027;
      name: "invalidOperation";
      msg: "Invalid operation parameters";
    }
  ];
  types: [
    {
      name: "batch";
      docs: ["Represents a batch of rewards that will be distributed to users"];
      type: {
        kind: "struct";
        fields: [
          {
            name: "batchId";
            docs: ["Unique identifier for this batch"];
            type: "u64";
          },
          {
            name: "domains";
            docs: ["List of domain-specific reward allocations"];
            type: {
              vec: {
                defined: {
                  name: "domainReward";
                };
              };
            };
          },
          {
            name: "totalAmount";
            docs: ["Total amount of PGN tokens allocated for this batch"];
            type: "u64";
          },
          {
            name: "createdAt";
            docs: ["Timestamp when this batch was created"];
            type: "i64";
          },
          {
            name: "authority";
            docs: ["Authority that can modify this batch (usually the admin)"];
            type: "pubkey";
          },
          {
            name: "rewardsSet";
            docs: ["Whether rewards have been set for this batch"];
            type: "bool";
          },
          {
            name: "bump";
            docs: ["Bump seed for PDA derivation"];
            type: "u8";
          }
        ];
      };
    },
    {
      name: "batchStarted";
      type: {
        kind: "struct";
        fields: [
          {
            name: "batchId";
            type: "u64";
          },
          {
            name: "totalAmount";
            type: "u64";
          },
          {
            name: "createdAt";
            type: "i64";
          },
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "domains";
            type: {
              vec: {
                defined: {
                  name: "domainReward";
                };
              };
            };
          }
        ];
      };
    },
    {
      name: "canStakeSet";
      type: {
        kind: "struct";
        fields: [
          {
            name: "canStake";
            type: "bool";
          }
        ];
      };
    },
    {
      name: "customDomain";
      docs: ["Represents a custom domain configuration"];
      type: {
        kind: "struct";
        fields: [
          {
            name: "name";
            docs: ["Domain name"];
            type: "string";
          },
          {
            name: "domainType";
            docs: ["Unique identifier for the domain"];
            type: "u8";
          },
          {
            name: "isActive";
            docs: ["Whether the domain is currently active"];
            type: "bool";
          }
        ];
      };
    },
    {
      name: "customDomainAdded";
      type: {
        kind: "struct";
        fields: [
          {
            name: "name";
            type: "string";
          },
          {
            name: "domainType";
            type: "u8";
          },
          {
            name: "isActive";
            type: "bool";
          }
        ];
      };
    },
    {
      name: "customDomainRemoved";
      type: {
        kind: "struct";
        fields: [
          {
            name: "domainType";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "customDomainUpdated";
      type: {
        kind: "struct";
        fields: [
          {
            name: "domainType";
            type: "u8";
          },
          {
            name: "isActive";
            type: "bool";
          }
        ];
      };
    },
    {
      name: "domainRegistry";
      docs: ["Registry for managing custom domains"];
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            docs: ["Authority that can add/modify domains"];
            type: "pubkey";
          },
          {
            name: "customDomains";
            docs: ["List of custom domains"];
            type: {
              vec: {
                defined: {
                  name: "customDomain";
                };
              };
            };
          },
          {
            name: "nextDomainType";
            docs: ["Next available domain type identifier"];
            type: "u8";
          },
          {
            name: "bump";
            docs: ["Account bump"];
            type: "u8";
          }
        ];
      };
    },
    {
      name: "domainRegistryInitialized";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "customDomains";
            type: "u32";
          },
          {
            name: "nextDomainType";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "domainReward";
      docs: ["Represents a reward allocation for a specific domain"];
      type: {
        kind: "struct";
        fields: [
          {
            name: "domainName";
            docs: ['Name of the domain (e.g., "Paragon", "Helios", etc.)'];
            type: "string";
          },
          {
            name: "amount";
            docs: ["Amount of PGN tokens allocated for rewards in this domain"];
            type: "u64";
          }
        ];
      };
    },
    {
      name: "pausedSet";
      type: {
        kind: "struct";
        fields: [
          {
            name: "paused";
            type: "bool";
          }
        ];
      };
    },
    {
      name: "programState";
      type: {
        kind: "struct";
        fields: [
          {
            name: "rootAdmin";
            type: "pubkey";
          },
          {
            name: "marketMaker";
            docs: ["Market Maker authority for creating reward batches"];
            type: "pubkey";
          },
          {
            name: "pgnMint";
            docs: ["Address of the PGN token mint"];
            type: "pubkey";
          },
          {
            name: "canStake";
            docs: ["Flag to enable/disable staking program-wide"];
            type: "bool";
          },
          {
            name: "paused";
            docs: ["Flag for emergency pause of all operations"];
            type: "bool";
          },
          {
            name: "minimumLockPeriod";
            docs: ["Minimum lock period in seconds (1 month)"];
            type: "i64";
          },
          {
            name: "nextBatchId";
            docs: ["Next available batch ID"];
            type: "u64";
          },
          {
            name: "bump";
            docs: ["Bump seed for PDA derivation"];
            type: "u8";
          }
        ];
      };
    },
    {
      name: "programStateInitialized";
      type: {
        kind: "struct";
        fields: [
          {
            name: "rootAdmin";
            type: "pubkey";
          },
          {
            name: "marketMaker";
            type: "pubkey";
          },
          {
            name: "pgnMint";
            type: "pubkey";
          },
          {
            name: "canStake";
            type: "bool";
          },
          {
            name: "paused";
            type: "bool";
          }
        ];
      };
    },
    {
      name: "stakeEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "user";
            docs: ["The user who staked"];
            type: "pubkey";
          },
          {
            name: "amount";
            docs: ["Amount of tokens staked"];
            type: "u64";
          },
          {
            name: "timelockBoost";
            docs: ["The timelock boost selected"];
            type: {
              defined: {
                name: "timelockBoost";
              };
            };
          },
          {
            name: "timestamp";
            docs: ["Timestamp when the stake was made"];
            type: "i64";
          }
        ];
      };
    },
    {
      name: "timelockBoost";
      docs: [
        "Represents the different boost multipliers based on timelock duration"
      ];
      type: {
        kind: "enum";
        variants: [
          {
            name: "noLock";
          },
          {
            name: "oneMonth";
          },
          {
            name: "threeMonths";
          },
          {
            name: "sixMonths";
          },
          {
            name: "nineMonths";
          }
        ];
      };
    },
    {
      name: "unstakeEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "user";
            docs: ["The user who unstaked"];
            type: "pubkey";
          },
          {
            name: "amount";
            docs: ["Amount of tokens unstaked"];
            type: "u64";
          },
          {
            name: "timestamp";
            docs: ["Timestamp when the unstake was made"];
            type: "i64";
          }
        ];
      };
    },
    {
      name: "userReward";
      type: {
        kind: "struct";
        fields: [
          {
            name: "owner";
            docs: ["The owner of this reward account"];
            type: "pubkey";
          },
          {
            name: "amount";
            docs: ["Amount of PGN tokens to be rewarded"];
            type: "u64";
          },
          {
            name: "canWithdraw";
            docs: ["Whether the user can withdraw the reward"];
            type: "bool";
          },
          {
            name: "batchId";
            docs: ["The batch ID this reward belongs to"];
            type: "u64";
          },
          {
            name: "bump";
            docs: ["Bump seed for PDA derivation"];
            type: "u8";
          }
        ];
      };
    },
    {
      name: "userStake";
      docs: ["Represents a user's stake in the program"];
      type: {
        kind: "struct";
        fields: [
          {
            name: "owner";
            docs: ["The owner of this stake account"];
            type: "pubkey";
          },
          {
            name: "amount";
            docs: ["Amount of PGN tokens staked"];
            type: "u64";
          },
          {
            name: "timelockEnd";
            docs: ["Unix timestamp when the timelock expires"];
            type: "i64";
          },
          {
            name: "timelockBoost";
            docs: ["Current timelock boost multiplier"];
            type: {
              defined: {
                name: "timelockBoost";
              };
            };
          },
          {
            name: "bump";
            docs: ["Bump seed for PDA derivation"];
            type: "u8";
          }
        ];
      };
    }
  ];
};