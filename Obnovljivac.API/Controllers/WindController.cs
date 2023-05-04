using Microsoft.AspNetCore.Mvc;
using Obnovljivac.API.Services.NasaPower;

namespace Obnovljivac.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WindController : ControllerBase
    {
        private readonly ILogger<WindController> _logger;
        private readonly INasaPowerService _powerService;

        public WindController(ILogger<WindController> logger, INasaPowerService nasaPowerService)
        {
            _logger = logger;
            _powerService = nasaPowerService;
        }

        [HttpGet]
        public async Task<IActionResult> GetWind()
        {
            var x = await _powerService.GetWind();
            return Ok(x);
        }
    }
}
