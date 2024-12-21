import React, { useState, useEffect} from 'react';
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Type, AlignLeft, Image, Youtube, Trash2, GripVertical, Eye } from 'lucide-react'

const BlogCreationPlatform = () => {
  const [mainTitle, setMainTitle] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [elements, setElements] = useState([]);
  const [currentTime, setCurrentTime] = useState('');
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [activeElement, setActiveElement] = useState(null);
  const authorName = "Jane Doe"; // This would be replaced with the actual logged-in user's name

  const elementTypes = [
    { type: 'heading', icon: <Type size={24} />, label: 'Heading' },
    { type: 'text', icon: <AlignLeft size={24} />, label: 'Text' },
    { type: 'image', icon: <Image size={24} />, label: 'Image' },
    { type: 'youtube', icon: <Youtube size={24} />, label: 'YouTube Video' }
  ];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString('en-US', { 
        timeZone: 'UTC',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }) + ' UTC');
    };

    updateTime();
    const timer = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setContextMenu(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const addElement = (type) => {
    let newElement = {
      type: type,
      content: ''
    };
    
    if (type === 'heading') newElement.content = 'New Heading';
    else if (type === 'text') newElement.content = 'New paragraph';
    else if (type === 'image') newElement.content = '/api/placeholder/300/200';
    else if (type === 'youtube') newElement.content = '';
  
    setElements([...elements, newElement]);
  };

  const handleContentChange = (index, newContent, field = null) => {
    const newElements = [...elements];
    if (field && newElements[index].type === 'youtube') {
      newElements[index].content[field] = newContent;
    } else {
      newElements[index].content = newContent;
    }
    setElements(newElements);
  };

  const handleDeleteElement = (index) => {
    const newElements = elements.filter((_, i) => i !== index);
    setElements(newElements);
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    const draggedOverItem = elements[index];
    const draggedItem = elements[draggedIndex];
    
    if (draggedOverItem === draggedItem) return;
    
    const newElements = elements.filter((_, itemIndex) => itemIndex !== draggedIndex);
    newElements.splice(index, 0, draggedItem);

    setElements(newElements);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleContextMenu = (e, index) => {
    e.preventDefault();
    if (elements[index].type === 'text' || elements[index].type === 'heading') {
      setContextMenu({ x: e.clientX, y: e.clientY });
      setActiveElement(index);
    }
  };

  const handleInsertLink = () => {
    setContextMenu(null);
    setLinkDialogOpen(true);
  };

  const insertLink = () => {
    if (activeElement !== null) {
      const element = elements[activeElement];
      if (element.type === 'text' || element.type === 'heading') {
        const newContent = `${element.content} [${linkText}](${linkUrl})`;
        handleContentChange(activeElement, newContent);
      }
      setLinkDialogOpen(false);
      setActiveElement(null);
      setLinkText('');
      setLinkUrl('');
    }
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload-image?fileName=' + file.name, {
        method: 'POST',
        body: file
      });
      const imageUrl = await response.json();
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleCoverImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInlineImageUpload = async (index) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = await handleImageUpload(file);
        if (imageUrl) {
          handleContentChange(index, imageUrl);
        }
      }
    };
    input.click();
  };

  const handlePublish = () => {
    const blogPost = {
      title: mainTitle,
      coverImage: coverImage, // This should be a URL string
      content: elements,
      author: authorName,
      publishedAt: currentTime
    };
  
    console.log('Sending POST request to /api/create-blog');
    console.log('Sending blog post:', JSON.stringify(blogPost, null, 2));
    console.log('Blog post data:', blogPost);
  
    fetch('/api/create-blog', {  // Note the updated URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogPost),
    })
    .then(response => {
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      return response.text().then(text => {
        try {
          return JSON.parse(text);
        } catch (e) {
          return text;
        }
      });
    })
    .then(data => {
      console.log('Blog post created:', data);
      if (!data.id) {
        throw new Error('Blog post creation failed. no data.id');
      }
      // Redirect to the newly created blog post
      window.location.href = `/blog/${data.id}`;
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle the error appropriately (e.g., show an error message to the user)
      // setErrorMessage(`Failed to create blog post: ${error.message}`);
    });
  };

  const renderPreview = () => {
    return (
      <div className="prose max-w-none">
        {coverImage && (
          <img src={coverImage} alt="Cover" className="w-full h-64 object-cover mb-4" />
        )}
        <div className="flex justify-end mb-4">
          <div className="text-right">
            <p className="font-semibold">{authorName}</p>
            <p className="text-sm text-gray-500">{currentTime}</p>
          </div>
        </div>
        <h1>{mainTitle}</h1>
        {elements.map((element, index) => {
          switch (element.type) {
            case 'heading':
              return <h2 key={index}>{element.content}</h2>;
            case 'text':
              return <p key={index} dangerouslySetInnerHTML={{ __html: element.content.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>') }} />;
            case 'image':
              return <img key={index} src={element.content} alt="Blog post image" className="max-w-full h-auto" />;
            case 'youtube':
              return (
                <div key={index}>
                  <p>YouTube Video: {element.content.url}</p>
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    );
  };

  return (
    <div className="p-4 h-screen flex flex-col">
      <h1 className="text-2xl font-light mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Blog Creation Platform</h1>
      <div className="flex-grow flex">
        <div className="w-1/4 pr-4 flex flex-col">
          <div className="flex-grow space-y-4 overflow-y-auto">
            <h2 className="text-xl font-bold">Elements</h2>
            {elementTypes.map((item) => (
              <Card 
                key={item.type} 
                className="p-4 cursor-pointer flex items-center space-x-2"
                onClick={() => addElement(item.type)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Card>
            ))}
            <div className="pt-4 border-t">
              <h2 className="text-xl font-bold mb-2">Cover Image</h2>
              <div className="flex items-center space-x-2 mb-2">
                <Button onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.onchange = handleCoverImageUpload;
                  input.click();
                }}>
                  Upload Cover Image
                </Button>
                {coverImage && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Cover Image Preview</DialogTitle>
                      </DialogHeader>
                      <img src={coverImage} alt="Cover preview" className="max-w-full h-auto" />
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t text-right">
            <p className="font-semibold">{authorName}</p>
            <p className="text-sm text-gray-500">{currentTime}</p>
          </div>
        </div>
        <div className="w-3/4 flex flex-col">
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Main Title</h2>
            <Input
              type="text"
              value={mainTitle}
              onChange={(e) => setMainTitle(e.target.value)}
              className="text-2xl font-bold"
              placeholder="Enter your blog post title"
            />
          </div>
          <div className="flex-grow border-2 border-dashed p-4 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Document</h2>
            {elements.map((element, index) => (
              <div 
                key={index} 
                className="mb-4 flex items-center"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                onContextMenu={(e) => handleContextMenu(e, index)}
              >
                <GripVertical className="mr-2 cursor-move" />
                <div className="flex-grow">
                  {element.type === 'heading' && (
                    <Input
                      type="text"
                      value={element.content}
                      onChange={(e) => handleContentChange(index, e.target.value)}
                      className="text-xl font-bold"
                      placeholder="Enter heading"
                    />
                  )}
                  {element.type === 'text' && (
                    <Textarea
                      value={element.content}
                      onChange={(e) => handleContentChange(index, e.target.value)}
                      placeholder="Enter text content"
                    />
                  )}
                  {element.type === 'image' && (
                    <div>
                      {element.content ? (
                        <img src={element.content} alt="Blog post image" className="max-w-full h-auto mb-2" />
                      ) : (
                        <div className="bg-gray-200 h-32 flex items-center justify-center mb-2">
                          <span className="text-gray-500">No image uploaded</span>
                        </div>
                      )}
                      <Button onClick={() => handleInlineImageUpload(index)}>
                        {element.content ? 'Change Image' : 'Upload Image'}
                      </Button>
                    </div>
                  )}
                  {element.type === 'youtube' && (
                    <Input
                      type="url"
                      value={element.content.url}
                      onChange={(e) => handleContentChange(index, e.target.value, 'url')}
                      placeholder="Enter YouTube video URL"
                    />
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteElement(index)}
                  className="ml-2"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <Button onClick={() => setShowPreview(!showPreview)}>
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Publish</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to publish?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will publish your blog post for all to see.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={handlePublish}>Publish</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      {showPreview && (
        <div className="mt-4 border-t pt-4">
          <h2 className="text-xl font-bold mb-4">Preview</h2>
          {renderPreview()}
        </div>
      )}
      {contextMenu && (
        <div
          style={{
            position: 'fixed',
            top: contextMenu.y,
            left: contextMenu.x,
            background: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '8px',
            zIndex: 1000,
          }}
        >
          <Button onClick={handleInsertLink}>Insert Link</Button>
        </div>
      )}
      <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Link</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              type="text"
              placeholder="Link text"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
            />
            <Input
              type="url"
              placeholder="URL"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
            <Button onClick={insertLink}>Insert</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
// const BlogCreationPlatform = () => {
//   console.log('BlogCreationPlatform component rendered');
//   return (
//     <div style={{ padding: '20px', background: '#f0f0f0' }}>
//       <h1 style={{ color: 'blue' }}>Create a New Blog Post</h1>
//       {/* Your form and other content here */}
//     </div>
//   );
// };
export default BlogCreationPlatform;
