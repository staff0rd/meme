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
        public IEnumerable<string> Get()
        {
            return System.IO.Directory.GetFiles("../data/images")
                .Select(f => Path.GetFileName(f));
        }
    }
}
