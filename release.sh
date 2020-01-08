#!/usr/bin/env sh

npx gitmoji-changelog

git add -A
git commit -m ":bookmark: $0"
git tag $0
