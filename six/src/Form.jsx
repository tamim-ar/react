import React from "react";

export default function Form() {
  const [formData, setFormData] = React.useState({
    userName: "",
    userEmail: "",
    password: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log("Form submitted", "formData", formData);
  };

  return (
    <div>
      <form onSubmit={submitForm} className="sapce-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-7000"
          >
            Name
          </label>
          <input
            onChange={handleChange}
            type="text"
            id="name"
            name="userName"
            className="mt-1"
            p-2
            block
            w-full
            border-gray-300
            rounded-md
            shadow-sm
            focus:ring-indigo-500
            focus:border-indigo-500
          />
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-7000"
          >
            Email
          </label>
          <input
            onChange={handleChange}
            type="email"
            id="email"
            name="userEmail"
            className="mt-1"
            p-2
            block
            w-full
            border-gray-300
            rounded-md
            shadow-sm
            focus:ring-indigo-500
            focus:border-indigo-500
          />
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-7000"
          >
            Password
          </label>
          <input
            onChange={handleChange}
            type="password"
            id="password"
            name="password"
            className="mt-1"
            p-2
            block
            w-full
            border-gray-300
            rounded-md
            shadow-sm
            focus:ring-indigo-500
            focus:border-indigo-500
          />
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-7000"
            >
              Gender
            </label>
            <select
              onChange={handleChange}
              name="gender"
              id="gender"
              className="mt-1"
              p-2
              block
              w-full
              border-gray-300
              rounded-md
              shadow-sm
              focus:ring-indigo-500
              focus:border-indigo-500
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <button type="submit" className="btn btn-accent">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
