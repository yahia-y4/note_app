namespace NoteApp.Models
{
    public class Note
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public string Content { get; set; } = "";
        public DateTime CreateDate { get; set; } = DateTime.Now;

        public bool Is_Deleted { get; set; } = false;

        public int UserId { get; set; }
        public User User { get; set; } = null!;
    }
}