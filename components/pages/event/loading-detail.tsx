

export default function LoadingDetail(): JSX.Element {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-pulse">
        <div className="inline-flex items-center text-sm text-gray-400 hover:text-gray-500 mb-6">
          <div className="h-4 w-4 bg-gray-300 rounded-full mr-2"></div>
          <div className="h-4 w-32 bg-gray-300 rounded"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative h-[300px] sm:h-[400px] rounded-xl bg-gray-300"></div>

            <div>
              <div className="h-6 w-24 bg-gray-300 rounded mb-4"></div>
              <div className="h-8 w-3/4 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 w-full bg-gray-300 rounded mb-6"></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
                  <div className="h-4 w-32 bg-gray-300 rounded"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
                  <div className="h-4 w-32 bg-gray-300 rounded"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
                  <div className="h-4 w-32 bg-gray-300 rounded"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
                  <div className="h-4 w-32 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>

            <div className="prose max-w-none space-y-4">
              <div className="h-6 w-48 bg-gray-300 rounded"></div>
              <div className="h-4 w-full bg-gray-300 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
              <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border sticky top-24 space-y-4">
              <div className="flex justify-between items-center">
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
                <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              </div>

              <div className="space-y-2">
                <div className="h-5 w-32 bg-gray-300 rounded"></div>
                <div className="h-6 w-24 bg-gray-300 rounded"></div>
              </div>

              <div className="space-y-2">
                <div className="h-5 w-32 bg-gray-300 rounded"></div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-full bg-gray-200 rounded-full">
                    <div className="h-2 w-3/4 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="h-4 w-8 bg-gray-300 rounded"></div>
                </div>
              </div>

              <div className="h-10 w-full bg-gray-300 rounded"></div>

              <div className="h-4 w-3/4 bg-gray-300 rounded mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
