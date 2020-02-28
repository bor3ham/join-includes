# join-includes

[![Build Status](https://travis-ci.com/bor3ham/join-includes.svg?branch=master)](https://travis-ci.com/bor3ham/join-includes)
[![Coverage Status](https://coveralls.io/repos/github/bor3ham/join-includes/badge.svg?branch=master)](https://coveralls.io/github/bor3ham/join-includes?branch=master)
[![npm version](https://badge.fury.io/js/join-includes.svg)](http://badge.fury.io/js/join-includes)
![Downloads](http://img.shields.io/npm/dm/join-includes.svg?style=flat)

Function for re-treeing JSON API formatted payloads

# Usage

Add to your project:

```
npm install join-includes
```

And import the function:

```
import joinIncludes from 'join-includes'

fetch('http://your-site.com/api/whatever?include=otherstuff').then(response => {
  return response.json()
}).then(data => {
  const joinedData = joinIncludes(data.data, data.included)
  console.log(joinedData)
})
```
