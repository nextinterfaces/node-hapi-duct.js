Load test MySQL connections on node.js using siege
---
https://codeforgeek.com/2015/01/nodejs-mysql-tutorial/

```
node index< ... >.js
brew install siege
siege -c10 -t1M http://localhost:3000
```

Node Mysql driver
---
https://github.com/mysqljs/mysql