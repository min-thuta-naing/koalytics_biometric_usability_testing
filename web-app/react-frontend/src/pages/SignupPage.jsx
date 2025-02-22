import React from "react";
import { useNavigate } from "react-router-dom";

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic of the", "Congo, Republic of the",
  "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador",
  "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
  "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
  "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North",
  "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya",
  "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
  "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique",
  "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia",
  "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines",
  "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa",
  "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
  "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
  "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
  "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu",
  "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];


export default function SignUpLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EEF2FF] p-4">
      <div className="w-full max-w-3xl p-8 grid grid-cols-2 gap-6">
        {/* First Column */}
        <div className="space-y-6">
          <div className="input-group">
            <label className="text-gray-600">First Name</label>
            <input
              type="text"
              className="h-12 bg-opacity-50 bg-white border border-gray-300 rounded-md w-full px-4 placeholder-gray-500"
            />
          </div>
          <div className="input-group">
            <label className="text-gray-600">Last Name</label>
            <input
              type="text"
              className="h-12 bg-opacity-50 bg-white border border-gray-300 rounded-md w-full px-4 placeholder-gray-500"
            />
          </div>
          <div className="input-group">
            <label className="text-gray-600">Birthday</label>
            <input
              type="date"
              className="h-12 bg-opacity-50 bg-white border border-gray-300 rounded-md w-full px-4 text-gray-500"
            />
          </div>
          <div className="input-group">
            <label className="text-gray-600">Gender</label>
            <select className="h-12 bg-opacity-50 bg-white border border-gray-300 rounded-md w-full px-4 text-gray-500">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="nosay">Prefer not to say</option>
            </select>
          </div>
          <div className="input-group">
            <label className="text-gray-600">Marital Status</label>
            <select className="h-12 bg-opacity-50 bg-white border border-gray-300 rounded-md w-full px-4 text-gray-500">
              <option value="">Select Marital Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
            </select>
          </div>
        </div>

        {/* Second Column */}
        <div className="space-y-6">
          <div className="input-group">
            <label className="text-gray-600">Country</label>
            <select className="h-12 bg-opacity-50 bg-white border border-gray-300 rounded-md w-full px-4 text-gray-500">
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label className="text-gray-600">Zip Code</label>
            <input
              type="text"
              className="h-12 bg-opacity-50 bg-white border border-gray-300 rounded-md w-full px-4 placeholder-gray-500"
            />
          </div>
          <div className="input-group">
            <label className="text-gray-600">Email</label>
            <input
              type="email"
              className="h-12 bg-opacity-50 bg-white border border-gray-300 rounded-md w-full px-4 placeholder-gray-500"
            />
          </div>
          <div className="input-group">
            <label className="text-gray-600">Password</label>
            <input
              type="password"
              className="h-12 bg-opacity-50 bg-white border border-gray-300 rounded-md w-full px-4 placeholder-gray-500"
            />
          </div>
          <div className="input-group">
            <label className="text-gray-600">Confirm Password</label>
            <input
              type="password"
              className="h-12 bg-opacity-50 bg-white border border-gray-300 rounded-md w-full px-4 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Sign Up Button */}
        <div className="col-span-2 flex justify-center mt-8">
          <button
            className="bg-violet-400 text-black text-lg px-5 py-2 rounded-lg hover:bg-violet-500 border border-gray-400 rounded-full"
            onClick={() => navigate("/question1")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
