FROM golang

RUN go get -u -v github.com/nomad-software/meme

ENTRYPOINT ["meme"]
