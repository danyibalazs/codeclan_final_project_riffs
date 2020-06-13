const express = require('express');
const router = express.Router();

const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );
const DOCUMENT = require('../models/Document');
require('dotenv').config();

const s3 = new aws.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  Bucket: process.env.BUCKET
});

const fileUpload = multer({
  storage: multerS3({
   s3: s3,
   bucket: process.env.BUCKET,
   acl: 'public-read',
   key: function (req, file, callback) {
    callback(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
   }
  })
}).single('file');

router.post( '/upload', ( req, res ) => {
  fileUpload( req, res, ( error ) => {
    if( error ){
    console.log( 'errors', error );
    res.json( { error: error } );
    } else {
    // If File not found
    if( req.file === undefined ){
      console.log( 'Error: No File Selected!' );
      res.json( 'Error: No File Selected' );
    } else {
      // If Success
      const fileName = req.file.key;
      const fileUrl = req.file.location;
      const title = req.body.title;
      const description = req.body.description;
    
      res.json({
        fileName: fileName,
        fileUrl: fileUrl
      });

      const newFileUploaded = {
        fileName: fileName,
        fileUrl: fileUrl,
        title: title,
        description: description
      }
      console.log(newFileUploaded);
      const document = new DOCUMENT(newFileUploaded);
      document.save();
    }
    }
  });
});

router.route("/").get((req, res, next) => {
  DOCUMENT.find(
      {},
      null,
      {
        sort: { createdAt: 1 }
      },
      (err, docs) => {
        if (err) {
          return next(err);
        }
        res.status(200).send(docs);
      }
    );
});

router.route("/edit/:id").put((req, res, next) => {
  DOCUMENT.findByIdAndUpdate(
    req.params.id,  
    { $set: { title: req.body.title, description: req.body.description} },
    { new: true },
    (err, updateDoc) => {
      if (err) {
        return next(err);
      }
      res.status(200).send(updateDoc);
    }
  );
});

router.route("/:id").delete((req, res, next) => {
  DOCUMENT.findByIdAndRemove(req.params.id, (err, result) => {
    
    if (err) {
      return next(err);
    }

    const fileName = result.fileName;

    let params = {
      Bucket: process.env.BUCKET,
      Key: fileName
    };

    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send({
          status: "200",
          responseType: "string",
          response: "success"
        });
      }
    });
  });
});

module.exports = router;