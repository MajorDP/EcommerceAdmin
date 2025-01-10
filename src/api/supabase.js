import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://kunrkhhjyvjxdcoruypi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1bnJraGhqeXZqeGRjb3J1eXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxMDQ0ODIsImV4cCI6MjAyODY4MDQ4Mn0.MwE9kSksdxGfA8SStK4xWLYiPengYWmOOZ53QSL5rBc";
export const supabase = createClient(supabaseUrl, supabaseKey);
