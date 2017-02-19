# Contributing guide
Want to contribute to **next-new**? Awesome!
There are many ways you can contribute, see below.

## Opening issues
Open an issue to report bugs or to propose new features.

## Proposing pull requests
Pull requests are very welcome. Note that if you are going to propose drastic changes, be sure to open an issue for discussion first, to make sure that your PR will be accepted before you spend effort coding it.

# Start developing!
1. Fork this repo to your own account
2. run `git clone https://github.com/YOUR_ACCOUNT/next-new.git` in a terminal
3. goto the next-new dir `cd next-new` and install all dependencies with `npm install`
    1. to keep your forked version up-to-date add an upstream: `git remote add upstream https://github.com/ntwcklng/next-new.git`
    2. `git checkout master && git fetch upstream`
    3. `git rebase upstream/master`
    4. `git push -f origin`
4. create a new Branch with `git checkout -b fix-issue` and start developing
5. make sure all tests pass: `npm run test`
6. open an issue / pull request on GitHub
