FROM golang

COPY ./ /src

WORKDIR /src

RUN /src/gen-data.sh

RUN go build

RUN go install

ENTRYPOINT ["meme"]
