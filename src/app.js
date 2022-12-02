const express = require('express');
const app = express();
const cors = require('cors');

let root = {
    type: "dir",
    children: {
        home: {
            type: "dir",
            children: {
                myname: {
                    type: "dir",
                    children: {
                        "filea.txt": {
                            type: "file",
                        },
                        "fileb.txt": {
                            type: "file",
                        },
                        "projects": {
                            type: "dir",
                            children: {
                                mysupersecretproject: {
                                    type: "dir",
                                    children: {
                                        mysupersecretfile: {
                                           type: "file",
                                        },
                                    },
                                }
                            },
                        },
                        "myname": {
                            type: "dir",
                            children: {
                                mysupersecretname: {
                                    type: "dir",
                                    children: {
                                        mysupersecretnamefile: {
                                           type: "file",
                                        },
                                    },
                                }
                            },
                        },
                    }
                },
            },
        }
    },
};

const getChildren = (route, root) =>{
    let parent = root;
    let children = [];
    if(route.length === 1 && route[0] === 'root'){
        return Object.keys(root.children)
    }else if(route[0] !== 'root'){
        return 'not found'
    }
        
    for(let i=1; i<route.length;i++){
        if(!parent.children[route[i]])
            return 'not found'
        if(parent.children[route[i]].type === 'file')
            return 'is a file'
        parent = parent.children[route[i]];
    }
    children = Object.keys(parent.children);
    return children
}

//app.use(cors());
var corsOptions = {
    origin: "http://localhost:3000"
  };
  
  app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.header({"Access-Control-Allow-Origin": "*"});
    next();
}) 

app.use(express.json());
app.get('/*', (req, res)=>{
    //let files = getChildren(req.params[0], root, 'root');
    let files = getChildren(req.params[0].split('/'), root);
    res.send({response: files});
});

module.exports = app