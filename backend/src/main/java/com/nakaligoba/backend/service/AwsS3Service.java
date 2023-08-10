package com.nakaligoba.backend.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.DeleteObjectsRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class AwsS3Service {

    private final AmazonS3 amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public List<String> uploadAllAndGetUrls(List<MultipartFile> photos) {

        List<String> photoUrls = new ArrayList<>();
        for (MultipartFile photo : photos) {
            String createdURL = null;
            try {
                createdURL = uploadAndGetUrl(photo);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            photoUrls.add(createdURL);
        }

        return photoUrls;
    }

    public String uploadAndGetUrl(MultipartFile photo) throws IOException {
        String originalName = photo.getOriginalFilename(); // change it later to a better one
        String uploadName = createUploadName(originalName);

        ObjectMetadata metadata = getObjectMetadata(photo);

        amazonS3Client.putObject(bucket, uploadName, photo.getInputStream(), metadata);
        return amazonS3Client.getUrl(bucket, uploadName).toString();
    }

    public void deleteAllByUrlsAtOnce(List<String> urls) {
        List<String> objectKeys = new ArrayList<>();
        for (String url : urls) {
            objectKeys.add(getObjectKey(url));
        }

        DeleteObjectsRequest dor = new DeleteObjectsRequest(bucket)
                .withKeys(objectKeys.toArray(new String[objectKeys.size()]));
        amazonS3Client.deleteObjects(dor);
    }

    public void deleteByUrl(String url) {
        String objectKey = getObjectKey(url);
        DeleteObjectRequest dor = new DeleteObjectRequest(bucket, objectKey);
        amazonS3Client.deleteObject(dor);
    }

    private String getObjectKey(String url) {
        int objectKeyStartAt = url.lastIndexOf("/") + 1;
        return url.substring(objectKeyStartAt);
    }

    private String createUploadName(String originalName) {
        String ext = extractExt(originalName);
        String uuid = UUID.randomUUID().toString();
        return uuid + "." + ext;
    }

    private String extractExt(String originalName) {
        int pos = originalName.lastIndexOf(".");
        return originalName.substring(pos + 1);
    }

    private ObjectMetadata getObjectMetadata(MultipartFile photo) {
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(photo.getSize());
        metadata.setContentType(photo.getContentType());
        return metadata;
    }

}
