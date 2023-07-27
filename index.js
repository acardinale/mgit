#!/usr/bin/env node

const simpleGit = require('simple-git')
const Listr = require('listr')
const Table = require('cli-table3')

const readFileSync = require('fs').readFileSync
const join = require('path').join
const git = simpleGit()

const projectDirname = process.cwd()

// !TODO check if config file exists
const repos = JSON.parse(
  readFileSync(
    join(projectDirname, '/.mgit.json')
  )
)
// !TODO check config file format

const args = process.argv.slice(2)

const showOutputTable = (outputs) => {
  const table = new Table({
    chars: {
      top: '',
      'top-mid': '',
      'top-left': '',
      'top-right': '',
      bottom: '',
      'bottom-mid': '',
      'bottom-left': '',
      'bottom-right': '',
      left: '',
      'left-mid': '',
      // 'mid': '' ,
      'mid-mid': '',
      right: '',
      'right-mid': ''
      // 'middle': ' '
    }
  })
  for (const output of outputs) {
    table.push(output)
  }
  console.log(table.toString())
}

const cmds = []
if (args[0] === 'clone') {
  for (const repo of repos) {
    cmds.push(
      {
        title: repo.name,
        task: async (ctx) => {
          let output
          if (repo.path === './') {
            output = 'SKIP because is ./ path'
          } else {
            await git.clone(repo.url, repo.path)
            output = 'Cloned into ' + repo.path
          }
          ctx.outputs.push([repo.name, output])
        }
      }
    )
  }

  const tasks = new Listr(cmds)

  tasks.run({
    outputs: []
  }).then(ctx => {
    showOutputTable(ctx.outputs)
  })
} else {
  for (const repo of repos) {
    cmds.push(
      {
        title: repo.name,
        task: async (ctx) => {
          const output = await simpleGit(repo.path).raw(args)
          ctx.outputs.push([repo.name, output])
        }
      }
    )
  };
  const tasks = new Listr(cmds)
  tasks.run({
    outputs: []
  }).then(ctx => {
    showOutputTable(ctx.outputs)
  })
}
