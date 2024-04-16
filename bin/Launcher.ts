#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import * as path from "path";
import * as dotenv from "dotenv";
import { CdkPipelineStack } from "../lib/stack/CdkPipelineStack";

dotenv.config({ path: path.join(__dirname, "..", ".env") });
const appId = `${process.env.APP_NAME!}-${process.env.ENV_NAME!}`;

const app = new cdk.App();
new CdkPipelineStack(app, `${appId}-stack`, {
  appName: process.env.APP_NAME!,
  envName: process.env.ENV_NAME!,
  repoOwnerName: process.env.REPO_OWNER_NAME!,
  repoName: process.env.REPO_NAME!,
  branchName: process.env.BRANCH_NAME!,
  connectionId: process.env.CONNECTION_ID!,
  hostedZoneId: process.env.HOSTED_ZONE_ID!,
  zoneName: process.env.ZONE_NAME!,
  env: {
    account: process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION,
  },
  terminationProtection: true,
});
