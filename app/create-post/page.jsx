'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';
import dateFormat from 'dateformat';

const CreatePost = () => {
   const router = useRouter();
   const { data: session } = useSession();
   const [submitting, setSubmitting] = useState(false);
   useEffect(() => {
      if (!session?.user.id) {
         router.push(`/`);
      }
   }, []);
   const [post, setPost] = useState({
      info: '',
      color: '',
      manufacturer: '',
      dimensions: '',
      tel: '',
      price: '',
      type: '',
      location: '',
      date: ''
   });
   const handleSubmit = async (e) => {
      e.preventDefault();
      setSubmitting(true);
      const now = new Date();
      const dateNow = dateFormat(now, 'HH:MM dd/mm/yyyy');
      try {
         const response = await fetch('/api/post/new', {
            method: 'POST',
            body: JSON.stringify({
               color: post.color,
               manufacturer: post.manufacturer,
               userId: session?.user.id,
               dimensions: post.dimensions,
               price: post.price,
               tel: post.tel,
               info: post.info,
               type: post.type,
               location: post.location,
               date: dateNow
            })
         });
         if (response.ok) {
            router.push('/');
         }
      } catch (error) {
      } finally {
         setSubmitting(false);
      }
   };
   return (
      <Form
         type="Create"
         post={post}
         setPost={setPost}
         submitting={submitting}
         handleSubmit={handleSubmit}
      />
   );
};
export default CreatePost;
