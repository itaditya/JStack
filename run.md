We need to start mongodb so :
`mongod --storageEngine=mmapv1 --dbpath f:\data`
And Node app locally so :
`npm start`
For repairing mongodb :
`mongod --dbpath f:\data --repair`