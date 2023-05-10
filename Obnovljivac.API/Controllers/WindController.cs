using Microsoft.AspNetCore.Mvc;
using Obnovljivac.API.Models.BindingModels;
using Obnovljivac.API.Services.NasaPower;
using Obnovljivac.API.Services.Wind;

namespace Obnovljivac.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WindController : ControllerBase
    {
        private readonly ILogger<WindController> _logger;
        private readonly IWindService _windService;

        public WindController(ILogger<WindController> logger, IWindService windService)
        {
            _logger = logger;
            _windService = windService;
        }

        [HttpPost]
        //public async Task<IActionResult> CalculateWindPower()
        public async Task<IActionResult> CalculateWindPower([FromBody] WindCalculatorBindingModel model)
        {
            var x = await _windService.CalculateEnergy(model);
            return Ok(x);
        }
    }
}
