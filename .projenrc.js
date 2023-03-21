const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Florian CHAZAL',
  authorAddress: 'florianchazal@gmail.com',
  cdkVersion: '2.69.0',
  defaultReleaseBranch: 'main',
  name: 'aws-dynamodb-table-multi-gsis',
  repositoryUrl: 'https://github.com/flochaz/aws-dynamodb-table-multi-gsis.git',
  jestOptions: {
    jestConfig: {
      runner: 'groups',
    },
  },
  cdkDependenciesAsDeps: false,
  cdkDependencies: ['aws-cdk-lib'],
  cdkTestDependencies: ['@aws-cdk/aws-applicationautoscaling', '@aws-cdk/aws-kinesis', '@aws-cdk/aws-kms'],
  externals: ['aws-sdk'],
  // description: undefined,          /* The description is just a string that helps people understand the purpose of the package. */
  devDeps: [
    'aws-sdk',
    'jest-runner-groups',
    'aws-cdk-lib',
    'constructs',
  ],
  // packageName: undefined,          /* The "name" in package.json. */
  // release: undefined,              /* Add release management to this project. */
  gitignore: ['cdk.out'],
});

const e2e = project.addTask('test:e2e', {
  exec: 'jest --group=e2e',
});

project.testTask.reset('jest --group=unit');

project.synth();
