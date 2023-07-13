﻿
using Domain.Models;
using Domain.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class StarcraftBuildOrdersController : ControllerBase
{
    private readonly IBuildOrdersService<StarcraftBuildOrder> _buildOrdersService;

    public StarcraftBuildOrdersController(BuildOrdersServiceFactory serviceFactory)
    {
        _buildOrdersService = serviceFactory.CreateStarcraftBuildOrdersService();
    }

    [HttpGet]
    public async Task<IActionResult> GetStarcraftBuildOrders(
        [FromQuery] string? title,
        [FromQuery] string? faction,
        [FromQuery] string? opponentFaction,
        [FromQuery] string? uploadedBy,
        [FromQuery] string? gameMode,
        [FromQuery] int page = 1
        )
    {
        var response = await _buildOrdersService.GetBuildOrders(page, title, faction, opponentFaction, uploadedBy, gameMode);

        return Ok(response);
    }

    [HttpGet("detail")]
    public async Task<IActionResult> GetStarcraftBuildOrderById([FromQuery] string id)
    {
        var response = await _buildOrdersService.GetBuildOrderById(id);
        return Ok(response);
    }
}