package com.newmedia.deafapi.api.services;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSBuckets;
import com.mongodb.client.gridfs.model.GridFSFile;
import com.mongodb.gridfs.GridFSDBFile;
import com.newmedia.deafapi.api.dataservices.docModels.DocVideo;
import com.newmedia.deafapi.api.dataservices.impl.mongo.MongoVideoRepository;
import com.newmedia.deafapi.api.services.Interfaces.IVideoService;
import com.newmedia.deafapi.api.utils.mongo.MongoGridFsTemplate;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

@Service
public class VideoService implements IVideoService {

    @Autowired
    private GridFsOperations gridOperations;
    @Autowired
    MongoGridFsTemplate mongoGridFsTemplate;

    @Override
    public MultipartFile getVideo(String id) throws IOException, ClassNotFoundException {
        // read file from MongoDB
        GridFSFile vidFile = gridOperations.findOne(new Query(Criteria.where("_id").is(id)));
        GridFSBucket gridFSBucket = GridFSBuckets.create(mongoGridFsTemplate.mongoDbFactory().getDb());
        ByteArrayOutputStream byteStream = new ByteArrayOutputStream();
        File file = new File("testFile00001.mp4");
        FileOutputStream streamToDownloadTo = new FileOutputStream(file);
        gridFSBucket.downloadToStream(vidFile.getId(), streamToDownloadTo);

        byte[] a = byteStream.toByteArray();
        ByteArrayInputStream in = new ByteArrayInputStream(a);
        ObjectInputStream is = new ObjectInputStream(in);
        MultipartFile emp = (MultipartFile) is.readObject();
        return null;


    }

    @Override
    public String saveVideo(MultipartFile file) throws IOException {
        DBObject metaData = new BasicDBObject();
        metaData.put("organization", "Video");

        /**
         * 1. save an image file to MongoDB
         */

        // Get input file
        InputStream vidStream = new ByteArrayInputStream(file.getBytes());
        metaData.put("type", "video");

        // Store file to MongoDB
        String videoId = gridOperations.store(vidStream,  " video/mp4", metaData).toString();

        return videoId;
    }
}
