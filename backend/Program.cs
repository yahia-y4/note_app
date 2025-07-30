using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NoteApp.Data;
using NoteApp.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();
builder.Services.AddRouting();
builder.Services.AddAuthorization();
builder.Services.AddControllers();



// الاتصال بقاعدة البيانات
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// إعداد JWT
var key = "M5p#G7r!J2k&Z9q*L1v^B3x@N8d$T6e@";
var keyBytes = Encoding.UTF8.GetBytes(key);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
            ValidateLifetime = true
        };
    });

var app = builder.Build();


app.UseRouting();
app.UseCors(policy =>
    policy.AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowAnyHeader());

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

// ===================== APIs =======================

// تسجيل الدخول
app.MapPost("/login", async (AppDbContext db, User user) =>
{
    var existUser = await db.Users.FirstOrDefaultAsync(u => u.UserName == user.UserName && u.Password == user.Password);

    if (existUser == null)
        return Results.Unauthorized();

    var claims = new[]
    {
        new Claim(ClaimTypes.Name, existUser.UserName),
        new Claim(ClaimTypes.NameIdentifier, existUser.Id.ToString())
    };

    var tokenDescriptor = new SecurityTokenDescriptor
    {
        Subject = new ClaimsIdentity(claims),
        Expires = DateTime.UtcNow.AddHours(1),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(keyBytes), SecurityAlgorithms.HmacSha256Signature)
    };

    var tokenHandler = new JwtSecurityTokenHandler();
    var token = tokenHandler.CreateToken(tokenDescriptor);
    var jwt = tokenHandler.WriteToken(token);

    return Results.Ok(new { token = jwt });
});

// إنشاء مستخدم جديد
app.MapPost("/adduser", async (AppDbContext db, User user) =>
{
    var exists = await db.Users.AnyAsync(u => u.UserName == user.UserName);
    if (exists)
        return Results.BadRequest("اسم المستخدم موجود مسبقًا");

    db.Users.Add(user);
    await db.SaveChangesAsync();
    return Results.Created($"/adduser/{user.Id}", user);
});



// الحصول على اسم المستخدم 

app.MapGet("/me", [Microsoft.AspNetCore.Authorization.Authorize] async (HttpContext http) =>
{
var username = http.User.Identity?.Name ?? http.User.FindFirst(ClaimTypes.Name)?.Value ?? http.User.FindFirst("username")?.Value;
if (username == null)
{
    return Results.Unauthorized();
}
return Results.Ok(username);

});

// إضافة ملاحظة
app.MapPost("/addnote", [Microsoft.AspNetCore.Authorization.Authorize] async (HttpContext http, AppDbContext db, Note note) =>
{
    var userIdStr = http.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    if (userIdStr is null)
        return Results.Unauthorized();

    int userId = int.Parse(userIdStr);

    note.UserId = userId;
    note.CreateDate = DateTime.Now;

    db.Notes.Add(note);
    await db.SaveChangesAsync();

    return Results.Ok(note);
});

// جلب جميع الملاحظات
app.MapGet("/getnotes", [Microsoft.AspNetCore.Authorization.Authorize] async (HttpContext http, AppDbContext db) =>
{
    var userIdStr = http.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    if (userIdStr == null)
        return Results.Unauthorized();

    int userId = int.Parse(userIdStr);
    var notes = await db.Notes.Where(n => n.UserId == userId && n.Is_Deleted == false).ToListAsync();

    return Results.Ok(notes);
});

// تحديث ملاحظة
app.MapPut("/updatenote/{id:int}", [Microsoft.AspNetCore.Authorization.Authorize] async (HttpContext http, AppDbContext db, Note note, int id) =>
{
    var userIdStr = http.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    if (userIdStr == null)
        return Results.Unauthorized();

    var _note = await db.Notes.FindAsync(id);
    if (_note == null)
        return Results.NotFound($"Note {id} غير موجودة");

    int userId = int.Parse(userIdStr);
    if (_note.UserId != userId)
        return Results.Forbid();

    _note.Title = note.Title;
    _note.Content = note.Content;
    await db.SaveChangesAsync();

    return Results.Ok(_note);
});

// حذف ناعم لملاحظة
app.MapPut("/softdelete/{id:int}", [Microsoft.AspNetCore.Authorization.Authorize] async (HttpContext http, AppDbContext db, int id) =>
{
    var userIdStr = http.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    if (userIdStr == null)
        return Results.Unauthorized();

    var _note = await db.Notes.FindAsync(id);
    if (_note == null)
        return Results.NotFound($"Note {id} غير موجودة");

    if (_note.Is_Deleted)
        return Results.BadRequest($"{id} تم حذفه مسبقًا");

    int userId = int.Parse(userIdStr);
    if (_note.UserId != userId)
        return Results.Forbid();

    _note.Is_Deleted = true;
    await db.SaveChangesAsync();

    return Results.Ok($"{id} تم حذفه");
});

app.MapControllers();
app.Run();
