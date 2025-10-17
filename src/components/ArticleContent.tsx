import { useState } from 'react';

interface ArticleContentItem {
  id: string;
  language: string;
  originalLanguage?: string | null;
  title: string;
  content: string;
  beingTranslated: boolean;
  published: string;
}

interface ArticleContentProps {
  contents: ArticleContentItem[];
  defaultLanguage?: string;
  tags?: string[];
}

export function ArticleContent({ contents, defaultLanguage, tags }: ArticleContentProps) {
  const availableContents = contents.filter(c => !c.beingTranslated);
  
  const [selectedLanguage, setSelectedLanguage] = useState<string>(() => {
    if (defaultLanguage) {
      const found = availableContents.find(c => c.language === defaultLanguage);
      if (found) return defaultLanguage;
    }
    return availableContents[0]?.language || '';
  });

  const selectedContent = availableContents.find(c => c.language === selectedLanguage) || availableContents[0];

  if (!selectedContent) {
    return <div>No content available</div>;
  }

  const isOriginal = !selectedContent.originalLanguage;

  return (
    <div>
      {availableContents.length > 1 && (
        <div className="mb-6 flex items-center gap-3">
          <label htmlFor="language-select" className="text-sm font-medium text-gray-700">
            Language:
          </label>
          <select
            id="language-select"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {availableContents.map((content) => (
              <option key={content.id} value={content.language}>
                {content.language}
                {!content.originalLanguage && ' (Original)'}
              </option>
            ))}
          </select>
          {!isOriginal && selectedContent.originalLanguage && (
            <span className="text-xs text-gray-500">
              Translated from {selectedContent.originalLanguage}
            </span>
          )}
        </div>
      )}
      
      <h1 className="text-4xl font-bold mb-3">{selectedContent.title}</h1>
      
      <div className="mb-6 flex items-center gap-3 text-sm text-gray-600">
        <time dateTime={selectedContent.published}>
          {new Date(selectedContent.published).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </time>
        {tags && tags.length > 0 && (
          <>
            <span className="text-gray-400">•</span>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <a
                  key={tag}
                  href={`/tag/${tag}`}
                  className="text-blue-600 hover:underline"
                >
                  #{tag}
                </a>
              ))}
            </div>
          </>
        )}
      </div>

      <div 
        className="prose prose-slate max-w-none mb-8 mt-6" 
        dangerouslySetInnerHTML={{ __html: selectedContent.content }}
      />
    </div>
  );
}
