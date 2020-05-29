FROM golang

# install dotnetcore
RUN apt-get update
RUN apt-get install libicu-dev -y
RUN curl -sSL https://dot.net/v1/dotnet-install.sh | bash /dev/stdin --channel LTS --install-dir /usr/local/bin/

# install nodejs
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

COPY ./ /src
WORKDIR /src

# build meme generator
RUN /src/gen-data.sh
RUN go build
RUN go install

# build front-end
RUN dotnet build web

ENTRYPOINT ["./entrypoint.sh"]
