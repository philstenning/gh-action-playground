const core = require('@actions/core')
const github = require('@actions/github')
const glob = require('@actions/glob')

async function printFiles() {

    const globber = await glob.create('**')
    for await (const file of globber.globGenerator()) {
      console.log(file)
    }

}

async function main(){

  try {
    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('who-to-greet')
    console.log(`Hello ${nameToGreet}!`)
    const time = new Date().toTimeString()
    core.setOutput('time', time)
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`)
   await printFiles()
  } catch (error) {
    core.setFailed(error.message)
  }
  
}

main().then(f=>console.log('done')).catch(e=>console.log(e))
