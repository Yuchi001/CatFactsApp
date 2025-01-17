namespace CatApi.Data.Entities;

public class CatFactResponse
{
    public int current_page { get; set; }
    public List<CatFact> data { get; set; } = [];
    public string first_page_url { get; set; }
    public int from { get; set; }
    public int last_page { get; set; }
    public string last_page_url { get; set; }
    public List<Link> links { get; set; } = [];
    public string? next_page_url { get; set; }
    public string path { get; set; }
    public int per_page { get; set; }
    public string? prev_page_url { get; set; }
    public int to { get; set; }
    public int total { get; set; }
}