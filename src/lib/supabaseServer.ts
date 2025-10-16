import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SECRET_KEY!;

export const supabaseServer = createClient(supabaseUrl, supabaseServiceRoleKey);
