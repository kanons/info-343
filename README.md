# Challenges

This repo will contain of the code for the individual challenges for the quarter. The code for each challenge will be stored in its own folder (`challenge#`).

**Important**: You will have access to view your challenges repo and the original challenges repo, and only you and the teaching will have access to view your challenges repo.

## Add original repo as remote

After cloning this repo, run the following commands (you only need to do this once per computer):

```bash
cd challenges
git remote add challenges git@github.com:info343e-au16/challenges.git
```

This will register the original repo (where the teaching team will commit the starter code for each challenge) as a `remote` that you can `pull` from.

## Updating your repo with new starter code

When a new assingment has been posted, you must run the following command to update your repo with the starter code for that week's challenge.

```bash
git pull challenges master
```

## Working on challenges

After updating your repo with the starter code for the week's challenge, create a new branch in the repo (the name will be specified in the write up) and switch to it.

```
# New assignment posted, update repo
git pull challenges master

# Create and switch to new branch
git branch challenge2

# cd into the folder for the challenge
cd challenge2
```

Any commits you make while working on the challenge should be made in the directory and branch for that challenge.

## Turning in your challenge

When you are ready to turn in your challenge, please create a pull request from your challenge branch into `master`.

```bash
# Commit your files
git add .
git commit -m "Files for Challenge 1"

# Push your new branch to github
git push -u
```

Go to your repo on Github, and click the button at the top to create a new pull request.

When your pull request has been created and you are ready to have it graded, **please submit the url to the opened pull request to the assignment on Canvas**.

## Feedback

The teaching team will provide feedback on your challenge using the PR code review tools on Github.

Final grades for each challenge will posted on Canvas.
