import { createClient } from '@supabase/supabase-js';

// تهيئة الاتصال - يتم استبدال هذه القيم بمتغيرات البيئة في مشروعك الحقيقي
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
