#!/usr/bin/env sh

npm version patch
npx gitmoji-changelog

git add -A
git commit -m ":bookmark: v1.0.1"
git tag v1.0.1
