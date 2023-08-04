package com.nakaligoba.backend.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class AwsS3Service {

    private final AmazonS3 amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public List<String> uploadPhotosV1(MultipartFile[] photos) {

        List<String> photoUrls = new ArrayList<>();
        for (MultipartFile photo : photos) {
            String createdURL = null;
            try {
                createdURL = uploadAndGetURL(photo);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            photoUrls.add(createdURL);
        }

        return photoUrls;
    }

    private String uploadAndGetURL(MultipartFile photo) throws IOException {
        String originalName = photo.getOriginalFilename(); // change it later to a better one
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(photo.getSize());
        metadata.setContentType(photo.getContentType());
        amazonS3Client.putObject(bucket, originalName, photo.getInputStream(), metadata);
        return amazonS3Client.getUrl(bucket, originalName).toString();
    }

}
