using System;
using System.Collections.Generic;
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
    }
}
