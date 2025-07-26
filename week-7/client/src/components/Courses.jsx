import React, { useEffect, useState } from 'react';
import axios from 'axios';
import fallbackImage from '../../assets/courses.png';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token'); // token saved after login
        if (!token) {
          console.error('No token found. User might not be authenticated.');
          return;
        }
  
        const response = await axios.get('http://localhost:3000/admin/courses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error.response?.data?.message || error.message);
      }
    };
  
    fetchCourses();
  }, []);
  

  return (
    <div className="sm:grid lg:grid-cols-3 sm:grid-cols-2 gap-10 p-8">
      {courses.map((course) => (
        <div
          key={course._id}
          className="max-w-md mx-auto rounded-md overflow-hidden shadow-md hover:shadow-lg"
        >
          <div className="relative">
            <img className="w-full" src={fallbackImage} alt={course.title} />
            <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
              {course.tag || 'SALE'}
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-medium mb-2">{course.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{course.description}</p>
            <div className="flex items-center justify-between">
              <span className="font-bold text-lg">Rs.{course.price}</span>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Courses;
