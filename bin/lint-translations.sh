#!/bin/bash

if grep ": \"\"" app/translations/*.json; then
  echo "Translations line count dont match"
  exit 1
fi
if [ ! "$(wc -l < app/translations/en.json)" -eq "$(wc -l < app/translations/nl.json)" ]; then
  echo "Translations line count dont match"
  exit 1
fi
