'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import ReactModal from 'react-modal';
const StoneCard = ({ post, handleColorClick, handleEdit, handleDelete }) => {
   const { data: session } = useSession();
   const pathName = usePathname();
   const router = useRouter();
   const [favorite, setFavorite] = useState(false);
   const [showModal, setShowModal] = useState(false);

   const handleProfileClick = () => {
      if (post.creator._id === session?.user.id) return router.push('/profile');

      router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
   };
   const body = document.querySelector('body');
   ReactModal.setAppElement(body);
   const openModal = () => {
      setShowModal(true);
   };
   const closeModal = () => {
      setShowModal(false);
   };

   return (
      <div className="prompt_card  ">
         {post.type === 'Sell' ? (
            <div className="flex justify-center bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 my-1">
               <h3 className="font-satoshi font-bold text-white">Пропоную</h3>
            </div>
         ) : (
            <div className="flex justify-center  bg-gradient-to-r from-emerald-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% my-1 ">
               <h3 className="font-satoshi font-bold text-white">Шукаю</h3>
            </div>
         )}
         {/* {status === 'authenticated' && (
            <button type="button" onClick={handleFavoriteClick}>
               Обране
            </button>
         )} */}
         <div className="flex-1 flex justify-start items-center gap-3">
            <div className="flex flex-col justify-between mt-3 mb-5">
               <p
                  className="font-inter font-sm text-lg text-gray-500"
                  onClick={handleProfileClick}
               >
                  <span className="font-satoshi font-semibold text-gray-500 ">
                     Автор:{' '}
                  </span>
                  <span className="hover:text-orange-600 cursor-pointer">
                     {post.creator.username}
                  </span>
               </p>
               <p
                  className="font-inter font-sm text-lg text-gray-500 cursor-pointer"
                  onClick={() =>
                     handleColorClick && handleColorClick(post.manufacturer)
                  }
               >
                  <span className="font-satoshi font-semibold text-gray-500 ">
                     Матеріал:{' '}
                  </span>
                  <span className="hover:text-orange-600 cursor-pointer">
                     {post.manufacturer}
                  </span>
               </p>
               <p
                  className="font-inter font-sm text-lg text-gray-500 cursor-pointer"
                  onClick={() =>
                     handleColorClick && handleColorClick(post.color)
                  }
               >
                  <span className="font-satoshi font-semibold text-gray-500 ">
                     Колір:{' '}
                  </span>
                  <span className="hover:text-orange-600 cursor-pointer">
                     {post.color}
                  </span>
               </p>
               <p className="font-inter font-sm text-lg text-gray-500">
                  <span className="font-satoshi font-semibold text-gray-500">
                     Розміри:{' '}
                  </span>
                  {post.dimensions}
               </p>

               <p className="font-inter font-sm text-lg text-gray-500">
                  <span className="font-satoshi font-semibold text-black-500">
                     Локація:{' '}
                  </span>
                  {post.location}
               </p>
            </div>
         </div>

         <div className="absolute bottom-2 left-5">
            <span className="font-sm text-lg font-sm text-lg text-gray-500">
               {post.date}
            </span>
         </div>

         <div>
            <button
               className="font-inter font-sm text-lg blue_gradient cursor-pointer  absolute right-3 bottom-2"
               type="button"
               onClick={openModal}
            >
               Детальніше
            </button>
            <ReactModal
               style={{
                  overlay: {
                     position: 'fixed',
                     top: 0,
                     left: 0,
                     right: 0,
                     bottom: 0,
                     backgroundColor: 'rgba(255, 255, 255, 0.75)'
                  },
                  content: {
                     position: 'absolute',
                     top: '50%',
                     left: '50%',
                     transform: `translate(-50%, -50%)`,
                     border: '1px solid #ccc',
                     background: '#fff',
                     overflow: 'auto',
                     WebkitOverflowScrolling: 'touch',
                     marginBottom: '20px',

                     outline: 'none'
                  }
               }}
               isOpen={showModal}
               onRequestClose={closeModal}
               contentLabel="Modal"
               shouldCloseOnOverlayClick={true}
               className="modal_card "
            >
               {post.type === 'Sell' ? (
                  <div className="flex justify-center   bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 my-1 ">
                     <h3 className="font-satoshi font-bold  text-white">
                        Пропоную
                     </h3>
                  </div>
               ) : (
                  <div className="flex justify-center     bg-gradient-to-r from-emerald-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% my-1">
                     <h3 className="font-satoshi font-bold  text-white">
                        Шукаю
                     </h3>
                  </div>
               )}
               <div className="mt-4">
                  <p
                     className="font-inter font-sm text-lg text-gray-500 "
                     onClick={handleProfileClick}
                  >
                     <span className="font-satoshi font-semibold text-gray-500">
                        Автор:{' '}
                     </span>
                     <span className="hover:text-orange-600 cursor-pointer">
                        {post.creator.username}
                     </span>
                  </p>
                  <p className="font-inter font-sm text-lg text-gray-500 ">
                     <span className="font-satoshi font-semibold text-gray-500 ">
                        Матеріал:{' '}
                     </span>
                     <span className="hover:text-orange-600 cursor-pointer">
                        {post.manufacturer}
                     </span>
                  </p>
                  <p className="font-inter font-sm text-lg text-gray-500 ">
                     <span className="font-satoshi font-semibold text-gray-500 ">
                        Колір:{' '}
                     </span>
                     <span className="hover:text-orange-600 cursor-pointer">
                        {post.color}
                     </span>
                  </p>
                  <p className="font-inter font-sm text-lg text-gray-500">
                     <span className="font-satoshi font-semibold text-gray-500">
                        Розміри:{' '}
                     </span>
                     {post.dimensions}
                  </p>
                  <p className="font-inter font-sm text-lg text-gray-500">
                     <span className="font-satoshi font-semibold text-black-500">
                        Телефон:{' '}
                     </span>
                     {post.tel}
                  </p>
                  <p className="font-inter font-sm text-lg text-gray-500">
                     <span className="font-satoshi font-semibold text-black-500 ">
                        Локація:{' '}
                     </span>
                     {post.location}
                  </p>
                  <p className="font-inter font-sm text-lg text-gray-500">
                     <span className="font-satoshi font-semibold text-black-500">
                        Ціна:{' '}
                     </span>
                     {post.price}
                  </p>
                  {post.info && (
                     <p className="font-inter font-sm text-lg text-gray-500">
                        {' '}
                        <span className="font-satoshi font-semibold text-black-500">
                           Коментар:{' '}
                        </span>
                        {post.info}
                     </p>
                  )}
                  <div className="mt-3 mb-6">
                     <p className="font-inter font-sm text-lg text-gray-500 ">
                        <span className="font-satoshi font-semibold text-gray-500"></span>

                        <a href={`tel:${post.tel}`}>
                           <Image
                              src="/assets/icons/phone-call-icon.svg"
                              alt="user_image"
                              width={50}
                              height={50}
                              className="rounded-full object-contain cursor-pointer"
                           />
                        </a>
                     </p>
                  </div>
                  {/* flex justify-start items-center */}
                  {/* <div>
							<Image
						src={post.creator.image}
						alt="user_image"
						width={40}
						height={40}
						className="rounded-full object-contain cursor-pointer"
						
					/> 
				</div> */}
                  {/* <div className="flex flex-col"> */}
               </div>
               {/* </div> */}
               <div className="absolute bottom-2 left-5">
                  <span className="font-sm text-lg font-sm text-lg text-gray-500">
                     {post.date}
                  </span>
               </div>

               <button
                  type="button"
                  onClick={closeModal}
                  className="font-inter font-sm text-lg blue_gradient cursor-pointer  absolute right-5 bottom-2"
               >
                  Закрити
               </button>
            </ReactModal>
         </div>
         {session?.user.id === post.creator._id && pathName === '/profile' && (
            <div className=" flex-center gap-4 border-t border-gray-100 p-3">
               <p
                  className="font-inter text-lg green_gradient cursor-pointer"
                  onClick={handleEdit}
               >
                  Редагувати
               </p>
               <p
                  className="font-inter text-lg orange_gradient cursor-pointer"
                  onClick={handleDelete}
               >
                  Видалити
               </p>
            </div>
         )}
      </div>
   );
};

export default StoneCard;
