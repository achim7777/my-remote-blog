import React, { useState } from 'react';
import { supabase } from './supabaseClient';

const AdminDashboard = () => {
  const [slug, setSlug] = useState('');
  const [language, setLanguage] = useState('en');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handlePublish = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // 1. Insert into posts table
      const { data: postData, error: postError } = await supabase
        .from('posts')
        .insert([{ slug, status: 'published' }])
        .select()
        .single();

      if (postError) throw postError;

      // 2. Insert into post_translations table
      const { error: transError } = await supabase
        .from('post_translations')
        .insert([{
          post_id: postData.id,
          language,
          title,
          content
        }]);

      if (transError) throw transError;

      setMessage('Article published successfully!');
      setSlug('');
      setTitle('');
      setContent('');
    } catch (err) {
      setMessage('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md my-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard - Add Article</h2>

      {message && (
        <div className={`p-4 mb-4 rounded ${message.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handlePublish} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Slug (URL Name)</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="e.g. blurring-boundaries"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          >
            <option value="en">English (en)</option>
            <option value="fr">French (fr)</option>
            <option value="es">Spanish (es)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Article Title"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Content (Markdown / Text)</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="8"
            placeholder="Write your article content here..."
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? 'Publishing...' : 'Publish Article'}
        </button>
      </form>
    </div>
  );
};

export default AdminDashboard;
