const fs = require('fs')
const path = require('path')
let source = require('../package.json')

function main() {
  source.scripts = {}
  source.devDependencies = {}
  const sourcePath = 'dist/src'

  if (source.main.startsWith(sourcePath)) {
    source.main = source.main.slice(sourcePath.length)
  }

  if (source.typings.startsWith(sourcePath)) {
    source.typings = source.typings.slice(8)
  }

  fs.writeFileSync(path.join(sourcePath, 'package.json'),
    Buffer.from(JSON.stringify(source, null, 2), 'utf-8')
  )
  fs.writeFileSync(path.join(sourcePath, 'version.txt'),
    Buffer.from(source.version, 'utf-8')
  )

  fs.copyFileSync(path.join(__dirname, '.npmignore'), path.join(sourcePath,'.npmignore'))
}

main()
