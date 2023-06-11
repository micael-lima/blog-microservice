module.exports = {
  apps : [{
    name   : "client",
    script : "npm --prefix ./packages/client run start",
  }, {
    name   : "comments",
    script : "npm --prefix ./packages/comments run start",
  }, {
    name   : "event-bus",
    script : "npm --prefix ./packages/event-bus run start",
  }, {
    name   : "moderation",
    script : "npm --prefix ./packages/moderation run start",
  }, {
    name   : "posts",
    script : "npm --prefix ./packages/posts run start",
  }, {
    name   : "query",
    script : "npm --prefix ./packages/query run start",
    exec_mode: "cluster",
    instances: "max"
  }]
}
