const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'uncloud-agency',
  authorAddress: 'hi@getuncloud.com',
  defaultReleaseBranch: 'main',
  description: "CDK (v2) construct that enables making multiple DynamoDB GSI changes in one deployment",
  name: '@uncloud/aws-dynamodb-table-multi-gsis',
  repositoryUrl: 'https://github.com/uncloud-agency/aws-dynamodb-table-multi-gsis',
  jestOptions: {
    jestConfig: {
      runner: 'groups',
    },
  },
  cdkVersion: '2.69.0',
  deps: ['aws-cdk-lib', 'constructs'],
  devDeps: [
    'aws-sdk',
    '@types/aws-lambda',
    'jest-runner-groups',
  ],
  externals: ['aws-sdk'],
  // packageName: undefined,          /* The "name" in package.json. */
  // release: undefined,              /* Add release management to this project. */
  gitignore: ['cdk.out'],
});

const e2e = project.addTask('test:e2e', {
  exec: 'jest --group=e2e',
});

project.testTask.reset('jest --group=unit');

project.synth();
