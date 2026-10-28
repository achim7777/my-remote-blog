import { supabase } from './supabaseClient';

/**
 * جلب مقال كامل مع ترجمته وإعلاناته بناءً على الـ Slug واللغة
 */
export const getArticleBySlug = async (slug, language = 'en') => {
  // 1. جلب المقال الأساسي بناءً على الـ Slug
  const { data: post, error: postError } = await supabase
    .from('posts')
    .select('id, slug, status')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (postError || !post) return { error: 'Article not found' };

  // 2. جلب الترجمة المخصصة لهذا المقال باللغة المطلوبة
  const { data: translation, error: transError } = await supabase
    .from('post_translations')
    .select('title, content')
    .eq('post_id', post.id)
    .eq('language', language)
    .single();

  if (transError) return { error: 'Translation not found' };

  // 3. جلب كود الإعلانات (مثال: إعلان وسط المقال)
  const { data: ad, error: adError } = await supabase
    .from('ad_slots')
    .select('ad_code')
    .eq('slot_name', 'middle-content')
    .single();

  return {
    post,
    translation,
    adCode: ad ? ad.ad_code : null
  };
};
