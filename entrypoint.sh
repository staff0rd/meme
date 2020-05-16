#!/bin/bash

if [ $1 == "serve" ]; then
    dotnet run --project web/web.csproj --urls http://0.0.0.0:80
else
    meme "$@"
fi
