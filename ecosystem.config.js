const yarrq = require("./base/Ayarlar/server.json").SUNUCU.GUILD_NAME
let cârtel = [
  {
    name: `${yarrq} Moderation`,
    namespace: "cartelfx",
    script: 'cartel',
    watch: false,
    exec_mode: "cluster",
    max_memory_restart: "2G",
    cwd: "./applications/Moderation"
  },
    {
    name: `${yarrq} İnvite`,
    namespace: "cartelfx",
    script: 'cartel',
    watch: false,
    exec_mode: "cluster",
    max_memory_restart: "2G",
    cwd: "./applications/İnvite"
  },
  {
    name: `${yarrq} Stats`,
    namespace: "cartelfx",
    script: 'cartel',
    watch: false,
    exec_mode: "cluster",
    max_memory_restart: "2G",
    cwd: "./applications/Stats"
  },
    {
    name: `${yarrq} Guard 1`,
    namespace: "cartelfx",
    script: 'cartel',
    watch: false,
    exec_mode: "cluster",
    max_memory_restart: "2G",
    cwd: "./applications/Guard_1"
  },
  {
    name: `${yarrq} Guard 2`,
    namespace: "cartelfx",
    script: 'cartel',
    watch: false,
    exec_mode: "cluster",
    max_memory_restart: "2G",
    cwd: "./applications/Guard_2"
  },
  {
    name: `${yarrq} Central`,
    namespace: "cartelfx",
    script: 'cartel',
    watch: false,
    exec_mode: "cluster",
    max_memory_restart: "2G",
    cwd: "./applications/Central"
  },
  {
    name: `${yarrq} Gates`,
    namespace: "cartelfx",
    script: 'test.js',
    watch: false,
    exec_mode: "cluster",
    max_memory_restart: "2G",
    cwd: "./applications/Gates"
  },
  {
    name: `${yarrq} Web`,
    namespace: "cartelfx",
    script: 'cartel',
    watch: false,
    exec_mode: "cluster",
    max_memory_restart: "2G",
    cwd: "./applications/Web"
  },
  ]

module.exports = {
  apps: cârtel
};