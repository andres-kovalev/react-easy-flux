const packageJson = require('./../package.json');

const { writeFile } = require('./common');

packageJson.dependencies = Object.assign(
    packageJson.dependencies || {},
    packageJson.peerDependencies
);

writeFile('./package.json', JSON.stringify(packageJson, null, 4));
