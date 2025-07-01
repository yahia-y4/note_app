namespace NoteApp.Models
{
    public class User
    {

        public int Id { get; set; }
        public string UserName { get; set; } = "";
        public string Password { get; set; } = "";  
        public List<Note> Notes { get; set; } = new();
   
    }
}