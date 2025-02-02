// https://causeconnect-dgu1.onrender.com//api/users/signup 
// route for signup

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Button from '../shared/Button';

// const Signup: React.FC = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('volunteer'); // default role
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('https://causeconnect-dgu1.onrender.com//api/users/signup', {
//         username,
//         email,
//         password,
//         role,
//       });

//       console.log('Signup successful:', response.data);
//       localStorage.setItem('token', response.data.token); 
//       navigate('/'); 
//     } catch (err: unknown) {
//       if (axios.isAxiosError(err)) {
//         setError(err.response?.data?.error || 'Signup failed');
//       } else {
//         setError('An unexpected error occurred');
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
//         <h2 className="text-2xl font-semibold text-center text-blue-900 mb-6">Create a New Account</h2>
//         {error && <p className="text-red-600 text-center mb-4">{error}</p>}

//         <form onSubmit={handleSignup}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               placeholder="Enter your username"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
//               Role
//             </label>
//             <select
//               id="role"
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             >
//               <option value="volunteer">Volunteer</option>
//               <option value="organizer">Organizer</option>
//             </select>
//           </div>

//           <div className="flex items-center justify-between">
//             <Button text="Sign Up" type="submit" />
//             <p className="text-sm text-gray-600">
//               Already have an account? <a href="/login" className="text-blue-900 font-bold">Log In</a>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../shared/Button';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('volunteer'); // default role
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://causeconnect-dgu1.onrender.com//api/users/signup',
        { username, email, password, role }
      );

      console.log('Signup successful:', response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Signup failed');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://img.freepik.com/premium-photo/world-charity-day-backgrounds_1198941-10278.jpg?w=740')`,
      }}
    >
      {/* Overlay to create a faded effect */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md z-10">
        <h2 className="text-2xl font-semibold text-center text-blue-900 mb-6">
          Create a New Account
        </h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="role"
            >
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="volunteer">Volunteer</option>
              <option value="organizer">Organizer</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <Button text="Sign Up" type="submit" />
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-blue-900 font-bold">
                Log In
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
