const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-4 text-4xl md:text-6xl font-semibold text-red-500">
        404
      </h1>
      <p className="mb-4 text-lg text-gray-600 text-center">
        Oops! Looks like you're lost.
      </p>
      <div className="animate-bounce">
        <svg
          className="h-16 w-16 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      </div>
      <p className="mt-4 text-gray-600 text-center">
        Let's get you back
        <a href="/" className="text-blue-500">
          home
        </a>
      </p>
    </div>
  );
};

export default NotFound;
