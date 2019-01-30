'use strict'

const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const graphqlHTTP = require('express-graphql')
const { makeExecutableSchema } = require('graphql-tools')
const pg = require('pg')
