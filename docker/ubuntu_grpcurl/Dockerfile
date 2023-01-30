# This is a `Dockerfile` for the image that will run the tests.
# It has `grpcurl` and `jq` installed.

FROM ubuntu:latest

RUN apt-get update

RUN apt-get install -y wget jq

RUN apt-get install -y golang

RUN wget https://github.com/fullstorydev/grpcurl/archive/v1.5.1.tar.gz
RUN tar -zxvf v1.5.1.tar.gz
RUN (cd grpcurl-1.5.1/cmd/grpcurl/; go build && cp grpcurl /usr/local/bin)
