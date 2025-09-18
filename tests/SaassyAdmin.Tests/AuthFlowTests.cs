using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace SaassyAdmin.Tests;

public class AuthFlowTests : IClassFixture<WebApplicationFactory<SaassyAdmin.Client.Server.Program>>
{
    private readonly WebApplicationFactory<SaassyAdmin.Client.Server.Program> _factory;
    public AuthFlowTests(WebApplicationFactory<SaassyAdmin.Client.Server.Program> factory)
    {
        _factory = factory.WithWebHostBuilder(builder => { });
    }

    [Fact]
    public async Task Get_Index_ReturnsSuccessHtml()
    {
        var client = _factory.CreateClient(new() { AllowAutoRedirect = true });
        var resp = await client.GetAsync("/");
        resp.EnsureSuccessStatusCode();
        var html = await resp.Content.ReadAsStringAsync();
        Assert.Contains("<!DOCTYPE html>", html, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public async Task Get_Register_PageLoads()
    {
        var client = _factory.CreateClient(new() { AllowAutoRedirect = true });
        var resp = await client.GetAsync("/authentication/register");
        resp.EnsureSuccessStatusCode();
        var html = await resp.Content.ReadAsStringAsync();
        Assert.Contains("<!DOCTYPE html>", html, StringComparison.OrdinalIgnoreCase);
    }
}
