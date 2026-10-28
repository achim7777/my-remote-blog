import React from 'react';

const ArticlePage = ({ title, content, adSlot }) => {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">{title}</h1>

      {/* Article Content */}
      <div className="prose prose-lg text-gray-700 leading-relaxed">
        {content.split('\n\n').map((paragraph, index) => (
          <React.Fragment key={index}>
            <p className="mb-4">{paragraph}</p>

            {/* Ad Injection Logic: Insert Ad after the 2nd paragraph */}
            {index === 1 && adSlot && (
              <div className="my-8 p-4 bg-gray-100 rounded-lg border border-dashed border-gray-400 text-center">
                <span className="text-sm text-gray-500 italic">Advertisement</span>
                <div dangerouslySetInnerHTML={{ __html: adSlot }} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </article>
  );
};

export default ArticlePage;
