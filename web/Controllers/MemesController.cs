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

        [HttpGet]
        [Route("generate")]
        public string[] Generate(string meme, string top, string bottom, bool trigger, bool shake)
        {
            var args = $"-i {meme} -t \"{top}|{bottom}\"";
            if (trigger)
                args += " -trigger";
            if (shake)
                args += " -shake";

            var proc = new Process 
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = "meme",
                    Arguments = args,
                    UseShellExecute = false,
                    RedirectStandardOutput = true,
                    CreateNoWindow = true
                }
            };
            proc.Start();
            var output = new List<string>();
            while (!proc.StandardOutput.EndOfStream)
            {
                string line = proc.StandardOutput.ReadLine();
                output.Add(line);
            }
            return output.ToArray();
        } 
    }
}
