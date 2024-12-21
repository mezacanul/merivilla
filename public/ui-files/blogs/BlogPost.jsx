import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BlogRecommendations from './BlogRecommendations';

console.log('BlogPost module loaded');

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogPost = useCallback(async (blogId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/blog/${blogId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog post');
      }
      const data = await response.json();
      setBlog(data);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchRecommendations = useCallback(async () => {
    try {
      const response = await fetch('/api/blog-recommendations');
      if (!response.ok) {
        throw new Error('Failed to fetch blog recommendations');
      }
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error('Error fetching blog recommendations:', error);
    }
  }, []);

  useEffect(() => {
    fetchBlogPost(id);
    fetchRecommendations();
  }, [id, fetchBlogPost, fetchRecommendations]);

  const handleRecommendationClick = useCallback((blogId) => {
    navigate(`/blog/${blogId}`);
  }, [navigate]);

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  if (!blog) return <div className="text-center mt-8">No blog post found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      {blog.coverImage && <img src={blog.coverImage} alt="Cover" className="w-full h-64 object-cover mb-4" />}
      <div className="mb-4">
        <p className="font-semibold">{blog.author}</p>
        <p className="text-sm text-gray-500">{blog.publishedAt}</p>
      </div>
      {Array.isArray(blog.content) && blog.content.map((element, index) => {
        switch (element.type) {
          case 'heading':
            return <h2 key={index} className="text-2xl font-bold my-4">{element.content}</h2>;
          case 'text':
            return (
              <p 
                key={index} 
                className="my-4" 
                dangerouslySetInnerHTML={{ 
                  __html: element.content.replace(
                    /\[(.+?)\]\((.+?)\)/g, 
                    '<a href="$2" class="text-blue-500 hover:underline">$1</a>'
                  ) 
                }} 
              />
            );
          case 'image':
            return <img key={index} src={element.content} alt="Blog post image" className="max-w-full h-auto my-4" />;
          case 'youtube':
            return (
              <div key={index} className="my-4">
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${element.content.url.split('v=')[1]}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            );
          default:
            return null;
        }
      })}
      <BlogRecommendations 
        recommendations={recommendations.filter(rec => rec.id !== id)}
        onRecommendationClick={handleRecommendationClick}
      />
    </div>
  );
};

export default BlogPost;