# memes in a container

* [Source](https://github.com/staff0rd/meme) - container, web ui
* [Upstream](https://github.com/nomad-software/meme) - comand line, memes

## Web

```bash
docker run -it -p 8085:80 staff0rd/meme -serve
```

Then browse to http://localhost:8085

## Command Line

The following will drop `meme.png` to your `$(PWD)`
```bash
docker run -v $(PWD):/tmp staff0rd/meme -i archer-do-you-want -t "do you want memes in a container?|because this is how you get memes in a container"
```
See what it can do
```bash
docker run staff0rd/meme --help
```

[Upstream docs](https://github.com/nomad-software/meme)

## Dev

```bash
docker run -it --entrypoint bash -v $(PWD):/src -p 5000:5000 staff0rd/meme
cd web
dotnet run --urls http://0.0.0.0:5000
```
