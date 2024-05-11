import { createClient } from "@supabase/supabase-js";
import { supabaseConfig } from "./dbConfig";

const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);

export default supabase;
