import React from 'react';
import { 
  Phone, 
  Mail, 
  Home, 
  Briefcase, 
  User, 
  Calendar,
  MapPin,
  Hash,
  GraduationCap
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux'
const ProfilePage = () => {
const user = useSelector((state) => state.userData.user)

  return (
    <div className="min-h-screen  p-4 md:p-8">
      <div className="max-w-4xl mx-auto  rounded-lg shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800"><span className='text-purple-500'>About</span> Me</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Personal Info Section */}
            <div className="space-y-6 animate-fade-in bg-white shadow-md rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 m-4 rounded-full border-2 border-purple-500 flex flex-row justify-center items-center">
                  {user?.avatar!==undefined && user?.avatar!==''?<img src={user.avatar} className='size-8'/> :<GraduationCap size={30} className="text-purple-500 "/>}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-600 ">{user.name}</h2>
                  <p className="text-gray-600 italic">{user.role}</p>
                </div>
              </div>

              <div className="space-y-4 text-gray-400">
          

            <div className="grid grid-cols-2 gap-4 text-gray-400 bg-white">
              {user.role !== 'student' && (
                <>
                  <div>
                    <label className="text-sm font-bold text-gray-500">Occupation</label>
                    <p className="font-medium italic">Teacher</p>
                    <div className="flex items-center space-x-2">
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-500">Status</label>
                    <p className="font-medium italic">Working</p>
                  </div>
                </>
              )}
            </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="space-y-6 animate-fade-in-delayed text-gray-400 bg-white p-6 shadow-md rounded-lg">
              <h2 className="text-xl font-bold">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 hover:bg-gray-50 p-2 rounded transition-colors">
                  <Phone className="w-5 h-5 text-purple-500" />
                  <div>
                    <label className="text-sm font-bold text-gray-500">Primary Phone</label>
                    <p className="font-medium italic">{user?.phone||''}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 hover:bg-gray-50 p-2 rounded transition-colors">
                  <Mail className="w-5 h-5 text-purple-500" />
                  <div>
                    <label className="text-sm font-bold text-gray-500">Primary Email</label>
                    <p className="font-medium italic">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 hover:bg-gray-50 p-2 rounded transition-colors">
                  <Home className="w-5 h-5 text-purple-500" />
                  <div>
                    <label className="text-sm font-bold text-gray-500">Address</label>
                    <p className="font-medium italic">{user?.address||''}</p>
                  </div>
                </div>

               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

// Add these styles to your global CSS or Tailwind config
const styles = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-fade-in-delayed {
  animation: fadeIn 0.5s ease-out 0.2s forwards;
  opacity: 0;
}
`;