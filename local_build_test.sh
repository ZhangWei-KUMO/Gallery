#! /usr/bin/env bash
name=cont
image=webp 
docker stop cont
docker rm cont
yarn prod-build
docker build -t $image .
docker run --name $name -p 8080:80 -d $image