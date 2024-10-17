import React from "react";

export default function Form() {
  const submitForm = (e) => {
    e.preventDefault();
    console.log("Form submitted");
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
