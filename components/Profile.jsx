import StoneCard from './StoneCard';
const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
   return (
      <section className="w-full flex-center flex-col">
         {/* <h1 className="head_text text-left">
				<span className="blue_gradient">{name} Профіль</span>
			</h1> */}
         <h1 className="head_text text-left">
            {desc} <span className="blue_gradient">{name} </span>
         </h1>
         <div className="mt-10 prompt_layout ">
            {data.map((post) => (
               <StoneCard
                  key={post._id}
                  post={post}
                  handleEdit={() => handleEdit && handleEdit(post)}
                  handleDelete={() => handleDelete && handleDelete(post)}
               />
            ))}
         </div>
      </section>
   );
};

export default Profile;
