using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(AppDbContext context,ITokenService tokenService) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await EmailExists(registerDto.Email))
        {
            return BadRequest("Email is already taken");
        }

        using var hmac = new HMACSHA512(); // using keyword ensures disposal of hmac after we are done with it

        var user = new AppUser
        {
            DisplayName = registerDto.DisplayName,
            Email = registerDto.Email,
            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            passwordSalt = hmac.Key
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();

        return user.ToDto(tokenService);
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var email = (loginDto.Email ?? string.Empty).Trim().ToLowerInvariant();
        var user = await context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == email);

        if (user == null) return Unauthorized("Invalid email address");

        using var hmac = new HMACSHA512(user.passwordSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

        if (!computedHash.SequenceEqual(user.passwordHash)) return Unauthorized("Invalid Password");

          return user.ToDto(tokenService);
    }
    
    private async Task<bool> EmailExists(string email)
    {
        var normalized = (email ?? string.Empty).Trim().ToLowerInvariant();
        return await context.Users.AnyAsync(u => u.Email.ToLower() == normalized);
    }
}
