import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddBook = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    publishedYear: '',
    genre: '',
    coverImage: ''
  });

  const { title, author, description, publishedYear, genre, coverImage } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    
    try {
      const res = await axios.post('/api/books', formData);
      navigate(`/books/${res.data._id}`);
    } catch (err) {
      console.error('Error adding book:', err);
    }
  };

  return (
    <div>
      <h1>Add New Book</h1>
      <div className="card">
        <form onSubmit={onSubmit}>
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={onChange}
              placeholder="Enter book title"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={author}
              onChange={onChange}
              placeholder="Enter author name"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={onChange}
              placeholder="Enter book description"
              required
            ></textarea>
          </div>
          <div className="form-control">
            <label htmlFor="publishedYear">Published Year</label>
            <input
              type="number"
              id="publishedYear"
              name="publishedYear"
              value={publishedYear}
              onChange={onChange}
              placeholder="Enter published year"
            />
          </div>
          <div className="form-control">
            <label htmlFor="genre">Genre</label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={genre}
              onChange={onChange}
              placeholder="Enter book genre"
            />
          </div>
          <div className="form-control">
            <label htmlFor="coverImage">Cover Image URL</label>
            <input
              type="text"
              id="coverImage"
              name="coverImage"
              value={coverImage}
              onChange={onChange}
              placeholder="Enter cover image URL"
            />
          </div>
          <button type="submit" className="btn btn-block">
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
