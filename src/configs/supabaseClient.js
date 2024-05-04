import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://okvuistnsoqjgcizkrap.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rdnVpc3Ruc29xamdjaXprcmFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4MjYwMzksImV4cCI6MjAzMDQwMjAzOX0.0LPJvVyqQ1_V4XBasgVZwhRC1E9RZ3r08OEBKeE5VsU";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
