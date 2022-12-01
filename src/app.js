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
                    }
                },
            },
        }
    },
};

const getChildren = (fileName, parentFile, parentName) => {
    if(fileName === parentName || fileName === ''){
        if(parentFile.children !== undefined)
            return Object.keys(parentFile.children)
        return 'is a file'
    }
    if(parentFile.type === 'dir'){
        let childrenName = Object.keys(parentFile.children)
        for(let i=0; i<childrenName.length;i++){
            let children = getChildren(fileName, parentFile.children[childrenName[i]], childrenName[i]);
            if(children !== 'not found'){
                return children
            }
        }
        return 'not found'
    }
    return 'not found'
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
    let files = getChildren(req.params[0], root, 'root')
    res.send({response: files});
});

module.exports = app