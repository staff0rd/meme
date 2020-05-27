using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MemesController : ControllerBase
    {
        private readonly ILogger<MemesController> _logger;

        public MemesController(ILogger<MemesController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<object> Get()
        {
            return System.IO.Directory.GetFiles("../data/images")
                .OrderBy(f => f)
                .Select(f => new {
                    path = Path.Combine("memes", Path.GetFileName(f)),
                    name = Path.GetFileNameWithoutExtension(f),
                });
        }

        public class Result
        {
            public string[] Output { get; set; }
            public string[] Errors { get; set; }
            public Guid Name { get; set; }
        }

        [HttpGet]
        [Route("image/{name}.{type}")]
        public async Task<IActionResult> GetImage([FromRoute] Guid name, [FromRoute] string type)
        {
            if (type != "gif" && type != "png")
            {
                return BadRequest();
            }

            var bytes = await System.IO.File.ReadAllBytesAsync(System.IO.Path.Combine(
                "/tmp",
                $"{name.ToString()}.{type}"
            ));

            return File(bytes, $"image/{type}");
        }

        [HttpGet]
        [Route("generate")]
        public Result Generate(string meme, string top, string bottom, bool trigger, bool shake)
        {
            Guid name = Guid.NewGuid();

            var args = $"-i {meme} -t \"{top}|{bottom}\"";

            if (trigger)
                args += " -trigger";
            if (shake)
                args += " -shake";
            if (shake || trigger)
            {
                args += $" -o /tmp/{name}.gif";
            }
            else
            {
                args += $" -o /tmp/{name}.png";
            }
            
            var proc = new Process 
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = "meme",
                    Arguments = args,
                    UseShellExecute = false,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    CreateNoWindow = true
                }
            };
            proc.Start();

            var output = Read(proc.StandardOutput).ToArray();
            var errors = Read(proc.StandardError).ToArray();

            if (errors.Any())
                _logger.LogError(args);
            else
                _logger.LogInformation(args);
            
            return new Result {
                Output = output,
                Errors = errors,
                Name = name,
            };
        } 

        public IEnumerable<string> Read(StreamReader stream)
        {
            while (!stream.EndOfStream)
                yield return stream.ReadLine();
        }
    }
}
